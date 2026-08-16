<div align="center">
  <br />
  <h1>🚀 Leap Skills</h1>
  <p><strong>The #1 Creator Monetization Platform for Engineers, Technical Architects & Advisors</strong></p>
  <p>Book 1:1 consultations, host webinars, sell digital assets, and get instant payouts — all from one unified profile link.</p>

  <p>
    <a href="https://leapskills.sbs"><img src="https://img.shields.io/badge/Production-leapskills.sbs-00E599?style=for-the-badge&logo=vercel&logoColor=white" alt="Production Site" /></a>
    <a href="https://nextjs.org"><img src="https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js 15" /></a>
    <a href="https://www.typescriptlang.org"><img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" /></a>
    <a href="https://tailwindcss.com"><img src="https://img.shields.io/badge/Tailwind_CSS-v4-38BDF8?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS v4" /></a>
    <a href="https://clerk.com"><img src="https://img.shields.io/badge/Auth-Clerk-6C47FF?style=for-the-badge&logo=clerk&logoColor=white" alt="Clerk Auth" /></a>
    <a href="https://mongodb.com"><img src="https://img.shields.io/badge/Database-MongoDB_Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB Atlas" /></a>
    <a href="https://livekit.io"><img src="https://img.shields.io/badge/Video-LiveKit_WebRTC-FF4F00?style=for-the-badge&logo=livekit&logoColor=white" alt="LiveKit WebRTC" /></a>
  </p>
  <br />
</div>

---

## 📌 Overview

**Leap Skills** (codename: *CreatorHub Pro*) is an enterprise-grade creator monetization platform built with **Next.js 15 App Router**, **TypeScript**, **Tailwind CSS v4**, **MongoDB Atlas**, **Clerk Auth**, and **LiveKit WebRTC**. 

It empowers technical experts, software engineers, DevOps architects, and advisors to launch a single, shareable link storefront to monetize their knowledge through:
- **1:1 Video Mentorship & Consultations**
- **Cohort-Based Courses & Webinars**
- **Digital Product & Template Sales**
- **Paid Q&A / DMs**

---

## ✨ Core Features

### 🛒 1. Unified Creator Storefront
- **Custom Profile URLs**: Shareable canonical profiles (`leapskills.sbs/[username]`).
- **Interactive Service Drawers**: Instant booking flow for 1:1 sessions, cohorts, paid DMs, and digital products.
- **Dark/Light Mode**: Smooth system-aware theme toggle with zero hydration flash.

### 🎥 2. WebRTC Video Meetings & LiveKit Integration
- **Auto-Generated Meeting Rooms**: Instant room creation upon booking (`/meeting/[roomId]`).
- **LiveKit Integration**: High-definition video, crystal-clear audio, screen sharing, and participant controls.

### 🛡️ 3. Authentication & Security
- **Clerk Authentication**: Streamlined signup-only flow with user role assignments (`client`, `trainer`, `admin`).
- **API Guard & Rate Limiting**: Per-IP rate limiting (`src/lib/rate-limit.ts`) and Zod schema validation across API routes.
- **CORS Middleware**: Strict origin allowlist with OPTIONS preflight handling.

### 📊 4. Admin Management Dashboard
- **Platform Analytics**: Total users, active bookings, gross platform revenue, and fee configurations (`/admin`).
- **User Moderation**: Instant user ban/unban API (`/api/admin/users/ban`) with role verification.
- **Transaction Logs**: Audit payouts, platform fees, and booking states in real-time.

### ⚡ 5. Real-Time Booking Network & Payments
- **WebSocket Booking Bus**: Instant booking confirmation and real-time state synchronization.
- **Stripe Connect Payouts**: Automated instant payouts and checkout sessions (`/api/payments/stripe/checkout`).
- **MongoDB Atlas Persistence**: Fast, scalable document storage for users, transactions, and bookings.

---

## 🛠️ Technology Stack

| Layer | Technology |
|---|---|
| **Framework** | Next.js 15 (App Router, Server Actions, Dynamic Routes) |
| **Language** | TypeScript 5 (Strict Mode) |
| **Styling** | Tailwind CSS v4, Material Symbols, Google Fonts |
| **Authentication** | Clerk Auth (`@clerk/nextjs`) |
| **Database** | MongoDB Atlas (`mongodb`), Supabase SSR (`@supabase/ssr`) |
| **Video Engine** | LiveKit WebRTC (`@livekit/components-react`, `livekit-client`) |
| **State & Data** | Zustand v5, TanStack Query v5 |
| **Validation** | Zod (`zod`), `@hookform/resolvers` |
| **Emails & Payments** | Resend API (`resend`), Stripe SDK (`stripe`) |
| **Deployment** | Vercel (Edge Middleware, Global CDN) |

---

## 📁 Directory Structure

```
├── public/                 # Favicons, OG images, static assets
├── src/
│   ├── app/                # Next.js 15 App Router Pages & API Routes
│   │   ├── [username]/     # Canonical creator profile route
│   │   ├── about/          # About Leap Skills
│   │   ├── admin/          # Admin management & moderation dashboard
│   │   ├── api/            # Secure REST API endpoints
│   │   │   ├── admin/      # Admin user ban & settings endpoints
│   │   │   ├── availability/ # Trainer schedule management
│   │   │   ├── bookings/   # Booking creation & query API
│   │   │   ├── meetings/   # LiveKit token generator
│   │   │   ├── payments/   # Stripe checkout & webhooks
│   │   │   └── payouts/    # Stripe Connect payout management
│   │   ├── contact/        # Zod-validated support ticket page
│   │   ├── dashboard/      # Creator analytics & settings
│   │   ├── explore/        # Marketplace discovery directory
│   │   ├── faq/            # FAQ page with interactive components
│   │   ├── meeting/        # WebRTC video meeting room ([roomId])
│   │   ├── profile/[slug]/ # Profile slug resolver
│   │   ├── layout.tsx      # Root layout (ClerkProvider, QueryProvider, SEO)
│   │   ├── sitemap.ts      # Dynamic sitemap generator
│   │   └── robots.ts       # Robots.txt configuration
│   ├── components/         # Modular UI components
│   │   ├── services/       # Service cards, booking drawers, checkout
│   │   ├── seo/            # Dynamic JSON-LD structured data
│   │   ├── AuthModal.tsx   # Sign-up modal
│   │   ├── Dashboard.tsx   # Trainer dashboard view
│   │   └── Header.tsx      # Global navigation header
│   ├── hooks/              # Custom React hooks (useTrainerDashboard)
│   ├── lib/                # Core utilities & service clients
│   │   ├── api-guard.ts    # Rate limiting & authorization wrapper
│   │   ├── mongodb.ts      # MongoDB Atlas connection manager
│   │   ├── websocket.ts    # Real-time WebSocket booking service
│   │   └── supabase/       # Supabase client & server instances
│   └── middleware.ts       # Clerk Auth + CORS API Security Middleware
├── next.config.mjs         # Production Next.js build configuration
├── package.json            # Node.js dependencies & npm scripts
├── tsconfig.json           # TypeScript configuration
└── vercel.json             # Vercel deployment configuration
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js**: `v18.x` or higher (LTS recommended)
- **Package Manager**: `npm` or `pnpm`

### 1. Installation

```bash
# Clone the repository
git clone https://github.com/arqam66/mvp_leap_skills.git
cd mvp_leap_skills

# Install dependencies
npm install
```

### 2. Environment Setup

Create a `.env.local` file in the root directory and add your environment credentials:

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...

# Database Connection
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/leapskills

# Supabase (Optional)
NEXT_PUBLIC_SUPABASE_URL=https://<your-project>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# LiveKit WebRTC Video
NEXT_PUBLIC_LIVEKIT_URL=wss://<your-subdomain>.livekit.cloud
LIVEKIT_API_KEY=devkey
LIVEKIT_API_SECRET=secretsecretsecret...

# Stripe Payments & Payouts
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# General Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3. Running Locally

```bash
# Start Next.js development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📦 Production & Deployment

### Build & Validate

To test the production build locally:

```bash
npm run build
npm start
```

### Vercel Deployment

This project is optimized for 1-click deployment on **Vercel**:

1. Import the repository in your [Vercel Dashboard](https://vercel.com).
2. Configure the **Environment Variables** in Vercel settings.
3. Deploy! Vercel will automatically build using [`next.config.mjs`](file:///e:/mvp/next.config.mjs) and [`vercel.json`](file:///e:/mvp/vercel.json).

---

## 🔒 Security & Best Practices

- **Zero Hardcoded Secrets**: All keys are managed strictly via environment variables.
- **Input Sanitization & Schema Validation**: Built-in Zod validation across form submissions and API endpoints.
- **Security Headers**: Production HTTP headers set for `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, and `Permissions-Policy`.
- **Search Engine Optimization**: Full dynamic JSON-LD schema (Organization, Person, Service) for search engine indexing.

---

## 📄 License

Distributed under the **MIT License**. See `LICENSE` for details.
