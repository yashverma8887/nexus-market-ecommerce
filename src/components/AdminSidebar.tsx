'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Users,
  TrendingUp,
  RotateCcw,
  Store,
  ShieldCheck
} from 'lucide-react';

const ADMIN_LINKS = [
  { name: 'Overview', href: '/admin', icon: LayoutDashboard },
  { name: 'Product Control', href: '/admin/products', icon: Package },
  { name: 'Order Fulfillment', href: '/admin/orders', icon: ShoppingBag },
  { name: 'Revenue Analytics', href: '/admin/analytics', icon: TrendingUp },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-slate-900 text-slate-300 min-h-[calc(100vh-80px)] p-6 flex flex-col justify-between border-r border-slate-800">
      <div className="space-y-6">
        <div className="flex items-center gap-2.5 px-2">
          <div className="w-8 h-8 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-bold">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm font-black text-white tracking-tight">ADMIN CONTROL</h2>
            <span className="text-[10px] text-amber-400 font-bold uppercase">Store Operator</span>
          </div>
        </div>

        <nav className="space-y-1.5 pt-2">
          {ADMIN_LINKS.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/80'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{link.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="space-y-3 pt-6 border-t border-slate-800">
        <Link
          href="/"
          className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-bold text-slate-400 hover:text-white hover:bg-slate-800 transition"
        >
          <Store className="w-4 h-4 text-blue-400" />
          <span>Back to Storefront</span>
        </Link>
      </div>
    </aside>
  );
}
