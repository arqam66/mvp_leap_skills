import type { Appearance } from '@clerk/types';

export const clerkAppearance: Appearance = {
  variables: {
    colorPrimary: '#4f46e5',
    colorText: '#090d16',
    colorTextSecondary: '#475569',
    colorBackground: '#ffffff',
    colorInputBackground: '#f1f5f9',
    colorInputText: '#090d16',
    colorDanger: '#e11d48',
    borderRadius: '0.75rem',
    fontFamily:
      '"Plus Jakarta Sans", Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    fontSize: '0.875rem',
  },
  elements: {
    card: 'rounded-2xl border border-slate-200 shadow-xl w-full',
    header: 'hidden',
    formHeaderTitle: 'hidden',
    formHeaderSubtitle: 'hidden',
    socialButtonsBlockButton:
      'rounded-lg border border-slate-200 bg-white font-semibold hover:bg-slate-50',
    socialButtonsBlockButtonText: 'text-sm font-semibold text-slate-700',
    socialButtonsProviderIcon: 'text-slate-800',
    formButtonPrimary: 'rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold shadow-sm',
    formFieldInput: 'rounded-lg h-11 text-sm px-3.5',
    formFieldLabel: 'text-xs font-semibold text-slate-600',
    formFieldErrorText: 'text-xs text-rose-600',
    formFieldWarningText: 'text-xs text-amber-600',
    footerActionText: 'text-sm text-slate-500',
    footerActionLink: 'text-indigo-600 hover:text-indigo-500 font-semibold',
    dividerLine: 'bg-slate-200',
    dividerText: 'text-xs text-slate-400',
    otpCodeFieldInput: 'rounded-lg',
    identityPreviewText: 'text-slate-700',
    identityPreviewEditButton: 'text-indigo-600',
    alert: 'rounded-lg',
    footer: 'text-slate-500',
  },
};
