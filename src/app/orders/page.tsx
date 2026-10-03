'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { Order } from '@/types';
import {
  PackageCheck,
  Truck,
  CheckCircle2,
  Clock,
  ChevronRight,
  ShoppingBag,
  ExternalLink
} from 'lucide-react';

export default function OrdersHistoryPage() {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadOrders() {
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
    }
    loadOrders();
  }, [user]);

  const getStatusBadge = (status: Order['fulfillmentStatus']) => {
    switch (status) {
      case 'Delivered':
        return <span className="bg-emerald-100 text-emerald-800 border border-emerald-200 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5" /> Delivered</span>;
      case 'Shipped':
        return <span className="bg-blue-100 text-blue-800 border border-blue-200 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5"><Truck className="w-3.5 h-3.5" /> In Transit</span>;
      case 'Processing':
        return <span className="bg-purple-100 text-purple-800 border border-purple-200 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> Processing</span>;
      case 'Placed':
        return <span className="bg-amber-100 text-amber-800 border border-amber-200 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> Order Placed</span>;
      default:
        return <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-xs font-bold">{status}</span>;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Order History</h1>
        <p className="text-xs text-slate-500 mt-1">Track real-time shipment status, review past receipts, and view invoice breakdowns.</p>
      </div>

      {loading ? (
        <div className="py-20 text-center">
          <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-xs font-bold text-slate-500">Loading your orders...</p>
        </div>
      ) : orders.length === 0 ? (
        <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
            <PackageCheck className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-slate-800">No orders placed yet</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Explore our curated technology catalog and place your first order today.
          </p>
          <Link
            href="/shop"
            className="inline-block px-6 py-2.5 bg-blue-600 text-white rounded-full text-xs font-bold hover:bg-blue-700 transition"
          >
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden hover:border-blue-400/60 transition duration-300"
            >
              {/* Order Card Header */}
              <div className="bg-slate-50/80 p-5 sm:px-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/60">
                <div className="grid grid-cols-2 sm:flex sm:items-center gap-4 sm:gap-8 text-xs">
                  <div>
                    <span className="text-slate-400 block font-semibold uppercase text-[10px]">Order Number</span>
                    <span className="font-mono font-bold text-slate-900">{order.orderNumber}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block font-semibold uppercase text-[10px]">Date Placed</span>
                    <span className="font-bold text-slate-800">
                      {new Date(order.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block font-semibold uppercase text-[10px]">Total Amount</span>
                    <span className="font-extrabold text-blue-600">${order.total.toFixed(2)}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {getStatusBadge(order.fulfillmentStatus)}
                  <Link
                    href={`/orders/${order._id}`}
                    className="px-4 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-xl flex items-center gap-1 transition shadow-sm"
                  >
                    Details <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              {/* Order Items List */}
              <div className="p-5 sm:px-8 divide-y divide-slate-100">
                {order.items.map((item, idx) => (
                  <div key={idx} className="py-4 first:pt-0 last:pb-0 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-14 h-14 rounded-xl object-cover bg-slate-100 border border-slate-100"
                      />
                      <div>
                        <h4 className="text-xs sm:text-sm font-bold text-slate-900">{item.title}</h4>
                        <p className="text-xs text-slate-400 mt-0.5">Quantity: {item.quantity} × ${item.price.toFixed(2)}</p>
                      </div>
                    </div>
                    <div className="text-xs sm:text-sm font-bold text-slate-800 text-right">
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
