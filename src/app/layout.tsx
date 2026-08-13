import type { Metadata, Viewport } from 'next';
import './globals.css';
import ClientLayout from './ClientLayout';
import QueryProvider from '../components/providers/QueryProvider';
import { ClerkProvider } from '@clerk/nextjs';
import JsonLd from '../components/seo/JsonLd';

const BASE_URL = 'https://leapskills.sbs';
const SITE_NAME = 'Leap Skills';
const DEFAULT_TITLE = 'Leap Skills — Monetize Your Technical Expertise';
const DEFAULT_DESCRIPTION =
  'The #1 creator monetization platform for engineers, security architects & technical advisors. Book 1:1 consultations, sell digital products, and get instant Stripe payouts — all from one public profile link.';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#080c14' },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),

  title: {
    default: DEFAULT_TITLE,
    template: `%s | ${SITE_NAME}`,
  },

  description: DEFAULT_DESCRIPTION,

  keywords: [
    'technical mentorship platform',
    'creator monetization for engineers',
    'book software engineer consultation',
    '1:1 coding consultation',
    'paid technical mentorship',
    'Stripe Connect instant payout',
    'sell digital products for developers',
    'security architect consultation',
    'DevOps expert booking',
    'Leap Skills',
    'online technical advisor booking',
    'cohort based learning for engineers',
  ],

  authors: [{ name: 'Leap Skills', url: BASE_URL }],
  creator: 'Leap Skills',
  publisher: 'Leap Skills',

  // Canonical + alternates
  alternates: {
    canonical: BASE_URL,
    languages: { 'en-US': BASE_URL },
  },

  // Open Graph — controls how the link looks when shared on LinkedIn, WhatsApp, Slack, etc.
  openGraph: {
    type: 'website',
    url: BASE_URL,
    siteName: SITE_NAME,
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    locale: 'en_US',
    images: [
      {
        url: `${BASE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'Leap Skills — Creator Monetization for Technical Experts',
        type: 'image/png',
      },
    ],
  },

  // Twitter / X card
  twitter: {
    card: 'summary_large_image',
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [`${BASE_URL}/og-image.png`],
    creator: '@leapskills',
    site: '@leapskills',
  },

  // Robots directives
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  // App icons
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },

  // Verification tags — add your codes from Google/Bing search console here
  // verification: {
  //   google: 'YOUR_GOOGLE_SITE_VERIFICATION_CODE',
  //   yandex: 'YOUR_YANDEX_CODE',
  //   bing: 'YOUR_BING_WEBMASTER_CODE',
  // },

  category: 'technology',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <head>
          {/* Dark mode flash prevention */}
          <script dangerouslySetInnerHTML={{ __html: `
            try {
              if (localStorage.getItem('theme') === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                document.documentElement.classList.add('dark');
              } else {
                document.documentElement.classList.remove('dark');
              }
            } catch (_) {}
          `}} />

          {/* Google Fonts */}
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@600;700;800&family=JetBrains+Mono:wght@500;700&display=swap" rel="stylesheet" />
          <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap" rel="stylesheet" />

          {/* Global JSON-LD structured data — SEO + GEO + AEO */}
          <JsonLd />
        </head>
        <body className="bg-[#fafafa] dark:bg-[#080c14] text-slate-900 dark:text-slate-100 antialiased font-sans min-h-screen flex flex-col transition-colors duration-200">
          <QueryProvider>
            <ClientLayout>{children}</ClientLayout>
          </QueryProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
