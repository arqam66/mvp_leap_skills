'use client';

import { useEffect, useState } from 'react';
import { createClient } from '../lib/supabase/client';

interface TrainerDashboardData {
  profile: {
    id: string;
    full_name: string | null;
    profile_slug: string | null;
    bio: string | null;
    avatar_url: string | null;
    stripe_account_id: string | null;
  } | null;
  services: Array<{
    id: string;
    title: string;
    description: string | null;
    price: number;
    format: string;
    duration_minutes: number | null;
    max_capacity: number | null;
    is_active: boolean;
  }>;
  bookings: Array<{
    id: string;
    status: string;
    payment_status: string;
    created_at: string;
    scheduled_at: string | null;
    client_id: string;
  }>;
  earnings: {
    total: number;
    pending: number;
    paid: number;
  };
  paidDMs: Array<{
    id: string;
    question: string;
    response: string | null;
    status: string;
    created_at: string;
    client_id: string;
  }>;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useTrainerDashboard(): TrainerDashboardData {
  const supabase = createClient();
  const [data, setData] = useState<Omit<TrainerDashboardData, 'refetch'>>({
    profile: null,
    services: [],
    bookings: [],
    earnings: { total: 0, pending: 0, paid: 0 },
    paidDMs: [],
    loading: true,
    error: null,
  });
  const [tick, setTick] = useState(0);

  useEffect(() => {
    async function load() {
      setData((prev) => ({ ...prev, loading: true, error: null }));

      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          setData((prev) => ({ ...prev, loading: false, error: 'Not authenticated' }));
          return;
        }

        // Load profile
        const { data: profile } = await supabase
          .from('trainer_profiles')
          .select('id, full_name, profile_slug, bio, avatar_url, stripe_account_id')
          .eq('user_id', user.id)
          .single();

        // Load services
        const { data: services } = await supabase
          .from('services')
          .select('id, title, description, price, format, duration_minutes, max_capacity, is_active')
          .eq('trainer_id', user.id)
          .order('created_at', { ascending: false });

        // Load bookings
        const { data: bookings } = await supabase
          .from('bookings')
          .select('id, status, payment_status, created_at, scheduled_at, client_id')
          .eq('trainer_id', user.id)
          .order('created_at', { ascending: false })
          .limit(50);

        // Load transactions for earnings
        const { data: transactions } = await supabase
          .from('transactions')
          .select('trainer_payout, payout_status')
          .eq('trainer_id', user.id);

        const earnings = (transactions || []).reduce(
          (acc, t) => {
            acc.total += t.trainer_payout || 0;
            if (t.payout_status === 'pending') acc.pending += t.trainer_payout || 0;
            if (t.payout_status === 'paid') acc.paid += t.trainer_payout || 0;
            return acc;
          },
          { total: 0, pending: 0, paid: 0 }
        );

        // Load paid DMs
        const { data: paidDMs } = await supabase
          .from('paid_dm_threads')
          .select('id, question, response, status, created_at, client_id')
          .eq('trainer_id', user.id)
          .order('created_at', { ascending: false });

        setData({
          profile: profile || null,
          services: services || [],
          bookings: bookings || [],
          earnings,
          paidDMs: paidDMs || [],
          loading: false,
          error: null,
        });
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : 'Unknown error';
        setData((prev) => ({ ...prev, loading: false, error: message }));
      }
    }

    load();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tick]);

  return {
    ...data,
    refetch: () => setTick((t) => t + 1),
  };
}
