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

type Module = { name: string; content: string; keywords: RegExp };

const MODULES: Module[] = [
  {
    name: 'transportes',
    content: TRANSPORTES_KNOWLEDGE,
    keywords:
      /autocarro|autobus|autobús|bus\b|comboio|train|tren|esta[çc][ãa]o|station|estación|gare\b|guimar[ãa]es|\btub\b|hor[áa]ri|schedule|timetable|horaires|aeroporto|airport|a[ée]roport|getbus|shuttle|t[áa]xi|taxi|transporte|transport|como chego|como llegar|how (do i|to) get|comment (aller|arriver)|bilhete|ticket|billet|passe\b|abono/i,
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
const MAX_MODULES = 2;

/**
 * Seleciona o conhecimento a enviar ao modelo com base nas últimas
 * mensagens do utilizador (as últimas 3, para apanhar contexto de
 * perguntas de seguimento como "e ao fim de semana?").
 */
export function selectKnowledge(userMessages: string[]): string {
  const haystack = userMessages.slice(-3).join('\n');
  const matched = MODULES.filter((m) => m.keywords.test(haystack)).slice(0, MAX_MODULES);

  const parts = [CORE_KNOWLEDGE];
  for (const m of matched) {
    parts.push(`\n### MÓDULO DE DETALHE: ${m.name}\n${m.content}`);
  }
  return parts.join('\n');
}
