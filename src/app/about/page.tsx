import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Leap Skills — Our Mission & Technical Creator Infrastructure',
  description:
    'Learn how Leap Skills empowers principal engineers, security architects, and independent technical advisors to monetize expertise via direct Stripe Connect payouts, 2-way Google Calendar sync, and zero-commission storefronts.',
  alternates: { canonical: 'https://leapskills.sbs/about' },
  openGraph: {
    title: 'About Leap Skills — Our Mission & Technical Creator Infrastructure',
    description:
      'Leap Skills removes commission-taking intermediaries and enforces direct Stripe Connect payouts from day one. Built for serious technical creators.',
    url: 'https://leapskills.sbs/about',
    type: 'website',
  },
};

export { default } from './AboutClient';
