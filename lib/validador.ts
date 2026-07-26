// lib/validador.ts
// VALIDADOR ANTI-ALUCINAÇÃO
// Depois de a resposta estar completa, extrai nomes próprios de
// estabelecimentos e verifica se existem no conhecimento oficial que foi
// enviado ao modelo neste pedido. Nomes que não existem são registados
// (Firestore) para o Hugo ver - é o alarme que apanha invenções de
// qualquer modelo, incluindo os de recurso.
//
// Não bloqueia a resposta (o texto já foi transmitido em streaming); serve
// para medir e caçar alucinações de forma sistemática, não pontual.

import { logAlucinacao } from './analytics';

// Palavras que iniciam nomes de casas de comida/bebida em PT/ES/EN/FR.
// Uma FRASE que mencione um destes tipos + um Nome Próprio a seguir é uma
// afirmação de existência que pode ser verificada.
const GATILHOS =
  /\b(restaurante|restaurant|tasca|tasquinha|taberna|taverna|cervejaria|marisqueira|churrasqueira|petiscaria|bar|pub|discoteca|club|clube|caf[ée]|cafeteria|pastelaria|confeitaria|confeiteira|pizzaria|pizzeria|gelataria|padaria|boulangerie|p[âa]tisserie)\b/i;

function norm(s: string): string {
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Extrai candidatos a nomes de estabelecimentos do texto: sequências de
 * palavras Capitalizadas (até 4) que aparecem perto de um gatilho, ou logo
 * a seguir a marcadores de lista/recomendação.
 */
function extrairNomes(texto: string): string[] {
  const nomes = new Set<string>();

  // 1) "o restaurante X Y", "no bar Z", "a pastelaria W"
  const reGatilho = new RegExp(
    GATILHOS.source +
      String.raw`\s+(?:é\s+o\s+|é\s+a\s+|o\s+|a\s+)?([A-ZÀ-Ú][\wÀ-ú'’.-]+(?:\s+[A-ZÀ-Ú0-9][\wÀ-ú'’.-]+){0,3})`,
    'gi'
  );
  for (const m of texto.matchAll(reGatilho)) {
    if (m[1]) nomes.add(m[1].trim());
  }

  // 2) itens de lista "- Nome do Sítio" (o modelo lista recomendações assim)
  for (const m of texto.matchAll(
    /^[-•*]\s*([A-ZÀ-Ú][\wÀ-ú'’.-]+(?:\s+[A-ZÀ-Ú0-9][\wÀ-ú'’.-]+){0,3})/gm
  )) {
    if (m[1]) nomes.add(m[1].trim());
  }

  return Array.from(nomes);
}

// Palavras comuns que começam por maiúscula mas NÃO são estabelecimentos
// (evita falsos positivos: início de frase, cidades, pratos conhecidos).
const IGNORAR = new Set(
  [
    'Braga',
    'Bom Jesus',
    'Sé',
    'Se',
    'Porto',
    'Lisboa',
    'Minho',
    'Portugal',
    'Bracara Augusta',
    'Visit Braga',
    'Bracvs',
    'Se Quiseres',
    'Se Preferes',
    'Se Gostas',
    'Para',
    'Como',
    'Onde',
    'Quando',
    'Queres',
    'Também',
    'Outra',
    'Outro',
    'Claro',
    'Bacalhau',
    'Arroz',
    'Papas',
    'Frigideira',
    'Frigideiras',
    'Fidalguinhos',
    'Pudim',
  ].map(norm)
);

export type ResultadoValidacao = {
  suspeitos: string[];
  totalNomes: number;
};

/**
 * Compara os nomes do texto com a lista de nomes conhecidos (extraída do
 * conhecimento realmente enviado neste pedido). Devolve os suspeitos de
 * invenção.
 */
export function validarNomes(texto: string, nomesConhecidos: string[]): ResultadoValidacao {
  const conhecidosNorm = nomesConhecidos.map(norm).filter((n) => n.length > 2);
  const candidatos = extrairNomes(texto);
  const suspeitos: string[] = [];

  for (const cand of candidatos) {
    const n = norm(cand);
    if (n.length < 3 || IGNORAR.has(n)) continue;
    // conhecido se algum nome oficial contém o candidato ou vice-versa
    const existe = conhecidosNorm.some(
      (k) => k === n || k.includes(n) || n.includes(k)
    );
    if (!existe) suspeitos.push(cand);
  }

  return { suspeitos, totalNomes: candidatos.length };
}

/**
 * Corre a validação sobre um ReadableStream sem interferir com ele:
 * devolve um novo stream idêntico e, no fim, valida o texto acumulado,
 * registando alucinações. O utilizador recebe o texto na mesma.
 */
export function validarStream(
  stream: ReadableStream<Uint8Array>,
  ctx: { pergunta: string; fornecedor: string; nomesConhecidos: string[]; teste: boolean }
): ReadableStream<Uint8Array> {
  const [paraUtilizador, paraValidar] = stream.tee();

  // Ramo de validação: consome em segundo plano, não bloqueia o utilizador
  (async () => {
    try {
      const reader = paraValidar.getReader();
      const decoder = new TextDecoder();
      let texto = '';
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        texto += decoder.decode(value, { stream: true });
      }
      if (ctx.teste) return;
      const { suspeitos, totalNomes } = validarNomes(texto, ctx.nomesConhecidos);
      if (suspeitos.length > 0) {
        console.error(
          `[Bracvs] POSSÍVEL ALUCINAÇÃO (${ctx.fornecedor}): ${suspeitos.join(', ')} - pergunta: "${ctx.pergunta.slice(0, 80)}"`
        );
        await logAlucinacao({
          pergunta: ctx.pergunta,
          fornecedor: ctx.fornecedor,
          suspeitos,
          totalNomes,
          resposta: texto,
        });
      }
    } catch {
      // validação nunca pode afetar o serviço
    }
  })();

  return paraUtilizador;
}
