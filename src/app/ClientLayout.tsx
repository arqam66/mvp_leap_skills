'use client';

import React, { useState, useEffect } from 'react';
import LoadingScreen from '../components/ui/8bit-loading-screen';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FingerprintProvider from '../components/providers/FingerprintProvider';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 4000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <LoadingScreen
        variant="fullscreen"
        autoProgress
        autoProgressDuration={4000}
      />
    );
  }

  return (
    <FingerprintProvider>
      <Header />
      {children}
      <Footer />
    </FingerprintProvider>
  );
}

