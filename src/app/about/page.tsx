'use client';

import { useRouter } from 'next/navigation';

export default function AboutPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 pt-[104px] pb-20 px-6">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Hero Section */}
        <div className="space-y-4">
          <div className="inline-block text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
            Our Journey & Mission
          </div>
          <h1 className="font-headline text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Empowering technical experts to guide the next generation.
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-sans max-w-3xl">
            Leap Skills is the premium storefront and scheduling infrastructure built for independent technical advisors, principal engineers, and creators worldwide. We remove the intermediaries, so you can focus entirely on delivering high-impact knowledge.
          </p>
        </div>

        {/* Core Values / Divided Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-slate-200 dark:border-slate-800">
          <div className="space-y-3">
            <h3 className="font-headline text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span className="material-symbols-outlined text-indigo-600 dark:text-indigo-400">offline_bolt</span>
              Direct Payout Infrastructure
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-sans">
              Unlike traditional coaching aggregators that hold onto your funds for weeks, Leap Skills integrates directly with Stripe Connect to clear your bookings and products instantly.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="font-headline text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span className="material-symbols-outlined text-indigo-600 dark:text-indigo-400">security</span>
              Sovereign Creator Ownership
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-sans">
              Your students and clients belong to you. We provide raw CSV exports of your audience details, platform data, and full analytics logs so you can build long-term relationships.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="font-headline text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span className="material-symbols-outlined text-indigo-600 dark:text-indigo-400">language</span>
              Global Accessibility
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-sans">
              Supports localized time-zones matching, instant Google Calendar synchronization, and dynamic video call generation, enabling mentors across 180+ countries to schedule calls seamlessly.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="font-headline text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span className="material-symbols-outlined text-indigo-600 dark:text-indigo-400">verified</span>
              Zero-friction UI
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-sans">
              Designed with premium modern typography, high-contrast dark modes, and beautiful layouts that ensure your portfolio is represented with professional elegance.
            </p>
          </div>
        </div>

        {/* Dynamic CTA Card */}
        <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-1.5 max-w-xl">
            <h4 className="font-headline text-lg font-bold text-slate-900 dark:text-white">
              Ready to start your mentorship portal?
            </h4>
            <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-sans">
              Set up your profile, list your services, and share your personal scheduling page in less than 5 minutes.
            </p>
          </div>
          <button
            onClick={() => router.push('/signup')}
            className="px-5 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-md transition-all shrink-0 cursor-pointer"
          >
            Create Your Account
          </button>
        </div>
      </div>
    </div>
  );
}
