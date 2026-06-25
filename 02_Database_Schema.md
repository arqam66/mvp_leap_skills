# CreatorHub Pro — Database Schema (v2.0)

**Aligned with Topmate-style creator monetization model**

---

## Tables Overview

| Table | Description |
|---|---|
| `users` | Core user accounts |
| `trainer_profiles` | Extended trainer info (incl. single public link, social/messaging handles) |
| `services` | Trainer-defined offerings — now format-aware (1:1 / webinar / cohort / paid DM) |
| `packages` | Bundled offerings (sessions + products sold together) |
| `package_items` | Line items inside a package |
| `availability_slots` | Trainer time slots — now capacity-aware for group formats |
| `calendar_connections` | External calendar sync (Google / Outlook / iCloud) |
| `bookings` | Session, webinar, cohort, package, and paid-DM bookings |
| `paid_dm_threads` | Asynchronous paid Q&A threads |
| `meetings` | Video meeting records (1:1 and webinar/cohort) |
| `digital_products` | Trainer digital products |
| `orders` | Product purchase records |
| `payments` | Inbound payment transactions |
| `payouts` | Outbound trainer disbursements |
| `commission_settings` | Platform/trainer commission configuration |
| `reviews` | Session reviews |
| `testimonials` | Reviews pinned to a public profile |
| `social_dm_automations` | Instagram Auto-DM rules |
| `notifications` | User notifications |
| `admin_logs` | Admin audit trail |

---

## Table Definitions

### `users`

| Column | Type | Notes |
|---|---|---|
| `id` | uuid | Primary key |
| `email` | text | Unique |
| `role` | enum | client / trainer / admin |
| `full_name` | text | |
| `avatar_url` | text | |
| `whatsapp_number` | text | Nullable — used for WhatsApp notifications |
| `created_at` | timestamp | |

---

### `trainer_profiles`

| Column | Type | Notes |
|---|---|---|
| `id` | uuid | Primary key |
| `user_id` | uuid | FK → users.id |
| `profile_slug` | text | Unique — powers the single shareable profile link (e.g. `/username`) |
| `headline` | text | |
| `bio` | text | |
| `expertise` | text[] | Array of skills |
| `experience_years` | integer | |
| `linkedin_url` | text | |
| `website_url` | text | |
| `instagram_handle` | text | Nullable — used for Auto-DM integration |
| `hourly_rate` | numeric | |
| `rating` | numeric | Avg. rating |
| `payout_method` | enum | bank_transfer / upi / stripe_connect |
| `payout_destination` | text | Encrypted account/UPI identifier |

---

### `services`

Now format-aware: one row can represent a 1:1 session, a webinar, a cohort, or a paid-DM offering. Packages are modeled separately (see `packages`) and reference services/products via `package_items`.

| Column | Type | Notes |
|---|---|---|
| `id` | uuid | Primary key |
| `trainer_id` | uuid | FK → trainer_profiles.id |
| `title` | text | |
| `description` | text | |
| `format` | enum | `one_on_one` / `webinar` / `cohort` / `paid_dm` |
| `duration_minutes` | integer | Nullable for `paid_dm` |
| `price` | numeric | |
| `capacity` | integer | Nullable for `one_on_one` / `paid_dm`; seat limit for `webinar` / `cohort` |
| `category` | text | |
| `is_active` | boolean | |

---

### `packages`

| Column | Type | Notes |
|---|---|---|
| `id` | uuid | Primary key |
| `trainer_id` | uuid | FK → trainer_profiles.id |
| `title` | text | |
| `description` | text | |
| `price` | numeric | Bundle price (may differ from sum of items) |
| `status` | enum | draft / published / archived |

---

### `package_items`

| Column | Type | Notes |
|---|---|---|
| `id` | uuid | Primary key |
| `package_id` | uuid | FK → packages.id |
| `item_type` | enum | `service` / `digital_product` |
| `item_id` | uuid | FK → services.id or digital_products.id (polymorphic, enforced at app layer) |
| `quantity` | integer | e.g. "3x 1:1 sessions" |

---

### `availability_slots`

| Column | Type | Notes |
|---|---|---|
| `id` | uuid | Primary key |
| `trainer_id` | uuid | FK → trainer_profiles.id |
| `service_id` | uuid | FK → services.id — ties a slot to a specific 1:1/webinar/cohort offering |
| `start_time` | timestamp | |
| `end_time` | timestamp | |
| `timezone` | text | |
| `capacity` | integer | 1 for `one_on_one`; >1 for `webinar` / `cohort` |
| `seats_booked` | integer | Incremented per booking; slot locks when `seats_booked = capacity` |
| `is_booked` | boolean | Convenience flag, true when `seats_booked >= capacity` |

---

### `calendar_connections`

| Column | Type | Notes |
|---|---|---|
| `id` | uuid | Primary key |
| `trainer_id` | uuid | FK → trainer_profiles.id |
| `provider` | enum | `google` / `outlook` / `icloud` |
| `access_token` | text | Encrypted |
| `refresh_token` | text | Encrypted, nullable (iCloud uses app-specific password instead) |
| `external_calendar_id` | text | |
| `sync_status` | enum | connected / error / disconnected |
| `last_synced_at` | timestamp | |

---

### `bookings`

| Column | Type | Notes |
|---|---|---|
| `id` | uuid | Primary key |
| `trainer_id` | uuid | FK → trainer_profiles.id |
| `client_id` | uuid | FK → users.id |
| `service_id` | uuid | FK → services.id, nullable when `package_id` is set |
| `package_id` | uuid | FK → packages.id, nullable — set when booking a bundle |
| `slot_id` | uuid | FK → availability_slots.id, nullable for `paid_dm` |
| `dm_thread_id` | uuid | FK → paid_dm_threads.id, nullable — set only for `paid_dm` bookings |
| `format` | enum | `one_on_one` / `webinar` / `cohort` / `package` / `paid_dm` |
| `status` | enum | pending / confirmed / cancelled / completed |
| `payment_status` | enum | unpaid / paid / refunded |
| `meeting_id` | uuid | FK → meetings.id, nullable for `paid_dm` |
| `created_at` | timestamp | |

> Note: for `webinar` / `cohort` formats, many `bookings` rows share the same `slot_id`, each representing one attendee's seat.

---

### `paid_dm_threads`

| Column | Type | Notes |
|---|---|---|
| `id` | uuid | Primary key |
| `trainer_id` | uuid | FK → trainer_profiles.id |
| `client_id` | uuid | FK → users.id |
| `question` | text | Initial client message |
| `response` | text | Nullable until trainer replies |
| `status` | enum | `awaiting_response` / `responded` / `resolved` |
| `opened_at` | timestamp | |
| `responded_at` | timestamp | Nullable |
| `resolved_at` | timestamp | Nullable |

---

### `meetings`

| Column | Type | Notes |
|---|---|---|
| `id` | uuid | Primary key |
| `booking_id` | uuid | FK → bookings.id |
| `room_id` | text | Unique WebRTC room identifier (native rooms) |
| `zoom_meeting_id` | text | Nullable — set if trainer uses Zoom integration instead of native rooms |
| `mode` | enum | `one_to_one` / `webinar` (one_to_one uses P2P; webinar uses SFU routing) |
| `start_time` | timestamp | |
| `end_time` | timestamp | |
| `status` | enum | scheduled / active / ended |

---

### `digital_products`

| Column | Type | Notes |
|---|---|---|
| `id` | uuid | Primary key |
| `trainer_id` | uuid | FK → trainer_profiles.id |
| `title` | text | |
| `description` | text | |
| `thumbnail` | text | Storage URL |
| `file_url` | text | Secure storage URL |
| `price` | numeric | |
| `status` | enum | draft / published / archived |

---

### `orders`

| Column | Type | Notes |
|---|---|---|
| `id` | uuid | Primary key |
| `buyer_id` | uuid | FK → users.id |
| `product_id` | uuid | FK → digital_products.id, nullable when `package_id` is set |
| `package_id` | uuid | FK → packages.id, nullable |
| `payment_id` | uuid | FK → payments.id |
| `status` | enum | pending / completed / refunded |

---

### `payments`

| Column | Type | Notes |
|---|---|---|
| `id` | uuid | Primary key |
| `user_id` | uuid | FK → users.id |
| `amount` | numeric | |
| `currency` | text | e.g. USD, INR |
| `provider` | enum | `stripe` / `razorpay` / `upi` |
| `transaction_id` | text | Provider transaction ID |
| `status` | enum | pending / success / failed / refunded |
| `commission_amount` | numeric | Platform's cut, computed at time of payment |
| `payout_id` | uuid | FK → payouts.id, nullable until disbursed |

---

### `payouts`

| Column | Type | Notes |
|---|---|---|
| `id` | uuid | Primary key |
| `trainer_id` | uuid | FK → trainer_profiles.id |
| `amount` | numeric | Net amount after commission |
| `currency` | text | |
| `method` | enum | bank_transfer / upi / stripe_connect |
| `status` | enum | `queued` / `processing` / `completed` / `failed` |
| `provider_reference` | text | External payout transaction ID |
| `created_at` | timestamp | |
| `completed_at` | timestamp | Nullable |

---

### `commission_settings`

| Column | Type | Notes |
|---|---|---|
| `id` | uuid | Primary key |
| `scope` | enum | `global` / `trainer_override` |
| `trainer_id` | uuid | FK → trainer_profiles.id, nullable (null = global default) |
| `commission_percent` | numeric | e.g. 10.00 |
| `effective_from` | timestamp | |

---

### `reviews`

| Column | Type | Notes |
|---|---|---|
| `id` | uuid | Primary key |
| `booking_id` | uuid | FK → bookings.id |
| `rating` | integer | 1–5 |
| `comment` | text | |

---

### `testimonials`

| Column | Type | Notes |
|---|---|---|
| `id` | uuid | Primary key |
| `review_id` | uuid | FK → reviews.id |
| `trainer_id` | uuid | FK → trainer_profiles.id |
| `is_pinned` | boolean | Controls display on public profile |
| `pinned_at` | timestamp | Nullable |

---

### `social_dm_automations`

| Column | Type | Notes |
|---|---|---|
| `id` | uuid | Primary key |
| `trainer_id` | uuid | FK → trainer_profiles.id |
| `platform` | enum | `instagram` (extensible to other platforms in future) |
| `trigger_keyword` | text | Word/phrase that triggers the auto-reply |
| `reply_template` | text | Message sent back, typically includes `profile_slug` link |
| `is_active` | boolean | |
| `created_at` | timestamp | |

---

### `notifications`

| Column | Type | Notes |
|---|---|---|
| `id` | uuid | Primary key |
| `user_id` | uuid | FK → users.id |
| `title` | text | |
| `message` | text | |
| `type` | enum | booking / payment / reminder / product / paid_dm / admin |
| `channel` | enum | `in_app` / `email` / `whatsapp` |
| `is_read` | boolean | |

---

### `admin_logs`

| Column | Type | Notes |
|---|---|---|
| `id` | uuid | Primary key |
| `admin_id` | uuid | FK → users.id |
| `action` | text | Description of action taken |
| `entity_type` | text | e.g. user, booking, product, payout, commission_settings |
| `entity_id` | uuid | ID of affected entity |
| `created_at` | timestamp | |

---

## Entity Relationship Summary

```
users
 ├── trainer_profiles (1:1)
 │    ├── services (1:many)               [format: one_on_one / webinar / cohort / paid_dm]
 │    ├── packages (1:many)
 │    │    └── package_items (1:many)
 │    ├── availability_slots (1:many)     [capacity / seats_booked for group formats]
 │    ├── calendar_connections (1:many)   [google / outlook / icloud]
 │    ├── digital_products (1:many)
 │    ├── paid_dm_threads (1:many)
 │    ├── payouts (1:many)
 │    ├── testimonials (1:many)
 │    └── social_dm_automations (1:many) [instagram auto-dm rules]
 └── bookings (as client) (1:many)
      ├── meetings (0:1)                  [null for paid_dm bookings]
      ├── paid_dm_threads (0:1)           [set only for paid_dm bookings]
      ├── payments (1:1)
      │    └── payouts (0:1)              [via payments.payout_id]
      └── reviews (0:1)
           └── testimonials (0:1)         [if pinned by trainer]

packages
 ├── package_items → services / digital_products
 └── bookings / orders (purchase records)

orders
 ├── buyer_id → users
 ├── product_id → digital_products (nullable)
 ├── package_id → packages (nullable)
 └── payment_id → payments

commission_settings → trainer_profiles (nullable, global default if null)
notifications → users
admin_logs → users (admin)
```

---

## Summary of Changes from v1.0

1. **`services`** gained a `format` column (`one_on_one` / `webinar` / `cohort` / `paid_dm`) and a `capacity` column, replacing the implicit "every service is a 1:1 session" assumption.
2. Added **`packages`** and **`package_items`** to support bundled offerings (multiple sessions and/or products sold together).
3. **`availability_slots`** gained `capacity` and `seats_booked` so a single slot can support many attendees (webinars/cohorts), not just one.
4. Added **`calendar_connections`** for two-way Google/Outlook/iCloud sync.
5. **`bookings`** gained `package_id`, `dm_thread_id`, and `format`, and `slot_id`/`meeting_id` are now nullable to accommodate paid-DM bookings that have no slot or video meeting.
6. Added **`paid_dm_threads`** as a first-class table for asynchronous paid Q&A.
7. **`meetings`** gained `mode` (`one_to_one` vs `webinar`) and an optional `zoom_meeting_id` for trainers using the optional Zoom integration.
8. **`payments`** gained `provider = upi`, plus `commission_amount` and `payout_id` to support the commission-only revenue model.
9. Added **`payouts`** and **`commission_settings`** to model instant/batched trainer disbursement and configurable commission rates.
10. Added **`testimonials`** (pinned reviews shown on the public profile) and **`social_dm_automations`** (Instagram Auto-DM rules).
11. **`trainer_profiles`** gained `profile_slug` (the single shareable link), `instagram_handle`, and payout fields.
12. **`notifications`** gained a `channel` column (`in_app` / `email` / `whatsapp`) and a `paid_dm` notification type.