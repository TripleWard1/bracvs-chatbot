// lib/sheets.ts
// CONHECIMENTO EDITÁVEL SEM CÓDIGO - lê uma Google Sheet publicada como CSV.
//
// Separadores esperados na folha "Bracvs Conhecimento":
//   RESTAURANTES → colunas: Categoria | Nome | Notas
//   AVISOS       → colunas: Aviso
//
// Cada separador é publicado individualmente (Ficheiro → Partilhar →
// Publicar na Web → escolher separador → CSV) e o URL vai para as
// variáveis de ambiente SHEET_RESTAURANTES_URL e SHEET_AVISOS_URL.
//
// Cache de 10 minutos; alterações na folha ficam ativas em ~15 min.
// Se a folha falhar ou estiver vazia → fallback para as listas embutidas.

import { construirModuloRestaurantes } from './knowledge/restaurantes';

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
    const r = await fetch(url, { next: { revalidate: 600 } });
    if (!r.ok) return null;
    return parseCsv(await r.text());
  } catch {
    return null;
  }
}

/**
 * Restaurantes vindos da Sheet, no mesmo formato do módulo embutido.
 * Devolve null se a folha não estiver configurada/acessível/preenchida -
 * o chamador recua para a lista embutida.
 */
export async function restaurantesDaSheet(): Promise<string | null> {
  const linhas = await lerCsv('SHEET_RESTAURANTES_URL');
  if (!linhas || linhas.length < 2) return null;

  const porCategoria = new Map<string, string[]>();
  for (const l of linhas.slice(1)) {
    const categoria = (l[0] ?? '').trim();
    const nome = (l[1] ?? '').trim();
    const notas = (l[2] ?? '').trim();
    if (!categoria || !nome) continue;
    const item = notas ? `${nome} - ${notas}` : nome;
    porCategoria.set(categoria, [...(porCategoria.get(categoria) ?? []), item]);
  }
  if (porCategoria.size === 0) return null;

  const categorias = Array.from(porCategoria.entries()).map(([titulo, itens]) => ({
    titulo,
    itens,
    // Fine Dining mantém a ordem (mérito); o resto baralha (anti-viés)
    baralhar: !/fine ?dining|michelin/i.test(titulo),
  }));
  return construirModuloRestaurantes(categorias);
}

/**
 * Avisos atuais editados pela equipa - entram em TODOS os pedidos.
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
  const texto = `\n## AVISOS ATUAIS (informação recente editada pela equipa Visit Braga - prioritária)\n${avisos.map((a) => `- ${a}`).join('\n')}`;
  return texto.slice(0, 2000);
}
