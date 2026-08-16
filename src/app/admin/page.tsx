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
  trainer_id: string;
  client_id: string;
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
    </div>
  );
}
