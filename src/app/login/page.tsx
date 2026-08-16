'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser, SignUp } from '@clerk/nextjs';

export default function LoginPage() {
  const router = useRouter();
  const { isLoaded, isSignedIn } = useUser();

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      router.push('/dashboard');
    }
  }, [isLoaded, isSignedIn, router]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center px-4 py-12 text-slate-900 dark:text-slate-100 pt-24">
      <div className="w-full max-w-xl">
        <button
          type="button"
          onClick={() => router.push('/')}
          className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white mb-6 transition-colors cursor-pointer"
        >
          &larr; Back to Home
        </button>

        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden p-6 sm:p-10">
          <div className="text-center mb-8">
            <h1 className="font-headline text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white mb-2">
              Create your Leap Skills Account
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md mx-auto">
              Join as a trainer/creator or client/student and start monetizing expertise from one single shareable link.
            </p>
          </div>

          <div className="w-full flex justify-center py-2">
            <SignUp routing="hash" fallbackRedirectUrl="/dashboard" />
          </div>
        </div>
      </div>
    </div>
  );
}
