'use client';

import React, { useEffect, useState } from 'react';

const DEFAULT_TIPS = [
  'Connecting to verified technical mentors...',
  'Preparing direct Stripe Connect payout channel...',
  'Fetching verified availability and session schedules...',
  'Initializing WebRTC direct video conference room...',
  'Loading creator storefront configuration...'
];

export interface LoadingScreenProps {
  title?: string;
  tips?: string[];
  autoProgressDuration?: number;
  className?: string;
  variant?: 'default' | 'fullscreen';
  autoProgress?: boolean;
}

export default function LoadingScreen({
  title = "Leap Skills",
  tips = DEFAULT_TIPS,
  autoProgressDuration = 1500,
  className = "",
  variant = "default",
  autoProgress = true,
}: LoadingScreenProps) {
  const [currentTipIndex, setCurrentTipIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  // Auto progress logic
  useEffect(() => {
    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const calculated = Math.min((elapsed / autoProgressDuration) * 100, 100);
      setProgress(calculated);
      if (calculated >= 100) {
        clearInterval(interval);
      }
    }, 16); // ~60fps
    return () => clearInterval(interval);
  }, [autoProgressDuration]);

  // Tip cycling logic
  useEffect(() => {
    if (tips.length === 0) return;
    const interval = setInterval(() => {
      setCurrentTipIndex((prev) => (prev + 1) % tips.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [tips]);

  const isFullscreen = variant === 'fullscreen';

  return (
    <div className={`${
      isFullscreen 
        ? 'fixed inset-0 z-50 overflow-hidden' 
        : 'relative w-full py-12 rounded-2xl overflow-hidden min-h-[360px]'
    } flex flex-col items-center justify-center bg-[#090d16] text-white select-none ${className}`}>

      <div className="w-full max-w-md px-6 flex flex-col items-center gap-8 relative z-10">
        {/* Animated Brand Logo Icon */}
        <div className="relative flex items-center justify-center">
          <div className="w-14 h-14 rounded-lg bg-indigo-600 flex items-center justify-center text-white border border-indigo-500/40">
            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
            </svg>
          </div>
        </div>

        {/* Title / Brand Name */}
        <div className="text-center space-y-1.5">
          <h2 className="font-headline text-3xl font-extrabold tracking-tight text-white">
            {title}
          </h2>
          <p className="text-[11px] font-mono font-bold tracking-widest text-slate-400 uppercase">
            STOREFRONT INFRASTRUCTURE
          </p>
        </div>

        {/* Custom Premium Progress Bar */}
        <div className="w-full space-y-2.5">
          <div className="h-1 w-full bg-slate-900 rounded overflow-hidden border border-slate-800">
            <div
              className="h-full bg-indigo-600 transition-all duration-75 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between items-center text-[10px] font-mono font-bold text-slate-500 tracking-wider">
            <span>LOADING MODULES</span>
            <span>{Math.round(progress)}%</span>
          </div>
        </div>

        {/* Tips Section with elegant display */}
        {tips.length > 0 && (
          <div className="w-full text-center min-h-[40px] flex items-center justify-center px-4">
            <p className="text-xs text-slate-400 leading-relaxed animate-fade-in font-medium transition-all duration-300">
              {tips[currentTipIndex]}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
