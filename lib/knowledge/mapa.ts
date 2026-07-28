// ============================================================
// KNOWLEDGE — MAPA TURÍSTICO OFICIAL DE BRAGA (Desdobrável PT)
// Fonte: Visit Braga — Mapa Turístico Oficial de Braga
// Textos originais do mapa: Luís Fontes e Miguel Bandeira
// Extraído para o chatbot Bracvs — visitbraga.travel
// ============================================================
// Para integrar no lib/knowledge.ts existente: importar e
// concatenar/mergir estas estruturas na base de conhecimento.
// ============================================================

export type TipologiaMonumento = "Romano" | "Medieval" | "Barroco" | "Contemporâneo";

export interface Monumento {
  id: number;
  nome: string;
  tipologias: TipologiaMonumento[];
  descricao?: string;
  localizacao?: string;
}

export interface Museu {
  id: number;
  nome: string;
}

export interface PontoBomJesus {
  id: number;
  nome: string;
}

export interface Contacto {
  entidade: string;
  telefone?: string;
  telefones?: string[];
  nota?: string;
}

// ------------------------------------------------------------
// SOBRE BRAGA — texto institucional do mapa
// ------------------------------------------------------------

export const sobreBraga = `Braga soa a casa, a história, a amanhã. Braga soa ao pulsar do Norte de Portugal, soa a natureza que respira e inspira. Soa às raízes romanas que constroem um passado sempre futuro. Soa ao verde dos parques, jardins e montes que abraçam. Soa a universidade que vibra, alimenta e qualifica. Soa a economia que investiga, edifica e prospera. Soa ao desporto que mobiliza. Aqui é Braga!`;

// ------------------------------------------------------------
// MONUMENTOS (1–40)
// Tipologias: Romano, Medieval, Barroco, Contemporâneo
// Descrições transcritas do desdobrável (quando existentes)
// ------------------------------------------------------------

export const monumentos: Monumento[] = [
  {
    id: 1,
    nome: "Sé de Braga e Tesouro-Museu",
    tipologias: ["Medieval", "Barroco"],
    descricao:
      "A mais antiga Sé Catedral de Portugal. Sagrada a 28 de agosto de 1089 sob a devoção a Santa Maria de Braga. A fachada, completada pela galilé do século XV e pelas arquivoltas românicas do pórtico, resulta de uma atualização barroca (1723). No interior podem observar-se o cadeiral do coro alto e os órgãos barrocos, obras-primas da talha. Destaque ainda para a sacristia, o Tesouro-Museu e as Capelas de São Gonçalo, da Glória e dos Reis, onde se destacam os túmulos de D. Gonçalo Pereira e dos Condes Portucalenses, D. Henrique e D.ª Teresa. Monumento Nacional desde 1910.",
  },
  {
    id: 2,
    nome: "Jardim de Santa Bárbara",
    tipologias: ["Medieval"],
    descricao:
      "Jardim feito à semelhança dos jardins renascentistas italianos, cujas flores são mudadas de acordo com as estações do ano. No centro encontra-se uma fonte do século XVII com uma estátua de Santa Bárbara, daí o nome do jardim. Tem como pano de fundo as paredes medievais do antigo Paço dos Arcebispos, no qual se pode admirar a ala gótica do século XIV, e de onde sobressaem os restos de uma arcaria pertencentes ao Paço.",
  },
  {
    id: 3,
    nome: "Largo do Paço",
    tipologias: ["Medieval", "Barroco"],
    descricao:
      "O Paço constituiu a sede da República Bracarense, extinta definitivamente em 1790. Na primeira metade do século XVIII, D. Rodrigo deu-lhe o aspeto geral que hoje apresenta: um amplo espaço público de enquadramento, hoje ligado à reitoria da Universidade do Minho. De salientar o fontenário central decorado com motivos heráldicos.",
  },
  {
    id: 4,
    nome: "Paço Arquiepiscopal dos Braganças",
    tipologias: ["Barroco"],
    descricao:
      "O arcebispo D. José de Bragança (1741-56), irmão do rei D. João V, cortesão e ilustrado, edificou uma nova ala do Paço ao gosto da época (1751), cujo risco se atribui à fase inicial de André Soares. A leitura do projeto exige, todavia, o enquadramento do palácio com a praça de planta trapezoidal que o defronta.",
  },
  {
    id: 5,
    nome: "Arco da Porta Nova",
    tipologias: ["Medieval", "Barroco"],
    descricao:
      "Porta Nova desde 1512, quando D. Diogo de Sousa (1505-1532) a mandou rasgar, estabeleceu o eixo fundamental de circulação intramuros. O arco monumental que hoje se vê foi levantado em 1772/73, no correr da prelatura de D. Gaspar, desde então um modo simbólico de afirmar a autonomia de Braga.",
  },
  {
    id: 6,
    nome: "Igreja de São Vicente",
    tipologias: ["Medieval", "Barroco"],
    descricao:
      "Elemento aglutinador de um arrabalde medieval, domina os trilhos ancestrais que demandavam o Nordeste Minhoto. Exibe uma estrutura antecedente indumentada pelos prenúncios barrocos.",
  },
  {
    id: 7,
    nome: "Capela dos Coimbras e Igreja de São João do Souto",
    tipologias: ["Medieval"],
    descricao:
      "A Igreja de São João do Souto, de cuja traça medieval pouco se conserva, foi edificada por Pedro Ourives e a sua mulher Elvira Mides, que em 1161 a doaram ao arcebispo de Braga e ao Cabido da Sé. Junto está a Capela dos Coimbras, único exemplar com elementos arquitetónicos manuelinos em Braga.",
  },
  {
    id: 8,
    nome: "Torre de Menagem",
    tipologias: ["Medieval"],
    descricao:
      "Do castelo de Braga, demolido no início do século XX, restam a parte inferior do cubelo Nordeste, sob a torre da atual Igreja da Lapa, e a imponente torre de menagem. Foi edificada no decurso do século XIV, por iniciativa conjunta dos arcebispos bracarenses e da coroa portuguesa, junto à porta do Souto, uma das mais importantes ligações da cidade ao interior minhoto. Construída em sólido aparelho de blocos graníticos bem esquadriados, muitos dos quais ostentam siglas de canteiro, a torre de menagem apresenta soluções arquitetónicas de estilo gótico, como a porta ogival e as varandas com matacães.",
  },
  {
    id: 9,
    nome: "Igreja de Santa Cruz",
    tipologias: ["Barroco"],
    descricao:
      "As obras da igreja tiveram início em 1625 e a sua primeira fase apenas foi concluída em 1653. Na fachada destacam-se os treze instrumentos da Paixão de Cristo, como a Coroa de Espinhos, os cravos e a esponja de fel, entre outros. Diz uma lenda que quem encontrar aqui dois galos simétricos tem casamento assegurado em breve.",
  },
  {
    id: 10,
    nome: "Igreja do Hospital de São Marcos",
    tipologias: ["Barroco"],
    descricao:
      "O conjunto dedicado a S. João Marcos é também um jogo de tensões entre estilos arquitetónicos. Liberto da decadente influência rococó, ostenta traços de estrutura tardo-barroca, de que é exemplo a convexidade saliente do corpo central. Por outro lado, recupera os motivos clássicos que sobressaem na impressão geral da fachada, evocando as impressões de S. Pedro, em Roma. O projeto de integração deve-se ao engenheiro Carlos Amarante (1787).",
  },
  {
    id: 11,
    nome: "Igreja da Misericórdia",
    tipologias: ["Medieval", "Barroco"],
    descricao:
      "Integra um dos mais consideráveis legados do período renascentista na cidade. Incluída no conjunto de edificações da Sé Catedral, esta igreja foi erguida entre 1560 e 1562, durante o tempo do Arcebispo D. Frei Bartolomeu dos Mártires. O altar desta igreja, em estilo barroco, é da autoria de Marcelino de Araújo, sendo a principal atração do edificado.",
  },
  {
    id: 12,
    nome: "Palácio dos Biscainhos",
    tipologias: ["Barroco"],
    descricao:
      "É o museu ilustrativo de uma casa senhorial urbana dos séculos XVII e XVIII, das suas vivências e quotidiano. A frontaria abre com uma curiosa disposição em L, atribuindo-lhe uma dimensão urbana claramente barroca na forma como acentua a relação do edifício com a rua.",
  },
  {
    id: 13,
    nome: "Câmara Municipal de Braga",
    tipologias: ["Barroco"],
    descricao:
      "Em sequência do recentramento funcional político-administrativo da cidade, de meados de setecentos, afirmou-se a nova Casa da Câmara, no lado oposto da praça. Iniciada em 1753 sob o risco de André Soares, só viria a ser concluída mais de um século depois, com o levantamento do terço norte debaixo do mesmo traço. Testemunho da perenidade do barroco bracarense.",
  },
  {
    id: 14,
    nome: "Torre de Santiago",
    tipologias: ["Medieval"],
    descricao:
      "A imponente Torre de Santiago, sobre a porta do mesmo nome — por onde entrava quem vinha do Porto, incluindo os peregrinos que se dirigiam a Santiago de Compostela — foi edificada no decurso do século XV. Apoiado na fachada interior da torre medieval, existe um oratório que sugestiona uma imensa igreja ao ar livre cuja nave é o Largo de S. Paulo, o pátio académico dos estudantes da Contrarreforma. O oratório terá sido erguido como recompensa à Virgem por ter poupado a cidade ao efeito do terramoto de 1755.",
  },
  {
    id: 15,
    nome: "Basílica dos Congregados",
    tipologias: ["Barroco"],
    descricao:
      "Testemunho da urbanização conventual pela qual passaram as cidades da Contrarreforma, o projeto do edifício é gizado pela Congregação do Oratório e igualmente atribuído a André Soares, acolhendo no seu complexo edificado, como um relicário exaltante, a capela de N.ª S.ª da Aparecida, um primor da arquitetura e da matemática saído do risco do mesmo arquiteto. A sua edificação conheceu um desenvolvimento lento, só concluído na segunda metade do século XX. Trata-se da obra mais emocionada do autor (R. Smith).",
  },
  {
    id: 16,
    nome: "Casa dos Crivos",
    tipologias: ["Barroco"],
    descricao:
      "A arquitetura civil de Braga dos séculos XVII e XVIII, sobretudo nas ruas do centro da cidade, ficaria marcada pela presença de balcões e gelosias, certamente por influência das rótulas usadas nas fenestrações conventuais. Uma característica da rutura entre o espaço público e privado.",
  },
  {
    id: 17,
    nome: "Arcada e Igreja da Lapa",
    tipologias: ["Barroco"],
    descricao:
      "É uma criação inscrita no plano das transformações urbanas do Renascimento. D. Rodrigo mandaria reformá-la (1715), edificando uma nova colunata. Durante a prelatura de D. Gaspar, e sendo já um local muito frequentado, foi ali erguida, por circunstâncias reevangelizadoras, uma capela de contornos clássicos dedicada a Nossa Senhora da Lapa (1761/64 e 1768). O mais duradouro cais de partida e de chegada a Braga.",
  },
  {
    id: 18,
    nome: "Igreja e Convento do Pópulo",
    tipologias: ["Barroco"],
    descricao:
      "Originário dos últimos anos do século XVI, erguido pela vontade de D. Frei Agostinho de Jesus (1588-1609), serviu de matéria-prima para Carlos Amarante ensaiar os seus dotes integracionistas. Sem antecipar a estrutura maneirista antecedente, sobretudo no interior, o engenheiro respeitaria a linguagem barroca da fachada, particularmente viva nas cúpulas das torres, introduzindo as primeiras ousadias neoclássicas.",
  },
  {
    id: 19,
    nome: "Palácio do Raio / CIMMB",
    tipologias: ["Barroco"],
    descricao:
      "Verdadeiro raio de luz barroca que iluminou Braga; o deslumbramento festivo e a emoção que causam no observador fazem dele um paradigma da arquitetura. O palacete, construído em 1753/54, está definido sob uma esquadria barroca aberta a toda a largura, e tudo o mais é uma versão soaresca do estilo Rocaille de inspiração franco-alemã. Alberga o Centro Interpretativo das Memórias da Misericórdia de Braga (CIMMB).",
    // TODO: confirmar redação exata do trecho final desta descrição no desdobrável impresso (passagem pouco legível na digitalização)
  },
  { id: 20, nome: "Igreja de São Victor", tipologias: ["Barroco"] },
  {
    id: 21,
    nome: "Santuário do Bom Jesus do Monte e Funicular",
    tipologias: ["Barroco", "Contemporâneo"],
    descricao:
      "Ver secção dedicada ao Santuário do Bom Jesus do Monte (Património Mundial da UNESCO).",
  },
  { id: 22, nome: "Santuário do Sameiro", tipologias: ["Contemporâneo"] },
  {
    id: 23,
    nome: "Mosteiro de São Martinho de Tibães",
    tipologias: ["Medieval", "Barroco"],
    descricao:
      "Mais próximo do rio Cávado, o viajante que demande o Mosteiro de São Martinho de Tibães vislumbra a silhueta de um grandioso complexo monacal do século XVII. O templo, o convento e a cerca entrelaçam-se numa simbiose paisagística que evoluiu no decurso do tempo.",
  },
  {
    id: 24,
    nome: "Capela de São Frutuoso e Convento de São Francisco",
    tipologias: ["Medieval", "Barroco"],
    descricao:
      "Mandada edificar pelo bispo Frutuoso de Braga cerca do ano 665, para abrigar a sua sepultura, junto ao Mosteiro de São Salvador de Montélios, nos arredores da cidade, a Capela de São Frutuoso é um dos mais raros e complexos exemplares de arquitetura cristã antiga da Península Ibérica. Mais tarde, D. Rodrigo, sobre a estrutura quinhentista antecedente, promoveria desde 1728 a reforma do mosteiro em convento e a construção de uma igreja dedicada a São Francisco.",
  },
  { id: 25, nome: "Mamoa de Lamas", tipologias: ["Romano"] },
  { id: 26, nome: "Santuário de Santa Maria Madalena da Falperra", tipologias: ["Barroco"] },
  { id: 27, nome: "Estádio Municipal", tipologias: ["Contemporâneo"] },
  { id: 28, nome: "Capela de São João da Ponte", tipologias: ["Barroco"] },
  {
    id: 29,
    nome: "Fonte do Ídolo",
    tipologias: ["Romano"],
    descricao:
      "Monumento romano singular e um dos mais harmoniosos da Península Ibérica; acredita-se que terá sido um santuário particular dedicado a Tongoenabiago. Integra as ruínas romanas de Bracara Augusta.",
  },
  {
    id: 30,
    nome: "Termas e Teatro Romanos do Alto da Cividade",
    tipologias: ["Romano"],
    descricao:
      "Representam o apogeu da cidade de Bracara Augusta na época dos imperadores flávios. Integram as ruínas romanas da capital da província romana da Galécia.",
  },
  {
    id: 31,
    nome: "Domus da Escola Velha da Sé",
    tipologias: ["Romano"],
    descricao:
      "Uma das várias casas romanas descobertas no centro histórico da cidade, representa o estilo de vida dos patrícios na cidade de Bracara Augusta.",
  },
  {
    id: 32,
    nome: "Balneário Pré-Romano da Estação",
    tipologias: ["Romano"],
    descricao:
      "Marca da presença do povo Brácaro no centro da cidade antes da romanização.",
  },
  { id: 33, nome: "Capela Imaculada Conceição", tipologias: ["Barroco"] },
  { id: 34, nome: "Capela Árvore da Vida", tipologias: ["Contemporâneo"] },
  { id: 35, nome: "Igreja do Carmo", tipologias: ["Barroco"] },
  { id: 36, nome: "Sete Fontes", tipologias: ["Barroco"] },
  { id: 37, nome: "Capela de Guadalupe", tipologias: ["Barroco"] },
  { id: 38, nome: "Casa Rolão", tipologias: ["Barroco"] },
  { id: 39, nome: "Mercado Cultural do Carandá", tipologias: ["Contemporâneo"] },
  { id: 40, nome: "Convento das Convertidas", tipologias: ["Barroco"] },
];

// Nota de contexto sobre as ruínas romanas (texto agregado 29/30/31/32)
export const bracaraAugusta = `Da cidade romana de Bracara Augusta, capital da província romana da Galécia, subsistem algumas ruínas romanas, testemunhos da sua grandiosidade: a Fonte do Ídolo (29), as Termas e o Teatro Romanos do Alto da Cividade (30), a Domus Romana da Escola Velha da Sé (31) e o Balneário Pré-Romano da Estação (32).`;

// ------------------------------------------------------------
// MUSEUS
// ------------------------------------------------------------

export const museus: Museu[] = [
  { id: 1, nome: "Museu de Arqueologia D. Diogo de Sousa" },
  { id: 2, nome: "Museu Nogueira da Silva" },
  { id: 3, nome: "Museu Pio XII" },
  { id: 4, nome: "Museu da Imagem" },
  { id: 5, nome: "Museu do Traje" },
  { id: 6, nome: "Museu de Cordofones Domingos Machado" },
  { id: 7, nome: "Núcleo Museológico de São Martinho de Dume" },
  { id: 8, nome: "Centro Interpretativo dos Abades de Priscos" },
];

// ------------------------------------------------------------
// SANTUÁRIO DO BOM JESUS DO MONTE
// ------------------------------------------------------------

export const bomJesus = {
  nome: "Santuário do Bom Jesus do Monte",
  classificacao: "Património Mundial da UNESCO",
  sobre:
    "Todo o conjunto justificaria um roteiro exclusivo. Recriação teatralizada do Gólgota de Jerusalém; mais do que qualquer particular, pontifica aqui o triunfo da perspetiva. Arquitetura e paisagem entrelaçam-se numa simbiose perfeita. O contraste entre o granito e a alvura dos taludes tem o dom de estimular no peregrino a visão do cálice da suprema comunhão. Pelo meio sente-se o registo das águas purificadoras que brotam das múltiplas fontes, revelando um programa que junta o pagão e o cristão. No cimo abre-se, com a imponência de um clímax, o templo de inspiração neoclássica do Bom Jesus (1784-1857), da autoria do engenheiro Carlos Amarante, que abre o Bom-Jesus à modernidade do século XIX.",
  pontos: [
    { id: 1, nome: "Basílica do Bom Jesus do Monte" },
    { id: 2, nome: "Escadório das Virtudes" },
    { id: 3, nome: "Escadório dos Cinco Sentidos" },
    { id: 4, nome: "Escadório do Pórtico" },
    { id: 5, nome: "Escadório da Ressurreição" },
    { id: 6, nome: "Capelas da Via Sacra" },
    { id: 7, nome: "Elevador / Funicular" },
    { id: 8, nome: "Terreiro dos Evangelistas" },
    { id: 9, nome: "Gruta de Ernesto Korrodi" },
    { id: 10, nome: "Casa de Fresco" },
    { id: 11, nome: "Estrada Mágica do Bom Jesus" },
  ] as PontoBomJesus[],
  servicos: [
    "Barcos (passeios no lago)",
    "Passeios a cavalo",
    "Estacionamento",
    "Lago",
    "Monóculo / miradouro",
    "Paragem de Autocarro TUB — linhas 2 e 88",
    "Parque de Merendas",
    "Parque Infantil",
    "Sanitários",
  ],
  acessos: {
    autocarroTUB: "Linhas 2 e 88",
    funicular:
      "O Elevador do Bom Jesus (funicular) liga a base do santuário ao topo.",
    // TODO: confirmar dados técnicos do funicular indicados no cabeçalho do mapa (altitude/inclinação pouco legíveis na digitalização)
  },
  distancias: {
    centroHistorico: "≈ 7,7 km do Centro Histórico",
    // TODO: confirmar distância ao Santuário do Sameiro indicada no mapa (valor pouco legível)
  },
};

// ------------------------------------------------------------
// ROTEIROS OFICIAIS
// ------------------------------------------------------------

export const roteiros = [
  {
    nome: "Roteiro de 3 dias",
    descricao:
      "Roteiro oficial para descobrir Braga em três dias. Percurso disponível através do QR Code do mapa turístico / mapa digital do Visit Braga.",
  },
  {
    nome: 'Roteiro Infanto-Juvenil "A Cidade do Bracvs"',
    descricao:
      "Roteiro oficial pensado para famílias com crianças, protagonizado pelo Bracvs, o Guia do Visit Braga. Percurso disponível através do QR Code do mapa turístico / mapa digital do Visit Braga.",
  },
];

// ------------------------------------------------------------
// VIAS E PERCURSOS (identificação no mapa)
// ------------------------------------------------------------

export const viasEPercursos = [
  "Via Circular",
  "Vias Principais",
  "Zona Pedonal",
  "Ciclovias",
  "Ecovia do Rio Este",
  "Caminho de Santiago",
  "Nacional (EN 103) e Rota Norte",
];

// ------------------------------------------------------------
// PONTOS DE INTERESSE (categorias assinaladas no mapa)
// ------------------------------------------------------------

export const pontosDeInteresse = [
  "Aeródromo",
  "Albergue de Peregrinos",
  "Arquivo Distrital",
  "Arquivo Municipal",
  "Autocarros",
  "Biblioteca",
  "Centro Comercial",
  "Centro de Juventude de Braga (CJB)",
  "Comboios (estação ferroviária)",
  "Correios",
  "Drop-off de Bagagens",
  "Estacionamento",
  "Farmácia 24H",
  "Forum Braga",
  "Galeria de Arte",
  "GNRation",
  "Hospital",
  "Mercado Municipal",
  "Miradouro",
  "Parque de Campismo",
  "Parque Desportivo",
  "Parque Infantil",
  "Paragens de Autocarro TUB (Basílica do Bom Jesus do Monte, Santuário do Sameiro, Mosteiro de Tibães, Parque de Campismo, Estádio Municipal/Dume, Circuito Urbano — algumas linhas apenas aos fins de semana)",
  // TODO: confirmar números exatos das linhas TUB por destino (legenda pouco legível na digitalização; confirmado apenas 2/88 para o Bom Jesus)
  "Polícia",
  "Posto de Turismo",
  "Praia Fluvial",
  "Quinta Pedagógica",
  "Sala de Espetáculos",
  "Sanitários",
  "Táxis",
  "Theatro Circo",
  "Turismo Porto e Norte de Portugal — Loja Interativa",
  "Universidade",
  "Planetário — Centro Ciência Viva",
];

// ------------------------------------------------------------
// POSTO DE TURISMO
// ------------------------------------------------------------

export const postoDeTurismo = {
  nome: "Posto de Turismo de Braga",
  telefone: "+351 253 262 550",
  email: "turismo@cm-braga.pt",
  morada: "Avenida da Liberdade, 1, 4710-305 Braga, Portugal",
};

// ------------------------------------------------------------
// CONTACTOS ÚTEIS
// ------------------------------------------------------------

export const contactosUteis: Contacto[] = [
  { entidade: "Número de Emergência Nacional", telefone: "112" },
  { entidade: "Hospital de Braga", telefone: "+351 253 027 000" },
  { entidade: "Bombeiros Sapadores Braga", telefone: "+351 253 264 077" },
  { entidade: "Bombeiros Voluntários Braga", telefone: "+351 253 200 430" },
  { entidade: "Polícia de Segurança Pública (PSP)", telefone: "+351 253 200 420" },
  { entidade: "Polícia Municipal de Braga", telefone: "+351 253 609 740" },
  { entidade: "Guarda Nacional Republicana (GNR)", telefone: "+351 253 609 740" },
  // TODO: PSP Municipal e GNR aparecem com números próximos na digitalização — confirmar no desdobrável impresso
  {
    entidade: "Câmara Municipal de Braga",
    telefone: "+351 253 616 060", // TODO: confirmar — dígitos pouco legíveis na digitalização
  },
  {
    entidade: "Táxis",
    telefones: ["+351 253 253 253", "+351 253 253 053"], // TODO: confirmar segundo número
  },
  { entidade: "Transportes Urbanos de Braga (TUB)", telefone: "+351 253 606 890" },
];

// ------------------------------------------------------------
// CENTRO HISTÓRICO / OUTRAS NOTAS DO MAPA
// ------------------------------------------------------------

export const notasGerais = [
  "O Centro Histórico de Braga está delimitado no mapa e é gerido em articulação com a marca CBA — Centro Braga.",
  "O mapa assinala as antigas muralhas da cidade: Muralha Romana e Muralha Medieval.",
  "O mapa turístico oficial é gratuito e está disponível no Posto de Turismo.",
  "Existe um mapa digital com recomendações, dicas e outras informações úteis, acessível por QR Code no desdobrável.",
  "Braga integra as redes: European Best Destinations (prémios de destino europeu), Green Destinations, UNESCO (Bom Jesus do Monte — Património Mundial) e Braga City of Media Arts (Cidade Criativa da UNESCO — Artes dos Media).",
  "É proibida a reprodução total ou parcial do mapa, bem como a sua comercialização, sem autorização prévia dos detentores dos direitos.",
];

// ------------------------------------------------------------
// EXPORT AGREGADO — conveniência para merge no knowledge.ts
// ------------------------------------------------------------

export const mapaTuristicoBraga = {
  fonte: "Mapa Turístico Oficial de Braga — Visit Braga (desdobrável PT)",
  autoresTextos: "Luís Fontes e Miguel Bandeira",
  sobreBraga,
  monumentos,
  bracaraAugusta,
  museus,
  bomJesus,
  roteiros,
  viasEPercursos,
  pontosDeInteresse,
  postoDeTurismo,
  contactosUteis,
  notasGerais,
};

export default mapaTuristicoBraga;

// Versão em texto para injeção no prompt do modelo
export const MAPA_KNOWLEDGE =
  'FONTE: Mapa Turístico Oficial de Braga (Visit Braga).\n' +
  JSON.stringify(mapaTuristicoBraga);
