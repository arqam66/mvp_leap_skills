'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import FingerprintJS from '@fingerprintjs/fingerprintjs';

const FingerprintContext = createContext<{ visitorId: string | null }>({ visitorId: null });

export function useVisitorId(): string | null {
  return useContext(FingerprintContext).visitorId;
}

export default function FingerprintProvider({ children }: { children: React.ReactNode }) {
  const [visitorId, setVisitorId] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    FingerprintJS.load()
      .then((fp) => fp.get())
      .then(({ visitorId }) => {
        if (!cancelled) setVisitorId(visitorId);
      })
      .catch(() => {
        if (!cancelled) setVisitorId(null);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <FingerprintContext.Provider value={{ visitorId }}>{children}</FingerprintContext.Provider>
  );
}
