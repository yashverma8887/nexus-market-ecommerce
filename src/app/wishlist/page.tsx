'use client';

import React from 'react';
import Link from 'next/link';
import { useWishlist } from '@/context/WishlistContext';
import { useCart } from '@/context/CartContext';
import { Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';

export default function WishlistPage() {
  const { wishlist, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();

  if (wishlist.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center space-y-6">
        <div className="w-20 h-20 rounded-3xl bg-rose-50 text-rose-400 flex items-center justify-center mx-auto">
          <Heart className="w-10 h-10" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900">Your Wishlist is Empty</h1>
        <p className="text-slate-500 text-sm max-w-md mx-auto">
          Save your favorite products to your wishlist while shopping so you can easily find them later.
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
      <div className="flex items-center justify-between pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Saved Wishlist ({wishlist.length})
          </h1>
          <p className="text-xs text-slate-500 mt-1">Products you love and want to purchase later.</p>
        </div>
        <button
          onClick={clearWishlist}
          className="text-xs text-rose-600 hover:underline font-bold"
        >
          Clear Wishlist
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {wishlist.map((product) => (
          <div
            key={product._id}
            className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden flex flex-col justify-between group hover:shadow-xl transition-all"
          >
            <div className="relative aspect-square bg-slate-100 overflow-hidden">
              <Link href={`/product/${product._id}`}>
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </Link>
              <button
                onClick={() => removeFromWishlist(product._id)}
                className="absolute top-3 right-3 p-2 bg-white/80 hover:bg-white text-slate-400 hover:text-rose-500 rounded-full shadow-md backdrop-blur-sm transition"
                title="Remove"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5 space-y-3">
              <div>
                <span className="text-[10px] font-bold uppercase text-blue-600">{product.category}</span>
                <h3 className="font-bold text-slate-900 text-sm line-clamp-1 mt-0.5">
                  <Link href={`/product/${product._id}`}>{product.title}</Link>
                </h3>
              </div>

              <div className="flex items-baseline justify-between pt-1">
                <span className="text-lg font-black text-slate-900">${product.price.toFixed(2)}</span>
                <span className="text-xs text-emerald-600 font-bold">
                  {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>

              <button
                onClick={() => {
                  addToCart(product, 1);
                  removeFromWishlist(product._id);
                }}
                disabled={product.stock === 0}
                className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 transition shadow-md shadow-blue-500/20 disabled:bg-slate-300"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                Move to Bag
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
