// ============================================================
// ROUTER DE CONHECIMENTO (mini-RAG por palavras-chave)
// O núcleo (core.ts) vai SEMPRE no prompt. Os módulos de detalhe
// só são injetados quando a conversa toca nesses temas - assim
// cada pedido fica leve e a quota gratuita rende.
//
// As palavras-chave cobrem as 4 línguas (PT/ES/EN/FR). O conteúdo
// dos módulos está em PT/EN: o modelo traduz na resposta.
//
// Para adicionar um módulo novo: cria o ficheiro em lib/knowledge/,
// importa aqui e acrescenta uma entrada em MODULES com as keywords.
// ============================================================

import { CORE_KNOWLEDGE } from './core';
import { TRANSPORTES_KNOWLEDGE } from './transportes';
import { MAPA_KNOWLEDGE } from './mapa';
import { ROTEIRO_3_DIAS_KNOWLEDGE } from './roteiro-3-dias';
import ROTEIRO_BRACVS_KNOWLEDGE from './roteiro-bracvs';
import { FUTURE_KNOWLEDGE } from './future';
import { getRestaurantesKnowledge } from './restaurantes';
import { restaurantesDaSheet, avisosDaSheet, pastelariasDaSheet, baresDaSheet, eventosDaSheet } from '../sheets';
import { construirDoces } from './doces';
import { AFTER_DARK_SUNSET_JANTAR, AFTER_DARK_BARES, AFTER_DARK_BARES_LITE } from './after-dark';

type Module = {
  name: string;
  content: string | (() => string | Promise<string>);
  contentSlim?: string;
  keywords: RegExp;
};

const MODULES: Module[] = [
  {
    name: 'doces-gastronomia',
    content: async () => construirDoces(await pastelariasDaSheet()),
    keywords:
      /doce|doçaria|sobremesa|dessert|postre|p[âa]tisserie|fidalguinho|abade de priscos|t[íi]bias|pudim|frigideira|bacalhau|sarrabulho|rojões|pica no chão|gastronomia|prato t[íi]pico|typical dish|especialidade|comer de doce|sweets?|bolo|pastel|pastela|confeitaria|pastelaria/i,
  },
  {
    name: 'restaurantes',
    // Google Sheet primeiro (editável pela equipa); fallback: lista embutida
    content: async () => (await restaurantesDaSheet()) ?? getRestaurantesKnowledge(),
    keywords:
      /restaurante|restaurant|comer|jantar|almo[çc]|petisco|tapas|francesinha|pizza|sushi|ramen|vegetariano|vegan|vegetarian|v[ée]g[ée]|steakhouse|carne|churrasq|onde (se )?come|d[óo]nde comer|where to eat|o[ùu] manger|d[îi]ner|cenar|dinner|lunch|almuerzo|d[ée]jeuner|comida t[íi]pica|typical food|michelin|tradicional|traditional|marisqueira|marisco|italiana|italiano|asi[áa]tic|japon[êe]s|japonesa|indiano|hamburguer|burger|refei[çc][ãa]o|prato|gastronomia|onde jantar|para jantar|para almo[çc]ar/i,
  },
  {
    name: 'eventos-agenda',
    content: async () => (await eventosDaSheet()) ?? 'Sem agenda de eventos carregada. Sugere consultar visitbraga.travel para a programação atual.',
    keywords:
      /evento|eventos|agenda|program[aç]|concerto|show|espet[áa]cul|festival|exposi[çc][ãa]o|exhibition|teatro|theatre|cinema|filme|movie|feira|market|o que (h[áa]|se passa|fazer)|what'?s on|what to do|acontece|hoje|amanh[ãa]|este fim de semana|esta semana|this (week|weekend)|tonight|esta noite|folclore|jazz|m[úu]sica ao vivo|live music|festa|festas de|s[ãa]o jo[ãa]o|semana santa|braga romana|noite branca/i,
  },
  {
    name: 'braga-by-dark-bares',
    // Folha "BARES E NOITE" primeiro; guia embutido como fallback
    content: async () => (await baresDaSheet()) ?? AFTER_DARK_BARES,
    contentSlim: AFTER_DARK_BARES_LITE,
    keywords:
      /noite|nocturn|noturn|nightlife|night ?club|discoteca|clube?\b|club\b|\bbar(es)?\b|copos|cocktail|shisha|\bgin\b|cerveja|craft beer|\bbeer\b|bi[èe]re|wine bar|bar de vinhos|after dark|by night|by dark|sair [àa] noite|festa|fiesta|\bdj\b|dan[çc]ar|dancing|bailar|danser|soir[ée]e|nuit\b|vie nocturne/i,
  },
  {
    name: 'braga-by-sunset',
    content: AFTER_DARK_SUNSET_JANTAR,
    keywords:
      /p[ôo]r[- ]do[- ]sol|sunset|atardecer|puesta de sol|coucher de soleil|entardecer|fim de tarde|golden hour|miradouro|mirador|rooftop|esplanada|terrace|terrasse|by sunset/i,
  },
  {
    name: 'transportes',
    content: TRANSPORTES_KNOWLEDGE,
    keywords:
      /autocarro|autobus|autobús|bus\b|comboio|train|tren|esta[çc][ãa]o|station|estación|gare\b|guimar[ãa]es|\btub\b|hor[áa]ri|schedule|timetable|horaires|aeroporto|airport|a[ée]roport|getbus|shuttle|t[áa]xi|taxi|transporte|transport|como chego|como llegar|how (do i|to) get|comment (aller|arriver)|bilhete|ticket|billet|passe\b|abono|sem carro|de carro|a p[ée]\b|on foot|funicular|elevador|como (ir|vou|chego)|c[óo]mo (ir|llego|voy)|comment y aller/i,
  },
  {
    name: 'mapa-monumentos',
    content: MAPA_KNOWLEDGE,
    keywords:
      /monument|museu|museo|mus[ée]e|museum|igreja|church|iglesia|[ée]glise|capela|chapel|chapelle|\bs[ée]\b|catedral|cathedral|cath[ée]drale|mapa|\bmap\b|carte\b|torre|tower|tour\b|pal[áa]cio|palacio|palace|palais|fonte do [íi]dolo|termas|thermes|romano|roman|romain|muralha|wall|muraille|jardim|garden|jard[íi]n|jardin|theatro|teatro|theatre|th[éâ]atre|bom jesus|sameiro|tib[ãa]es|falperra|posto de turismo|tourist office|oficina de turismo|office de tourisme|contacto|contact|hospital|pol[íi]cia|police|emerg[êe]ncia|emergency|urgence/i,
  },
  {
    name: 'roteiro-3-dias',
    content: ROTEIRO_3_DIAS_KNOWLEDGE,
    keywords:
      /roteiro|itiner[áa]ri|itinerary|itin[ée]raire|um dia|dois dias|tr[êe]s dias|1 dia|2 dias|3 dias|one day|two days|three days|un d[íi]a|dos d[íi]as|tres d[íi]as|un jour|deux jours|trois jours|fim de semana|weekend|fin de semana|week-end|programa|planear|planning|plan de visite|o que (ver|visitar|fazer)|qu[ée] (ver|visitar|hacer)|what to (see|do|visit)|que (voir|faire|visiter)/i,
  },
  {
    name: 'roteiro-bracvs-familias',
    content: ROTEIRO_BRACVS_KNOWLEDGE,
    keywords:
      /crian[çc]a|kids?\b|children|ni[ñn]os?|enfants?|fam[íi]lia|family|familia|famille|infantil|infantojuvenil|jovem|jovens|young|escola|school|escuela|[ée]cole|jogo|game|juego|jeu\b|mascote|mascot|bracvs|bracus|bracara augusta|gal[ée]cia|romanos em fam[íi]lia/i,
  },
  {
    name: 'braga-sounds-like-future',
    content: FUTURE_KNOWLEDGE,
    keywords:
      /marca|brand|pr[ée]mio|premio|award|prix\b|sounds like future|soa a futuro|investi|econom|[ée]conomie|universidade|university|universidad|universit[ée]|inova[çc][ãa]o|innovation|innovaci[óo]n|congresso|congress|congr[èe]s|neg[óo]cio|business|affaires|sustentabilidade|sustainability|sostenibilidad|durabilit[ée]|green destinations|media arts|unesco|hist[óo]ria de braga|history of braga|historia de braga|histoire de braga/i,
  },
];

// Máximo de módulos de detalhe por pedido (controla o tamanho do prompt).
// 1 módulo mantém o pedido dentro do limite de 12k tokens/min da Groq gratuita.
// 2 módulos: permite conversas que saltam de tema (ex.: bares -> jantar)
// terem os dois conhecimentos. O tamanho é controlado pelo teto de chars.
const MAX_MODULES = 2;

// Teto absoluto de caracteres do conhecimento (~7k tokens), para nenhum
// módulo grande rebentar o limite por minuto dos fornecedores gratuitos.
const MAX_KNOWLEDGE_CHARS = 21000;

// Módulos até este tamanho são "leves" e cabem no modo essencial (slim),
// usado pelo fornecedor de último recurso com limite por minuto pequeno.
const SMALL_MODULE_CHARS = 6000;

/**
 * Seleciona o conhecimento a enviar ao modelo com base nas últimas
 * mensagens do utilizador (as últimas 3, para apanhar contexto de
 * perguntas de seguimento como "e ao fim de semana?").
 *
 * slim=true (último recurso): core + apenas módulos LEVES relevantes.
 * Garante que listas críticas e pequenas (ex.: restaurantes validados)
 * chegam ao modelo mesmo no caminho de emergência - sem elas, o modelo
 * pequeno tende a inventar estabelecimentos.
 */
export async function selectKnowledge(userMessages: string[], slim = false): Promise<string> {
  const ultima = userMessages[userMessages.length - 1] ?? '';
  const contexto = userMessages.slice(-3).join('\n');
  // Ordena: primeiro os módulos que a ÚLTIMA pergunta ativa (tema atual),
  // depois os que só o contexto recente ativa. Assim o tema da pergunta
  // presente nunca fica de fora quando a conversa mudou de assunto.
  const relevantes = MODULES.filter((m) => m.keywords.test(contexto));
  relevantes.sort((a, b) => {
    const aU = a.keywords.test(ultima) ? 0 : 1;
    const bU = b.keywords.test(ultima) ? 0 : 1;
    return aU - bU;
  });
  const candidates = await Promise.all(
    relevantes.slice(0, MAX_MODULES).map(async (m) => {
      const full = typeof m.content === 'function' ? await m.content() : m.content;
      return { name: m.name, content: slim && m.contentSlim ? m.contentSlim : full };
    })
  );
  const matched = slim
    ? candidates.filter((m) => m.content.length <= SMALL_MODULE_CHARS)
    : candidates;

  const avisos = await avisosDaSheet();
  const parts = [CORE_KNOWLEDGE + avisos];
  for (const m of matched) {
    parts.push(`\n### MÓDULO DE DETALHE: ${m.name}\n${m.content}`);
  }
  let out = parts.join('\n');
  const cap = slim ? 12000 : MAX_KNOWLEDGE_CHARS;
  if (out.length > cap) {
    out =
      out.slice(0, cap) +
      '\n[NOTA: conhecimento truncado por limite de tamanho - se faltar detalhe, remete para visitbraga.travel]';
  }
  return out;
}

/**
 * Conhecimento essencial (só o core) - usado pelo fornecedor de último
 * recurso (groq-8b), cujo limite por minuto é demasiado pequeno para os
 * módulos de detalhe. Garante que há sempre uma resposta.
 */
export function coreOnly(): string {
  return CORE_KNOWLEDGE;
}

/** Nomes dos módulos que a pergunta ativa - usado só para analytics. */
export function matchedModuleNames(userMessages: string[]): string[] {
  const ultima = userMessages[userMessages.length - 1] ?? '';
  const contexto = userMessages.slice(-3).join('\n');
  return MODULES.filter((m) => m.keywords.test(contexto))
    .sort((a, b) => (a.keywords.test(ultima) ? 0 : 1) - (b.keywords.test(ultima) ? 0 : 1))
    .slice(0, MAX_MODULES)
    .map((m) => m.name);
}

/**
 * Nomes de estabelecimentos presentes no conhecimento selecionado - usado
 * pelo validador para saber o que é real. Extrai de linhas de lista dos
 * módulos de restaurantes/bares (que começam por "- Nome ...").
 */
export async function nomesConhecidos(userMessages: string[]): Promise<string[]> {
  const texto = await selectKnowledge(userMessages, false);
  const nomes = new Set<string>();
  for (const m of texto.matchAll(/^-\s*([^\n-(]+?)(?:\s+-|\s+\(|:|$)/gm)) {
    const nome = m[1].trim();
    // ignora linhas que são regras/instruções, não nomes
    if (
      nome.length >= 3 &&
      nome.length <= 60 &&
      /[A-ZÀ-Ú]/.test(nome[0]) &&
      !/^(sugerir|zona|no centro|fora|regra|nunca|prioridade|se |para |quando |escolhe)/i.test(nome)
    ) {
      nomes.add(nome);
    }
  }
  return Array.from(nomes);
}
