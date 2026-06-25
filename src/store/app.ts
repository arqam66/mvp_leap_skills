import { create } from 'zustand';
import { Creator, Service, Booking } from '../types';
import { CREATORS, CREATOR_SERVICES } from '../data/creators';
import { getFutureDate } from '../utils/dates';

interface AppState {
  selectedCreator: Creator;
  bookings: Booking[];
  servicesMap: Record<string, Service[]>;
  directServiceIdToOpen: string | null;
  selectedOfferingType: 'all' | 'mentorship' | 'digital' | 'webinar' | 'cohort';
  dashboardTab: 'home' | 'services' | 'earnings' | 'analytics';
  setSelectedCreator: (creator: Creator) => void;
  addBooking: (booking: Booking) => void;
  cancelBooking: (bookingId: string) => void;
  addService: (creatorId: string, service: Service) => void;
  setDirectServiceIdToOpen: (id: string | null) => void;
  setSelectedOfferingType: (t: 'all' | 'mentorship' | 'digital' | 'webinar' | 'cohort') => void;
  setDashboardTab: (t: 'home' | 'services' | 'earnings' | 'analytics') => void;
}

export const useAppStore = create<AppState>((set) => ({
  selectedCreator: CREATORS[0],
  bookings: [
    {
      id: 'seed-1',
      creatorId: 'alex-rivera',
      creatorName: 'Alex Rivera',
      serviceTitle: '1:1 Career Consultation',
      clientName: 'Liam Patterson',
      clientEmail: 'liam@company.com',
      date: getFutureDate(2),
      time: '11:45 AM',
      platform: 'Google Meet',
      status: 'confirmed'
    },
    {
      id: 'seed-2',
      creatorId: 'alex-rivera',
      creatorName: 'Alex Rivera',
      serviceTitle: 'Async Portfolio Review',
      clientName: 'Amara Lopez',
      clientEmail: 'amara.labs@gmail.com',
      date: getFutureDate(3),
      time: '2:00 PM',
      platform: 'Slack Workspace',
      status: 'confirmed'
    }
  ],
  servicesMap: CREATOR_SERVICES,
  directServiceIdToOpen: null,
  selectedOfferingType: 'all',
  dashboardTab: 'home',
  setSelectedCreator: (creator) => set({ selectedCreator: creator }),
  addBooking: (booking) => set((s) => ({ bookings: [booking, ...s.bookings] })),
  cancelBooking: (bookingId) => set((s) => ({ bookings: s.bookings.filter((b) => b.id !== bookingId) })),
  addService: (creatorId, service) => set((s) => ({
    servicesMap: {
      ...s.servicesMap,
      [creatorId]: [...(s.servicesMap[creatorId] || []), service]
    }
  })),
  setDirectServiceIdToOpen: (id) => set({ directServiceIdToOpen: id }),
  setSelectedOfferingType: (t) => set({ selectedOfferingType: t }),
  setDashboardTab: (t) => set({ dashboardTab: t }),
}));
