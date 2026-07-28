// ============================================================================
// BRACVS — MÓDULO DE CONHECIMENTO: TRANSPORTES
// Fontes: "Horários Braga–Guimarães" (CCTB/Visit Braga, ed. 2023)
//         "Braga City Bus Timetable — TUB Main Routes" (Visit Braga)
// Nota: informação recolhida dos canais oficiais das entidades citadas,
// sujeita a alterações. Recomendar sempre confirmação nos sites/apps oficiais.
// ============================================================================

export const TRANSPORTES_KNOWLEDGE = `
=====================================================================
AUTOCARROS BRAGA ⇄ GUIMARÃES (3 operadores)
=====================================================================
Distância: 23 km. Local de embarque em Braga: junto ao Mercado Municipal /
Praça do Comércio (ver mapa do desdobrável — "Local de Embarque / Boarding Point").
Coordenação: Centro Coordenador de Transportes de Braga (CCTB)
- Site: https://cctb.cm-braga.pt/
- Tel: +351 253 202 858
- Morada: Av. Gen. Norton de Matos 110, 4700-387 Braga

---------------------------------------------------------------------
1) AVE MOBILIDADE — https://avemobilidade.pt/schedules | +351 253 202 858
---------------------------------------------------------------------
Paragens (sentido Braga » Guimarães): Braga (Terminal Rodoviário) →
Braga (Av. Liberdade – Carandá) → Sr. Aflitos (Ig.) → Morreira →
Sande S. Martinho (Ig.) → [AvePark, só em algumas viagens] →
Taipas (Perigosa) → Rotunda Ponte → Motelo → Guimarães (Terminal Rodoviário).
Duração total: ~50 minutos.

BRAGA » GUIMARÃES — Sábados, domingos e feriados
Partidas de Braga (Terminal Rodoviário):
07:10, 08:10, 09:10, 10:10, 11:10, 12:40, 13:40, 14:40, 16:10, 17:10, 18:10, 19:10
(passam na Av. Liberdade – Carandá 10 min depois; chegada a Guimarães:
08:00, 09:00, 10:00, 11:00, 12:00, 13:30, 14:30, 15:30, 17:00, 18:00, 19:00, 20:00)

BRAGA » GUIMARÃES — Dias úteis
Partidas de Braga (Terminal Rodoviário):
06:35, 07:05, 07:25*, 08:05, 08:25*, 09:05, 09:35*, 10:05, 10:35*, 11:35,
12:35, 13:35, 14:35, 15:35, 16:35, 17:05*, 17:45, 18:15*, 18:45, 19:15*, 20:05
Chegadas a Guimarães (Terminal Rodoviário):
07:20, 07:55, 08:25, 08:55, 09:25, 09:55, 10:25, 10:55, 11:25, 12:25,
13:25, 14:25, 15:25, 16:25, 17:25, 17:55, 18:35, 19:05, 19:35, 20:05, 20:55
* = NÃO se realiza em agosto. As viagens assinaladas são também as que
servem o AvePark (ex.: partida 07:25 passa no AvePark às 08:05).

GUIMARÃES » BRAGA — Sábados, domingos e feriados
Partidas de Guimarães (Terminal Rodoviário):
07:10, 08:10, 09:10, 10:10, 11:10, 12:40, 13:40, 14:40, 16:10, 17:10, 18:10, 19:10
Paragens: Motelo (+7 min) → Rotunda Ponte → Taipas (Perigosa) →
Sande S. Martinho (Ig.) → Morreira → Sr. Aflitos (Ig.) →
Braga (Av. Liberdade – Carandá, +40 min) → Braga (Terminal Rodoviário).
Chegadas a Braga (Terminal): 08:00, 09:00, 10:00, 11:00, 12:00, 13:30,
14:30, 15:30, 17:00, 18:00, 19:00, 20:00

GUIMARÃES » BRAGA — Dias úteis
Partidas de Guimarães (Terminal Rodoviário):
06:35, 07:05, 07:35(B), 08:05, 08:35(B), 09:05, 09:35(B), 10:05, 10:35(B),
11:35, 12:35, 13:35, 14:35, 15:35, 16:35, 17:05(B), 17:45(A), 17:45(B),
18:15(B), 18:45(A), 18:45(B), 19:15(B), 19:15, 20:05
Chegadas a Braga (Terminal Rodoviário) ~50 min depois (07:25, 07:55, 08:25,
08:55, 09:25, 09:55, 10:25, 10:55, 11:25, 12:25, 13:25, 14:25, 15:25, 16:25,
17:25, ..., 20:55).
Legenda: (A) = SÓ se realiza em agosto | (B) = NÃO se realiza em agosto.
Ao fim da tarde há partidas duplicadas à mesma hora — uma versão de agosto
e outra do resto do ano.

---------------------------------------------------------------------
2) CÁVADO MOBILIDADE — https://aitc.cimcavado.pt/horarios | +351 253 201 360
---------------------------------------------------------------------
Serviço apenas em DIAS ÚTEIS. Passa pelas Universidades do Minho
(campus de Braga/Gualtar e campus de Guimarães/Azurém) e pela Makro Braga.
Duração total: ~50 minutos.

BRAGA » GUIMARÃES — Dias úteis, 1 set a 30 jun
Braga (Terminal Rodoviário): 07:15, 08:00, 09:00, 10:00, 12:00, 13:00,
15:00, 16:00, 17:00, 18:00, 19:00, 20:00
(+ viagem que inicia na Makro Braga às 08:05 e um reforço 13:10 com início
na Universidade do Minho)
Makro Braga: ~8 min após o Terminal | Braga (Univ. Minho): ~10 min após
Guimarães (Univ. Minho): ~40 min após | Chegada a Guimarães (Terminal):
08:05, 08:50, 08:58, 09:50, 10:50, 12:50, 13:50, 13:45, 15:50, 16:50,
17:50, 18:50, 19:50, 20:50

BRAGA » GUIMARÃES — Dias úteis, 1 jul a 31 ago
Braga (Terminal): 08:00, 09:00, 10:00, 12:00, 13:00, 15:00, 16:00, 17:00, 18:00, 19:00
Chegada a Guimarães (Terminal): 08:50, 09:50, 10:50, 12:50, 13:50, 15:50,
16:50, 17:50, 18:50, 19:50

GUIMARÃES » BRAGA — Dias úteis, 1 set a 30 jun
Guimarães (Terminal Rodoviário): 07:15, 08:00, 08:10, 09:00, 10:00, 12:00,
13:00, 15:00, 16:00, 17:00, 18:00, 19:00, 20:00 (+ reforço 13:10 com início
na Univ. Minho de Guimarães)
Chegada a Braga (Terminal): 08:00, 08:45, 08:55, 09:50, 10:50, 12:50, 13:50,
13:40, 15:50, 16:50, 17:50, 18:50, 19:50, 20:45

GUIMARÃES » BRAGA — Dias úteis, 1 jul a 31 ago
Guimarães (Terminal): 08:10, 09:00, 10:00, 12:00, 13:00, 15:00, 16:00, 17:00, 18:00, 19:00
Chegada a Braga (Terminal): 08:55, 09:50, 10:50, 12:50, 13:50, 15:50, 16:50,
17:50, 18:50, 19:50

---------------------------------------------------------------------
3) REDE NACIONAL DE EXPRESSOS — https://rede-expressos.pt/pt/horarios-bilhetes
---------------------------------------------------------------------
Viagem direta, 25 minutos, 23 km. Autocarros com Wi-Fi, tomadas,
acessibilidade e transporte de bicicletas.

BRAGA » GUIMARÃES:
- 09:00 → 09:25 (NÃO se realiza aos domingos)
- 10:30 → 10:55
- 14:00 → 14:25
- 16:00 → 16:25
- 19:30 → 19:55

GUIMARÃES » BRAGA:
- 09:05 → 09:30
- 11:55 → 12:20 (NÃO se realiza aos domingos)
- 14:35 → 15:00
- 16:55 → 17:20
- 18:50 → 19:15 (SÓ se realiza aos domingos)

=====================================================================
TUB — TRANSPORTES URBANOS DE BRAGA (rede urbana, rotas principais)
=====================================================================
Site: www.tub.pt | App TUB (iOS e Android): horários em tempo real —
inserir o ID da paragem na app para saber quando chega o próximo autocarro.

PREÇOS (bilhete a bordo):
- 1,55 € — 1ª coroa (linhas 02, 05, 09, 18, 43, 74, 87, 89, 95)
- 2,00 € — 2ª coroa (linhas 23, 44, 45, 50, 88)

CARTÕES DE VIAGEM (à venda no posto de turismo):
- Módulo 1 — 2 viagens, 1 pessoa
- Módulo 2 — 2 viagens, 1 pessoa
- Bilhete Turístico — validade 1, 2 ou 3 dias; versões para 1, 5 ou 10 pessoas
Carregamentos: qualquer estabelecimento Payshop pode carregar cartões TUB.

POSTOS DE VENDA TUB (bilhetes e informação):
- Balcão Único — Convento do Pópulo, Praça Conde de Agrolongo.
  Dias úteis: 09:00–17:30
- Rechicho — Rua do Raio / Largo João Penha.
  Dias úteis: 09:00–19:00 | Sábado: 09:00–12:30 e 14:30–18:00
- Estação CP — Largo da Estação. Dias úteis: 07:00–20:00
- Largo dos Penedos — Praça Alexandre Herculano.
  Dias úteis: 09:30–13:00 e 15:00–18:30
- Universidade do Minho — Espaço Recurso AAUM, Complexo Pedagógico 2.
  Dias úteis: 09:30–12:30 e 14:00–18:00
- Central de Camionagem. Dias úteis: 08:30–18:00

---------------------------------------------------------------------
LINHA 02 — BOM JESUS ⇄ PONTE DE PRADO (1,55 €, 1ª coroa)
---------------------------------------------------------------------
A linha do BOM JESUS DO MONTE. Paragem central (sentido ida/Bom Jesus):
Liberdade (25 de Abril) — ID 110.
IDA (Bom Jesus) — Dias úteis: 06:40 e depois de 30 em 30 min
(07:10, 07:40, ... 19:40, 20:10).
Sábados, domingos e feriados: 07:10 e depois de 30 em 30 min até 20:10.
VOLTA (Ponte de Prado) — Dias úteis: 07:00 a 20:30, de 30 em 30 min.
Sábados, domingos e feriados: 07:30 a 20:30, de 30 em 30 min.

---------------------------------------------------------------------
LINHA 05 — QUINTA DA CAPELA ⇄ DUME–ESTÁDIO (1,55 €, 1ª coroa)
---------------------------------------------------------------------
Serve o Estádio Municipal de Braga. Paragens centrais (sentido volta):
Central III — ID 144 | Cons. Torres Almeida (Pópulo) — ID 1829.
IDA (Quinta da Capela) — Dias úteis: 06:30, 07:00, 08:00, 09:00, 09:30,
10:00, 10:30, 11:00, 11:30, 12:00, 12:30, 13:00, 13:30, 14:00, 14:30,
15:00, 15:30, 16:00, 16:30, 17:00, 18:00, 19:00, 19:30, 20:00, 20:30.
Sábados: 06:30 e depois de hora a hora das 07:30 às 19:30.
Domingos/feriados: 07:30 às 19:30, de hora a hora.
VOLTA (Dume–Estádio) — Dias úteis: 07:10 a 20:40, de 30 em 30 min.
Sábados: 07:10 às 20:10, de hora a hora.
Domingos/feriados: 07:10 às 20:10, de hora a hora.

---------------------------------------------------------------------
LINHA 09 — NOGUEIRA ⇄ CAMPING (RUÃES) (1,55 €, 1ª coroa) — só dias úteis
---------------------------------------------------------------------
Serve o Parque de Campismo. Paragem central: Liberdade (Igreja S. Lázaro I) — ID 111.
IDA (Nogueira–Camping) — Dias úteis: 07:00 às 20:00, de hora a hora.
VOLTA (Ruães–Camping) — Dias úteis: 07:25 às 20:25, de hora a hora.
Sábados, domingos e feriados: NÃO circula — utilizar a linha 89.

---------------------------------------------------------------------
LINHA 18 — PINHEIRO DO BICHO (1,55 €, 1ª coroa)
---------------------------------------------------------------------
Paragem central: Raio (João Penha) — ID 286.
IDA — Dias úteis: 07:00, 07:35, 08:10, 08:50, 09:30, 10:10, 10:50, 11:30,
12:05, 12:30, 13:10, 13:50, 14:30, 15:10, 15:50, 16:30, 17:05, 17:45,
18:00, 18:25, 19:10, 19:50, 20:25.
Sábados: 07:00, 08:20, 09:40, 11:00, 12:20, 13:40, 15:00, 16:20, 17:40,
19:00, 20:30.
Domingos/feriados: iguais ao sábado.

---------------------------------------------------------------------
LINHA 23 — ESPINHO/SAMEIRO ⇄ RUA DO RAIO (2,00 €, 2ª coroa) — fins de semana
---------------------------------------------------------------------
Linha de FIM DE SEMANA para o SANTUÁRIO DO SAMEIRO (em dias úteis
utilizar a linha 88). Paragem central: Raio (João Penha) — ID 286.
IDA (Espinho/Sameiro) — Sábados: 07:00 às 20:00, de hora a hora.
Domingos/feriados: 06:30, 07:00, 08:00, 09:00, 10:00, 11:00, 12:00, 13:00,
14:00, 14:30, 15:00, 15:30, 16:00, 17:00, 18:00, 19:00, 20:00.
VOLTA (Rua do Raio) — Sábados: 08:30 às 20:30, de hora a hora.
Domingos/feriados: 10:30, 11:30, 12:30, 13:30, 14:30, 15:00, 15:30, 16:00,
16:30, 17:30, 18:30, 19:30, 20:30.
Dias úteis: NÃO circula — utilizar a linha 88.

---------------------------------------------------------------------
LINHA 43 — UNIVERSIDADE DO MINHO ⇄ ESTAÇÃO DE COMBOIOS (1,55 €) — só dias úteis
---------------------------------------------------------------------
Liga a Estação de Comboios (CP) ao campus de Gualtar da UMinho.
Paragem central: Rotunda Estação II — ID 1722.
Dias úteis (ambos os sentidos), frequência ~15 min:
07:00, 07:20, 07:35, 07:50, 08:05, 08:20, 08:30, 08:35, 08:50, 09:05,
09:20, 09:35, 09:50, 10:05, 10:20, 10:35, 10:50, 11:05, 11:20, 11:35,
11:50, 12:05, 12:20, 12:35, 12:50, 13:05, 13:20, 13:35, 13:50, 14:05,
14:20, 14:35, 14:50, 15:05, 15:20, 15:35, 15:50, 16:05, 16:20, 16:35,
16:50, 17:05, 17:20, 17:35, 17:50, 18:05, 18:20, 18:35, 18:50, 19:05,
19:20, 19:35, 19:50, 20:05.
Sábados, domingos e feriados: NÃO circula.

---------------------------------------------------------------------
LINHA 44 — PRAIA ADAÚFE ⇄ AVENIDA CENTRAL (2,00 €, 2ª coroa) — SAZONAL
---------------------------------------------------------------------
Linha de VERÃO para a praia fluvial de Adaúfe.
Período de funcionamento: 29 de junho a 1 de setembro.
Paragem central: Central IV — ID 12.
IDA (Praia Adaúfe) — Todos os dias: 10:00, 11:00, 12:00, 15:00, 16:00,
17:00, 18:00, 19:00.
VOLTA (Avenida Central) — Todos os dias: 10:30, 11:30, 12:30, 15:30,
16:30, 17:30, 18:30, 19:30.

---------------------------------------------------------------------
LINHA 45 — PONTE DO BICO ⇄ NOGUEIRA (2,00 €, 2ª coroa)
---------------------------------------------------------------------
Paragem central: Central I — ID 146.
IDA (Ponte do Bico) — Dias úteis: 06:45, 07:15, 07:45, 08:15, 08:45,
09:15, 09:45, 10:15, 10:45, 11:15, 11:45, 12:15, 12:30, 12:45, 13:15,
13:45, 14:15, 14:45, 15:15, 15:45, 16:15, 16:45, 17:15, 17:45, 18:15,
18:45, 19:15, 19:45, 20:20, 20:45.
Sábados: 06:15, 07:00, 07:45, 08:30, 09:15, 10:00, 10:45, 11:30, 12:15,
13:00, 13:45, 14:30, 15:15, 16:00, 16:45, 17:30, 18:15, 19:00, 19:45, 20:30.
Domingos/feriados: 07:30, 08:15, 09:00, 09:45, 10:30, 11:15, 12:00, 12:45,
13:30, 14:15, 15:00, 15:45, 16:30, 17:15, 18:00, 18:45, 19:30, 20:15.
VOLTA (Nogueira) — Dias úteis: 06:30, 06:45, 07:15, 07:45, 08:15, 08:45,
09:15, 09:45, 10:15, 10:45, 11:15, 11:45, 12:15, 12:45, 13:15, 13:45,
14:15, 14:45, 15:15, 15:45, 16:15, 16:45, 17:15, 17:45, 18:15, 18:45,
19:15, 19:45, 20:15.
Sábados: 06:45, 07:30, 08:15, 09:00, 09:45, 10:30, 11:15, 12:00, 12:45,
13:30, 14:15, 15:00, 15:45, 16:30, 17:15, 18:00, 18:45, 19:30, 20:15.
Domingos/feriados: iguais ao sábado.

---------------------------------------------------------------------
LINHA 50 — MOSTEIRO DE TIBÃES ⇄ CONDE AGROLONGO (2,00 €, 2ª coroa)
---------------------------------------------------------------------
A linha do MOSTEIRO DE S. MARTINHO DE TIBÃES.
Paragem central: Conde Agrolongo II — ID 185.
IDA (Mosteiro Tibães) — Dias úteis: 07:30, 08:30, 09:30, 11:30, 14:30,
16:30, 17:35.
Sábados: 09:30, 11:30, 14:30, 16:30.
Domingos/feriados: 09:30, 11:30, 14:30, 16:30.
VOLTA (Conde Agrolongo) — Dias úteis: 07:55, 08:55, 10:00, 12:00, 15:00,
17:00, 18:05.
Sábados: 10:00, 12:00, 15:00, 17:00.
Domingos/feriados: 10:00, 12:00, 15:00, 17:00.

---------------------------------------------------------------------
LINHA 74 — HOSPITAL ⇄ CAMÉLIAS (1,55 €, 1ª coroa)
---------------------------------------------------------------------
Serve o Hospital de Braga. Paragem central: 25 de Abril (D. Maria II – I) — ID 117.
IDA (Hospital) — Dias úteis: de 06:25 a 20:10, frequência ~15 min
(06:25, 06:55, 07:10, 07:25, 07:40, 07:55, 08:10, 08:25, 08:40, 08:55,
09:10, 09:25, 09:40, 09:55, 10:10, ... 19:40, 19:55, 20:10).
Sábados: 06:25, depois 07:10 a 20:10 de 30 em 30 min.
Domingos/feriados: 06:25, depois 07:10 a 20:10 de 30 em 30 min.
VOLTA (Camélias) — Dias úteis: 06:45 a 20:30, frequência ~15 min.
Sábados: 06:45, depois 07:30 a 20:30 de 30 em 30 min.
Domingos/feriados: iguais ao sábado.

---------------------------------------------------------------------
LINHA 87 — HOSPITAL ⇄ ESTAÇÃO DE COMBOIOS (1,55 €, 1ª coroa)
---------------------------------------------------------------------
Liga a Estação de Comboios ao Hospital de Braga.
Paragem central: Rotunda Estação II — ID 1722.
IDA (Hospital) — Dias úteis: 06:25 a 20:15, frequência ~15 min.
Sábados: 06:25 a 20:05, frequência ~20 min (06:25, 06:45, 07:25, 07:45,
08:05, 08:25, 08:45, 09:05, ... 19:25, 20:05).
Domingos/feriados: 06:25 a 20:05, frequência ~40 min (06:25, 07:25, 08:05,
08:45, 09:25, 10:05, 10:45, 11:25, 12:05, 12:45, 13:25, 14:05, 14:45,
15:25, 16:05, 16:45, 17:25, 18:05, 18:45, 19:25, 20:05).
VOLTA (Estação Comboios) — Dias úteis: 07:00 a 20:05, frequência ~15 min.
Sábados: 06:45 a 20:25, frequência ~20 min.
Domingos/feriados: 06:45 a 20:25, frequência ~40 min.

---------------------------------------------------------------------
LINHA 88 — SANTUÁRIO DO SAMEIRO ⇄ RUA DO RAIO (2,00 €, 2ª coroa) — dias úteis
---------------------------------------------------------------------
Linha de DIAS ÚTEIS para o SANTUÁRIO DO SAMEIRO (aos fins de semana
utilizar a linha 23). Paragem central: Raio (João Penha) — ID 286.
IDA (Sameiro) — Dias úteis: 07:00 às 20:00, de hora a hora.
VOLTA (Rua do Raio) — Dias úteis: 07:30 às 20:30, de hora a hora.
Sábados, domingos e feriados: NÃO circula — utilizar a linha 23.

---------------------------------------------------------------------
LINHA 89 — NOGUEIRA ⇄ CAMPING (SEMELHE) (1,55 €, 1ª coroa) — fins de semana
---------------------------------------------------------------------
Linha de FIM DE SEMANA para o Parque de Campismo (em dias úteis utilizar
a linha 9). Paragem central: Liberdade (Igreja S. Lázaro I) — ID 111.
IDA (Nogueira–Camping) — Sábados: 07:00 às 20:00, de hora a hora.
Domingos/feriados: 08:00, 10:00, 12:00, 14:00, 16:00, 18:00, 20:00.
VOLTA (Semelhe–Camping) — Sábados: 07:30 às 19:30, de hora a hora.
Domingos/feriados: 08:30, 10:30, 12:30, 14:30, 16:30, 18:30.
Dias úteis: NÃO circula — utilizar a linha 9.

---------------------------------------------------------------------
LINHA 95 — NOVA ARCADA ⇄ MINHO CENTER (1,55 €, 1ª coroa)
---------------------------------------------------------------------
Liga os centros comerciais Nova Arcada e Minho Center.
Paragem central: Central II — ID 147.
IDA (Nova Arcada) — Todos os dias (úteis, sábados, domingos e feriados):
07:00 às 20:40, de 20 em 20 min.
VOLTA (Minho Center) — Todos os dias: 07:30 às 21:10, de 20 em 20 min.

=====================================================================
RESUMO RÁPIDO — "COMO CHEGO A..." (para respostas do chatbot)
=====================================================================
- BOM JESUS DO MONTE → Linha TUB 02 (paragem Liberdade/25 de Abril, ID 110),
  1,55 €, de 30 em 30 min todos os dias.
- SANTUÁRIO DO SAMEIRO → Linha 88 em dias úteis / Linha 23 aos fins de
  semana e feriados (paragem Raio/João Penha, ID 286), 2,00 €, de hora a hora.
- MOSTEIRO DE TIBÃES → Linha 50 (paragem Conde Agrolongo II, ID 185), 2,00 €.
- ESTÁDIO MUNICIPAL → Linha 05 (Dume–Estádio).
- HOSPITAL DE BRAGA → Linhas 74 e 87, 1,55 €.
- UNIVERSIDADE DO MINHO (Gualtar) → Linha 43 (só dias úteis) a partir da
  Estação de Comboios; ou Cávado Mobilidade (que também serve a UMinho).
- PARQUE DE CAMPISMO → Linha 9 (dias úteis) / Linha 89 (fins de semana).
- PRAIA FLUVIAL DE ADAÚFE → Linha 44, apenas de 29 de junho a 1 de setembro.
- CENTROS COMERCIAIS (Nova Arcada / Minho Center) → Linha 95, de 20 em 20 min.
- GUIMARÃES → 3 opções: AVE Mobilidade (mais frequências, ~50 min, com
  paragens intermédias), Cávado Mobilidade (dias úteis, serve as duas
  universidades) e Rede Expressos (direto, 25 min).
- Horários em tempo real: app TUB (inserir o ID da paragem).
`;
