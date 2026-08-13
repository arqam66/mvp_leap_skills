import type { Metadata } from 'next';
import LandingPage from '../components/LandingPage';

export const metadata: Metadata = {
  title: 'Leap Skills — Monetize Your Technical Expertise',
  description:
    'The creator monetization platform built for engineers, security architects & DevOps experts. Sell 1:1 consultations, digital products & cohorts from one profile link. Instant Stripe payouts, Google Calendar sync, WebRTC video calls.',
  alternates: { canonical: 'https://leapskills.sbs' },
  openGraph: {
    title: 'Leap Skills — Monetize Your Technical Expertise',
    description:
      'One link. Every revenue stream. Book paid 1:1 sessions, sell digital products, and receive instant Stripe payouts — built for serious technical creators.',
    url: 'https://leapskills.sbs',
    type: 'website',
  },
};

export default function Home() {
  return <LandingPage />;
}
