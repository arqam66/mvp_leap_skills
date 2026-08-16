'use client';

import React from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useUser, useClerk, UserButton } from '@clerk/nextjs';
import { createClient } from '../lib/supabase/client';

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const { user: clerkUser, isLoaded } = useUser();
  const { signOut } = useClerk();
  const [scrolled, setScrolled] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [supabaseUser, setSupabaseUser] = React.useState<any>(null);

  const supabase = createClient();

  React.useEffect(() => {
    supabase.auth.getUser().then(({ data }: any) => setSupabaseUser(data?.user ?? null));
    const { data: authListener } = supabase.auth.onAuthStateChange((_event: any, session: any) => {
      setSupabaseUser(session?.user ?? null);
    });
    return () => authListener.subscription.unsubscribe();
  }, []);

  const activeUser = clerkUser || supabaseUser;

  React.useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSignOut = async () => {
    if (clerkUser) {
      await signOut();
    } else {
      await supabase.auth.signOut();
    }
    setSupabaseUser(null);
    router.push('/');
  };

  if (pathname === '/dashboard' || pathname === '/login' || pathname === '/signup') return null;

  const isActive = (p: string) => pathname === p;

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Explore Mentors', href: '/explore' },
    { label: 'About Us', href: '/about' },
    { label: 'Contact Support', href: '/contact' },
    { label: 'FAQs & Help', href: '/faq' },
  ];

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-200 border-b ${
        scrolled
          ? 'h-16 bg-white/95 backdrop-blur-md border-slate-200 shadow-xs'
          : 'h-[72px] bg-white/80 backdrop-blur-md border-slate-200/60'
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-6 h-full flex items-center justify-between">
        {/* Brand Logo */}
        <button
          type="button"
          onClick={() => router.push('/')}
          className="flex items-center gap-2.5 focus-ring rounded-md p-1 cursor-pointer shrink-0"
        >
          <div className="w-9 h-9 rounded-lg bg-indigo-600 flex items-center justify-center text-white shadow-sm">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
            </svg>
          </div>
          <span className="font-headline font-bold text-lg tracking-tight text-slate-900">
            Leap Skills
          </span>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <button
              type="button"
              key={link.href}
              onClick={() => router.push(link.href)}
              className={`px-4 py-2 text-sm font-semibold rounded-md transition-colors focus-ring cursor-pointer ${
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
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Auth Action Buttons */}
          {!activeUser ? (
            <button
              type="button"
              onClick={() => router.push('/signup')}
              className="text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 px-4 py-2 rounded-md transition-colors focus-ring cursor-pointer shadow-xs"
            >
              Sign Up
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => router.push('/dashboard')}
                className="text-xs font-bold text-slate-900 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-md transition-colors cursor-pointer"
              >
                Dashboard
              </button>
              {clerkUser ? (
                <UserButton afterSignOutUrl="/" />
              ) : (
                <button
                  type="button"
                  onClick={handleSignOut}
                  className="text-xs font-semibold text-slate-500 hover:text-slate-800 px-2 py-1 transition-colors cursor-pointer"
                >
                  Sign Out
                </button>
              )}
            </div>
          )}

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-md hover:bg-slate-100 transition-colors focus-ring cursor-pointer text-slate-700"
            aria-label="Toggle navigation menu"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Nav Drawer */}
      {mobileOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-slate-200 shadow-lg animate-fade-in">
          <nav className="max-w-7xl mx-auto px-6 py-4 flex flex-col gap-2">
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
            {!activeUser ? (
              <button
                type="button"
                onClick={() => {
                  router.push('/signup');
                  setMobileOpen(false);
                }}
                className="text-left px-4 py-3 rounded-md text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 transition-colors focus-ring cursor-pointer"
              >
                Sign Up
              </button>
            ) : (
              <div className="flex flex-col gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => {
                    router.push('/dashboard');
                    setMobileOpen(false);
                  }}
                  className="text-left px-4 py-2 text-sm font-bold text-indigo-600"
                >
                  Go to Dashboard
                </button>
                <button
                  type="button"
                  onClick={handleSignOut}
                  className="text-left px-4 py-2 text-sm font-semibold text-slate-500"
                >
                  Sign Out
                </button>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}



