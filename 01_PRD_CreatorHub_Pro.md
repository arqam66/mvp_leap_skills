# CreatorHub Pro — Product Requirements Document (PRD)

**Version:** 2.0 (Aligned with Topmate-style creator monetization model)

---

## Product Overview

CreatorHub Pro is a **single-link creator monetization platform** that enables trainers, mentors, coaches, consultants, and industry experts to monetize their expertise — all from **one public profile link** — through:

- One-on-one consultations
- Career guidance sessions
- Interview preparation sessions
- Technical mentoring
- Coaching services
- **Webinars and group sessions**
- **Cohort-based courses**
- **Service packages / bundles**
- **Priority (paid) direct messages**
- Digital product sales
- Real-time video meetings

The platform provides a seamless booking experience, integrated payments with **instant payouts**, automated communications, secure video conferencing, audience-growth/discovery tools, and a comprehensive administration system.

> **Topmate-style positioning:** the value proposition is "one link, every monetization format." A trainer should never need to send a client to a separate scheduling tool, a separate webinar tool, and a separate payment link — all formats live behind a single profile URL (e.g. `creatorhub.pro/username`).

---

## Business Goals

### Primary Goals

- Enable trainers to earn through online consultations, webinars, courses, and digital products — from a single profile
- Create a centralized platform for booking and communication
- Reduce manual scheduling and coordination
- Generate platform revenue through **commission-only pricing** (no mandatory monthly subscription — the platform takes a cut only when the trainer earns)
- Provide a scalable SaaS marketplace

### Secondary Goals

- Increase trainer visibility through **AI-powered discovery** (matching clients to the right expert based on their query, goals, or industry)
- Enable digital product, course, and cohort monetization
- Improve booking conversion rates
- Create a trusted professional ecosystem
- Give trainers **audience and performance insights** (a "Loop"-style analytics layer showing who is visiting their profile, what's converting, and what to offer next)

---

## Target Audience

### Trainers

| Type |
|---|
| Career Coaches |
| Software Engineers |
| Product Managers |
| Designers |
| HR Professionals |
| AI Experts |
| Business Consultants |
| Freelancers |
| Content Creators / Influencers |

### Clients

| Type |
|---|
| Students |
| Job Seekers |
| Professionals |
| Entrepreneurs |
| Freelancers |
| Startup Founders |
| A trainer's existing social/follower audience |

---

## User Roles

### Client

| Permission |
|---|
| Register account |
| Browse trainers |
| Search trainers (incl. AI-powered search by topic, company, or industry) |
| Book sessions, webinars, or cohorts |
| Join meetings |
| Purchase products and packages |
| Send a priority (paid) DM to a trainer |
| Leave reviews / testimonials |
| Manage profile |
| View booking and order history |

### Trainer

| Permission |
|---|
| Create public profile (single shareable link) |
| Manage services (1:1, webinars, courses, cohorts, packages, paid DMs, digital products) |
| Manage availability |
| Conduct video sessions |
| Upload digital products |
| View earnings and **instant payout** status |
| View analytics (traffic, conversion, audience insights) |
| Manage bookings |
| Connect external calendars and tools (Google Calendar, Outlook, iCloud, Zoom, WhatsApp, Instagram DM) |

### Super Admin

| Permission |
|---|
| Manage all users |
| Manage trainers |
| Manage products |
| Manage bookings |
| Manage meetings |
| View platform analytics |
| Manage payouts |
| Handle disputes |
| Configure platform settings |
| Configure platform commission rate |

> **Note:** Admin routes must not appear in public navigation.
> **Protected route:** `/admin`

---

## Functional Requirements

### Authentication Module

**Features:**
- Email registration
- Email login
- Password reset
- Email verification
- Google Authentication
- Session management
- JWT authentication

**Security:**
- Rate limiting
- CAPTCHA
- Password hashing
- Secure cookies
- MFA support *(future)*

---

### User Profile Module

**Client Profile Fields:**

| Field |
|---|
| Name |
| Profile Picture |
| Email |
| Phone |
| Country |
| Timezone |
| Bio |

**Trainer Profile Fields:**

| Field |
|---|
| Full Name |
| Profile Picture |
| Headline |
| About |
| Skills |
| Languages |
| Years of Experience |
| LinkedIn |
| Website |
| Portfolio |
| Pricing |
| Rating |
| Reviews / Testimonials |
| **Public profile slug / single link** |
| **Follower/social handle links (for Auto-DM discovery)** |

---

### Trainer Services Module (Modular Monetization Formats)

Each trainer can offer **multiple monetization formats from one profile**, the core Topmate-style differentiator.

**Supported Formats:**
- **1:1 sessions** — Resume Review, Career Guidance, Mock Interview, Technical Mentorship, Startup Consultation
- **Webinars / group sessions** — many clients booking the same live session
- **Cohort-based courses** — multi-session, multi-week programs with a roster of participants
- **Packages / bundles** — multiple sessions or a session + product sold together at a discount
- **Priority direct messages (paid DMs)** — asynchronous, paid Q&A without a live call
- **Digital products** — see Digital Products Module

**Service Fields:**

| Field |
|---|
| Title |
| Description |
| Format (1:1 / Webinar / Cohort / Package / Paid DM) |
| Duration |
| Price |
| Capacity (seats, for webinars/cohorts) |
| Category |
| Session Type |
| Active Status |

---

### Availability Management

**Trainer can:**
- Set working hours
- Create slots
- Block dates
- Set holidays
- Define timezone
- **Sync availability with Google Calendar, Outlook, or iCloud Calendar** (two-way sync to avoid double-booking across tools)

**System must automatically:**
- Prevent double booking
- Convert timezones
- Lock slots after booking
- Reflect external calendar conflicts in real time

---

### Booking System

**Booking Workflow:**

1. User discovers trainer (direct link, search, or AI-powered match)
2. User selects a monetization format (1:1, webinar, cohort, package, or paid DM)
3. User selects available slot (or seat, for webinars/cohorts)
4. User submits booking
5. Payment is initiated (checkout happens inline — never redirected to a separate page)
6. Payment is verified
7. Booking is confirmed
8. Meeting room is generated (for live formats) or DM thread is opened (for paid DMs)
9. Confirmation emails/notifications are sent

---

### Payment System

**Supported Providers:**
- Stripe
- Razorpay
- **UPI (for India-based trainers/clients)**

**Features:**
- Secure, inline checkout (no external redirect)
- Payment verification
- **Instant or near-instant payouts to trainers**
- Refund management
- Transaction logs
- **Commission calculation — platform earns only when the trainer earns; no flat monthly subscription fee for trainers**

---

### Video Meeting System

**Purpose:** Enable trainers and clients to communicate without leaving the platform.

#### Features

**Video:**
- HD video calling
- Camera toggle
- Microphone toggle
- **Webinar mode (one-to-many broadcast with a single host and multiple attendees)**

**Collaboration:**
- Screen sharing
- Chat
- File sharing *(future)*

**Session Controls:**
- Join room
- Leave room
- End session

**Meeting Security:**
- Unique room ID
- Booking verification
- Protected access
- Session recording *(future)*

**Native or integrated conferencing:**
- Built-in WebRTC rooms by default
- **Optional Zoom integration** for trainers who prefer to host on Zoom

---

### WebRTC Architecture

```
Booking Confirmed
       ↓
Meeting Room Created
       ↓
Socket Connection Established
       ↓
WebRTC Handshake
       ↓
Video Session Started
```

---

### Real-Time Communication

**Technology:** Socket.io

**Uses:**
- Meeting signaling
- Notifications
- Live booking updates
- Live availability updates
- Meeting status updates
- **Live paid-DM thread updates**

---

### Email & Messaging Automation System

**Provider:** Resend
**Alternative:** SendGrid

**Additional channels (Topmate-style):**
- **WhatsApp notifications** for booking confirmations and reminders
- **Instagram Auto-DM** — automatically replies to followers who DM keywords, directing them to the trainer's profile link to book

#### Booking Confirmation Email

| Detail |
|---|
| Sent to: Trainer & Client |
| Contains: Session details, Date, Time, Meeting link |

#### Reminder Email / WhatsApp Message

| Timing |
|---|
| 24 hours before |
| 1 hour before |

#### Payment Email

| Detail |
|---|
| Sent immediately after payment |
| Contains: Receipt, Invoice, Booking details |

#### Product Purchase Email

| Contains |
|---|
| Download links |
| Receipt |

---

### Digital Products Module

**Supported Products:**
- PDF
- Ebooks
- Templates
- Cheat Sheets
- Guides
- Recordings
- **Pre-recorded courses (in addition to live cohorts)**

**Features:**
- Product uploads
- Pricing
- Downloads
- Purchase history
- Secure access
- **Bundling with 1:1 sessions or packages**

---

### Reviews, Ratings & Testimonials

Users can review after completed sessions.

| Field |
|---|
| Rating |
| Comment |
| Date |

> Only verified bookings can leave a review.
> Trainers can **showcase top testimonials directly on their public profile** to build trust before a client books.

---

### Discovery & Audience Tools

**AI-Powered Expert Search:**
- Clients can search by topic, question, target company, or industry
- The system recommends matching trainers based on profile content and past session outcomes

**Audience Insights ("Loop"-style):**
- Trainers see who is visiting their profile, where traffic is coming from, and which service format converts best
- Suggestions on what new service or price point to test next

**Auto-DM Growth Tool:**
- Connects to a trainer's Instagram (or other social) account
- Automatically responds to inbound DMs with a link to book, reducing manual follow-up

---

### Notification System

**Types:**
- Booking updates
- Payment updates
- Meeting reminders
- Product purchases
- Paid DM activity
- Admin announcements

**Channels:**
- In-App
- Email
- **WhatsApp**

---

### Admin Dashboard

#### User Management

- View users
- Suspend users
- Ban users
- Reactivate users

#### Trainer Management

- Verify trainers
- Feature trainers
- Remove trainers

#### Booking Management

- View bookings
- Cancel bookings
- Resolve disputes

#### Product Management

- View products
- Remove products
- Flag violations

#### Payment Management

- View transactions
- Manage refunds
- Track commissions
- **Manage payout schedule (instant vs. batched)**

#### Analytics Dashboard

| Metric |
|---|
| Total Users |
| Active Users |
| Total Trainers |
| Monthly Revenue |
| Total Bookings |
| Conversion Rate |
| Product Sales |
| **Webinar / Cohort Fill Rate** |
| **Paid DM Volume** |

---

## Non-Functional Requirements

### Performance

| Requirement | Target |
|---|---|
| Page load | Under 2 seconds |
| API response | Under 500ms |

### Security

- HTTPS
- JWT
- RLS Policies
- Secure file access

### Scalability

| Requirement |
|---|
| 100,000+ users |
| 10,000+ trainers |
| Concurrent meetings |
| Concurrent webinars (one-to-many) |

---

## Success Metrics

| Metric |
|---|
| Booking Completion Rate |
| Monthly Revenue |
| Trainer Retention |
| User Retention |
| Product Sales |
| Meeting Success Rate |
| Webinar / Cohort Fill Rate |
| Paid DM Response Rate |
| Customer Satisfaction |

---
