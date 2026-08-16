import type { Appearance } from '@clerk/types';

export const clerkAppearance: Appearance = {
  variables: {
    colorPrimary: '#4f46e5',
    colorText: 'var(--fg-color)',
    colorTextSecondary: 'var(--muted-fg-color)',
    colorBackground: 'var(--card-bg)',
    colorInputBackground: 'var(--muted-color)',
    colorInputText: 'var(--fg-color)',
    colorDanger: '#e11d48',
    borderRadius: '0.75rem',
    fontFamily:
      '"Plus Jakarta Sans", Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    fontSize: '0.875rem',
  },
  elements: {
    card: 'rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl w-full',
    header: 'hidden',
    formHeaderTitle: 'hidden',
    formHeaderSubtitle: 'hidden',
    socialButtonsBlockButton:
      'rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 font-semibold hover:bg-slate-50 dark:hover:bg-slate-800',
    socialButtonsBlockButtonText: 'text-sm font-semibold text-slate-700 dark:text-slate-200',
    formButtonPrimary: 'rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold shadow-sm',
    formFieldInput: 'rounded-lg h-11 text-sm px-3.5',
    formFieldLabel: 'text-xs font-semibold text-slate-600 dark:text-slate-300',
    formFieldErrorText: 'text-xs text-rose-600',
    formFieldWarningText: 'text-xs text-amber-600',
    footerActionText: 'text-sm text-slate-500 dark:text-slate-400',
    footerActionLink: 'text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 font-semibold',
    dividerLine: 'bg-slate-200 dark:bg-slate-800',
    dividerText: 'text-xs text-slate-400 dark:text-slate-500',
    otpCodeFieldInput: 'rounded-lg',
    identityPreviewText: 'text-slate-700 dark:text-slate-200',
    identityPreviewEditButton: 'text-indigo-600 dark:text-indigo-400',
    alert: 'rounded-lg',
  },
};
