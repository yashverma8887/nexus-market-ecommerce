'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Sparkles, ShieldCheck, Truck, RotateCcw, Headphones, Send, Heart } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      {/* Trust Badges Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 border-b border-slate-800">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Free Express Shipping</h4>
              <p className="text-xs text-slate-400 mt-0.5">On all orders over $150</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Secure Payments</h4>
              <p className="text-xs text-slate-400 mt-0.5">256-bit encrypted checkout</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 shrink-0">
              <RotateCcw className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">30-Day Easy Returns</h4>
              <p className="text-xs text-slate-400 mt-0.5">Hassle-free money back</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
              <Headphones className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">24/7 Dedicated Support</h4>
              <p className="text-xs text-slate-400 mt-0.5">Always here to help you</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links & Info */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold shadow-lg shadow-blue-500/30">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="text-xl font-extrabold text-white tracking-tight">
                NEXUS<span className="text-blue-500">MARKET</span>
              </span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              An enterprise-grade, high-performance e-commerce platform built with modern full-stack web technologies. Engineered for seamless shopping, rich catalog navigation, and end-to-end order orchestration.
            </p>
            <div className="text-xs text-slate-500 flex items-center gap-2 pt-2">
              <span className="px-2.5 py-1 bg-slate-900 border border-slate-800 rounded-md font-mono text-emerald-400">
                Next.js 14 + MongoDB
              </span>
              <span className="px-2.5 py-1 bg-slate-900 border border-slate-800 rounded-md font-mono text-blue-400">
                Tailwind CSS
              </span>
            </div>
          </div>

          {/* Quick Categories */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white tracking-wider uppercase">Categories</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link href="/shop?category=Audio" className="hover:text-blue-400 transition">Audio & Sound</Link></li>
              <li><Link href="/shop?category=Wearables" className="hover:text-blue-400 transition">Smart Wearables</Link></li>
              <li><Link href="/shop?category=Electronics" className="hover:text-blue-400 transition">Electronics & Gear</Link></li>
              <li><Link href="/shop?category=Fashion" className="hover:text-blue-400 transition">Apparel & Bags</Link></li>
              <li><Link href="/shop?category=Smart Home" className="hover:text-blue-400 transition">Smart Home</Link></li>
            </ul>
          </div>

          {/* Customer Portal */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white tracking-wider uppercase">Customer Area</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link href="/orders" className="hover:text-blue-400 transition">Track Order</Link></li>
              <li><Link href="/wishlist" className="hover:text-blue-400 transition">My Wishlist</Link></li>
              <li><Link href="/cart" className="hover:text-blue-400 transition">Shopping Bag</Link></li>
              <li><Link href="/admin" className="hover:text-amber-400 transition">Admin Dashboard</Link></li>
            </ul>
          </div>

          {/* Newsletter Subscription */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white tracking-wider uppercase">Stay in the Loop</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Get exclusive VIP discounts, product drops, and technology updates directly in your inbox.
            </p>
            {subscribed ? (
              <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 px-3 py-2 rounded-xl text-xs font-semibold">
                ✓ Thank you for subscribing!
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="w-full pl-3 pr-10 py-2.5 text-xs bg-slate-900 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                  />
                  <button
                    type="submit"
                    className="absolute right-1.5 top-1.5 p-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            )}
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
        <p>© {new Date().getFullYear()} NexusMarket Inc. Capstone Project Submission for Skill-Nexus MERN.</p>
        <div className="flex items-center gap-1">
          <span>Crafted with</span>
          <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
          <span>for high impact evaluation</span>
        </div>
      </div>
    </footer>
  );
}
