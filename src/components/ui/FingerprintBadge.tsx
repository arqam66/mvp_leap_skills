'use client';

import React from 'react';
import { useVisitorId } from '../providers/FingerprintProvider';

export default function FingerprintBadge() {
  const visitorId = useVisitorId();

  return (
    <div className="fixed bottom-3 left-3 z-40 flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/90 dark:bg-white/90 border border-slate-700 dark:border-slate-200 text-white dark:text-slate-900 backdrop-blur-md shadow-lg">
      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
      <span className="text-[9px] font-mono font-bold tracking-widest text-slate-400 dark:text-slate-500 uppercase">
        Fingerprint
      </span>
      <span
        data-testid="visitor-id-badge"
        title={visitorId ?? undefined}
        className="font-mono text-[10px] tabular-nums truncate max-w-[180px]"
      >
        {visitorId ?? 'Calculating…'}
      </span>
    </div>
  );
}
