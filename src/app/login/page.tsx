'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser, SignIn } from '@clerk/nextjs';
import { clerkAppearance } from '../../lib/clerk-appearance';

export default function LoginPage() {
  const router = useRouter();
  const { isLoaded, isSignedIn } = useUser();

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      router.push('/dashboard');
    }
  }, [isLoaded, isSignedIn, router]);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center px-4 py-12 text-slate-900">
      <div className="w-full max-w-md">
        <button
          type="button"
          onClick={() => router.push('/')}
          className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900 mb-6 transition-colors cursor-pointer"
        >
          &larr; Back to Home
        </button>

        <div className="text-center mb-8">
          <h1 className="font-headline text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 mb-2">
            Welcome back
          </h1>
          <p className="text-sm text-slate-600">
            Sign in to continue to Leap Skills.
          </p>
        </div>

        <div className="w-full flex justify-center py-2">
          <SignIn
            routing="path"
            path="/login"
            signUpUrl="/signup"
            fallbackRedirectUrl="/dashboard"
            appearance={clerkAppearance}
          />
        </div>
      </div>
    </div>
  );
}
