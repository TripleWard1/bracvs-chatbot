// lib/sheets.ts
// CONHECIMENTO EDITÁVEL SEM CÓDIGO — lê uma Google Sheet publicada como CSV.
//
// Separadores esperados na folha "Bracvs Conhecimento":
//   RESTAURANTES → colunas: Categoria | Nome | Zona | Notas
//                   (Zona: "Centro histórico" para os do centro — é o que
//                    permite ao Bracvs dar-lhes prioridade e dizer onde ficam.
//                    Deixar vazio se não souberes: o Bracvs nunca inventa.)
//   AVISOS       → colunas: Aviso
//
// Cada separador é publicado individualmente (Ficheiro → Partilhar →
// Publicar na Web → escolher separador → CSV) e o URL vai para as
// variáveis de ambiente SHEET_RESTAURANTES_URL e SHEET_AVISOS_URL.
//
// Cache de 10 minutos; alterações na folha ficam ativas em ~15 min.
// Se a folha falhar ou estiver vazia → fallback para as listas embutidas.

import { construirModuloRestaurantes } from './knowledge/restaurantes';

// Mínimo de restaurantes para a folha ser considerada válida
const MIN_RESTAURANTES = 12;

// Parser de CSV mínimo com suporte a campos entre aspas
function parseCsv(texto: string): string[][] {
  const linhas: string[][] = [];
  let campo = '';
  let linha: string[] = [];
  let entreAspas = false;
  for (let i = 0; i < texto.length; i++) {
    const c = texto[i];
    if (entreAspas) {
      if (c === '"' && texto[i + 1] === '"') {
        campo += '"';
        i++;
      } else if (c === '"') {
        entreAspas = false;
      } else {
        campo += c;
      }
    } else if (c === '"') {
      entreAspas = true;
    } else if (c === ',') {
      linha.push(campo);
      campo = '';
    } else if (c === '\n' || c === '\r') {
      if (c === '\r' && texto[i + 1] === '\n') i++;
      linha.push(campo);
      campo = '';
      if (linha.some((v) => v.trim() !== '')) linhas.push(linha);
      linha = [];
    } else {
      campo += c;
    }
  }
  linha.push(campo);
  if (linha.some((v) => v.trim() !== '')) linhas.push(linha);
  return linhas;
}

async function lerCsv(envVar: string): Promise<string[][] | null> {
  const url = process.env[envVar];
  if (!url) return null;
  try {
    const r = await fetch(url, { next: { revalidate: 600 } } as RequestInit);
    if (!r.ok) return null;
    return parseCsv(await r.text());
  } catch {
    return null;
  }
}

/**
 * Restaurantes vindos da Sheet, no mesmo formato do módulo embutido.
 * Devolve null se a folha não estiver configurada/acessível/preenchida —
 * o chamador recua para a lista embutida.
 */
export async function restaurantesDaSheet(): Promise<string | null> {
  const linhas = await lerCsv('SHEET_RESTAURANTES_URL');
  if (!linhas || linhas.length < 2) return null;

  const porCategoria = new Map<string, string[]>();
  for (const l of linhas.slice(1)) {
    const categoria = (l[0] ?? '').trim();
    const nome = (l[1] ?? '').trim();
    const zona = (l[2] ?? '').trim();
    const notas = (l[3] ?? '').trim();
    if (!categoria || !nome) continue;
    const partes = [nome];
    if (zona) partes.push(`zona: ${zona}`);
    if (notas) partes.push(notas);
    const item = partes.join(' — ');
    porCategoria.set(categoria, [...(porCategoria.get(categoria) ?? []), item]);
  }
  // Proteção: uma folha quase vazia (mal preenchida, cabeçalho em falta,
  // publicação errada) substituiria a lista completa por 2 ou 3 nomes — foi
  // isso que fez o Bracvs recomendar sempre o mesmo restaurante. Abaixo do
  // mínimo, ignora a folha e usa a lista embutida.
  const total = Array.from(porCategoria.values()).reduce((n, v) => n + v.length, 0);
  if (porCategoria.size === 0 || total < MIN_RESTAURANTES) {
    console.error(
      `[Bracvs] Google Sheet ignorada: só ${total} restaurantes (mínimo ${MIN_RESTAURANTES}). Confirma o cabeçalho "Categoria | Nome | Zona | Notas" na primeira linha. A usar a lista embutida.`
    );
    return null;
  }

  const categorias = Array.from(porCategoria.entries()).map(([titulo, itens]) => ({
    titulo,
    itens,
    // Fine Dining mantém a ordem (mérito); o resto baralha (anti-viés)
    baralhar: !/fine ?dining|michelin/i.test(titulo),
  }));
  return construirModuloRestaurantes(categorias);
}

/**
 * Avisos atuais editados pela equipa — entram em TODOS os pedidos.
 * Devolve string vazia se não houver avisos.
 */
export async function avisosDaSheet(): Promise<string> {
  const linhas = await lerCsv('SHEET_AVISOS_URL');
  if (!linhas || linhas.length < 2) return '';
  const avisos = linhas
    .slice(1)
    .map((l) => (l[0] ?? '').trim())
    .filter((a) => a !== '')
    .slice(0, 15);
  if (avisos.length === 0) return '';
  const texto = `\n## AVISOS ATUAIS (informação recente editada pela equipa Visit Braga — prioritária)\n${avisos.map((a) => `- ${a}`).join('\n')}`;
  return texto.slice(0, 2000);
}


/** Diagnóstico: que fonte de restaurantes está ativa e com quantos registos. */
export async function estadoDoConhecimento(): Promise<object> {
  const linhas = await lerCsv('SHEET_RESTAURANTES_URL');
  if (!linhas) {
    return {
      fonte: 'lista embutida no código',
      motivo: process.env.SHEET_RESTAURANTES_URL
        ? 'a folha não respondeu ou está vazia'
        : 'SHEET_RESTAURANTES_URL não definida',
    };
  }
  const validas = linhas.slice(1).filter((l) => (l[0] ?? '').trim() && (l[1] ?? '').trim());
  const comZonaCentro = validas.filter((l) => /centro/i.test(l[2] ?? '')).length;
  const cabecalhoOk = /categoria/i.test(linhas[0]?.[0] ?? '');
  return {
    fonte: validas.length >= MIN_RESTAURANTES ? 'Google Sheet' : 'lista embutida no código',
    linhas_lidas: linhas.length,
    restaurantes_validos: validas.length,
    no_centro: comZonaCentro,
    cabecalho_detetado: cabecalhoOk
      ? 'sim'
      : 'NÃO — a 1.ª linha deve ser: Categoria | Nome | Zona | Notas (a atual está a ser descartada)',
    ...(validas.length < MIN_RESTAURANTES
      ? { aviso: `A folha tem menos de ${MIN_RESTAURANTES} restaurantes, por isso está a ser IGNORADA.` }
      : {}),
  };
}
