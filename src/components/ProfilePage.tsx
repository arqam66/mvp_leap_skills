'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useAppStore } from '../store/app';
import { Creator, Service, Booking } from '../types';
import { CREATORS, CREATOR_SERVICES, TESTIMONIALS } from '../data/creators';
import { getFutureDate, getDateOptions } from '../utils/dates';

interface ProfilePageProps {
  slug: string;
}

export default function ProfilePage({ slug }: ProfilePageProps) {
  const router = useRouter();
  const addBooking = useAppStore((s) => s.addBooking);
  const directServiceIdToOpen = useAppStore((s) => s.directServiceIdToOpen);
  const setDirectServiceIdToOpen = useAppStore((s) => s.setDirectServiceIdToOpen);
  const setSelectedCreator = useAppStore((s) => s.setSelectedCreator);

  const creator = React.useMemo(() => CREATORS.find((c) => c.id === slug), [slug]);
  const services = creator ? (CREATOR_SERVICES[creator.id] || []) : [];

  // All hooks must be declared before any early return (Rules of Hooks)
  const [selectedService, setSelectedService] = React.useState<Service | null>(null);
  const [checkoutStep, setCheckoutStep] = React.useState<number>(1);
  const dateOptions = React.useMemo(() => getDateOptions(), []);
  const [selectedDate, setSelectedDate] = React.useState<string>(dateOptions[0]?.txt || getFutureDate(2));
  const [selectedTime, setSelectedTime] = React.useState<string>('10:00 AM');
  const [clientName, setClientName] = React.useState('');
  const [clientEmail, setClientEmail] = React.useState('');
  const [clientNotes, setClientNotes] = React.useState('');

  React.useEffect(() => {
    if (creator) setSelectedCreator(creator);
  }, [creator, setSelectedCreator]);

  React.useEffect(() => {
    if (directServiceIdToOpen && services.length > 0) {
      const match = services.find((s) => s.id === directServiceIdToOpen);
      if (match) {
        setSelectedService(match);
        setCheckoutStep(1);
      }
      setDirectServiceIdToOpen(null);
    }
  }, [directServiceIdToOpen, services, setDirectServiceIdToOpen]);

  // Early return AFTER all hooks
  if (!creator) {
    return (
      <div className="pt-[115px] pb-24 max-w-7xl mx-auto px-4 md:px-10 text-center">
        <div className="py-24">
          <span className="material-symbols-outlined text-[64px] text-gray-300 mb-6">person_off</span>
          <h1 className="font-headline text-3xl font-extrabold text-[#1a1c1c] mb-4">Creator Not Found</h1>
          <p className="text-[#5f5e5e] text-sm max-w-md mx-auto mb-8">The creator profile you are looking for does not exist or may have been removed.</p>
          <button onClick={() => router.push('/explore')} className="px-6 py-3 bg-primary-container hover:bg-primary-brand text-white font-bold text-sm rounded-xl transition-all cursor-pointer">Browse All Creators</button>
        </div>
      </div>
    );
  }

  const handleOpenCheckout = (service: Service) => {
    setSelectedService(service);
    setCheckoutStep(1);
    setSelectedDate(dateOptions[0]?.txt || getFutureDate(2));
    setSelectedTime('10:00 AM');
    setClientName('');
    setClientEmail('');
    setClientNotes('');
  };

  const handleCloseCheckout = () => {
    setSelectedService(null);
    setCheckoutStep(1);
  };

  const handleDateTimeNext = () => setCheckoutStep(2);

  const handleFinalizeBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !clientEmail) { alert('Please provide your name and email.'); return; }
    if (!selectedService) return;

    const newBooking: Booking = {
      id: 'b-' + Math.random().toString(36).substring(2, 11),
      creatorId: creator.id,
      creatorName: creator.name,
      serviceTitle: selectedService.title,
      clientName,
      clientEmail,
      date: selectedService.isDownloadable ? 'Instant Delivery' : selectedDate,
      time: selectedService.isDownloadable ? 'Download' : selectedTime,
      platform: selectedService.platform || 'Secure Deliverable',
      status: 'confirmed',
    };

    addBooking(newBooking);
    setCheckoutStep(3);
  };

  return (
    <div className="pt-[115px] pb-24 max-w-7xl mx-auto px-4 md:px-10">
      <button
        onClick={() => router.push('/explore')}
        className="flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-primary-brand transition-all mb-8 bg-white border border-gray-100 hover:border-gray-200 px-4 py-2 rounded-xl focus:outline-none cursor-pointer"
      >
        <span className="material-symbols-outlined text-[18px] font-bold">arrow_back</span>
        Back to Explore
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        <div className="lg:col-span-8 space-y-8">
          <div className="bg-white p-6.5 md:p-8 rounded-3xl border border-gray-100/90 shadow-sm relative overflow-hidden">
            <div className="absolute right-0 top-0 w-44 h-44 bg-indigo-50 rounded-full blur-[70px] pointer-events-none" />

            <div className="flex flex-col md:flex-row gap-8 items-center md:items-start text-center md:text-left relative z-10">
              <div className="w-28 h-28 md:w-36 md:h-36 rounded-3xl overflow-hidden shadow-md border-4 border-white ring-4 ring-gray-100 shrink-0 bg-gray-50">
                <img alt={creator.name} className="w-full h-full object-cover" src={creator.image} />
              </div>

              <div className="flex-1 space-y-4">
                <div className="flex items-center justify-center md:justify-start gap-3 flex-wrap">
                  {creator.verified && (
                    <span className="bg-primary-container/10 border border-primary-container/20 text-primary-brand font-extrabold text-[10px] tracking-wide uppercase px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
                      <span className="material-symbols-outlined text-xs font-bold leading-none">verified</span>
                      Verified Expert
                    </span>
                  )}
                  {creator.fastResponder && (
                    <span className="bg-emerald-50 border border-emerald-100/50 text-[#008060] font-extrabold text-[10px] tracking-wide uppercase px-3 py-1 rounded-full flex items-center gap-1">
                      <span className="material-symbols-outlined text-xs font-bold leading-none">bolt</span>
                      Top Responder
                    </span>
                  )}
                </div>

                <div>
                  <h1 className="font-headline text-3xl font-extrabold text-[#1a1c1c] tracking-tight leading-tight">{creator.name}</h1>
                  <p className="text-sm font-semibold text-primary-brand uppercase tracking-wider mt-0.5">{creator.title}</p>
                  <p className="text-gray-400 text-xs mt-0.5">{creator.org}</p>
                </div>

                <div className="grid grid-cols-3 gap-3 pt-4 border-t border-gray-100 text-center select-none max-w-sm mx-auto md:mx-0">
                  <div className="bg-[#fcfcfc] p-2.5 rounded-xl border border-gray-100">
                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">Rating</span>
                    <span className="text-sm font-extrabold text-[#1a1c1c] flex items-center justify-center gap-0.5">
                      <span className="material-symbols-outlined text-[#E44A32] text-sm font-bold">star</span>
                      {creator.rating}
                    </span>
                  </div>
                  <div className="bg-[#fcfcfc] p-2.5 rounded-xl border border-gray-100">
                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">Mentees</span>
                    <span className="text-sm font-extrabold text-primary-brand">{creator.menteesCount || '100+'}</span>
                  </div>
                  <div className="bg-[#fcfcfc] p-2.5 rounded-xl border border-gray-100">
                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">Reach</span>
                    <span className="text-sm font-extrabold text-success-vibrant">{creator.reachCount || '5k'}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-gray-100 text-gray-700 leading-relaxed space-y-4">
              <h3 className="font-headline text-base font-bold text-[#1a1c1c]">About Me</h3>
              <p className="text-sm">{creator.bio}</p>
              <p className="text-sm">In my role at top-tier operations, I have refined standard frameworks that help startups scale, teams coordinate, and high-value professionals secure leadership roles. I use Leap Skills to provide transparent, high-trust consultations, audits and workspace templates directly.</p>
            </div>
          </div>

          <div className="p-6.5 bg-[#fbf9f9] border border-gray-100 rounded-2xl flex gap-4 select-none">
            <span className="material-symbols-outlined text-[36px] text-primary-brand font-bold opacity-20 shrink-0">format_quote</span>
            <div>
              <p className="text-xs md:text-sm italic text-gray-700 leading-relaxed">
                "Alex Rivera has designed a wonderful coaching format on Leap Skills. The portfolio review process was structured, granular, and actionable within days. I received deep Loom recordings that completely updated my career narrative."
              </p>
              <div className="mt-4 flex items-center gap-2">
                <span className="text-xs font-bold text-[#1a1c1c]">Sarah J.</span>
                <span className="text-[10px] font-semibold text-gray-400">Senior Product Designer</span>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white p-6.5 rounded-3xl border border-gray-100/90 shadow-sm">
            <h2 className="font-headline text-base font-extrabold text-[#1a1c1c] mb-6 flex items-center justify-between border-b border-gray-50 pb-4">
              <span>Work With Me</span>
              <span className="text-xs bg-indigo-50 text-primary-brand font-bold px-2.5 py-0.5 rounded-full">{services.length} active</span>
            </h2>

            <div className="space-y-4">
              {services.length === 0 ? (
                <div className="p-6 text-center select-none text-gray-400 text-xs">No packages listed. Toggle into Creator mode and define a service.</div>
              ) : (
                services.map((service) => (
                  <div key={service.id} className="p-5 bg-gray-50/50 border border-gray-200/50 hover:border-indigo-100 hover:bg-white rounded-2xl transition-all shadow-sm space-y-4">
                    <div className="flex justify-between items-start gap-2">
                      <h3 className="text-xs md:text-sm font-bold text-[#1a1c1c] leading-tight">{service.title}</h3>
                      <span className="font-headline text-sm font-black text-primary-brand shrink-0">${service.price}</span>
                    </div>
                    <p className="text-gray-500 text-xs leading-relaxed line-clamp-3">{service.description}</p>
                    <div className="flex flex-wrap gap-2 text-[10px] text-gray-400 font-semibold select-none">
                      {service.duration && (
                        <span className="flex items-center gap-1 bg-white border border-gray-100 px-2 py-0.5 rounded-md">
                          <span className="material-symbols-outlined text-[12px] font-bold text-gray-400">schedule</span>
                          {service.duration}
                        </span>
                      )}
                      {service.platform && (
                        <span className="flex items-center gap-1 bg-white border border-gray-100 px-2 py-0.5 rounded-md">
                          <span className="material-symbols-outlined text-[12px] font-bold text-gray-400">videocam</span>
                          {service.platform}
                        </span>
                      )}
                      {service.delivery && (
                        <span className="flex items-center gap-1 bg-white border border-gray-100 px-2 py-0.5 rounded-md">
                          <span className="material-symbols-outlined text-[12px] font-bold text-gray-400">local_shipping</span>
                          {service.delivery}
                        </span>
                      )}
                      {service.isDownloadable && (
                        <span className="flex items-center gap-1 bg-indigo-50 border border-indigo-100/50 text-indigo-500 px-2 py-0.5 rounded-md">
                          <span className="material-symbols-outlined text-[12px] font-bold text-indigo-500">download</span>
                          Instant Delivery
                        </span>
                      )}
                    </div>
                    <button
                      onClick={() => handleOpenCheckout(service)}
                      className="w-full py-2.5 bg-primary-container hover:bg-primary-brand hover:shadow-md text-white text-xs font-bold rounded-xl transition-all cursor-pointer"
                    >
                      {service.isDownloadable ? 'Buy Package Now' : 'Book Session / Service'}
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedService && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-[99]" onClick={handleCloseCheckout}>
          <div className="w-full max-w-lg bg-white rounded-3xl border border-gray-100 shadow-2xl relative overflow-hidden text-left" onClick={(e) => e.stopPropagation()}>
            <div className="bg-primary-brand text-white p-6 relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl" />
              <button onClick={handleCloseCheckout} className="absolute right-5 top-5 text-indigo-100 hover:text-white bg-white/10 hover:bg-white/20 p-2 rounded-full leading-none focus:outline-none cursor-pointer">
                <span className="material-symbols-outlined text-[18px] font-extrabold">close</span>
              </button>
              <span className="text-[10px] font-bold tracking-widest text-indigo-200 uppercase block mb-1">Storefront Checkout</span>
              <h3 className="font-headline text-lg font-bold truncate leading-tight pr-10">{selectedService.title}</h3>
              <p className="text-white font-extrabold text-sm mt-1">Amount Due: <span className="text-indigo-200 font-extrabold">${selectedService.price}</span></p>
            </div>

            {!selectedService.isDownloadable && checkoutStep !== 3 && (
              <div className="grid grid-cols-2 text-center border-b border-gray-100 bg-gray-50/50 text-xs font-bold select-none text-gray-400">
                <span className={`py-3 border-r border-gray-100 ${checkoutStep === 1 ? 'text-primary-brand bg-white' : ''}`}>1. Schedule</span>
                <span className={`py-3 ${checkoutStep === 2 ? 'text-primary-brand bg-white' : ''}`}>2. Attendee Details</span>
              </div>
            )}

            <div className="p-6 md:p-8">
              {checkoutStep === 1 && !selectedService.isDownloadable && (
                <div className="space-y-6">
                  <div>
                    <h4 className="font-headline text-xs font-bold text-gray-400 uppercase tracking-wider mb-3.5">Select a Session Date</h4>
                    <div className="grid grid-cols-3 gap-2 text-center select-none">
                      {dateOptions.map((item) => (
                        <button
                          key={item.dateNum}
                          type="button"
                          onClick={() => setSelectedDate(item.txt)}
                          className={`p-3 rounded-xl border transition-all text-xs cursor-pointer ${
                            selectedDate === item.txt
                              ? 'border-primary-brand bg-primary-brand/5 font-bold text-primary-brand'
                              : 'border-gray-200 hover:border-gray-300 text-gray-600'
                          }`}
                        >
                          <span className="block text-gray-400 font-semibold mb-0.5">{item.dayOfWeek}</span>
                          <span className="text-base font-extrabold">{item.dateNum}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-headline text-xs font-bold text-gray-400 uppercase tracking-wider mb-3.5">Select Available Hour (Your Timezone)</h4>
                    <div className="grid grid-cols-2 gap-2 select-none text-center text-xs font-bold">
                      {['10:00 AM', '11:45 AM', '2:00 PM', '4:15 PM'].map((time) => (
                        <button
                          key={time}
                          type="button"
                          onClick={() => setSelectedTime(time)}
                          className={`py-3 rounded-xl border transition-all ${
                            selectedTime === time
                              ? 'border-primary-brand bg-primary-brand/5 text-primary-brand'
                              : 'border-gray-200 hover:border-gray-300 text-gray-600'
                          }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>
                  <button onClick={handleDateTimeNext} className="w-full mt-6 py-3.5 bg-[#4f46e5] text-white font-bold rounded-xl hover:bg-primary-brand shadow-md shadow-indigo-100 transition-all cursor-pointer">Continue to Details</button>
                </div>
              )}

              {((checkoutStep === 2) || (checkoutStep === 1 && selectedService.isDownloadable)) && (
                <form onSubmit={handleFinalizeBooking} className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Your Full Name</label>
                    <input type="text" required value={clientName} onChange={(e) => setClientName(e.target.value)} placeholder="Jane Doe" className="w-full text-sm py-2.5 px-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-primary-brand focus:bg-white text-gray-800 transition-all font-semibold" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Your Email Address</label>
                    <input type="email" required value={clientEmail} onChange={(e) => setClientEmail(e.target.value)} placeholder="jane@company.com" className="w-full text-sm py-2.5 px-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-primary-brand focus:bg-white text-gray-800 transition-all font-semibold" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Notes or Questions (Optional)</label>
                    <textarea value={clientNotes} onChange={(e) => setClientNotes(e.target.value)} placeholder="What would you like to focus on during this session?" rows={3} className="w-full text-sm py-2.5 px-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-primary-brand focus:bg-white text-gray-800 transition-all font-medium resize-none"></textarea>
                  </div>
                  <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-xl text-[10px] text-success-vibrant leading-relaxed font-bold flex gap-2">
                    <span className="material-symbols-outlined text-base shrink-0 select-none">lock</span>
                    Secure sandboxed payments powered by Leap Skills. No real charge will occur during this preview.
                  </div>
                  <div className="flex gap-3 pt-4">
                    {!selectedService.isDownloadable && (
                      <button type="button" onClick={() => setCheckoutStep(1)} className="py-3 px-5 border border-gray-200 text-gray-600 font-bold rounded-xl text-xs hover:bg-gray-50 cursor-pointer">Back</button>
                    )}
                    <button type="submit" className="flex-1 py-3.5 bg-success-vibrant hover:bg-emerald-700 text-white font-bold rounded-xl shadow-md transition-all cursor-pointer">Complete Booking &mdash; Success</button>
                  </div>
                </form>
              )}

              {checkoutStep === 3 && (
                <div className="text-center py-6 space-y-6">
                  <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto text-success-vibrant border-4 border-emerald-100 shadow-sm animate-bounce">
                    <span className="material-symbols-outlined text-[32px] font-extrabold leading-none">done</span>
                  </div>
                  <div>
                    <h4 className="font-headline text-lg font-bold text-[#1a1c1c]">Booking Confirmed!</h4>
                    <p className="text-[#5f5e5e] text-xs mt-1.5 leading-relaxed">Your session with {creator.name} is successfully registered. A confirmation link and calendar invitation have been sent.</p>
                  </div>
                  <div className="bg-gray-50/50 border border-gray-200 text-xs p-4 rounded-xl text-left space-y-2 max-w-sm mx-auto font-medium">
                    <div className="flex justify-between"><span className="text-gray-400">Host:</span><span className="font-bold text-gray-800">{creator.name}</span></div>
                    <div className="flex justify-between"><span className="text-gray-400">Session/Service:</span><span className="font-bold text-gray-800">{selectedService.title}</span></div>
                    {!selectedService.isDownloadable ? (
                      <>
                        <div className="flex justify-between"><span className="text-gray-400">Date/Time:</span><span className="font-bold text-gray-800">{selectedDate} @ {selectedTime}</span></div>
                        <div className="flex justify-between"><span className="text-gray-400">Platform:</span><span className="font-semibold text-primary-brand uppercase text-[10px] bg-indigo-50 border border-indigo-100/50 px-2 py-0.5 rounded-full select-none flex items-center gap-1"><span className="material-symbols-outlined text-[12px] font-black">videocam</span>{selectedService.platform || 'Google Meet'}</span></div>
                      </>
                    ) : (
                      <div className="flex justify-between"><span className="text-gray-400">Asset File:</span><span className="text-success-vibrant font-bold flex items-center gap-0.5"><span className="material-symbols-outlined text-sm font-bold">check_circle</span>Ready to Download</span></div>
                    )}
                  </div>
                  <div className="pt-2 flex flex-col gap-2">
                    <button onClick={() => { handleCloseCheckout(); router.push('/dashboard'); }} className="w-full py-3 bg-primary-brand text-white font-bold rounded-xl shadow-md flex items-center justify-center gap-1.5 focus:outline-none cursor-pointer">
                      <span className="material-symbols-outlined text-[16px]">dashboard</span>
                      Go to Dashboard (View Upcoming Booking)
                    </button>
                    <button onClick={handleCloseCheckout} className="w-full py-2.5 text-gray-400 hover:text-gray-600 font-bold text-xs">Dismiss Window</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
