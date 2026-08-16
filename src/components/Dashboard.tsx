'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import { useAppStore } from '../store/app';
import { Service, Booking, ServiceFormat, PaidDMThread, Creator } from '../types';
import { getFutureDate } from '../utils/dates';
import { formatPKR } from '../utils/currency';
import { useShallow } from 'zustand/shallow';
import { useTrainerDashboard } from '../hooks/useTrainerDashboard';


const EMPTY_SERVICES: Service[] = [];

export default function Dashboard() {
  const router = useRouter();
  const { user: clerkUser, isLoaded } = useUser();
  const selectedCreator = useAppStore((s) => s.selectedCreator);
  const setSelectedCreator = useAppStore((s) => s.setSelectedCreator);
  const creatorServices = useAppStore((s) => s.servicesMap[s.selectedCreator.id] ?? EMPTY_SERVICES);
  const bookings = useAppStore(useShallow((s) => s.bookings.filter((b) => b.creatorId === s.selectedCreator.id)));
  const addService = useAppStore((s) => s.addService);
  const addBooking = useAppStore((s) => s.addBooking);
  const cancelBooking = useAppStore((s) => s.cancelBooking);
  const userRole = useAppStore((s) => s.userRole);
  const setUserRole = useAppStore((s) => s.setUserRole);

  const userEmail = clerkUser?.primaryEmailAddress?.emailAddress || clerkUser?.emailAddresses?.[0]?.emailAddress;

  // Real data from Supabase (overlays mock data when available)
  const { earnings: realEarnings, paidDMs: realPaidDMs, services: realServices, bookings: realBookings, loading: supabaseLoading } = useTrainerDashboard();

  const [activeTab, setActiveTab] = useState<'home' | 'services' | 'paid_dm' | 'earnings' | 'growth'>('home');

  const [showAddServiceModal, setShowAddServiceModal] = useState(false);

  // New Service Form State
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newPrice, setNewPrice] = useState(75);
  const [newFormat, setNewFormat] = useState<ServiceFormat>('one_on_one');
  const [newDuration, setNewDuration] = useState('45 mins');
  const [newCapacity, setNewCapacity] = useState(50);

  // Paid DM Threads State
  const [paidDMs, setPaidDMs] = useState<PaidDMThread[]>([
    {
      id: 'dm-1',
      trainerId: selectedCreator.id,
      clientId: 'c-101',
      clientName: 'Marcus Vance',
      clientEmail: 'marcus@dev.io',
      question: 'How should I structure my AWS ECS Fargate tasks to handle 10,000 peak req/sec without cold-start spikes?',
      status: 'awaiting_response',
      openedAt: getFutureDate(-1),
    },
    {
      id: 'dm-2',
      trainerId: selectedCreator.id,
      clientId: 'c-102',
      clientName: 'Elena Rostova',
      clientEmail: 'elena@startup.co',
      question: 'Can you review our Stripe Connect onboarding flow strategy for multi-vendor marketplaces?',
      response: 'Use Stripe Express accounts with direct charges to minimize liability and enable 0-delay payouts.',
      status: 'responded',
      openedAt: getFutureDate(-3),
      respondedAt: getFutureDate(-2),
    },
  ]);

  const [replyText, setReplyText] = useState<{ [dmId: string]: string }>({});
  // Use real earnings from Supabase if loaded, otherwise show mock data
  const [withdrawableAmount, setWithdrawableAmount] = useState(realEarnings.pending > 0 ? realEarnings.pending : 1450);
  const [lastWithdrawnAmount, setLastWithdrawnAmount] = useState(0);
  const [withdrawSuccessModal, setWithdrawSuccessModal] = useState(false);

  // Auto-DM State
  const [dmKeyword, setDmKeyword] = useState('MENTOR');
  const [dmTemplate, setDmTemplate] = useState(`Hey! Thanks for messaging. You can book my 1:1 session or paid DM directly here: https://creatorhub.pro/${selectedCreator.id}`);

  // Mentor Questionnaire State in Dashboard
  const [showMentorQuestionnaire, setShowMentorQuestionnaire] = useState(userRole !== 'instructor');
  const [mentorCategory, setMentorCategory] = useState<'tech' | 'design' | 'business' | 'other'>('tech');
  const [mentorTitle, setMentorTitle] = useState('');
  const [mentorOrg, setMentorOrg] = useState('');
  const [mentorYears, setMentorYears] = useState('5+ years');
  const [mentorBio, setMentorBio] = useState('');
  const [mentorPrice, setMentorPrice] = useState(75);

  const handleMentorQuestionnaireSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setUserRole('instructor');
    setSelectedCreator({
      ...selectedCreator,
      name: clerkUser?.fullName || selectedCreator.name || 'Mentor Creator',
      title: mentorTitle || 'Mentor & Technical Advisor',
      org: mentorOrg || 'Independent Expert',
      bio: mentorBio || 'Passionate mentor helping professionals grow their skills and advance their careers.',
      startingPrice: Number(mentorPrice) || 75,
      category: mentorCategory,
    });
    setShowMentorQuestionnaire(false);
  };

  const handleCreateServiceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newDesc) return;
    const newService: Service = {
      id: 'svc-' + Math.random().toString(36).substring(2, 9),
      title: newTitle,
      description: newDesc,
      price: Number(newPrice),
      format: newFormat,
      duration: newDuration,
      capacity: newFormat === 'webinar' || newFormat === 'cohort' ? Number(newCapacity) : undefined,
    };
    addService(selectedCreator.id, newService);
    setShowAddServiceModal(false);
    setNewTitle(''); setNewDesc(''); setNewPrice(75);
  };

  const handleReplyDM = (dmId: string) => {
    const text = replyText[dmId];
    if (!text) return;
    setPaidDMs((prev) =>
      prev.map((dm) => (dm.id === dmId ? { ...dm, response: text, status: 'responded', respondedAt: 'Just now' } : dm))
    );
    setReplyText((prev) => ({ ...prev, [dmId]: '' }));
  };

  const handleExecutePayout = () => {
    if (withdrawableAmount <= 0) return;
    setLastWithdrawnAmount(withdrawableAmount);
    setWithdrawSuccessModal(true);
    setWithdrawableAmount(0);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col md:flex-row text-slate-900 dark:text-slate-100">
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-slate-900 text-slate-100 flex flex-col justify-between shrink-0 select-none md:h-screen md:sticky md:top-0 p-5">
        <div>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-bold">
              ⚡
            </div>
            <div>
              <div className="font-headline font-bold text-base leading-tight">Leap Skills</div>
              <div className="text-[11px] text-slate-400 font-mono">Single-Link Platform</div>
            </div>
          </div>

          {/* Nav Buttons */}
          <nav className="space-y-1">
            {[
              { id: 'home', label: 'Overview', icon: 'dashboard' },
              { id: 'services', label: 'Offerings & Formats', icon: 'layers' },
              { id: 'paid_dm', label: 'Paid DM Inbox', icon: 'mail', badge: paidDMs.filter((d) => d.status === 'awaiting_response').length },
              { id: 'earnings', label: 'Earnings & Payouts', icon: 'payments' },
              { id: 'growth', label: 'Growth & Auto-DM', icon: 'auto_awesome' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as any)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                  activeTab === item.id
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-[18px]">{item.icon}</span>
                  <span>{item.label}</span>
                </div>
                {item.badge ? (
                  <span className="px-2 py-0.5 text-[10px] font-extrabold bg-rose-500 text-white rounded-full">
                    {item.badge}
                  </span>
                ) : null}
              </button>
            ))}
          </nav>
        </div>

        <div className="pt-6 border-t border-slate-800 space-y-3">
          <div className="p-3 bg-slate-800/60 rounded-xl space-y-1">
            <div className="text-[11px] text-slate-400">Signed in as</div>
            <div className="font-bold text-sm text-white truncate">{clerkUser?.fullName || 'Guest'}</div>
            <div className="font-mono text-[11px] text-indigo-400 truncate">{userEmail || '—'}</div>
          </div>
          <div className="p-3 bg-slate-800/60 rounded-xl text-xs space-y-1">
            <div className="text-slate-400">Shareable Profile URL</div>
            <div className="font-mono text-indigo-400 font-bold truncate">creatorhub.pro/{selectedCreator.id}</div>
          </div>
          <button
            onClick={() => router.push(`/profile/${selectedCreator.id}`)}
            className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold rounded-xl transition-all cursor-pointer"
          >
            View Public Profile ↗
          </button>
        </div>
      </aside>

      {/* Main Workspace Area */}
      <main className="flex-1 p-6 md:p-10 max-w-6xl">
        {/* Tab 1: Overview */}
        {activeTab === 'home' && (
          <div className="space-y-8 animate-fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="font-headline text-3xl font-extrabold tracking-tight">
                  Welcome back, {clerkUser?.fullName || selectedCreator.name} 👋
                </h1>
                <p className="text-sm text-slate-500 mt-1">
                  Here is your single-link performance overview for today.
                </p>
              </div>
              <button
                onClick={() => router.push(`/profile/${selectedCreator.id}`)}
                className="px-5 py-2.5 bg-indigo-600 text-white font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-indigo-500 transition-all shadow-sm cursor-pointer"
              >
                Copy Shareable Link
              </button>
            </div>

            {/* Mentor Onboarding Prompt / Questionnaire */}
            {(userRole !== 'instructor' || showMentorQuestionnaire) && (
              <div className="p-6 bg-gradient-to-br from-indigo-900/90 via-purple-900/90 to-slate-900 border border-indigo-700/80 text-white rounded-3xl space-y-6 shadow-xl animate-fade-in">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 text-indigo-200 text-xs font-mono font-bold rounded-full border border-white/20">
                      <span>MENTOR QUESTIONNAIRE</span>
                    </div>
                    <h2 className="font-headline text-2xl font-extrabold text-white">
                      Want to be a Mentor on CreatorHub Pro?
                    </h2>
                    <p className="text-sm text-indigo-100/80 max-w-xl">
                      Answer a few quick questions to create your mentor profile, configure your booking calendar, and start receiving 1:1 sessions & paid DMs.
                    </p>
                  </div>
                  {!showMentorQuestionnaire && (
                    <button
                      type="button"
                      onClick={() => setShowMentorQuestionnaire(true)}
                      className="px-6 py-3 bg-white text-indigo-950 font-bold text-sm rounded-xl hover:bg-indigo-50 transition-all shadow-md cursor-pointer shrink-0"
                    >
                      Answer Mentor Questions &rarr;
                    </button>
                  )}
                </div>

                {showMentorQuestionnaire && (
                  <form onSubmit={handleMentorQuestionnaireSubmit} className="mt-4 pt-6 border-t border-white/15 space-y-4 bg-slate-950/60 p-6 rounded-2xl border border-white/10">
                    <h3 className="text-lg font-bold text-white mb-2">Mentor Application & Profile Questions</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-indigo-200 mb-1">Expertise Category</label>
                        <select
                          value={mentorCategory}
                          onChange={(e: any) => setMentorCategory(e.target.value)}
                          className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-indigo-400"
                        >
                          <option value="tech">Software & AI Technology</option>
                          <option value="design">UI/UX Design & Product</option>
                          <option value="business">Business & Startup Consulting</option>
                          <option value="other">Career Coaching & Other</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-indigo-200 mb-1">Headline / Professional Title</label>
                        <input
                          type="text"
                          value={mentorTitle}
                          onChange={(e) => setMentorTitle(e.target.value)}
                          placeholder="e.g. Senior Software Architect @ TechCorp"
                          required
                          className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-indigo-400"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-indigo-200 mb-1">Organization / Company</label>
                        <input
                          type="text"
                          value={mentorOrg}
                          onChange={(e) => setMentorOrg(e.target.value)}
                          placeholder="e.g. Independent Advisor / Startup Founder"
                          className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-indigo-400"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-indigo-200 mb-1">Starting Session Rate (PKR / Rs.)</label>
                        <input
                          type="number"
                          value={mentorPrice}
                          onChange={(e) => setMentorPrice(Number(e.target.value))}
                          required
                          className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-indigo-400"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-indigo-200 mb-1">Bio / About Your Mentorship</label>
                      <textarea
                        value={mentorBio}
                        onChange={(e) => setMentorBio(e.target.value)}
                        placeholder="Describe your domain experience and how you guide mentes..."
                        rows={3}
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-indigo-400"
                      />
                    </div>

                    <div className="flex justify-end gap-3 pt-2">
                      <button
                        type="button"
                        onClick={() => setShowMentorQuestionnaire(false)}
                        className="px-5 py-2.5 border border-slate-700 rounded-xl text-xs font-semibold hover:bg-slate-800 text-slate-300"
                      >
                        Dismiss
                      </button>
                      <button
                        type="submit"
                        className="px-6 py-2.5 bg-indigo-500 hover:bg-indigo-400 text-white text-xs font-bold rounded-xl shadow-lg transition-all cursor-pointer"
                      >
                        Submit & Display Mentor Profile ✨
                      </button>
                    </div>
                  </form>
                )}
              </div>
            )}

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Gross Revenue</div>
                <div className="text-2xl font-black font-mono mt-1">Rs. 384,000</div>
                <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold mt-1">↑ 18% vs last month</div>
              </div>
              <div className="p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Withdrawable Balance</div>
                <div className="text-2xl font-black font-mono text-indigo-600 dark:text-indigo-400 mt-1">{formatPKR(withdrawableAmount || 145000)}</div>
                <div className="text-[11px] text-slate-400 mt-1">Instant Payout Rail Active</div>
              </div>
              <div className="p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Upcoming Bookings</div>
                <div className="text-2xl font-black font-mono mt-1">{bookings.length}</div>
                <div className="text-[11px] text-slate-400 mt-1">1:1 & Webinar sessions</div>
              </div>
              <div className="p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Pending Paid DMs</div>
                <div className="text-2xl font-black font-mono text-rose-500 mt-1">
                  {paidDMs.filter((d) => d.status === 'awaiting_response').length}
                </div>
                <div className="text-[11px] text-slate-400 mt-1">Awaiting your response</div>
              </div>
            </div>

            {/* Bookings List */}
            <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl space-y-4">
              <h2 className="font-headline text-lg font-bold">Upcoming Sessions & Bookings</h2>
              {bookings.length === 0 ? (
                <div className="py-8 text-center text-sm text-slate-400">No active bookings yet. Share your profile link to get started!</div>
              ) : (
                <div className="divide-y divide-slate-100 dark:divide-slate-800">
                  {bookings.map((b) => (
                    <div key={b.id} className="py-3 flex items-center justify-between">
                      <div>
                        <div className="font-bold text-sm">{b.clientName}</div>
                        <div className="text-xs text-slate-500">{b.serviceTitle} &bull; {b.date} @ {b.time}</div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="px-3 py-1 text-xs font-bold rounded-full bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400">
                          Confirmed
                        </span>
                        <button
                          onClick={() => router.push(`/meeting/${b.id}`)}
                          className="px-3 py-1.5 bg-indigo-600 text-white font-bold text-xs rounded-lg hover:bg-indigo-500 cursor-pointer"
                        >
                          Join WebRTC Meeting
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tab 2: Services & Formats */}
        {activeTab === 'services' && (
          <div className="space-y-8 animate-fade-in">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="font-headline text-3xl font-extrabold">Monetization Formats</h1>
                <p className="text-sm text-slate-500">Manage your 1:1 sessions, webinars, cohorts, bundles, and paid DMs.</p>
              </div>
              <button
                onClick={() => setShowAddServiceModal(true)}
                className="px-5 py-2.5 bg-indigo-600 text-white font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-indigo-500 transition-all cursor-pointer"
              >
                + Add New Offering
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {creatorServices.map((s) => (
                <div key={s.id} className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl flex justify-between items-start">
                  <div>
                    <span className="px-2.5 py-0.5 text-[10px] font-mono font-bold uppercase rounded bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-300">
                      {s.format || s.type || 'one_on_one'}
                    </span>
                    <h3 className="font-bold text-lg mt-2">{s.title}</h3>
                    <p className="text-xs text-slate-500 mt-1">{s.description}</p>
                    <div className="text-xs font-semibold text-slate-400 mt-3">{s.duration || '45 mins'}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-mono text-xl font-extrabold text-indigo-600 dark:text-indigo-400">${s.price}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Add Service Modal */}
            {showAddServiceModal && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
                <div className="w-full max-w-md bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl space-y-4">
                  <h3 className="font-headline font-bold text-xl">Add New Offering</h3>
                  <form onSubmit={handleCreateServiceSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Format</label>
                      <select
                        value={newFormat}
                        onChange={(e: any) => setNewFormat(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm font-semibold"
                      >
                        <option value="one_on_one">1:1 Consultation</option>
                        <option value="webinar">Group Webinar</option>
                        <option value="cohort">Cohort Course</option>
                        <option value="paid_dm">Priority Paid DM</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Title</label>
                      <input
                        type="text"
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                        required
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Price ($)</label>
                      <input
                        type="number"
                        value={newPrice}
                        onChange={(e) => setNewPrice(Number(e.target.value))}
                        required
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Description</label>
                      <textarea
                        value={newDesc}
                        onChange={(e) => setNewDesc(e.target.value)}
                        rows={2}
                        required
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm"
                      />
                    </div>

                    <div className="flex gap-2 pt-2">
                      <button
                        type="button"
                        onClick={() => setShowAddServiceModal(false)}
                        className="flex-1 py-3 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="flex-1 py-3 bg-indigo-600 text-white rounded-xl text-xs font-bold hover:bg-indigo-500"
                      >
                        Save Offering
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Paid DM Inbox */}
        {activeTab === 'paid_dm' && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <h1 className="font-headline text-3xl font-extrabold">Priority Paid DM Inbox</h1>
              <p className="text-sm text-slate-500">Asynchronous Q&A threads paid by your audience.</p>
            </div>

            <div className="space-y-4">
              {paidDMs.map((dm) => (
                <div key={dm.id} className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-bold text-base">{dm.clientName}</div>
                      <div className="text-xs text-slate-400">{dm.clientEmail} &bull; Opened {dm.openedAt}</div>
                    </div>
                    <span className={`px-3 py-1 text-xs font-bold rounded-full ${
                      dm.status === 'awaiting_response'
                        ? 'bg-rose-50 text-rose-600 dark:bg-rose-950/60 dark:text-rose-400'
                        : 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400'
                    }`}>
                      {dm.status === 'awaiting_response' ? 'Awaiting Response' : 'Responded'}
                    </span>
                  </div>

                  <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl text-sm italic border-l-4 border-indigo-600">
                    "{dm.question}"
                  </div>

                  {dm.response ? (
                    <div className="p-4 bg-indigo-50/50 dark:bg-indigo-950/30 rounded-2xl text-sm border border-indigo-100 dark:border-indigo-800/50">
                      <div className="text-xs font-bold text-indigo-600 dark:text-indigo-400 mb-1">Your Response</div>
                      <p>{dm.response}</p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <textarea
                        value={replyText[dm.id] || ''}
                        onChange={(e) => setReplyText({ ...replyText, [dm.id]: e.target.value })}
                        placeholder="Write your advice/answer to the client..."
                        rows={3}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm"
                      />
                      <button
                        onClick={() => handleReplyDM(dm.id)}
                        className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl cursor-pointer"
                      >
                        Send Paid Reply & Mark Resolved &rarr;
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: Earnings & Payouts */}
        {activeTab === 'earnings' && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <h1 className="font-headline text-3xl font-extrabold">Earnings & Instant Payouts</h1>
              <p className="text-sm text-slate-500">Platform operates on zero subscription fee — platform takes commission only on transacted revenue.</p>
            </div>

            <div className="p-8 bg-indigo-600 text-white rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-indigo-200">Available Payout Balance</div>
                <div className="text-4xl font-black font-mono mt-1">${withdrawableAmount}</div>
                <div className="text-xs text-indigo-200 mt-2">Instant Stripe Connect & UPI Payout Rail Active</div>
              </div>
              <button
                onClick={handleExecutePayout}
                disabled={withdrawableAmount <= 0}
                className="px-6 py-3.5 bg-white text-indigo-900 font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-indigo-50 transition-all cursor-pointer disabled:opacity-50"
              >
                Withdraw Funds Instantly &rarr;
              </button>
            </div>

            {withdrawSuccessModal && (
              <div className="p-4 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 text-emerald-800 dark:text-emerald-200 rounded-2xl text-sm font-bold">
                ✓ Instant Payout of ${lastWithdrawnAmount} triggered! Funds will hit your connected bank/UPI account within seconds.
              </div>
            )}
          </div>
        )}

        {/* Tab 5: Growth & Auto-DM */}
        {activeTab === 'growth' && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <h1 className="font-headline text-3xl font-extrabold">Growth & Auto-DM Automation</h1>
              <p className="text-sm text-slate-500">Automatically direct social followers from Instagram DMs to your profile link.</p>
            </div>

            <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl space-y-4">
              <h2 className="font-bold text-lg">Instagram Auto-DM Bot Rule</h2>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Trigger Keyword</label>
                <input
                  type="text"
                  value={dmKeyword}
                  onChange={(e) => setDmKeyword(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Auto-Reply Template</label>
                <textarea
                  value={dmTemplate}
                  onChange={(e) => setDmTemplate(e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm"
                />
              </div>

              <button
                onClick={() => alert('Instagram Auto-DM Automation rule saved!')}
                className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl cursor-pointer"
              >
                Save Auto-DM Automation Rule
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
