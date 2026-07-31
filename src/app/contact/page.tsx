'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

function CopyableContact({
  icon,
  label,
  value,
  href,
}: {
  icon: string;
  label: string;
  value: string;
  href?: string;
}) {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback for older browsers
      const el = document.createElement('textarea');
      el.value = value;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="flex items-center justify-between gap-3 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/50 group">
      <div className="flex items-center gap-3 min-w-0">
        <span className="material-symbols-outlined text-indigo-500 dark:text-indigo-400 text-[22px] shrink-0">{icon}</span>
        <div className="min-w-0">
          <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">{label}</p>
          {href ? (
            <a
              href={href}
              className="text-sm font-semibold text-slate-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors truncate block"
            >
              {value}
            </a>
          ) : (
            <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">{value}</p>
          )}
        </div>
      </div>
      <button
        onClick={handleCopy}
        title="Copy to clipboard"
        className="shrink-0 flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-500 dark:text-slate-400 hover:border-indigo-400 dark:hover:border-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400"
      >
        <span className="material-symbols-outlined text-[15px]">
          {copied ? 'check' : 'content_copy'}
        </span>
        {copied ? 'Copied!' : 'Copy'}
      </button>
    </div>
  );
}

export default function ContactPage() {
  const router = useRouter();
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [subject, setSubject] = React.useState('general');
  const [message, setMessage] = React.useState('');
  const [isSubmitted, setIsSubmitted] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 pt-[104px] pb-20 px-6">
      <div className="max-w-xl mx-auto space-y-8">
        <div className="space-y-3 text-center md:text-left">
          <h1 className="font-headline text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white">
            Contact Support
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 font-sans">
            Need help managing bookings, configuring payments, or scheduling calls? Reach out directly or fill in a ticket below.
          </p>
        </div>

        {/* Direct Contact Info */}
        <div className="space-y-3">
          <h2 className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
            Direct Contact
          </h2>
          <CopyableContact
            icon="call"
            label="Phone"
            value="03131203615"
            href="tel:03131203615"
          />
          <CopyableContact
            icon="alternate_email"
            label="Email"
            value="leapskills.sbs"
            href="mailto:leapskills.sbs"
          />
        </div>

        {/* Divider */}
        <div className="flex items-center gap-3">
          <div className="flex-1 h-px bg-slate-200 dark:bg-slate-800" />
          <span className="text-xs text-slate-400 dark:text-slate-600 font-semibold">or send a ticket</span>
          <div className="flex-1 h-px bg-slate-200 dark:bg-slate-800" />
        </div>

        {isSubmitted ? (
          <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 shadow-md text-center space-y-5 animate-fade-in">
            <div className="w-12 h-12 bg-emerald-50 dark:bg-emerald-950/40 rounded-full flex items-center justify-center mx-auto text-emerald-600 dark:text-emerald-400 border-4 border-emerald-100 dark:border-emerald-900/50">
              <span className="material-symbols-outlined text-[24px] font-bold">check_circle</span>
            </div>
            <div className="space-y-1.5">
              <h3 className="font-headline text-lg font-bold text-slate-900 dark:text-white">Support Ticket Created</h3>
              <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed max-w-sm mx-auto">
                Thank you! Our support engineers have received your inquiry. We will contact you at <span className="font-semibold text-slate-700 dark:text-slate-300">{email}</span> within 1–2 business hours.
              </p>
            </div>
            <button
              onClick={() => {
                setIsSubmitted(false);
                setName('');
                setEmail('');
                setMessage('');
              }}
              className="px-5 py-2.5 bg-slate-950 dark:bg-indigo-600 text-white font-bold text-xs rounded-xl shadow-md hover:bg-slate-800 dark:hover:bg-indigo-500 transition-all cursor-pointer"
            >
              Send Another Message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 shadow-md space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Your Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full text-xs font-semibold py-3 px-4 border border-slate-200 dark:border-slate-850 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 focus:border-indigo-600 dark:focus:border-indigo-400 focus:outline-none rounded-xl"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Your Email</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full text-xs font-semibold py-3 px-4 border border-slate-200 dark:border-slate-850 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 focus:border-indigo-600 dark:focus:border-indigo-400 focus:outline-none rounded-xl"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Topic</label>
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full text-xs font-semibold py-3 px-4 border border-slate-200 dark:border-slate-850 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 focus:border-indigo-600 dark:focus:border-indigo-400 focus:outline-none rounded-xl"
              >
                <option value="general">General Inquiry</option>
                <option value="billing">Payout &amp; Billing Issues</option>
                <option value="booking">Booking / Scheduling Errors</option>
                <option value="customization">Storefront Customization Help</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Your Message</label>
              <textarea
                required
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Describe your issue or question in detail..."
                className="w-full text-xs font-semibold py-3 px-4 border border-slate-200 dark:border-slate-850 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 focus:border-indigo-600 dark:focus:border-indigo-400 focus:outline-none rounded-xl resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl shadow-md transition-all cursor-pointer"
            >
              Submit Ticket
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
