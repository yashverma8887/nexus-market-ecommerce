# NexusMarket — Enterprise Full-Stack E-Commerce Platform

> **Skill-Nexus Capstone Project (Serial No. 1: E-Commerce Web Application)**  
> Built with Next.js 14 (App Router), React 18, TypeScript, Tailwind CSS, Serverless API Route Handlers, JWT Authentication, and MongoDB/Hybrid Data Persistence.

---

## 🌟 Project Highlights & Live Capabilities

NexusMarket is a production-grade, end-to-end full-stack e-commerce system designed to meet and exceed enterprise commerce standards.

### 🛍️ 1. Storefront & Catalog
- **Live Search & Autocomplete**: Debounced instant search querying title, brand, description, and tags with visual dropdown preview.
- **Multi-Faceted Filtering & Sorting**: Filter by Category (Audio, Wearables, Electronics, Fashion, Furniture, Smart Home), Price range slider ($0 - $1000+), Rating (4★, 4.5★, 4.8★), Featured flag, and sort by Price (Low/High), Highest Rated, or Newest.
- **Product Details & Gallery**: High-res multi-image switcher, stock counter, technical specs table, dynamic savings calculator.
- **Interactive Review System**: Verified customer rating breakdown with instant review submission and dynamic star re-calculation.

### 🛒 2. Cart & Promotional Engine
- **Slide-Out & Dedicated Cart Views**: Quantity controls (+ / -), item removal, subtotal, and tax calculations.
- **Voucher Promo Engine**: Real-time validation for discount codes:
  - `NEXUS20` — 20% OFF whole order
  - `NEXUS10` — 10% OFF
  - `SAVE50` — $50 OFF orders over $250
  - `FREESHIP` — Free shipping waiver
- **Free Express Shipping Progress Bar**: Real-time progress bar updating dynamically towards the $150 free delivery threshold.

### 💳 3. Multi-Step Checkout & Order Fulfillment
- **Delivery Address & Speed Selection**: Standard Ground, Express Air (2-day), Priority Overnight.
- **Payment Gateway Simulation**: Credit/Debit Cards, Apple Pay, PayPal, UPI with instant confirmation.
- **Interactive Order Tracking Timeline**: 5-stage shipment progression (`Placed` ➔ `Processing` ➔ `Shipped` ➔ `Out for Delivery` ➔ `Delivered`) with detailed activity logs and printable Tax Invoice receipts.

### 🛡️ 4. Operator Admin Dashboard (`/admin`)
- **KPI Telemetry**: Real-time Gross Revenue, Order Volume, Catalog Count, Registered Customers, and 6-Month Sales Velocity chart.
- **Product Control Center**: Full CRUD (Create, Read, Update, Delete) with image previews, pricing, stock levels, and featured promotions.
- **Order Fulfillment Console**: Filter and update order dispatch stages with automatic customer timeline synchronization.
- **Financial Analytics & Low Stock Alerts**: Category valuation asset shares and automatic replenishment warning badges.
- **1-Click Demo Accounts Switcher**: Instant evaluation buttons for both **Admin Mode** and **Customer Mode**.

---

## 🛠️ Tech Stack & Architecture

| Layer | Technology |
|---|---|
| **Frontend** | Next.js 14 (App Router), React 18, TypeScript, Tailwind CSS, Lucide Icons |
| **Backend / API** | Next.js Route Handlers (Serverless APIs), Node.js, Mongoose / MongoDB |
| **State Management** | React Context (`AuthContext`, `CartContext`, `WishlistContext`) + LocalStorage sync |
| **Auth & Security** | JWT Tokens (`jsonwebtoken`), Password Hashing (`bcryptjs`), Protected Routes |
| **Deployment** | Vercel (Production Serverless Edge Ready) & GitHub |

---

## 🚀 Quick Start (Local Run)

```bash
# 1. Navigate to project
cd ecommerce-web-app

# 2. Install dependencies (if not already done)
npm install

# 3. Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔑 Demo Evaluator Accounts

| Role | Email | Password | Access Level |
|---|---|---|---|
| **Store Administrator** | `admin@nexus.com` | `admin123` | Full access to `/admin`, Product Control, Order Dispatch, Analytics |
| **Demo Customer** | `demo@nexus.com` | `user123` | Storefront shopping, Bag, Checkout, Order Tracking |

*Note: You can also use the 1-click **"Switch to Admin"** or **"Demo Customer"** buttons in the navigation bar and login page!*

---

## 🌐 Deploy to GitHub & Vercel Guide

### Step 1: Push to GitHub
```bash
# Initialize git repository
git init
git add .
git commit -m "feat: complete enterprise e-commerce platform capstone project"

# Create a new repository on your GitHub account (e.g. nexus-market-ecommerce)
# Link and push:
git remote add origin https://github.com/<YOUR_GITHUB_USERNAME>/nexus-market-ecommerce.git
git branch -M main
git push -u origin main
```

### Step 2: Deploy to Vercel (1-Click)
1. Go to [vercel.com](https://vercel.com) and sign in with GitHub.
2. Click **"Add New..."** ➔ **"Project"**.
3. Select your `nexus-market-ecommerce` repository and click **Import**.
4. In the Project Settings:
   - Framework Preset: **Next.js**
   - Root Directory: `./` (or select the project folder)
5. (Optional) Add Environment Variables:
   - `JWT_SECRET` = `your-secure-secret-key`
   - `MONGODB_URI` = `mongodb+srv://...` (Optional, hybrid in-memory store operates automatically if omitted!)
6. Click **"Deploy"**. Your live production application URL will be generated in under 60 seconds!
