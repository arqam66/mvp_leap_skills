'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser, SignIn, SignUp } from '@clerk/nextjs';
import { createClient } from '../../lib/supabase/client';
import { useAppStore } from '../../store/app';
import { UserRole, InstructorQuestionnaire } from '../../types';

export default function LoginPage() {
  const router = useRouter();
  const { isLoaded, isSignedIn, user } = useUser();
  const supabase = createClient();
  const setUserRole = useAppStore((s) => s.setUserRole);
  const setInstructorApplication = useAppStore((s) => s.setInstructorApplication);

  const [activeStep, setActiveStep] = useState<'auth' | 'role_select' | 'instructor_questions'>('auth');
  const [authMode, setAuthMode] = useState<'clerk' | 'custom'>('clerk');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      // User is authenticated via Clerk
      router.push('/dashboard');
    }
  }, [isLoaded, isSignedIn, router]);

  // Instructor Questionnaire state
  const [category, setCategory] = useState<'tech' | 'design' | 'business' | 'other'>('tech');
  const [title, setTitle] = useState('');
  const [org, setOrg] = useState('');
  const [yearsOfExperience, setYearsOfExperience] = useState('5+ years');
  const [bio, setBio] = useState('');
  const [primaryOfferingTitle, setPrimaryOfferingTitle] = useState('');
  const [startingPrice, setStartingPrice] = useState(75);

  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    try {
      if (isSignUp) {
        const { data, error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        if (data.user) setActiveStep('role_select');
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        if (data.user) router.push('/dashboard');
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Authentication error');
    } finally {
      setLoading(false);
    }
  };

  const handleSelectRole = (role: UserRole) => {
    if (role === 'instructor' || role === 'trainer') {
      router.push('/onboarding/trainer');
    } else {
      setUserRole('student');
      router.push('/explore');
    }
  };

  const handleInstructorSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const app: InstructorQuestionnaire = {
      category,
      title: title || 'Mentor & Technical Advisor',
      org: org || 'Independent Expert',
      yearsOfExperience,
      bio: bio || 'Passionate mentor helping professionals grow their skills.',
      primaryOfferingTitle: primaryOfferingTitle || '1:1 Mentorship Session',
      startingPrice: Number(startingPrice),
    };
    setInstructorApplication(app);
    setUserRole('instructor');
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center px-4 py-12 text-slate-900 dark:text-slate-100 pt-24">
      <div className="w-full max-w-2xl">
        <button
          type="button"
          onClick={() => router.push('/')}
          className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white mb-6 transition-colors cursor-pointer"
        >
          &larr; Back to Home
        </button>

        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden p-6 sm:p-10">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-indigo-600 text-white mb-4 shadow-sm font-bold">
              ⚡
            </div>
            <h1 className="font-headline text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white mb-2">
              {activeStep === 'auth' && (isSignUp ? 'Create CreatorHub Pro Account' : 'Sign In to CreatorHub Pro')}
              {activeStep === 'role_select' && 'Select Your Platform Role'}
              {activeStep === 'instructor_questions' && 'Instructor Application Questionnaire'}
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md mx-auto">
              {activeStep === 'auth' && 'Monetize your expertise from one single shareable link.'}
              {activeStep === 'role_select' && 'Choose whether you want to offer services as a trainer or book as a client.'}
            </p>
          </div>

          {errorMsg && (
            <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/40 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-300 text-xs rounded-xl">
              {errorMsg}
            </div>
          )}

          {activeStep === 'auth' && (
            <div className="flex flex-col items-center">
              {authMode === 'clerk' ? (
                <div className="w-full flex justify-center py-2">
                  {isSignUp ? (
                    <SignUp routing="hash" fallbackRedirectUrl="/dashboard" />
                  ) : (
                    <SignIn routing="hash" fallbackRedirectUrl="/dashboard" />
                  )}
                </div>
              ) : (
                <form onSubmit={handleAuthSubmit} className="space-y-4 w-full max-w-md mx-auto">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Email</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      required
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Password</label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      required
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-sm transition-all shadow-md cursor-pointer disabled:opacity-50"
                  >
                    {loading ? 'Processing...' : isSignUp ? 'Create Account & Continue' : 'Sign In'}
                  </button>
                </form>
              )}

              <div className="text-center pt-4 space-y-2">
                <button
                  type="button"
                  onClick={() => setIsSignUp(!isSignUp)}
                  className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer block mx-auto"
                >
                  {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
                </button>
                <button
                  type="button"
                  onClick={() => setAuthMode(authMode === 'clerk' ? 'custom' : 'clerk')}
                  className="text-[11px] text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 underline cursor-pointer"
                >
                  {authMode === 'clerk' ? 'Switch to Email/Password Mode' : 'Switch to Clerk Auth Mode'}
                </button>
              </div>
            </div>
          )}

          {activeStep === 'role_select' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => handleSelectRole('instructor')}
                  className="p-6 rounded-2xl border-2 border-indigo-200 dark:border-indigo-900/60 bg-indigo-50/50 dark:bg-indigo-950/20 hover:border-indigo-600 transition-all text-left group cursor-pointer"
                >
                  <h3 className="font-headline font-bold text-lg text-slate-900 dark:text-white mb-1">
                    Join as Trainer / Creator
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                    Create 1:1 consultation offerings, webinars, cohorts, and priority paid DMs with instant payouts.
                  </p>
                  <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">
                    Setup Trainer Profile &rarr;
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => handleSelectRole('student')}
                  className="p-6 rounded-2xl border-2 border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 hover:border-slate-400 transition-all text-left group cursor-pointer"
                >
                  <h3 className="font-headline font-bold text-lg text-slate-900 dark:text-white mb-1">
                    Join as Client / Student
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                    Browse experts, ask priority questions, book webinars and 1:1 sessions.
                  </p>
                  <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                    Browse Mentors &rarr;
                  </span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
