// tests/golden.mjs
// TESTES DOURADOS DO BRACVS
// Dispara perguntas reais contra o chatbot em produção e verifica factos
// obrigatórios e proibidos em cada resposta.
//
// Uso:   node tests/golden.mjs https://bracvs-chatbot.vercel.app
// Requer: Node 18+. Demora ~3 minutos (pausa entre perguntas para
// respeitar os limites por minuto). Não polui as estatísticas
// (cabeçalho x-bracvs-test).
//
// Campos de cada teste:
//   todas    - TODOS estes termos têm de aparecer na resposta
//   umDe     - PELO MENOS UM destes termos tem de aparecer
//   proibido - NENHUM destes termos pode aparecer

const BASE = process.argv[2];
if (!BASE) {
  console.error('Uso: node tests/golden.mjs https://o-teu-dominio.vercel.app');
  process.exit(1);
}

const TESTES = [
  // ---------- Bom Jesus / transportes (factos críticos) ----------
  { id: 'bomjesus-autocarro-pt', lang: 'pt', pergunta: 'Como chego ao Bom Jesus de autocarro?',
    todas: ['02'], proibido: ['linha 5', 'linha 7', 'nº 5', 'nº 7', 'elevador de água'] },
  { id: 'bomjesus-bus-en', lang: 'en', pergunta: 'How do I get to Bom Jesus by bus?',
    todas: ['02'], proibido: ['line 5', 'line 7', 'você'] },
  { id: 'funicular-pt', lang: 'pt', pergunta: 'Como funciona o funicular do Bom Jesus?',
    todas: ['funicular'], proibido: ['elevador de água'] },
  { id: 'estadio-pt', lang: 'pt', pergunta: 'Que autocarro apanho para o Estádio do Braga?',
    todas: ['05'], proibido: [] },
  { id: 'sameiro-pt', lang: 'pt', pergunta: 'Como vou de autocarro ao Sameiro?',
    umDe: ['88', '23'], proibido: [] },
  { id: 'tibaes-pt', lang: 'pt', pergunta: 'Há autocarro para o Mosteiro de Tibães?',
    todas: ['50'], proibido: [] },

  // ---------- Restaurantes (lista validada, sem invenções) ----------
  { id: 'rest-generico-pt', lang: 'pt', pergunta: 'Que restaurantes recomendas em Braga?',
    umDe: ['cozinha', 'tipo', 'ocasi', 'procuras', 'preferes', '?'],
    proibido: ['Paparico', 'Casa do Leão', 'Taberna do Vinho', 'O Gordo', 'Casa do Pão', 'O Forno', 'você'] },
  { id: 'rest-michelin-pt', lang: 'pt', pergunta: 'Quero um jantar especial de alta cozinha em Braga.',
    todas: ['Palatial'], proibido: [] },
  { id: 'rest-tradicional-pt', lang: 'pt', pergunta: 'Onde como cozinha tradicional portuguesa em Braga?',
    umDe: ['Carvalheiras', 'Cozinha da Sé', 'Arcoense', 'Dom Augusto', 'Bem-Me-Quer', 'Taberna do Paço', 'Velhos Tempos', 'Tasquinha', 'Trota', 'Fujacal', 'Mesa na Praça', 'Donna Sé', 'Antù', 'Filho da Mãe', 'Retrokitchen', 'pPlace', 'Taberna da Fonte'],
    proibido: ['Paparico', 'Casa do Leão', 'O Gordo'] },
  { id: 'rest-vegetariano-en', lang: 'en', pergunta: 'Where can I eat vegetarian food in Braga?',
    umDe: ['Gosto Superior', 'Hibiscus', 'Esperança Verde'], proibido: ['você'] },
  { id: 'rest-francesinha-pt', lang: 'pt', pergunta: 'Onde comer uma boa francesinha em Braga?',
    umDe: ['Londrina', 'Taberna Belga', 'Camada'], proibido: [] },
  { id: 'rest-historicos-pt', lang: 'pt', pergunta: 'Quais são os cafés históricos de Braga?',
    umDe: ['Vianna', 'Brasileira', 'Frigideiras', 'Lusitana'], proibido: [] },

  // ---------- Bares e noite (guia oficial) ----------
  { id: 'bares-pt', lang: 'pt', pergunta: 'Recomenda-me bares para esta noite em Braga.',
    umDe: ['Tosga', 'Juno', 'Pátio da Sé', 'Speak Easy', 'SETRA', 'Colinatrum', 'Os Zés', 'Rossio', 'Sé La Vie', 'Mal Amado', 'Pelle', 'Wine 66', 'Estúdio 22', 'Galeria 101'],
    proibido: [] },
  { id: 'discotecas-pt', lang: 'pt', pergunta: 'Há discotecas em Braga?',
    umDe: ['Lustre', 'Sardinha Biba', 'Dona Rosa', 'Bô Zen'], proibido: [] },
  { id: 'bares-en', lang: 'en', pergunta: 'Best cocktail bars in Braga?',
    umDe: ['Tosga', 'Speak Easy', 'SETRA', 'Galeria 101', 'Os Zés'], proibido: ['você'] },

  // ---------- Monumentos e essenciais ----------
  { id: 'se-pt', lang: 'pt', pergunta: 'Fala-me da Sé de Braga.',
    umDe: ['catedral', 'antiga'], proibido: [] },
  { id: 'unesco-en', lang: 'en', pergunta: 'Is Bom Jesus a UNESCO site?',
    todas: ['UNESCO'], proibido: ['você'] },
  { id: 'umdia-pt', lang: 'pt', pergunta: 'O que visitar em Braga num dia?',
    umDe: ['Sé', 'Bom Jesus'], proibido: [] },
  { id: 'semanasanta-pt', lang: 'pt', pergunta: 'Quando é a Semana Santa de Braga?',
    umDe: ['março', 'abril', 'visitbraga'], proibido: [] },
  { id: 'doces-pt', lang: 'pt', pergunta: 'Que doces típicos tem Braga?',
    umDe: ['Abade de Priscos', 'fidalguinhos', 'tibias'], proibido: [] },

  // ---------- Línguas: resposta imediata na língua da pergunta ----------
  { id: 'lingua-en', lang: 'en', pergunta: 'What can I visit in Braga in one day?',
    umDe: [' the ', ' you '], proibido: ['você pode', 'podes visitar'] },
  { id: 'lingua-es', lang: 'es', pergunta: '¿Qué puedo visitar en Braga en un día?',
    umDe: ['puedes', 'visita', 'catedral'], proibido: ['você'] },
  { id: 'lingua-fr', lang: 'fr', pergunta: "Que puis-je visiter à Braga en une journée ?",
    umDe: ['tu peux', 'vous pouvez', 'cathédrale', 'visite'], proibido: ['você'] },
  { id: 'ptpt-tu', lang: 'pt', pergunta: 'Dá-me dicas para visitar Braga com chuva.',
    proibido: ['você'] },

  // ---------- Âmbito e honestidade ----------
  { id: 'ambito-pt', lang: 'pt', pergunta: 'Escreve-me um código em Python para ordenar listas.',
    umDe: ['Braga', 'turismo', 'ajudar-te com'], proibido: [] },
  { id: 'porto-pt', lang: 'pt', pergunta: 'Que restaurantes recomendas no Porto?',
    umDe: ['Braga'], proibido: ['Paparico'] },
];

// ---------- motor de teste ----------
const norm = (s) =>
  s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

async function perguntar(pergunta, lang) {
  const res = await fetch(`${BASE}/api/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-bracvs-test': '1' },
    body: JSON.stringify({ messages: [{ role: 'user', content: pergunta }], lang }),
  });
  if (res.status === 429 || res.status === 502) {
    await new Promise((r) => setTimeout(r, 12000));
    return perguntar(pergunta, lang);
  }
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return await res.text();
}

let passou = 0;
const falhas = [];

for (const t of TESTES) {
  process.stdout.write(`  ${t.id.padEnd(24)} `);
  try {
    const resposta = await perguntar(t.pergunta, t.lang);
    const n = norm(resposta);
    const erros = [];
    for (const termo of t.todas ?? []) {
      if (!n.includes(norm(termo))) erros.push(`falta obrigatório "${termo}"`);
    }
    if (t.umDe && !t.umDe.some((termo) => n.includes(norm(termo)))) {
      erros.push(`nenhum de [${t.umDe.join(', ')}] presente`);
    }
    for (const termo of t.proibido ?? []) {
      if (n.includes(norm(termo))) erros.push(`contém proibido "${termo}"`);
    }
    if (erros.length === 0) {
      passou++;
      console.log('PASSA ✅');
    } else {
      falhas.push({ id: t.id, erros, resposta: resposta.slice(0, 200) });
      console.log(`FALHA ❌  ${erros.join('; ')}`);
    }
  } catch (e) {
    falhas.push({ id: t.id, erros: [String(e)], resposta: '' });
    console.log(`ERRO ⚠️  ${e}`);
  }
  // pausa: respeita o rate limit próprio (15/min) e os TPM dos fornecedores
  await new Promise((r) => setTimeout(r, 4500));
}

console.log('\n════════════════════════════════════');
console.log(`  ${passou}/${TESTES.length} testes passaram`);
if (falhas.length > 0) {
  console.log('\n  Falhas em detalhe:');
  for (const f of falhas) {
    console.log(`\n  ▸ ${f.id}`);
    for (const e of f.erros) console.log(`      - ${e}`);
    if (f.resposta) console.log(`      resposta: "${f.resposta}…"`);
  }
  process.exit(1);
}
console.log('  Tudo verde - podes fazer deploy descansado. 🟢');
