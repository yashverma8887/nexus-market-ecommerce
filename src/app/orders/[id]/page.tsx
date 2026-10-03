'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Order } from '@/types';
import {
  PackageCheck,
  Truck,
  CheckCircle2,
  Clock,
  MapPin,
  CreditCard,
  Printer,
  Sparkles,
  ArrowLeft,
  ChevronRight
} from 'lucide-react';

const ORDER_STEPS = ['Placed', 'Processing', 'Shipped', 'Out for Delivery', 'Delivered'];

function OrderDetailContent() {
  const params = useParams();
  const searchParams = useSearchParams();
  const orderId = params.id as string;
  const isJustPlaced = searchParams.get('success') === 'true';

  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOrder() {
      try {
        const res = await fetch(`/api/orders/${orderId}`);
        const data = await res.json();
        if (data.success && data.order) {
          setOrder(data.order);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    if (orderId) {
      fetchOrder();
    }
  }, [orderId]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
        <p className="text-xs font-bold text-slate-500">Retrieving order details...</p>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-xl font-bold text-slate-800">Order Not Found</h2>
        <p className="text-xs text-slate-500">We could not locate this order in our system.</p>
        <Link href="/orders" className="inline-block px-6 py-2.5 bg-blue-600 text-white rounded-full text-xs font-bold">
          View All Orders
        </Link>
      </div>
    );
  }

  const currentStepIndex = ORDER_STEPS.indexOf(order.fulfillmentStatus);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      
      {/* Top Breadcrumb & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <Link
          href="/orders"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-blue-600 transition"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Orders
        </Link>

        <button
          onClick={() => window.print()}
          className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-xl shadow-sm transition"
        >
          <Printer className="w-4 h-4" /> Print Tax Invoice
        </button>
      </div>

      {/* Just Placed Success Banner */}
      {isJustPlaced && (
        <div className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white p-6 rounded-3xl shadow-xl flex items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1 text-xs font-bold bg-white/20 px-2.5 py-0.5 rounded-full uppercase tracking-wide">
              <Sparkles className="w-3.5 h-3.5" /> Order Successfully Confirmed
            </div>
            <h2 className="text-xl sm:text-2xl font-black">Thank you for your order!</h2>
            <p className="text-emerald-100 text-xs">
              A receipt and tracking updates have been dispatched to your email address.
            </p>
          </div>
          <CheckCircle2 className="w-12 h-12 text-emerald-200 shrink-0 hidden sm:block" />
        </div>
      )}

      {/* Main Order Container */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden space-y-8 p-6 sm:p-10">
        
        {/* Header Information */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Tax Invoice & Dispatch Note</span>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-3">
              Order {order.orderNumber}
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Placed on {new Date(order.createdAt).toLocaleString(undefined, { dateStyle: 'full', timeStyle: 'short' })}
            </p>
          </div>

          <div className="flex flex-col sm:items-end">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Total Charged</span>
            <span className="text-2xl font-black text-blue-600">${order.total.toFixed(2)}</span>
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
              Paid via {order.paymentMethod}
            </span>
          </div>
        </div>

        {/* Real-Time Shipment Tracker Timeline */}
        <div className="bg-slate-50 p-6 sm:p-8 rounded-2xl border border-slate-200/80 space-y-6">
          <div>
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Truck className="w-4 h-4 text-blue-600" />
              Live Shipment Progress
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Carrier Method: <strong className="text-slate-700">{order.shippingMethod}</strong>
            </p>
          </div>

          {/* Progress Steps Bar */}
          <div className="relative">
            <div className="overflow-hidden h-2 mb-4 text-xs flex rounded-full bg-slate-200">
              <div
                style={{ width: `${Math.max(15, ((currentStepIndex + 1) / ORDER_STEPS.length) * 100)}%` }}
                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-r from-blue-600 to-indigo-600 transition-all duration-500"
              />
            </div>

            <div className="grid grid-cols-5 text-center text-xs">
              {ORDER_STEPS.map((step, idx) => {
                const isPassed = idx <= currentStepIndex;
                const isCurrent = idx === currentStepIndex;
                return (
                  <div key={step} className="space-y-1">
                    <div
                      className={`w-6 h-6 rounded-full mx-auto flex items-center justify-center font-bold text-[10px] ${
                        isCurrent
                          ? 'bg-blue-600 text-white ring-4 ring-blue-100'
                          : isPassed
                          ? 'bg-emerald-600 text-white'
                          : 'bg-slate-200 text-slate-500'
                      }`}
                    >
                      {isPassed ? '✓' : idx + 1}
                    </div>
                    <div className={`text-[11px] font-bold ${isPassed ? 'text-slate-900' : 'text-slate-400'}`}>
                      {step}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Timeline Event Log */}
          {order.timeline && order.timeline.length > 0 && (
            <div className="pt-4 border-t border-slate-200 space-y-2">
              <h4 className="text-xs font-bold text-slate-700 uppercase">Activity Log:</h4>
              <div className="space-y-1.5">
                {order.timeline.map((event, idx) => (
                  <div key={idx} className="text-xs flex items-start gap-2 text-slate-600">
                    <span className="font-mono text-slate-400 text-[11px]">
                      {new Date(event.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}:
                    </span>
                    <strong className="text-slate-800">{event.status}</strong> — <span>{event.note || 'Status updated'}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Shipping & Payment Meta Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200/60 space-y-2 text-xs">
            <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
              <MapPin className="w-4 h-4 text-blue-600" />
              Delivery Address
            </div>
            <div className="text-slate-700 font-semibold">{order.shippingAddress.fullName}</div>
            <div className="text-slate-600">{order.shippingAddress.addressLine1}</div>
            <div className="text-slate-600">
              {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.postalCode}
            </div>
            <div className="text-slate-600">{order.shippingAddress.country}</div>
            <div className="text-slate-500 pt-1">Contact: {order.shippingAddress.phone}</div>
          </div>

          <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200/60 space-y-2 text-xs">
            <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
              <CreditCard className="w-4 h-4 text-emerald-600" />
              Payment Details
            </div>
            <div className="text-slate-700 font-semibold">Payment Method: {order.paymentMethod}</div>
            <div className="text-slate-600">Payment Status: <span className="text-emerald-600 font-bold">{order.paymentStatus}</span></div>
            <div className="text-slate-600">Fulfillment Status: <span className="text-blue-600 font-bold">{order.fulfillmentStatus}</span></div>
            {order.couponCode && (
              <div className="text-emerald-700 font-semibold pt-1">
                Applied Coupon: {order.couponCode}
              </div>
            )}
          </div>
        </div>

        {/* Items Line Table */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Ordered Items</h3>
          <div className="divide-y divide-slate-100 border border-slate-200 rounded-2xl overflow-hidden">
            {order.items.map((item, idx) => (
              <div key={idx} className="p-4 flex items-center justify-between gap-4 bg-white">
                <div className="flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-14 h-14 rounded-xl object-cover bg-slate-100 shrink-0"
                  />
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900">{item.title}</h4>
                    <p className="text-xs text-slate-400">Qty: {item.quantity} × ${item.price.toFixed(2)}</p>
                  </div>
                </div>
                <div className="text-sm font-black text-slate-900">
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Price Calculations */}
        <div className="flex justify-end pt-4 border-t border-slate-200">
          <div className="w-full sm:w-72 space-y-2 text-xs text-slate-600">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-semibold text-slate-900">${order.subtotal.toFixed(2)}</span>
            </div>
            {order.discount > 0 && (
              <div className="flex justify-between text-emerald-600 font-semibold">
                <span>Discount</span>
                <span>-${order.discount.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Shipping Fee</span>
              <span>{order.shippingFee === 0 ? 'FREE' : `$${order.shippingFee.toFixed(2)}`}</span>
            </div>
            <div className="flex justify-between">
              <span>Tax</span>
              <span className="font-semibold text-slate-900">${order.tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-base font-black text-slate-900 pt-3 border-t border-slate-200">
              <span>Total Paid</span>
              <span className="text-xl text-blue-600">${order.total.toFixed(2)}</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default function OrderDetailPage() {
  return (
    <Suspense fallback={
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
        <p className="text-xs font-bold text-slate-500">Loading order receipt...</p>
      </div>
    }>
      <OrderDetailContent />
    </Suspense>
  );
}
