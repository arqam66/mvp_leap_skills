'use client';

import { useRouter, usePathname } from 'next/navigation';

export default function Footer() {
  const router = useRouter();
  const pathname = usePathname();

  if (pathname === '/dashboard') return null;

  return (
    <footer className="w-full py-16 bg-[#ffffff] border-t border-gray-100 mt-20">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-12 mb-16">
          <div className="md:col-span-2">
            <button onClick={() => router.push('/')} className="flex items-center gap-3 mb-6 focus:outline-none text-left cursor-pointer">
              <img
                alt="Leap Skills Logo"
                className="h-8 w-auto object-contain"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBGmOWQ2KyxXrzAzOweN_nQl71EHn0Zf3GVoOLOv9KAJWg7jz0OenkRpIv2QYfvqvLxsNLKy7a7IxY-1yUctTCjc4uaeaYrQjocRKXqMw7fqv8y1P_UZ06ALbHb2AF24vFIhkoTYLsU0_-sXBOeBydDqKz5joldm0L9t_X9zOWePMHuRsF7UsjBtIvF6NQIWhEvk0cgzbOSLPrqoE31znhALbmQZ1VLziVjFq9LSbHI_bHVPtfV5eIe1iA_wkr-DrVsFae7qHlvcL-4"
              />
              <span className="font-headline text-lg font-extrabold tracking-tight text-primary-brand">Leap Skills</span>
            </button>
            <p className="text-[#5f5e5e] text-sm max-w-xs mb-8 leading-relaxed">
              The professional infrastructure for high-value creators and experts worldwide. Sell products, host sessions, and scale secure direct bookings.
            </p>
            <div className="flex gap-4">
              <span className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 hover:text-primary-brand hover:bg-primary-brand/5 border border-gray-100 transition-all cursor-pointer">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" /></svg>
              </span>
              <span className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 hover:text-primary-brand hover:bg-primary-brand/5 border border-gray-100 transition-all cursor-pointer">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
              </span>
            </div>
          </div>

          <div>
            <h4 className="font-headline text-sm font-semibold text-[#1a1c1c] mb-6">Product</h4>
            <nav className="flex flex-col gap-4">
              <button onClick={() => router.push('/explore')} className="text-sm text-[#5f5e5e] hover:text-[#3525cd] transition-colors text-left focus:outline-none">Storefront</button>
              <button onClick={() => router.push('/explore')} className="text-sm text-[#5f5e5e] hover:text-[#3525cd] transition-colors text-left focus:outline-none">Sessions</button>
              <button onClick={() => router.push('/explore')} className="text-sm text-[#5f5e5e] hover:text-[#3525cd] transition-colors text-left focus:outline-none">Digital Goods</button>
              <button onClick={() => router.push('/explore')} className="text-sm text-[#5f5e5e] hover:text-[#3525cd] transition-colors text-left focus:outline-none">Pricing</button>
            </nav>
          </div>

          <div>
            <h4 className="font-headline text-sm font-semibold text-[#1a1c1c] mb-6">Company</h4>
            <nav className="flex flex-col gap-4 text-sm text-[#5f5e5e]">
              <span className="hover:text-primary-brand transition-colors cursor-pointer">About Us</span>
              <span className="hover:text-primary-brand transition-colors cursor-pointer">Careers</span>
              <span className="hover:text-primary-brand transition-colors cursor-pointer">Press</span>
              <span className="hover:text-primary-brand transition-colors cursor-pointer">Contact</span>
            </nav>
          </div>

          <div>
            <h4 className="font-headline text-sm font-semibold text-[#1a1c1c] mb-6">Resources</h4>
            <nav className="flex flex-col gap-4 text-sm text-[#5f5e5e]">
              <span className="hover:text-primary-brand transition-colors cursor-pointer">Creator Guide</span>
              <span className="hover:text-primary-brand transition-colors cursor-pointer">Help Center</span>
              <span className="hover:text-primary-brand transition-colors cursor-pointer">Community</span>
            </nav>
          </div>

          <div>
            <h4 className="font-headline text-sm font-semibold text-[#1a1c1c] mb-6">Legal</h4>
            <nav className="flex flex-col gap-4 text-sm text-[#5f5e5e]">
              <span className="hover:text-primary-brand transition-colors cursor-pointer">Privacy</span>
              <span className="hover:text-primary-brand transition-colors cursor-pointer">Terms</span>
              <span className="hover:text-primary-brand transition-colors cursor-pointer">Cookie Policy</span>
            </nav>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[#5f5e5e] text-xs">&copy; 2026 Leap Skills Platform. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2 text-[#5f5e5e] text-xs">
              <span className="w-2.5 h-2.5 rounded-full bg-success-vibrant animate-pulse"></span>
              Systems Operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
