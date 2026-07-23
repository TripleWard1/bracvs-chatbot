// lib/analytics.ts
// REGISTO ANÓNIMO DE USO - escreve no Firestore via REST (sem SDK,
// funciona no edge runtime, zero dependências novas).
//
// Coleções:
//   bracvs_perguntas - cada pergunta feita ao Bracvs
//   bracvs_feedback  - votos 👍/👎 nas respostas
//
// Privacidade: NÃO se regista IP nem qualquer identificador do
// utilizador. Só a pergunta, a língua, o motor e o módulo usados.
//
// Best-effort: qualquer falha é engolida - o chat nunca depende disto.
// Se FIREBASE_PROJECT_ID / FIREBASE_API_KEY não existirem, desliga-se.

type Campos = Record<string, string>;

function firestoreUrl(colecao: string): string | null {
  const pid = process.env.FIREBASE_PROJECT_ID;
  const key = process.env.FIREBASE_API_KEY;
  if (!pid || !key) return null;
  return `https://firestore.googleapis.com/v1/projects/${pid}/databases/(default)/documents/${colecao}?key=${key}`;
}

function corpo(campos: Campos): string {
  const fields: Record<string, object> = {
    data: { timestampValue: new Date().toISOString() },
  };
  for (const [k, v] of Object.entries(campos)) {
    fields[k] = { stringValue: v };
  }
  return JSON.stringify({ fields });
}

async function escrever(colecao: string, campos: Campos): Promise<void> {
  const url = firestoreUrl(colecao);
  if (!url) return;
  try {
    await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: corpo(campos),
    });
  } catch {
    // analytics nunca pode partir o chat
  }
}

export function logPergunta(dados: {
  pergunta: string;
  lingua: string;
  fornecedor: string;
  modulo: string;
}): Promise<void> {
  return escrever('bracvs_perguntas', {
    pergunta: dados.pergunta.slice(0, 300),
    lingua: dados.lingua,
    fornecedor: dados.fornecedor,
    modulo: dados.modulo || 'nenhum',
  });
}

export function logFeedback(dados: {
  voto: 'up' | 'down';
  pergunta: string;
  resposta: string;
}): Promise<void> {
  return escrever('bracvs_feedback', {
    voto: dados.voto,
    pergunta: dados.pergunta.slice(0, 300),
    resposta: dados.resposta.slice(0, 400),
  });
}
