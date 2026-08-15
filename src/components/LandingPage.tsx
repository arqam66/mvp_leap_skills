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
  const [activeCategory, setActiveCategory] = React.useState<string>('all');

  const scrollLeft = () => scrollRef.current?.scrollBy({ left: -340, behavior: 'smooth' });
  const scrollRight = () => scrollRef.current?.scrollBy({ left: 340, behavior: 'smooth' });

  const handleCreatorClick = (creator: Creator) => {
    setSelectedCreator(creator);
    router.push(`/profile/${creator.id}`);
  };

  const filteredCreators = activeCategory === 'all'
    ? CREATORS
    : CREATORS.filter((c) => c.category === activeCategory);

  return (
    <div className="pt-[72px] bg-[#fafafa] dark:bg-[#080c14] min-h-screen text-slate-900 dark:text-slate-100">
      {/* High-Contrast Editorial Hero Section */}
      <section className="border-b border-slate-200 dark:border-slate-800/80 bg-white dark:bg-[#0c101a] py-16 md:py-24 px-6 md:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <h1 className="font-headline text-3xl sm:text-5xl md:text-6xl font-extrabold text-slate-950 dark:text-white tracking-tight leading-[1.06]">
              Monetize your expertise. <br />
              Direct payouts, zero platform holds.
            </h1>

            <p className="font-sans text-base md:text-lg text-slate-600 dark:text-slate-300 max-w-xl leading-relaxed">
              Purpose-built storefront infrastructure for software architects, security researchers, and lead advisors to host 1:1 sessions, sell digital code repos, and process instant payouts.
            </p>

            <div className="flex flex-col sm:flex-row gap-3.5 items-stretch sm:items-center pt-2">
              <button
                type="button"
                onClick={() => router.push('/dashboard')}
                className="px-6 py-3.5 bg-[#3525cd] hover:bg-[#2b1cb5] dark:bg-indigo-600 dark:hover:bg-indigo-500 text-white font-bold text-sm rounded-md transition-all active:scale-[0.98] focus-ring cursor-pointer shadow-sm"
              >
                Launch Custom Storefront &rarr;
              </button>
              <button
                type="button"
                onClick={() => router.push('/explore')}
                className="px-6 py-3.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-100 font-semibold text-sm rounded-md transition-all active:scale-[0.98] focus-ring cursor-pointer"
              >
                Explore Verified Mentors
              </button>
            </div>
          </div>

          {/* Hero Storefront Specimen */}
          <div className="lg:col-span-5">
            <div className="bg-[#090d16] text-white p-6 rounded-xl border border-slate-800 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 px-3 py-1 bg-indigo-600 text-[10px] font-mono font-bold tracking-widest text-white rounded-bl">
                LIVE STOREFRONT SPECIMEN
              </div>

              <div className="flex items-center gap-3.5 pb-4 border-b border-slate-800">
                <div className="w-12 h-12 rounded-lg bg-slate-800 overflow-hidden shrink-0 border border-slate-700">
                  <img src={CREATORS[0].image} alt={CREATORS[0].name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
                <div>
                  <h3 className="font-headline text-base font-bold text-white flex items-center gap-1.5">
                    {CREATORS[0].name}
                    <span className="w-2 h-2 rounded-full bg-emerald-400" title="Available for advisory" />
                  </h3>
                  <p className="text-xs font-mono text-slate-400">{CREATORS[0].title} &bull; {CREATORS[0].org}</p>
                </div>
              </div>

              <div className="py-4 space-y-3">
                <div className="bg-slate-900/90 p-4 rounded-lg border border-slate-800 flex justify-between items-center hover:border-slate-700 transition-colors">
                  <div>
                    <div className="text-xs font-bold text-white flex items-center gap-2">
                      <span>1:1 Technical Strategy Session</span>
                      <span className="px-1.5 py-0.5 text-[9px] font-mono bg-indigo-950 text-indigo-300 border border-indigo-800 rounded">LIVE REPO REVIEW</span>
                    </div>
                    <div className="text-[11px] text-slate-400 mt-0.5">45 min WebRTC session + Google Calendar sync</div>
                  </div>
                  <div className="font-mono text-xs font-bold text-emerald-400 bg-emerald-950/60 px-2.5 py-1 rounded border border-emerald-800/60">
                    PKR 1,000
                  </div>
                </div>

                <div className="bg-slate-900/90 p-4 rounded-lg border border-slate-800 flex justify-between items-center hover:border-slate-700 transition-colors">
                  <div>
                    <div className="text-xs font-bold text-white flex items-center gap-2">
                      <span>Production AI Architecture Vault</span>
                      <span className="px-1.5 py-0.5 text-[9px] font-mono bg-amber-950 text-amber-300 border border-amber-800 rounded">INSTANT ZIP ACCESS</span>
                    </div>
                    <div className="text-[11px] text-slate-400 mt-0.5">Production Terraform scripts + LLM benchmark repo</div>
                  </div>
                  <div className="font-mono text-xs font-bold text-emerald-400 bg-emerald-950/60 px-2.5 py-1 rounded border border-emerald-800/60">
                    PKR 1,000
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => handleCreatorClick(CREATORS[0])}
                  className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-md transition-all active:scale-[0.99] focus-ring cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>Inspect Live Mentor Storefront</span>
                  <span className="font-mono">&rarr;</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Technical Mentors Section */}
      <section className="py-16 md:py-24 bg-[#fafafa] dark:bg-[#080c14] border-b border-slate-200 dark:border-slate-800/80">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
            <div>
              <div className="text-xs font-mono font-bold tracking-widest text-[#3525cd] dark:text-indigo-400 uppercase mb-1">DIRECT MENTOR DIRECTORY</div>
              <h2 className="font-headline text-2xl md:text-3xl font-bold text-slate-950 dark:text-white tracking-tight">
                Verified Technical Advisors & Architects
              </h2>
            </div>
            
            {/* Filter Pills & Scroll Controls */}
            <div className="flex flex-wrap items-center gap-2">
              {[
                { id: 'all', label: 'All Domains' },
                { id: 'tech', label: 'Engineering' },
                { id: 'design', label: 'Design & UX' },
                { id: 'business', label: 'GTM Strategy' }
              ].map((tab) => (
                <button
                  type="button"
                  key={tab.id}
                  onClick={() => setActiveCategory(tab.id)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors focus-ring cursor-pointer ${
                    activeCategory === tab.id
                      ? 'bg-slate-900 text-white dark:bg-indigo-600 dark:text-white'
                      : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-slate-300'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
              <div className="flex gap-1.5 ml-2 border-l border-slate-200 dark:border-slate-700 pl-3">
                <button
                  type="button"
                  onClick={scrollLeft}
                  aria-label="Previous creators"
                  className="p-2 border border-slate-200 dark:border-slate-700 rounded-md bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 focus-ring cursor-pointer"
                >
                  <span className="material-symbols-outlined text-sm font-bold">chevron_left</span>
                </button>
                <button
                  type="button"
                  onClick={scrollRight}
                  aria-label="Next creators"
                  className="p-2 border border-slate-200 dark:border-slate-700 rounded-md bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 focus-ring cursor-pointer"
                >
                  <span className="material-symbols-outlined text-sm font-bold">chevron_right</span>
                </button>
              </div>
            </div>
          </div>

          <div ref={scrollRef} className="flex gap-6 overflow-x-auto pb-4 hide-scrollbar snap-x scroll-smooth">
            {filteredCreators.map((creator) => (
              <div key={creator.id} className="min-w-[290px] md:min-w-[330px] snap-start">
                <div
                  onClick={() => handleCreatorClick(creator)}
                  className="bg-white dark:bg-[#0c101a] border border-slate-200 dark:border-slate-800 rounded-lg p-5 hover:border-indigo-500 dark:hover:border-indigo-500 transition-all cursor-pointer flex flex-col justify-between h-full group hover:shadow-md"
                >
                  <div>
                    <div className="aspect-[16/10] overflow-hidden rounded-md bg-slate-100 dark:bg-slate-800 mb-4 border border-slate-100 dark:border-slate-800">
                      <img
                        alt={creator.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        src={creator.image}
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="flex items-center justify-between gap-2 text-[11px] font-mono font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">
                      <span>{creator.category}</span>
                      {creator.verified && (
                        <span className="text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800/60 font-semibold text-[10px]">
                          VERIFIED ADVISOR
                        </span>
                      )}
                    </div>
                    <h3 className="font-headline text-base font-bold text-slate-950 dark:text-white mb-0.5 group-hover:text-[#3525cd] dark:group-hover:text-indigo-400 transition-colors">
                      {creator.name}
                    </h3>
                    <p className="text-xs font-mono text-slate-600 dark:text-slate-400 font-medium mb-3">
                      {creator.title} @ {creator.org}
                    </p>
                    <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed mb-4">
                      {creator.bio}
                    </p>
                  </div>
                  <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-slate-950 dark:text-white">
                      From PKR {creator.startingPrice.toLocaleString()}
                    </span>
                    <span className="text-xs font-bold text-[#3525cd] dark:text-indigo-400 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                      View Storefront &rarr;
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Asymmetric Technical Capability Breakdown (Replaces Feature Grid Cloning 3.1) */}
      <section ref={featuresRef} className="py-16 md:py-24 bg-white dark:bg-[#0c101a] border-b border-slate-200 dark:border-slate-800/80">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="max-w-2xl mb-12">
            <div className="text-xs font-mono font-bold tracking-widest text-[#3525cd] dark:text-indigo-400 uppercase mb-1">ENGINEERED WORKFLOW</div>
            <h2 className="font-headline text-2xl md:text-3xl font-bold text-slate-950 dark:text-white tracking-tight mb-3">
              Purpose-built infrastructure for serious independent advisors
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
              Replace disjointed calendar links, manual PDF attachments, and invoice delays with an integrated, zero-slop storefront system.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Feature 1: Asymmetric Advisory Breakdown */}
            <div className="lg:col-span-7 bg-[#fafafa] dark:bg-[#080c14] p-8 border border-slate-200 dark:border-slate-800 rounded-xl flex flex-col justify-between">
              <div className="space-y-4">
                <div className="inline-flex items-center px-3 py-1 bg-[#3525cd] text-white text-xs font-mono font-bold rounded">
                  01 // DIRECT 1:1 ADVISORY WORKFLOW
                </div>
                <h3 className="font-headline text-xl font-bold text-slate-950 dark:text-white">
                  Real-time Calendar Syncing & Auto WebRTC Video Rooms
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed max-w-xl">
                  Client bookings trigger immediate calendar sync across global timezones. WebRTC video conference links are auto-generated with no third-party meeting software download required.
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800/80 grid grid-cols-2 gap-4 font-mono text-xs text-slate-600 dark:text-slate-400">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span>Google Calendar API Sync</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span>Instant Timezone Normalization</span>
                </div>
              </div>
            </div>

            {/* Feature 2: Digital Asset & Cohort Vault */}
            <div className="lg:col-span-5 bg-[#090d16] text-white p-8 border border-slate-800 rounded-xl flex flex-col justify-between">
              <div className="space-y-4">
                <div className="inline-flex items-center px-3 py-1 bg-indigo-950 text-indigo-300 border border-indigo-800 text-xs font-mono font-bold rounded">
                  02 // DIGITAL ASSET VAULT
                </div>
                <h3 className="font-headline text-xl font-bold text-white">
                  Instant Deliverable Fulfillment & Cohort Masterclasses
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Sell code repositories, system architecture blueprints, and Notion operating systems with instant download links validated after payment.
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-800 font-mono text-xs text-slate-400 space-y-2">
                <div className="flex justify-between">
                  <span>File Integrity Check</span>
                  <span className="text-emerald-400">SHA-256 Validated</span>
                </div>
                <div className="flex justify-between">
                  <span>Download Expiration</span>
                  <span className="text-slate-300">Secure Tokenized Links</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Verified Reviews Section */}
      <section className="py-16 md:py-24 bg-[#fafafa] dark:bg-[#080c14] border-b border-slate-200 dark:border-slate-800/80">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="max-w-xl mb-12">
            <div className="text-xs font-mono font-bold tracking-widest text-[#3525cd] dark:text-indigo-400 uppercase mb-1">VERIFIED TESTIMONIALS</div>
            <h2 className="font-headline text-2xl md:text-3xl font-bold text-slate-950 dark:text-white tracking-tight mb-2">
              Verified Technical Advisor Feedback
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm">
              Real results from senior engineers, designers, and strategy advisors running their storefront on Leap Skills.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((testimonial) => (
              <div key={testimonial.id} className="bg-white dark:bg-[#0c101a] p-6 border border-slate-200 dark:border-slate-800 rounded-lg flex flex-col justify-between hover:border-slate-300 dark:hover:border-slate-700 transition-colors">
                <p className="text-slate-800 dark:text-slate-200 text-xs md:text-sm leading-relaxed mb-6">
                  {testimonial.quote}
                </p>
                <div className="flex items-center gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                  <img alt={testimonial.userName} className="w-10 h-10 rounded-md object-cover border border-slate-200 dark:border-slate-700" src={testimonial.userImage} referrerPolicy="no-referrer" />
                  <div>
                    <div className="text-xs font-bold text-slate-950 dark:text-white">{testimonial.userName}</div>
                    <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400">{testimonial.userRole}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}


