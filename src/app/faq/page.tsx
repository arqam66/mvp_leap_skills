import type { Metadata } from 'next';
import FaqClient from './FaqClient';

export const metadata: Metadata = {
  title: 'FAQ — Bookings, Payouts & Storefront Help',
  description:
    'Answers to the most common questions about Leap Skills: how calendar sync works, how fast Stripe payouts arrive, platform fees, digital product setup, and storefront customization.',
  alternates: { canonical: 'https://leapskills.sbs/faq' },
  openGraph: {
    title: 'FAQ — Bookings, Payouts & Storefront Help | Leap Skills',
    description:
      'Zero commission on your first $1,000. Instant Stripe payouts. 2-way Google Calendar sync. Find all the answers here.',
    url: 'https://leapskills.sbs/faq',
    type: 'website',
  },
};

export default function FaqPage() {
  return <FaqClient />;
}
