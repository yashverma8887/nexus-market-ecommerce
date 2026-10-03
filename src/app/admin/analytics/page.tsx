'use client';

import React, { useState, useEffect } from 'react';
import { DashboardStats } from '@/types';
import {
  TrendingUp,
  DollarSign,
  ShoppingBag,
  Package,
  Users,
  PieChart,
  ArrowUpRight,
  ShieldCheck,
  Award
} from 'lucide-react';

export default function AdminAnalyticsPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
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
    }
    loadStats();
  }, []);

  if (loading) {
    return (
      <div className="py-24 text-center">
        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
        <p className="text-xs font-bold text-slate-400">Compiling financial telemetry...</p>
      </div>
    );
  }

  const avgOrderValue = stats?.totalOrders ? (stats.totalRevenue / stats.totalOrders) : 0;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">Financial & Sales Analytics</h1>
        <p className="text-xs text-slate-400 mt-1">Deep-dive financial breakdown, average basket size, and inventory velocity.</p>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="p-6 bg-slate-800/80 rounded-3xl border border-slate-700/80 shadow-lg space-y-2">
          <span className="text-xs font-bold text-slate-400 uppercase">Average Order Value (AOV)</span>
          <div className="text-2xl sm:text-3xl font-black text-emerald-400">
            ${avgOrderValue.toFixed(2)}
          </div>
          <p className="text-[11px] text-slate-400">Benchmark across total checkout volume</p>
        </div>

        <div className="p-6 bg-slate-800/80 rounded-3xl border border-slate-700/80 shadow-lg space-y-2">
          <span className="text-xs font-bold text-slate-400 uppercase">Checkout Conversion</span>
          <div className="text-2xl sm:text-3xl font-black text-blue-400">
            3.8%
          </div>
          <p className="text-[11px] text-emerald-400 font-semibold">+0.6% above e-commerce average</p>
        </div>

        <div className="p-6 bg-slate-800/80 rounded-3xl border border-slate-700/80 shadow-lg space-y-2">
          <span className="text-xs font-bold text-slate-400 uppercase">Gross Inventory Asset Value</span>
          <div className="text-2xl sm:text-3xl font-black text-purple-400">
            ${stats?.categoryDistribution?.reduce((acc, c) => acc + c.value, 0).toLocaleString()}
          </div>
          <p className="text-[11px] text-slate-400">Total warehouse stock valuation</p>
        </div>
      </div>

      {/* Breakdown Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Department Performance */}
        <div className="bg-slate-800/80 p-6 sm:p-8 rounded-3xl border border-slate-700/80 space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <PieChart className="w-5 h-5 text-blue-400" />
            Category Asset Distribution
          </h3>

          <div className="space-y-4 pt-2">
            {stats?.categoryDistribution?.map((cat) => (
              <div key={cat.category} className="p-4 bg-slate-900/60 rounded-2xl border border-slate-700/60 space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-white">{cat.category}</span>
                  <span className="font-mono text-emerald-400 font-bold">${cat.value.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-[11px] text-slate-400">
                  <span>{cat.count} Active Products</span>
                  <span>Avg ${(cat.value / (cat.count || 1)).toFixed(0)} / line</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Inventory Restock Threshold Alerts */}
        <div className="bg-slate-800/80 p-6 sm:p-8 rounded-3xl border border-slate-700/80 space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Package className="w-5 h-5 text-amber-400" />
            Replenishment Priority Queue
          </h3>

          <div className="space-y-3 pt-2">
            {stats?.lowStockProducts?.map((p) => (
              <div key={p._id} className="p-4 bg-slate-900/60 rounded-2xl border border-slate-700/60 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <img src={p.thumbnail} alt="" className="w-10 h-10 rounded-xl object-cover" />
                  <div>
                    <div className="font-bold text-white text-xs">{p.title}</div>
                    <div className="text-[10px] text-slate-400">{p.category} • ${p.price.toFixed(2)}</div>
                  </div>
                </div>

                <div className="text-right">
                  <span className="px-2.5 py-1 bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded-full text-[10px] font-bold">
                    {p.stock} units left
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
