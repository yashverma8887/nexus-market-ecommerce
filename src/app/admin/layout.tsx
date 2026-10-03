'use client';

import React from 'react';
import AdminSidebar from '@/components/AdminSidebar';
import { useAuth } from '@/context/AuthContext';
import { ShieldAlert, ShieldCheck } from 'lucide-react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loginAsAdmin, isAdmin } = useAuth();

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col md:flex-row">
      {/* Sidebar */}
      <div className="hidden md:block">
        <AdminSidebar />
      </div>

      {/* Main Admin Content */}
      <div className="flex-1 flex flex-col min-w-0 bg-slate-900 text-slate-100 p-6 sm:p-10">
        {!isAdmin && (
          <div className="mb-6 p-4 bg-amber-500/20 border border-amber-500/40 rounded-2xl flex items-center justify-between gap-4 text-amber-200 text-xs">
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0" />
              <span>You are viewing the dashboard in preview mode. Switch to Full Admin to enable all management permissions.</span>
            </div>
            <button
              onClick={loginAsAdmin}
              className="px-4 py-2 bg-amber-500 text-slate-950 font-bold rounded-xl text-xs hover:bg-amber-400 transition shrink-0"
            >
              Activate Admin
            </button>
          </div>
        )}
        {children}
      </div>
    </div>
  );
}
