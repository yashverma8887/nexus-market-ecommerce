'use client';

import React from 'react';
import Link from 'next/link';
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { Star, ShoppingBag, Heart, Check, Sparkles } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const isFavorite = isInWishlist(product._id);

  return (
    <div className="group relative bg-white rounded-2xl border border-slate-200/80 hover:border-blue-400/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden">
      
      {/* Thumbnail Container */}
      <div className="relative aspect-square w-full bg-slate-100 overflow-hidden">
        <Link href={`/product/${product._id}`} className="block w-full h-full">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
            loading="lazy"
          />
        </Link>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 pointer-events-none">
          {product.discountPercentage && product.discountPercentage > 0 && (
            <span className="bg-rose-500 text-white font-bold text-[10px] tracking-wider uppercase px-2 py-0.5 rounded-full shadow-sm">
              -{product.discountPercentage}% OFF
            </span>
          )}
          {product.featured && (
            <span className="bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold text-[10px] tracking-wider uppercase px-2 py-0.5 rounded-full shadow-sm flex items-center gap-1">
              <Sparkles className="w-2.5 h-2.5" /> Featured
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={() => toggleWishlist(product)}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition shadow-md ${
            isFavorite
              ? 'bg-rose-500 text-white'
              : 'bg-white/80 text-slate-700 hover:bg-white hover:text-rose-500'
          }`}
          title={isFavorite ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart className="w-4 h-4 fill-current" />
        </button>

        {/* Quick Add Overlay on Hover */}
        <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={() => addToCart(product, 1)}
            disabled={product.stock === 0}
            className="w-full py-2.5 bg-slate-900/90 hover:bg-blue-600 text-white text-xs font-bold rounded-xl backdrop-blur-md transition flex items-center justify-center gap-2 shadow-lg disabled:bg-slate-400"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            {product.stock > 0 ? 'Quick Add to Bag' : 'Out of Stock'}
          </button>
        </div>
      </div>

      {/* Product Information */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Category & Brand */}
          <div className="flex items-center justify-between text-xs text-slate-400 font-medium mb-1.5">
            <span>{product.brand}</span>
            <span className="text-blue-600 font-semibold">{product.category}</span>
          </div>

          {/* Title */}
          <Link href={`/product/${product._id}`}>
            <h3 className="font-bold text-slate-800 text-sm sm:text-base leading-tight hover:text-blue-600 transition line-clamp-1">
              {product.title}
            </h3>
          </Link>

          {/* Description Excerpt */}
          <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Price & Rating Bar */}
        <div className="pt-4 mt-2 border-t border-slate-100 flex items-center justify-between">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-base sm:text-lg font-black text-slate-900">
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <span className="text-xs text-slate-400 line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>
          </div>

          {/* Star Rating */}
          <div className="flex items-center gap-1 text-xs font-bold text-slate-700 bg-amber-50 px-2 py-1 rounded-md border border-amber-200/60">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>{product.rating.toFixed(1)}</span>
            <span className="text-slate-400 font-normal">({product.reviewCount})</span>
          </div>
        </div>
      </div>
    </div>
  );
}
