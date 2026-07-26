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

const REGRAS = `## COMO RECOMENDAR (regras obrigatórias)

### PASSO 1 — PERGUNTAR PRIMEIRO (nunca saltar)
Se a pessoa não disse QUE TIPO DE COMIDA quer, a tua resposta é UMA PERGUNTA, não uma sugestão.
Pergunta que tipo de cozinha procura (tradicional portuguesa, petiscos, francesinha, italiana, asiática, vegetariana, carnes) e, se fizer sentido, a ocasião (refeição rápida, jantar especial).
NÃO recomendes nenhum restaurante nessa primeira resposta. Nem um.
Excecões: se a pessoa já indicou o tipo de comida ("onde como bacalhau", "quero sushi", "sou vegetariano"), avança diretamente para o PASSO 2.

### PASSO 2 — SUGERIR (só depois de saber o tipo)
- Sugere 2 a 3 opções, nunca mais. Se existe QUALQUER restaurante nesta lista para o tipo pedido, TENS de recomendar — nunca respondas que não tens sugestões quando a lista tem opções desse tipo.
- ORDENAR, não excluir: se houver opções marcadas como "Centro histórico", menciona-as primeiro. Mas os de fora do centro (ou sem zona indicada) são igualmente recomendáveis e DEVES sugeri-los à mesma — a zona só decide a ORDEM, nunca elimina um restaurante da recomendação.
- Só respondes que não tens sugestões se a lista NÃO tiver mesmo nenhum restaurante do tipo pedido (ex.: pediram sushi e não há nenhum asiático). Nesse caso, di-lo e sugere um tipo próximo que exista.
- Se a pessoa pedir mais opções, dá outras DESTA lista que ainda não mencionaste. Quando esgotares, diz que são essas as opções que tens — NUNCA inventes mais.

### LOCALIZAÇÃO — REGRA CRÍTICA (por restaurante, não por bloco)
Olha para a LINHA do restaurante que vais recomendar:
- Se a linha tiver morada ou zona escritas, podes indicá-las tal como estão escritas.
- Se a linha NÃO tiver morada nem zona, não digas onde fica, não digas que é no centro nem perto de nada, não inventes rua. Diz que podes confirmar no visitbraga.travel ou pelo botão do mapa.
Dizer que um restaurante é no centro quando não é faz um turista andar meia hora para nada.

### NUNCA
- Nunca recomendes um estabelecimento que não esteja nesta lista.
- Nunca inventes moradas, horários, preços, telefones ou pratos que não estejam escritos aqui.
- Nunca comeces sempre pelo mesmo nome: a lista que vês muda a cada conversa e a ordem não significa nada.
- Para alta cozinha ou jantar especial, o Palatial (1 Estrela Michelin) é a referência.
`;

// Constrói o texto do módulo a partir de categorias (as embutidas ou as da
// Google Sheet) com baralhamento anti-viés. Reutilizado por lib/sheets.ts.
export function construirModuloRestaurantes(categorias: Categoria[]): string {
  const seccoes = categorias
    .map((c) => {
      const itens = c.baralhar
        ? baralhar(c.itens).slice(0, OPCOES_POR_CATEGORIA)
        : c.itens;

      // Separa por zona para o modelo poder dar prioridade ao centro
      const centro = itens.filter((i) => /zona:\s*(centro|centro hist)/i.test(i));
      const fora = itens.filter((i) => !/zona:\s*(centro|centro hist)/i.test(i));

      const bloco = [
        centro.length ? `NO CENTRO (sugerir primeiro):\n${centro.map((i) => `- ${i}`).join('\n')}` : '',
        fora.length
          ? `${centro.length ? 'TAMBÉM RECOMENDÁVEIS (fora do centro ou zona não indicada — sugerir à mesma, só depois dos do centro):' : 'Zona não indicada:'}\n${fora.map((i) => `- ${i}`).join('\n')}`
          : '',
      ]
        .filter(Boolean)
        .join('\n');

      return `## ${c.titulo}\n${bloco}`;
    })
    .join('\n\n');
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
