<div align="center">
  <br />
  <h1>🚀 Leap Skills</h1>
  <p><strong>Enterprise-Grade Creator Monetization & 1:1 Technical Advisory Platform</strong></p>
  <p>Book 1:1 consultations, host webinars, sell digital assets, and process instant payouts — powered by MongoDB Atlas, Stripe, and automated calendar email dispatch.</p>

  <p>
    <a href="https://leapskills.vercel.app/"><img src="https://img.shields.io/badge/Live_Demo-leapskills.vercel.app-0EA5E9?style=for-the-badge&logo=vercel&logoColor=white" alt="Live Demo on Vercel" /></a>
    <a href="https://leapskills.sbs"><img src="https://img.shields.io/badge/Production-leapskills.sbs-00E599?style=for-the-badge&logo=vercel&logoColor=white" alt="Production Site" /></a>
    <a href="https://nextjs.org"><img src="https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js 15" /></a>
    <a href="https://mongodb.com"><img src="https://img.shields.io/badge/Database-MongoDB_Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB Atlas" /></a>
    <a href="https://stripe.com"><img src="https://img.shields.io/badge/Payments-Stripe_Connect-635BFF?style=for-the-badge&logo=stripe&logoColor=white" alt="Stripe" /></a>
    <a href="https://resend.com"><img src="https://img.shields.io/badge/Emails-Resend_API-000000?style=for-the-badge&logo=resend&logoColor=white" alt="Resend API" /></a>
    <a href="https://clerk.com"><img src="https://img.shields.io/badge/Auth-Clerk-6C47FF?style=for-the-badge&logo=clerk&logoColor=white" alt="Clerk Auth" /></a>
    <a href="https://livekit.io"><img src="https://img.shields.io/badge/Video-LiveKit_WebRTC-FF4F00?style=for-the-badge&logo=livekit&logoColor=white" alt="LiveKit WebRTC" /></a>
  </p>
  <br />
</div>

---

## 🎯 Live Deployment

| Environment | URL |
|---|---|
| **Live Demo (Vercel)** | 🔗 **https://leapskills.vercel.app/** |
| **Production (Custom Domain)** | 🔗 https://leapskills.sbs |

---

## 📌 Overview

**Leap Skills** (codename: *CreatorHub Pro*) is an end-to-end creator monetization platform designed for software engineers, security architects, DevOps leaders, and technical advisors to monetize their time and expertise.

Powered strictly by **MongoDB Atlas** for high-throughput data persistence, the platform allows instructors to set calendar availability, students to submit consultation details (Name, Gmail, Reason/Topic), process secure payments via **Stripe**, and receive automated email confirmations with auto-generated WebRTC video room links.

---

## ⚡ Feature Highlights

- **Instant Live Demo** — deployed continuously to Vercel at [leapskills.vercel.app](https://leapskills.vercel.app/).
- **Global Device Fingerprinting** — every page computes a stable FingerprintJS visitor ID shown in a fixed badge.
- **Premium Loading Experience** — logo-free, fullscreen retro-arcade loader with progress bar (max 3s).
- **Dark/Light Mode** — theme toggle persisted across sessions.
- **Enterprise Security** — Clerk auth, API rate limiting, CORS guard, and admin ban controls.

---

## 🔄 End-to-End System Architecture

```mermaid
sequenceDiagram
    autonumber
    actor Student
    participant Storefront as Creator Storefront
    participant API as Next.js API (/api/bookings)
    participant Stripe as Stripe Gateway
    participant DB as MongoDB Atlas Database
    participant Resend as Resend Email Service
    actor Instructor

    Instructor->>Storefront: Configure Available Dates & Time Slots
    Student->>Storefront: Browse & Select Calendar Date + Time Slot
    Student->>Storefront: Fill Student Form (Name, Gmail/Email, Topic/Reason)
    Student->>Stripe: Complete Secure Checkout via Stripe
    Stripe-->>API: Payment Webhook Confirmed
    API->>DB: Persist Booking to MongoDB Atlas Collections
    API->>Resend: Trigger Automated Dual Email Dispatch
    Resend-->>Student: Send Email Confirmation + Date/Time + WebRTC Video Link
    Resend-->>Instructor: Send Email Alert + Student Gmail + Reason + Video Link
```

---

## ⭐ Detailed Feature Specification

### 🍃 1. MongoDB Atlas Database Engine
- **Primary Data Persistence**: Uses MongoDB Atlas (`MONGODB_URI`) for scalable document storage and real-time query execution.
- **Connection Manager**: High-performance client connection pooling via [`src/lib/mongodb.ts`](src/lib/mongodb.ts) with singleton reuse across Next.js serverless route handlers.
- **Collections Architecture**:
  - `users` — Student, Instructor, and Admin accounts synced with Clerk Auth.
  - `trainer_profiles` — Public profile details, headlines, bios, hourly rates, and Stripe Connect account IDs.
  - `services` — Offerings catalog (1:1 Mentorship, Webinars, Paid DMs, Digital Products).
  - `availability_slots` — Instructor-configured date & time slots.
  - `bookings` — Confirmed student reservations, date/time timestamps, notes, and WebRTC room IDs.
  - `transactions` — Financial audit records, platform fee breakdowns, and payout statuses.

---

### 📅 2. Instructor Calendar & Date/Time Scheduling
- **Instructor Schedule Manager**: Instructors configure their custom availability and time slots (`09:00 AM`, `10:00 AM`, `11:30 AM`, `02:00 PM`, `04:00 PM`, `06:00 PM`) via [`/api/availability`](src/app/api/availability/route.ts).
- **Interactive Calendar Picker**: On the creator storefront ([`BookingDrawer.tsx`](src/components/services/BookingDrawer.tsx)), students select from available calendar dates and session durations (30m, 45m, 60m).
- **Live Dashboard**: Instructors manage slots, view upcoming bookings, and track earnings through [`useTrainerDashboard`](src/hooks/useTrainerDashboard.ts).

---

### 📝 3. Student Information & Reason Submission Form
Students complete a Zod-validated booking drawer before checkout:
- **Full Name** (`clientName`): Student's full legal or preferred display name.
- **Gmail / Email Address** (`clientEmail`): Gmail or email address where calendar confirmations and meeting credentials are sent.
- **Consultation Reason & Topic Notes** (`notes` / `dmQuestion`): Detailed question or topic requirements (e.g., Code Review, System Architecture, Career Mentorship, Security Audit).

---

### 💳 4. Stripe Checkout & Instant Connect Payouts
- **Stripe Checkout Sessions**: Secure encrypted checkout via [`/api/payments/stripe/checkout`](src/app/api/payments/stripe/checkout/route.ts).
- **Automated Webhooks**: Stripe webhook listener ([`/api/payments/stripe/webhook`](src/app/api/payments/stripe/webhook/route.ts)) automatically updates MongoDB booking payment status to `paid`.
- **Stripe Connect Payouts**: Automated split payouts sending creator revenue directly to their connected Stripe bank accounts ([`/api/payouts`](src/app/api/payouts/route.ts)).
- **Localized Pricing**: Prices displayed and settled in **PKR** via shared currency utilities.

---

### ✉️ 5. Automated Dual Email Notifications (Resend API)
Integrated via [`src/lib/notifications.ts`](src/lib/notifications.ts):

#### 📥 Email Sent to Student (`clientEmail`):
- **Subject**: `✅ Booking Confirmed: [Service Title] with [Instructor Name]`
- **Body Details**:
  - Scheduled Date & Time (formatted with local timezone)
  - Instructor Profile & Session Overview
  - 1-Click Join Link for WebRTC Video Room (`/meeting/[roomId]`)
  - Payment Receipt & MongoDB Booking ID

#### 📤 Email Sent to Instructor (`instructorEmail`):
- **Subject**: `🎉 New Booking Alert: [Student Name] booked [Service Title]`
- **Body Details**:
  - Full Student Details (Name & Gmail/Email Address)
  - Consultation Topic & Reason provided by the student
  - Scheduled Date & Time Slot
  - Direct Instructor Meeting Join URL

---

### 🎥 6. LiveKit WebRTC Video Meeting Rooms
- **Instant Room Generation**: Every confirmed booking auto-generates a secure WebRTC room (`/meeting/[roomId]`).
- **LiveKit Features**: HD video, crystal-clear audio, low-latency screen sharing, and participant controls.
- **Server Tokens**: Room access tokens issued via [`/api/meetings/token`](src/app/api/meetings/token/route.ts).

---

### 🆔 7. Global Device Fingerprinting (FingerprintJS)
- **Cross-Page Visitor ID**: A single `FingerprintProvider` (React context) loads FingerprintJS once and exposes a stable `visitorId` to the whole app.
- **Persistent Badge**: A fixed bottom-left badge (`FingerprintBadge`) shows the 32-char device fingerprint on **every page** — landing, explore, profiles, admin, and meeting rooms.
- **Zero-Bundle Bloat**: Loaded client-side only after hydration, cached and reused across route changes.

---

### 🚦 8. Enterprise Security & Access Control
- **Clerk Authentication**: Sign-up only login flow (`/login`), session middleware, and protected route guards.
- **API Rate Limiting**: Sliding-window throttling via [`src/lib/rate-limit.ts`](src/lib/rate-limit.ts) wrapping booking, payout, and availability endpoints.
- **API Guard**: Shared guard utility ([`src/lib/api-guard.ts`](src/lib/api-guard.ts)) for auth checks and error handling.
- **CORS Middleware**: Cross-origin allow-list enforced in [`src/middleware.ts`](src/middleware.ts).
- **Admin Moderation**: Admins ban/unban users through [`/api/admin/users/ban`](src/app/api/admin/users/ban/route.ts); banned users are blocked from API access via [`_lib/access.ts`](src/app/admin/_lib/access.ts).

---

### 🖥️ 9. Admin Dashboard
- Role-based protected admin area at `/admin`.
- User management with ban/unban toggles and role checks.
- Direct view into platform bookings, transactions, and creator profiles.

---

### 📡 10. Real-Time Updates
- **WebSocket Booking Bus** ([`src/lib/websocket.ts`](src/lib/websocket.ts)) pushes live booking events to connected clients.
- **Reactive UI** via Zustand v5 stores + TanStack Query v5 caching for instant state sync.

---

### ✨ 11. Premium UI / UX
- **Retro Loading Screen**: Fullscreen 8-bit style loader with percentage progress and rotating tips — no logo, max 3s.
- **Dark / Light Mode**: Theme toggle in the global header, persisted per user.
- **Modern Design System**: Tailwind CSS v4, Material Symbols, Google Fonts, animated hero sections.
- **SEO Built-In**: Dynamic JSON-LD structured data (`[username]` profiles), `sitemap.ts`, and `robots.ts`.

---

### 🎓 12. Creator Marketplace & Profiles
- `/explore` — browse the creator marketplace directory.
- `/[username]` & `/profile/[slug]` — public storefronts with services, booking drawer, and testimonial sections.
- `/dashboard` — instructor schedule, bookings, and revenue management.
- `/demo` — guided live demonstration of the platform.

---

## 🛠️ Technology Stack

| Layer | Technology |
|---|---|
| **Framework** | Next.js 15 (App Router, Server Actions) |
| **Language** | TypeScript 5 (Strict Mode) |
| **Database** | MongoDB Atlas (`mongodb` driver) |
| **Authentication** | Clerk Auth (`@clerk/nextjs`) |
| **Payments** | Stripe Connect SDK (`stripe`) |
| **Email Service** | Resend API (`resend`) |
| **Video Engine** | LiveKit WebRTC (`@livekit/components-react`, `livekit-client`) |
| **Device Fingerprinting** | FingerprintJS (`@fingerprintjs/fingerprintjs`) |
| **Styling** | Tailwind CSS v4, Material Symbols, Google Fonts |
| **State & Data** | Zustand v5, TanStack Query v5 |
| **Validation** | Zod (`zod`), `@hookform/resolvers` |
| **Testing** | Playwright (E2E) |

---

## 📁 Project Architecture & Directory Map

```
├── public/                 # Favicons, icons, static assets
├── src/
│   ├── app/                # Next.js 15 App Router Routes & APIs
│   │   ├── [username]/     # Canonical creator profile route
│   │   ├── admin/          # Platform admin & moderation dashboard
│   │   │   └── _lib/       # Admin role / ban access guards
│   │   ├── api/            # REST API Routes (MongoDB backed)
│   │   │   ├── admin/users/ban/ # User ban/unban moderation API
│   │   │   ├── availability/    # Instructor schedule & time slot API
│   │   │   ├── bookings/        # Student booking submission & MongoDB insert
│   │   │   ├── meetings/        # LiveKit WebRTC token generator
│   │   │   ├── payments/        # Stripe checkout & webhook listener
│   │   │   └── payouts/         # Stripe Connect payout manager
│   │   ├── contact/        # Support ticket form
│   │   ├── dashboard/      # Instructor dashboard & availability setup
│   │   ├── explore/        # Creator marketplace directory
│   │   ├── meeting/        # WebRTC video room ([roomId])
│   │   ├── layout.tsx      # Root layout (ClerkProvider, QueryProvider)
│   │   ├── sitemap.ts      # Dynamic sitemap generator
│   │   └── robots.ts       # Robots.txt configuration
│   ├── components/         # React UI Components
│   │   ├── providers/      # FingerprintProvider (global visitor ID context)
│   │   ├── services/       # BookingDrawer, ServiceCard, InlineCheckout
│   │   ├── seo/            # Dynamic JSON-LD structured data
│   │   ├── ui/             # FingerprintBadge, loading screens, buttons
│   │   └── Header.tsx      # Global navigation header
│   ├── hooks/              # useTrainerDashboard & data hooks
│   ├── lib/                # Core Library Modules
│   │   ├── mongodb.ts      # MongoDB Atlas Database Connection Pool
│   │   ├── notifications.ts # Resend Email Service (Student & Instructor emails)
│   │   ├── websocket.ts    # Real-time WebSocket booking bus
│   │   ├── rate-limit.ts   # Sliding-window API rate limiting
│   │   └── api-guard.ts    # Auth guard & error handling wrapper
│   └── middleware.ts       # Clerk Auth + CORS Security Middleware
├── next.config.mjs         # Production Next.js build configuration
├── package.json            # Dependencies & npm scripts
└── vercel.json             # Vercel deployment configuration
```

---

## ⚙️ Environment Variables Setup

Create a `.env.local` file in your root folder:

```env
# MongoDB Atlas Database
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/leapskills

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...

# Stripe Payments & Connect Payouts
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Resend Email Service
RESEND_API_KEY=re_...
RESEND_FROM_EMAIL="Leap Skills <noreply@leapskills.sbs>"

# LiveKit WebRTC Video Engine
NEXT_PUBLIC_LIVEKIT_URL=wss://<your-subdomain>.livekit.cloud
LIVEKIT_API_KEY=devkey
LIVEKIT_API_SECRET=secret...

# Application Base URL (Vercel deployment)
NEXT_PUBLIC_APP_URL=https://leapskills.vercel.app
```

---

## 🚀 Installation & Local Running

```bash
# 1. Clone the repository
git clone https://github.com/arqam66/mvp_leap_skills.git
cd mvp_leap_skills

# 2. Install dependencies
npm install

# 3. Start local development server
npm run dev

# 4. Build for production
npm run build
npm start
```

---

## 🧪 Testing

```bash
# Run the Playwright E2E suite (starts dev server automatically)
npx playwright test
```

---

## 📄 License

Distributed under the **MIT License**.
