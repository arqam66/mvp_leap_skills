'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useAppStore } from '../store/app';
import { Creator } from '../types';
import { CREATORS } from '../data/creators';

export default function ExplorePage() {
  const router = useRouter();
  const setSelectedCreator = useAppStore((s) => s.setSelectedCreator);
  const setDirectServiceIdToOpen = useAppStore((s) => s.setDirectServiceIdToOpen);
  const elenaVance = React.useMemo(() => CREATORS.find(c => c.id === 'elena-vance'), []);

  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState<string>('all');
  const [selectedPriceLimit, setSelectedPriceLimit] = React.useState<string>('all');
  const [onlyVerified, setOnlyVerified] = React.useState(false);
  const [aiMatchActive, setAiMatchActive] = React.useState(true);

  const filteredCreators = React.useMemo(() => {
    return CREATORS.filter((creator) => {
      const matchQuery =
        searchQuery === '' ||
        creator.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        creator.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        creator.bio.toLowerCase().includes(searchQuery.toLowerCase()) ||
        creator.org.toLowerCase().includes(searchQuery.toLowerCase());

      const matchCategory = selectedCategory === 'all' || creator.category === selectedCategory;

      let matchPrice = true;
      if (selectedPriceLimit === 'under-100') matchPrice = creator.startingPrice < 100;
      else if (selectedPriceLimit === '100-150') matchPrice = creator.startingPrice >= 100 && creator.startingPrice <= 150;
      else if (selectedPriceLimit === 'above-150') matchPrice = creator.startingPrice > 150;

      const matchVerified = !onlyVerified || creator.verified;

      return matchQuery && matchCategory && matchPrice && matchVerified;
    });
  }, [searchQuery, selectedCategory, selectedPriceLimit, onlyVerified]);

  const handleCreatorClick = (creator: Creator) => {
    setSelectedCreator(creator);
    router.push(`/profile/${creator.id}`);
  };

  const handleBookImmediately = (creator: Creator) => {
    setSelectedCreator(creator);
    if (creator.id === 'elena-vance') setDirectServiceIdToOpen('ev-1');
    router.push(`/profile/${creator.id}`);
  };

  const handlePromptClick = (text: string) => {
    setSearchQuery(text);
    setAiMatchActive(true);
  };

  return (
    <div className="pt-[110px] min-h-screen pb-24 max-w-7xl mx-auto px-4 md:px-10 text-slate-900 dark:text-slate-100">
      <div className="mb-8 select-none">
        <h1 className="font-headline text-3xl font-extrabold text-[#1a1c1c] dark:text-white tracking-tight mb-2">Discover Professional Mentors</h1>
        <p className="text-[#5f5e5e] dark:text-slate-300 text-sm md:text-base">Find matching industry consultants, schedule bookings directly, and download templates inside minutes.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-3 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-gray-100/90 dark:border-slate-800 shadow-sm space-y-8 sticky top-[100px]">
          <div>
            <h3 className="font-headline text-sm font-bold text-[#1a1c1c] dark:text-white mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px] font-bold text-primary-brand dark:text-indigo-400">tune</span>
              Search Filters
            </h3>
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Name, role, or keywords..."
                className="w-full text-sm py-2.5 pl-10 pr-4 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl focus:outline-none focus:border-primary-brand dark:focus:border-indigo-400 focus:bg-white dark:focus:bg-slate-900 text-gray-800 dark:text-slate-100 placeholder-gray-400 dark:placeholder-slate-500 transition-all font-medium"
              />
              <span className="material-symbols-outlined absolute left-3.5 top-3 text-[18px] text-gray-400 dark:text-slate-500 select-none">search</span>
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} className="absolute right-3 top-3 text-xs text-gray-400 dark:text-slate-400 hover:text-gray-600 dark:hover:text-slate-200 focus:outline-none">Clear</button>
              )}
            </div>
          </div>

          <div>
            <h4 className="font-headline text-xs font-bold text-[#1a1c1c] dark:text-slate-200 uppercase tracking-wider mb-3">Industry Category</h4>
            <div className="flex flex-col gap-2">
              {[
                { id: 'all', label: 'All Industries' },
                { id: 'tech', label: 'Technology / AI' },
                { id: 'design', label: 'Design & UX' },
                { id: 'business', label: 'Business Strategy' },
                { id: 'other', label: 'Content & Travel' },
              ].map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm font-semibold transition-all flex justify-between items-center cursor-pointer ${
                    selectedCategory === category.id
                      ? 'bg-primary-brand/10 dark:bg-indigo-500/20 text-primary-brand dark:text-indigo-400'
                      : 'text-gray-600 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-800 hover:text-[#1a1c1c] dark:hover:text-white'
                  }`}
                >
                  {category.label}
                  {selectedCategory === category.id && <span className="w-1.5 h-1.5 rounded-full bg-primary-brand dark:bg-indigo-400"></span>}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-headline text-xs font-bold text-[#1a1c1c] dark:text-slate-200 uppercase tracking-wider mb-3">Hourly Rate</h4>
            <div className="flex flex-col gap-2">
              {[
                { id: 'all', label: 'Any pricing' },
                { id: 'under-100', label: 'Under $100/hr' },
                { id: '100-150', label: '$100 - $150/hr' },
                { id: 'above-150', label: 'Above $150/hr' },
              ].map((price) => (
                <label key={price.id} className="flex items-center gap-2.5 text-sm font-semibold text-gray-600 dark:text-slate-300 hover:text-[#1a1c1c] dark:hover:text-white transition-all cursor-pointer py-1">
                  <input
                    type="radio"
                    name="priceFilter"
                    checked={selectedPriceLimit === price.id}
                    onChange={() => setSelectedPriceLimit(price.id)}
                    className="accent-primary-brand w-4 h-4 cursor-pointer"
                  />
                  {price.label}
                </label>
              ))}
            </div>
          </div>

          <div className="pt-2 border-t border-gray-100 dark:border-slate-800">
            <label className="flex items-center gap-2.5 text-sm font-semibold text-gray-600 dark:text-slate-300 hover:text-[#1a1c1c] dark:hover:text-white cursor-pointer">
              <input
                type="checkbox"
                checked={onlyVerified}
                onChange={() => setOnlyVerified(!onlyVerified)}
                className="w-4 h-4 accent-primary-brand rounded-lg cursor-pointer"
              />
              Verified Partners only
            </label>
          </div>
        </div>

        <div className="lg:col-span-9 space-y-8">
          {aiMatchActive && (
            <div className="bg-gradient-to-br from-indigo-50/70 to-white dark:from-slate-900 dark:to-slate-800/90 border border-indigo-100 dark:border-slate-700/80 rounded-3xl p-6.5 relative overflow-hidden shadow-sm">
              <div className="absolute right-0 top-0 w-[260px] h-[260px] bg-gradient-to-l from-indigo-200/10 to-transparent rounded-full blur-3xl pointer-events-none" />
              <div className="flex flex-wrap items-center justify-between gap-4 mb-4 select-none">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[20px] text-[#4f46e5] dark:text-indigo-400">psychology</span>
                  <span className="text-xs font-bold text-gray-400 dark:text-slate-400">INPUT DISCOVERY PROMPT:</span>
                  <span className="text-xs font-bold text-gray-700 dark:text-slate-200 bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 px-3 py-1 rounded-full">"Find me a mentor for AI Product Management"</span>
                </div>
                <div className="bg-gradient-to-r from-primary-brand to-[#4f46e5] text-white text-[10px] font-extrabold tracking-widest uppercase px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
                  <span className="material-symbols-outlined text-[12px] font-bold">magic_button</span>
                  AI Best Match
                </div>
              </div>
              <div className="flex flex-col md:flex-row gap-6 mt-6">
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl overflow-hidden shadow-sm bg-gray-50 dark:bg-slate-800 border border-indigo-100/50 dark:border-slate-700 shrink-0 mx-auto md:mx-0">
                  <img
                    alt="Dr. Elena Vance"
                    className="w-full h-full object-cover"
                    src={elenaVance?.image || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400'}
                    onError={(e) => { (e.target as HTMLImageElement).src = 'https://ui-avatars.com/api/?name=Elena+Vance&background=4f46e5&color=fff&size=100'; }}
                  />
                </div>
                <div className="flex-1 text-center md:text-left space-y-3">
                  <div>
                    <h3 className="font-headline text-lg font-bold text-[#1a1c1c] dark:text-white flex items-center justify-center md:justify-start gap-1.5 leading-tight">
                      Dr. Elena Vance
                      <span className="material-symbols-outlined text-sm font-bold text-primary-brand dark:text-indigo-400 shadow-sm">verified</span>
                    </h3>
                    <p className="text-xs font-bold text-primary-brand dark:text-indigo-400 uppercase tracking-wider mt-0.5">Principal AI Product Manager @ Nexus Labs</p>
                  </div>
                  <p className="text-gray-600 dark:text-slate-300 text-sm italic font-medium leading-relaxed bg-white/70 dark:bg-slate-800/70 border border-gray-200/40 dark:border-slate-700/60 p-4 rounded-xl">
                    "Matches your interest in LLMs and Product Strategy. Dr. Vance has successfully launched 4 generative AI products and specializes in transitioning senior PMs into specialized high-value AI roles."
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-3 pt-2">
                    <button
                      onClick={() => elenaVance && handleBookImmediately(elenaVance)}
                      className="px-6 py-2.5 bg-primary-container hover:bg-primary-brand text-white font-bold text-xs rounded-lg transition-all shadow-md active:scale-95 cursor-pointer"
                    >
                      Book Free Introduction
                    </button>
                    <button
                      onClick={() => elenaVance && handleCreatorClick(elenaVance)}
                      className="px-6 py-2.5 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 hover:border-gray-300 dark:hover:border-slate-600 text-gray-700 dark:text-slate-200 font-bold text-xs rounded-lg transition-all cursor-pointer"
                    >
                      View Full Profile
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="flex flex-wrap items-center gap-2.5 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-gray-100 dark:border-slate-800 text-xs">
            <span className="text-[#5f5e5e] dark:text-slate-400 font-bold select-none uppercase tracking-wider text-[10px]">Quick Prompts:</span>
            {["AI Product Manager", "UX Strategy Review", "Tech Lead Career Guide", "Data Science GPU Scaling"].map((p, i) => (
              <button
                key={i}
                type="button"
                onClick={() => handlePromptClick(p)}
                className="bg-gray-50 dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 border border-gray-200 dark:border-slate-700 text-gray-600 dark:text-slate-300 hover:text-primary-brand dark:hover:text-indigo-400 px-3 py-1.5 rounded-lg transition-all font-semibold cursor-pointer text-left"
              >
                {p}
              </button>
            ))}
          </div>

          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-headline text-lg font-bold text-[#1a1c1c] dark:text-white flex items-center gap-2">
                All Available Experts
                <span className="text-xs bg-gray-100 dark:bg-slate-800 text-gray-500 dark:text-slate-400 font-bold px-2.5 py-0.5 rounded-full">{filteredCreators.length}</span>
              </h2>
            </div>

            {filteredCreators.length === 0 ? (
              <div className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-2xl p-12 text-center select-none">
                <span className="material-symbols-outlined text-[48px] text-gray-300 dark:text-slate-600 mb-4">search_off</span>
                <h3 className="font-headline text-lg font-bold text-gray-800 dark:text-slate-200">No matching mentors found</h3>
                <p className="text-gray-400 dark:text-slate-400 text-sm max-w-sm mx-auto mt-2.5">Try clearing your filters or testing key terms like "Design", "AI", "Startup", or "Tech".</p>
                <button
                  onClick={() => { setSearchQuery(''); setSelectedCategory('all'); setSelectedPriceLimit('all'); setOnlyVerified(false); }}
                  className="mt-6 px-5 py-2.5 bg-indigo-50 dark:bg-indigo-950/60 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 text-primary-brand dark:text-indigo-400 text-xs font-bold rounded-xl transition-all cursor-pointer"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCreators.map((creator) => (
                  <div
                    key={creator.id}
                    onClick={() => handleCreatorClick(creator)}
                    className="bg-white dark:bg-slate-900 rounded-2xl border border-gray-100 dark:border-slate-800 hover:border-indigo-100/80 dark:hover:border-indigo-500/40 shadow-ambient hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group cursor-pointer flex flex-col justify-between"
                  >
                    <div>
                      <div className="aspect-[4/5] w-full overflow-hidden relative bg-gray-50 dark:bg-slate-800 rounded-t-2xl">
                        <img
                          alt={creator.name}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          src={creator.image}
                          onError={(e) => { (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(creator.name)}&background=4f46e5&color=fff&size=300`; }}
                        />
                        <div className="absolute bottom-3 left-3 bg-white/95 dark:bg-slate-900/95 backdrop-blur px-2.5 py-1 rounded-xl flex items-center gap-1 hover:scale-105 transition-all text-[11px] font-bold text-gray-800 dark:text-slate-200 shadow-sm border border-gray-50 dark:border-slate-800">
                          <span className="material-symbols-outlined text-[#E44A32] text-xs font-bold">star</span>
                          {creator.rating}
                          <span className="text-gray-400 dark:text-slate-500">({creator.reviewCount})</span>
                        </div>
                        {creator.verified && (
                          <div className="absolute top-3 right-3 bg-[#3525cd] dark:bg-indigo-600 text-white p-1 rounded-full flex items-center justify-center shadow-md">
                            <span className="material-symbols-outlined text-xs font-bold text-white leading-none">verified</span>
                          </div>
                        )}
                      </div>
                      <div className="p-5.5 space-y-2">
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="font-headline text-base font-bold text-[#1a1c1c] dark:text-white tracking-tight hover:text-primary-brand dark:hover:text-indigo-400 transition-colors">{creator.name}</h3>
                        </div>
                        <p className="text-xs font-semibold text-primary-brand dark:text-indigo-400 uppercase tracking-wider">{creator.title}</p>
                        <p className="text-gray-400 dark:text-slate-500 text-[11px] font-medium leading-none">{creator.org}</p>
                        <p className="text-gray-600 dark:text-slate-300 text-xs line-clamp-2 leading-relaxed pt-2">{creator.bio}</p>
                      </div>
                    </div>
                    <div className="px-5.5 pb-5.5 pt-3 border-t border-gray-50 dark:border-slate-800 flex items-center justify-between">
                      <div className="text-left select-none">
                        <span className="text-[10px] text-gray-400 dark:text-slate-500 font-bold uppercase tracking-wider block">Starts At</span>
                        <span className="text-base font-extrabold text-[#1a1c1c] dark:text-white">${creator.startingPrice}</span>
                        <span className="text-gray-400 dark:text-slate-500 text-xs font-semibold">/hr</span>
                      </div>
                      <span className="bg-primary-container/5 dark:bg-indigo-500/10 text-primary-container dark:text-indigo-400 font-extrabold text-xs px-4 py-2 rounded-xl group-hover:bg-primary-container dark:group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">View Profile</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
