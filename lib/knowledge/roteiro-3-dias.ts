/**
 * KNOWLEDGE BASE - Roteiro "Descobrir Braga em 3 Dias"
 * Fonte: Município de Braga - Departamento de Cultura e Turismo / Divisão de Economia e Turismo
 * Elaboração: Ana Esteves, Luís Ferreira | Coordenação: Luís Ferreira, Hugo Barros
 * Extraído para o chatbot Bracvs - visitbraga.travel
 */

export const ROTEIRO_3_DIAS = {
  introducao: {
    descricao:
      "Roteiro concebido para visitar Braga de um até três dias. Com um dia obtém-se uma visão geral do que mais caracteriza a cidade (sugestões do primeiro dia). Em dois dias alarga-se a experiência numa viagem histórica - Braga é uma cidade bimilenar, fundada em 16 a.C. pelos Romanos, onde ruínas e edifícios contemporâneos convivem em harmonia. Com três dias expande-se a viagem por espaços monumentais e culturais ecléticos, desde igrejas barrocas a espaços arquitetónicos do século XX. Braga conserva tradição conciliando-a com inovação, com um caráter empreendedor, dinâmico e jovem. Braga soa a futuro.",
    fundacao: "16 a.C. pelos Romanos (Bracara Augusta)",
  },

  codigoDeEtica: [
    "Respeite o modo de vida e as tradições locais",
    "Respeite e preserve o património natural",
    "Respeite o silêncio",
    "Respeite e preserve o património cultural",
    "Respeite a comunidade local",
    "Escolha produtos e serviços locais",
    "Deposite o lixo de forma correta",
  ],

  primeiroDia: [
    {
      nome: "Arco da Porta Nova",
      descricao:
        "Mandado construir por D. Diogo de Sousa em 1512 e reformado por D. Gaspar de Bragança em 1772, é o 'ex-libris' de Braga, onde antigamente se entregavam simbolicamente as chaves da cidade. Juntamente com a Torre de Santiago, é uma das oito portas da muralha medieval que se conserva na atualidade. Junto a esta porta encontrava-se uma praça com mercado de peixe, uma das praças abertas por ordem de D. Diogo de Sousa, arcebispo inspirado pelas ideias renascentistas das suas viagens a Roma.",
      curiosidade:
        "Por nunca ter tido porta, o Arco tornou-se um símbolo da abertura e hospitalidade de Braga, nunca fechando a porta ao Mundo. Quando alguém deixa a porta aberta, usa-se a expressão 'És de Braga'.",
    },
    {
      nome: "Sé Catedral",
      tempoVisita: "2h00",
      website: "se-braga.pt",
      descricao:
        "A fundação da Catedral é anterior à nacionalidade de Portugal. Começou a ser construída nos finais do séc. XI e foi sagrada e dedicada à Virgem Maria em 1089 pelo Arcebispo D. Pedro. Aqui estão sepultados D. Teresa e D. Henrique de Borgonha, os pais de D. Afonso Henriques, o primeiro rei de Portugal. Convivem diferentes estilos artísticos; pouco resta do românico além da estrutura. Do período barroco destacam-se o Coro Alto e os órgãos, ao gosto do Rei D. João V (o 'Rei-Sol português'). Nas dependências há quatro capelas acessíveis pelo claustro e o Tesouro-Museu, com vasta coleção sobre a história da Igreja de Braga.",
      curiosidade:
        "A expressão 'mais velho que a Sé de Braga' refere-se a algo verdadeiramente muito antigo.",
    },
    {
      nome: "Câmara Municipal de Braga (Praça do Município)",
      descricao:
        "O atual edifício, que substituiu o anterior renascentista, foi construído entre 1753 e 1756. Projeto de André Soares, considerado um dos mais notáveis exemplares da arquitetura barroca da Península Ibérica. Na fachada simétrica, a decoração das grandes janelas inspira-se nas mitras dos Arcebispos. Ao centro, um nicho com a imagem de Nossa Senhora do Livramento, que pertencia ao antigo edifício dos Paços do Concelho.",
    },
    {
      nome: "Biblioteca Pública de Braga / Paço Arquiepiscopal",
      website: "bpb.uminho.pt",
      descricao:
        "O Paço Arquiepiscopal é um dos edifícios mais emblemáticos da cidade - era a residência dos Arcebispos, donos e Senhores de Braga. Projetado no séc. XVIII em estilo barroco, foi vítima de um grande incêndio e reconstruído nos anos 30 do séc. XX, respeitando o estilo original.",
    },
    {
      nome: "Rua do Souto",
      descricao:
        "A mais tradicional rua comercial de Braga. Mandada abrir em 1466, num caminho ladeado de castanheiros que dava acesso ao antigo castelo de Braga, na cidadela, destruído em 1906.",
    },
    {
      nome: "Jardim de Santa Bárbara",
      descricao:
        "Jardim feito à semelhança dos jardins da Renascença italiana, cujas flores mudam de acordo com as estações do ano. No centro, uma fonte do século XVII com a estátua de Santa Bárbara, daí o nome. Tem como pano de fundo as paredes medievais do antigo Paço dos Arcebispos, com a ala gótica do século XIV e restos de uma arcaria.",
    },
    {
      nome: "Praça da República e Arcada",
      descricao:
        "É o centro de Braga e ponto de encontro preferido dos bracarenses. Tem origem na Idade Média - aqui comercializavam-se os bens que abasteciam a cidade, servindo a arcada de alpendre para animais e mercadorias. A Arcada atual data de 1715. Ao centro está a Igreja da Lapa e, nas laterais, cafés emblemáticos, nomeadamente o Café Vianna, o mais antigo da cidade (1858).",
    },
    {
      nome: "Torre de Menagem",
      descricao:
        "O mais importante elemento remanescente do antigo castelo mandado construir pelo rei D. Dinis e restaurado por D. Fernando, cujo brasão subsiste sobre a porta. Com cerca de 30 metros de altura e interior de três pisos, impõe-se no centro histórico, onde ainda se encontram vestígios da antiga muralha medieval.",
    },
    {
      nome: "Casa dos Crivos",
      descricao:
        "Um dos únicos exemplares da arquitetura urbana civil em Braga, típica dos séculos XVII e XVIII. As janelas estão cobertas de gelosias, refletindo o clima de forte religiosidade e recolhimento da época. Estes imóveis cobertos de crivos eram vulgares na zona central e correspondiam quase sempre a habitações de mercadores - o piso térreo tinha amplas portas para deixar entrar luz e mostrar as mercadorias.",
    },
    {
      nome: "Igreja de Santa Cruz",
      descricao:
        "As obras tiveram início em 1625 e a primeira fase foi concluída em 1653. Na fachada destacam-se os treze instrumentos da paixão de Cristo (coroa de espinhos, cravos, esponja de fel, etc.).",
      curiosidade:
        "Segundo a lenda, quem encontrar os dois galos simétricos na fachada casará em breve ou casará em Braga - por isso há muita gente de olhar fixo na fachada. Há a versão de que são três galos, alusão à negação de Pedro (que negou três vezes conhecer Jesus), mas é muito difícil encontrar o terceiro; há quem diga que não existe e quem confunda o ganso com um galo num dos cataventos da torre.",
    },
    {
      nome: "Igreja do Hospital de S. Marcos",
      descricao:
        "No séc. XVI foram reunidos num só hospital os doentes e pobres até então acolhidos em pequenos albergues de caridade espalhados pela cidade. Fachada e igreja de estilo neoclássico, com reminiscências do barroco. Aqui se conservam as relíquias do Apóstolo S. João Marcos.",
    },
    {
      nome: "Casa e Capela dos Coimbras",
      descricao:
        "Conjunto erguido no séc. XVI, único exemplar com elementos arquitetónicos manuelinos em Braga. Em 1906 a casa foi demolida devido à abertura do Largo S. João do Souto e reconstruída do lado oposto da rua, conservando os elementos manuelinos.",
    },
    {
      nome: "Santuário do Bom Jesus do Monte",
      website: "bomjesus.pt",
      patrimonio: "Património Mundial da Humanidade (UNESCO) desde 2019",
      descricao:
        "O verdadeiro ex-libris da cidade dos Arcebispos, onde natureza e arte 'dão mutuamente as mãos'. As origens remontam ao princípio do século XIV, quando foi colocada uma cruz no alto da encosta do monte Espinho, depois abrigada por uma ermida que se tornou meta de peregrinação. A ideia de transformar a ermida da Santa Cruz do Monte num grandioso monumento em honra da paixão de Cristo ganhou corpo. Em suave ziguezague desenvolve-se um Escadório com uma capela em cada patamar, alusiva aos passos da Via Sacra; segue-se o escadório dos Cinco Sentidos com fontes alegóricas, rematando com o Escadório das Três Virtudes e o Terreiro de Moisés - dando ao conjunto o aspeto de um cálice da consagração. Uma das maiores intervenções tardo-barrocas do país e referência obrigatória do Barroco europeu.",
      curiosidade:
        "Elevador do Bom Jesus: inaugurado a 25 de março de 1882 e sem registo de qualquer acidente, é atualmente o mais antigo funicular do mundo a utilizar o sistema de contrapeso de água. Sobe e desce de meia em meia hora e demora 2 a 3 minutos a fazer o percurso. Números: 2 vias, movimento simultâneo de subida e descida, 274 metros de percurso, 116 m de desnível, 42% de inclinação, 1,8 m/seg. de velocidade.",
    },
  ],

  segundoDia: [
    {
      nome: "Museu – Palácio dos Biscainhos",
      tempoVisita: "30 min",
      website: "museudosbiscainhos.gov.pt",
      descricao:
        "A rua deu o nome ao palácio, em alusão aos artífices vindos da Biscaia que aí se instalaram no século XVI e trabalharam na valorização urbanística de Braga. Construída no séc. XVII, a casa alberga hoje um museu que representa o quotidiano nobre do Norte no período barroco. Os jardins integram a 'Rota dos Jardins Históricos do Baixo Minho' e neles pode apreciar-se um Tulipeiro com quase 300 anos, classificado como de Interesse Público.",
    },
    {
      nome: "Termas Romanas do Alto da Cividade",
      tempoVisita: "20/30 min",
      descricao:
        "Complexo termal construído entre os séculos I-III d.C. e abandonado no século V d.C., quando o Império Romano no Ocidente entrava em colapso. Era um espaço de convívio e descontração - através das salas frias e quentes e da palestra (espaço dedicado ao exercício físico), os romanos cuidavam do corpo. A norte do edifício termal foram encontrados vestígios arqueológicos de um teatro romano da mesma época.",
    },
    {
      nome: "Museu de Arqueologia D. Diogo de Sousa",
      tempoVisita: "1h00",
      website: "museuddiogodesousa.gov.pt",
      descricao:
        "Vestígios da ocupação antiga, do Paleolítico à Idade Média, e informação sobre sítios arqueológicos visitáveis na região. Destaque para a Coleção Bühler-Brockhaus, que complementa a exposição permanente com peças originárias do berço da Antiguidade Clássica (inclui o Busto do Imperador Augusto).",
    },
    {
      nome: "Museu Pio XII e Torre de Santiago",
      tempoVisita: "55 min",
      website: "museupioxii.pt",
      descricao:
        "A coleção abarca arqueologia, ourivesaria, adereços litúrgicos, entre outras. Pode conhecer-se a obra de Henrique Medina, pintor, paisagista e um dos grandes retratistas do século XX. O museu proporciona uma visita à Torre Medieval conhecida como 'Nossa Senhora da Torre', que no cimo dá acesso a uma magnífica panorâmica da cidade.",
      curiosidade:
        "No pavimento do Largo de São Paulo, onde se localiza a Torre de Santiago, foram descobertos em 1998 vestígios de uma antiga domus romana (residência familiar). Os contornos desses muros foram assinalados no pavimento do largo.",
    },
    {
      nome: "Palácio do Raio",
      tempoVisita: "40 min",
      website: "scmbraga.pt/cimmb-palácio-do-raio",
      descricao:
        "Também conhecido como Casa do Mexicano, deve o nome a um dos proprietários - Miguel José Raio, visconde de São Lázaro. Construção de 1754-1755, projeto do arquiteto bracarense André Soares, entre o final do barroco e o início do rococó. Desde 2015 está aberto como Centro Interpretativo das Memórias da Misericórdia de Braga.",
    },
    {
      nome: "Fonte do Ídolo",
      tempoVisita: "20/30 min",
      descricao:
        "Na antiga capital do Conventus Bracara Augustanus foi edificado, nos inícios do século I, um santuário rupestre associado ao culto da água, hoje conhecido como Fonte do Ídolo. A edificação deve-se provavelmente a Celico Fronto, um cidadão romano que a mandou fazer para usufruto da comunidade de Bracara Augusta.",
    },
    {
      nome: "Santuário do Sameiro",
      website: "santuariodosameiro.pt",
      descricao:
        "O segundo Santuário Mariano português mais visitado, na sagrada montanha do Sameiro. O Padre Martinho, movido pela devoção a Nossa Senhora Imaculada Conceição, foi o obreiro deste Santuário - começou por erigir um pedestal para uma estátua da Virgem. A 10 de agosto de 1877 é sagrada a primeira capela e em 1890 iniciaram-se as obras do templo atual. Em frente à Basílica ergue-se um imponente escadório, com dois altos pilares encimados pela Virgem Maria e o Sagrado Coração de Jesus, de onde se tem uma panorâmica de toda a cidade com um dos mais espetaculares pores-do-sol.",
      curiosidade:
        "Com 572 metros, o monte do Sameiro é o ponto mais alto da cidade, de onde se vislumbram as Serras do Gerês, da Cabreira, da Penha e da Franqueira e, em dias de maior visibilidade, o mar, desde Leixões à foz do Lima. A 15 de maio de 1982 o Papa João Paulo II visitou o Sameiro, acolhido por uma imensa multidão.",
    },
  ],

  terceiroDia: [
    {
      nome: "Museu Nogueira da Silva",
      tempoVisita: "1h00",
      website: "www.mns.uminho.pt",
      descricao:
        "Deve a fundação ao legado a favor da Universidade do Minho pelo Comendador António Augusto Nogueira da Silva. Do acervo destacam-se a porcelana da China, a pintura flamenga do séc. XVI, a pintura portuguesa dos séculos XVII e XVIII, mobiliário, prata, marfins, tapeçaria e azulejos. No jardim encontra-se o Espaço Maria Ondina Braga, com o espólio da escritora bracarense, e uma cafetaria.",
    },
    {
      nome: "Casa Rolão",
      descricao:
        "Edifício emblemático da arquitetura civil do século XVIII, construído entre 1759 e 1765 como residência de um abastado comerciante bracarense dedicado ao fabrico das sedas. Atualmente ocupado por uma livraria com milhares de livros, uma cafetaria e jardim.",
    },
    {
      nome: "Museu da Imagem",
      descricao:
        "Para todos os amantes de fotografia. Implementado num edifício do século XIX que parcialmente esconde uma das torres da antiga muralha medieval. Congrega as bases de dados de imagens do Arquivo da 'Foto Aliança' e da 'Casa Pelicano', desde os primórdios do século XX até à atualidade. Acolhe também exposições temporárias de fotografia contemporânea.",
    },
    {
      nome: "Basílica dos Congregados",
      descricao:
        "A construção teve início no séc. XVI mas só foi terminada no séc. XX - a torre poente foi concluída em 1964. No complexo conventual conserva-se a capelinha-oratório de Nossa Senhora da Aparecida, única no país pela particularidade das proporções e profusão da ornamentação barroca.",
    },
    {
      nome: "Mercado Municipal – A Praça",
      website: "praca.cm-braga.pt",
      descricao:
        "O renovado mercado municipal, onde se podem comprar produtos frescos e tradicionais, degustar várias iguarias e desfrutar de uma refeição num dos espaços de restauração.",
    },
    {
      nome: "Mosteiro de São Martinho de Tibães",
      tempoVisita: "2h00",
      website: "mosteirodetibaes.gov.pt",
      descricao:
        "Fundado na segunda metade do século XI. Ao longo da Idade Média deteve um vasto património e no séc. XVI foi a Casa-Mãe da Ordem Beneditina em Portugal e no Brasil. O edifício atual data dos séculos XVII e XVIII. Com a extinção das ordens religiosas em Portugal em 1834, conheceu decadência e abandono, só recuperando a partir de 1986, ano em que foi adquirido pelo Estado português. A igreja é um dos templos mais grandiosos do país e um dos maiores marcos da arte barroca. O mosteiro está musealizado e pode ser visitado, assim como a Cerca, espaço de usufruição na natureza.",
    },
  ],

  bragaANoite: [
    {
      nome: "Largo do Paço",
      descricao:
        "Os edifícios do antigo Paço Arquiepiscopal estão hoje convertidos em Reitoria da Universidade do Minho e Biblioteca Pública. No centro está o Chafariz dos Castelos, de 1723. Em frente ao Largo do Paço observam-se fachadas características dos finais do século XVIII, além da casa mais estreita de Braga.",
    },
    {
      nome: "Rua de S. João",
      descricao:
        "Rua emblemática com lojas com história, parte da abside da Sé Catedral e a imagem de Nossa Senhora do Leite em pedra ançã, atribuída a Nicolau de Chanterene - símbolo de fertilidade e maternidade. Curiosamente, quase no mesmo local, os Romanos adoravam outra divindade da fertilidade e maternidade, a deusa egípcia Ísis: na parede externa da Catedral, a poucos metros, vê-se uma pedra com inscrição dedicando o templo romano do séc. II a esta deusa.",
    },
    {
      nome: "Rossio da Sé",
      descricao:
        "Aqui se situa o Monumento aos Arcebispos de Braga, em homenagem ao importante papel que desempenharam na História de Braga desde a fundação da nacionalidade. O Rossio da Sé foi inaugurado em 2002.",
    },
  ],

  outrosLocaisDeInteresse: {
    historicosECulturais: [
      { nome: "Núcleo Museológico de São Martinho de Dume", morada: "Adro da Igreja Paroquial de Dume" },
      { nome: "Capela de São Frutuoso", morada: "Caminho da Ordem" },
      { nome: "Convento de S. Francisco", morada: "Caminho da Ordem" },
      { nome: "Domus da Escola Velha da Sé", morada: "Rua D. Afonso Henriques" },
      { nome: "Mamoa de Lamas", morada: "Rua da Mamoa, Lamas" },
      { nome: "Museu do Traje Dr. Gonçalo Sampaio", morada: "Rua do Raio" },
      { nome: "Biblioteca Lúcio Craveiro da Silva (Cloaca Romana, Arco Judaico e Calçada Medieval)", morada: "Rua de S. Paulo" },
    ],
    arquiteturaContemporanea: [
      { nome: "Capela Imaculada", morada: "Seminário Menor de Braga" },
      { nome: "Capela Árvore da Vida", morada: "Seminário Conciliar de São Pedro e São Paulo" },
      { nome: "Estádio Municipal de Braga", website: "scbraga.pt/estadio" },
      { nome: "Mercado Cultural do Carandá" },
    ],
    espacosEEventos: [
      { nome: "Conservatório de Música Calouste Gulbenkian de Braga", website: "conservatoriodebraga.pt" },
      { nome: "Theatro Circo", website: "theatrocirco.com/pt/home" },
      { nome: "GNRation", website: "gnration.pt" },
      { nome: "Forum Braga", website: "forumbraga.com" },
      { nome: "Espaço Vita", website: "espacovita.pt" },
      { nome: "Conservatório Bomfim", website: "conservatorio.bomfim.org" },
      { nome: "Maison826 Pedro Remy", website: "pedroremy.com" },
      { nome: "Centro de Juventude de Braga", website: "centrojuventudebraga.pt" },
    ],
    galerias: [
      { nome: "Zet Gallery", website: "zet.gallery/galeria-zet" },
      { nome: "Obliqua Galeria de Arte", website: "obliqua.com.pt/Home/Contatos" },
      { nome: "Galeria Mola", website: "galeriamola.com" },
      { nome: "Galeria SOMA", website: "somaplataformacultural.com" },
      { nome: "Forum Arte Braga", website: "forumartebraga.com" },
      { nome: "Galeria da Estação" },
      { nome: "Encontros da Imagem" },
      { nome: "Galeria do Paço" },
      { nome: "Galeria da USF do Minho" },
      { nome: "Galeria Duarte Sequeira", website: "www.duartesequeira.com" },
      { nome: "Galeria a.menhia", website: "menhia.com" },
      { nome: "Galeria IKON", website: "galeriaikon.com/contactos.html" },
    ],
    espacosDeLazer: [
      "Parque de São João da Ponte e Ludoteca da Estufa",
      "Praia Fluvial de Adaúfe",
      "Praia Fluvial de Merelim S. Paio",
      "Praia Fluvial da Ponte do Bico - Palmeira",
      "Área de lazer de Navarra",
      "Área de lazer de Cavadinho – Crespos",
    ],
    espacosDesportivos: [
      "Complexo Desportivo da Rodovia",
      "Parque Desportivo da Rodovia",
      "Parque Radical da Cividade",
    ],
  },

  emFamilia: [
    {
      nome: "Quinta Pedagógica de Braga (Centro de Educação Ambiental)",
      website: "quintapedagogica.cm-braga.pt",
      descricao:
        "Antiga quinta tradicional minhota com dois hectares e meio, recuperada e adaptada para fins educativos e pedagógicos. Dispõe de mais de 50 atividades de educação e sensibilização agrícola e ambiental. Integra áreas de valorização da biodiversidade animal com raças autóctones de espécies pecuárias e biodiversidade vegetal com hortas, pomar, bosque, vinha e plantas aromáticas e medicinais. O centro de educação ambiental reforça o compromisso com a proteção dos recursos naturais e um futuro mais sustentável.",
    },
    {
      nome: "Picoto Adventure Park",
      website: "picotopark.pt",
      descricao:
        "Situado no monte Picoto, o único local da cidade com vista de 360° sobre Braga. Parque aventura com atividades ao ar livre: paintball, arborismo panorâmico, salto de queda livre, minigolfe, tiro ao alvo, escalada, entre outras.",
    },
    {
      nome: "OzNatura - Adventure Camp",
      website: "oznatura.wixsite.com/oznatura",
      descricao:
        "Espaço de aventura e lazer para eventos, promoções desportivas, iniciativas pedagógicas, alojamento e inovação. Atividades: canoagem, stand up paddle, paintball e orientação.",
    },
    {
      nome: "Planetário - Casa da Ciência de Braga",
      website: "casacienciabraga.org",
      descricao:
        "O Centro Ciência Viva de Braga pertence à Rede de Centros da Agência Nacional Ciência Viva. Espaço interativo de divulgação científica e tecnológica que funciona como plataforma do conhecimento. Vocacionado para todas as áreas científicas, promove também a formação de docentes.",
    },
  ],

  servicosEducativosMuseus: [
    { nome: "Museu de Arqueologia D. Diogo de Sousa", morada: "Rua dos Bombeiros Voluntários", telefone: "253 273 706" },
    { nome: "Museu dos Biscainhos", morada: "Rua dos Biscainhos", telefone: "253 204 650" },
    { nome: "Museu Pio XII", morada: "Largo de Santiago, n.º 47", telefone: "253 200 130" },
    { nome: "Mosteiro de São Martinho de Tibães", morada: "Rua do Mosteiro, n.º 59 | 4700-565 Mire Tibães", telefone: "253 622 670" },
    { nome: "Museu do Traje Dr. Gonçalo Sampaio", morada: "Rua do Raio, n.º 2", telefone: "962 443 700" },
    { nome: "Museu dos Cordofones Domingos Machado", morada: "Avenida António Gomes Pereira, n.º 13 – Tebosa", telefone: "253 673 855" },
    { nome: "Museu Nogueira da Silva", morada: "Avenida Central, n.º 61", telefone: "253 601 275" },
  ],

  gastronomia: {
    descricao:
      "Braga oferece uma gastronomia riquíssima, suculenta e variada, segundo a tradição de várias gerações, com o bacalhau como prato principal. A diversidade da paisagem natural e as influências de outras gentes explicam a multiplicidade de especialidades. Por influência da religiosidade da cidade, cumpriam-se os períodos de abstinência, levando à criação de multifacetadas formas de cozinhar o bacalhau - destaca-se o Bacalhau à Braga. O famoso vinho verde da região, branco ou tinto, acompanha bem qualquer prato. Na doçaria, grande originalidade e refinamento, com o Pudim Abade de Priscos, os doces de romaria e os biscoitos secos para o chá, além de especialidades de longa tradição conventual e popular.",
    zonasDeRestauracao: [
      "Campo das Hortas",
      "Rua D. Afonso Henriques",
      "Rua Frei Caetano Brandão",
      "Rua D. Paio Mendes",
      "Rua D. Gonçalo Pereira",
    ],
    pratosSalgados: [
      "Bacalhau à Braga ou à Narcisa",
      "Papas de Sarrabulho",
      "Rojões à Minhota",
      "Cabrito Assado à Moda de Braga",
      "Vitela Assada",
      "Arroz 'Pica no Chão'",
      "Arroz de Pato à Moda de Braga",
      "Bacalhau à Moda do Minho",
      "Frigideiras",
      "Caldo Verde c/ Broa de Milho",
    ],
    doces: [
      "Pudim Abade de Priscos",
      "Fidalguinhos",
      "Pederneiras",
      "Paciências",
      "Suplicos",
      "Fatias doces de Braga",
      "Broinhas de St.º António",
      "Sameirinhos",
      "Moletinhos de S. Vicente",
      "Talassas",
      "Viúvas",
    ],
  },

  comoChegarABraga: {
    comboio: {
      descricao: "Horários e linhas disponíveis no portal da CP.",
      website: "www.cp.pt",
      telefone: "808 208 208 (Comboios de Portugal)",
    },
    aviao: {
      descricao:
        "O aeroporto Francisco Sá Carneiro, no Porto, dista cerca de 50 km do centro de Braga, num percurso de apenas 40 minutos.",
      shuttle: ["getbus.eu/pt", "rede-expressos.pt"],
    },
    automovel: {
      acessosA3: "Sair na indicação Braga – Celeirós (saída 8); seguir na direção Estádio – Braga Norte",
      acessosA11: "Sair nas portagens na direção Braga – Barcelos; seguir na direção do Estádio – Braga Norte",
    },
    autocarros: {
      descricao: "Centro Coordenador de Transportes",
      website: "cctb.cm-braga.pt",
    },
  },

  distanciasDeBraga: {
    Lisboa: "360 km",
    "Viana do Castelo": "62 km",
    "Ponte de Lima": "42 km",
    Gerês: "44 km",
    Barcelos: "22 km",
    "Santiago de Compostela": "187 km",
    Porto: "57 km",
    Guimarães: "25 km",
  },

  contactosUteis: [
    { entidade: "Bombeiros Sapadores de Braga", telefone: "253 278 488" },
    { entidade: "Bombeiros Voluntários de Braga", telefone: "253 200 430" },
    { entidade: "Câmara Municipal de Braga", telefone: "253 616 060" },
    { entidade: "Centro Coordenador de Transportes de Braga", telefone: "253 202 858" },
    { entidade: "Centro de Juventude de Braga", telefone: "253 204 250" },
    { entidade: "Tribunal Arbitral do Consumo", telefone: "253 617 604" },
    { entidade: "Cruz Vermelha Portuguesa", telefone: "253 208 870" },
    { entidade: "Forum Braga", telefone: "253 208 230" },
    { entidade: "Guarda Nacional Republicana", telefone: "253 203 030" },
    { entidade: "Hospital de Braga", telefone: "253 027 000" },
    { entidade: "Hospital Lusíadas Braga", telefone: "253 079 579" },
    { entidade: "Hospital Privado de Braga (Grupo Trofa Saúde)", telefone: "253 680 200" },
    { entidade: "Praça – Mercado Municipal de Braga", telefone: "253 214 671" },
    { entidade: "Polícia Judiciária", telefone: "253 255 000" },
    { entidade: "Polícia Municipal", telefone: "253 609 740" },
    { entidade: "Polícia de Segurança Pública", telefone: "253 200 420" },
    { entidade: "Posto de Turismo de Braga", telefone: "253 262 550" },
    { entidade: "Transportes Urbanos de Braga", telefone: "253 606 890" },
  ],

  distincoesInternacionais: [
    "World's Leading Emerging Tourism Destination - World Travel Awards 2024",
    "Europe's Leading Emerging Tourism Destination - World Travel Awards 2024",
    "Green Destinations Platinum Award 2023",
    "European Best Destination 2021",
  ],

  fichaTecnica: {
    titulo: "Descobrir Braga em 3 dias",
    elaboracao: "Divisão de Economia e Turismo",
    publicadoPor: "Município de Braga - Departamento de Cultura e Turismo",
    email: "turismo@cm-braga.pt",
    website: "visitbraga.travel",
  },
} as const;

export type Roteiro3Dias = typeof ROTEIRO_3_DIAS;

// Versão em texto para injeção no prompt do modelo
export const ROTEIRO_3_DIAS_KNOWLEDGE =
  'FONTE: Roteiro oficial "Descobrir Braga em 3 Dias" (Município de Braga).\n' +
  JSON.stringify(ROTEIRO_3_DIAS);
