// app/api/status/route.ts
// DIAGNÓSTICO: testa cada fornecedor de IA com um pedido mínimo e
// devolve quem está operacional. Abrir no browser: /api/status
// Não expõe chaves — só o estado e o erro (se houver) de cada um.

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
          'HTTP-Referer': 'https://visitbraga.travel',
          'X-Title': 'Bracvs — Visit Braga',
        },
        // Mesmos parâmetros do /api/chat: um "ping" minúsculo passaria em
        // fornecedores que falham num pedido real (parâmetros extra, quota
        // por tokens). Este teste tem de ser representativo.
        body: JSON.stringify({
          model: p.model,
          messages: [
            { role: 'system', content: 'És um assistente de teste. '.repeat(120) },
            { role: 'user', content: 'Responde apenas: ok' },
          ],
          temperature: 0.5,
          max_tokens: p.maxTokens ?? 600,
          stream: true,
          ...(p.reasoningEffort ? { reasoning_effort: p.reasoningEffort } : {}),
        }),
      });
      const ms = Date.now() - started;
      // Quota restante (a Groq e outros expõem-na nos cabeçalhos): um teste
      // pequeno pode passar e uma pergunta real falhar por falta de tokens.
      const restam =
        res.headers.get('x-ratelimit-remaining-tokens') ??
        res.headers.get('x-ratelimit-remaining-tokens-day') ??
        null;
      const reset =
        res.headers.get('x-ratelimit-reset-tokens') ??
        res.headers.get('x-ratelimit-reset-tokens-day') ??
        null;

      if (res.ok) {
        const tokensRestantes = restam ? Number(restam) : null;
        const chegaParaPergunta =
          tokensRestantes === null ? null : tokensRestantes > 6000;
        results.push({
          fornecedor: p.name,
          modelo: p.model,
          estado:
            chegaParaPergunta === false
              ? 'SEM QUOTA PARA PERGUNTAS REAIS ⚠️'
              : 'OK ✅',
          latencia_ms: ms,
          ...(tokensRestantes !== null ? { tokens_restantes: tokensRestantes } : {}),
          ...(reset ? { quota_repoe_em: reset } : {}),
        });
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
          : 'NENHUM fornecedor operacional — o chat vai dar erro',
        chaves_configuradas: providers.map((p) => p.name),
        detalhe: results,
      },
      null,
      2
    ),
    { headers: { 'Content-Type': 'application/json; charset=utf-8' } }
  );
}