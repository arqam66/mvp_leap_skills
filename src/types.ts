export type ServiceFormat = 'one_on_one' | 'webinar' | 'cohort' | 'package' | 'paid_dm';
export type BookingStatus = 'pending' | 'confirmed' | 'cancelled' | 'completed';
export type PaymentStatus = 'unpaid' | 'paid' | 'refunded';
export type UserRole = 'student' | 'instructor' | 'client' | 'trainer' | 'admin';

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
  slug?: string;
  instagramHandle?: string;
  linkedinUrl?: string;
  websiteUrl?: string;
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
  format?: ServiceFormat;
  capacity?: number;
  seatsBooked?: number;
  isActive?: boolean;
}

export interface PackageItem {
  id: string;
  packageId: string;
  itemType: 'service' | 'digital_product';
  itemId: string;
  quantity: number;
  title?: string;
}

export interface PackageBundle {
  id: string;
  trainerId: string;
  title: string;
  description: string;
  price: number;
  status: 'draft' | 'published' | 'archived';
  items?: PackageItem[];
}

export interface PaidDMThread {
  id: string;
  trainerId: string;
  clientId: string;
  clientName: string;
  clientEmail: string;
  question: string;
  response?: string;
  status: 'awaiting_response' | 'responded' | 'resolved';
  openedAt: string;
  respondedAt?: string;
}

export interface Booking {
  id: string;
  creatorId: string;
  creatorName: string;
  serviceTitle: string;
  clientName: string;
  clientEmail: string;
  date: string;
  time: string;
  status: BookingStatus;
  paymentStatus?: PaymentStatus;
  platform?: string;
  format?: ServiceFormat;
  serviceId?: string;
  packageId?: string;
  dmThreadId?: string;
  meetingId?: string;
  roomId?: string;
  notes?: string;
}

export interface DigitalProduct {
  id: string;
  trainerId: string;
  title: string;
  description: string;
  thumbnail?: string;
  fileUrl: string;
  price: number;
  status: 'draft' | 'published' | 'archived';
  purchasesCount?: number;
}

export interface PayoutRecord {
  id: string;
  trainerId: string;
  amount: number;
  currency: string;
  method: 'bank_transfer' | 'upi' | 'stripe_connect';
  status: 'queued' | 'processing' | 'completed' | 'failed';
  providerReference?: string;
  createdAt: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  userName: string;
  userRole: string;
  userImage: string;
  stars: number;
  isPinned?: boolean;
}

export interface InstructorQuestionnaire {
  category: 'tech' | 'design' | 'business' | 'other';
  title: string;
  org: string;
  yearsOfExperience: string;
  bio: string;
  primaryOfferingTitle: string;
  startingPrice: number;
}

export type WebSocketMessageType =
  | 'WS_CONNECT'
  | 'WS_CONNECTED'
  | 'BOOKING_REQUEST'
  | 'BOOKING_CONFIRMED'
  | 'SLOT_UPDATE'
  | 'PING'
  | 'PONG';

export interface WebSocketBookingPayload {
  type: WebSocketMessageType;
  id?: string;
  creatorId?: string;
  creatorName?: string;
  serviceTitle?: string;
  clientName?: string;
  clientEmail?: string;
  date?: string;
  time?: string;
  timestamp?: number;
  message?: string;
}
