// app/api/status/route.ts
// DIAGNÓSTICO: testa cada fornecedor de IA com um pedido mínimo e
// devolve quem está operacional. Abrir no browser: /api/status
// Não expõe chaves - só o estado e o erro (se houver) de cada um.

import { providerChain } from '@/lib/providers';

export const runtime = 'edge';

export async function GET() {
  const providers = providerChain();
  const results: object[] = [];

  for (const p of providers) {
    const started = Date.now();
    try {
      const res = await fetch(p.url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${p.apiKey}`,
          'User-Agent': 'bracvs-chatbot/1.0 (visitbraga.travel)',
        },
        body: JSON.stringify({
          model: p.model,
          messages: [{ role: 'user', content: 'ping' }],
          max_tokens: 2,
        }),
      });
      const ms = Date.now() - started;
      if (res.ok) {
        results.push({ fornecedor: p.name, modelo: p.model, estado: 'OK ✅', latencia_ms: ms });
      } else {
        const erro = (await res.text()).slice(0, 220);
        results.push({
          fornecedor: p.name,
          modelo: p.model,
          estado: `FALHOU ❌ (HTTP ${res.status})`,
          latencia_ms: ms,
          erro,
        });
      }
    } catch (e) {
      results.push({
        fornecedor: p.name,
        modelo: p.model,
        estado: 'INACESSÍVEL ❌',
        erro: String(e).slice(0, 220),
      });
    }
  }

  const ativo = (results.find((r: any) => String(r.estado).startsWith('OK')) as any)?.fornecedor;

  return new Response(
    JSON.stringify(
      {
        resumo: ativo
          ? `O Bracvs está a responder com: ${ativo}`
          : 'NENHUM fornecedor operacional - o chat vai dar erro',
        chaves_configuradas: providers.map((p) => p.name),
        detalhe: results,
      },
      null,
      2
    ),
    { headers: { 'Content-Type': 'application/json; charset=utf-8' } }
  );
}