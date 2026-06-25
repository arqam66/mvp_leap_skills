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
      <div className="flex justify-between items-center w-full px-4 md:px-10 max-w-7xl mx-auto">
        <div className="flex items-center gap-12">
          <button
            onClick={() => router.push('/')}
            className="flex items-center gap-3 group cursor-pointer text-left focus:outline-none"
            id="nav-logo"
          >
            <img
              alt="Leap Skills Logo"
              className="h-10 w-auto object-contain transition-transform group-hover:scale-105"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBGmOWQ2KyxXrzAzOweN_nQl71EHn0Zf3GVoOLOv9KAJWg7jz0OenkRpIv2QYfvqvLxsNLKy7a7IxY-1yUctTCjc4uaeaYrQjocRKXqMw7fqv8y1P_UZ06ALbHb2AF24vFIhkoTYLsU0_-sXBOeBydDqKz5joldm0L9t_X9zOWePMHuRsF7UsjBtIvF6NQIWhEvk0cgzbOSLPrqoE31znhALbmQZ1VLziVjFq9LSbHI_bHVPtfV5eIe1iA_wkr-DrVsFae7qHlvcL-4"
            />
            <span className="text-xl md:text-2xl font-headline font-extrabold tracking-tight text-primary-container">
              Leap Skills
            </span>
          </button>

          <nav className="hidden lg:flex items-center gap-8">
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
            onClick={() => router.push('/dashboard')}
            className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-primary-brand bg-primary-brand/5 border border-primary-brand/10 hover:bg-primary-brand/10 px-4 py-2 rounded-xl transition-all mr-2 focus:outline-none"
            id="nav-cc"
          >
            <span className="material-symbols-outlined text-[16px] font-bold">dashboard</span>
            Creator Dashboard
          </button>

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
