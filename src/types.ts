export interface Creator {
  id: string;
  name: string;
  title: string;
  org: string;
  image: string;
  rating: number;
  reviewCount: number;
  startingPrice: number;
  bio: string;
  category: 'tech' | 'design' | 'business' | 'other';
  menteesCount?: string;
  reachCount?: string;
  customMatchReason?: string;
  verified?: boolean;
  fastResponder?: boolean;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  price: number;
  duration?: string;
  platform?: string;
  isDownloadable?: boolean;
  delivery?: string;
  type?: 'mentorship' | 'digital' | 'webinar' | 'cohort';
}

export interface Booking {
  id: string;
  creatorId: string;
  creatorName: string;
  serviceTitle: string;
  clientName: string;
  clientEmail: string;
  date: string; // e.g., "Oct 24" or "2026-06-25"
  time: string; // e.g., "10:00 AM"
  status: 'confirmed' | 'pending' | 'canceled';
  platform?: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  userName: string;
  userRole: string;
  userImage: string;
  stars: number;
}
