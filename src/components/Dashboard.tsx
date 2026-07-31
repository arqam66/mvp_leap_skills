'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useAppStore } from '../store/app';
import { Service, Booking } from '../types';
import { getFutureDate } from '../utils/dates';
import { useShallow } from 'zustand/shallow';

const EMPTY_SERVICES: Service[] = [];

export default function Dashboard() {
  const router = useRouter();
  const selectedCreator = useAppStore((s) => s.selectedCreator);
  const creatorServices = useAppStore((s) => s.servicesMap[s.selectedCreator.id] ?? EMPTY_SERVICES);
  const bookings = useAppStore(useShallow((s) => s.bookings.filter((b) => b.creatorId === s.selectedCreator.id)));
  const addService = useAppStore((s) => s.addService);
  const addBooking = useAppStore((s) => s.addBooking);
  const cancelBooking = useAppStore((s) => s.cancelBooking);

  const [activeTab, setActiveTab] = React.useState<'home' | 'services' | 'earnings' | 'analytics'>('home');
  const [showAddServiceModal, setShowAddServiceModal] = React.useState(false);
  const [newTitle, setNewTitle] = React.useState('');
  const [newDesc, setNewDesc] = React.useState('');
  const [newPrice, setNewPrice] = React.useState(50);
  const [newDuration, setNewDuration] = React.useState('60 mins');
  const [newPlatform, setNewPlatform] = React.useState('Google Meet');

  const [showManualBookingModal, setShowManualBookingModal] = React.useState(false);
  const [manualClientName, setManualClientName] = React.useState('');
  const [manualClientEmail, setManualClientEmail] = React.useState('');
  const [manualDate, setManualDate] = React.useState(getFutureDate(5));
  const [manualTime, setManualTime] = React.useState('11:00 AM');
  const [manualService, setManualService] = React.useState('');

  const [withdrawableAmount, setWithdrawableAmount] = React.useState(2340);
  const [lastWithdrawnAmount, setLastWithdrawnAmount] = React.useState(0);
  const [earningsHistory, setEarningsHistory] = React.useState([
    { date: getFutureDate(-5), client: 'Sarah Connor', amount: 150, service: '1:1 Career Consultation', status: 'pushed' },
    { date: getFutureDate(-4), client: 'James Patterson', amount: 100, service: 'Async Portfolio Review', status: 'pushed' },
    { date: getFutureDate(-2), client: 'Amara Lopez', amount: 49, service: 'Digital UX Template Pack', status: 'pushed' },
  ]);
  const [withdrawSuccessModal, setWithdrawSuccessModal] = React.useState(false);

  const handleCreateServiceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newDesc) return;
    const newService: Service = {
      id: 'custom-' + Math.random().toString(36).substring(2, 11),
      title: newTitle,
      description: newDesc,
      price: Number(newPrice),
      duration: newDuration,
      platform: newPlatform,
    };
    addService(selectedCreator.id, newService);
    setShowAddServiceModal(false);
    setNewTitle(''); setNewDesc(''); setNewPrice(50); setNewDuration('60 mins'); setNewPlatform('Google Meet');
  };

  const handleManualBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualClientName || !manualClientEmail) return;
    const dummyBooking: Booking = {
      id: 'manual-' + Math.random().toString(36).substring(2, 11),
      creatorId: selectedCreator.id,
      creatorName: selectedCreator.name,
      serviceTitle: manualService || '1:1 Session',
      clientName: manualClientName,
      clientEmail: manualClientEmail,
      date: manualDate,
      time: manualTime,
      platform: 'Google Meet',
      status: 'confirmed',
    };
    addBooking(dummyBooking);
    setShowManualBookingModal(false);
    setManualClientName(''); setManualClientEmail(''); setManualDate(getFutureDate(5)); setManualTime('11:00 AM'); setManualService('');
  };

  const handleExecutePayout = () => {
    if (withdrawableAmount <= 0) return;
    setLastWithdrawnAmount(withdrawableAmount);
    setWithdrawSuccessModal(true);
    setWithdrawableAmount(0);
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex flex-col md:flex-row">
      <aside className="w-full md:w-64 bg-[#1a1c1c] text-slate-100 flex flex-col justify-between shrink-0 select-none md:h-screen md:sticky md:top-0">
        <div>
          <div className="p-6 border-b border-gray-800 flex items-center justify-between">
            <button onClick={() => router.push('/')} className="flex items-center gap-2.5 focus:outline-none text-left cursor-pointer">
              <img alt="Logo" className="h-8 w-auto filter invert brightness-200" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBGmOWQ2KyxXrzAzOweN_nQl71EHn0Zf3GVoOLOv9KAJWg7jz0OenkRpIv2QYfvqvLxsNLKy7a7IxY-1yUctTCjc4uaeaYrQjocRKXqMw7fqv8y1P_UZ06ALbHb2AF24vFIhkoTYLsU0_-sXBOeBydDqKz5joldm0L9t_X9zOWePMHuRsF7UsjBtIvF6NQIWhEvk0cgzbOSLPrqoE31znhALbmQZ1VLziVjFq9LSbHI_bHVPtfV5eIe1iA_wkr-DrVsFae7qHlvcL-4" />
              <span className="font-headline font-bold text-base text-gray-100">Command Center</span>
            </button>
          </div>

          <div className="px-6 py-5.5 flex items-center gap-3 border-b border-gray-800/60 bg-white/5">
            <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-700 bg-gray-50 shrink-0">
              <img alt={selectedCreator.name} className="w-full h-full object-cover" src={selectedCreator.image} />
            </div>
            <div className="truncate">
              <h4 className="text-sm font-bold text-gray-100 leading-tight truncate">{selectedCreator.name}</h4>
              <p className="text-[10px] text-gray-400 font-bold tracking-wider uppercase mt-0.5 truncate">{selectedCreator.title}</p>
            </div>
          </div>

          <nav className="p-4 space-y-1">
            {[
              { id: 'home' as const, label: 'Admin Home', icon: 'dashboard' },
              { id: 'services' as const, label: 'My Store Services', icon: 'storefront' },
              { id: 'earnings' as const, label: 'Payout & Earnings', icon: 'payments' },
              { id: 'analytics' as const, label: 'Marketing Funnel', icon: 'insights' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full text-left px-3.5 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-3 cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-primary-container text-white shadow-lg shadow-indigo-600/10'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-4 border-t border-gray-800/40 text-center space-y-2">
          <button
            onClick={() => router.push(`/profile/${selectedCreator.id}`)}
            className="w-full py-2.5 bg-gray-800 hover:bg-gray-700 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 focus:outline-none transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-sm">visibility</span>
            View Storefront Profile
          </button>
        </div>
      </aside>

      <main className="flex-1 p-6 md:p-10 space-y-8 overflow-y-auto max-w-7xl mx-auto text-slate-900 dark:text-slate-100">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white dark:bg-slate-900 p-5 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-sm">
          <div>
            <span className="text-[10px] bg-primary-container/10 dark:bg-indigo-500/20 text-primary-brand dark:text-indigo-400 border border-primary-container/20 dark:border-indigo-500/30 font-bold px-3 py-0.5 rounded-full uppercase tracking-wider select-none">Live Connection</span>
            <h2 className="font-headline text-lg font-bold text-[#1a1c1c] dark:text-white tracking-tight mt-1.5 flex items-center gap-2">Leap Skills Creator Administration Console</h2>
          </div>
          <button onClick={() => router.push('/')} className="text-xs font-semibold text-gray-600 dark:text-slate-300 hover:text-[#1a1c1c] dark:hover:text-white border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-gray-50 dark:hover:bg-slate-700 px-4 py-2 rounded-xl focus:outline-none flex items-center gap-1.5 transition-all cursor-pointer">
            <span className="material-symbols-outlined text-[16px]">logout</span>
            Back to Public Mode
          </button>
        </div>

        {activeTab === 'home' && (
          <div className="space-y-8 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white dark:bg-slate-900 p-6.5 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-sm flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[10px] text-gray-400 dark:text-slate-400 font-bold uppercase tracking-wider block">Admin Net Earnings</span>
                    <span className="text-2.5xl font-extrabold text-[#1a1c1c] dark:text-white mt-1 block">$12,450.00</span>
                  </div>
                  <div className="w-10 h-10 bg-indigo-50 dark:bg-indigo-950/60 text-primary-brand dark:text-indigo-400 rounded-xl flex items-center justify-center">
                    <span className="material-symbols-outlined font-bold text-xl">payments</span>
                  </div>
                </div>
                <div className="pt-4 border-t border-gray-50 dark:border-slate-800 flex justify-between items-center mt-4">
                  <div className="text-xs font-medium text-gray-400 dark:text-slate-400">Withdrawable: <span className="font-bold text-gray-800 dark:text-slate-200">${withdrawableAmount}</span></div>
                  {withdrawableAmount > 0 ? (
                    <button onClick={handleExecutePayout} className="text-[10px] font-bold text-success-vibrant bg-success-vibrant/10 hover:bg-success-vibrant hover:text-white px-3 py-1.5 rounded-lg transition-all">Withdraw Now</button>
                  ) : (
                    <span className="text-[10px] text-gray-400 dark:text-slate-500 italic font-semibold">Funds Transferred</span>
                  )}
                </div>
              </div>

              <div className="bg-white dark:bg-slate-900 p-6.5 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-sm flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[10px] text-gray-400 dark:text-slate-400 font-bold uppercase tracking-wider block">Audience Traffic</span>
                    <span className="text-2.5xl font-extrabold text-[#1a1c1c] dark:text-white mt-1 block">12,400</span>
                  </div>
                  <div className="w-10 h-10 bg-emerald-50 dark:bg-emerald-950/60 text-[#008060] dark:text-emerald-400 rounded-xl flex items-center justify-center">
                    <span className="material-symbols-outlined font-semibold text-xl">group</span>
                  </div>
                </div>
                <p className="text-xs text-gray-400 dark:text-slate-400 pt-4 mt-4 border-t border-gray-50 dark:border-slate-800 flex items-center gap-1 font-medium">
                  <span className="material-symbols-outlined text-success-vibrant dark:text-emerald-400 text-sm font-bold">trending_up</span>
                  <span className="font-bold text-success-vibrant dark:text-emerald-400">+18%</span> month-over-month growth
                </p>
              </div>

              <div className="bg-white dark:bg-slate-900 p-6.5 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-sm flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[10px] text-gray-400 dark:text-slate-400 font-bold uppercase tracking-wider block">Conversion Metrics</span>
                    <span className="text-2.5xl font-extrabold text-indigo-600 dark:text-indigo-400 mt-1 block">4.37%</span>
                  </div>
                  <div className="w-10 h-10 bg-indigo-50 dark:bg-indigo-950/60 text-indigo-500 dark:text-indigo-400 rounded-xl flex items-center justify-center">
                    <span className="material-symbols-outlined font-semibold text-xl">conversion_path</span>
                  </div>
                </div>
                <p className="text-xs text-gray-400 dark:text-slate-400 pt-4 mt-4 border-t border-gray-50 dark:border-slate-800 font-medium">Average transaction: <span className="font-bold text-gray-800 dark:text-slate-200">$118 / unit</span></p>
              </div>
            </div>

            <div className="bg-amber-50/50 dark:bg-amber-950/30 border border-amber-100/70 dark:border-amber-900/40 p-5 rounded-2xl flex gap-4 select-none">
              <span className="material-symbols-outlined text-amber-500 text-[28px] font-bold shrink-0">lightbulb</span>
              <div>
                <h4 className="text-xs font-bold text-amber-800 dark:text-amber-400 uppercase tracking-wider">Leap Genius Store Advisor</h4>
                <p className="text-[#5f5e5e] dark:text-slate-300 text-xs md:text-sm mt-1 leading-relaxed">
                  Tip: Add a downloadable digital template or PDF checkpack to capture passive, low-ticket traffic immediately. Profile conversion rates increased by <span className="font-bold bg-amber-100 dark:bg-amber-900/60 text-amber-800 dark:text-amber-300 px-1 py-0.5 rounded">22%</span> for curators who launched short-form content guides last month.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-sm p-6 space-y-6">
                <div className="flex justify-between items-center border-b border-gray-50 dark:border-slate-800 pb-4">
                  <div>
                    <h3 className="font-headline text-base font-bold text-[#1a1c1c] dark:text-white">Upcoming scheduled sessions</h3>
                    <p className="text-xs text-gray-400 dark:text-slate-400">Manage client attendance updates and platform integrations</p>
                  </div>
                  <button onClick={() => setShowManualBookingModal(true)} className="py-1.5 px-3 bg-indigo-50 dark:bg-indigo-950/60 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 text-primary-brand dark:text-indigo-400 text-xs font-bold rounded-xl transition-all flex items-center gap-1 focus:outline-none">
                    <span className="material-symbols-outlined text-[16px] font-bold">add</span>
                    Book Manual
                  </button>
                </div>
                <div className="space-y-4">
                  {bookings.length === 0 ? (
                    <div className="p-10 text-center text-gray-400 dark:text-slate-500 select-none text-xs flex flex-col items-center justify-center gap-2">
                      <span className="material-symbols-outlined text-[32px] text-gray-300 dark:text-slate-600">calendar_today</span>
                      No bookings currently registered. Book a mock session from a creator profile page!
                    </div>
                  ) : (
                    bookings.map((booking) => (
                      <div key={booking.id} className="bg-gray-50/50 dark:bg-slate-800/60 border border-gray-100 dark:border-slate-700/60 p-4.5 rounded-xl flex justify-between items-start gap-4 transition-all">
                        <div className="space-y-1">
                          <h4 className="text-xs font-bold text-primary-brand dark:text-indigo-400 uppercase tracking-wider">{booking.serviceTitle}</h4>
                          <p className="text-sm font-bold text-[#1a1c1c] dark:text-white">{booking.clientName}</p>
                          <p className="text-[11px] text-gray-400 dark:text-slate-400 font-semibold">{booking.clientEmail}</p>
                          <div className="flex flex-wrap items-center gap-2.5 pt-2 select-none">
                            <span className="text-[10px] bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 px-2 py-0.5 rounded-md font-semibold text-gray-500 dark:text-slate-300 flex items-center gap-1">
                              <span className="material-symbols-outlined text-[12px] font-bold">schedule</span>
                              {booking.date} @ {booking.time}
                            </span>
                            <span className="text-[9px] bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-100/50 dark:border-indigo-900/50 text-indigo-500 dark:text-indigo-400 px-2.5 py-0.5 rounded-full uppercase font-extrabold flex items-center gap-0.5">
                              <span className="material-symbols-outlined text-[10px] font-bold">videocam</span>
                              {booking.platform || 'Google Meet'}
                            </span>
                          </div>
                        </div>
                        <button onClick={() => cancelBooking(booking.id)} className="text-[10px] font-semibold text-[#E44A32] hover:text-rose-800 bg-rose-50 dark:bg-rose-950/40 border border-rose-100/85 dark:border-rose-900/50 px-2.5 py-1.5 rounded-lg active:scale-95 transition-all text-left">Cancel Appointment</button>
                      </div>
                    ))
                  )}
                </div>
              </div>

              <div className="lg:col-span-5 bg-white dark:bg-slate-900 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-sm p-6 space-y-6">
                <div>
                  <h3 className="font-headline text-base font-bold text-[#1a1c1c] dark:text-white">Conversion funnel pipeline</h3>
                  <p className="text-xs text-gray-400 dark:text-slate-400">Performance logs tracking conversion ratios relative to clicks</p>
                </div>
                <div className="space-y-5 pt-3">
                  <div>
                    <div className="flex justify-between items-center text-xs font-bold text-gray-700 dark:text-slate-300 mb-1.5">
                      <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 bg-gray-400 dark:bg-slate-500 rounded-full"></span>Profile Views</span>
                      <span>12,400 views (100%)</span>
                    </div>
                    <div className="w-full bg-gray-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden"><div className="h-full bg-gray-500 dark:bg-slate-400 rounded-full w-full"></div></div>
                  </div>
                  <div>
                    <div className="flex justify-between items-center text-xs font-bold text-gray-700 dark:text-slate-300 mb-1.5">
                      <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 bg-[#4f46e5] dark:bg-indigo-500 rounded-full"></span>Service clicks</span>
                      <span>3,800 clicks (30.6%)</span>
                    </div>
                    <div className="w-full bg-gray-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden"><div className="h-full bg-[#4f46e5] dark:bg-indigo-500 rounded-full w-[30.6%]"></div></div>
                  </div>
                  <div>
                    <div className="flex justify-between items-center text-xs font-bold text-gray-700 dark:text-slate-300 mb-1.5">
                      <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 bg-[#008060] dark:bg-emerald-500 rounded-full"></span>Payout Conversions</span>
                      <span>542 bookings (14.2% of clicks)</span>
                    </div>
                    <div className="w-full bg-gray-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden"><div className="h-full bg-[#008060] dark:bg-emerald-500 rounded-full w-[14.2%]"></div></div>
                  </div>
                </div>
                <div className="pt-4 border-t border-gray-50 dark:border-slate-800 leading-relaxed text-xs text-[#5f5e5e] dark:text-slate-400 italic">*This month&apos;s funnel shows a lift of 1.4% following adding Alex&apos;s customizable Digital UX Template package.</div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'services' && (
          <div className="space-y-6 animate-fade-in text-left">
            <div className="flex justify-between items-center border-b border-gray-100 dark:border-slate-800 pb-4">
              <div>
                <h3 className="font-headline text-lg font-bold text-[#1a1c1c] dark:text-white">Interactive active storefront services</h3>
                <p className="text-xs text-gray-400 dark:text-slate-400">These items sync directly onto your public profile booking block</p>
              </div>
              <button onClick={() => setShowAddServiceModal(true)} className="py-2.5 px-4 bg-primary-container dark:bg-indigo-600 hover:bg-primary-brand dark:hover:bg-indigo-500 text-white text-xs font-bold rounded-xl transition-all flex items-center gap-1" id="btn-add-service">
                <span className="material-symbols-outlined text-[16px] font-bold">add</span>
                Add New Storefront Product
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {creatorServices.map((service) => (
                <div key={service.id} className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-sm space-y-4 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start gap-3">
                      <h4 className="text-sm font-bold text-gray-800 dark:text-white leading-tight">{service.title}</h4>
                      <span className="font-headline text-sm font-black text-primary-brand dark:text-indigo-400">${service.price}</span>
                    </div>
                    <p className="text-gray-500 dark:text-slate-300 text-xs leading-relaxed pt-2.5">{service.description}</p>
                  </div>
                  <div className="pt-4 border-t border-gray-50 dark:border-slate-800 flex flex-wrap gap-2 text-[10px] text-gray-400 dark:text-slate-400 font-semibold select-none">
                    {service.duration && <span className="flex items-center gap-1 bg-gray-50 dark:bg-slate-800 px-2.5 py-1 rounded-md border border-gray-100 dark:border-slate-700 text-gray-600 dark:text-slate-300"><span className="material-symbols-outlined text-[12px]">schedule</span>{service.duration}</span>}
                    {service.platform && <span className="flex items-center gap-1 bg-gray-50 dark:bg-slate-800 px-2.5 py-1 rounded-md border border-gray-100 dark:border-slate-700 text-gray-600 dark:text-slate-300"><span className="material-symbols-outlined text-[12px]">videocam</span>{service.platform}</span>}
                    {service.delivery && <span className="flex items-center gap-1 bg-gray-50 dark:bg-slate-800 px-2.5 py-1 rounded-md border border-gray-100 dark:border-slate-700 text-gray-600 dark:text-slate-300"><span className="material-symbols-outlined text-[12px]">local_shipping</span>{service.delivery}</span>}
                    {service.isDownloadable && <span className="flex items-center gap-1 bg-indigo-50/50 dark:bg-indigo-950/60 px-2.5 py-1 rounded-md text-indigo-500 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-900/50"><span className="material-symbols-outlined text-[12px]">download</span>Digital Asset</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'earnings' && (
          <div className="space-y-6 animate-fade-in text-left">
            <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div className="space-y-1">
                <span className="text-[10px] text-gray-400 dark:text-slate-400 font-bold uppercase tracking-wider block">Available Balance</span>
                <h3 className="text-3.5xl font-extrabold text-[#1a1c1c] dark:text-white">${withdrawableAmount}.00</h3>
                <p className="text-gray-400 dark:text-slate-400 text-xs">Directly transferrable immediate Stripe payouts</p>
              </div>
              {withdrawableAmount > 0 ? (
                <button onClick={handleExecutePayout} className="px-6 py-3.5 bg-success-vibrant hover:bg-emerald-700 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm font-semibold">account_balance_wallet</span>
                  Initiate Instant Bank Transfer
                </button>
              ) : (
                <div className="bg-emerald-50 dark:bg-emerald-950/40 text-success-vibrant dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900/50 py-3.5 px-6 rounded-xl text-xs font-bold flex items-center gap-2">
                  <span className="material-symbols-outlined text-base">check_circle</span>
                  Earnings Cleared Successfully
                </div>
              )}
            </div>
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-sm space-y-4">
              <h3 className="font-headline text-base font-bold text-gray-800 dark:text-white">Direct Sales Records</h3>
              <div className="divide-y divide-gray-100 dark:divide-slate-800">
                {earningsHistory.map((item, idx) => (
                  <div key={idx} className="py-4 flex justify-between items-center text-xs">
                    <div>
                      <h4 className="font-bold text-gray-800 dark:text-white text-sm">{item.service}</h4>
                      <p className="text-gray-400 dark:text-slate-400 text-[10px] font-semibold mt-0.5">{item.date} &mdash; Cleared from client {item.client}</p>
                    </div>
                    <span className="text-sm font-black text-slate-800 dark:text-slate-100">+${item.amount}.00</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="space-y-8 animate-fade-in text-left">
            <div>
              <h3 className="font-headline text-lg font-bold text-[#1a1c1c] dark:text-white">Audience Marketing Analytics</h3>
              <p className="text-xs text-gray-400 dark:text-slate-400">Breakdown of organic user interactions across social links</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-sm">
                <h4 className="font-headline text-sm font-bold text-gray-800 dark:text-white mb-4">Traffic Origins</h4>
                <div className="space-y-4 pt-2">
                  {[
                    { label: 'LinkedIn Organic Links', ratio: '62%' },
                    { label: 'Twitter Bio Referral', ratio: '24%' },
                    { label: 'Youtube Tutorials', ratio: '10%' },
                    { label: 'Direct / Inside Channels', ratio: '4%' },
                  ].map((origin, i) => (
                    <div key={i} className="flex justify-between items-center text-xs text-semi leading-none">
                      <span className="text-gray-500 dark:text-slate-300 font-semibold">{origin.label}</span>
                      <span className="font-extrabold text-[#1a1c1c] dark:text-white">{origin.ratio}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-sm">
                <h4 className="font-headline text-sm font-bold text-gray-800 dark:text-white mb-4">Customer Success Rate</h4>
                <p className="text-xs text-gray-500 dark:text-slate-300 leading-relaxed">
                  Your overall customer feedback loop maintains a 4.93 rating across 382 reviews. Users highlight clear, granular instruction formats, deep technical proficiency, and punctual checkups. Keep up the high responsiveness score!
                </p>
              </div>
            </div>
          </div>
        )}
      </main>

      {showAddServiceModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-[99]" onClick={() => setShowAddServiceModal(false)}>
          <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl border border-gray-100 dark:border-slate-800 shadow-2xl overflow-hidden relative" onClick={(e) => e.stopPropagation()}>
            <div className="bg-primary-brand dark:bg-indigo-700 text-white p-6">
              <h3 className="font-headline text-base font-bold">Add Service to Public Storefront</h3>
              <p className="text-indigo-200 text-xs">Define premium booking criteria. Updates immediately.</p>
            </div>
            <form onSubmit={handleCreateServiceSubmit} className="p-6 space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-400 dark:text-slate-400 uppercase tracking-wider">Service Theme Title</label>
                <input type="text" required value={newTitle} onChange={(e) => setNewTitle(e.target.value)} placeholder="e.g. 1:1 Design Career Intensive" className="w-full font-semibold text-sm py-2 px-3 border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-800 dark:text-slate-100 focus:border-primary-brand dark:focus:border-indigo-400 focus:outline-none rounded-xl" />
              </div>
              <div className="space-y-1 font-semibold text-xs">
                <label className="text-[10px] font-bold text-gray-400 dark:text-slate-400 uppercase tracking-wider">Hourly Price Tag (USD)</label>
                <input type="number" required min={10} max={1000} value={newPrice} onChange={(e) => setNewPrice(Number(e.target.value))} placeholder="e.g. 150" title="Hourly price in USD" className="w-full text-sm py-2 px-3 border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-800 dark:text-slate-100 focus:border-primary-brand dark:focus:border-indigo-400 focus:outline-none rounded-xl" />
              </div>
              <div className="grid grid-cols-2 gap-3.5">
                <div className="space-y-1 font-semibold text-xs">
                  <label className="text-[10px] font-bold text-gray-400 dark:text-slate-400 uppercase tracking-wider">Duration</label>
                  <input type="text" required value={newDuration} onChange={(e) => setNewDuration(e.target.value)} placeholder="e.g. 45 mins" className="w-full text-sm py-2 px-3 border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-800 dark:text-slate-100 focus:border-primary-brand dark:focus:border-indigo-400 focus:outline-none rounded-xl" />
                </div>
                <div className="space-y-1 font-semibold text-xs">
                  <label className="text-[10px] font-bold text-gray-400 dark:text-slate-400 uppercase tracking-wider font-sans">Platform Type</label>
                  <input type="text" required value={newPlatform} onChange={(e) => setNewPlatform(e.target.value)} placeholder="e.g. Google Meet" className="w-full text-sm py-2 px-3 border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-800 dark:text-slate-100 focus:border-primary-brand dark:focus:border-indigo-400 focus:outline-none rounded-xl" />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-400 dark:text-slate-400 uppercase tracking-wider">Public Package Description</label>
                <textarea required rows={3} value={newDesc} onChange={(e) => setNewDesc(e.target.value)} placeholder="Focus points of this session, including key takeaways and preparation guidelines..." className="w-full text-sm py-2 px-3 border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-800 dark:text-slate-100 focus:border-primary-brand dark:focus:border-indigo-400 focus:outline-none rounded-xl resize-none font-medium"></textarea>
              </div>
              <div className="flex gap-3 pt-4 font-bold text-xs">
                <button type="button" onClick={() => setShowAddServiceModal(false)} className="flex-1 py-3 border border-gray-200 dark:border-slate-700 text-gray-500 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-800 rounded-xl cursor-pointer">Dismiss</button>
                <button type="submit" className="flex-1 py-3 bg-primary-container dark:bg-indigo-600 hover:bg-primary-brand dark:hover:bg-indigo-500 text-white rounded-xl shadow-md cursor-pointer">Publish Package</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showManualBookingModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-[99]" onClick={() => setShowManualBookingModal(false)}>
          <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl border border-gray-100 dark:border-slate-800 shadow-2xl overflow-hidden relative text-left" onClick={(e) => e.stopPropagation()}>
            <div className="bg-indigo-600 text-white p-6">
              <h3 className="font-headline text-base font-bold">Record Off-Platform Client</h3>
              <p className="text-indigo-100 text-xs">Register manually booked consultations. Updates upcoming queues.</p>
            </div>
            <form onSubmit={handleManualBookingSubmit} className="p-6 space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-400 dark:text-slate-400 uppercase tracking-wider">Client Name</label>
                <input type="text" required value={manualClientName} onChange={(e) => setManualClientName(e.target.value)} placeholder="e.g. Liam Neeson" className="w-full font-semibold text-sm py-2 px-3 border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-800 dark:text-slate-100 focus:border-primary-brand dark:focus:border-indigo-400 focus:outline-none rounded-xl" />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-400 dark:text-slate-400 uppercase tracking-wider">Client Email</label>
                <input type="email" required value={manualClientEmail} onChange={(e) => setManualClientEmail(e.target.value)} placeholder="liam@gmail.com" className="w-full font-semibold text-sm py-2 px-3 border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-800 dark:text-slate-100 focus:border-primary-brand dark:focus:border-indigo-400 focus:outline-none rounded-xl" />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-400 dark:text-slate-400 uppercase tracking-wider">Service Type</label>
                <input type="text" required value={manualService} onChange={(e) => setManualService(e.target.value)} placeholder="e.g. 1:1 Design Career Consultation" className="w-full font-semibold text-sm py-2 px-3 border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-800 dark:text-slate-100 focus:border-primary-brand dark:focus:border-indigo-400 focus:outline-none rounded-xl" />
              </div>
              <div className="grid grid-cols-2 gap-3.5">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-400 dark:text-slate-400 uppercase tracking-wider">Date</label>
                  <input type="text" required value={manualDate} onChange={(e) => setManualDate(e.target.value)} placeholder="June 28, 2026" className="w-full font-semibold text-sm py-2 px-3 border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-800 dark:text-slate-100 focus:border-primary-brand dark:focus:border-indigo-400 focus:outline-none rounded-xl" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-400 dark:text-slate-400 uppercase tracking-wider">Hour</label>
                  <input type="text" required value={manualTime} onChange={(e) => setManualTime(e.target.value)} placeholder="2:15 PM" className="w-full font-semibold text-sm py-2 px-3 border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-800 dark:text-slate-100 focus:border-primary-brand dark:focus:border-indigo-400 focus:outline-none rounded-xl" />
                </div>
              </div>
              <div className="flex gap-3 pt-4 text-xs font-bold">
                <button type="button" onClick={() => setShowManualBookingModal(false)} className="flex-1 py-3 border border-gray-200 dark:border-slate-700 text-gray-500 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-800 rounded-xl cursor-pointer">Cancel</button>
                <button type="submit" className="flex-1 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-md cursor-pointer">Publish Booking</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {withdrawSuccessModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-[99]" onClick={() => setWithdrawSuccessModal(false)}>
          <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl border border-gray-100 dark:border-slate-800 shadow-2xl p-8 text-center space-y-6" onClick={(e) => e.stopPropagation()}>
            <div className="w-16 h-16 bg-emerald-50 dark:bg-emerald-950/40 rounded-full flex items-center justify-center mx-auto text-success-vibrant dark:text-emerald-400 border-4 border-emerald-100 dark:border-emerald-900/50 shadow-sm">
              <span className="material-symbols-outlined text-[32px] font-extrabold">account_balance</span>
            </div>
            <div className="space-y-1.5">
              <h3 className="font-headline text-lg font-bold text-gray-800 dark:text-white">Bank Transfer Initiated!</h3>
              <p className="text-gray-400 dark:text-slate-400 text-xs leading-relaxed max-w-xs mx-auto">Electronic money clearing operates instantly. Your balance should populate within 5-10 minutes to your linked routing parameters.</p>
            </div>
              <div className="bg-gray-50 dark:bg-slate-800/60 p-4.5 rounded-xl text-left text-xs font-medium space-y-1 max-w-sm mx-auto select-none">
                <div className="flex justify-between"><span className="text-gray-400 dark:text-slate-400">Total Cleared:</span><span className="font-bold text-gray-800 dark:text-white">${lastWithdrawnAmount}.00 USD</span></div>
                <div className="flex justify-between"><span className="text-gray-400 dark:text-slate-400">Transaction Status:</span><span className="text-success-vibrant dark:text-emerald-400 font-bold">Pending Clearance</span></div>
              </div>
            <button onClick={() => setWithdrawSuccessModal(false)} className="w-full py-3 bg-[#1a1c1c] dark:bg-indigo-600 text-white font-bold rounded-xl shadow-md hover:bg-slate-800 dark:hover:bg-indigo-500 transition-all cursor-pointer">Verify Direct Deposits</button>
          </div>
        </div>
      )}
    </div>
  );
}
