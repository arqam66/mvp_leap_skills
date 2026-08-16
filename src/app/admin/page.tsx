'use client';

import React, { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';

interface AdminStats {
  totalUsers: number;
  totalTrainers: number;
  totalBookings: number;
  totalRevenue: number;
  pendingPayouts: number;
}

interface UserRow {
  id: string;
  email: string;
  full_name: string | null;
  role: string;
  created_at: string;
  banned?: boolean | null;
}

interface BookingRow {
  id: string;
  status: string;
  payment_status: string;
  created_at: string;
  trainer_id?: string;
  client_id?: string;
  scheduled_at?: string;
}

interface TrainerProfileRow {
  id: string;
  full_name: string | null;
  profile_slug: string | null;
  bio: string | null;
  avatar_url: string | null;
  stripe_account_id: string | null;
  banned?: boolean | null;
}

interface UserDetail {
  profile: UserRow | null;
  trainerProfile: TrainerProfileRow | null;
  services: any[];
  clientBookings: BookingRow[];
  trainerBookings: BookingRow[];
  transactions: any[];
}

const TAB_LIST = ['Overview', 'Users', 'Trainers', 'Bookings', 'Settings'] as const;
type Tab = typeof TAB_LIST[number];

export default function AdminPage() {
  const supabase = createClient();
  const [activeTab, setActiveTab] = useState<Tab>('Overview');
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [users, setUsers] = useState<UserRow[]>([]);
  const [bookings, setBookings] = useState<BookingRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [platformFee, setPlatformFee] = useState('10');
  const [selectedUser, setSelectedUser] = useState<UserRow | null>(null);
  const [detail, setDetail] = useState<UserDetail | null>(null);
  const [detailLoading, setDetailLoading] = useState(false);

  const openUserDetail = async (u: UserRow) => {
    setSelectedUser(u);
    setDetail(null);
    setDetailLoading(true);
    try {
      const { data: profile } = await supabase
        .from('users')
        .select('*')
        .eq('id', u.id)
        .single();

      const { data: trainerProfile } = await supabase
        .from('trainer_profiles')
        .select('id, full_name, profile_slug, bio, avatar_url, stripe_account_id, banned')
        .eq('user_id', u.id)
        .single();

      const { data: services } = await supabase
        .from('services')
        .select('id, title, description, price, format, max_capacity, is_active, created_at')
        .eq('trainer_id', u.id)
        .order('created_at', { ascending: false })
        .limit(50);

      const { data: clientBookings } = await supabase
        .from('bookings')
        .select('id, trainer_id, status, payment_status, created_at, scheduled_at')
        .eq('client_id', u.id)
        .order('created_at', { ascending: false })
        .limit(50);

      const { data: trainerBookings } = await supabase
        .from('bookings')
        .select('id, client_id, status, payment_status, created_at, scheduled_at')
        .eq('trainer_id', u.id)
        .order('created_at', { ascending: false })
        .limit(50);

      const { data: transactions } = await supabase
        .from('transactions')
        .select('id, booking_id, gross_amount, platform_fee, trainer_payout, status, payout_status, created_at')
        .eq('trainer_id', u.id)
        .order('created_at', { ascending: false })
        .limit(50);

      setDetail({
        profile: profile || null,
        trainerProfile: trainerProfile || null,
        services: services || [],
        clientBookings: clientBookings || [],
        trainerBookings: trainerBookings || [],
        transactions: transactions || [],
      });
    } catch (err) {
      console.error('Admin user detail load error:', err);
      setDetail({ profile: u, trainerProfile: null, services: [], clientBookings: [], trainerBookings: [], transactions: [] });
    } finally {
      setDetailLoading(false);
    }
  };

  const handleToggleBan = async (u: UserRow) => {
    const nextBanned = !u.banned;
    const action = window.confirm(
      nextBanned
        ? `Ban ${u.full_name || u.email}? They will no longer be able to use the platform.`
        : `Unban ${u.full_name || u.email}?`
    );
    if (!action) return;

    try {
      const res = await fetch('/api/admin/users/ban', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: u.id, banned: nextBanned }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to update user status');
      setUsers((prev) => prev.map((x) => (x.id === u.id ? { ...x, banned: nextBanned } : x)));
    } catch (err: any) {
      alert(err.message || 'Failed to update user status');
    }
  };

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const [usersRes, bookingsRes, transactionsRes] = await Promise.all([
          supabase.from('users').select('id, email, full_name, role, created_at, banned').order('created_at', { ascending: false }).limit(100),
          supabase.from('bookings').select('id, status, payment_status, created_at, trainer_id, client_id').order('created_at', { ascending: false }).limit(100),
          supabase.from('transactions').select('gross_amount, platform_fee, trainer_payout, payout_status'),
        ]);

        const allUsers = usersRes.data || [];
        const allBookings = bookingsRes.data || [];
        const allTx = transactionsRes.data || [];

        setUsers(allUsers);
        setBookings(allBookings);
        setStats({
          totalUsers: allUsers.filter((u) => u.role === 'client' || u.role === 'student').length,
          totalTrainers: allUsers.filter((u) => u.role === 'trainer' || u.role === 'instructor').length,
          totalBookings: allBookings.length,
          totalRevenue: allTx.reduce((s, t) => s + (t.platform_fee || 0), 0),
          pendingPayouts: allTx.filter((t) => t.payout_status === 'pending').reduce((s, t) => s + (t.trainer_payout || 0), 0),
        });
      } catch (err) {
        console.error('Admin load error:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const statCards = stats
    ? [
        { label: 'Total Clients', value: stats.totalUsers.toLocaleString(), icon: '👥', color: 'bg-blue-500/10 text-blue-600' },
        { label: 'Active Trainers', value: stats.totalTrainers.toLocaleString(), icon: '🎓', color: 'bg-indigo-500/10 text-indigo-600' },
        { label: 'Total Bookings', value: stats.totalBookings.toLocaleString(), icon: '📅', color: 'bg-emerald-500/10 text-emerald-600' },
        { label: 'Platform Revenue', value: `$${stats.totalRevenue.toFixed(2)}`, icon: '💰', color: 'bg-amber-500/10 text-amber-600' },
        { label: 'Pending Payouts', value: `$${stats.pendingPayouts.toFixed(2)}`, icon: '⏳', color: 'bg-rose-500/10 text-rose-600' },
      ]
    : [];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-full w-56 bg-slate-900 border-r border-slate-800 z-40 flex flex-col">
        <div className="p-5 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-rose-600 flex items-center justify-center text-white text-sm font-bold">⚡</div>
            <div>
              <p className="font-headline font-bold text-white text-sm">CreatorHub</p>
              <p className="text-rose-400 text-xs font-bold">ADMIN</p>
            </div>
          </div>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {TAB_LIST.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`w-full text-left px-3 py-2 rounded-xl text-sm font-medium transition-all cursor-pointer ${
                activeTab === tab
                  ? 'bg-rose-600 text-white'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {tab}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-slate-800">
          <a href="/dashboard" className="text-xs text-slate-500 hover:text-slate-300 transition-colors">
            ← Back to Dashboard
          </a>
        </div>
      </div>

      {/* Main content */}
      <div className="ml-56 p-8">
        <h1 className="font-headline text-2xl font-bold text-white mb-6">
          {activeTab}
        </h1>

        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="w-10 h-10 rounded-full border-2 border-rose-500 border-t-transparent animate-spin" />
          </div>
        ) : (
          <>
            {/* Overview */}
            {activeTab === 'Overview' && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                  {statCards.map((card) => (
                    <div
                      key={card.label}
                      className="bg-slate-900 border border-slate-800 rounded-2xl p-5"
                    >
                      <div className={`inline-flex items-center justify-center w-10 h-10 rounded-xl text-xl mb-3 ${card.color}`}>
                        {card.icon}
                      </div>
                      <p className="text-2xl font-bold text-white">{card.value}</p>
                      <p className="text-xs text-slate-500 mt-1">{card.label}</p>
                    </div>
                  ))}
                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
                  <h2 className="text-sm font-bold text-slate-300 mb-4">Recent Bookings</h2>
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-xs text-slate-500 border-b border-slate-800">
                        <th className="text-left pb-3 font-medium">ID</th>
                        <th className="text-left pb-3 font-medium">Status</th>
                        <th className="text-left pb-3 font-medium">Payment</th>
                        <th className="text-left pb-3 font-medium">Created</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bookings.slice(0, 10).map((b) => (
                        <tr key={b.id} className="border-b border-slate-800/50 last:border-0">
                          <td className="py-3 text-slate-400 font-mono text-xs">{b.id.slice(0, 8)}…</td>
                          <td className="py-3">
                            <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                              b.status === 'confirmed' ? 'bg-emerald-500/10 text-emerald-400' :
                              b.status === 'cancelled' ? 'bg-red-500/10 text-red-400' :
                              'bg-amber-500/10 text-amber-400'
                            }`}>
                              {b.status}
                            </span>
                          </td>
                          <td className="py-3">
                            <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                              b.payment_status === 'paid' ? 'bg-emerald-500/10 text-emerald-400' :
                              'bg-slate-500/10 text-slate-400'
                            }`}>
                              {b.payment_status}
                            </span>
                          </td>
                          <td className="py-3 text-slate-500 text-xs">
                            {new Date(b.created_at).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Users */}
            {activeTab === 'Users' && (
              <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-xs text-slate-500 border-b border-slate-800 bg-slate-800/50">
                      <th className="text-left p-4 font-medium">Name</th>
                      <th className="text-left p-4 font-medium">Email</th>
                      <th className="text-left p-4 font-medium">Role</th>
                      <th className="text-left p-4 font-medium">Status</th>
                      <th className="text-left p-4 font-medium">Joined</th>
                      <th className="text-right p-4 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((u) => (
                      <tr key={u.id} className="border-b border-slate-800/40 last:border-0 hover:bg-slate-800/30">
                        <td className="p-4 text-white font-medium">{u.full_name || '—'}</td>
                        <td className="p-4 text-slate-400">{u.email}</td>
                        <td className="p-4">
                          <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                            u.role === 'admin' ? 'bg-rose-500/10 text-rose-400' :
                            u.role === 'trainer' || u.role === 'instructor' ? 'bg-indigo-500/10 text-indigo-400' :
                            'bg-slate-500/10 text-slate-400'
                          }`}>
                            {u.role}
                          </span>
                        </td>
                        <td className="p-4">
                          <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                            u.banned
                              ? 'bg-red-500/15 text-red-400 border border-red-700/40'
                              : 'bg-emerald-500/10 text-emerald-400'
                          }`}>
                            {u.banned ? 'Banned' : 'Active'}
                          </span>
                        </td>
                        <td className="p-4 text-slate-500 text-xs">{new Date(u.created_at).toLocaleDateString()}</td>
                        <td className="p-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => openUserDetail(u)}
                              className="px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer bg-indigo-600/20 text-indigo-400 border border-indigo-700/40 hover:bg-indigo-600/30"
                            >
                              View
                            </button>
                            {u.role !== 'admin' && (
                              <button
                                onClick={() => handleToggleBan(u)}
                                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                                  u.banned
                                    ? 'bg-emerald-600/20 text-emerald-400 border border-emerald-700/40 hover:bg-emerald-600/30'
                                    : 'bg-red-600/20 text-red-400 border border-red-700/40 hover:bg-red-600/30'
                                }`}
                              >
                                {u.banned ? 'Unban' : 'Ban'}
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Trainers */}
            {activeTab === 'Trainers' && (
              <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-xs text-slate-500 border-b border-slate-800 bg-slate-800/50">
                      <th className="text-left p-4 font-medium">Name</th>
                      <th className="text-left p-4 font-medium">Email</th>
                      <th className="text-left p-4 font-medium">Joined</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users
                      .filter((u) => u.role === 'trainer' || u.role === 'instructor')
                      .map((u) => (
                        <tr key={u.id} className="border-b border-slate-800/40 last:border-0 hover:bg-slate-800/30">
                          <td className="p-4 text-white font-medium">{u.full_name || '—'}</td>
                          <td className="p-4 text-slate-400">{u.email}</td>
                          <td className="p-4 text-slate-500 text-xs">{new Date(u.created_at).toLocaleDateString()}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Bookings */}
            {activeTab === 'Bookings' && (
              <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-xs text-slate-500 border-b border-slate-800 bg-slate-800/50">
                      <th className="text-left p-4 font-medium">Booking ID</th>
                      <th className="text-left p-4 font-medium">Status</th>
                      <th className="text-left p-4 font-medium">Payment</th>
                      <th className="text-left p-4 font-medium">Created</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.map((b) => (
                      <tr key={b.id} className="border-b border-slate-800/40 last:border-0 hover:bg-slate-800/30">
                        <td className="p-4 text-slate-400 font-mono text-xs">{b.id}</td>
                        <td className="p-4">
                          <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                            b.status === 'confirmed' ? 'bg-emerald-500/10 text-emerald-400' :
                            b.status === 'cancelled' ? 'bg-red-500/10 text-red-400' :
                            'bg-amber-500/10 text-amber-400'
                          }`}>
                            {b.status}
                          </span>
                        </td>
                        <td className="p-4">
                          <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                            b.payment_status === 'paid' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-slate-500/10 text-slate-400'
                          }`}>
                            {b.payment_status}
                          </span>
                        </td>
                        <td className="p-4 text-slate-500 text-xs">{new Date(b.created_at).toLocaleDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Settings */}
            {activeTab === 'Settings' && (
              <div className="max-w-lg space-y-6">
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
                  <h2 className="text-sm font-bold text-slate-300 mb-4">Platform Commission</h2>
                  <div className="space-y-3">
                    <label className="block text-xs text-slate-500">Platform fee percentage (%)</label>
                    <div className="flex gap-3">
                      <input
                        type="number"
                        min="0"
                        max="50"
                        value={platformFee}
                        onChange={(e) => setPlatformFee(e.target.value)}
                        className="flex-1 px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white text-sm"
                      />
                      <button
                        className="px-5 py-2.5 bg-rose-600 hover:bg-rose-500 text-white text-sm font-bold rounded-xl transition-all cursor-pointer"
                        onClick={() => alert(`Platform fee saved: ${platformFee}% (connect to DB)`)}
                      >
                        Save
                      </button>
                    </div>
                    <p className="text-xs text-slate-600">
                      Current: trainers keep {100 - Number(platformFee)}% of each transaction.
                    </p>
                  </div>
                </div>

                <div className="bg-slate-900 border border-amber-800/40 rounded-2xl p-6">
                  <h2 className="text-sm font-bold text-amber-400 mb-2">⚠️ Danger Zone</h2>
                  <p className="text-xs text-slate-500 mb-4">These actions are irreversible.</p>
                  <button className="px-4 py-2 bg-red-600/20 text-red-400 border border-red-700/40 rounded-xl text-xs font-bold cursor-pointer hover:bg-red-600/30 transition-all">
                    Reset All Mock Data
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* User Account Detail Modal */}
      {selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 overflow-y-auto">
          <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl">
            <div className="sticky top-0 z-10 flex items-center justify-between p-5 border-b border-slate-800 bg-slate-900/95 backdrop-blur">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-600/20 border border-indigo-700/40 flex items-center justify-center text-indigo-400 font-bold text-sm">
                  {(selectedUser.full_name || selectedUser.email || '?').charAt(0).toUpperCase()}
                </div>
                <div>
                  <h2 className="font-headline font-bold text-white text-base">
                    {selectedUser.full_name || 'Unnamed Account'}
                  </h2>
                  <p className="text-xs text-slate-400">{selectedUser.email}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedUser(null)}
                className="p-2 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
                aria-label="Close account details"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-6 space-y-6">
              {detailLoading ? (
                <div className="flex items-center justify-center h-64">
                  <div className="w-10 h-10 rounded-full border-2 border-rose-500 border-t-transparent animate-spin" />
                </div>
              ) : detail && (
                <>
                  {/* Profile */}
                  <section>
                    <h3 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest mb-3">// Account</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="bg-slate-800/50 border border-slate-800 rounded-xl p-4">
                        <p className="text-[10px] text-slate-500 font-semibold uppercase">Role</p>
                        <span className={`mt-1 inline-block px-2 py-0.5 rounded-full text-xs font-bold ${
                          (detail.profile?.role || selectedUser.role) === 'admin' ? 'bg-rose-500/10 text-rose-400' :
                          (detail.profile?.role || selectedUser.role) === 'trainer' ? 'bg-indigo-500/10 text-indigo-400' :
                          'bg-slate-500/10 text-slate-400'
                        }`}>
                          {detail.profile?.role || selectedUser.role}
                        </span>
                      </div>
                      <div className="bg-slate-800/50 border border-slate-800 rounded-xl p-4">
                        <p className="text-[10px] text-slate-500 font-semibold uppercase">Status</p>
                        <span className={`mt-1 inline-block px-2 py-0.5 rounded-full text-xs font-bold ${
                          detail.profile?.banned
                            ? 'bg-red-500/15 text-red-400 border border-red-700/40'
                            : 'bg-emerald-500/10 text-emerald-400'
                        }`}>
                          {detail.profile?.banned ? 'Banned' : 'Active'}
                        </span>
                      </div>
                      <div className="bg-slate-800/50 border border-slate-800 rounded-xl p-4">
                        <p className="text-[10px] text-slate-500 font-semibold uppercase">User ID</p>
                        <p className="mt-1 text-xs text-slate-300 font-mono break-all">{selectedUser.id}</p>
                      </div>
                      <div className="bg-slate-800/50 border border-slate-800 rounded-xl p-4">
                        <p className="text-[10px] text-slate-500 font-semibold uppercase">Joined</p>
                        <p className="mt-1 text-sm text-slate-300">
                          {selectedUser.created_at ? new Date(selectedUser.created_at).toLocaleDateString() : '—'}
                        </p>
                      </div>
                    </div>
                  </section>

                  {/* Trainer profile */}
                  {detail.trainerProfile && (
                    <section>
                      <h3 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest mb-3">// Trainer Profile</h3>
                      <div className="bg-slate-800/50 border border-slate-800 rounded-xl p-4 space-y-3">
                        <div className="flex flex-wrap items-center gap-4 text-sm">
                          <span className="text-slate-400">Slug: <span className="text-white font-mono">/{detail.trainerProfile.profile_slug || '—'}</span></span>
                          <span className="text-slate-400">Stripe: <span className="text-white font-mono">{detail.trainerProfile.stripe_account_id ? 'Connected' : 'Not connected'}</span></span>
                        </div>
                        {detail.trainerProfile.bio && (
                          <p className="text-sm text-slate-300 leading-relaxed">{detail.trainerProfile.bio}</p>
                        )}
                      </div>
                    </section>
                  )}

                  {/* Services */}
                  {detail.services.length > 0 && (
                    <section>
                      <h3 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest mb-3">
                        // Services ({detail.services.length})
                      </h3>
                      <div className="bg-slate-800/50 border border-slate-800 rounded-xl overflow-hidden">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="text-xs text-slate-500 border-b border-slate-800 bg-slate-800/50">
                              <th className="text-left p-3 font-medium">Title</th>
                              <th className="text-left p-3 font-medium">Format</th>
                              <th className="text-left p-3 font-medium">Price</th>
                              <th className="text-left p-3 font-medium">Active</th>
                            </tr>
                          </thead>
                          <tbody>
                            {detail.services.map((s) => (
                              <tr key={s.id} className="border-b border-slate-800/40 last:border-0">
                                <td className="p-3 text-white font-medium">{s.title}</td>
                                <td className="p-3 text-slate-400 font-mono text-xs">{s.format}</td>
                                <td className="p-3 text-slate-300 font-mono text-xs">${s.price}</td>
                                <td className="p-3">
                                  <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                                    s.is_active ? 'bg-emerald-500/10 text-emerald-400' : 'bg-slate-500/10 text-slate-400'
                                  }`}>
                                    {s.is_active ? 'Live' : 'Off'}
                                  </span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </section>
                  )}

                  {/* Bookings as client */}
                  <section>
                    <h3 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest mb-3">
                      // Bookings as Client ({detail.clientBookings.length})
                    </h3>
                    {detail.clientBookings.length === 0 ? (
                      <p className="text-sm text-slate-500">No bookings found.</p>
                    ) : (
                      <div className="bg-slate-800/50 border border-slate-800 rounded-xl overflow-hidden">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="text-xs text-slate-500 border-b border-slate-800 bg-slate-800/50">
                              <th className="text-left p-3 font-medium">Booking</th>
                              <th className="text-left p-3 font-medium">Status</th>
                              <th className="text-left p-3 font-medium">Payment</th>
                              <th className="text-left p-3 font-medium">Scheduled</th>
                              <th className="text-left p-3 font-medium">Created</th>
                            </tr>
                          </thead>
                          <tbody>
                            {detail.clientBookings.map((b) => (
                              <tr key={b.id} className="border-b border-slate-800/40 last:border-0">
                                <td className="p-3 text-slate-400 font-mono text-xs">{b.id.slice(0, 8)}…</td>
                                <td className="p-3">
                                  <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                                    b.status === 'confirmed' ? 'bg-emerald-500/10 text-emerald-400' :
                                    b.status === 'cancelled' ? 'bg-red-500/10 text-red-400' :
                                    'bg-amber-500/10 text-amber-400'
                                  }`}>{b.status}</span>
                                </td>
                                <td className="p-3">
                                  <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                                    b.payment_status === 'paid' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-slate-500/10 text-slate-400'
                                  }`}>{b.payment_status}</span>
                                </td>
                                <td className="p-3 text-slate-400 text-xs">{b.scheduled_at ? new Date(b.scheduled_at).toLocaleDateString() : '—'}</td>
                                <td className="p-3 text-slate-500 text-xs">{new Date(b.created_at).toLocaleDateString()}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </section>

                  {/* Bookings as trainer */}
                  <section>
                    <h3 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest mb-3">
                      // Bookings as Trainer ({detail.trainerBookings.length})
                    </h3>
                    {detail.trainerBookings.length === 0 ? (
                      <p className="text-sm text-slate-500">No bookings found.</p>
                    ) : (
                      <div className="bg-slate-800/50 border border-slate-800 rounded-xl overflow-hidden">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="text-xs text-slate-500 border-b border-slate-800 bg-slate-800/50">
                              <th className="text-left p-3 font-medium">Booking</th>
                              <th className="text-left p-3 font-medium">Status</th>
                              <th className="text-left p-3 font-medium">Payment</th>
                              <th className="text-left p-3 font-medium">Created</th>
                            </tr>
                          </thead>
                          <tbody>
                            {detail.trainerBookings.map((b) => (
                              <tr key={b.id} className="border-b border-slate-800/40 last:border-0">
                                <td className="p-3 text-slate-400 font-mono text-xs">{b.id.slice(0, 8)}…</td>
                                <td className="p-3">
                                  <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                                    b.status === 'confirmed' ? 'bg-emerald-500/10 text-emerald-400' :
                                    b.status === 'cancelled' ? 'bg-red-500/10 text-red-400' :
                                    'bg-amber-500/10 text-amber-400'
                                  }`}>{b.status}</span>
                                </td>
                                <td className="p-3">
                                  <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                                    b.payment_status === 'paid' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-slate-500/10 text-slate-400'
                                  }`}>{b.payment_status}</span>
                                </td>
                                <td className="p-3 text-slate-500 text-xs">{new Date(b.created_at).toLocaleDateString()}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </section>

                  {/* Transactions / Earnings */}
                  <section>
                    <h3 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest mb-3">
                      // Earnings & Transactions ({detail.transactions.length})
                    </h3>
                    {detail.transactions.length === 0 ? (
                      <p className="text-sm text-slate-500">No transactions found.</p>
                    ) : (
                      <div className="bg-slate-800/50 border border-slate-800 rounded-xl overflow-hidden">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="text-xs text-slate-500 border-b border-slate-800 bg-slate-800/50">
                              <th className="text-left p-3 font-medium">Transaction</th>
                              <th className="text-left p-3 font-medium">Gross</th>
                              <th className="text-left p-3 font-medium">Platform Fee</th>
                              <th className="text-left p-3 font-medium">Trainer Payout</th>
                              <th className="text-left p-3 font-medium">Payout Status</th>
                              <th className="text-left p-3 font-medium">Created</th>
                            </tr>
                          </thead>
                          <tbody>
                            {detail.transactions.map((t) => (
                              <tr key={t.id} className="border-b border-slate-800/40 last:border-0">
                                <td className="p-3 text-slate-400 font-mono text-xs">{t.id.slice(0, 8)}…</td>
                                <td className="p-3 text-slate-300 font-mono text-xs">${t.gross_amount}</td>
                                <td className="p-3 text-rose-400 font-mono text-xs">${t.platform_fee}</td>
                                <td className="p-3 text-emerald-400 font-mono text-xs font-bold">${t.trainer_payout}</td>
                                <td className="p-3">
                                  <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                                    t.payout_status === 'paid' ? 'bg-emerald-500/10 text-emerald-400' :
                                    t.payout_status === 'pending' ? 'bg-amber-500/10 text-amber-400' :
                                    'bg-slate-500/10 text-slate-400'
                                  }`}>{t.payout_status || t.status}</span>
                                </td>
                                <td className="p-3 text-slate-500 text-xs">{t.created_at ? new Date(t.created_at).toLocaleDateString() : '—'}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </section>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
