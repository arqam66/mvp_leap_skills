'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useAppStore } from '../store/app';
import { Creator } from '../types';
import { CREATORS, TESTIMONIALS } from '../data/creators';

export default function LandingPage() {
  const router = useRouter();
  const setSelectedCreator = useAppStore((s) => s.setSelectedCreator);
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const featuresRef = React.useRef<HTMLElement>(null);

  const scrollLeft = () => scrollRef.current?.scrollBy({ left: -340, behavior: 'smooth' });
  const scrollRight = () => scrollRef.current?.scrollBy({ left: 340, behavior: 'smooth' });

  const handleCreatorClick = (creator: Creator) => {
    setSelectedCreator(creator);
    router.push(`/profile/${creator.id}`);
  };

  return (
    <div className="pt-[72px] bg-slate-50 dark:bg-slate-950 min-h-screen text-slate-900 dark:text-slate-100">
      {/* Editorial Hero Section */}
      <section className="border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-16 md:py-28 px-6 md:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-semibold rounded mb-6 border border-slate-200 dark:border-slate-700">
              <span>Platform Update</span>
              <span className="text-slate-400 dark:text-slate-500">&bull;</span>
              <span className="font-normal text-slate-600 dark:text-slate-300">Zero platform commissions on first $1,000</span>
            </div>
            
            <h1 className="font-headline text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.08] mb-6">
              Monetize your expertise. <br />
              Own your audience.
            </h1>

            <p className="font-sans text-base md:text-lg text-slate-600 dark:text-slate-300 max-w-xl leading-relaxed mb-8">
              Sell 1:1 mentorship sessions, interactive live workshops, and digital products directly from your unified custom storefront. Direct Stripe payouts with no intermediary holding periods.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center mb-10">
              <button
                type="button"
                onClick={() => router.push('/dashboard')}
                className="px-6 py-3.5 bg-slate-900 dark:bg-indigo-600 hover:bg-slate-800 dark:hover:bg-indigo-500 text-white font-semibold text-sm rounded-md transition-colors focus-ring cursor-pointer"
              >
                Launch Your Storefront
              </button>
              <button
                type="button"
                onClick={() => router.push('/explore')}
                className="px-6 py-3.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-100 font-semibold text-sm rounded-md transition-colors focus-ring cursor-pointer"
              >
                Browse Top Mentors
              </button>
            </div>

            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-slate-200 dark:border-slate-700 max-w-lg">
              <div>
                <div className="font-headline text-2xl font-bold text-slate-900 dark:text-white">$1.4M+</div>
                <div className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-0.5">Earnings Paid Out</div>
              </div>
              <div>
                <div className="font-headline text-2xl font-bold text-slate-900 dark:text-white">99.4%</div>
                <div className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-0.5">Client Satisfaction</div>
              </div>
              <div>
                <div className="font-headline text-2xl font-bold text-slate-900 dark:text-white">&lt; 5m</div>
                <div className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-0.5">Average Setup Time</div>
              </div>
            </div>
          </div>

          {/* Hero Storefront Preview */}
          <div className="lg:col-span-5">
            <div className="bg-slate-900 text-white p-6 rounded-lg border border-slate-800 shadow-lg">
              <div className="flex items-center gap-3 pb-4 border-b border-slate-800">
                <div className="w-12 h-12 rounded-full bg-slate-700 overflow-hidden shrink-0">
                  <img src={CREATORS[0].image} alt={CREATORS[0].name} className="w-full h-full object-cover" referrerPolicy="no-referrer" onError={(e) => { (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(CREATORS[0].name)}&background=4f46e5&color=fff&size=48`; }} />
                </div>
                <div>
                  <h3 className="font-headline text-base font-bold text-white">{CREATORS[0].name}</h3>
                  <p className="text-xs text-slate-400">{CREATORS[0].title} &bull; {CREATORS[0].org}</p>
                </div>
              </div>

              <div className="py-4 space-y-3">
                <div className="bg-slate-800/80 p-3.5 rounded border border-slate-700/60 flex justify-between items-center">
                  <div>
                    <div className="text-xs font-bold text-white">1:1 Strategy Consultation</div>
                    <div className="text-[11px] text-slate-400">45 min video session</div>
                  </div>
                  <div className="text-xs font-semibold text-emerald-400">$150</div>
                </div>

                <div className="bg-slate-800/80 p-3.5 rounded border border-slate-700/60 flex justify-between items-center">
                  <div>
                    <div className="text-xs font-bold text-white">AI Architecture Toolkit</div>
                    <div className="text-[11px] text-slate-400">PDF + Code Repo access</div>
                  </div>
                  <div className="text-xs font-semibold text-emerald-400">$49</div>
                </div>
              </div>

              <div className="pt-2 text-center">
                <button
                  type="button"
                  onClick={() => handleCreatorClick(CREATORS[0])}
                  className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs rounded transition-colors focus-ring cursor-pointer"
                >
                  View Sample Live Profile &rarr;
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Mentors */}
      <section className="py-16 md:py-24 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4">
            <div>
              <h2 className="font-headline text-2xl md:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
                Top Technical & Strategy Mentors
              </h2>
              <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
                Verified experts hosting direct consultations and selling specialized knowledge assets.
              </p>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={scrollLeft}
                aria-label="Previous creators"
                className="p-2 border border-slate-300 dark:border-slate-600 rounded hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 focus-ring cursor-pointer"
              >
                <span className="material-symbols-outlined text-sm font-bold">chevron_left</span>
              </button>
              <button
                type="button"
                onClick={scrollRight}
                aria-label="Next creators"
                className="p-2 border border-slate-300 dark:border-slate-600 rounded hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 focus-ring cursor-pointer"
              >
                <span className="material-symbols-outlined text-sm font-bold">chevron_right</span>
              </button>
            </div>
          </div>

          <div ref={scrollRef} className="flex gap-6 overflow-x-auto pb-4 hide-scrollbar snap-x scroll-smooth">
            {CREATORS.slice(0, 5).map((creator) => (
              <div key={creator.id} className="min-w-[280px] md:min-w-[320px] snap-start">
                <div
                  onClick={() => handleCreatorClick(creator)}
                  className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md p-5 hover:border-slate-400 dark:hover:border-slate-500 transition-colors cursor-pointer flex flex-col justify-between h-full"
                >
                  <div>
                    <div className="aspect-[4/3] overflow-hidden rounded bg-slate-100 dark:bg-slate-700 mb-4">
                      <img
                        alt={creator.name}
                        className="w-full h-full object-cover"
                        src={creator.image}
                        referrerPolicy="no-referrer"
                        onError={(e) => { (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(creator.name)}&background=4f46e5&color=fff&size=320`; }}
                      />
                    </div>
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
                      {creator.category}
                      {creator.verified && <span className="text-indigo-600 font-bold">&bull; Verified</span>}
                    </div>
                    <h3 className="font-headline text-base font-bold text-slate-900 dark:text-white mb-0.5">{creator.name}</h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400 font-medium mb-3">{creator.title} at {creator.org}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-500 line-clamp-2 leading-relaxed mb-4">{creator.bio}</p>
                  </div>
                  <div className="pt-3 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-900 dark:text-white">From ${creator.startingPrice}</span>
                    <span className="text-xs font-bold text-indigo-600 group-hover:underline">View Services &rarr;</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Capabilities */}
      <section ref={featuresRef} className="py-16 md:py-24 bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="max-w-xl mb-12">
            <h2 className="font-headline text-2xl md:text-3xl font-bold text-slate-900 dark:text-white tracking-tight mb-3">
              Built for serious independent experts
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
              Replace disjointed calendar links, manual invoice follow-ups, and email attachments with a clean, unified workflow.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-slate-800 p-6 border border-slate-200 dark:border-slate-700 rounded-md">
              <div className="w-10 h-10 bg-slate-900 dark:bg-indigo-600 text-white rounded flex items-center justify-center font-bold text-sm mb-4">
                01
              </div>
              <h3 className="font-headline text-lg font-bold text-slate-900 dark:text-white mb-2">1:1 Mentorship & Advice</h3>
              <p className="text-slate-600 dark:text-slate-400 text-xs md:text-sm leading-relaxed">
                Automated calendar booking across global timezones with built-in WebRTC video rooms or Zoom integration.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-800 p-6 border border-slate-200 dark:border-slate-700 rounded-md">
              <div className="w-10 h-10 bg-slate-900 dark:bg-indigo-600 text-white rounded flex items-center justify-center font-bold text-sm mb-4">
                02
              </div>
              <h3 className="font-headline text-lg font-bold text-slate-900 dark:text-white mb-2">Digital Deliverable Vault</h3>
              <p className="text-slate-600 dark:text-slate-400 text-xs md:text-sm leading-relaxed">
                Secure instant download fulfillment for e-books, code templates, Notion systems, and video recordings.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-800 p-6 border border-slate-200 dark:border-slate-700 rounded-md">
              <div className="w-10 h-10 bg-slate-900 dark:bg-indigo-600 text-white rounded flex items-center justify-center font-bold text-sm mb-4">
                03
              </div>
              <h3 className="font-headline text-lg font-bold text-slate-900 dark:text-white mb-2">Cohort & Live Workshops</h3>
              <p className="text-slate-600 dark:text-slate-400 text-xs md:text-sm leading-relaxed">
                Host group masterclasses with participant capacity limits, automated calendar invites, and instant payout processing.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Verified Reviews */}
      <section className="py-16 md:py-24 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="max-w-xl mb-12">
            <h2 className="font-headline text-2xl md:text-3xl font-bold text-slate-900 dark:text-white tracking-tight mb-2">
              Verified Creator Feedback
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm">
              How technical leaders and advisors use Leap Skills to manage client engagements.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((testimonial) => (
              <div key={testimonial.id} className="bg-slate-50 dark:bg-slate-800 p-6 border border-slate-200 dark:border-slate-700 rounded-md flex flex-col justify-between">
                <p className="text-slate-800 dark:text-slate-200 text-xs md:text-sm leading-relaxed italic mb-6">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
                <div className="flex items-center gap-3 pt-4 border-t border-slate-200 dark:border-slate-700">
                  <img alt={testimonial.userName} className="w-10 h-10 rounded-full object-cover" src={testimonial.userImage} referrerPolicy="no-referrer" onError={(e) => { (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(testimonial.userName)}&background=4f46e5&color=fff&size=40`; }} />
                  <div>
                    <div className="text-xs font-bold text-slate-900 dark:text-white">{testimonial.userName}</div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400">{testimonial.userRole}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 md:py-24 bg-slate-900 text-white">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="font-headline text-3xl md:text-4xl font-extrabold tracking-tight mb-4">
            Ready to establish your professional storefront?
          </h2>
          <p className="text-slate-400 text-sm md:text-base max-w-lg mx-auto mb-8 leading-relaxed">
            Join hundreds of software architects, design leads, and business advisors selling their knowledge directly.
          </p>
          <button
            type="button"
            onClick={() => router.push('/dashboard')}
            className="px-8 py-3.5 bg-white text-slate-900 font-semibold text-sm rounded hover:bg-slate-100 transition-colors focus-ring cursor-pointer"
          >
            Create Your Page Now
          </button>
        </div>
      </section>
    </div>
  );
}

