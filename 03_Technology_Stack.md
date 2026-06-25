# CreatorHub Pro — Technology Stack (v2.0)

**Aligned with Topmate-style creator monetization model**

---

## Frontend

| Category | Technology |
|---|---|
| **Framework** | Next.js 15 (App Router) |
| **Language** | TypeScript |
| **UI Library** | Tailwind CSS, Shadcn UI, Framer Motion |
| **State Management** | Zustand |
| **Data Fetching** | TanStack Query |

---

## Backend

**Platform:** Supabase

| Service | Description |
|---|---|
| **PostgreSQL** | Primary relational database |
| **Authentication** | User auth & session management |
| **Storage** | File and media storage |
| **Edge Functions** | Serverless backend logic |
| **Realtime** | Live data subscriptions |

---

## Video Infrastructure

| Component | Technology |
|---|---|
| **Video Engine** | WebRTC (native rooms) |
| **Webinar Mode** | WebRTC SFU pattern for one-to-many broadcast (1:1 sessions stay peer-to-peer; webinars/cohorts route through a selective forwarding unit to support multiple attendees) |
| **Optional Hosting** | Zoom API (for trainers who prefer to host on Zoom instead of native rooms) |
| **Signaling** | Socket.io |
| **Server Runtime** | Node.js + Express.js |

---

## Payments & Payouts

| Provider | Use Case |
|---|---|
| **Stripe** | International payments |
| **Razorpay** | Indian / regional payments |
| **UPI** (via Razorpay) | India-specific instant payment rail |
| **Payout Engine** | Custom commission-deduction + payout scheduler (instant or batched disbursement to trainers; no trainer subscription fee — platform earns only on transacted revenue) |

---

## Calendar & Third-Party Integrations

| Integration | Purpose |
|---|---|
| **Google Calendar API** | Two-way availability sync |
| **Microsoft Graph API (Outlook)** | Two-way availability sync |
| **Apple iCloud Calendar (CalDAV)** | Two-way availability sync |
| **Zoom API** | Optional alternative to native video rooms |
| **WhatsApp Business API** | Booking confirmations, reminders, notifications |
| **Instagram Graph API** | Auto-DM growth tool (keyword-triggered auto-reply linking to profile) |

---

## Discovery & AI

| Component | Technology |
|---|---|
| **AI-Powered Expert Search** | LLM-based query understanding (e.g. Anthropic Claude API or similar) to match client questions/goals to relevant trainer profiles |
| **Recommendation Ranking** | Combines AI relevance scoring with existing trainer rating, response rate, and booking conversion data |
| **Audience Insights ("Loop"-style)** | Analytics pipeline (PostHog events + Supabase aggregation) surfaced to trainers as traffic, conversion, and format-performance dashboards |

---

## Email & Messaging

**Provider:** Resend (email) · WhatsApp Business API (messaging) · Instagram Graph API (social auto-DM)

| Feature |
|---|
| Transactional Emails |
| Booking Confirmation Emails / WhatsApp Messages |
| Reminder Emails / WhatsApp Messages |
| Payment Receipts |
| Paid DM Activity Notifications |
| Instagram Auto-DM Replies |

---

## Storage

**Provider:** Supabase Storage

| Asset Type |
|---|
| Profile Images |
| Product Files |
| Meeting Attachments |
| Package/Bundle Assets |

---

## Deployment

| Layer | Platform |
|---|---|
| **Frontend** | Vercel |
| **Socket Server** | Railway |
| **Backend** | Supabase |
| **Webhook Listeners** (Stripe, Razorpay, WhatsApp, Instagram) | Railway / Supabase Edge Functions |

---

## Monitoring & Analytics

| Tool | Purpose |
|---|---|
| **Sentry** | Error tracking |
| **PostHog** | Product analytics & trainer audience insights |
| **Google Analytics** | Traffic & conversion analytics |

---

## Security

| Measure | Description |
|---|---|
| **JWT Authentication** | Stateless auth tokens |
| **Row Level Security (RLS)** | Database-level access control |
| **HTTPS** | Encrypted transport |
| **Rate Limiting** | API abuse prevention |
| **Input Validation** | Sanitize all user inputs |
| **Audit Logging** | Admin action tracking |
| **OAuth Token Vaulting** | Secure storage/refresh of Calendar, Zoom, WhatsApp, and Instagram access tokens |

---

## Architecture Overview

```
┌──────────────────────────────────────────────────────┐
│                    Client Browser                    │
│         Next.js 15 · TypeScript · Tailwind            │
│         Zustand · TanStack Query · Shadcn UI          │
└────────────┬───────────────┬─────────────────────────┘
             │               │
     ┌───────▼──────┐ ┌──────▼────────────┐
     │   Supabase    │ │  Socket.io Server  │
     │  (Backend)    │ │  Node.js/Express   │
     │  Auth · DB    │ │  (Railway)         │
     │  Storage · RT │ └──────┬─────────────┘
     └───────┬───────┘        │
             │         WebRTC P2P (1:1)
             │         WebRTC SFU (Webinar/Cohort)
     ┌───────▼───────┐        │
     │  PostgreSQL   │   ┌────▼─────┐
     │  (Supabase)   │   │  Clients │
     └───────┬───────┘   └──────────┘
             │
   ┌─────────┴───────────────────────────────────┐
   │            External Integrations             │
   │  Stripe · Razorpay/UPI · Resend               │
   │  WhatsApp Business API · Instagram Graph API  │
   │  Google/Outlook/iCloud Calendar · Zoom API    │
   │  AI Matching Service (Claude API or similar)  │
   └────────────────────────────────────────────────┘

Payments & Payouts: Stripe / Razorpay / UPI → Payout Engine
Messaging:          Resend (email) · WhatsApp · Instagram Auto-DM
Deploy:             Vercel (frontend) · Railway (socket + webhooks)
Monitor:            Sentry · PostHog · Google Analytics
```

---

## Summary of Changes from v1.0

1. Added **UPI** as a payment rail and a dedicated **Payout Engine** (commission deduction + instant/batched disbursement), reflecting the no-subscription, commission-only model.
2. Added a **Webinar Mode / SFU pattern** to the video infrastructure to support one-to-many sessions, alongside the existing 1:1 WebRTC P2P setup.
3. Added an **Integrations layer**: Google/Outlook/iCloud calendar sync, optional Zoom hosting, WhatsApp Business API, and Instagram Graph API (Auto-DM).
4. Added a **Discovery & AI** section covering AI-powered expert search and audience insights analytics.
5. Updated the architecture diagram to show the external integrations layer and the payout pipeline.
6. Added **OAuth token vaulting** to security measures, since the platform now stores third-party access tokens (calendar, Zoom, WhatsApp, Instagram).