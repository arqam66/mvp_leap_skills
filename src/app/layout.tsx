import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Leap Skills | Your All-in-One Creator Storefront',
  description: 'The professional infrastructure for high-value creators and experts worldwide.',
};

import ClientLayout from './ClientLayout';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="light">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Sora:wght@600;700;800&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap" rel="stylesheet" />
      </head>
      <script dangerouslySetInnerHTML={{ __html: `
        if ('serviceWorker' in navigator) {
          navigator.serviceWorker.getRegistrations().then(function(registrations) {
            for (var registration of registrations) {
              registration.unregister();
            }
          });
        }
      `}} />
      <body className="bg-black text-white antialiased font-sans min-h-screen flex flex-col">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
