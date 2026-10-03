'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import {
  CreditCard,
  Truck,
  ShieldCheck,
  CheckCircle2,
  Lock,
  ArrowRight,
  Sparkles,
  DollarSign
} from 'lucide-react';

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, subtotal, discount, couponCode, tax, shippingFee, total, clearCart } = useCart();
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    fullName: user?.name || 'Alex Johnson',
    email: user?.email || 'demo@nexus.com',
    phone: user?.phone || '+1 (555) 345-9812',
    addressLine1: user?.address?.street || '742 Evergreen Terrace',
    city: user?.address?.city || 'Seattle',
    state: user?.address?.state || 'WA',
    postalCode: user?.address?.postalCode || '98101',
    country: user?.address?.country || 'United States',
  });

  const [shippingSpeed, setShippingSpeed] = useState<'standard' | 'express' | 'priority'>('standard');
  const [paymentMethod, setPaymentMethod] = useState<'Credit Card' | 'Apple Pay' | 'PayPal' | 'UPI' | 'Cash on Delivery'>('Credit Card');
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvc, setCardCvc] = useState('888');

  const [isSubmitting, setIsSubmitting] = useState(false);

  const finalShipping = shippingSpeed === 'standard' ? shippingFee : (shippingSpeed === 'express' ? 15 : 25);
  const finalTotal = Number((subtotal - discount + tax + finalShipping).toFixed(2));

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;

    setIsSubmitting(true);
    try {
      const orderPayload = {
        user: user?._id || 'user_demo_02',
        items: cart.map(item => ({
          product: item.product._id,
          title: item.product.title,
          price: item.product.price,
          quantity: item.quantity,
          image: item.product.thumbnail
        })),
        shippingAddress: {
          fullName: formData.fullName,
          phone: formData.phone,
          addressLine1: formData.addressLine1,
          city: formData.city,
          state: formData.state,
          postalCode: formData.postalCode,
          country: formData.country
        },
        shippingMethod: shippingSpeed === 'standard' ? 'Standard Ground (3-5 Days)' : (shippingSpeed === 'express' ? 'Express Air (2 Days)' : 'Priority Overnight'),
        shippingFee: finalShipping,
        subtotal,
        discount,
        couponCode: couponCode || undefined,
        tax,
        total: finalTotal,
        paymentMethod
      };

      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderPayload)
      });

      const data = await res.json();
      if (data.success && data.order) {
        clearCart();
        router.push(`/orders/${data.order._id}?success=true`);
      }
    } catch (err) {
      console.error(err);
      alert('Error placing order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-xl font-bold">No items in your bag to checkout</h2>
        <button
          onClick={() => router.push('/shop')}
          className="px-6 py-2.5 bg-blue-600 text-white rounded-full text-xs font-bold"
        >
          Return to Shop
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Express Checkout</h1>
        <p className="text-xs text-slate-500 mt-1">Complete your delivery address and simulated payment.</p>
      </div>

      <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Shipping & Payment Form */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Section 1: Shipping Address */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
              <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xs">
                1
              </div>
              <div>
                <h2 className="text-base font-bold text-slate-900">Delivery Address</h2>
                <p className="text-xs text-slate-400">Where should we deliver your order?</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="sm:col-span-2 space-y-1">
                <label className="font-bold text-slate-700">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  required
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Email Address</label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="sm:col-span-2 space-y-1">
                <label className="font-bold text-slate-700">Street Address</label>
                <input
                  type="text"
                  name="addressLine1"
                  required
                  value={formData.addressLine1}
                  onChange={handleInputChange}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">City</label>
                <input
                  type="text"
                  name="city"
                  required
                  value={formData.city}
                  onChange={handleInputChange}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">State</label>
                  <input
                    type="text"
                    name="state"
                    required
                    value={formData.state}
                    onChange={handleInputChange}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Postal Code</label>
                  <input
                    type="text"
                    name="postalCode"
                    required
                    value={formData.postalCode}
                    onChange={handleInputChange}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Shipping Method */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
            <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
              <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xs">
                2
              </div>
              <div>
                <h2 className="text-base font-bold text-slate-900">Shipping Speed</h2>
                <p className="text-xs text-slate-400">Select your preferred courier service level</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <label
                className={`p-4 rounded-2xl border-2 cursor-pointer transition flex flex-col justify-between ${
                  shippingSpeed === 'standard'
                    ? 'border-blue-600 bg-blue-50/50'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <input
                  type="radio"
                  name="speed"
                  checked={shippingSpeed === 'standard'}
                  onChange={() => setShippingSpeed('standard')}
                  className="sr-only"
                />
                <div className="text-xs font-bold text-slate-900">Standard Ground</div>
                <div className="text-[11px] text-slate-500 my-1">3-5 business days</div>
                <div className="text-xs font-black text-emerald-600">
                  {shippingFee === 0 ? 'FREE' : `$${shippingFee.toFixed(2)}`}
                </div>
              </label>

              <label
                className={`p-4 rounded-2xl border-2 cursor-pointer transition flex flex-col justify-between ${
                  shippingSpeed === 'express'
                    ? 'border-blue-600 bg-blue-50/50'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <input
                  type="radio"
                  name="speed"
                  checked={shippingSpeed === 'express'}
                  onChange={() => setShippingSpeed('express')}
                  className="sr-only"
                />
                <div className="text-xs font-bold text-slate-900">Express Air</div>
                <div className="text-[11px] text-slate-500 my-1">2 business days</div>
                <div className="text-xs font-black text-blue-600">$15.00</div>
              </label>

              <label
                className={`p-4 rounded-2xl border-2 cursor-pointer transition flex flex-col justify-between ${
                  shippingSpeed === 'priority'
                    ? 'border-blue-600 bg-blue-50/50'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <input
                  type="radio"
                  name="speed"
                  checked={shippingSpeed === 'priority'}
                  onChange={() => setShippingSpeed('priority')}
                  className="sr-only"
                />
                <div className="text-xs font-bold text-slate-900">Priority Overnight</div>
                <div className="text-[11px] text-slate-500 my-1">Next morning arrival</div>
                <div className="text-xs font-black text-purple-600">$25.00</div>
              </label>
            </div>
          </div>

          {/* Section 3: Payment Simulation */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
              <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xs">
                3
              </div>
              <div>
                <h2 className="text-base font-bold text-slate-900">Payment Simulation</h2>
                <p className="text-xs text-slate-400">Safe sandbox payment gateway (No real charges)</p>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {['Credit Card', 'Apple Pay', 'PayPal', 'UPI'].map((method) => (
                <button
                  type="button"
                  key={method}
                  onClick={() => setPaymentMethod(method as any)}
                  className={`p-3 rounded-xl border text-xs font-bold transition flex items-center justify-center gap-2 ${
                    paymentMethod === method
                      ? 'bg-slate-900 text-white border-slate-900 shadow-md'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {method === 'Credit Card' && <CreditCard className="w-4 h-4" />}
                  {method}
                </button>
              ))}
            </div>

            {paymentMethod === 'Credit Card' && (
              <div className="space-y-4 p-5 bg-slate-50 rounded-2xl border border-slate-200/80">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Card Number</label>
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className="w-full p-3 bg-white border border-slate-200 rounded-xl text-xs font-mono"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">Expiry (MM/YY)</label>
                    <input
                      type="text"
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      className="w-full p-3 bg-white border border-slate-200 rounded-xl text-xs font-mono"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">CVC Code</label>
                    <input
                      type="text"
                      value={cardCvc}
                      onChange={(e) => setCardCvc(e.target.value)}
                      className="w-full p-3 bg-white border border-slate-200 rounded-xl text-xs font-mono"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

        </div>

        {/* Right Side: Order Summary & Place Order */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-sm space-y-6 sticky top-28">
            <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
              Order Summary ({cart.length} items)
            </h2>

            {/* Items Mini List */}
            <div className="space-y-3 max-h-56 overflow-y-auto pr-1 divide-y divide-slate-100">
              {cart.map((item) => (
                <div key={item.product._id} className="pt-3 first:pt-0 flex items-center gap-3">
                  <img
                    src={item.product.thumbnail}
                    alt={item.product.title}
                    className="w-12 h-12 rounded-xl object-cover bg-slate-100 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-bold text-slate-800 truncate">{item.product.title}</div>
                    <div className="text-[10px] text-slate-400">Qty: {item.quantity} × ${item.product.price.toFixed(2)}</div>
                  </div>
                  <div className="text-xs font-extrabold text-slate-900">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>

            {/* Calculations Breakdown */}
            <div className="space-y-2 text-xs text-slate-600 pt-3 border-t border-slate-100">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-slate-900">${subtotal.toFixed(2)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-emerald-600 font-semibold">
                  <span>Voucher Discount</span>
                  <span>-${discount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Shipping ({shippingSpeed})</span>
                <span className="font-semibold text-slate-900">
                  {finalShipping === 0 ? <strong className="text-emerald-600">FREE</strong> : `$${finalShipping.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Tax (8%)</span>
                <span className="font-semibold text-slate-900">${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-base font-black text-slate-900 pt-3 border-t border-slate-200">
                <span>Total Amount</span>
                <span className="text-2xl text-blue-600">${finalTotal.toFixed(2)}</span>
              </div>
            </div>

            {/* Submit Order Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl flex items-center justify-center gap-2 text-sm transition shadow-xl shadow-blue-500/25 disabled:opacity-50"
            >
              {isSubmitting ? (
                <span>Authorizing Order...</span>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  <span>Authorize & Place Order</span>
                </>
              )}
            </button>

            <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Instant Confirmation & Tracking Generated</span>
            </div>
          </div>
        </div>

      </form>
    </div>
  );
}
