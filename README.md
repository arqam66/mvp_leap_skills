<div align="center">
  <br />
  <h1>Leap Skills</h1>
  <p><strong>All-in-One Creator Monetization Platform</strong></p>
  <p>A Topmate-style marketplace for trainers, coaches, mentors, and experts to monetize their knowledge.</p>
  <br />
</div>

## Overview

Leap Skills (codename: CreatorHub Pro) is a full-stack Next.js platform that lets creators build a unified storefront to sell mentorship sessions, digital products, webinars, and more — all from a single profile link.

### Features

- **Profile Storefront** — Public trainer profile with services, bio, and inline checkout
- **Service Offerings** — 1:1 mentorship, webinars, cohort-based courses, service packages, and paid DMs
- **Digital Products** — Sell PDFs, templates, ebooks, guides, and pre-recorded courses
- **Payments** — Stripe, Razorpay, and UPI integration (planned)
- **Video Meetings** — Native WebRTC (P2P + webinar mode) with optional Zoom (planned)
- **Calendar Sync** — Two-way sync with Google Calendar, Outlook, and iCloud (planned)
- **AI Discovery** — LLM-powered expert matching for clients (planned)
- **Analytics** — Audience insights, conversion dashboards, and format-performance tracking
- **Communications** — Email (Resend) and WhatsApp Business API (planned)
- **Growth Tools** — Instagram Auto-DM keyword replier (planned)

### User Roles

| Role    | Description |
|---------|-------------|
| Client  | Browses, books, and purchases services from trainers |
| Trainer | Manages profile, services, earnings, and analytics |
| Admin   | Manages users, trainers, bookings, payments, and platform settings |

## Tech Stack

| Layer           | Technology |
|-----------------|------------|
| **Framework**   | Next.js 15 (App Router) |
| **Language**    | TypeScript |
| **Styling**     | Tailwind CSS v4, Material Symbols, Google Fonts (Inter, Sora) |
| **State**       | Zustand v5 |
| **Data Fetch**  | TanStack Query v5 |
| **Animation**   | motion (Framer Motion) |
| **Icons**       | lucide-react |
| **Planned**     | Supabase, Stripe, Razorpay, WebRTC, Socket.io, Resend, Google/Outlook/iCloud Calendar APIs, WhatsApp Business API, Instagram Graph API |

## Getting Started

### Prerequisites

- Node.js 18+ (LTS recommended)
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/your-org/creatorhub-pro.git
cd creatorhub-pro

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local and add your GEMINI_API_KEY
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm start
```

### Lint

```bash
npm run lint
```

## Project Structure

```
src/
├── app/               # Next.js App Router pages
│   ├── layout.tsx     # Root layout (fonts, globals)
│   ├── page.tsx       # Landing page
│   ├── dashboard/     # Creator dashboard
│   ├── explore/       # Trainer marketplace
│   └── profile/[slug] # Trainer profile pages
├── components/        # React components
│   ├── LandingPage.tsx
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── Dashboard.tsx
│   ├── ExplorePage.tsx
│   └── ProfilePage.tsx
├── store/             # Zustand state management
├── data/              # Mock data
├── utils/             # Utility functions
└── types.ts           # TypeScript interfaces
```

## Environment Variables

| Variable         | Description |
|------------------|-------------|
| `GEMINI_API_KEY` | Gemini AI API key |
| `APP_URL`        | Public URL of the hosted app |

## Status

This project is in **active development**. The frontend UI prototype with mock data is functional. Backend services, authentication, payments, video, calendar, and third-party integrations are planned and documented.

### Planned Integrations

- [ ] Supabase (PostgreSQL, Auth, Storage, Edge Functions, Realtime)
- [ ] Stripe, Razorpay, UPI payments
- [ ] WebRTC video (P2P + SFU webinar mode)
- [ ] Socket.io signaling
- [ ] Google Calendar, Outlook, iCloud Calendar sync
- [ ] Resend / SendGrid email
- [ ] WhatsApp Business API
- [ ] Instagram Auto-DM
- [ ] LLM-based expert matching

## License

[MIT](LICENSE)
