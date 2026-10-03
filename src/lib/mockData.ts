import { Product, User, Order } from '@/types';

export const INITIAL_USERS: User[] = [
  {
    _id: 'user_admin_01',
    name: 'Admin Yash',
    email: 'admin@nexus.com',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    phone: '+1 (555) 019-2834',
    address: {
      street: '100 Silicon Way, Suite 400',
      city: 'San Francisco',
      state: 'CA',
      postalCode: '94107',
      country: 'United States'
    },
    createdAt: '2024-01-10T08:00:00.000Z'
  },
  {
    _id: 'user_demo_02',
    name: 'Alex Johnson',
    email: 'demo@nexus.com',
    role: 'customer',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&q=80',
    phone: '+1 (555) 345-9812',
    address: {
      street: '742 Evergreen Terrace',
      city: 'Seattle',
      state: 'WA',
      postalCode: '98101',
      country: 'United States'
    },
    createdAt: '2024-02-15T10:30:00.000Z'
  }
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    _id: 'prod_01',
    title: 'Aura Pro ANC Wireless Headphones',
    slug: 'aura-pro-anc-wireless-headphones',
    description: 'Immersive sound with industry-leading Active Noise Cancellation, 40-hour battery life, ultra-plush memory foam earcups, and crystal-clear beamforming microphone array.',
    price: 299.99,
    originalPrice: 349.99,
    discountPercentage: 14,
    rating: 4.9,
    reviewCount: 142,
    category: 'Audio',
    brand: 'AuraAcoustics',
    stock: 35,
    thumbnail: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=800&q=80'
    ],
    featured: true,
    tags: ['wireless', 'noise-cancelling', 'bluetooth 5.3', 'audiophile', 'bestseller'],
    specifications: {
      'Battery Life': '40 Hours (ANC ON)',
      'Connectivity': 'Bluetooth 5.3 + 3.5mm Aux',
      'Weight': '250g',
      'Driver Size': '40mm Titanium Drivers',
      'Fast Charging': '10 min for 5 hours playback'
    },
    reviews: [
      {
        userId: 'user_02',
        userName: 'Sarah Miller',
        userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
        rating: 5,
        comment: 'Absolute game changer. The ANC is terrifyingly quiet on flights and the battery truly lasts all week!',
        createdAt: '2024-03-01T12:00:00.000Z'
      },
      {
        userId: 'user_03',
        userName: 'David Chen',
        rating: 5,
        comment: 'Soundstage is crisp with punchy low ends. High build quality.',
        createdAt: '2024-03-05T14:30:00.000Z'
      }
    ]
  },
  {
    _id: 'prod_02',
    title: 'Titanium Smartwatch Ultra S4',
    slug: 'titanium-smartwatch-ultra-s4',
    description: 'Aerospace-grade titanium chassis, sapphire crystal display, dual-frequency GPS, 100m water resistance, and comprehensive biometric health tracking.',
    price: 499.00,
    originalPrice: 599.00,
    discountPercentage: 17,
    rating: 4.8,
    reviewCount: 98,
    category: 'Wearables',
    brand: 'ApexChronos',
    stock: 22,
    thumbnail: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=800&q=80'
    ],
    featured: true,
    tags: ['smartwatch', 'titanium', 'gps', 'health', 'fitness'],
    specifications: {
      'Display': '1.92-inch Always-On Retina OLED (2000 nits)',
      'Water Resistance': '100m Diving Certified',
      'Battery Life': 'Up to 72 hours low power mode',
      'Sensors': 'ECG, SpO2, Skin Temp, Dual GPS'
    },
    reviews: [
      {
        userId: 'user_04',
        userName: 'Michael Torres',
        rating: 5,
        comment: 'Best fitness watch I have ever owned. The GPS accuracy on mountain trails is unmatched.',
        createdAt: '2024-02-28T09:15:00.000Z'
      }
    ]
  },
  {
    _id: 'prod_03',
    title: 'Lumix Mechanical Keyboard RGB',
    slug: 'lumix-mechanical-keyboard-rgb',
    description: 'Hot-swappable tactile switches, gasket mounted CNC aluminum frame, customizable RGB underglow, and wireless tri-mode connection.',
    price: 159.50,
    originalPrice: 189.99,
    discountPercentage: 16,
    rating: 4.7,
    reviewCount: 215,
    category: 'Electronics',
    brand: 'KeyForge',
    stock: 45,
    thumbnail: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&w=800&q=80'
    ],
    featured: true,
    tags: ['gaming', 'mechanical', 'rgb', 'typing', 'wireless'],
    specifications: {
      'Switches': 'Custom Pre-Lubed Tactile Gateron Pro',
      'Layout': '75% Compact (82 Keys)',
      'Plate': 'Polycarbonate Gasket Mounted',
      'Connectivity': 'Bluetooth 5.1 / 2.4Ghz / USB-C'
    },
    reviews: []
  },
  {
    _id: 'prod_04',
    title: 'Zenith Studio Monitor 4K 27"',
    slug: 'zenith-studio-monitor-4k-27',
    description: '99% DCI-P3 color accuracy, HDR600, Thunderbolt 4 96W power delivery, motorized height adjustable stand, and anti-glare nano-texture glass.',
    price: 749.99,
    originalPrice: 849.99,
    discountPercentage: 12,
    rating: 4.9,
    reviewCount: 64,
    category: 'Electronics',
    brand: 'ZenithVision',
    stock: 15,
    thumbnail: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=800&q=80'
    ],
    featured: true,
    tags: ['monitor', '4k', 'thunderbolt', 'creator', 'hdr'],
    specifications: {
      'Resolution': '3840 x 2160 (4K UHD)',
      'Refresh Rate': '144Hz IPS',
      'Color Gamut': '99% DCI-P3, 100% sRGB Delta E < 1',
      'Ports': 'Thunderbolt 4, 2x HDMI 2.1, DP 1.4, USB-C Hub'
    }
  },
  {
    _id: 'prod_05',
    title: 'Minimalist Artisan Leather Backpack',
    slug: 'minimalist-artisan-leather-backpack',
    description: 'Handcrafted full-grain Italian leather, water-resistant waxed canvas lining, dedicated 16-inch laptop vault, and ergonomic breathable back panel.',
    price: 189.00,
    originalPrice: 220.00,
    discountPercentage: 14,
    rating: 4.8,
    reviewCount: 88,
    category: 'Fashion',
    brand: 'Vanguard Leather',
    stock: 18,
    thumbnail: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80'
    ],
    featured: false,
    tags: ['leather', 'backpack', 'travel', 'fashion', 'laptop bag'],
    specifications: {
      'Material': 'Full-Grain Vegetable Tanned Leather',
      'Capacity': '22 Liters',
      'Laptop Compartment': 'Fits up to 16" MacBook Pro',
      'Hardware': 'Antiqued Brass YKK Zippers'
    }
  },
  {
    _id: 'prod_06',
    title: 'Sonosphere Spatial Audio Speaker',
    slug: 'sonosphere-spatial-audio-speaker',
    description: 'Room-filling 360° Dolby Atmos sound, room calibration acoustic tuning, AirPlay 2, Spotify Connect, and brushed aluminum acoustic grill.',
    price: 349.00,
    originalPrice: 399.00,
    discountPercentage: 13,
    rating: 4.9,
    reviewCount: 112,
    category: 'Audio',
    brand: 'AuraAcoustics',
    stock: 28,
    thumbnail: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=800&q=80'
    ],
    featured: true,
    tags: ['smart speaker', 'dolby atmos', 'spatial audio', 'wireless'],
    specifications: {
      'Audio': '6 Custom Array Drivers + Subwoofer',
      'Power Output': '120W Peak RMS',
      'Wireless': 'Wi-Fi 6, Bluetooth 5.3, AirPlay 2'
    }
  },
  {
    _id: 'prod_07',
    title: 'ErgoMaster Pro Ergonomic Chair',
    slug: 'ergomaster-pro-ergonomic-chair',
    description: 'Dynamic 3D lumbar support system, breathable 4D mesh, 4-directional armrests, tilt limiter, and polished aluminum base supporting up to 350 lbs.',
    price: 429.99,
    originalPrice: 520.00,
    discountPercentage: 17,
    rating: 4.7,
    reviewCount: 73,
    category: 'Furniture',
    brand: 'ErgoMatrix',
    stock: 12,
    thumbnail: 'https://images.unsplash.com/photo-1580481077195-c228c3b7f14b?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1580481077195-c228c3b7f14b?auto=format&fit=crop&w=800&q=80'
    ],
    featured: false,
    tags: ['chair', 'ergonomic', 'office', 'furniture', 'productivity'],
    specifications: {
      'Adjustability': 'Headrest, Lumbar, 4D Arms, Tilt 90-135°',
      'Weight Capacity': '350 lbs (160 kg)',
      'Warranty': '10 Year Structure Warranty'
    }
  },
  {
    _id: 'prod_08',
    title: 'Nebula Smart Aroma Diffuser & Ambient Lamp',
    slug: 'nebula-smart-aroma-diffuser-lamp',
    description: 'Ultrasonic whisper-quiet cold mist diffusion, 16 million RGB ambient lighting colors, voice assistant integration (Alexa/Google Home), and automated scheduling.',
    price: 79.99,
    originalPrice: 99.99,
    discountPercentage: 20,
    rating: 4.6,
    reviewCount: 154,
    category: 'Smart Home',
    brand: 'AuraLiving',
    stock: 60,
    thumbnail: 'https://images.unsplash.com/photo-1608248597359-009187ec2244?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1608248597359-009187ec2244?auto=format&fit=crop&w=800&q=80'
    ],
    featured: false,
    tags: ['smarthome', 'aroma', 'ambient', 'relaxation', 'iot'],
    specifications: {
      'Tank Capacity': '500ml (Up to 18 hours run time)',
      'Coverage': 'Up to 450 sq ft',
      'Control': 'App / Voice / Touch Buttons'
    }
  },
  {
    _id: 'prod_09',
    title: 'Verve Wireless Gaming Mouse 8K',
    slug: 'verve-wireless-gaming-mouse-8k',
    description: 'Featherlight 49g chassis, 30,000 DPI Optical Sensor, 8000Hz polling rate, and optical micro switches rated for 90 million clicks.',
    price: 119.00,
    originalPrice: 139.00,
    discountPercentage: 14,
    rating: 4.9,
    reviewCount: 302,
    category: 'Electronics',
    brand: 'KeyForge',
    stock: 50,
    thumbnail: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=800&q=80'
    ],
    featured: true,
    tags: ['gaming', 'mouse', 'wireless', 'esports'],
    specifications: {
      'Weight': '49 grams ultra-light',
      'Sensor': 'FocusPro 30K Optical',
      'Polling Rate': 'True 8000Hz HyperPolling',
      'Battery Life': '90 Hours Continuous'
    }
  },
  {
    _id: 'prod_10',
    title: 'Urban Explorer Waterproof Trench Coat',
    slug: 'urban-explorer-waterproof-trench',
    description: 'Gore-Tex 3-layer breathable waterproof construction, magnetic closures, hidden security passport pockets, and tailored modern silhouette.',
    price: 245.00,
    originalPrice: 295.00,
    discountPercentage: 17,
    rating: 4.7,
    reviewCount: 47,
    category: 'Fashion',
    brand: 'NordicThread',
    stock: 19,
    thumbnail: 'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=800&q=80'
    ],
    featured: false,
    tags: ['apparel', 'jacket', 'waterproof', 'fashion', 'outerwear'],
    specifications: {
      'Waterproof Rating': '28,000mm hydrostatic head',
      'Care': 'Machine washable gentle',
      'Colors': 'Obsidian Black, Slate Gray, Desert Khaki'
    }
  },
  {
    _id: 'prod_11',
    title: 'AeroDrone 4K HDR Quadcopter',
    slug: 'aerodrone-4k-hdr-quadcopter',
    description: '3-axis gimbal stabilized 4K 60fps camera, 360° omnidirectional obstacle sensing, 46-minute flight time, and 15km HD video transmission.',
    price: 899.00,
    originalPrice: 999.00,
    discountPercentage: 10,
    rating: 4.9,
    reviewCount: 82,
    category: 'Electronics',
    brand: 'AeroTech',
    stock: 8,
    thumbnail: 'https://images.unsplash.com/photo-1527977966376-1c8408f9f108?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1527977966376-1c8408f9f108?auto=format&fit=crop&w=800&q=80'
    ],
    featured: true,
    tags: ['drone', 'photography', '4k', 'aerial', 'camera'],
    specifications: {
      'Camera': '1-inch CMOS Sensor 20MP / 4K 60fps',
      'Max Range': '15 km Transmission',
      'Max Speed': '68 km/h Sport Mode'
    }
  },
  {
    _id: 'prod_12',
    title: 'Ceramic Espresso Barista Machine',
    slug: 'ceramic-espresso-barista-machine',
    description: 'Commercial 15-bar Italian pump, dual thermo-block heating for instant steam & brew, microfoam milk texturing wand, and precision PID temperature control.',
    price: 389.00,
    originalPrice: 450.00,
    discountPercentage: 13,
    rating: 4.8,
    reviewCount: 169,
    category: 'Smart Home',
    brand: 'ArtisanRoast',
    stock: 14,
    thumbnail: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?auto=format&fit=crop&w=800&q=80'
    ],
    featured: true,
    tags: ['coffee', 'espresso', 'kitchen', 'appliance', 'barista'],
    specifications: {
      'Pressure': '15 Bar Italian ULKA Pump',
      'Boiler': 'Dual Thermo-Block Rapid Heat',
      'Water Tank': '2.0 Liters Removable'
    }
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    _id: 'ord_1001',
    orderNumber: 'NX-98214',
    user: 'user_demo_02',
    items: [
      {
        product: 'prod_01',
        title: 'Aura Pro ANC Wireless Headphones',
        price: 299.99,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80'
      }
    ],
    shippingAddress: {
      fullName: 'Alex Johnson',
      phone: '+1 (555) 345-9812',
      addressLine1: '742 Evergreen Terrace',
      city: 'Seattle',
      state: 'WA',
      postalCode: '98101',
      country: 'United States'
    },
    shippingMethod: 'Express Air (2 Days)',
    shippingFee: 15.00,
    subtotal: 299.99,
    discount: 0,
    tax: 24.00,
    total: 338.99,
    paymentMethod: 'Credit Card',
    paymentStatus: 'Paid',
    fulfillmentStatus: 'Delivered',
    timeline: [
      { status: 'Placed', timestamp: '2024-03-01T10:00:00Z', note: 'Order placed successfully' },
      { status: 'Processing', timestamp: '2024-03-01T12:00:00Z', note: 'Payment verified and items packed' },
      { status: 'Shipped', timestamp: '2024-03-02T08:00:00Z', note: 'Handed over to FedEx. Tracking: FX90123' },
      { status: 'Out for Delivery', timestamp: '2024-03-03T07:30:00Z', note: 'On courier vehicle' },
      { status: 'Delivered', timestamp: '2024-03-03T14:10:00Z', note: 'Delivered to front door' }
    ],
    createdAt: '2024-03-01T10:00:00.000Z',
    updatedAt: '2024-03-03T14:10:00.000Z'
  },
  {
    _id: 'ord_1002',
    orderNumber: 'NX-98215',
    user: 'user_demo_02',
    items: [
      {
        product: 'prod_03',
        title: 'Lumix Mechanical Keyboard RGB',
        price: 159.50,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80'
      },
      {
        product: 'prod_09',
        title: 'Verve Wireless Gaming Mouse 8K',
        price: 119.00,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=800&q=80'
      }
    ],
    shippingAddress: {
      fullName: 'Alex Johnson',
      phone: '+1 (555) 345-9812',
      addressLine1: '742 Evergreen Terrace',
      city: 'Seattle',
      state: 'WA',
      postalCode: '98101',
      country: 'United States'
    },
    shippingMethod: 'Standard Ground (3-5 Days)',
    shippingFee: 0.00,
    subtotal: 278.50,
    discount: 27.85,
    couponCode: 'NEXUS10',
    tax: 20.05,
    total: 270.70,
    paymentMethod: 'Apple Pay',
    paymentStatus: 'Paid',
    fulfillmentStatus: 'Shipped',
    timeline: [
      { status: 'Placed', timestamp: '2024-03-04T15:30:00Z', note: 'Order placed' },
      { status: 'Processing', timestamp: '2024-03-04T16:00:00Z', note: 'Order confirmed' },
      { status: 'Shipped', timestamp: '2024-03-05T09:00:00Z', note: 'Carrier tracking: DHL-482019' }
    ],
    createdAt: '2024-03-04T15:30:00.000Z',
    updatedAt: '2024-03-05T09:00:00.000Z'
  }
];

export const CATEGORIES = [
  { id: 'all', name: 'All Products', icon: 'Sparkles', count: 12 },
  { id: 'Audio', name: 'Audio & Acoustics', icon: 'Headphones', count: 2 },
  { id: 'Wearables', name: 'Wearables & Watches', icon: 'Watch', count: 1 },
  { id: 'Electronics', name: 'Electronics & Gear', icon: 'Laptop', count: 4 },
  { id: 'Fashion', name: 'Fashion & Apparel', icon: 'Shirt', count: 2 },
  { id: 'Furniture', name: 'Workspace Furniture', icon: 'Armchair', count: 1 },
  { id: 'Smart Home', name: 'Smart Home & Kitchen', icon: 'Home', count: 2 }
];

export const COUPONS: Record<string, { discountPercent?: number; discountAmount?: number; minSpend?: number }> = {
  'NEXUS20': { discountPercent: 20, minSpend: 100 },
  'NEXUS10': { discountPercent: 10, minSpend: 50 },
  'SAVE50': { discountAmount: 50, minSpend: 250 },
  'FREESHIP': { discountAmount: 15, minSpend: 50 }
};
