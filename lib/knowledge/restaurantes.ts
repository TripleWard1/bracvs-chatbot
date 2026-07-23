// lib/knowledge/restaurantes.ts
// LISTA OFICIAL DE RESTAURANTES DE BRAGA — fornecida e validada pela
// Divisão de Economia e Turismo. Esta é a ÚNICA fonte para recomendações.
//
// A ordem dentro de cada categoria é BARALHADA a cada pedido: os modelos
// tendem a recomendar os primeiros itens de uma lista, e o baralhar
// garante variedade real nas sugestões. Exceção: Fine Dining (Palatial
// primeiro, por mérito — Estrela Michelin).

type Categoria = { titulo: string; itens: string[]; baralhar: boolean };

const CATEGORIAS: Categoria[] = [
  {
    titulo: 'Fine Dining',
    baralhar: false,
    itens: [
      'Palatial — 1 ESTRELA MICHELIN. A referência de alta cozinha de Braga; ideal para jantares especiais.',
      'Esperança Verde — Recomendado pelo Guia Michelin (vegetariano/vegan).',
    ],
  },
  {
    titulo: 'Casas Históricas (cafés e restaurantes com história)',
    baralhar: true,
    itens: [
      'Café Vianna — Praça da República; café e restaurante histórico, um dos mais antigos de Portugal.',
      'A Brasileira — café e restaurante histórico no coração do centro.',
      'Frigideiras do Cantinho — casa histórica das frigideiras de Braga; é restaurante, não apenas café.',
      'Pastelaria Lusitana — pastelaria histórica de Braga.',
    ],
  },
  {
    titulo: 'Cozinha Portuguesa / Tradicional',
    baralhar: true,
    itens: [
      'Restaurante Cozinha da Sé',
      'pPlace Restaurant',
      'Mesa na Praça — Mercado Municipal de Braga',
      'Casa de Pasto das Carvalheiras',
      'Taberna do Paço',
      'Tasquinha Dom Ferreira',
      'Taberna da Fonte',
      'Taberna Velhos Tempos',
      'Tasquinha do Fujacal',
      "Trota's",
      'Dom Augusto — Rua D. Paio Mendes 55, 4700-424 Braga',
      'Bem-Me-Quer — Campo das Hortas 6, 4700-210 Braga',
      'Arcoense',
      'Retrokitchen',
      'O Filho da Mãe',
      'Antù Braga',
      'Donna Sé',
    ],
  },
  {
    titulo: 'Petiscos',
    baralhar: true,
    itens: [
      'Apoena Petiscaria',
      'Taberna do Paço',
      'Taberna da Fonte',
      'Mesa da Saudade',
      'Casa de Pasto das Carvalheiras',
    ],
  },
  {
    titulo: 'Francesinhas',
    baralhar: true,
    itens: ['Taberna Londrina Braga Centro', 'Taberna Belga', 'Camada'],
  },
  {
    titulo: 'Italiano',
    baralhar: true,
    itens: ['La Porta', 'Fornito', "Pizza D'Artista", 'Italian Republic'],
  },
  {
    titulo: 'Japonês / Asiático',
    baralhar: true,
    itens: [
      'Omakase Braga',
      'SHOYU',
      'Midtown Ramen',
      'Ramen Break',
      'Beijing',
      'Mezobeli',
      'Noki Street Food',
      "Bajwa's Curry & Cocktails",
    ],
  },
  {
    titulo: 'Steakhouse / Carnes',
    baralhar: true,
    itens: ['Intimista Steakhouse', 'Churrasqueira Nacional'],
  },
  {
    titulo: 'Vegetariano / Vegan',
    baralhar: true,
    itens: ['Gosto Superior', 'Hibiscus', 'Esperança Verde (Guia Michelin — Recomendado)'],
  },
];

// Nº máximo de opções mostradas por categoria em cada pedido. Mostrar a
// categoria inteira faz o modelo agarrar-se sempre aos mesmos nomes; uma
// amostra diferente a cada conversa força variedade real.
const OPCOES_POR_CATEGORIA = 10;

function baralhar<T>(arr: T[]): T[] {
  const copia = [...arr];
  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copia[i], copia[j]] = [copia[j], copia[i]];
  }
  return copia;
}

const REGRAS = `## COMO RECOMENDAR (regras de comportamento)
1. Recomendar APENAS restaurantes desta lista. NUNCA inventar nomes nem sugerir espaços de outras cidades.
1b. PROIBIDO INVENTAR DETALHES. Só podes indicar morada, rua, zona, horário, preço, telefone ou pratos concretos de um restaurante se essa informação estiver ESCRITA nesta lista. A esmagadora maioria não tem morada aqui — nesses casos, se perguntarem onde fica, responde honestamente que não tens a morada exata e sugere consultar o visitbraga.travel ou o mapa. É preferível dizer "não sei ao certo" do que arriscar uma morada errada: um turista a andar até à rua errada é o pior que te pode acontecer.
2. Em cada conversa vês apenas UMA AMOSTRA de cada categoria, diferente de conversa para conversa. A ordem é aleatória e não reflete qualidade. Escolhe os que melhor correspondem ao PEDIDO da pessoa (tipo de cozinha, ocasião, ambiente) — nunca por ordem de lista.
2b. Se pedirem mais opções, sugere outros nomes DESTA lista que ainda não tenhas mencionado. Se já mencionaste todos os que aqui estão, diz com honestidade que essas são as opções que tens para esse tipo de comida e pergunta se querem explorar outro tipo de cozinha, ou remete para visitbraga.travel. NUNCA inventes um nome para satisfazer um pedido de "mais opções" — é preferível dizer que não tens mais.
2c. Se pedirem uma LISTA, usa exatamente os nomes que estão escritos aqui — nenhum outro. Não há restaurantes preferidos: todos os desta lista são recomendáveis.
2d. Escreve os nomes tal como estão escritos nesta lista, sem abreviar nem alterar.
3. Se o pedido for genérico ("restaurantes em Braga", "onde comer", "mais restaurantes"): NÃO despejar a lista. Pergunta primeiro o que a pessoa procura — tipo de cozinha (tradicional? italiana? asiática? vegetariana?), ocasião (refeição rápida, jantar especial, petiscos) — e só depois recomenda.
4. Quando o tipo é claro, sugere 2 a 3 opções dessa categoria, não a categoria inteira.
5. Os históricos são para quando encaixam: interesse em história/tradição, café, pequeno-almoço, lanche, experiência icónica — não são a resposta por defeito a "onde jantar".
6. Para ocasiões especiais / alta cozinha, destaca o Palatial (1 Estrela Michelin, o topo da gastronomia bracarense).`;

// Constrói o texto do módulo a partir de categorias (as embutidas ou as da
// Google Sheet) com baralhamento anti-viés. Reutilizado por lib/sheets.ts.
export function construirModuloRestaurantes(categorias: Categoria[]): string {
  const seccoes = categorias.map((c) => {
    // Fine Dining e categorias pequenas vão inteiras; as grandes vão em
    // amostra aleatória, diferente a cada pedido.
    const itens = c.baralhar
      ? baralhar(c.itens).slice(0, OPCOES_POR_CATEGORIA)
      : c.itens;
    return `## ${c.titulo}\n${itens.map((i) => `- ${i}`).join('\n')}`;
  }).join('\n\n');
  return `# RESTAURANTES DE BRAGA — LISTA OFICIAL VALIDADA\n\n${REGRAS}\n\n${seccoes}\n`;
}

// Versão embutida (fallback quando a Google Sheet não está configurada)
export function getRestaurantesKnowledge(): string {
  return construirModuloRestaurantes(CATEGORIAS);
}

// Nomes limpos (sem descrições) — usados pela deteção de locais no cliente
// para gerar botões "Ver no mapa". Não contém segredos.
export const NOMES_RESTAURANTES: string[] = Array.from(
  new Set(
    CATEGORIAS.flatMap((c) =>
      c.itens.map((i) => i.split(' — ')[0].split(' (')[0].trim())
    )
  )
);
