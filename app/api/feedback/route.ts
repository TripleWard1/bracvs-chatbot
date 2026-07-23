// app/api/feedback/route.ts
// Recebe os votos 👍/👎 do chat e regista-os no Firestore (anónimo).

import { logFeedback } from '@/lib/analytics';

export const runtime = 'edge';

const WINDOW_MS = 60_000;
const MAX_VOTES = 20;
const hits = new Map<string, number[]>();

export async function POST(req: Request) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'anon';
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (recent.length > MAX_VOTES) {
    return new Response(null, { status: 429 });
  }

  try {
    const body = await req.json();
    const voto = body?.voto === 'up' || body?.voto === 'down' ? body.voto : null;
    const pergunta = typeof body?.pergunta === 'string' ? body.pergunta : '';
    const resposta = typeof body?.resposta === 'string' ? body.resposta : '';
    if (!voto || !resposta) {
      return new Response(null, { status: 400 });
    }
    await logFeedback({ voto, pergunta, resposta });
    return new Response(null, { status: 204 });
  } catch {
    return new Response(null, { status: 400 });
  }
}
