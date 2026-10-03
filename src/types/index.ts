export interface Review {
  _id?: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface Product {
  _id: string;
  id?: string;
  title: string;
  slug: string;
  description: string;
  price: number;
  originalPrice?: number;
  discountPercentage?: number;
  rating: number;
  reviewCount: number;
  category: string;
  brand: string;
  stock: number;
  images: string[];
  thumbnail: string;
  featured?: boolean;
  tags: string[];
  specifications?: Record<string, string>;
  reviews?: Review[];
  createdAt?: string;
  updatedAt?: string;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  role: 'customer' | 'admin';
  avatar?: string;
  createdAt?: string;
  phone?: string;
  address?: {
    street?: string;
    city?: string;
    state?: string;
    postalCode?: string;
    country?: string;
  };
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
}

export interface OrderItem {
  product: string | Product;
  title: string;
  price: number;
  quantity: number;
  image: string;
}

export interface ShippingAddress {
  fullName: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface OrderTimeline {
  status: 'Placed' | 'Processing' | 'Shipped' | 'Out for Delivery' | 'Delivered' | 'Cancelled';
  timestamp: string;
  note?: string;
}

export interface Order {
  _id: string;
  orderNumber: string;
  user: string | User;
  items: OrderItem[];
  shippingAddress: ShippingAddress;
  shippingMethod: string;
  shippingFee: number;
  subtotal: number;
  discount: number;
  couponCode?: string;
  tax: number;
  total: number;
  paymentMethod: 'Credit Card' | 'PayPal' | 'Apple Pay' | 'UPI' | 'Cash on Delivery';
  paymentStatus: 'Pending' | 'Paid' | 'Failed';
  fulfillmentStatus: 'Placed' | 'Processing' | 'Shipped' | 'Out for Delivery' | 'Delivered' | 'Cancelled';
  timeline: OrderTimeline[];
  createdAt: string;
  updatedAt: string;
}

export interface DashboardStats {
  totalRevenue: number;
  totalOrders: number;
  totalProducts: number;
  totalCustomers: number;
  recentOrders: Order[];
  monthlyRevenue: { month: string; revenue: number; orders: number }[];
  categoryDistribution: { category: string; count: number; value: number }[];
  lowStockProducts: Product[];
}
