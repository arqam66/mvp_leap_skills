'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Footer() {
  const pathname = usePathname();

  if (pathname === '/dashboard' || pathname === '/login' || pathname === '/signup') return null;

  return (
    <footer className="w-full py-12 bg-[#fafafa] dark:bg-[#080c14] border-t border-slate-200 dark:border-slate-800/80 text-slate-900 dark:text-slate-200">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 mb-12">
          {/* Brand Info */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 dark:bg-indigo-500 flex items-center justify-center text-white shadow-sm">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                </svg>
              </div>
              <span className="font-headline font-bold text-lg text-slate-900 dark:text-white">Leap Skills</span>
            </div>
            <p className="text-slate-600 dark:text-slate-400 text-xs md:text-sm max-w-xs mb-6 leading-relaxed">
              Direct Stripe Connect payout infrastructure for software architects, security researchers, and independent technical advisors.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="https://www.instagram.com/leap_skillss/?igsh=MndlaHl6NDFzZ3Rt#"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors focus-ring cursor-pointer"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/company/leap-skills/?viewAsMember=true"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-9 h-9 rounded bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors focus-ring cursor-pointer"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
              <a
                href="https://www.facebook.com/share/1ccf8c3zLM/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 rounded bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors focus-ring cursor-pointer"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href="https://www.whatsapp.com/channel/0029VbCfQooDeOMzf0bV572G"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp Channel"
                className="w-9 h-9 rounded bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors focus-ring cursor-pointer"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.205 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Platform Links */}
          <div>
            <h4 className="font-mono text-xs font-bold text-slate-900 dark:text-white uppercase tracking-widest mb-4">// PLATFORM</h4>
            <nav className="flex flex-col gap-2.5 text-xs md:text-sm text-slate-600 dark:text-slate-400">
              <Link href="/" className="hover:text-slate-900 dark:hover:text-white transition-colors focus-ring rounded">Home</Link>
              <Link href="/explore" className="hover:text-slate-900 dark:hover:text-white transition-colors focus-ring rounded">Explore Mentors</Link>
            </nav>
          </div>

          {/* Support / Company Links */}
          <div>
            <h4 className="font-mono text-xs font-bold text-slate-900 dark:text-white uppercase tracking-widest mb-4">// SUPPORT</h4>
            <nav className="flex flex-col gap-2.5 text-xs md:text-sm text-slate-600 dark:text-slate-400">
              <Link href="/about" className="hover:text-slate-900 dark:hover:text-white transition-colors focus-ring rounded">About Us</Link>
              <Link href="/contact" className="hover:text-slate-900 dark:hover:text-white transition-colors focus-ring rounded">Contact Support</Link>
              <Link href="/faq" className="hover:text-slate-900 dark:hover:text-white transition-colors focus-ring rounded">FAQs &amp; Help</Link>
            </nav>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="font-mono text-xs font-bold text-slate-900 dark:text-white uppercase tracking-widest mb-4">// LEGAL</h4>
            <nav className="flex flex-col gap-2.5 text-xs md:text-sm text-slate-600 dark:text-slate-400">
              <Link href="/privacy" className="hover:text-slate-900 dark:hover:text-white transition-colors focus-ring rounded">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-slate-900 dark:hover:text-white transition-colors focus-ring rounded">Terms &amp; Conditions</Link>
            </nav>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-6 border-t border-slate-200 dark:border-slate-800 flex justify-center items-center text-xs text-slate-500 dark:text-slate-400">
          <p>&copy; {new Date().getFullYear()} Leap Skills Platform. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}


