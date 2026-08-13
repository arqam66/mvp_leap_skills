import type { Metadata } from 'next';
import ExplorePage from '../../components/ExplorePage';

export const metadata: Metadata = {
  title: 'Explore Expert Creators — Book 1:1 Technical Consultations',
  description:
    'Browse and book verified technical mentors on Leap Skills: software engineers, security architects, DevOps specialists, and more. Instant calendar sync and Stripe-powered checkout.',
  alternates: { canonical: 'https://leapskills.sbs/explore' },
  openGraph: {
    title: 'Explore Expert Creators | Leap Skills',
    description:
      'Find and book 1:1 consultations with top technical experts. No Zoom required — WebRTC calls included with every booking.',
    url: 'https://leapskills.sbs/explore',
    type: 'website',
  },
};

export default function Explore() {
  return <ExplorePage />;
}
