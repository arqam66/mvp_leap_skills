import type { Metadata } from 'next';
import ContactClient from './ContactClient';

export const metadata: Metadata = {
  title: 'Contact Support — Reach Our Engineering Team',
  description:
    'Contact Leap Skills support for help with bookings, payout issues, storefront customization, or scheduling errors. Reach our engineers directly or submit a support ticket.',
  alternates: { canonical: 'https://leapskills.sbs/contact' },
  openGraph: {
    title: 'Contact Leap Skills Support',
    description:
      'Need help managing bookings, configuring payments, or scheduling calls? Reach out directly — our engineers respond within 1–2 business hours.',
    url: 'https://leapskills.sbs/contact',
    type: 'website',
  },
};

export default function ContactPage() {
  return <ContactClient />;
}
