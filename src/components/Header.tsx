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
    { label: 'Home', href: '/' },
    { label: 'Explore', href: '/explore' },
  ];

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 border-b ${
        scrolled
          ? 'h-16 bg-white/95 backdrop-blur-xl shadow-sm border-gray-100'
          : 'h-[72px] bg-white/80 backdrop-blur-2xl border-gray-100/50'
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 h-full flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => router.push('/')}
          className="flex items-center gap-2.5 focus:outline-none cursor-pointer shrink-0"
        >
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="28" height="28" rx="8" fill="#6C63FF" />
            <path d="M8 10h12M8 14h8M8 18h10" stroke="white" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <span className="font-headline font-bold text-[15px] text-[#1a1c1c] hidden sm:block">LeapSkills</span>
        </button>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => router.push(link.href)}
              className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all focus:outline-none cursor-pointer ${
                isActive(link.href)
                  ? 'text-primary-brand bg-primary-brand/5'
                  : 'text-[#5f5e5e] hover:text-[#1a1c1c] hover:bg-gray-50'
              }`}
            >
              {link.label}
              {isActive(link.href) && (
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-5 h-[2px] bg-primary-brand rounded-full" />
              )}
            </button>
          ))}
        </nav>

        {/* Right Side */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => router.push('/signup')}
            className="text-sm font-semibold text-[#5f5e5e] hover:text-[#1a1c1c] px-4 py-2 rounded-lg hover:bg-gray-50 transition-all focus:outline-none cursor-pointer"
          >
            Sign In
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-50 transition-colors focus:outline-none cursor-pointer ml-1"
            aria-label="Toggle menu"
          >
            <svg className="w-5 h-5 text-[#5f5e5e]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-white border-b border-gray-100 shadow-lg animate-fade-in">
          <nav className="max-w-7xl mx-auto px-5 py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => {
                  router.push(link.href);
                  setMobileOpen(false);
                }}
                className={`text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors focus:outline-none cursor-pointer ${
                  isActive(link.href)
                    ? 'text-primary-brand bg-primary-brand/5'
                    : 'text-[#5f5e5e] hover:text-[#1a1c1c] hover:bg-gray-50'
                }`}
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => {
                router.push('/signup');
                setMobileOpen(false);
              }}
              className="text-left px-4 py-3 rounded-lg text-sm font-medium text-[#5f5e5e] hover:text-[#1a1c1c] hover:bg-gray-50 transition-colors focus:outline-none cursor-pointer"
            >
              Sign In
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
