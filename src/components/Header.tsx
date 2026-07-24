'use client';

import React from 'react';
import { useRouter, usePathname } from 'next/navigation';

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const [scrolled, setScrolled] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (pathname === '/dashboard' || pathname === '/signup') return null;

  const isActive = (p: string) => pathname === p;

  const navLinks = [
    { label: 'Storefront', href: '/' },
    { label: 'Explore Mentors', href: '/explore' },
  ];

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-200 border-b ${
        scrolled
          ? 'h-16 bg-white/95 backdrop-blur-md border-slate-200 shadow-xs'
          : 'h-[72px] bg-white/80 backdrop-blur-md border-slate-200/60'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
        {/* Brand Mark */}
        <button
          type="button"
          onClick={() => router.push('/')}
          className="flex items-center gap-3 focus-ring rounded-md p-1 cursor-pointer shrink-0"
        >
          <div className="w-8 h-8 rounded-md bg-slate-900 flex items-center justify-center text-white font-headline font-bold text-sm tracking-tighter">
            LS
          </div>
          <span className="font-headline font-bold text-base tracking-tight text-slate-900 hidden sm:block">
            Leap Skills
          </span>
        </button>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <button
              type="button"
              key={link.href}
              onClick={() => router.push(link.href)}
              className={`relative px-4 py-2 text-sm font-semibold rounded-md transition-colors focus-ring cursor-pointer ${
                isActive(link.href)
                  ? 'text-slate-900 bg-slate-100'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => router.push('/signup')}
            className="text-sm font-semibold text-slate-700 hover:text-slate-900 px-4 py-2 rounded-md hover:bg-slate-100 transition-colors focus-ring cursor-pointer"
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => router.push('/dashboard')}
            className="text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 px-4 py-2 rounded-md transition-colors focus-ring cursor-pointer"
          >
            Dashboard
          </button>

          {/* Mobile Menu Trigger */}
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 rounded-md hover:bg-slate-100 transition-colors focus-ring cursor-pointer ml-1 text-slate-700"
            aria-label="Toggle navigation menu"
          >
            <svg className="w-5 h-5 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-white border-b border-slate-200 shadow-md animate-fade-in">
          <nav className="max-w-7xl mx-auto px-6 py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <button
                type="button"
                key={link.href}
                onClick={() => {
                  router.push(link.href);
                  setMobileOpen(false);
                }}
                className={`text-left px-4 py-3 rounded-md text-sm font-semibold transition-colors focus-ring cursor-pointer ${
                  isActive(link.href)
                    ? 'text-slate-900 bg-slate-100'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}

