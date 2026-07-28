'use client';

import { useEffect, useRef, useState } from 'react';
import { ALL_PLACES } from '@/lib/places';

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
    errorBusy: string;
    disclaimer: string;
    typing: string;
    fbUp: string;
    fbDown: string;
    fbThanks: string;
    onMap: string;
    chips: string[];
  }
> = {
  pt: {
    tagline: 'O teu Guia de Braga',
    welcome: 'Olá! Sou o Bracvs 👋',
    sub: 'Pergunta-me o que quiseres sobre Braga.',
    placeholder: 'Escreve a tua pergunta…',
    send: 'Enviar',
    errorGeneric: 'Algo correu mal. Tenta novamente.',
    errorRate: 'Muitas mensagens seguidas. Espera um minuto e volta a tentar.',
    errorBusy: 'Estou sem capacidade neste momento. Tenta daqui a alguns minutos — entretanto, tens tudo em visitbraga.travel.',
    disclaimer: 'O Bracvs pode cometer erros. Confirma horários e preços em visitbraga.travel.',
    typing: 'O Bracvs está a escrever',
    fbUp: 'Resposta útil',
    fbDown: 'Resposta não útil',
    fbThanks: 'Obrigado!',
    onMap: 'Ver no mapa',
    chips: [
      'O que visitar num dia?',
      'Como chego ao Bom Jesus?',
      'Onde comer comida típica?',
    ],
  },
  es: {
    tagline: 'Tu Guía de Braga',
    welcome: '¡Hola! Soy Bracvs 👋',
    sub: 'Pregúntame lo que quieras sobre Braga.',
    placeholder: 'Escribe tu pregunta…',
    send: 'Enviar',
    errorGeneric: 'Algo salió mal. Inténtalo de nuevo.',
    errorRate: 'Demasiados mensajes seguidos. Espera un minuto e inténtalo otra vez.',
    errorBusy: 'No tengo capacidad en este momento. Inténtalo en unos minutos — mientras tanto, tienes todo en visitbraga.travel.',
    disclaimer: 'Bracvs puede cometer errores. Confirma horarios y precios en visitbraga.travel.',
    typing: 'Bracvs está escribiendo',
    fbUp: 'Respuesta útil',
    fbDown: 'Respuesta no útil',
    fbThanks: '¡Gracias!',
    onMap: 'Ver en el mapa',
    chips: [
      '¿Qué visitar en un día?',
      '¿Cómo llego al Bom Jesus?',
      '¿Dónde comer comida típica?',
    ],
  },
  en: {
    tagline: 'Your Braga Guide',
    welcome: "Hi! I'm Bracvs 👋",
    sub: 'Ask me anything about Braga.',
    placeholder: 'Type your question…',
    send: 'Send',
    errorGeneric: 'Something went wrong. Please try again.',
    errorRate: 'Too many messages. Wait a minute and try again.',
    errorBusy: "I'm at capacity right now. Please try again in a few minutes — meanwhile, everything is on visitbraga.travel.",
    disclaimer: 'Bracvs can make mistakes. Check opening hours and prices at visitbraga.travel.',
    typing: 'Bracvs is typing',
    fbUp: 'Helpful answer',
    fbDown: 'Not helpful',
    fbThanks: 'Thanks!',
    onMap: 'View on map',
    chips: [
      'What to see in one day?',
      'How do I get to Bom Jesus?',
      'Where to eat local food?',
    ],
  },
  fr: {
    tagline: 'Ton Guide de Braga',
    welcome: 'Salut ! Je suis Bracvs 👋',
    sub: 'Pose-moi tes questions sur Braga.',
    placeholder: 'Écris ta question…',
    send: 'Envoyer',
    errorGeneric: 'Une erreur est survenue. Réessaie.',
    errorRate: 'Trop de messages. Attends une minute et réessaie.',
    errorBusy: "Je n'ai pas de capacité en ce moment. Réessaie dans quelques minutes — en attendant, tout est sur visitbraga.travel.",
    disclaimer: 'Bracvs peut faire des erreurs. Vérifie horaires et prix sur visitbraga.travel.',
    typing: 'Bracvs écrit',
    fbUp: 'Réponse utile',
    fbDown: 'Réponse inutile',
    fbThanks: 'Merci !',
    onMap: 'Voir sur la carte',
    chips: [
      'Que voir en une journée ?',
      'Comment aller au Bom Jesus ?',
      'Où manger local ?',
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

// Limpeza de markdown: alguns modelos ignoram a instrução de escrever em
// texto simples e devolvem **negritos**, [links](url) ou ### títulos. Como a
// interface mostra texto puro, os símbolos apareciam em bruto. Isto resolve
// independentemente do modelo que responder.
function limparMarkdown(texto: string): string {
  return texto
    // [rótulo](url) → rótulo
    .replace(/\[([^\]]+)\]\((?:https?:\/\/)?[^)]+\)/g, '$1')
    // **negrito** e __negrito__
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/__([^_]+)__/g, '$1')
    // *itálico* isolado (evita apanhar listas "* item")
    .replace(/(^|[^*\s])\*([^*\n]+)\*(?![*\w])/g, '$1$2')
    // ### títulos
    .replace(/^#{1,6}\s+/gm, '')
    // listas com asterisco → travessão
    .replace(/^\s*\*\s+/gm, '- ')
    // marcas de código
    .replace(/`{1,3}/g, '')
    .trim();
}

// Deteção de locais oficiais mencionados na resposta (sem IA, sem custo)
function norm(s: string): string {
  return s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

function detectPlaces(text: string): string[] {
  const n = norm(text);
  const found: string[] = [];
  for (const p of ALL_PLACES) {
    if (found.length >= 3) break;
    if (n.includes(norm(p))) found.push(p);
  }
  return found;
}

function PlaceActions({ text, label }: { text: string; label: string }) {
  const places = detectPlaces(text);
  if (places.length === 0) return null;
  return (
    <div className="actions">
      {places.map((p) => (
        <a
          key={p}
          className="action-chip"
          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(p + ', Braga, Portugal')}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${label}: ${p}`}
        >
          📍 {p}
        </a>
      ))}
    </div>
  );
}

// Indicador "a escrever": o Bracvs presente, com pontos animados
function TypingBubble({ label }: { label: string }) {
  return (
    <div className="bot-row">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="bot-avatar" src="/bracvs-avatar.png" alt="" />
      <div className="msg bot typing-bubble" role="status" aria-label={label}>
        <span className="typing-label">{label}</span>
        <span className="dots" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
      </div>
    </div>
  );
}

export default function Chat() {
  const [lang, setLang] = useState<Lang>('en');
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [voted, setVoted] = useState<Record<number, 'up' | 'down'>>({});
  const bottomRef = useRef<HTMLDivElement>(null);
  const lastBotRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setLang(detectUiLang());
  }, []);

  useEffect(() => {
    const ultima = messages[messages.length - 1];
    // Quando chega uma resposta do Bracvs, mostra-a a partir do INÍCIO
    // (alinha o topo da mensagem ao topo da área visível). Para mensagens
    // do utilizador ou enquanto escreve, acompanha o fim como habitual.
    if (ultima?.role === 'assistant' && lastBotRef.current) {
      lastBotRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, busy]);

  const t = UI[lang];
  // Em ecrãs táteis, o Enter faz nova linha (envio só pelo botão); no
  // computador, o Enter envia (Shift+Enter faz nova linha).
  const isTouch =
    typeof window !== 'undefined' &&
    window.matchMedia?.('(pointer: coarse)').matches;

  function votar(i: number, voto: 'up' | 'down') {
    if (voted[i]) return;
    setVoted((v) => ({ ...v, [i]: voto }));
    fetch('/api/feedback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        voto,
        pergunta: messages[i - 1]?.role === 'user' ? messages[i - 1].content : '',
        resposta: messages[i].content,
      }),
    }).catch(() => {});
  }

  async function send(text: string) {
    const content = text.trim();
    if (!content || busy) return;
    setError(null);
    setInput('');
    const next: Msg[] = [...messages, { role: 'user', content }];
    setMessages(next);
    setBusy(true);

    try {
      let res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: next, lang }),
      });

      // Fornecedores em recuperação (limites por minuto): espera e tenta 1x
      if (res.status === 502) {
        await new Promise((r) => setTimeout(r, 9500));
        res = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ messages: next, lang }),
        });
      }

      if (res.status === 429) {
        setError(t.errorRate);
        return;
      }
      if (res.status === 502) {
        // Todos os fornecedores indisponíveis (quota/avaria)
        setError(t.errorBusy);
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
      // Remove uma bolha vazia do Bracvs se a resposta nunca chegou a vir
      setMessages((m) =>
        m.length && m[m.length - 1].role === 'assistant' && m[m.length - 1].content === ''
          ? m.slice(0, -1)
          : m
      );
    }
  }

  return (
    <div className="app">
      <header className="header">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="header-mascot" src="/mascote-bracvs-web.png" alt="" />
        <div className="header-titles">
          <h1>Bracvs</h1>
          <p>{t.tagline}</p>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="header-logo" src="/logo-visitbraga-branco.png" alt="Visit Braga" />
      </header>

      <main className="messages" aria-live="polite">
        {messages.length === 0 && (
          <div className="empty">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="mascot" src="/mascote-bracvs-web.png" alt="Bracvs" />
            <h2>
              {t.welcome.split('Bracvs')[0]}
              <em>Bracvs</em>
              {t.welcome.split('Bracvs')[1]}
            </h2>
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

        {messages.map((m, i) =>
          m.role === 'user' ? (
            <div key={i} className="msg user">
              {m.content}
            </div>
          ) : (
            <div
              key={i}
              className="bot-row"
              ref={i === messages.length - 1 ? lastBotRef : undefined}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="bot-avatar" src="/bracvs-avatar.png" alt="" />
              <div className="bot-col">
                <div className="msg bot">{limparMarkdown(m.content)}</div>
                {m.content !== '' && (!busy || i < messages.length - 1) && (
                  <PlaceActions text={limparMarkdown(m.content)} label={t.onMap} />
                )}
                {m.content !== '' && (!busy || i < messages.length - 1) && (
                  <div className="feedback">
                    {voted[i] ? (
                      <span className="fb-thanks">{t.fbThanks}</span>
                    ) : (
                      <>
                        <button
                          className="fb-btn"
                          aria-label={t.fbUp}
                          title={t.fbUp}
                          onClick={() => votar(i, 'up')}
                        >
                          👍
                        </button>
                        <button
                          className="fb-btn"
                          aria-label={t.fbDown}
                          title={t.fbDown}
                          onClick={() => votar(i, 'down')}
                        >
                          👎
                        </button>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
          )
        )}

        {busy &&
          (messages[messages.length - 1]?.role === 'user' ||
            messages[messages.length - 1]?.content === '') && (
            <TypingBubble label={t.typing} />
          )}
        {error && <div className="msg error">{error}</div>}
        <div ref={bottomRef} />
      </main>

      <div className="composer">
        <textarea
          ref={inputRef}
          value={input}
          rows={1}
          onChange={(e) => {
            setInput(e.target.value);
            // cresce até 5 linhas conforme o texto
            e.target.style.height = 'auto';
            e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px';
          }}
          onKeyDown={(e) => {
            // Telemóvel: Enter = nova linha (envio só no botão).
            // Computador: Enter envia, Shift+Enter faz nova linha.
            if (e.key === 'Enter' && !e.shiftKey && !isTouch) {
              e.preventDefault();
              send(input);
              if (inputRef.current) inputRef.current.style.height = 'auto';
            }
          }}
          placeholder={t.placeholder}
          aria-label={t.placeholder}
          maxLength={2000}
        />
        <button
          onClick={() => {
            send(input);
            if (inputRef.current) inputRef.current.style.height = 'auto';
          }}
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
