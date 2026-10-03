'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { useAuth } from '@/context/AuthContext';
import ProductCard from '@/components/ProductCard';
import {
  Star,
  ShoppingBag,
  Heart,
  Truck,
  ShieldCheck,
  RotateCcw,
  Plus,
  Minus,
  CheckCircle2,
  ChevronRight,
  MessageSquare,
  Sparkles,
  ArrowRight
} from 'lucide-react';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const productId = params.id as string;

  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { user } = useAuth();

  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);

  // Review Form state
  const [reviewRating, setReviewRating] = useState<number>(5);
  const [reviewComment, setReviewComment] = useState<string>('');
  const [submittingReview, setSubmittingReview] = useState<boolean>(false);
  const [reviewSuccess, setReviewSuccess] = useState<boolean>(false);

  useEffect(() => {
    async function loadProduct() {
      setLoading(true);
      try {
        const res = await fetch(`/api/products/${productId}`);
        const data = await res.json();
        if (data.success && data.product) {
          setProduct(data.product);
          setSelectedImage(data.product.images?.[0] || data.product.thumbnail);

          // Fetch related products in the same category
          const allRes = await fetch(`/api/products?category=${encodeURIComponent(data.product.category)}`);
          const allData = await allRes.json();
          if (allData.success && allData.products) {
            setRelatedProducts(allData.products.filter((p: Product) => p._id !== data.product._id).slice(0, 4));
          }
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    if (productId) {
      loadProduct();
    }
  }, [productId]);

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewComment.trim() || !product) return;

    setSubmittingReview(true);
    try {
      const res = await fetch(`/api/products/${product._id}/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user?._id || 'guest_user',
          userName: user?.name || 'Verified Buyer',
          userAvatar: user?.avatar,
          rating: reviewRating,
          comment: reviewComment
        })
      });
      const data = await res.json();
      if (data.success && data.product) {
        setProduct(data.product);
        setReviewComment('');
        setReviewSuccess(true);
        setTimeout(() => setReviewSuccess(false), 4000);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSubmittingReview(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-sm font-semibold text-slate-500">Loading product details...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-800">Product Not Found</h2>
        <p className="text-slate-500 text-sm">The product you are looking for might have been retired or removed.</p>
        <Link href="/shop" className="inline-block px-6 py-2.5 bg-blue-600 text-white font-bold rounded-full text-xs">
          Return to Shop
        </Link>
      </div>
    );
  }

  const isFavorite = isInWishlist(product._id);
  const images = product.images && product.images.length > 0 ? product.images : [product.thumbnail];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-16">
      
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs font-semibold text-slate-400">
        <Link href="/" className="hover:text-slate-700">Home</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link href="/shop" className="hover:text-slate-700">Shop</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link href={`/shop?category=${encodeURIComponent(product.category)}`} className="hover:text-slate-700">
          {product.category}
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-slate-800 truncate max-w-xs">{product.title}</span>
      </nav>

      {/* Main Product Showcase Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Column: Image Gallery */}
        <div className="lg:col-span-7 space-y-4">
          {/* Main Large Image */}
          <div className="relative aspect-square rounded-3xl bg-slate-100 overflow-hidden border border-slate-200/80 shadow-md">
            <img
              src={selectedImage}
              alt={product.title}
              className="w-full h-full object-cover object-center transition-all duration-300"
            />

            {product.discountPercentage && product.discountPercentage > 0 && (
              <span className="absolute top-4 left-4 bg-rose-500 text-white font-bold text-xs px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                Save {product.discountPercentage}%
              </span>
            )}

            <button
              onClick={() => toggleWishlist(product)}
              className={`absolute top-4 right-4 p-3 rounded-full backdrop-blur-md shadow-md transition ${
                isFavorite
                  ? 'bg-rose-500 text-white'
                  : 'bg-white/80 text-slate-700 hover:bg-white hover:text-rose-500'
              }`}
            >
              <Heart className="w-5 h-5 fill-current" />
            </button>
          </div>

          {/* Thumbnails Row */}
          {images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className={`w-20 h-20 rounded-2xl overflow-hidden bg-slate-100 border-2 transition shrink-0 ${
                    selectedImage === img
                      ? 'border-blue-600 ring-2 ring-blue-500/20'
                      : 'border-transparent hover:border-slate-300'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Details & Purchase Options */}
        <div className="lg:col-span-5 space-y-6">
          {/* Brand & Category */}
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold uppercase tracking-widest text-blue-600">
              {product.brand}
            </span>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600">
              {product.category}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-tight">
            {product.title}
          </h1>

          {/* Star Rating Bar */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 bg-amber-50 border border-amber-200/80 px-2.5 py-1 rounded-lg">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span className="text-xs font-extrabold text-slate-800">{product.rating.toFixed(1)}</span>
            </div>
            <a href="#reviews" className="text-xs font-semibold text-blue-600 hover:underline">
              {product.reviewCount} Verified Customer Reviews
            </a>
            <span className="text-slate-300">•</span>
            <span className={`text-xs font-bold ${product.stock > 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
              {product.stock > 0 ? `In Stock (${product.stock} units available)` : 'Currently Out of Stock'}
            </span>
          </div>

          {/* Pricing */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/60 flex items-baseline gap-3">
            <span className="text-3xl font-black text-slate-900">
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="text-base text-slate-400 line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
            {product.discountPercentage && product.discountPercentage > 0 && (
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                Save ${(product.originalPrice! - product.price).toFixed(2)}
              </span>
            )}
          </div>

          {/* Description */}
          <p className="text-sm text-slate-600 leading-relaxed">
            {product.description}
          </p>

          {/* Quantity and Actions */}
          <div className="space-y-4 pt-4 border-t border-slate-200">
            <div className="flex items-center gap-4">
              <div className="text-xs font-bold text-slate-700 uppercase">Quantity:</div>
              <div className="flex items-center border border-slate-300 rounded-xl bg-white shadow-sm">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2.5 text-slate-600 hover:text-slate-900 rounded-l-xl transition"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-12 text-center text-sm font-bold text-slate-900">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  className="p-2.5 text-slate-600 hover:text-slate-900 rounded-r-xl transition"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => addToCart(product, quantity)}
                disabled={product.stock === 0}
                className="w-full py-3.5 px-6 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl flex items-center justify-center gap-2 transition shadow-lg shadow-blue-500/25 disabled:bg-slate-400"
              >
                <ShoppingBag className="w-4 h-4" />
                Add to Bag
              </button>

              <button
                onClick={() => {
                  addToCart(product, quantity);
                  router.push('/checkout');
                }}
                disabled={product.stock === 0}
                className="w-full py-3.5 px-6 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-2xl flex items-center justify-center gap-2 transition shadow-md disabled:bg-slate-400"
              >
                Buy Now
              </button>
            </div>
          </div>

          {/* Value Props Guarantee */}
          <div className="grid grid-cols-3 gap-3 pt-4 text-center border-t border-slate-200 text-slate-600">
            <div className="p-3 bg-slate-50 rounded-xl">
              <Truck className="w-5 h-5 mx-auto text-blue-600 mb-1" />
              <div className="text-[11px] font-bold text-slate-800">Fast Delivery</div>
              <div className="text-[9px] text-slate-400">2-4 business days</div>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl">
              <ShieldCheck className="w-5 h-5 mx-auto text-emerald-600 mb-1" />
              <div className="text-[11px] font-bold text-slate-800">2 Yr Warranty</div>
              <div className="text-[9px] text-slate-400">Comprehensive</div>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl">
              <RotateCcw className="w-5 h-5 mx-auto text-purple-600 mb-1" />
              <div className="text-[11px] font-bold text-slate-800">Free Returns</div>
              <div className="text-[9px] text-slate-400">30-day window</div>
            </div>
          </div>

          {/* Technical Specifications */}
          {product.specifications && Object.keys(product.specifications).length > 0 && (
            <div className="pt-4 border-t border-slate-200">
              <h3 className="text-sm font-bold text-slate-900 mb-3 uppercase tracking-wider">
                Technical Specifications
              </h3>
              <div className="divide-y divide-slate-100 bg-white border border-slate-200 rounded-2xl overflow-hidden">
                {Object.entries(product.specifications).map(([key, val]) => (
                  <div key={key} className="flex justify-between px-4 py-2.5 text-xs">
                    <span className="font-semibold text-slate-500">{key}</span>
                    <span className="font-medium text-slate-800 text-right">{val}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>

      {/* Customer Reviews & Feedback Section */}
      <section id="reviews" className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 space-y-8 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-blue-600" />
              Customer Reviews ({product.reviews?.length || 0})
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Read real verified purchaser experiences and submit your own product rating.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-3xl font-black text-slate-900">{product.rating.toFixed(1)}</div>
            <div>
              <div className="flex text-amber-400">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    className={`w-4 h-4 ${s <= Math.round(product.rating) ? 'fill-amber-400' : 'text-slate-200'}`}
                  />
                ))}
              </div>
              <span className="text-[11px] text-slate-400 font-medium">Based on {product.reviewCount} ratings</span>
            </div>
          </div>
        </div>

        {/* Review Submission Form */}
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200/80 space-y-4">
          <h3 className="text-sm font-bold text-slate-800">Write a Customer Review</h3>
          
          {reviewSuccess ? (
            <div className="p-4 bg-emerald-50 text-emerald-800 rounded-xl border border-emerald-200 text-xs font-semibold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Your review has been published and added to the product rating!
            </div>
          ) : (
            <form onSubmit={handleReviewSubmit} className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-slate-600">Your Rating:</span>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setReviewRating(star)}
                      className="p-1 hover:scale-125 transition-transform"
                    >
                      <Star
                        className={`w-5 h-5 ${star <= reviewRating ? 'text-amber-400 fill-amber-400' : 'text-slate-300'}`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <textarea
                value={reviewComment}
                onChange={(e) => setReviewComment(e.target.value)}
                placeholder="Share your thoughts on build quality, audio performance, comfort, battery..."
                rows={3}
                required
                className="w-full p-3 text-xs bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <button
                type="submit"
                disabled={submittingReview}
                className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition disabled:opacity-50"
              >
                {submittingReview ? 'Submitting...' : 'Post Review'}
              </button>
            </form>
          )}
        </div>

        {/* Reviews List */}
        <div className="space-y-4 divide-y divide-slate-100">
          {!product.reviews || product.reviews.length === 0 ? (
            <p className="text-xs text-slate-400 py-4 italic">No customer reviews yet. Be the first to review this product!</p>
          ) : (
            product.reviews.map((rev, idx) => (
              <div key={idx} className="pt-4 first:pt-0 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={rev.userAvatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(rev.userName)}`}
                      alt={rev.userName}
                      className="w-7 h-7 rounded-full object-cover bg-slate-200"
                    />
                    <div>
                      <div className="text-xs font-bold text-slate-900">{rev.userName}</div>
                      <div className="text-[10px] text-emerald-600 font-medium">✓ Verified Purchase</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 text-amber-400">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star
                        key={s}
                        className={`w-3.5 h-3.5 ${s <= rev.rating ? 'fill-amber-400' : 'text-slate-200'}`}
                      />
                    ))}
                  </div>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">{rev.comment}</p>
                <div className="text-[10px] text-slate-400">{new Date(rev.createdAt).toLocaleDateString()}</div>
              </div>
            ))
          )}
        </div>
      </section>

      {/* Related Products Recommendation Carousel */}
      {relatedProducts.length > 0 && (
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900">Similar Products You Might Like</h2>
            <Link
              href={`/shop?category=${encodeURIComponent(product.category)}`}
              className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1"
            >
              More in {product.category} <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p._id} product={p} />
            ))}
          </div>
        </section>
      )}

    </div>
  );
}
