'use client';

import { useEffect, useRef, useState } from 'react';

type Msg = { role: 'user' | 'assistant'; content: string };
type Lang = 'pt' | 'es' | 'en' | 'fr';

// ---------- Textos da interface nas 4 línguas ----------
const UI: Record<
  Lang,
  {
    tagline: string;
    welcome: string;
    sub: string;
    placeholder: string;
    send: string;
    errorGeneric: string;
    errorRate: string;
    disclaimer: string;
    chips: string[];
  }
> = {
  pt: {
    tagline: 'A mascote do Visit Braga',
    welcome: 'Olá! Sou o Bracvs 👋',
    sub: 'Pergunta-me o que quiseres sobre Braga.',
    placeholder: 'Escreve a tua pergunta…',
    send: 'Enviar',
    errorGeneric: 'Algo correu mal. Tenta novamente.',
    errorRate: 'Muitas mensagens seguidas. Espera um minuto e volta a tentar.',
    disclaimer: 'O Bracvs pode cometer erros. Confirma horários e preços em visitbraga.travel.',
    chips: [
      'O que visitar num dia?',
      'Como chego ao Bom Jesus?',
      'Onde comer comida típica?',
      'Que eventos há em Braga?',
    ],
  },
  es: {
    tagline: 'La mascota de Visit Braga',
    welcome: '¡Hola! Soy Bracvs 👋',
    sub: 'Pregúntame lo que quieras sobre Braga.',
    placeholder: 'Escribe tu pregunta…',
    send: 'Enviar',
    errorGeneric: 'Algo salió mal. Inténtalo de nuevo.',
    errorRate: 'Demasiados mensajes seguidos. Espera un minuto e inténtalo otra vez.',
    disclaimer: 'Bracvs puede cometer errores. Confirma horarios y precios en visitbraga.travel.',
    chips: [
      '¿Qué visitar en un día?',
      '¿Cómo llego al Bom Jesus?',
      '¿Dónde comer comida típica?',
      '¿Qué eventos hay en Braga?',
    ],
  },
  en: {
    tagline: 'The Visit Braga mascot',
    welcome: "Hi! I'm Bracvs 👋",
    sub: 'Ask me anything about Braga.',
    placeholder: 'Type your question…',
    send: 'Send',
    errorGeneric: 'Something went wrong. Please try again.',
    errorRate: 'Too many messages. Wait a minute and try again.',
    disclaimer: 'Bracvs can make mistakes. Check opening hours and prices at visitbraga.travel.',
    chips: [
      'What to see in one day?',
      'How do I get to Bom Jesus?',
      'Where to eat local food?',
      "What's on in Braga?",
    ],
  },
  fr: {
    tagline: 'La mascotte de Visit Braga',
    welcome: 'Salut ! Je suis Bracvs 👋',
    sub: 'Pose-moi tes questions sur Braga.',
    placeholder: 'Écris ta question…',
    send: 'Envoyer',
    errorGeneric: 'Une erreur est survenue. Réessaie.',
    errorRate: 'Trop de messages. Attends une minute et réessaie.',
    disclaimer: 'Bracvs peut faire des erreurs. Vérifie horaires et prix sur visitbraga.travel.',
    chips: [
      'Que voir en une journée ?',
      'Comment aller au Bom Jesus ?',
      'Où manger local ?',
      'Quels événements à Braga ?',
    ],
  },
};

function detectUiLang(): Lang {
  if (typeof navigator === 'undefined') return 'en';
  const l = navigator.language.toLowerCase();
  if (l.startsWith('pt')) return 'pt';
  if (l.startsWith('es')) return 'es';
  if (l.startsWith('fr')) return 'fr';
  return 'en';
}

// Avatar do Bracvs: arco (Arco da Porta Nova) estilizado
function BracvsAvatar({ size = 40 }: { size?: number }) {
  return (
    <svg
      className="avatar"
      width={size}
      height={size}
      viewBox="0 0 40 40"
      aria-hidden="true"
    >
      <circle cx="20" cy="20" r="20" fill="#fff" />
      <path
        d="M11 30 V20 a9 9 0 0 1 18 0 V30"
        fill="none"
        stroke="#1d4e89"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      <circle cx="20" cy="17" r="2.2" fill="#b98a2f" />
    </svg>
  );
}

// Indicador "a escrever": escadório em zigzag do Bom Jesus
function TypingStairs() {
  return (
    <div className="typing" aria-label="…">
      <svg width="56" height="26" viewBox="0 0 56 26">
        <path
          className="stair"
          d="M2 24 h9 v-7 h9 v-7 h9 v-7 h9 M38 3 h16"
        />
      </svg>
    </div>
  );
}

export default function Chat() {
  const [lang, setLang] = useState<Lang>('en');
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setLang(detectUiLang());
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, busy]);

  const t = UI[lang];

  async function send(text: string) {
    const content = text.trim();
    if (!content || busy) return;
    setError(null);
    setInput('');
    const next: Msg[] = [...messages, { role: 'user', content }];
    setMessages(next);
    setBusy(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: next }),
      });

      if (res.status === 429) {
        setError(t.errorRate);
        return;
      }
      if (!res.ok || !res.body) {
        setError(t.errorGeneric);
        return;
      }

      // Streaming: acrescenta tokens à última mensagem do assistente
      setMessages((m) => [...m, { role: 'assistant', content: '' }]);
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        setMessages((m) => {
          const copy = [...m];
          copy[copy.length - 1] = {
            role: 'assistant',
            content: copy[copy.length - 1].content + chunk,
          };
          return copy;
        });
      }
    } catch {
      setError(t.errorGeneric);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="app">
      <header className="header">
        <BracvsAvatar />
        <div>
          <h1>Bracvs</h1>
          <p>{t.tagline}</p>
        </div>
      </header>

      <main className="messages" aria-live="polite">
        {messages.length === 0 && (
          <div className="empty">
            <h2>{t.welcome}</h2>
            <p>{t.sub}</p>
            <div className="chips">
              {t.chips.map((c) => (
                <button key={c} className="chip" onClick={() => send(c)}>
                  {c}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((m, i) => (
          <div key={i} className={`msg ${m.role === 'user' ? 'user' : 'bot'}`}>
            {m.content}
          </div>
        ))}

        {busy && messages[messages.length - 1]?.content === '' && <TypingStairs />}
        {error && <div className="msg error">{error}</div>}
        <div ref={bottomRef} />
      </main>

      <div className="composer">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') send(input);
          }}
          placeholder={t.placeholder}
          aria-label={t.placeholder}
          maxLength={2000}
        />
        <button
          onClick={() => send(input)}
          disabled={busy || !input.trim()}
          aria-label={t.send}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M3 11.5 21 3l-8.5 18-2.3-7.2L3 11.5Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
      <p className="footer-note">{t.disclaimer}</p>
    </div>
  );
}
