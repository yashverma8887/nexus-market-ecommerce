'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Product } from '@/types';
import ProductCard from '@/components/ProductCard';
import {
  Sparkles,
  ArrowRight,
  Headphones,
  Watch,
  Laptop,
  Shirt,
  Armchair,
  Home,
  CheckCircle2,
  TrendingUp,
  Shield,
  Zap,
  Star
} from 'lucide-react';

const CATEGORY_CARDS = [
  { name: 'Audio', icon: Headphones, color: 'from-blue-500 to-indigo-600', count: '4 Items' },
  { name: 'Wearables', icon: Watch, color: 'from-purple-500 to-pink-600', count: '3 Items' },
  { name: 'Electronics', icon: Laptop, color: 'from-emerald-500 to-teal-600', count: '6 Items' },
  { name: 'Fashion', icon: Shirt, color: 'from-amber-500 to-orange-600', count: '3 Items' },
  { name: 'Furniture', icon: Armchair, color: 'from-rose-500 to-red-600', count: '2 Items' },
  { name: 'Smart Home', icon: Home, color: 'from-cyan-500 to-blue-600', count: '4 Items' },
];

export default function HomePage() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetch('/api/products');
        const data = await res.json();
        if (data.success && data.products) {
          setAllProducts(data.products);
          setFeaturedProducts(data.products.filter((p: Product) => p.featured));
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  return (
    <div className="space-y-16 sm:space-y-24 pb-20">
      
      {/* Hero Banner Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-white pt-12 pb-20 sm:pt-20 sm:pb-32">
        {/* Glow ambient background effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-0 right-10 w-[400px] h-[400px] bg-purple-600/15 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Hero Copy */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-bold tracking-wide">
                <Sparkles className="w-3.5 h-3.5 animate-pulse text-blue-400" />
                <span>2026 NEXT-GEN SMART HARDWARE & APPAREL</span>
              </div>

              <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-[1.1] text-white">
                Engineered for <br className="hidden sm:inline" />
                <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">
                  Peak Performance & Style
                </span>
              </h1>

              <p className="text-slate-300 text-base sm:text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Discover a curated collection of ultra-premium electronics, titanium smartwatches, acoustic sound gear, and artisan essentials with instant checkout and real-time shipment tracking.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
                <Link
                  href="/shop"
                  className="w-full sm:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-2xl transition shadow-xl shadow-blue-600/30 flex items-center justify-center gap-2 group"
                >
                  Explore Full Catalog
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  href="/shop?category=Electronics"
                  className="w-full sm:w-auto px-8 py-4 bg-slate-800/80 hover:bg-slate-700 text-slate-200 font-semibold rounded-2xl border border-slate-700 backdrop-blur-md transition flex items-center justify-center"
                >
                  Trending Gear
                </Link>
              </div>

              {/* Stat Highlights */}
              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-slate-800/80 max-w-md mx-auto lg:mx-0">
                <div>
                  <div className="text-2xl font-black text-white">100%</div>
                  <div className="text-xs text-slate-400">Authentic Goods</div>
                </div>
                <div>
                  <div className="text-2xl font-black text-blue-400">2-Day</div>
                  <div className="text-xs text-slate-400">Express Delivery</div>
                </div>
                <div>
                  <div className="text-2xl font-black text-emerald-400">4.9 ★</div>
                  <div className="text-xs text-slate-400">Customer Rating</div>
                </div>
              </div>
            </div>

            {/* Right Hero Product Card Showcase */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md rounded-3xl bg-gradient-to-tr from-slate-800/80 to-slate-900/90 border border-slate-700/80 p-6 backdrop-blur-xl shadow-2xl">
                <div className="relative aspect-square rounded-2xl overflow-hidden mb-5 bg-slate-950">
                  <img
                    src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80"
                    alt="Aura Pro ANC Headphones"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3 bg-rose-500 text-white font-bold text-xs px-2.5 py-1 rounded-full uppercase">
                    Bestseller • 14% Off
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs text-blue-400 font-bold">
                    <span>AuraAcoustics</span>
                    <span className="flex items-center gap-1 text-amber-400">
                      <Star className="w-3.5 h-3.5 fill-amber-400" /> 4.9 (142 reviews)
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white">Aura Pro ANC Wireless Headphones</h3>
                  <p className="text-xs text-slate-400 line-clamp-2">
                    Industry-leading Active Noise Cancellation with 40-hour battery life and custom titanium drivers.
                  </p>

                  <div className="flex items-center justify-between pt-3 border-t border-slate-700/60">
                    <div>
                      <span className="text-2xl font-black text-white">$299.99</span>
                      <span className="text-xs text-slate-400 line-through ml-2">$349.99</span>
                    </div>

                    <Link
                      href="/product/prod_01"
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl transition"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Category Grid Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
          <div>
            <div className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-1">
              Curated Collections
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Browse by Department
            </h2>
          </div>
          <Link
            href="/shop"
            className="text-sm font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 mt-2 md:mt-0"
          >
            All Categories <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {CATEGORY_CARDS.map((cat) => {
            const Icon = cat.icon;
            return (
              <Link
                key={cat.name}
                href={`/shop?category=${encodeURIComponent(cat.name)}`}
                className="group relative p-5 bg-white rounded-2xl border border-slate-200/80 hover:border-blue-400 shadow-sm hover:shadow-md transition-all text-center flex flex-col items-center justify-center overflow-hidden"
              >
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${cat.color} flex items-center justify-center text-white mb-3 shadow-md group-hover:scale-110 transition-transform`}>
                  <Icon className="w-7 h-7" />
                </div>
                <h3 className="font-bold text-slate-800 text-sm group-hover:text-blue-600 transition">
                  {cat.name}
                </h3>
                <span className="text-xs text-slate-400 mt-0.5">{cat.count}</span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Featured Products Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-600 uppercase tracking-widest mb-1">
              <TrendingUp className="w-4 h-4" /> Trending Innovations
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Featured Flagship Gear
            </h2>
          </div>
          <Link
            href="/shop?featured=true"
            className="text-sm font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 mt-2 md:mt-0"
          >
            View all featured <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="bg-slate-100 rounded-2xl aspect-square animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.slice(0, 8).map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* High Impact Promo Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-950 text-white overflow-hidden p-8 sm:p-14 shadow-2xl">
          <div className="relative z-10 max-w-2xl space-y-4">
            <span className="bg-white/10 text-white border border-white/20 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              Limited Time Season Sale
            </span>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              Save 20% on all Smart Accessories & Audio
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Upgrade your productivity setup with high-precision tactile keyboards, studio monitors, and aerospace titanium wearables. Apply code <strong>NEXUS20</strong> at checkout.
            </p>
            <div className="pt-3">
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-white text-slate-950 font-bold rounded-2xl hover:bg-slate-100 transition shadow-lg"
              >
                Claim Discount Now <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* All Products Catalog Preview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
          <div>
            <div className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-1">
              Complete Store
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Explore Our Full Catalog
            </h2>
          </div>
          <Link
            href="/shop"
            className="text-sm font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 mt-2 md:mt-0"
          >
            Open Shop Page <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {allProducts.slice(0, 8).map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </section>

      {/* Feature Highlights Grid */}
      <section className="bg-slate-100/80 py-16 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col md:flex-row items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                <Zap className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-sm">Ultra-Fast Dispatch</h3>
                <p className="text-xs text-slate-500 mt-1">Orders processed and prepared for shipping within 2 hours of payment.</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col md:flex-row items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                <Shield className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-sm">Buyer Protection</h3>
                <p className="text-xs text-slate-500 mt-1">Full refund and immediate replacement on damaged or lost shipments.</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col md:flex-row items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-sm">Enterprise MERN Stack</h3>
                <p className="text-xs text-slate-500 mt-1">Built with React, Next.js, Node serverless APIs, and MongoDB data model.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
