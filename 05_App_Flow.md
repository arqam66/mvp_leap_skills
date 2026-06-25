# CreatorHub Pro — Application Flow Documentation (v2.0)

**Aligned with Topmate-style creator monetization model**

---

## Platform Flow Overview

The platform consists of three primary user journeys:

1. Client Journey
2. Trainer Journey
3. Admin Journey

Each journey interacts with the Booking, Payment, Meeting, Product, Discovery, Notification, and Analytics systems.

> **Key shift from v1.0:** "Booking" is no longer limited to 1:1 sessions. A client can book a 1:1 call, register for a webinar, join a cohort, buy a package, or send a paid DM — all from the same trainer profile and the same checkout flow.

---

## Public User Flow

```
Landing Page
│
├── Browse Trainers
├── Search Trainers (incl. AI-powered "find the right expert" search)
├── View Trainer Profile (single shareable link)
├── View Services (1:1 / Webinar / Cohort / Package / Paid DM)
├── View Reviews & Testimonials
└── Sign Up / Login
```

---

## Authentication Flow

```
User Visits Platform
        │
        ▼
Login / Signup
        │
        ▼
Email Verification
        │
        ▼
Account Created
        │
        ▼
Role Assignment
(Client / Trainer)
        │
        ▼
Dashboard Access
```

---

## Client Journey

### Step 1 — Discover Trainers

```
Homepage
     │
     ▼
Browse Trainers
     │
     ▼
Search & Filter — OR — AI-Powered Match
     │              (ask a question / goal,
     │               system recommends trainers)
     ▼
Open Trainer Profile
```

**Available Filters:** Category · Expertise · Price · Rating · Language · Availability · Format (1:1 / Webinar / Cohort)

### Step 2 — Trainer Profile

```
Trainer Profile (single link)
      │
      ├── About
      ├── Skills
      ├── Reviews & Testimonials
      ├── Services (1:1, Webinars, Cohorts, Packages, Paid DMs)
      ├── Digital Products
      └── Availability
```

**User Actions:** View profile · Read reviews · View services · Purchase products or packages · Book a session/webinar/cohort seat · Send a priority paid DM

---

## Booking Flow

```
Select Service Format
      │
      ├── 1:1 Session ──► Choose Date ──► Choose Slot
      ├── Webinar / Cohort ──► Choose Seat
      ├── Package ──► Select Bundle Contents
      └── Paid DM ──► Compose Question
      │
      ▼
Booking Summary
      │
      ▼
Proceed To Inline Checkout
```

> Checkout happens inline on the trainer's profile — the client is never redirected to a third-party scheduling or payment page.

---

## Payment Flow

```
Inline Checkout
      │
      ▼
Select Payment Method
      │
      ▼
Stripe / Razorpay / UPI
      │
      ▼
Payment Success
      │
      ▼
Webhook Verification
      │
      ▼
Booking Confirmed
      │
      ▼
Commission Deducted → Trainer Payout Queued (instant or next batch)
```

**System Actions on Confirmation:**
- Slot/Seat Locked
- Booking Created
- Meeting Room Generated (for live formats) or DM Thread Opened (for paid DMs)
- Notification Generated
- Email + WhatsApp Notification Sent
- Trainer Payout Initiated

---

## Meeting Creation Flow

```
Booking Confirmed
       │
       ▼
Format Check
       │
   ┌───┴────────────┐
   ▼                ▼
1:1 / Webinar    Trainer Prefers Zoom?
Native WebRTC     │
Room Generated    ▼
   │          Zoom Meeting Created via Zoom Integration
   ▼                │
Generate Unique Room ID
       │
       ▼
Save Meeting Details
       │
       ▼
Attach Meeting To Booking
```

---

## Email & Messaging Automation Flow

### Client Confirmation

```
Payment Successful
        │
        ▼
Send Confirmation Email + WhatsApp Message
        │
        ▼
Includes:
- Service Details (format-aware: session / webinar / cohort / package / DM)
- Trainer Information
- Date & Time (if applicable)
- Meeting Link (if applicable)
```

### Trainer Notification

```
Booking Confirmed
       │
       ▼
Send Trainer Notification (Email + WhatsApp)
       │
       ▼
Includes:
- Client Details
- Service Details
- Meeting Link / DM Thread Link
```

### Auto-DM Growth Flow (Instagram)

```
Follower Sends Keyword DM
        │
        ▼
Auto-DM Bot Detects Keyword
        │
        ▼
Auto-Reply With Trainer's Profile Link
        │
        ▼
Follower Lands On Profile → Books
```

---

## Meeting Reminder Flow

```
Cron Job → 24 Hours Before Session/Webinar/Cohort
      │
      ▼
Reminder Email + WhatsApp Message + In-App Notification
```

```
Cron Job → 1 Hour Before Session/Webinar/Cohort
      │
      ▼
Reminder Email + WhatsApp Message + In-App Notification
```

---

## Video Meeting Flow

### Client Side

```
My Bookings → Upcoming Session/Webinar/Cohort → Join Meeting → Meeting Room
```

### Trainer Side

```
Dashboard → Upcoming Sessions → Join Meeting → Meeting Room
                                 (Webinar Mode if format = Webinar/Cohort)
```

### WebRTC Flow

```
Client Joins Room
          │
          ▼
Socket Connection
          │
          ▼
Trainer Joins Room
          │
          ▼
Offer / Answer Exchange
          │
          ▼
ICE Candidate Exchange
          │
          ▼
Peer Connection Established
          │
          ▼
Video Call Started
(One-to-one OR One-to-many if Webinar/Cohort)
```

---

## Meeting Features

```
Meeting Room
│
├── Camera Control
├── Microphone Control
├── Screen Share
├── Live Chat
├── Connection Status
├── Webinar Mode (host + multiple attendees)
├── Leave Meeting
└── End Meeting
```

---

## Paid DM Flow

```
Client Sends Paid DM Request
        │
        ▼
Payment Processed
        │
        ▼
DM Thread Opened (Trainer + Client)
        │
        ▼
Trainer Responds (within SLA window)
        │
        ▼
Thread Marked Resolved
        │
        ▼
Client Prompted to Leave Review
```

---

## Session Completion Flow

```
Meeting / DM Thread Ends
      │
      ▼
Session Status Updated
      │
      ▼
Booking Marked Complete
      │
      ▼
Feedback Email Sent
```

---

## Review & Testimonial Flow

```
Feedback Email
       │
       ▼
Rate Session
       │
       ▼
Leave Review
       │
       ▼
Review Published
       │
       ▼
Trainer Can Pin Review As Testimonial On Public Profile
```

---

## Digital Product Purchase Flow

```
Browse Products
        │
        ▼
Open Product → View Details
        │
        ▼
Buy Product (Standalone or as part of a Package) → Inline Checkout
        │
        ▼
Payment Success
        │
        ▼
Download Enabled
```

### Product Delivery Flow

```
Payment Verified
        │
        ▼
Create Order
        │
        ▼
Generate Download Access
        │
        ▼
Send Purchase Email
```

---

## Trainer Onboarding Flow

```
Register
     │
     ▼
Complete Profile → Add Skills → Add Services
     │              (choose formats: 1:1 / Webinar / Cohort / Package / Paid DM)
     ▼
Configure Availability → Connect Calendar (Google / Outlook / iCloud)
     │
     ▼
Connect Optional Tools (Zoom, WhatsApp, Instagram Auto-DM)
     │
     ▼
Upload Products
     │
     ▼
Profile Published (single shareable link generated)
```

---

## Trainer Dashboard Flow

```
Dashboard
│
├── Analytics & Audience Insights
├── Earnings & Payouts
├── Bookings
├── Services (1:1 / Webinar / Cohort / Package / Paid DM)
├── Products
├── Availability & Calendar Sync
├── Reviews & Testimonials
├── Growth Tools (Auto-DM)
└── Settings
```

### Booking Management

```
Bookings
│
├── Pending
├── Confirmed
├── Upcoming
├── Completed
└── Cancelled
```

**Trainer Actions:** View Booking · Join Meeting · Reschedule · Cancel Booking · Respond to Paid DM

### Earnings & Payout Flow

```
Completed Session / Webinar / Cohort / Product Sale / Paid DM
       │
       ▼
Revenue Recorded
       │
       ▼
Commission Deducted
       │
       ▼
Trainer Earnings Updated
       │
       ▼
Payout Triggered (Instant or Batched)
       │
       ▼
Analytics Updated
```

---

## Admin Flow

### Admin Authentication

```
/admin
    │
    ▼
Admin Login
    │
    ▼
RBAC Verification
    │
    ▼
Admin Dashboard
```

### Admin Dashboard

```
Admin Dashboard
│
├── Users
├── Trainers
├── Bookings
├── Meetings
├── Products
├── Payments & Payouts
├── Analytics
├── Notifications
└── Settings (incl. Commission Rate)
```

### User Management

```
Users
   │
   ├── View User
   ├── Suspend User
   ├── Activate User
   ├── Ban User
   └── Delete User
```

### Booking Administration

```
Bookings
    │
    ├── View Booking
    ├── Cancel Booking
    ├── Refund Payment
    ├── Resolve Dispute
    └── Force Complete
```

### Analytics Dashboard

```
Analytics
│
├── Total Users
├── Active Users
├── Total Trainers
├── Total Bookings
├── Revenue
├── Product Sales
├── Meeting Success Rate
├── Webinar / Cohort Fill Rate
├── Paid DM Volume
└── Conversion Rate
```

---

## Real-Time Socket Events

### Booking Events

```
booking.created
booking.confirmed
booking.cancelled
booking.completed
```

### Meeting Events

```
meeting.created
meeting.started
meeting.ended
participant.joined
participant.left
webinar.seat_filled
```

### Paid DM Events

```
dm.requested
dm.paid
dm.responded
dm.resolved
```

### Notification Events

```
notification.created
notification.read
```

### Payout Events

```
payout.queued
payout.completed
```

---

## Complete End-to-End Flow

```
User Registers
      │
      ▼
Browse / AI-Matched Trainers
      │
      ▼
Select Service Format (1:1 / Webinar / Cohort / Package / Paid DM)
      │
      ▼
Book Slot or Seat
      │
      ▼
Inline Payment Success
      │
      ▼
Booking Created
      │
      ▼
Meeting Room Generated (or DM Thread Opened)
      │
      ▼
Email + WhatsApp Confirmation Sent
      │
      ▼
Session Reminder
      │
      ▼
Join Video Meeting (1:1 or Webinar Mode)
      │
      ▼
Session Completed
      │
      ▼
Leave Review → Trainer Pins As Testimonial
      │
      ▼
Trainer Receives Instant Payout
```

---

