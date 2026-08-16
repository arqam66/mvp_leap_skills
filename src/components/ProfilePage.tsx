'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppStore } from '../store/app';
import { Creator, Service } from '../types';
import { CREATORS, CREATOR_SERVICES } from '../data/creators';
import { wsBookingService } from '../lib/websocket';
import ServiceCard from './services/ServiceCard';
import BookingDrawer from './services/BookingDrawer';

interface ProfilePageProps {
  slug: string;
}

export default function ProfilePage({ slug }: ProfilePageProps) {
  const router = useRouter();
  const setSelectedCreator = useAppStore((s) => s.setSelectedCreator);

  const creator = useMemo(() => CREATORS.find((c) => c.id === slug || c.slug === slug) || CREATORS[0], [slug]);
  const services = creator ? (CREATOR_SERVICES[creator.id] || []) : [];

  const [activeDrawerService, setActiveDrawerService] = useState<Service | null>(null);
  const [confirmedBookingId, setConfirmedBookingId] = useState<string | null>(null);
  const [confirmedDetails, setConfirmedDetails] = useState<any>(null);
  const [isBooking, setIsBooking] = useState(false);
  const [bookingError, setBookingError] = useState<string | null>(null);

  useEffect(() => {
    if (creator) setSelectedCreator(creator);
  }, [creator, setSelectedCreator]);

  useEffect(() => {
    wsBookingService.connect();
    const unsub = wsBookingService.subscribeMessage((payload) => {
      if (payload.type === 'BOOKING_CONFIRMED' && payload.id) {
        setConfirmedBookingId((prev) => prev || payload.id || '');
        setIsBooking(false);
      }
    });
    return () => unsub();
  }, []);

  if (!creator) {
    return (
      <div className="pt-[115px] pb-24 max-w-7xl mx-auto px-4 text-center">
        <h1 className="font-headline text-3xl font-extrabold mb-4">Creator Not Found</h1>
        <button onClick={() => router.push('/explore')} className="px-6 py-3 bg-indigo-600 text-white font-bold rounded-xl">Browse Mentors</button>
      </div>
    );
  }

  const handleConfirmBooking = async (details: any) => {
    setIsBooking(true);
    setBookingError(null);
    setConfirmedDetails(details);

    // 1. Broadcast booking over the real-time WebSocket network
    wsBookingService.sendBookingRequest({
      creatorId: creator.id,
      creatorName: creator.name,
      serviceTitle: details.service.title,
      clientName: details.clientName,
      clientEmail: details.clientEmail,
      date: details.date || '',
      time: details.time || '',
    });

    // 2. Persist booking to the backend
    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          creatorId: creator.id,
          serviceId: details.service.id,
          date: details.date,
          time: details.time,
          clientName: details.clientName,
          clientEmail: details.clientEmail,
          notes: details.notes,
          format: details.service.format || details.service.type || 'one_on_one',
          dmQuestion: details.dmQuestion,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to save booking');

      setConfirmedBookingId(data.booking?.id || `bk_${Math.random().toString(36).substring(2, 9)}`);
      setActiveDrawerService(null);
    } catch (err: any) {
      setBookingError(err.message || 'Booking failed. Please try again.');
      setIsBooking(false);
    }
  };

  const handleJoinMeeting = () => {
    if (confirmedBookingId) {
      router.push(`/meeting/${confirmedBookingId}`);
    }
  };

  return (
    <div className="pt-[115px] pb-24 max-w-7xl mx-auto px-4 md:px-10 text-slate-900 dark:text-slate-100">
      {/* Top Bar Navigation */}
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={() => router.push('/explore')}
          className="flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-indigo-600 transition-all bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-4 py-2 rounded-xl cursor-pointer"
        >
          &larr; Back to Mentors
        </button>
        <div className="text-xs font-mono text-slate-400 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700">
          Single Shareable Profile Link: <span className="text-indigo-600 dark:text-indigo-400 font-bold">creatorhub.pro/{creator.id}</span>
        </div>
      </div>

      {/* Main Profile Header */}
      <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden mb-10">
        <div className="flex flex-col md:flex-row gap-8 items-center md:items-start text-center md:text-left">
          <img
            alt={creator.name}
            className="w-32 h-32 md:w-36 md:h-36 rounded-3xl object-cover border-4 border-white dark:border-slate-800 shadow-md shrink-0"
            src={creator.image}
          />
          <div className="flex-1 space-y-3">
            <div className="flex items-center justify-center md:justify-start gap-2">
              {creator.verified && (
                <span className="bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400 text-xs font-extrabold px-3 py-1 rounded-full uppercase">
                  ✓ Verified Creator
                </span>
              )}
              <span className="bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 text-xs font-bold px-3 py-1 rounded-full uppercase">
                ⚡ Real-Time Booking Enabled
              </span>
            </div>

            <h1 className="font-headline text-3xl md:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight">
              {creator.name}
            </h1>
            <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">{creator.title} &bull; {creator.org}</p>
            <p className="text-sm text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">{creator.bio}</p>

            <div className="flex items-center justify-center md:justify-start gap-6 pt-2 text-xs font-semibold text-slate-500">
              <div><span className="font-extrabold text-slate-900 dark:text-white text-base">★ {creator.rating}</span> ({creator.reviewCount} reviews)</div>
              <div><span className="font-extrabold text-slate-900 dark:text-white text-base">{creator.menteesCount || '120+'}</span> Clients Helped</div>
              <div><span className="font-extrabold text-slate-900 dark:text-white text-base">{creator.reachCount || '10k+'}</span> Audience</div>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Banner */}
      {confirmedBookingId && (
        <div className="mb-10 p-6 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/80 rounded-3xl text-emerald-900 dark:text-emerald-200 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="font-bold text-lg">🎉 Booking Confirmed! ID: {confirmedBookingId}</h3>
            <p className="text-sm text-emerald-700 dark:text-emerald-300">
              Confirmed in real-time over the WebSocket network.
              {confirmedDetails?.date ? ` Your 1:1 session is scheduled for ${confirmedDetails.date} @ ${confirmedDetails.time}.` : ''}
              A WebRTC meeting room has been auto-generated.
            </p>
            {bookingError && <p className="text-xs text-rose-600 mt-1">{bookingError}</p>}
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <button
              onClick={handleJoinMeeting}
              className="px-6 py-3 bg-emerald-600 text-white font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-emerald-500 transition-all cursor-pointer"
            >
              Join Video Meeting &rarr;
            </button>
            <button
              onClick={() => router.push('/dashboard')}
              className="px-6 py-3 bg-white dark:bg-slate-800 text-emerald-700 dark:text-emerald-300 font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-emerald-50 dark:hover:bg-slate-700 transition-all border border-emerald-200 dark:border-emerald-800 cursor-pointer"
            >
              View in Dashboard &rarr;
            </button>
          </div>
        </div>
      )}

      {isBooking && (
        <div className="mb-10 p-4 bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800/60 rounded-2xl text-indigo-700 dark:text-indigo-300 text-sm font-semibold flex items-center gap-3">
          <span className="w-4 h-4 rounded-full border-2 border-indigo-500 border-t-transparent animate-spin" />
          Booking your 1:1 session over the real-time network...
        </div>
      )}

      {/* Offerings Grid */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="font-headline text-2xl font-bold text-slate-950 dark:text-white">
            Available Offerings & Services
          </h2>
          <span className="text-xs font-mono text-slate-500 font-semibold">{services.length} Formats Available</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s) => (
            <ServiceCard
              key={s.id}
              service={s}
              onBook={(selected) => setActiveDrawerService(selected)}
            />
          ))}
        </div>
      </div>

      {/* Booking Drawer */}
      <BookingDrawer
        service={activeDrawerService}
        creator={creator}
        onClose={() => setActiveDrawerService(null)}
        onConfirmBooking={handleConfirmBooking}
      />
    </div>
  );
}
