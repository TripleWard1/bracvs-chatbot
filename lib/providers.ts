// ============================================================
// FORNECEDORES DE IA — cadeia de fallback automático
// Todos são compatíveis com a API OpenAI (chat/completions + SSE),
// por isso trocar ou reordenar é trivial.
//
// Ordem: Cerebras 70B (1M tokens/dia, rápido) → Groq 70B → Groq 8B.
// Se um fornecedor falhar ou não tiver chave definida, salta-se
// automaticamente para o seguinte.
//
// Os slugs dos modelos mudam de vez em quando (sobretudo na
// Cerebras). Podes sobrepô-los por variável de ambiente sem tocar
// no código: CEREBRAS_MODEL, GROQ_MODEL, GROQ_MODEL_FALLBACK.
// ============================================================

export type ChatMessage = { role: 'system' | 'user' | 'assistant'; content: string };

export type Provider = {
  name: string;
  url: string;
  apiKey: string | undefined;
  model: string;
  // slim: recebe só o conhecimento essencial (para limites por minuto pequenos)
  slim?: boolean;
  // maxTokens: teto de resposta. Os modelos Gemini 3.x "pensam" antes de
  // responder e o raciocínio conta para este teto — precisam de folga larga,
  // senão a resposta visível é cortada a meio da frase.
  maxTokens?: number;
  // reasoningEffort: nível de raciocínio (modelos pensantes). "low" evita
  // que o Gemini fique 20-30s a pensar antes do primeiro byte — que mataria
  // a função no limite de 25s do Vercel.
  reasoningEffort?: string;
};

export function providerChain(): Provider[] {
  const chain: Provider[] = [
    {
      name: 'gemini',
      url: 'https://generativelanguage.googleapis.com/v1beta/openai/chat/completions',
      apiKey: process.env.GEMINI_API_KEY,
      model: process.env.GEMINI_MODEL || 'gemini-3.5-flash',
      maxTokens: 3000,
      reasoningEffort: 'low',
    },
    {
      name: 'cerebras',
      url: 'https://api.cerebras.ai/v1/chat/completions',
      apiKey: process.env.CEREBRAS_API_KEY,
      model: process.env.CEREBRAS_MODEL || 'llama-3.3-70b',
    },
    {
      name: 'groq-70b',
      url: 'https://api.groq.com/openai/v1/chat/completions',
      apiKey: process.env.GROQ_API_KEY,
      model: process.env.GROQ_MODEL || 'llama-3.3-70b-versatile',
    },
    // NOTA: o llama-3.1-8b-instant foi REMOVIDO da cadeia. Inventava
    // estabelecimentos, escrevia em português do Brasil e produzia texto
    // degradado ("(pausa)"). Uma resposta errada é pior do que uma espera:
    // é preferível a retentativa automática do cliente. Para o reativar,
    // define GROQ_ENABLE_8B=1 nas variáveis de ambiente.
    ...(process.env.GROQ_ENABLE_8B === '1'
      ? [
          {
            name: 'groq-8b',
            url: 'https://api.groq.com/openai/v1/chat/completions',
            apiKey: process.env.GROQ_API_KEY,
            model: process.env.GROQ_MODEL_FALLBACK || 'llama-3.1-8b-instant',
            slim: true,
          },
        ]
      : []),
  ];
  // Só mantém fornecedores com chave definida
  return chain.filter((p) => !!p.apiKey);
}

// Faz o pedido em streaming a um fornecedor. Devolve a resposta HTTP
// crua (para o route verificar .ok / .body) ou null se rebentar.
export async function callProvider(
  provider: Provider,
  messages: ChatMessage[]
): Promise<Response | null> {
  try {
    const res = await fetch(provider.url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${provider.apiKey}`,
        'User-Agent': 'bracvs-chatbot/1.0 (visitbraga.travel)',
      },
      body: JSON.stringify({
        model: provider.model,
        messages,
        // 0.4 repetia sempre as mesmas sugestões; 0.7 aumentou as invenções.
        // 0.5 com amostragem do conhecimento dá variedade sem criatividade
        // a mais — a variedade vem da amostra, não da temperatura.
        temperature: 0.5,
        max_tokens: provider.maxTokens ?? 600,
        stream: true,
        ...(provider.reasoningEffort ? { reasoning_effort: provider.reasoningEffort } : {}),
      }),
      // Fornecedor pendurado → aborta e passa ao seguinte (limite Vercel: 25s)
      signal: AbortSignal.timeout(15000),
    });
    if (!res.ok) {
      // Diagnóstico: mostra no terminal porque é que este fornecedor falhou
      const errBody = await res.clone().text().catch(() => '');
      console.error(
        `[Bracvs] ${provider.name} falhou: HTTP ${res.status} — ${errBody.slice(0, 300)}`
      );
    }
    return res;
  } catch (e) {
    console.error(`[Bracvs] ${provider.name} inacessível:`, e);
    return null;
  }
}

// Converte o SSE estilo-OpenAI (Cerebras e Groq) em texto simples.
export function sseToText(upstream: ReadableStream<Uint8Array>): ReadableStream<Uint8Array> {
  const decoder = new TextDecoder();
  const encoder = new TextEncoder();
  const reader = upstream.getReader();

  return new ReadableStream({
    async start(controller) {
      let buffer = '';
      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split('\n');
          buffer = lines.pop() ?? '';
          for (const line of lines) {
            const trimmed = line.trim();
            if (!trimmed.startsWith('data:')) continue;
            const data = trimmed.slice(5).trim();
            if (data === '[DONE]') continue;
            try {
              const json = JSON.parse(data);
              const token = json.choices?.[0]?.delta?.content;
              if (token) controller.enqueue(encoder.encode(token));
            } catch {
              // linha parcial — ignora
            }
          }
        }
      } finally {
        controller.close();
      }
    },
  });
}
