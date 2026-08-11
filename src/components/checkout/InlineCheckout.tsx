'use client';

import React, { useState } from 'react';
import { Service, Creator } from '../../types';

interface InlineCheckoutProps {
  service: Service;
  creator: Creator;
  bookingDetails: {
    date?: string;
    time?: string;
    clientName: string;
    clientEmail: string;
    notes?: string;
    dmQuestion?: string;
  };
  onSuccess: (bookingId: string) => void;
  onCancel: () => void;
}

export default function InlineCheckout({
  service,
  creator,
  bookingDetails,
  onSuccess,
  onCancel,
}: InlineCheckoutProps) {
  const [loading, setLoading] = useState(false);
  const [cardNumber, setCardNumber] = useState('');
  const [expDate, setExpDate] = useState('');
  const [cvc, setCvc] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'upi'>('card');
  const [upiId, setUpiId] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const platformCommissionRate = 0.1; // 10%
  const commission = Number((service.price * platformCommissionRate).toFixed(2));
  const trainerEarnings = Number((service.price - commission).toFixed(2));

  const handlePay = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    try {
      // 1. Trigger Payment Intent
      const res = await fetch('/api/payments/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: service.price,
          serviceTitle: service.title,
          clientEmail: bookingDetails.clientEmail,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Payment failed');

      // 2. Submit booking to backend
      const bookingRes = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          creatorId: creator.id,
          serviceId: service.id,
          date: bookingDetails.date,
          time: bookingDetails.time,
          clientName: bookingDetails.clientName,
          clientEmail: bookingDetails.clientEmail,
          notes: bookingDetails.notes,
          format: service.format || service.type || 'one_on_one',
          dmQuestion: bookingDetails.dmQuestion,
        }),
      });

      const bookingData = await bookingRes.json();
      if (!bookingRes.ok) throw new Error(bookingData.error || 'Failed to save booking');

      onSuccess(bookingData.booking?.id || `bk_${Math.random().toString(36).substring(2, 9)}`);
    } catch (err: any) {
      setErrorMsg(err.message || 'Payment processing error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-xl max-w-lg mx-auto text-slate-900 dark:text-slate-100">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 mb-6">
        <div>
          <span className="text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
            Inline Checkout &bull; No Redirect
          </span>
          <h2 className="text-xl font-bold font-headline mt-0.5">Complete Payment</h2>
        </div>
        <button onClick={onCancel} className="text-sm font-semibold text-slate-400 hover:text-slate-600 cursor-pointer">
          Cancel
        </button>
      </div>

      {errorMsg && (
        <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/40 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-300 text-xs rounded-xl">
          {errorMsg}
        </div>
      )}

      {/* Summary Box */}
      <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl mb-6 space-y-2 border border-slate-100 dark:border-slate-800">
        <div className="flex justify-between items-center text-sm font-bold">
          <span>{service.title}</span>
          <span className="font-mono text-base">${service.price}</span>
        </div>
        <div className="text-xs text-slate-500">
          Instructor: <span className="font-semibold text-slate-700 dark:text-slate-200">{creator.name}</span>
        </div>
        {bookingDetails.date && (
          <div className="text-xs text-slate-500">
            Schedule: {bookingDetails.date} @ {bookingDetails.time}
          </div>
        )}
        <div className="pt-2 border-t border-slate-200 dark:border-slate-700 flex justify-between text-xs text-slate-400">
          <span>Instant Payout Rail: Commission (10%) ${commission}</span>
          <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Net Payout to Expert ${trainerEarnings}</span>
        </div>
      </div>

      {/* Payment Method Selector */}
      <div className="flex gap-2 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl mb-6">
        <button
          type="button"
          onClick={() => setPaymentMethod('card')}
          className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
            paymentMethod === 'card'
              ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          Credit / Debit Card (Stripe)
        </button>
        <button
          type="button"
          onClick={() => setPaymentMethod('upi')}
          className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
            paymentMethod === 'upi'
              ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          UPI Instant Rail (India)
        </button>
      </div>

      <form onSubmit={handlePay} className="space-y-4">
        {paymentMethod === 'card' ? (
          <>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Card Number</label>
              <input
                type="text"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                placeholder="4242 &bull;&bull;&bull;&bull; &bull;&bull;&bull;&bull; 4242"
                required
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm font-mono"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Expires (MM/YY)</label>
                <input
                  type="text"
                  value={expDate}
                  onChange={(e) => setExpDate(e.target.value)}
                  placeholder="12/28"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm font-mono"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">CVC / CVV</label>
                <input
                  type="password"
                  value={cvc}
                  onChange={(e) => setCvc(e.target.value)}
                  placeholder="123"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm font-mono"
                />
              </div>
            </div>
          </>
        ) : (
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">VPA / UPI ID</label>
            <input
              type="text"
              value={upiId}
              onChange={(e) => setUpiId(e.target.value)}
              placeholder="user@upi or mobile@paytm"
              required
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm font-mono"
            />
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-sm transition-all shadow-lg cursor-pointer disabled:opacity-50 mt-2"
        >
          {loading ? 'Processing Payment...' : `Pay $${service.price} & Confirm Booking`}
        </button>
      </form>
    </div>
  );
}
