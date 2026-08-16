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
  tips?: string[];
  autoProgressDuration?: number;
  className?: string;
  variant?: 'default' | 'fullscreen';
  autoProgress?: boolean;
}

export default function LoadingScreen({
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
    } relative flex flex-col items-center justify-center bg-[#070a12] text-white select-none ${className}`}>

      {/* Aurora gradient blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 -left-24 w-[28rem] h-[28rem] rounded-full bg-indigo-600/25 blur-[120px]" />
        <div className="absolute -bottom-32 -right-24 w-[28rem] h-[28rem] rounded-full bg-violet-500/20 blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[24rem] h-[24rem] rounded-full bg-sky-500/10 blur-[100px]" />
      </div>

      {/* Subtle grid overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.6) 1px, transparent 1px)',
          backgroundSize: '44px 44px',
          maskImage: 'radial-gradient(ellipse 70% 60% at 50% 45%, black, transparent)',
        }}
      />

      <div className="w-full max-w-md px-6 flex flex-col items-center gap-10 relative z-10">

        {/* Spinner ring */}
        <div className="relative w-16 h-16 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full spin-slow"
            style={{
              background: 'conic-gradient(from 0deg, transparent 12%, #818cf8 55%, #22d3ee 100%)',
              WebkitMask: 'radial-gradient(farthest-side, transparent calc(100% - 2.5px), black calc(100% - 2.5px))',
              mask: 'radial-gradient(farthest-side, transparent calc(100% - 2.5px), black calc(100% - 2.5px))',
            }}
          />
          <div className="absolute inset-0 rounded-full bg-indigo-500/10 blur-md" />
          <div className="w-2 h-2 rounded-full bg-indigo-300 pulse-glow" />
        </div>

        {/* Subtle eyebrow */}
        <p className="text-[10px] font-mono font-semibold tracking-[0.35em] text-slate-500 uppercase">
          Experience
        </p>

        {/* Premium progress bar */}
        <div className="w-full space-y-3">
          <div className="relative h-[3px] w-full rounded-full bg-white/[0.06] overflow-hidden">
            <div
              className="absolute inset-y-0 left-0 rounded-full transition-all duration-75 ease-out"
              style={{
                width: `${progress}%`,
                background: 'linear-gradient(90deg, #6366f1, #22d3ee)',
                boxShadow: '0 0 12px rgba(99,102,241,0.7)',
              }}
            />
            <div
              className="absolute inset-y-0 rounded-full w-24 shimmer"
              style={{ left: `calc(${progress}% - 6rem)` }}
            />
          </div>
          <div className="flex justify-between items-center text-[10px] font-mono font-semibold text-slate-500 tracking-widest">
            <span className="inline-flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-emerald-400 pulse-glow inline-block" />
              LOADING
            </span>
            <span className="tabular-nums text-slate-300">{Math.round(progress)}%</span>
          </div>
        </div>

        {/* Tips */}
        {tips.length > 0 && (
          <div className="w-full text-center min-h-[40px] flex items-center justify-center px-4">
            <p key={currentTipIndex} className="text-[13px] text-slate-400 leading-relaxed animate-fade-in font-light tracking-wide">
              {tips[currentTipIndex]}
            </p>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes ls-spin {
          to { transform: rotate(360deg); }
        }
        @keyframes ls-pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(0.85); }
        }
        @keyframes ls-shimmer {
          0% { transform: translateX(0); opacity: 0; }
          15% { opacity: 0.6; }
          85% { opacity: 0.6; }
          100% { transform: translateX(6rem); opacity: 0; }
        }
        .spin-slow { animation: ls-spin 1.1s linear infinite; }
        .pulse-glow { animation: ls-pulse 1.6s ease-in-out infinite; }
        .shimmer {
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.55), transparent);
          animation: ls-shimmer 1.4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
