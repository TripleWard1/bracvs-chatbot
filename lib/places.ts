// lib/places.ts
// LOCAIS OFICIAIS DE BRAGA — usados pelo cliente para detetar menções
// nas respostas do Bracvs e gerar botões "Ver no mapa" (Google Maps).
// Deteção determinística, sem IA: só locais desta lista geram botões.

import { NOMES_RESTAURANTES } from './knowledge/restaurantes';

const MONUMENTOS_E_LOCAIS = [
  'Sé de Braga',
  'Bom Jesus do Monte',
  'Santuário do Sameiro',
  'Mosteiro de Tibães',
  'Mosteiro de São Martinho de Tibães',
  'Jardim de Santa Bárbara',
  'Arco da Porta Nova',
  'Theatro Circo',
  'Termas Romanas do Alto da Cividade',
  'Fonte do Ídolo',
  'Museu D. Diogo de Sousa',
  'Museu dos Biscainhos',
  'Museu Nogueira da Silva',
  'Museu da Imagem',
  'Palácio do Raio',
  'Casa Rolão',
  'Capela dos Coimbras',
  'Monte Picoto',
  'Parque da Ponte',
  'Estádio Municipal de Braga',
  'Mercado Municipal de Braga',
  'Praça da República',
  'Posto de Turismo de Braga',
];

const BARES_E_NOITE = [
  'Colinatrum',
  'Juno',
  'Lustre',
  'Os Zés',
  'Pátio da Sé',
  'Rossio Bar',
  'Sé La Vie',
  'Mal Amado',
  'Tosga',
  'SETRA',
  'Pelle',
  'Wine 66',
  'RUM by Mavy',
  'Estúdio 22',
  'Sé Café',
  'Speak Easy Braga',
  'Galeria 101',
  'Berber Shisha',
  'Sardinha Biba',
  'Dona Rosa Disco',
  'Bô Zen',
  'Araxá by Club del Mar',
  'KeimÒdrumo',
  'Bicau Food & Drinks',
];

export const ALL_PLACES: string[] = Array.from(
  new Set([...MONUMENTOS_E_LOCAIS, ...BARES_E_NOITE, ...NOMES_RESTAURANTES])
);
