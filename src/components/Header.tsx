'use client';

import React from 'react';
import { useRouter, usePathname } from 'next/navigation';

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (pathname === '/dashboard') return null;

  const isActive = (p: string) => pathname === p;

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 flex items-center border-b ${
        scrolled
          ? 'h-[72px] bg-white/90 backdrop-blur-md shadow-sm border-gray-100'
          : 'h-[80px] bg-white/70 backdrop-blur-xl border-gray-100/50'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center w-full">
        <div className="flex items-center gap-12">
          <button
            onClick={() => router.push('/')}
            className="focus:outline-none cursor-pointer flex items-center gap-2"
          >
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="28" height="28" rx="8" fill="#6C63FF" />
              <path d="M8 10h12M8 14h8M8 18h10" stroke="white" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <span className="font-sans font-bold text-base text-[#1a1c1c]">LeapSkills</span>
          </button>
          <nav className="hidden lg:flex items-center gap-6">
            <button
              onClick={() => router.push('/')}
              className={`font-sans font-semibold text-sm relative py-1 focus:outline-none cursor-pointer transition-colors ${
                isActive('/')
                  ? 'text-primary-brand after:absolute after:bottom-[-20px] after:left-0 after:w-full after:h-[3px] after:bg-primary-brand'
                  : 'text-[#5f5e5e] hover:text-primary-container'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => router.push('/explore')}
              className={`font-sans font-semibold text-sm relative py-1 focus:outline-none cursor-pointer transition-colors ${
                isActive('/explore')
                  ? 'text-primary-brand after:absolute after:bottom-[-20px] after:left-0 after:w-full after:h-[3px] after:bg-primary-brand'
                  : 'text-[#5f5e5e] hover:text-primary-container'
              }`}
            >
              Explore
            </button>
            <span className="text-xs text-gray-300">|</span>
            <span className="text-xs font-semibold text-gray-400 select-none cursor-default bg-gray-50 px-2.5 py-1 rounded-full border border-gray-100">Webinars</span>
            <span className="text-xs font-semibold text-gray-400 select-none cursor-default bg-gray-50 px-2.5 py-1 rounded-full border border-gray-100">Cohorts</span>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => router.push('/explore')}
            className="text-sm font-semibold text-[#5f5e5e] hover:text-[#1a1c1c] px-4 py-2.5 rounded-xl transition-all focus:outline-none cursor-pointer"
          >
            Sign In
          </button>
          <button
            onClick={() => router.push('/explore')}
            className="text-sm font-bold bg-primary-container text-white px-6 py-2.5 rounded-xl transition-all hover:bg-primary-brand hover:shadow-lg hover:shadow-primary-container/20 active:scale-95 focus:outline-none"
          >
            Join Platform
          </button>
        </div>
      </div>
    </header>
  );
}
