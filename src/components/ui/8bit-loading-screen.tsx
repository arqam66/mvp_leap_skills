'use client';

import React, { useEffect, useState } from 'react';

const DEFAULT_TIPS = [
  'Connecting you with top-tier technical mentors...',
  'Tailoring your personalized growth journey...',
  'Unlock industry secrets and master new domains...',
  'Prepare to leap forward with high-performance coaching...',
  'Elevate your skills to the next absolute level...'
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
    } flex flex-col items-center justify-center bg-slate-950 text-white select-none ${className}`}>
      {/* Ambient background glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none animate-pulse duration-[8000ms]" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px] pointer-events-none animate-pulse duration-[6000ms]" />

      <div className="w-full max-w-md px-6 flex flex-col items-center gap-8 relative z-10">
        {/* Animated Brand Logo Icon */}
        <div className="relative flex items-center justify-center">
          <div className="absolute inset-0 bg-indigo-500/20 rounded-2xl blur-xl animate-ping opacity-75 duration-1000" />
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-indigo-600 to-indigo-500 flex items-center justify-center text-white shadow-2xl shadow-indigo-500/40 relative z-10 border border-indigo-400/20">
            <svg className="w-9 h-9 animate-bounce duration-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
            </svg>
          </div>
        </div>

        {/* Title / Brand Name */}
        <div className="text-center space-y-1.5">
          <h2 className="font-headline text-3xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-indigo-100 to-indigo-300">
            {title}
          </h2>
          <p className="text-[11px] font-bold tracking-widest text-indigo-400 uppercase">
            Platform Storefront
          </p>
        </div>

        {/* Custom Premium Progress Bar */}
        <div className="w-full space-y-2.5">
          <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden border border-slate-800/80 p-[1px]">
            <div
              className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-indigo-600 to-purple-600 shadow-[0_0_12px_rgba(99,102,241,0.5)] transition-all duration-75 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between items-center text-[10px] font-bold text-slate-500 tracking-wider">
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
