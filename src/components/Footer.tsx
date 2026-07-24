'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Footer() {
  const pathname = usePathname();

  if (pathname === '/dashboard' || pathname === '/signup') return null;

  return (
    <footer className="w-full py-12 bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-200">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
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
            <p className="text-slate-600 dark:text-slate-400 text-xs md:text-sm max-w-xs mb-4 leading-relaxed">
              Professional storefront platform for independent technical experts, advisors, and mentors worldwide.
            </p>
            <div className="mb-6">
              <a
                href="mailto:info@leapskills.sbs"
                className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1.5"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                info@leapskills.sbs
              </a>
            </div>
            <div className="flex gap-3">
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
            </div>
          </div>

          {/* Platform Links */}
          <div>
            <h4 className="font-headline text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-4">Platform</h4>
            <nav className="flex flex-col gap-2.5 text-xs md:text-sm text-slate-600 dark:text-slate-400">
              <Link href="/explore" className="hover:text-slate-900 dark:hover:text-white transition-colors focus-ring rounded">Explore Mentors</Link>
              <Link href="/signup" className="hover:text-slate-900 dark:hover:text-white transition-colors focus-ring rounded">Sign Up Page</Link>
            </nav>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="font-headline text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-4">Legal</h4>
            <nav className="flex flex-col gap-2.5 text-xs md:text-sm text-slate-600 dark:text-slate-400">
              <Link href="/privacy" className="hover:text-slate-900 dark:hover:text-white transition-colors focus-ring rounded">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-slate-900 dark:hover:text-white transition-colors focus-ring rounded">Terms &amp; Conditions</Link>
            </nav>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-6 border-t border-slate-200 dark:border-slate-800 flex justify-between items-center text-xs text-slate-500 dark:text-slate-400">
          <p>&copy; {new Date().getFullYear()} Leap Skills Platform. All Rights Reserved.</p>
          <p>Built for clarity and performance.</p>
        </div>
      </div>
    </footer>
  );
}


