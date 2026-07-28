# Variáveis de ambiente no Vercel (Bracvs)

## Modelos de IA (chaves)
- GEMINI_API_KEY        — chave do Google AI Studio (principal)
- GROQ_API_KEY          — chave da Groq (fallback)
- OPENROUTER_API_KEY    — opcional (3.º fallback)

## Modelos (opcional, só se precisares de trocar o slug)
- GEMINI_MODEL          — default: gemini-3.5-flash
- GROQ_MODEL            — default: llama-3.3-70b-versatile
- OPENROUTER_MODEL      — default: openrouter/free
- GROQ_ENABLE_8B=1      — reativa o modelo 8b (não recomendado)

## Google Sheet "Bracvs Conhecimento" (cada separador = 1 link CSV)
- SHEET_RESTAURANTES_URL  — separador RESTAURANTES (inclui pastelarias por categoria)
- SHEET_BARES_URL         — separador BARES E NOITE
- SHEET_EVENTOS_URL       — separador EVENTOS
- SHEET_AVISOS_URL        — separador AVISOS (opcional)

## Firebase (registo anónimo de perguntas, feedback e alucinações)
- FIREBASE_PROJECT_ID
- FIREBASE_API_KEY

Publicar cada separador: Ficheiro > Partilhar > Publicar na Web >
escolher o separador > "Valores separados por vírgulas (.csv)" > Publicar.
O link deve terminar em output=csv. Cada separador tem um gid diferente.
Depois de adicionar/alterar variáveis: fazer sempre REDEPLOY.

Diagnóstico: abrir /api/status no browser.
