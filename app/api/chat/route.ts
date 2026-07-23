import { buildSystemPrompt } from '@/lib/prompt';
import { selectKnowledge } from '@/lib/knowledge';
import { providerChain, callProvider, sseToText, type ChatMessage } from '@/lib/providers';

export const runtime = 'edge';

// ---------- Rate limiting simples (por IP, em memória) ----------
const WINDOW_MS = 60_000;
const MAX_REQUESTS = 15;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_REQUESTS;
}

// ---------- Meteorologia de Braga (Open-Meteo, gratuito, sem chave) ----------
const WMO: Record<number, string> = {
  0: 'céu limpo', 1: 'quase limpo', 2: 'parcialmente nublado', 3: 'nublado',
  45: 'nevoeiro', 48: 'nevoeiro', 51: 'chuvisco', 53: 'chuvisco', 55: 'chuvisco',
  61: 'chuva fraca', 63: 'chuva', 65: 'chuva forte', 80: 'aguaceiros',
  81: 'aguaceiros', 82: 'aguaceiros fortes', 95: 'trovoada', 96: 'trovoada', 99: 'trovoada',
};

async function bragaWeather(): Promise<string> {
  try {
    const url =
      'https://api.open-meteo.com/v1/forecast?latitude=41.5454&longitude=-8.4265' +
      '&current=temperature_2m,weather_code' +
      '&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max' +
      '&timezone=Europe%2FLisbon&forecast_days=1';
    const r = await fetch(url, { next: { revalidate: 1800 } });
    if (!r.ok) return '';
    const d = await r.json();
    const desc = WMO[d.current.weather_code] ?? '';
    return `Agora em Braga: ${d.current.temperature_2m}°C${desc ? `, ${desc}` : ''}. Hoje: máx ${d.daily.temperature_2m_max[0]}°C, mín ${d.daily.temperature_2m_min[0]}°C, probabilidade de chuva ${d.daily.precipitation_probability_max[0]}%.`;
  } catch {
    return '';
  }
}

// ---------- Handler ----------
export async function POST(req: Request) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'anon';
  if (rateLimited(ip)) {
    return new Response(JSON.stringify({ error: 'rate_limit' }), {
      status: 429,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  let body: { messages?: ChatMessage[]; lang?: string };
  try {
    body = await req.json();
  } catch {
    return new Response('Bad request', { status: 400 });
  }

  const raw = Array.isArray(body.messages) ? body.messages : [];
  // Validação + limites: últimas 12 mensagens, máx. 2000 caracteres cada
  const history: ChatMessage[] = raw
    .filter(
      (m) =>
        m &&
        (m.role === 'user' || m.role === 'assistant') &&
        typeof m.content === 'string' &&
        m.content.trim().length > 0
    )
    .slice(-8)
    .map((m) => ({ role: m.role, content: m.content.slice(0, 2000) }));

  if (history.length === 0 || history[history.length - 1].role !== 'user') {
    return new Response('Bad request', { status: 400 });
  }

  const providers = providerChain();
  if (providers.length === 0) {
    console.error(
      '[Bracvs] Nenhuma chave de API carregada (CEREBRAS_API_KEY / GROQ_API_KEY vazias). Reinicia o servidor depois de editar o .env.'
    );
    return new Response(JSON.stringify({ error: 'no_provider' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const weather = await bragaWeather();
  const userTexts = history.filter((m) => m.role === 'user').map((m) => m.content);
  const fullKnowledge = selectKnowledge(userTexts);
  const slimKnowledge = selectKnowledge(userTexts, true);
  const LANG_NAMES: Record<string, string> = {
    pt: 'Português de Portugal',
    es: 'Espanhol',
    en: 'Inglês',
    fr: 'Francês',
  };
  const uiLang = LANG_NAMES[body.lang ?? ''] ?? 'Inglês';

  // Tenta cada fornecedor por ordem; o primeiro que responder 200 assume.
  // Fornecedores "slim" recebem só o conhecimento essencial, para caberem
  // em limites por minuto pequenos — garantem resposta em último recurso.
  for (const provider of providers) {
    const messages: ChatMessage[] = [
      {
        role: 'system',
        content: buildSystemPrompt(weather, provider.slim ? slimKnowledge : fullKnowledge, uiLang),
      },
      ...history,
    ];
    const upstream = await callProvider(provider, messages);
    if (upstream && upstream.ok && upstream.body) {
      return new Response(sseToText(upstream.body), {
        headers: {
          'Content-Type': 'text/plain; charset=utf-8',
          'X-Bracvs-Provider': provider.name, // útil para debug/monitorização
        },
      });
    }
    // fornecedor em baixo ou com quota esgotada → tenta o seguinte
  }

  return new Response(JSON.stringify({ error: 'all_providers_down' }), {
    status: 502,
    headers: { 'Content-Type': 'application/json' },
  });
}
