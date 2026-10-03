'use client';

import React, { useState, useEffect } from 'react';
import { Order } from '@/types';
import {
  ShoppingBag,
  Search,
  Truck,
  CheckCircle2,
  Clock,
  ExternalLink,
  ChevronRight,
  Filter
} from 'lucide-react';
import Link from 'next/link';

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const loadOrders = async () => {
    try {
      const res = await fetch('/api/orders');
      const data = await res.json();
      if (data.success && data.orders) {
        setOrders(data.orders);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const handleStatusChange = async (orderId: string, newStatus: Order['fulfillmentStatus']) => {
    setUpdatingId(orderId);
    try {
      const res = await fetch(`/api/orders/${orderId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: newStatus,
          note: `Fulfillment marked as ${newStatus} by Store Administrator`
        })
      });
      const data = await res.json();
      if (data.success) {
        loadOrders();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setUpdatingId(null);
    }
  };

  const filteredOrders = orders.filter(o => {
    const matchSearch =
      o.orderNumber.toLowerCase().includes(search.toLowerCase()) ||
      o.shippingAddress?.fullName?.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'all' || o.fulfillmentStatus.toLowerCase() === statusFilter.toLowerCase();
    return matchSearch && matchStatus;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">Order Fulfillment Center</h1>
        <p className="text-xs text-slate-400 mt-1">Review orders, manage parcel status, and trigger timeline dispatch events.</p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by order # or customer name..."
            className="w-full pl-9 pr-3 py-2 text-xs bg-slate-900 border border-slate-700 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-xs text-slate-400">Status:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-slate-900 border border-slate-700 text-slate-200 text-xs font-semibold rounded-xl px-3 py-2 focus:ring-1 focus:ring-blue-500"
          >
            <option value="all">All Statuses ({orders.length})</option>
            <option value="placed">Placed</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
          </select>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-slate-800/80 rounded-3xl border border-slate-700/80 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="text-[10px] uppercase font-bold text-slate-400 bg-slate-900/60">
              <tr>
                <th className="p-4">Order Details</th>
                <th className="p-4">Recipient</th>
                <th className="p-4">Delivery Speed</th>
                <th className="p-4">Items Total</th>
                <th className="p-4">Current Status</th>
                <th className="p-4 text-right">Dispatch Control</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/60">
              {filteredOrders.map((o) => (
                <tr key={o._id} className="hover:bg-slate-700/30">
                  <td className="p-4">
                    <div className="font-mono font-black text-white">{o.orderNumber}</div>
                    <div className="text-[10px] text-slate-400">
                      {new Date(o.createdAt).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="font-semibold text-slate-200">{o.shippingAddress?.fullName}</div>
                    <div className="text-[10px] text-slate-400">{o.shippingAddress?.city}, {o.shippingAddress?.state}</div>
                  </td>
                  <td className="p-4">
                    <span className="text-slate-300 font-medium">{o.shippingMethod}</span>
                  </td>
                  <td className="p-4">
                    <div className="font-bold text-emerald-400">${o.total.toFixed(2)}</div>
                    <div className="text-[10px] text-slate-400">{o.items?.length || 0} item(s)</div>
                  </td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                      o.fulfillmentStatus === 'Delivered'
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        : o.fulfillmentStatus === 'Shipped'
                        ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                        : 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                    }`}>
                      {o.fulfillmentStatus}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <select
                        disabled={updatingId === o._id}
                        value={o.fulfillmentStatus}
                        onChange={(e) => handleStatusChange(o._id, e.target.value as any)}
                        className="bg-slate-900 border border-slate-700 text-slate-200 text-xs font-bold rounded-lg px-2.5 py-1.5 focus:ring-1 focus:ring-blue-500"
                      >
                        <option value="Placed">Placed</option>
                        <option value="Processing">Processing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Out for Delivery">Out for Delivery</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>

                      <Link
                        href={`/orders/${o._id}`}
                        className="p-1.5 bg-slate-700 hover:bg-slate-600 text-slate-200 rounded-lg transition"
                        title="View Receipt"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </Link>
                    </div>
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
