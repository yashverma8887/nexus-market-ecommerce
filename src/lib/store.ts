import { Product, User, Order, Review, DashboardStats } from '@/types';
import { INITIAL_PRODUCTS, INITIAL_USERS, INITIAL_ORDERS } from './mockData';

// Global in-memory cache to persist across hot-reloads and serverless invocations within life cycle
declare global {
  var __NEXUS_STORE__: {
    products: Product[];
    users: User[];
    orders: Order[];
  } | undefined;
}

if (!global.__NEXUS_STORE__) {
  global.__NEXUS_STORE__ = {
    products: JSON.parse(JSON.stringify(INITIAL_PRODUCTS)),
    users: JSON.parse(JSON.stringify(INITIAL_USERS)),
    orders: JSON.parse(JSON.stringify(INITIAL_ORDERS))
  };
}

export const getStore = () => {
  return global.__NEXUS_STORE__!;
};

export const resetStore = () => {
  global.__NEXUS_STORE__ = {
    products: JSON.parse(JSON.stringify(INITIAL_PRODUCTS)),
    users: JSON.parse(JSON.stringify(INITIAL_USERS)),
    orders: JSON.parse(JSON.stringify(INITIAL_ORDERS))
  };
  return global.__NEXUS_STORE__;
};

// ================= PRODUCT OPERATIONS =================
export const getAllProducts = (filters?: {
  search?: string;
  category?: string;
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
  rating?: number;
  featured?: boolean;
  sortBy?: 'price-asc' | 'price-desc' | 'rating' | 'newest';
}) => {
  const store = getStore();
  let results = [...store.products];

  if (filters) {
    if (filters.search) {
      const q = filters.search.toLowerCase();
      results = results.filter(
        p => p.title.toLowerCase().includes(q) ||
             p.description.toLowerCase().includes(q) ||
             p.brand.toLowerCase().includes(q) ||
             p.tags?.some(t => t.toLowerCase().includes(q))
      );
    }

    if (filters.category && filters.category !== 'all') {
      results = results.filter(p => p.category.toLowerCase() === filters.category!.toLowerCase());
    }

    if (filters.brand && filters.brand !== 'all') {
      results = results.filter(p => p.brand.toLowerCase() === filters.brand!.toLowerCase());
    }

    if (filters.minPrice !== undefined) {
      results = results.filter(p => p.price >= filters.minPrice!);
    }

    if (filters.maxPrice !== undefined) {
      results = results.filter(p => p.price <= filters.maxPrice!);
    }

    if (filters.rating !== undefined) {
      results = results.filter(p => p.rating >= filters.rating!);
    }

    if (filters.featured) {
      results = results.filter(p => p.featured);
    }

    if (filters.sortBy) {
      switch (filters.sortBy) {
        case 'price-asc':
          results.sort((a, b) => a.price - b.price);
          break;
        case 'price-desc':
          results.sort((a, b) => b.price - a.price);
          break;
        case 'rating':
          results.sort((a, b) => b.rating - a.rating);
          break;
        case 'newest':
          results.sort((a, b) => (b.createdAt || '').localeCompare(a.createdAt || ''));
          break;
      }
    }
  }

  return results;
};

export const getProductById = (id: string) => {
  const store = getStore();
  return store.products.find(p => p._id === id || p.id === id || p.slug === id);
};

export const createProduct = (data: Partial<Product>) => {
  const store = getStore();
  const newProduct: Product = {
    _id: `prod_${Date.now()}`,
    title: data.title || 'Untitled Product',
    slug: (data.title || 'product').toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    description: data.description || '',
    price: Number(data.price) || 0,
    originalPrice: data.originalPrice ? Number(data.originalPrice) : undefined,
    discountPercentage: data.discountPercentage ? Number(data.discountPercentage) : 0,
    rating: 5.0,
    reviewCount: 0,
    category: data.category || 'General',
    brand: data.brand || 'Nexus Brand',
    stock: Number(data.stock) || 0,
    thumbnail: data.thumbnail || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
    images: data.images?.length ? data.images : [data.thumbnail || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80'],
    featured: Boolean(data.featured),
    tags: data.tags || ['new'],
    specifications: data.specifications || {},
    reviews: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  store.products.unshift(newProduct);
  return newProduct;
};

export const updateProduct = (id: string, data: Partial<Product>) => {
  const store = getStore();
  const index = store.products.findIndex(p => p._id === id || p.id === id);
  if (index === -1) return null;

  store.products[index] = {
    ...store.products[index],
    ...data,
    updatedAt: new Date().toISOString()
  };
  return store.products[index];
};

export const deleteProduct = (id: string) => {
  const store = getStore();
  const index = store.products.findIndex(p => p._id === id || p.id === id);
  if (index === -1) return false;
  store.products.splice(index, 1);
  return true;
};

export const addProductReview = (id: string, review: Omit<Review, '_id' | 'createdAt'>) => {
  const store = getStore();
  const product = store.products.find(p => p._id === id || p.id === id);
  if (!product) return null;

  const newReview: Review = {
    ...review,
    _id: `rev_${Date.now()}`,
    createdAt: new Date().toISOString()
  };

  if (!product.reviews) product.reviews = [];
  product.reviews.unshift(newReview);

  // Recalculate average rating
  const totalRating = product.reviews.reduce((acc, curr) => acc + curr.rating, 0);
  product.rating = Number((totalRating / product.reviews.length).toFixed(1));
  product.reviewCount = product.reviews.length;

  return product;
};

// ================= ORDER OPERATIONS =================
export const getAllOrders = (userId?: string) => {
  const store = getStore();
  if (userId) {
    return store.orders.filter(o => o.user === userId || (typeof o.user === 'object' && o.user._id === userId));
  }
  return store.orders;
};

export const getOrderById = (id: string) => {
  const store = getStore();
  return store.orders.find(o => o._id === id || o.orderNumber === id);
};

export const createOrder = (orderData: Partial<Order>) => {
  const store = getStore();
  const orderNumber = `NX-${Math.floor(10000 + Math.random() * 90000)}`;
  const newOrder: Order = {
    _id: `ord_${Date.now()}`,
    orderNumber,
    user: orderData.user || 'user_demo_02',
    items: orderData.items || [],
    shippingAddress: orderData.shippingAddress || {
      fullName: 'Customer',
      phone: '+1 555-0100',
      addressLine1: 'Main Street',
      city: 'Metropolis',
      state: 'NY',
      postalCode: '10001',
      country: 'USA'
    },
    shippingMethod: orderData.shippingMethod || 'Standard Delivery',
    shippingFee: orderData.shippingFee ?? 0,
    subtotal: orderData.subtotal ?? 0,
    discount: orderData.discount ?? 0,
    couponCode: orderData.couponCode,
    tax: orderData.tax ?? 0,
    total: orderData.total ?? 0,
    paymentMethod: orderData.paymentMethod || 'Credit Card',
    paymentStatus: 'Paid',
    fulfillmentStatus: 'Placed',
    timeline: [
      {
        status: 'Placed',
        timestamp: new Date().toISOString(),
        note: 'Order confirmed and payment verified'
      }
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  store.orders.unshift(newOrder);

  // Reduce product inventory
  for (const item of newOrder.items) {
    const prodId = typeof item.product === 'string' ? item.product : item.product?._id;
    const prod = store.products.find(p => p._id === prodId);
    if (prod && prod.stock > 0) {
      prod.stock = Math.max(0, prod.stock - item.quantity);
    }
  }

  return newOrder;
};

export const updateOrderStatus = (
  id: string,
  fulfillmentStatus: Order['fulfillmentStatus'],
  note?: string
) => {
  const store = getStore();
  const order = store.orders.find(o => o._id === id || o.orderNumber === id);
  if (!order) return null;

  order.fulfillmentStatus = fulfillmentStatus;
  order.updatedAt = new Date().toISOString();
  order.timeline.push({
    status: fulfillmentStatus,
    timestamp: new Date().toISOString(),
    note: note || `Order updated to ${fulfillmentStatus}`
  });

  return order;
};

// ================= USER OPERATIONS =================
export const getAllUsers = () => {
  return getStore().users;
};

export const getUserById = (id: string) => {
  return getStore().users.find(u => u._id === id);
};

export const getUserByEmail = (email: string) => {
  return getStore().users.find(u => u.email.toLowerCase() === email.toLowerCase());
};

export const createUser = (userData: Partial<User>) => {
  const store = getStore();
  const newUser: User = {
    _id: `user_${Date.now()}`,
    name: userData.name || 'User',
    email: userData.email || '',
    role: userData.role || 'customer',
    avatar: userData.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(userData.name || 'user')}`,
    phone: userData.phone || '',
    address: userData.address,
    createdAt: new Date().toISOString()
  };
  store.users.push(newUser);
  return newUser;
};

// ================= DASHBOARD ANALYTICS =================
export const getDashboardStats = (): DashboardStats => {
  const store = getStore();
  const totalRevenue = store.orders.reduce((acc, curr) => acc + (curr.paymentStatus === 'Paid' ? curr.total : 0), 0);
  const totalOrders = store.orders.length;
  const totalProducts = store.products.length;
  const totalCustomers = store.users.filter(u => u.role === 'customer').length;

  const lowStockProducts = store.products.filter(p => p.stock <= 15);

  const categoryMap: Record<string, { count: number; value: number }> = {};
  store.products.forEach(p => {
    if (!categoryMap[p.category]) {
      categoryMap[p.category] = { count: 0, value: 0 };
    }
    categoryMap[p.category].count += 1;
    categoryMap[p.category].value += p.price * p.stock;
  });

  const categoryDistribution = Object.entries(categoryMap).map(([category, data]) => ({
    category,
    count: data.count,
    value: Number(data.value.toFixed(2))
  }));

  const monthlyRevenue = [
    { month: 'Oct', revenue: 4200, orders: 18 },
    { month: 'Nov', revenue: 6800, orders: 27 },
    { month: 'Dec', revenue: 11400, orders: 48 },
    { month: 'Jan', revenue: 8900, orders: 34 },
    { month: 'Feb', revenue: 12800, orders: 52 },
    { month: 'Mar', revenue: totalRevenue > 0 ? totalRevenue : 15400, orders: totalOrders > 0 ? totalOrders : 65 }
  ];

  return {
    totalRevenue: Number(totalRevenue.toFixed(2)),
    totalOrders,
    totalProducts,
    totalCustomers,
    recentOrders: store.orders.slice(0, 5),
    monthlyRevenue,
    categoryDistribution,
    lowStockProducts
  };
};
