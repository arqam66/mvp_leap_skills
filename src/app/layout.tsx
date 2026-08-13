import type { Metadata } from 'next';
import './globals.css';
import ClientLayout from './ClientLayout';
import QueryProvider from '../components/providers/QueryProvider';
import { ClerkProvider } from '@clerk/nextjs';

export const metadata: Metadata = {
  title: 'CreatorHub Pro | Single-Link Creator Monetization Platform',
  description: 'Monetize your expertise through 1:1 consultations, webinars, cohorts, packages, paid DMs, and digital products — all from one public profile link.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <head>
          <script dangerouslySetInnerHTML={{ __html: `
            try {
              if (localStorage.getItem('theme') === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                document.documentElement.classList.add('dark');
              } else {
                document.documentElement.classList.remove('dark');
              }
            } catch (_) {}
          `}} />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@600;700;800&family=JetBrains+Mono:wght@500;700&display=swap" rel="stylesheet" />
          <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap" rel="stylesheet" />
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
