'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { DashboardStats, Order, Product } from '@/types';
import {
  DollarSign,
  ShoppingBag,
  Package,
  Users,
  TrendingUp,
  AlertTriangle,
  RotateCcw,
  CheckCircle2,
  Clock,
  Truck,
  ArrowRight,
  Sparkles
} from 'lucide-react';

export default function AdminOverviewPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [resetting, setResetting] = useState(false);
  const [message, setMessage] = useState('');

  const loadStats = async () => {
    try {
      const res = await fetch('/api/analytics');
      const data = await res.json();
      if (data.success && data.stats) {
        setStats(data.stats);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStats();
  }, []);

  const handleResetSeedData = async () => {
    if (!confirm('Reset all catalog and orders to pristine seed data?')) return;
    setResetting(true);
    try {
      const res = await fetch('/api/seed', { method: 'POST' });
      const data = await res.json();
      if (data.success) {
        setMessage('Store data successfully reset to initial state!');
        loadStats();
        setTimeout(() => setMessage(''), 4000);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setResetting(false);
    }
  };

  const handleUpdateStatus = async (orderId: string, newStatus: Order['fulfillmentStatus']) => {
    try {
      const res = await fetch(`/api/orders/${orderId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus, note: `Status updated via Admin Control` })
      });
      const data = await res.json();
      if (data.success) {
        loadStats();
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="py-24 text-center">
        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
        <p className="text-xs font-bold text-slate-400">Loading Dashboard Analytics...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">Admin Overview</h1>
          <p className="text-xs text-slate-400 mt-1">Real-time revenue monitoring, inventory threshold tracking, and order fulfillment.</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleResetSeedData}
            disabled={resetting}
            className="flex items-center gap-2 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl text-xs font-bold transition"
          >
            <RotateCcw className={`w-3.5 h-3.5 ${resetting ? 'animate-spin' : ''}`} />
            {resetting ? 'Resetting...' : 'Reset Demo Data'}
          </button>
        </div>
      </div>

      {message && (
        <div className="p-4 bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 rounded-2xl text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" /> {message}
        </div>
      )}

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* Total Revenue */}
        <div className="p-6 bg-slate-800/80 rounded-3xl border border-slate-700/80 shadow-lg space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase">Gross Revenue</span>
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-white">
            ${(stats?.totalRevenue || 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </div>
          <div className="text-[11px] text-emerald-400 flex items-center gap-1 font-semibold">
            <TrendingUp className="w-3.5 h-3.5" /> +18.4% this month
          </div>
        </div>

        {/* Total Orders */}
        <div className="p-6 bg-slate-800/80 rounded-3xl border border-slate-700/80 shadow-lg space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase">Total Orders</span>
            <div className="w-9 h-9 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center">
              <ShoppingBag className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-white">
            {stats?.totalOrders || 0}
          </div>
          <div className="text-[11px] text-blue-400 font-semibold">
            Across {stats?.totalCustomers || 1} registered accounts
          </div>
        </div>

        {/* Total Products */}
        <div className="p-6 bg-slate-800/80 rounded-3xl border border-slate-700/80 shadow-lg space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase">Catalog Items</span>
            <div className="w-9 h-9 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center">
              <Package className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-white">
            {stats?.totalProducts || 0}
          </div>
          <div className="text-[11px] text-purple-400 font-semibold">
            Active in 6 distinct departments
          </div>
        </div>

        {/* Low Stock Alerts */}
        <div className="p-6 bg-slate-800/80 rounded-3xl border border-slate-700/80 shadow-lg space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase">Low Stock Warnings</span>
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-amber-400">
            {stats?.lowStockProducts?.length || 0}
          </div>
          <div className="text-[11px] text-amber-300 font-semibold">
            Products below 15 units
          </div>
        </div>

      </div>

      {/* Revenue Graph & Department Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Monthly Revenue Bar Chart */}
        <div className="lg:col-span-8 bg-slate-800/80 p-6 sm:p-8 rounded-3xl border border-slate-700/80 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-white">Monthly Sales & Revenue Velocity</h3>
              <p className="text-xs text-slate-400">Performance across the last 6 months</p>
            </div>
            <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
              Live Stream
            </span>
          </div>

          <div className="h-48 flex items-end justify-between gap-4 pt-8">
            {stats?.monthlyRevenue?.map((m) => {
              const maxRev = 16000;
              const heightPct = Math.min(100, Math.round((m.revenue / maxRev) * 100));
              return (
                <div key={m.month} className="flex-1 flex flex-col items-center gap-2 group">
                  <div className="text-[10px] text-slate-400 font-mono opacity-0 group-hover:opacity-100 transition">
                    ${(m.revenue / 1000).toFixed(1)}k
                  </div>
                  <div className="w-full bg-slate-900 rounded-t-xl overflow-hidden h-36 flex items-end">
                    <div
                      style={{ height: `${heightPct}%` }}
                      className="w-full bg-gradient-to-t from-blue-600 to-indigo-500 group-hover:from-blue-500 group-hover:to-cyan-400 transition-all duration-500 rounded-t-xl"
                    />
                  </div>
                  <span className="text-xs font-bold text-slate-400 group-hover:text-white transition">
                    {m.month}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Category Share */}
        <div className="lg:col-span-4 bg-slate-800/80 p-6 sm:p-8 rounded-3xl border border-slate-700/80 space-y-4">
          <h3 className="text-base font-bold text-white">Inventory Valuation</h3>
          <p className="text-xs text-slate-400">Total stock asset allocation by department</p>

          <div className="space-y-3 pt-2">
            {stats?.categoryDistribution?.map((cat) => (
              <div key={cat.category} className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300 font-semibold">{cat.category}</span>
                  <span className="font-mono text-emerald-400 font-bold">${cat.value.toFixed(0)}</span>
                </div>
                <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-500 rounded-full"
                    style={{ width: `${Math.min(100, (cat.value / 15000) * 100)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Recent Orders Table with Live Status Controls */}
      <div className="bg-slate-800/80 rounded-3xl border border-slate-700/80 overflow-hidden space-y-4 p-6 sm:p-8">
        <div className="flex items-center justify-between pb-4 border-b border-slate-700">
          <div>
            <h3 className="text-base font-bold text-white">Recent Customer Orders</h3>
            <p className="text-xs text-slate-400">Review status and update dispatch pipeline</p>
          </div>
          <Link
            href="/admin/orders"
            className="text-xs font-bold text-blue-400 hover:underline flex items-center gap-1"
          >
            All Orders <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="text-[10px] uppercase font-bold text-slate-400 bg-slate-900/60">
              <tr>
                <th className="p-3">Order ID</th>
                <th className="p-3">Customer</th>
                <th className="p-3">Items</th>
                <th className="p-3">Total</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-right">Fulfillment Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/60">
              {stats?.recentOrders?.map((order) => (
                <tr key={order._id} className="hover:bg-slate-700/30">
                  <td className="p-3 font-mono font-bold text-white">{order.orderNumber}</td>
                  <td className="p-3 font-medium text-slate-200">{order.shippingAddress?.fullName || 'Customer'}</td>
                  <td className="p-3 text-slate-400">{order.items?.length || 0} product(s)</td>
                  <td className="p-3 font-bold text-emerald-400">${order.total.toFixed(2)}</td>
                  <td className="p-3">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-blue-500/20 text-blue-300 border border-blue-500/30">
                      {order.fulfillmentStatus}
                    </span>
                  </td>
                  <td className="p-3 text-right space-x-1">
                    <select
                      value={order.fulfillmentStatus}
                      onChange={(e) => handleUpdateStatus(order._id, e.target.value as any)}
                      className="bg-slate-900 border border-slate-700 text-slate-200 text-xs font-bold rounded-lg px-2.5 py-1 focus:ring-1 focus:ring-blue-500"
                    >
                      <option value="Placed">Placed</option>
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Out for Delivery">Out for Delivery</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
