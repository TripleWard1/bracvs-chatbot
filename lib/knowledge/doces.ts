// lib/knowledge/doces.ts
// DOCES E GASTRONOMIA TÍPICA DE BRAGA - informação validada (fonte: roteiro
// oficial e materiais do Município). Fecha as alucinações sobre doçaria:
// o modelo estava a inventar descrições e pastelarias inexistentes.

const DOCES_BASE = `# DOCES E GASTRONOMIA TÍPICA DE BRAGA - informação validada

## REGRAS
- Descreve estes doces e pratos APENAS como estão descritos aqui. Não inventes ingredientes, formas nem histórias.
- NUNCA inventes nomes de pastelarias, confeitarias ou casas onde comprar. Só podes nomear estabelecimentos que estejam no teu conhecimento de restaurantes/cafés. Se não sabes onde comprar um doce, diz que se encontra em pastelarias tradicionais da cidade e remete para visitbraga.travel - não inventes nomes.

## DOCES
- Fidalguinhos: BISCOITOS tradicionais de Braga (não são pastéis nem recheados). Têm uma forma característica de "pernas cruzadas" - uma brincadeira antiga com os fidalgos, que ficavam de pernas cruzadas sem precisar de trabalhar. Feitos com farinha, ovos, açúcar, azeite, canela e raspa de limão.
- Pudim Abade de Priscos: um dos doces conventuais mais famosos de Portugal, nascido em Priscos (perto de Braga). Inventado pelo abade Manuel Joaquim Machado Rebelo, feito com ovos, açúcar, toucinho e vinho do Porto.
- Tíbias de Braga: doce típico da cidade.

## SALGADOS / PRATOS TÍPICOS
- Frigideira de Braga: pastel redondo de massa folhada recheado com carne picada, com cerca de 15 cm de diâmetro. Especialidade muito típica da cidade (a casa histórica é as Frigideiras do Cantinho).
- Bacalhau à Braga (à Narcisa): bacalhau frito com batata, servido com cebola.
- Arroz de pica no chão: arroz de galo/frango típico da região.
- Papas de sarrabulho com rojões: prato tradicional de época fria.

## VINHO
- Braga está no coração da região dos Vinhos Verdes.
`;

// Monta o conhecimento de doces, juntando as pastelarias/casas de doces que
// vierem da Google Sheet (se houver). Sem elas, o Bracvs descreve os doces mas
// não inventa onde comprar.
export function construirDoces(pastelarias: string | null): string {
  if (!pastelarias) return DOCES_BASE;
  return (
    DOCES_BASE +
    '\n\n## ONDE COMPRAR (pastelarias e casas de doces oficiais)\n' +
    'Recomenda APENAS estas casas para comprar doces. Não inventes outras.\n' +
    pastelarias +
    '\n'
  );
}
