'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ShieldCheck,
  Truck,
  RotateCcw,
  Tag,
  CheckCircle2
} from 'lucide-react';

export default function CartPage() {
  const router = useRouter();
  const {
    cart,
    removeFromCart,
    updateQuantity,
    clearCart,
    subtotal,
    discount,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    tax,
    shippingFee,
    total,
    freeShippingThreshold,
    amountNeededForFreeShipping
  } = useCart();

  const [couponCode, setCouponCode] = useState('');
  const [couponStatus, setCouponStatus] = useState<{ text: string; success: boolean } | null>(null);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCode.trim()) return;
    const res = applyCoupon(couponCode);
    setCouponStatus({ text: res.message, success: res.success });
    if (res.success) setCouponCode('');
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center space-y-6">
        <div className="w-20 h-20 rounded-3xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900">Your Shopping Bag is Empty</h1>
        <p className="text-slate-500 text-sm max-w-md mx-auto">
          Looks like you haven't added anything yet. Explore our premier selection of audio, wearables, and hardware.
        </p>
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl transition shadow-lg shadow-blue-500/25 text-sm"
        >
          Explore Catalog <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Title */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Shopping Bag</h1>
          <p className="text-xs text-slate-500 mt-1">Review your items, apply promotional discounts, and proceed to checkout.</p>
        </div>
        <button
          onClick={clearCart}
          className="text-xs text-rose-600 hover:underline font-bold"
        >
          Clear All Items
        </button>
      </div>

      {/* Free Shipping Alert Bar */}
      <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs text-slate-700">
          <Truck className="w-4 h-4 text-blue-600" />
          {amountNeededForFreeShipping > 0 ? (
            <span>
              Add <strong className="text-blue-700 font-bold">${amountNeededForFreeShipping.toFixed(2)}</strong> more to unlock <strong className="text-emerald-600">FREE Express Delivery</strong>.
            </span>
          ) : (
            <span className="text-emerald-700 font-bold flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Free Express Delivery Unlocked!
            </span>
          )}
        </div>
        <span className="text-xs font-bold text-blue-700">${subtotal.toFixed(2)} / ${freeShippingThreshold}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Items Table */}
        <div className="lg:col-span-8 bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden divide-y divide-slate-100">
          {cart.map((item) => (
            <div key={item.product._id} className="p-6 flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <img
                src={item.product.thumbnail}
                alt={item.product.title}
                className="w-24 h-24 rounded-2xl object-cover bg-slate-100 border border-slate-100 shrink-0"
              />

              <div className="flex-1 min-w-0 space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600">
                  {item.product.category}
                </span>
                <h3 className="text-base font-bold text-slate-900 leading-tight">
                  <Link href={`/product/${item.product._id}`} className="hover:text-blue-600">
                    {item.product.title}
                  </Link>
                </h3>
                <p className="text-xs text-slate-400">Unit Price: ${item.product.price.toFixed(2)}</p>
              </div>

              {/* Quantity Controls */}
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-slate-200 rounded-xl bg-slate-50">
                  <button
                    onClick={() => updateQuantity(item.product._id, item.quantity - 1)}
                    className="p-2 text-slate-500 hover:text-slate-900"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-8 text-center text-xs font-bold text-slate-900">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.product._id, item.quantity + 1)}
                    className="p-2 text-slate-500 hover:text-slate-900"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="text-right min-w-[90px]">
                  <div className="text-base font-extrabold text-slate-900">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </div>
                </div>

                <button
                  onClick={() => removeFromCart(item.product._id)}
                  className="p-2 text-slate-400 hover:text-rose-500 rounded-lg transition"
                  title="Remove"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Right Side: Order Summary Card */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-sm space-y-6">
            <h2 className="text-lg font-black text-slate-900 border-b border-slate-100 pb-4">
              Order Summary
            </h2>

            {/* Promo Code Input */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 uppercase">Promo Voucher</label>
              {appliedCoupon ? (
                <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 text-emerald-800 px-3 py-2 rounded-xl text-xs font-semibold">
                  <span className="flex items-center gap-1.5">
                    <Tag className="w-3.5 h-3.5 text-emerald-600" />
                    <strong>{appliedCoupon}</strong> (-${discount.toFixed(2)})
                  </span>
                  <button onClick={removeCoupon} className="text-rose-600 font-bold hover:underline text-xs">
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Try NEXUS20 or SAVE50"
                    className="flex-1 px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 uppercase"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800"
                  >
                    Apply
                  </button>
                </form>
              )}

              {couponStatus && !appliedCoupon && (
                <p className={`text-xs ${couponStatus.success ? 'text-emerald-600' : 'text-rose-500'}`}>
                  {couponStatus.text}
                </p>
              )}
            </div>

            {/* Calculations Breakdown */}
            <div className="space-y-2 text-xs text-slate-600 pt-2 border-t border-slate-100">
              <div className="flex justify-between">
                <span>Items Subtotal</span>
                <span className="font-semibold text-slate-900">${subtotal.toFixed(2)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-emerald-600 font-semibold">
                  <span>Coupon Discount</span>
                  <span>-${discount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Shipping Fee</span>
                <span>{shippingFee === 0 ? <strong className="text-emerald-600">FREE</strong> : `$${shippingFee.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between">
                <span>Estimated Tax (8%)</span>
                <span className="font-semibold text-slate-900">${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-base font-black text-slate-900 pt-4 border-t border-slate-200">
                <span>Total Amount</span>
                <span className="text-2xl text-blue-600">${total.toFixed(2)}</span>
              </div>
            </div>

            {/* Checkout Button */}
            <button
              onClick={() => router.push('/checkout')}
              className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl flex items-center justify-center gap-2 text-sm transition shadow-xl shadow-blue-500/25"
            >
              Proceed to Secure Checkout <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Guarantees */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-2 text-xs text-slate-600">
            <div className="flex items-center gap-2 font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>SSL 256-bit Encrypted Checkout</span>
            </div>
            <div className="flex items-center gap-2 font-medium">
              <RotateCcw className="w-4 h-4 text-blue-600" />
              <span>30-day Money Back Guarantee</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
