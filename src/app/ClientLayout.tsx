'use client';

import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AuthModal from '../components/AuthModal';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [authOpen, setAuthOpen] = React.useState(false);

  return (
    <>
      <Header onOpenAuth={() => setAuthOpen(true)} />
      {children}
      <Footer />
      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
    </>
  );
}
