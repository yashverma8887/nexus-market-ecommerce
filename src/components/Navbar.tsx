'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { useAuth } from '@/context/AuthContext';
import {
  ShoppingBag,
  Heart,
  User as UserIcon,
  Search,
  Menu,
  X,
  ShieldCheck,
  LogOut,
  ChevronDown,
  Sparkles,
  PackageCheck,
  LayoutDashboard
} from 'lucide-react';
import { Product } from '@/types';

export default function Navbar() {
  const router = useRouter();
  const { totalItems, setIsCartOpen } = useCart();
  const { wishlist } = useWishlist();
  const { user, logout, loginAsAdmin, loginAsDemoCustomer, isAdmin } = useAuth();

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Live search debounced
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      setShowSearchDropdown(false);
      return;
    }

    const timer = setTimeout(async () => {
      setIsSearching(true);
      try {
        const res = await fetch(`/api/products?search=${encodeURIComponent(searchQuery)}`);
        const data = await res.json();
        if (data.success) {
          setSearchResults(data.products.slice(0, 5));
          setShowSearchDropdown(true);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsSearching(false);
      }
    }, 250);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Close search dropdown on click outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowSearchDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setShowSearchDropdown(false);
      router.push(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <>
      {/* Top Banner */}
      <div className="bg-slate-900 text-slate-300 text-xs py-2 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold px-2 py-0.5 rounded-full text-[10px] uppercase tracking-wider">
              Flash Deal
            </span>
            <span>Use code <strong className="text-white font-mono font-bold">NEXUS20</strong> for 20% OFF your entire order!</span>
          </div>

          <div className="flex items-center gap-4 text-xs font-medium">
            <button
              onClick={loginAsAdmin}
              className={`flex items-center gap-1.5 px-2.5 py-0.5 rounded transition ${
                isAdmin
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                  : 'hover:text-white hover:bg-slate-800'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              {isAdmin ? 'Admin Mode Active' : 'Switch to Admin'}
            </button>

            <span className="text-slate-600">|</span>

            <button
              onClick={loginAsDemoCustomer}
              className="hover:text-white transition"
            >
              Demo Customer
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200/80 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 gap-4">
            
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent">
                  NEXUS<span className="text-blue-600 font-black">MARKET</span>
                </span>
                <span className="block text-[10px] font-semibold tracking-widest text-slate-400 uppercase -mt-1">
                  Premium Commerce
                </span>
              </div>
            </Link>

            {/* Nav Links - Desktop */}
            <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-slate-600">
              <Link href="/" className="hover:text-blue-600 transition">Home</Link>
              <Link href="/shop" className="hover:text-blue-600 transition">Shop All</Link>
              <Link href="/shop?category=Electronics" className="hover:text-blue-600 transition">Electronics</Link>
              <Link href="/shop?category=Audio" className="hover:text-blue-600 transition">Audio</Link>
              <Link href="/shop?category=Wearables" className="hover:text-blue-600 transition">Wearables</Link>
              <Link href="/shop?category=Fashion" className="hover:text-blue-600 transition">Fashion</Link>
              {isAdmin && (
                <Link
                  href="/admin"
                  className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-700 font-semibold border border-amber-200 hover:bg-amber-100 transition"
                >
                  <LayoutDashboard className="w-3.5 h-3.5" />
                  Admin Dashboard
                </Link>
              )}
            </nav>

            {/* Live Search Bar */}
            <div ref={searchRef} className="relative hidden md:block flex-1 max-w-md">
              <form onSubmit={handleSearchSubmit}>
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search premium headphones, watches, 4K displays..."
                    className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-100/80 border border-slate-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
                  />
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  {isSearching && (
                    <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin absolute right-3.5 top-3" />
                  )}
                </div>
              </form>

              {/* Autocomplete Results Dropdown */}
              {showSearchDropdown && searchResults.length > 0 && (
                <div className="absolute left-0 right-0 top-12 bg-white rounded-2xl shadow-2xl border border-slate-200 py-2 z-50 overflow-hidden">
                  <div className="px-3 py-1.5 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    Search Results ({searchResults.length})
                  </div>
                  {searchResults.map((item) => (
                    <Link
                      key={item._id}
                      href={`/product/${item._id}`}
                      onClick={() => setShowSearchDropdown(false)}
                      className="flex items-center gap-3 px-4 py-2.5 hover:bg-slate-50 transition"
                    >
                      <img
                        src={item.thumbnail}
                        alt={item.title}
                        className="w-10 h-10 rounded-lg object-cover bg-slate-100"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-slate-800 truncate">{item.title}</div>
                        <div className="text-xs text-slate-500">{item.category} • ${item.price.toFixed(2)}</div>
                      </div>
                      <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">View</span>
                    </Link>
                  ))}
                  <div className="border-t border-slate-100 mt-1 pt-1 px-3">
                    <button
                      onClick={handleSearchSubmit}
                      className="w-full text-center text-xs font-semibold text-blue-600 py-1.5 hover:underline"
                    >
                      View all results for "{searchQuery}"
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Right Action Icons */}
            <div className="flex items-center gap-3">
              {/* Wishlist Button */}
              <Link
                href="/wishlist"
                className="relative p-2.5 text-slate-700 hover:text-rose-600 hover:bg-slate-100 rounded-full transition"
                title="Wishlist"
              >
                <Heart className="w-5 h-5" />
                {wishlist.length > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse">
                    {wishlist.length}
                  </span>
                )}
              </Link>

              {/* Cart Drawer Toggle Button */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2.5 text-slate-700 hover:text-blue-600 hover:bg-slate-100 rounded-full transition"
                title="Shopping Bag"
              >
                <ShoppingBag className="w-5 h-5" />
                {totalItems > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-blue-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </button>

              {/* User Account Menu */}
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 p-1.5 pl-2 pr-3 rounded-full hover:bg-slate-100 border border-slate-200 text-slate-700 text-sm font-medium transition"
                >
                  <img
                    src={user?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80'}
                    alt={user?.name || 'User'}
                    className="w-7 h-7 rounded-full object-cover ring-1 ring-blue-500/30"
                  />
                  <span className="hidden sm:inline max-w-[100px] truncate text-xs font-semibold">
                    {user ? user.name.split(' ')[0] : 'Account'}
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {/* Dropdown Menu */}
                {userMenuOpen && (
                  <div
                    className="absolute right-0 top-12 w-56 bg-white rounded-2xl shadow-2xl border border-slate-200 py-2 z-50 animate-in fade-in slide-in-from-top-2"
                    onMouseLeave={() => setUserMenuOpen(false)}
                  >
                    <div className="px-4 py-2.5 border-b border-slate-100">
                      <p className="text-sm font-bold text-slate-900 truncate">{user?.name || 'Guest User'}</p>
                      <p className="text-xs text-slate-500 truncate">{user?.email || 'guest@example.com'}</p>
                      <span className={`inline-block mt-1 text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                        isAdmin ? 'bg-amber-100 text-amber-800' : 'bg-blue-100 text-blue-800'
                      }`}>
                        {user?.role || 'Customer'}
                      </span>
                    </div>

                    <div className="py-1">
                      {isAdmin ? (
                        <Link
                          href="/admin"
                          onClick={() => setUserMenuOpen(false)}
                          className="flex items-center gap-2.5 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 font-medium"
                        >
                          <LayoutDashboard className="w-4 h-4 text-amber-600" />
                          Admin Portal
                        </Link>
                      ) : null}

                      <Link
                        href="/orders"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 font-medium"
                      >
                        <PackageCheck className="w-4 h-4 text-blue-600" />
                        My Orders
                      </Link>

                      <Link
                        href="/wishlist"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 font-medium"
                      >
                        <Heart className="w-4 h-4 text-rose-500" />
                        Wishlist ({wishlist.length})
                      </Link>
                    </div>

                    <div className="border-t border-slate-100 pt-1">
                      <button
                        onClick={() => {
                          logout();
                          setUserMenuOpen(false);
                        }}
                        className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-rose-600 hover:bg-rose-50 font-medium text-left"
                      >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 text-slate-700 hover:bg-slate-100 rounded-lg"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-3">
            <form onSubmit={handleSearchSubmit} className="mb-4">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  className="w-full pl-10 pr-4 py-2 text-sm bg-slate-100 border border-slate-200 rounded-xl"
                />
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              </div>
            </form>

            <div className="grid grid-cols-2 gap-2 text-sm font-medium">
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 bg-slate-50 rounded-xl hover:bg-blue-50 hover:text-blue-600"
              >
                🏠 Home
              </Link>
              <Link
                href="/shop"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 bg-slate-50 rounded-xl hover:bg-blue-50 hover:text-blue-600"
              >
                🛍️ Shop All
              </Link>
              <Link
                href="/orders"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 bg-slate-50 rounded-xl hover:bg-blue-50 hover:text-blue-600"
              >
                📦 My Orders
              </Link>
              <Link
                href="/wishlist"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 bg-slate-50 rounded-xl hover:bg-blue-50 hover:text-blue-600"
              >
                ❤️ Wishlist ({wishlist.length})
              </Link>
            </div>

            {isAdmin && (
              <Link
                href="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="block p-3 bg-amber-50 text-amber-800 rounded-xl font-bold border border-amber-200 text-center"
              >
                ⚡ Admin Dashboard
              </Link>
            )}
          </div>
        )}
      </header>
    </>
  );
}
