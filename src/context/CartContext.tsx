'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem } from '@/types';
import { COUPONS } from '@/lib/mockData';

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number, selectedColor?: string, selectedSize?: string) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  totalItems: number;
  subtotal: number;
  discount: number;
  appliedCoupon: string | null;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  tax: number;
  shippingFee: number;
  total: number;
  freeShippingThreshold: number;
  amountNeededForFreeShipping: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>('NEXUS10');
  const freeShippingThreshold = 150;

  // Initialize cart from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('nexus_cart');
    if (saved) {
      try {
        setCart(JSON.parse(saved));
      } catch (e) {
        setCart([]);
      }
    } else {
      // Preload 1 sample item so cart is engaging right away
      setCart([
        {
          product: {
            _id: 'prod_01',
            title: 'Aura Pro ANC Wireless Headphones',
            slug: 'aura-pro-anc-wireless-headphones',
            description: 'Immersive sound with industry-leading Active Noise Cancellation.',
            price: 299.99,
            rating: 4.9,
            reviewCount: 142,
            category: 'Audio',
            brand: 'AuraAcoustics',
            stock: 35,
            thumbnail: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
            images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80'],
            tags: ['wireless', 'noise-cancelling']
          },
          quantity: 1
        }
      ]);
    }
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    localStorage.setItem('nexus_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: Product, quantity = 1, selectedColor?: string, selectedSize?: string) => {
    setCart(prev => {
      const existing = prev.find(item => item.product._id === product._id);
      if (existing) {
        return prev.map(item =>
          item.product._id === product._id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity, selectedColor, selectedSize }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product._id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev =>
      prev.map(item =>
        item.product._id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
  };

  const applyCoupon = (code: string) => {
    const upper = code.trim().toUpperCase();
    const coupon = COUPONS[upper];
    if (!coupon) {
      return { success: false, message: 'Invalid discount coupon code' };
    }
    if (coupon.minSpend && subtotal < coupon.minSpend) {
      return {
        success: false,
        message: `Minimum order of $${coupon.minSpend} required for this coupon`
      };
    }
    setAppliedCoupon(upper);
    return { success: true, message: `Coupon ${upper} applied successfully!` };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
  };

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  // Discount calculation
  let discount = 0;
  if (appliedCoupon && COUPONS[appliedCoupon]) {
    const coupon = COUPONS[appliedCoupon];
    if (coupon.discountPercent) {
      discount = (subtotal * coupon.discountPercent) / 100;
    } else if (coupon.discountAmount) {
      discount = Math.min(subtotal, coupon.discountAmount);
    }
  }

  // Shipping calculation
  const isFreeShipping = subtotal >= freeShippingThreshold || appliedCoupon === 'FREESHIP';
  const shippingFee = cart.length === 0 ? 0 : (isFreeShipping ? 0 : 15.00);
  const amountNeededForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  // Tax calculation (8%)
  const taxableAmount = Math.max(0, subtotal - discount);
  const tax = Number((taxableAmount * 0.08).toFixed(2));

  // Final Total
  const total = Number((taxableAmount + shippingFee + tax).toFixed(2));

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        totalItems,
        subtotal: Number(subtotal.toFixed(2)),
        discount: Number(discount.toFixed(2)),
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        tax,
        shippingFee,
        total,
        freeShippingThreshold,
        amountNeededForFreeShipping: Number(amountNeededForFreeShipping.toFixed(2))
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
