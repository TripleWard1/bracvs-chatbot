import type { Metadata, Viewport } from 'next';
import { Fraunces, Instrument_Sans } from 'next/font/google';
import './globals.css';

// Fontes self-hosted pelo Next (sem pedido ao Google no browser do turista:
// carregamento instantâneo, sem "flash" de tipo errado, e melhor em RGPD)
const fraunces = Fraunces({
  subsets: ['latin'],
  weight: ['500', '600'],
  variable: '--font-fraunces',
  display: 'swap',
});

const instrument = Instrument_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-instrument',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Bracvs - Assistente do Visit Braga',
  description:
    'Bracvs, a mascote do Visit Braga, responde às tuas perguntas sobre a cidade em Português, Español, English e Français.',
  manifest: '/manifest.webmanifest',
  icons: {
    icon: [
      { url: '/icone-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icone-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: '/icone-192.png',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#F80000',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt" className={`${fraunces.variable} ${instrument.variable}`}>
      <body>{children}</body>
    </html>
  );
}
