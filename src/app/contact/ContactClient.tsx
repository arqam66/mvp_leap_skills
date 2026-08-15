'use client';

import React from 'react';
import { z } from 'zod';

const contactSchema = z.object({
  name: z.string().trim().min(2, 'Name must be at least 2 characters').max(100, 'Name is too long'),
  email: z.string().trim().email('Please enter a valid email address').max(200, 'Email is too long'),
  subject: z.enum(['general', 'billing', 'booking', 'customization']),
  message: z
    .string()
    .trim()
    .min(10, 'Message must be at least 10 characters')
    .max(3000, 'Message must be under 3000 characters'),
});

type FormErrors = Partial<Record<keyof z.infer<typeof contactSchema>, string>>;

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
    <div className="flex items-center justify-between gap-3 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm group hover:border-indigo-300 dark:hover:border-indigo-700 transition-colors">
      <div className="flex items-center gap-3.5 min-w-0">
        <span className="w-11 h-11 shrink-0 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
          <span className="material-symbols-outlined text-[22px]">{icon}</span>
        </span>
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

const inputClasses =
  'w-full text-sm py-3 px-4 border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:border-indigo-600 dark:focus:border-indigo-400 focus:ring-2 focus:ring-indigo-600/10 focus:outline-none rounded-xl transition-colors';

export default function ContactClient() {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [subject, setSubject] = React.useState('general');
  const [message, setMessage] = React.useState('');
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const [errors, setErrors] = React.useState<FormErrors>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = contactSchema.safeParse({ name, email, subject, message });
    if (!result.success) {
      const fieldErrors: FormErrors = {};
      for (const issue of result.error.issues) {
        const key = issue.path[0] as keyof FormErrors;
        if (key && !fieldErrors[key]) fieldErrors[key] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 pt-[104px] pb-20 px-6">
      <div className="max-w-5xl mx-auto space-y-10">
        {/* Header */}
        <div className="text-center space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/50 text-[11px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">
            <span className="material-symbols-outlined text-[15px]">support_agent</span>
            Support Center
          </span>
          <h1 className="font-headline text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white">
            We are here to help
          </h1>
          <p className="text-sm md:text-base text-slate-600 dark:text-slate-400 font-sans max-w-lg mx-auto">
            Need help managing bookings, configuring payments, or scheduling calls? Reach out directly or send us a ticket below.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
          {/* Direct Contact Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <h2 className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px]">contact_phone</span>
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
                value="info@leapskills.sbs"
                href="mailto:info@leapskills.sbs"
              />

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-3">
                <h3 className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                  Response Time
                </h3>
                <div className="flex items-center gap-2.5 text-xs font-semibold text-slate-700 dark:text-slate-300">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                  Within 1–2 business hours
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  Our support engineers review every ticket and respond as quickly as possible during business hours.
                </p>
              </div>
            </div>
          </div>

          {/* Ticket Form */}
          <div className="lg:col-span-3">
            {isSubmitted ? (
              <div className="p-8 sm:p-12 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 shadow-md text-center space-y-5 animate-fade-in">
                <div className="w-14 h-14 bg-emerald-50 dark:bg-emerald-950/40 rounded-full flex items-center justify-center mx-auto text-emerald-600 dark:text-emerald-400 border-4 border-emerald-100 dark:border-emerald-900/50">
                  <span className="material-symbols-outlined text-[28px] font-bold">check_circle</span>
                </div>
                <div className="space-y-1.5">
                  <h3 className="font-headline text-xl font-bold text-slate-900 dark:text-white">Support Ticket Created</h3>
                  <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed max-w-sm mx-auto">
                    Thank you! Our support engineers have received your inquiry. We will contact you at{' '}
                    <span className="font-semibold text-slate-700 dark:text-slate-300">{email}</span> within 1–2 business hours.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setIsSubmitted(false);
                    setName('');
                    setEmail('');
                    setMessage('');
                    setErrors({});
                  }}
                  className="px-6 py-2.5 bg-slate-950 dark:bg-indigo-600 text-white font-bold text-xs rounded-xl shadow-md hover:bg-slate-800 dark:hover:bg-indigo-500 transition-all cursor-pointer"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 shadow-md space-y-5">
                <div className="flex items-center gap-2 pb-1">
                  <span className="material-symbols-outlined text-slate-400 text-[20px]">mail</span>
                  <h2 className="font-headline text-sm font-bold text-slate-900 dark:text-white">Send us a ticket</h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Your Name</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
                      }}
                      placeholder="John Doe"
                      className={`${inputClasses} ${errors.name ? 'border-red-400 dark:border-red-500 focus:ring-red-500/10' : ''}`}
                    />
                    {errors.name && <p className="text-[11px] font-semibold text-red-500">{errors.name}</p>}
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Your Email</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                      }}
                      placeholder="you@example.com"
                      className={`${inputClasses} ${errors.email ? 'border-red-400 dark:border-red-500 focus:ring-red-500/10' : ''}`}
                    />
                    {errors.email && <p className="text-[11px] font-semibold text-red-500">{errors.email}</p>}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Topic</label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className={inputClasses}
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
                    onChange={(e) => {
                      setMessage(e.target.value);
                      if (errors.message) setErrors((prev) => ({ ...prev, message: undefined }));
                    }}
                    placeholder="Describe your issue or question in detail..."
                    className={`${inputClasses} resize-none ${errors.message ? 'border-red-400 dark:border-red-500 focus:ring-red-500/10' : ''}`}
                  />
                  {errors.message && <p className="text-[11px] font-semibold text-red-500">{errors.message}</p>}
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-bold rounded-xl shadow-md transition-all cursor-pointer"
                >
                  Submit Ticket
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
