'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '../../../lib/supabase/client';
import { useAppStore } from '../../../store/app';

export default function TrainerOnboardingPage() {
  const router = useRouter();
  const supabase = createClient();
  const setUserRole = useAppStore((s) => s.setUserRole);

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Form State
  const [fullName, setFullName] = useState('');
  const [slug, setSlug] = useState('');
  const [headline, setHeadline] = useState('');
  const [bio, setBio] = useState('');
  const [category, setCategory] = useState('tech');
  const [skills, setSkills] = useState('React, System Design, TypeScript');
  const [experienceYears, setExperienceYears] = useState(5);
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [instagramHandle, setInstagramHandle] = useState('');
  const [hourlyRate, setHourlyRate] = useState(100);

  // Service State
  const [serviceTitle, setServiceTitle] = useState('1:1 Career & Architecture Guidance');
  const [serviceFormat, setServiceFormat] = useState<'one_on_one' | 'webinar' | 'cohort' | 'paid_dm'>('one_on_one');
  const [servicePrice, setServicePrice] = useState(75);
  const [serviceDuration, setServiceDuration] = useState(45);
  const [serviceDesc, setServiceDesc] = useState('Personalized guidance tailored to your technical career goals.');

  const handleSlugGen = (name: string) => {
    setFullName(name);
    if (!slug) {
      setSlug(name.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-'));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    try {
      const { data: { user } } = await supabase.auth.getUser();

      if (user) {
        // 1. Update user role
        await supabase.from('users').upsert({
          id: user.id,
          email: user.email!,
          full_name: fullName || user.user_metadata?.full_name || 'Creator',
          role: 'trainer',
        });

        // 2. Create trainer profile
        const { data: profile, error: profErr } = await supabase.from('trainer_profiles').upsert({
          user_id: user.id,
          profile_slug: slug || `user-${user.id.slice(0, 8)}`,
          headline,
          bio,
          expertise: skills.split(',').map((s) => s.trim()),
          experience_years: Number(experienceYears),
          linkedin_url: linkedinUrl,
          instagram_handle: instagramHandle,
          hourly_rate: Number(hourlyRate),
        }).select().single();

        if (profErr) throw profErr;

        // 3. Create initial service if profile created
        if (profile) {
          await supabase.from('services').insert({
            trainer_id: profile.id,
            title: serviceTitle,
            description: serviceDesc,
            format: serviceFormat,
            price: Number(servicePrice),
            duration_minutes: Number(serviceDuration),
            category,
          });
        }
      }

      setUserRole('instructor');
      router.push('/dashboard');
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || 'Onboarding failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-24 pb-16 px-4 flex items-center justify-center text-slate-900 dark:text-slate-100">
      <div className="w-full max-w-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-xl">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center text-xs font-bold text-slate-400 mb-2 uppercase tracking-wider">
            <span>Step {step} of 4</span>
            <span>{step === 1 ? 'Profile Basics' : step === 2 ? 'Expertise' : step === 3 ? 'First Offering' : 'Payouts & Publish'}</span>
          </div>
          <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-indigo-600 transition-all duration-300"
              style={{ width: `${(step / 4) * 100}%` }}
            />
          </div>
        </div>

        {errorMsg && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/40 border border-red-200 text-red-600 dark:text-red-300 text-sm rounded-xl">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {step === 1 && (
            <div className="space-y-5 animate-fade-in">
              <h2 className="text-2xl font-bold font-headline">Setup your Shareable Creator Profile</h2>
              <p className="text-sm text-slate-500">Your profile link will be the single URL you share with your audience.</p>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Full Name</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => handleSlugGen(e.target.value)}
                  placeholder="e.g. Alex Rivera"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Public Profile Handle / URL Slug</label>
                <div className="flex items-center rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 overflow-hidden">
                  <span className="px-4 text-xs text-slate-400 font-mono">creatorhub.pro/</span>
                  <input
                    type="text"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
                    placeholder="alexrivera"
                    required
                    className="w-full py-3 pr-4 bg-transparent text-sm font-semibold focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Headline</label>
                <input
                  type="text"
                  value={headline}
                  onChange={(e) => setHeadline(e.target.value)}
                  placeholder="e.g. Staff Engineer @ TechCorp | Ex-Google Advisor"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Bio / About You</label>
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Describe your background and how you can help clients..."
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm"
                />
              </div>

              <button
                type="button"
                onClick={() => setStep(2)}
                className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-sm transition-all"
              >
                Continue to Expertise &rarr;
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-5 animate-fade-in">
              <h2 className="text-2xl font-bold font-headline">Expertise & Social Links</h2>
              <p className="text-sm text-slate-500">Help clients discover your skill set and verify your background.</p>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm"
                >
                  <option value="tech">Software & AI Technology</option>
                  <option value="design">UI/UX Design & Product</option>
                  <option value="business">Business & Startup Consulting</option>
                  <option value="other">Career Coaching & Other</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Skills (comma separated)</label>
                <input
                  type="text"
                  value={skills}
                  onChange={(e) => setSkills(e.target.value)}
                  placeholder="React, Microservices, Security, Executive Prep"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Years of Experience</label>
                  <input
                    type="number"
                    value={experienceYears}
                    onChange={(e) => setExperienceYears(Number(e.target.value))}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Base Rate ($/hr equivalent)</label>
                  <input
                    type="number"
                    value={hourlyRate}
                    onChange={(e) => setHourlyRate(Number(e.target.value))}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">LinkedIn Profile URL</label>
                  <input
                    type="url"
                    value={linkedinUrl}
                    onChange={(e) => setLinkedinUrl(e.target.value)}
                    placeholder="https://linkedin.com/in/..."
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Instagram Handle (for Auto-DM)</label>
                  <input
                    type="text"
                    value={instagramHandle}
                    onChange={(e) => setInstagramHandle(e.target.value)}
                    placeholder="@alexrivera"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-6 py-3.5 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-semibold hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="flex-1 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-sm transition-all"
                >
                  Continue to First Offering &rarr;
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-5 animate-fade-in">
              <h2 className="text-2xl font-bold font-headline">Create Your First Monetization Offering</h2>
              <p className="text-sm text-slate-500">You can offer 1:1 sessions, live webinars, cohort courses, or paid direct messages.</p>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Monetization Format</label>
                <select
                  value={serviceFormat}
                  onChange={(e: any) => setServiceFormat(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm font-semibold"
                >
                  <option value="one_on_one">1:1 Private Consultation</option>
                  <option value="webinar">Live Group Webinar</option>
                  <option value="cohort">Cohort-based Multi-Session Course</option>
                  <option value="paid_dm">Priority Paid Direct Message (Async Q&A)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Service Title</label>
                <input
                  type="text"
                  value={serviceTitle}
                  onChange={(e) => setServiceTitle(e.target.value)}
                  placeholder="e.g. 1:1 Resume & Architecture Review"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Price ($ USD)</label>
                  <input
                    type="number"
                    value={servicePrice}
                    onChange={(e) => setServicePrice(Number(e.target.value))}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm"
                  />
                </div>
                {serviceFormat !== 'paid_dm' && (
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Duration (minutes)</label>
                    <input
                      type="number"
                      value={serviceDuration}
                      onChange={(e) => setServiceDuration(Number(e.target.value))}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm"
                    />
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Description</label>
                <textarea
                  value={serviceDesc}
                  onChange={(e) => setServiceDesc(e.target.value)}
                  placeholder="What will the client get out of this session?"
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-6 py-3.5 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-semibold hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={() => setStep(4)}
                  className="flex-1 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-sm transition-all"
                >
                  Continue to Payouts &rarr;
                </button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-5 animate-fade-in">
              <h2 className="text-2xl font-bold font-headline">Payout Setup & Confirmation</h2>
              <p className="text-sm text-slate-500">CreatorHub Pro uses instant Stripe Connect payouts. Platform fee is 0% on your first $1,000.</p>

              <div className="p-5 border border-indigo-200 dark:border-indigo-800/60 bg-indigo-50/50 dark:bg-indigo-950/40 rounded-2xl space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-xs">✓</div>
                  <div>
                    <div className="font-bold text-sm">Instant Stripe Connect Payout Rail</div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">Earnings automatically flow to your bank account with 0 platform delay.</div>
                  </div>
                </div>
              </div>

              <div className="p-4 border border-slate-200 dark:border-slate-800 rounded-2xl space-y-2">
                <div className="text-xs font-bold text-slate-400 uppercase">Profile Summary</div>
                <div className="text-sm font-bold">{fullName || 'Alex Rivera'}</div>
                <div className="text-xs font-mono text-indigo-600 dark:text-indigo-400">creatorhub.pro/{slug || 'username'}</div>
                <div className="text-xs text-slate-500">{serviceTitle} &bull; ${servicePrice}</div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="px-6 py-3.5 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-semibold hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-sm transition-all shadow-lg shadow-indigo-600/20 disabled:opacity-50"
                >
                  {loading ? 'Publishing Profile...' : 'Publish Profile & Go to Dashboard ✨'}
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
