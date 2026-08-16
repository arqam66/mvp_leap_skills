'use client';

import React, { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { Service, Creator, ServiceFormat } from '../../types';
import { getDateOptions, getFutureDate } from '../../utils/dates';
import { wsBookingService } from '../../lib/websocket';

interface BookingDrawerProps {
  service: Service | null;
  creator: Creator;
  error?: string | null;
  onClose: () => void;
  onConfirmBooking: (details: {
    service: Service;
    date?: string;
    time?: string;
    dateLabel?: string;
    timeLabel?: string;
    clientName: string;
    clientEmail: string;
    notes?: string;
    dmQuestion?: string;
  }) => void;
}

function to24Hour(time12: string): string {
  const match = time12.trim().match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
  if (!match) return time12;
  let hours = parseInt(match[1], 10);
  const minutes = match[2];
  const meridiem = match[3].toUpperCase();
  if (meridiem === 'PM' && hours !== 12) hours += 12;
  if (meridiem === 'AM' && hours === 12) hours = 0;
  return `${String(hours).padStart(2, '0')}:${minutes}`;
}

export default function BookingDrawer({
  service,
  creator,
  error,
  onClose,
  onConfirmBooking,
}: BookingDrawerProps) {
  const { user } = useUser();
  if (!service) return null;

  const format = service.format || (service.type as ServiceFormat) || 'one_on_one';
  const dateOptions = getDateOptions();

  const [selectedDate, setSelectedDate] = useState<string>(dateOptions[0]?.value || getFutureDate(2));
  const [selectedTime, setSelectedTime] = useState<string>('10:00 AM');
  const [clientName, setClientName] = useState(user?.fullName || '');
  const [clientEmail, setClientEmail] = useState(user?.primaryEmailAddress?.emailAddress || user?.emailAddresses?.[0]?.emailAddress || '');
  const [notes, setNotes] = useState('');
  const [dmQuestion, setDmQuestion] = useState('');
  const [wsConnected, setWsConnected] = useState(false);

  useEffect(() => {
    wsBookingService.connect();
    const unsubStatus = wsBookingService.subscribeStatus(setWsConnected);
    return () => unsubStatus();
  }, []);

  useEffect(() => {
    if (user) {
      if (!clientName && user.fullName) setClientName(user.fullName);
      const email = user.primaryEmailAddress?.emailAddress || user.emailAddresses?.[0]?.emailAddress;
      if (!clientEmail && email) setClientEmail(email);
    }
  }, [user]);

  const timeSlots = ['09:00 AM', '10:00 AM', '11:30 AM', '02:00 PM', '04:00 PM', '06:00 PM'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !clientEmail) return;

    const selectedDateOption = dateOptions.find((opt) => opt.value === selectedDate);
    const isPaidDM = format === 'paid_dm';

    onConfirmBooking({
      service,
      date: isPaidDM ? undefined : selectedDate,
      time: isPaidDM ? undefined : to24Hour(selectedTime),
      dateLabel: isPaidDM ? undefined : selectedDateOption?.txt || selectedDate,
      timeLabel: isPaidDM ? undefined : selectedTime,
      clientName,
      clientEmail,
      notes,
      dmQuestion: isPaidDM ? dmQuestion : undefined,
    });
  };

  return (
    <div className="fixed inset-0 z-[90] flex justify-end">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Drawer Content */}
      <div className="relative w-full max-w-lg bg-white border-l border-slate-200 h-full p-8 overflow-y-auto flex flex-col justify-between text-slate-900 shadow-2xl animate-fade-in">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-6 border-b border-slate-100 mb-6">
            <div>
              <span className="text-xs font-mono font-bold text-indigo-600 uppercase tracking-wider">
                {creator.name} &bull; {format.replace('_', ' ')}
              </span>
              <h2 className="text-xl font-bold font-headline mt-1">{service.title}</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-slate-100 text-slate-400 cursor-pointer"
            >
              ✕
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Format-specific slot or question compose */}
            {format === 'paid_dm' ? (
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  Your Priority Question / Request
                </label>
                <textarea
                  value={dmQuestion}
                  onChange={(e) => setDmQuestion(e.target.value)}
                  placeholder="Ask your detailed technical or career question here. The expert will respond within 24 hours."
                  rows={5}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white text-sm focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />
              </div>
            ) : (
              <>
                {/* Date Selection */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                    Select Available Date
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {dateOptions.slice(0, 6).map((opt) => (
                      <button
                        type="button"
                        key={opt.value}
                        onClick={() => setSelectedDate(opt.value)}
                        className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                          selectedDate === opt.value
                            ? 'border-indigo-600 bg-indigo-600 font-bold text-white shadow-sm'
                            : 'border-slate-200 bg-white hover:border-indigo-400'
                        }`}
                      >
                        <div className={`text-[10px] uppercase ${selectedDate === opt.value ? 'text-indigo-100' : 'text-slate-400'}`}>{opt.dayOfWeek}</div>
                        <div className="text-xs font-bold">{opt.txt}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Time Selection */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                    Select Time Slot ({service.duration || '45 mins'})
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {timeSlots.map((t) => (
                      <button
                        type="button"
                        key={t}
                        onClick={() => setSelectedTime(t)}
                        className={`py-2 px-3 rounded-xl border text-xs text-center transition-all cursor-pointer ${
                          selectedTime === t
                            ? 'border-indigo-600 bg-indigo-600 text-white font-bold'
                            : 'border-slate-200 bg-white hover:border-indigo-400'
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* Client Info */}
            <div className="space-y-4 pt-4 border-t border-slate-100">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">Your Information</h3>
              <div>
                <input
                  type="text"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder="Your Full Name"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white text-sm focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />
              </div>
              <div>
                <input
                  type="email"
                  value={clientEmail}
                  onChange={(e) => setClientEmail(e.target.value)}
                  placeholder="Your Email Address"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white text-sm focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />
              </div>
              <div>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Additional context or topics to cover (optional)..."
                  rows={2}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white text-sm focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />
              </div>
            </div>

            {error && (
              <div className="rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-sm font-semibold px-4 py-3">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-sm transition-all shadow-lg cursor-pointer"
            >
              Confirm 1:1 Session Booking &rarr;
            </button>
          </form>
        </div>

        <div className="pt-6 text-center text-xs text-slate-400 border-t border-slate-100">
          <div className="flex items-center justify-center gap-1.5 mb-1">
            <span className={`w-1.5 h-1.5 rounded-full ${wsConnected ? 'bg-emerald-500' : 'bg-amber-500'} animate-pulse`} />
            Real-Time WebSocket Booking Network {wsConnected ? 'Connected' : 'Connecting...'}
          </div>
          Instant confirmation &amp; auto-generated WebRTC meeting room
        </div>
      </div>
    </div>
  );
}
