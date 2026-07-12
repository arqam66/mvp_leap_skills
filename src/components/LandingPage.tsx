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

  const scrollLeft = () => scrollRef.current?.scrollBy({ left: -360, behavior: 'smooth' });
  const scrollRight = () => scrollRef.current?.scrollBy({ left: 360, behavior: 'smooth' });

  const handleCreatorClick = (creator: Creator) => {
    setSelectedCreator(creator);
    router.push(`/profile/${creator.id}`);
  };

  return (
    <div className="pt-[80px]">
      <section className="relative bg-gradient-to-b from-indigo-50/50 via-white to-transparent py-24 md:py-36 flex flex-col items-center text-center px-6 md:px-12 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-100/30 via-transparent to-transparent opacity-70 pointer-events-none" />
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-indigo-200/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="max-w-[1000px] relative z-10">
          <div className="inline-flex items-center gap-2.5 px-4.5 py-1.5 rounded-full bg-white border border-gray-100 shadow-sm mb-8 group cursor-pointer hover:border-indigo-200 transition-all">
            <span className="flex h-2 w-2 rounded-full bg-[#4f46e5] animate-pulse"></span>
            <span className="text-xs font-semibold text-gray-500">Trusted by 100k+ professional creators</span>
            <span className="material-symbols-outlined text-sm font-bold text-[#4d44e3] group-hover:translate-x-0.5 transition-transform">arrow_forward</span>
          </div>
          <h1 className="font-headline text-5xl md:text-7xl font-extrabold text-[#1a1c1c] mb-6 tracking-tight leading-[1.1]">
            Your All-in-One <br />
            <span className="bg-gradient-to-r from-primary-brand to-primary-container bg-clip-text text-transparent">Creator Storefront</span>
          </h1>
          <p className="font-sans text-lg md:text-xl text-[#464555] max-w-2xl mx-auto mb-10 leading-relaxed">
            The professional infrastructure for your digital empire. Sell products, host live sessions, and manage your entire creator business from one powerful link with Leap Skills.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              type="button"
              onClick={() => router.push('/dashboard')}
              className="w-full sm:w-auto px-10 py-4.5 bg-primary-container hover:bg-primary-brand text-white font-bold text-sm rounded-xl shadow-xl shadow-primary-container/20 hover:-translate-y-0.5 transition-all active:translate-y-0 cursor-pointer"
            >
              Start My Page &mdash; It&apos;s Free
            </button>
            <button
              type="button"
              onClick={() => featuresRef.current?.scrollIntoView({ behavior: 'smooth' })}
              className="w-full sm:w-auto px-10 py-4.5 bg-white border border-gray-200 hover:border-gray-300 text-gray-700 font-bold text-sm rounded-xl shadow-sm hover:bg-gray-50 transition-all cursor-pointer"
            >
              Learn More
            </button>
          </div>
          <div className="mt-12 flex items-center justify-center gap-8 text-[#5f5e5e]/80">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-success-vibrant text-base font-bold">verified</span>
              <span className="text-xs font-medium">No credit card required</span>
            </div>
            <div className="flex items-center gap-2 border-l border-gray-200 pl-8">
              <span className="material-symbols-outlined text-success-vibrant text-base font-bold">bolt</span>
              <span className="text-xs font-medium">Set up in 5 minutes</span>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white border-t border-b border-gray-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div className="max-w-xl">
              <h2 className="font-headline text-3xl md:text-4.53xl font-extrabold text-[#1a1c1c] tracking-tight leading-tight">
                The world&apos;s best creators <br />are building on Leap Skills
              </h2>
              <p className="text-[#5f5e5e] text-sm md:text-base mt-2.5">
                Join 50,000+ top experts who have transitioned from social influencers to sustainable business owners.
              </p>
            </div>
            <div className="flex gap-3">
              <button type="button" onClick={scrollLeft} className="w-11 h-11 rounded-xl border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 active:scale-95 transition-all cursor-pointer">
                <span className="material-symbols-outlined font-semibold">chevron_left</span>
              </button>
              <button type="button" onClick={scrollRight} className="w-11 h-11 rounded-xl border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 active:scale-95 transition-all cursor-pointer">
                <span className="material-symbols-outlined font-semibold">chevron_right</span>
              </button>
            </div>
          </div>
          <div ref={scrollRef} className="flex gap-6 overflow-x-auto pb-10 hide-scrollbar snap-x scroll-smooth">
            {CREATORS.slice(0, 5).map((creator) => (
              <div key={creator.id} className="min-w-[280px] md:min-w-[325px] snap-start group">
                <div
                  onClick={() => handleCreatorClick(creator)}
                  className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 cursor-pointer"
                >
                  <div className="aspect-[4/5] overflow-hidden relative bg-gray-50">
                    <img
                      alt={creator.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      src={creator.image}
                    />
                    {creator.verified && (
                      <div className="absolute top-3 right-3 bg-white/95 backdrop-blur px-2.5 py-1 rounded-lg text-[10px] font-bold text-primary-brand flex items-center gap-1 shadow-sm border border-indigo-100">
                        <span className="material-symbols-outlined text-xs font-bold text-primary-brand">verified</span>
                        Verified Partner
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="font-headline text-lg font-bold text-[#1a1c1c] tracking-tight mb-1">{creator.name}</h3>
                    <p className="text-primary-container font-semibold text-xs uppercase tracking-wider mb-0.5">{creator.title}</p>
                    <p className="text-gray-400 text-xs mb-5">{creator.org}</p>
                    <button
                      type="button"
                      onClick={(e) => { e.stopPropagation(); handleCreatorClick(creator); }}
                      className="w-full py-2.5 border border-indigo-100 hover:border-primary-brand hover:bg-primary-brand hover:text-white text-primary-brand text-xs font-bold rounded-lg transition-all"
                    >
                      View Full Profile
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section ref={featuresRef} className="py-24 bg-[#F9FAFB]">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <h2 className="font-headline text-3xl md:text-4.53xl font-extrabold text-[#1a1c1c] mb-4 tracking-tight">Monetize your expertise without the complexity</h2>
            <p className="text-[#5f5e5e] text-sm md:text-base leading-relaxed">Stop juggling multiple booking, calendar, and billing tools. We have integrated everything you need into a single high-trust storefront.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:grid-rows-2">
            <div className="md:col-span-8 bg-white p-8 md:p-10 rounded-2xl border border-gray-100/80 shadow-sm flex flex-col justify-between group hover:border-indigo-100 hover:shadow-md transition-all">
              <div>
                <div className="w-12 h-12 bg-indigo-50 text-primary-brand rounded-xl flex items-center justify-center mb-6 group-hover:scale-105 transition-transform shadow-sm">
                  <span className="material-symbols-outlined text-2xl font-bold">video_chat</span>
                </div>
                <h3 className="font-headline text-xl font-bold text-[#1a1c1c] mb-3">1:1 Mentorship Sessions</h3>
                <p className="text-[#464555] text-sm max-w-lg leading-relaxed">Connect directly with your audience for high-value consultations. Fully automated scheduling, global timezone synchronization, calendar integration, and direct secure payments.</p>
              </div>
              <div onClick={() => router.push('/explore')} className="mt-8 flex items-center gap-2 text-primary-brand font-bold text-xs cursor-pointer group-hover:gap-3 transition-all">
                Explore Experts
                <span className="material-symbols-outlined text-sm font-bold">arrow_right_alt</span>
              </div>
            </div>
            <div className="md:col-span-4 bg-[#3525cd] text-white p-8 md:p-10 rounded-2xl shadow-sm flex flex-col justify-center text-center relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl group-hover:bg-white/10 transition-colors pointer-events-none" />
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                <span className="material-symbols-outlined text-2xl font-bold text-white">payments</span>
              </div>
              <h3 className="font-headline text-lg font-bold mb-2">Direct Payouts</h3>
              <p className="text-indigo-100 text-xs md:text-sm leading-relaxed max-w-xs mx-auto">Get paid instantly to your bank account with Stripe Connect. No holding periods, no setup bills, absolute security.</p>
            </div>
            <div className="md:col-span-4 bg-white p-8 md:p-10 rounded-2xl border border-gray-100/80 shadow-sm flex flex-col justify-between group hover:border-rose-100 hover:shadow-md transition-all">
              <div>
                <div className="w-12 h-12 bg-rose-50 text-[#E44A32] rounded-xl flex items-center justify-center mb-6 group-hover:rotate-6 transition-transform shadow-sm">
                  <span className="material-symbols-outlined text-2xl font-bold">shopping_bag</span>
                </div>
                <h3 className="font-headline text-lg font-bold text-[#1a1c1c] mb-2">Digital Products</h3>
                <p className="text-[#464555] text-xs md:text-sm leading-relaxed">Sell textbooks, Notion hubs, design kits, PDF checklists, or recorded masterclasses. Fully automated and secure delivery globally immediately upon payout.</p>
              </div>
            </div>
            <div className="md:col-span-8 bg-white p-8 md:p-10 rounded-2xl border border-gray-100/80 shadow-sm flex flex-col md:flex-row items-center gap-8 group hover:border-emerald-100 hover:shadow-md transition-all">
              <div className="flex-1">
                <div className="w-12 h-12 bg-emerald-50 text-success-vibrant rounded-xl flex items-center justify-center mb-6 shadow-sm">
                  <span className="material-symbols-outlined text-2xl font-bold">podcasts</span>
                </div>
                <h3 className="font-headline text-lg font-bold text-[#1a1c1c] mb-2">Live Workshops</h3>
                <p className="text-[#464555] text-xs md:text-sm leading-relaxed">Host interactive webinars, multi-session cohort classes, or group sessions. We handle registrations, reminder updates, streaming links generation, and billing.</p>
              </div>
              <div className="flex-1 bg-gray-50 border border-gray-100/50 p-5 rounded-xl w-full">
                <div className="space-y-3">
                  <div className="h-3 bg-white border border-gray-100 rounded-full w-full"></div>
                  <div className="h-3 bg-white border border-gray-100 rounded-full w-3/4"></div>
                  <div className="h-3 bg-white border border-gray-100 rounded-full w-4/6"></div>
                </div>
                <div className="mt-4 flex justify-between items-center bg-white border border-gray-100 p-2.5 rounded-lg">
                  <span className="text-[10px] font-bold text-[#1a1c1c]">Cohort Live Session #2</span>
                  <span className="text-[9px] text-[#008060] bg-[#008060]/10 px-2 py-0.5 rounded-full font-bold">96 booked</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="text-center mb-16">
            <span className="text-primary-brand text-xs font-extrabold uppercase tracking-widest bg-indigo-50 border border-indigo-100/50 px-3 py-1 rounded-full">Success Stories</span>
            <h2 className="font-headline text-3xl md:text-4.53xl font-extrabold text-[#1a1c1c] mt-4 tracking-tight">Creators who found their home</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((testimonial) => (
              <div key={testimonial.id} className="flex flex-col h-full bg-[#fcfcfc] p-8 rounded-2xl border border-gray-100">
                <div className="flex-1">
                  <div className="flex text-[#E44A32] mb-5">
                    {[...Array(testimonial.stars)].map((_, i) => (
                      <span key={i} className="material-symbols-outlined text-sm font-bold tracking-tight">star</span>
                    ))}
                  </div>
                  <p className="font-sans text-sm md:text-base text-[#1a1c1c] italic leading-relaxed mb-6">{testimonial.quote}</p>
                </div>
                <div className="flex items-center gap-3.5 pt-6 border-t border-gray-100">
                  <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-white shadow-sm shrink-0 bg-gray-50">
                    <img alt={testimonial.userName} className="w-full h-full object-cover" src={testimonial.userImage} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[#1a1c1c]">{testimonial.userName}</p>
                    <p className="text-xs text-[#5f5e5e]">{testimonial.userRole}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-primary-brand rounded-2xl p-10 md:p-20 text-center text-white relative overflow-hidden shadow-xl shadow-indigo-100">
            <div className="absolute -top-32 -right-32 w-80 h-80 bg-white/5 rounded-full blur-[90px] pointer-events-none" />
            <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-white/5 rounded-full blur-[90px] pointer-events-none" />
            <div className="relative z-10 max-w-xl mx-auto">
              <h2 className="font-headline text-3xl md:text-4.53xl font-bold mb-4 tracking-tight leading-tight">The future of creator economy is professional. Are you?</h2>
              <p className="text-indigo-100 text-sm md:text-base mb-8">Start your premium storefront today. Fully free to set up, only pay a small commission on successful bookings.</p>
              <button
                type="button"
                onClick={() => router.push('/dashboard')}
                className="bg-white text-primary-brand font-bold px-10 py-4 rounded-xl hover:shadow-2xl hover:scale-105 active:scale-98 transition-all cursor-pointer"
              >
                Launch Your Storefront Now
              </button>
              <p className="mt-5 text-[11px] text-indigo-200">No setup fee. Direct setup inside 5 minutes.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
