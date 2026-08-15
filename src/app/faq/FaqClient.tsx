'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

interface FaqItem {
  question: string;
  answer: string;
  category: 'bookings' | 'payouts' | 'storefront';
}

const FAQ_ITEMS: FaqItem[] = [
  {
    category: 'bookings',
    question: 'How do client bookings synchronize with my calendar?',
    answer: 'Leap Skills offers direct 2-way Google Calendar synchronization. Once connected, booking slots are cross-referenced with your real-time calendar so clients only see your actual availability. Video meeting URLs are automatically generated and sent to both parties.',
  },
  {
    category: 'bookings',
    question: 'Can I cancel or reschedule a scheduled consultation?',
    answer: 'Yes. You can manage and reschedule bookings directly from your Command Center dashboard. Cancelling a confirmed booking will trigger an automatic full refund to the client via Stripe.',
  },
  {
    category: 'bookings',
    question: 'Do clients need a Zoom account for video calls?',
    answer: 'No. Leap Skills generates WebRTC browser-based video call links automatically with each booking. Neither the creator nor the client needs a Zoom account or any third-party video application.',
  },
  {
    category: 'payouts',
    question: 'What platform fees does Leap Skills charge?',
    answer: 'We charge zero platform commission fees on the first $1,000 you earn. After that, a flat 2.5% platform fee is applied to bookings. Standard Stripe card processing fees (~2.9% + $0.30) also apply.',
  },
  {
    category: 'payouts',
    question: 'How long do direct payouts take to reach my bank account?',
    answer: 'Since we use Stripe Connect, client payments are cleared and deposited directly to your bank account within 5–10 minutes. There are no intermediary escrow holds or payout delays.',
  },
  {
    category: 'storefront',
    question: 'Can I add custom services or digital download packs?',
    answer: 'Absolutely. In your dashboard, you can list 1:1 strategy consultations, async reviews, or digital file downloads (like templates, PDFs, or software). You define the duration, price, platform, and instructions.',
  },
  {
    category: 'storefront',
    question: 'How do I toggle Dark Mode or retro styling on my storefront?',
    answer: 'Your client-facing storefront inherits theme selections automatically. You can toggle Light and Dark modes in the header. The system is designed to look premium in all modes with high-contrast font typography.',
  },
];

export default function FaqClient() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 pt-[104px] pb-20 px-6">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="space-y-3 text-center md:text-left">
          <h1 className="font-headline text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white">
            FAQs &amp; Help Center
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 font-sans">
            Find answers to common questions about direct payouts, custom storefronts, and calendar scheduling.
          </p>
        </div>

        {/* FAQ Cards */}
        <div className="space-y-3">
          {FAQ_ITEMS.map((faq) => (
            <div
              key={faq.question}
              className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 rounded-2xl overflow-hidden shadow-sm"
              itemScope
              itemType="https://schema.org/Question"
            >
              <div className="px-6 py-4.5 flex items-start gap-3">
                <span className="material-symbols-outlined text-indigo-500 dark:text-indigo-400 text-[20px] shrink-0 mt-0.5">
                  help
                </span>
                <h2 className="font-headline font-semibold text-sm text-slate-950 dark:text-slate-100 pr-4" itemProp="name">
                  {faq.question}
                </h2>
              </div>
              <div
                className="px-6 pb-5 pt-0 text-xs md:text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-sans"
                itemScope
                itemType="https://schema.org/Answer"
                itemProp="acceptedAnswer"
              >
                <span itemProp="text">{faq.answer}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Dynamic Help CTA */}
        <div className="p-6 rounded-2xl bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-100/50 dark:border-indigo-900/40 text-center space-y-3 max-w-lg mx-auto">
          <h4 className="font-headline text-sm font-bold text-indigo-950 dark:text-indigo-200">
            Still have questions? We are here to help
          </h4>
          <p className="text-xs text-indigo-850 dark:text-indigo-300 leading-relaxed font-sans max-w-sm mx-auto">
            If you could not find the answer in our documentation, open a support ticket to talk to our engineers.
          </p>
          <button
            onClick={() => router.push('/contact')}
            className="px-5 py-2.5 bg-indigo-650 hover:bg-indigo-600 text-white font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer"
          >
            Open Support Ticket
          </button>
        </div>
      </div>
    </div>
  );
}
