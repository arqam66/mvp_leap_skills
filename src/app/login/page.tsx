'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { SignIn, useUser } from '@clerk/nextjs';
import { useAppStore } from '../../store/app';
import { UserRole, InstructorQuestionnaire } from '../../types';

export default function LoginPage() {
  const router = useRouter();
  const { isLoaded, isSignedIn, user } = useUser();
  const userRole = useAppStore((s) => s.userRole);
  const setUserRole = useAppStore((s) => s.setUserRole);
  const setInstructorApplication = useAppStore((s) => s.setInstructorApplication);

  const [activeStep, setActiveStep] = useState<'auth' | 'role_select' | 'instructor_questions'>('auth');
  const [selectedRole, setSelectedRole] = useState<UserRole>('student');

  // Instructor Questionnaire state
  const [category, setCategory] = useState<'tech' | 'design' | 'business' | 'other'>('tech');
  const [title, setTitle] = useState('');
  const [org, setOrg] = useState('');
  const [yearsOfExperience, setYearsOfExperience] = useState('5+ years');
  const [bio, setBio] = useState('');
  const [primaryOfferingTitle, setPrimaryOfferingTitle] = useState('');
  const [startingPrice, setStartingPrice] = useState(75);

  const handleSelectRole = (role: UserRole) => {
    setSelectedRole(role);
    if (role === 'instructor') {
      setActiveStep('instructor_questions');
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
        {/* Navigation back */}
        <button
          type="button"
          onClick={() => router.push('/')}
          className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white mb-6 transition-colors focus:outline-none cursor-pointer"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Back to Home
        </button>

        {/* Card Container */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden p-6 sm:p-10">
          
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 mb-4">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
              </svg>
            </div>
            <h1 className="font-headline text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white mb-2">
              {activeStep === 'auth' && 'Sign In to Leap Skills'}
              {activeStep === 'role_select' && 'Select Your Platform Role'}
              {activeStep === 'instructor_questions' && 'Instructor Application Questionnaire'}
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md mx-auto">
              {activeStep === 'auth' && 'Access real-time mentor bookings, direct questions, and store features.'}
              {activeStep === 'role_select' && 'Choose whether you want to teach as an instructor or learn as a student.'}
              {activeStep === 'instructor_questions' && 'Answer a few quick questions so mentees can discover your expertise.'}
            </p>
          </div>

          {/* STEP 1: Authentication */}
          {activeStep === 'auth' && (
            <div className="space-y-6 flex flex-col items-center">
              <div className="w-full flex justify-center">
                <SignIn
                  routing="hash"
                  appearance={{
                    elements: {
                      card: 'bg-transparent shadow-none border-0 p-0',
                      headerTitle: 'hidden',
                      headerSubtitle: 'hidden',
                      footerAction: 'hidden',
                    },
                  }}
                />
              </div>

              <div className="w-full pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Ready to configure your platform role?
                </p>
                <button
                  type="button"
                  onClick={() => setActiveStep('role_select')}
                  className="w-full sm:w-auto px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold rounded-xl transition-all shadow-sm cursor-pointer"
                >
                  Continue to Role Selection &rarr;
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Role Selection */}
          {activeStep === 'role_select' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Instructor Card */}
                <button
                  type="button"
                  onClick={() => handleSelectRole('instructor')}
                  className="p-6 rounded-2xl border-2 border-indigo-200 dark:border-indigo-900/60 bg-indigo-50/50 dark:bg-indigo-950/20 hover:border-indigo-600 dark:hover:border-indigo-500 transition-all text-left flex flex-col justify-between group cursor-pointer"
                >
                  <div>
                    <div className="w-10 h-10 rounded-lg bg-indigo-600 text-white flex items-center justify-center mb-4 shadow-xs">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0112 20.055a11.952 11.952 0 01-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                      </svg>
                    </div>
                    <h3 className="font-headline font-bold text-lg text-slate-900 dark:text-white mb-1">
                      Join as Instructor
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                      Create 1:1 mentorship offerings, answer student inquiries, set availability, and manage earnings.
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-indigo-600 dark:text-indigo-400 group-hover:translate-x-1 transition-transform">
                    Fill Instructor Questionnaire &rarr;
                  </span>
                </button>

                {/* Student Card */}
                <button
                  type="button"
                  onClick={() => handleSelectRole('student')}
                  className="p-6 rounded-2xl border-2 border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 hover:border-slate-400 dark:hover:border-slate-700 transition-all text-left flex flex-col justify-between group cursor-pointer"
                >
                  <div>
                    <div className="w-10 h-10 rounded-lg bg-emerald-600 text-white flex items-center justify-center mb-4 shadow-xs">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <h3 className="font-headline font-bold text-lg text-slate-900 dark:text-white mb-1">
                      Join as Student
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                      Explore mentors, ask questions, and book 1:1 real-time meeting sessions.
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 dark:text-emerald-400 group-hover:translate-x-1 transition-transform">
                    Enter as Student &rarr;
                  </span>
                </button>
              </div>

              {/* Student Authorization Restriction Notice */}
              <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 flex items-start gap-3">
                <svg className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div className="text-xs text-amber-800 dark:text-amber-300 leading-relaxed">
                  <strong>Role &amp; Permission Notice:</strong> Students can join sessions, ask questions, and book meetings over WebSockets with other mentors. <strong>Students do not have authorization to edit mentor profiles or modify creator details.</strong>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Instructor Questionnaire */}
          {activeStep === 'instructor_questions' && (
            <form onSubmit={handleInstructorSubmit} className="space-y-4 text-left">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  1. What is your primary area of expertise?
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none"
                >
                  <option value="tech">Engineering &amp; Software Development</option>
                  <option value="design">UI/UX &amp; Product Design</option>
                  <option value="business">Business &amp; Entrepreneurship</option>
                  <option value="other">Product Management &amp; Advisory</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    2. Professional Title
                  </label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Lead Staff Engineer"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    3. Organization / Company
                  </label>
                  <input
                    type="text"
                    required
                    value={org}
                    onChange={(e) => setOrg(e.target.value)}
                    placeholder="e.g. Stripe / Independent"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    4. Years of Experience
                  </label>
                  <input
                    type="text"
                    value={yearsOfExperience}
                    onChange={(e) => setYearsOfExperience(e.target.value)}
                    placeholder="e.g. 7+ years"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    5. Session Starting Price ($)
                  </label>
                  <input
                    type="number"
                    value={startingPrice}
                    onChange={(e) => setStartingPrice(Number(e.target.value))}
                    min={10}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  6. Primary Mentorship Offering Title
                </label>
                <input
                  type="text"
                  required
                  value={primaryOfferingTitle}
                  onChange={(e) => setPrimaryOfferingTitle(e.target.value)}
                  placeholder="e.g. 1:1 Architecture & Technical Growth Strategy"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  7. Short Instructor Bio
                </label>
                <textarea
                  rows={3}
                  required
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Explain what topics you can help mentees with..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none"
                />
              </div>

              <div className="pt-4 flex items-center gap-3 justify-end">
                <button
                  type="button"
                  onClick={() => setActiveStep('role_select')}
                  className="px-4 py-2.5 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-sm font-semibold rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-bold rounded-xl transition-all shadow-md cursor-pointer"
                >
                  Submit Instructor Application &rarr;
                </button>
              </div>
            </form>
          )}

        </div>
      </div>
    </div>
  );
}
