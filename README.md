# Bracvs - Chatbot IA do Visit Braga

Assistente turístico com o Bracvs, o Guia oficial do Visit Braga. Deteta automaticamente a língua do utilizador e responde em Português (PT), Espanhol, Inglês ou Francês. Custo: **€0**.

## Arquitetura (a melhor opção gratuita)

Cadeia de fallback automático entre fornecedores compatíveis com a API OpenAI:

1. **Cerebras** - `llama-3.3-70b` - principal. 1 milhão de tokens/dia grátis, ~450 tok/s (quase instantâneo).
2. **Groq** - `llama-3.3-70b-versatile` - 1.ª rede de segurança.
3. **Groq** - `llama-3.1-8b-instant` - 2.ª rede (500 mil tokens/dia, sempre disponível).

Se um fornecedor estiver em baixo, sem quota, ou deixar de servir o modelo, o Bracvs salta sozinho para o seguinte. Combinado: **>1,5 milhões de tokens/dia grátis**, com redundância. Isto também protege contra qualquer fornecedor desaparecer.

- Next.js 14 (App Router) + TypeScript
- Open-Meteo - meteorologia de Braga em tempo real, sem chave
- Rate limiting por IP no servidor (15 msg/min)
- Widget embeddable (`public/embed.js`)

## Setup (StackBlitz → Vercel)

1. **Chaves gratuitas (sem cartão):**
   - Cerebras: cloud.cerebras.ai → API Keys.
   - Groq: console.groq.com → API Keys.
2. **StackBlitz:** importa o projeto (arrasta a pasta ou cria um projeto Next.js e cola os ficheiros).
3. **Variáveis de ambiente** - `.env.local` na raiz:
   ```
   CEREBRAS_API_KEY=a_tua_chave_cerebras
   GROQ_API_KEY=a_tua_chave_groq
   ```
   Podes começar só com uma; o chain usa as que existirem. ⚠️ Nunca no código do cliente.
4. **Vercel:** adiciona as mesmas variáveis em Settings → Environment Variables.

### Trocar/atualizar modelos sem tocar no código

Os slugs mudam de vez em quando (sobretudo na Cerebras). Sobrepõe por env:
```
CEREBRAS_MODEL=llama-3.3-70b
GROQ_MODEL=llama-3.3-70b-versatile
GROQ_MODEL_FALLBACK=llama-3.1-8b-instant
```
Se a Cerebras deixar de servir o 70B, confirma o slug atual em cloud.cerebras.ai e ajusta `CEREBRAS_MODEL`.

## Atualizar o conhecimento do Bracvs

Tudo o que o Bracvs sabe sobre Braga está num único ficheiro: **`lib/knowledge.ts`**. Edita em português; o modelo traduz sozinho. Persona e regras: `lib/prompt.ts`.

## Embed no visitbraga.travel

Uma linha antes do `</body>`:
```html
<script src="https://O-TEU-DOMINIO.vercel.app/embed.js" defer></script>
```
Botão flutuante com o arco do Bracvs que abre o chat. Alternativa - iframe direto:
```html
<iframe src="https://O-TEU-DOMINIO.vercel.app" style="width:380px;height:600px;border:0;border-radius:16px"></iframe>
```
O `next.config.mjs` só permite embed em `visitbraga.travel` (ajusta lá se o domínio for outro).

## Monitorização

Cada resposta traz o cabeçalho `X-Bracvs-Provider` (cerebras / groq-70b / groq-8b) - vês qual serviu, útil para perceber se estás a bater em limites do principal.

## Notas de capacidade

- Cerebras free: contexto limitado a ~8.192 tokens (chega de sobra para este chatbot).
- Se um dia precisares de mais, o Developer tier de qualquer um deles fica em poucos euros/mês.

## Ideias futuras

- Registo anónimo de perguntas (Firebase) para saberes o que os turistas procuram - ouro para relatórios internos
- Botões de ação nas respostas (links diretos para páginas do visitbraga.travel)
- Modo quiosque para o Posto de Turismo (ecrã tátil)
- Feed de eventos em tempo real a partir do site
