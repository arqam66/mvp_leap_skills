-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Enums
CREATE TYPE user_role AS ENUM ('client', 'trainer', 'admin');
CREATE TYPE service_format AS ENUM ('one_on_one', 'webinar', 'cohort', 'paid_dm');
CREATE TYPE package_status AS ENUM ('draft', 'published', 'archived');
CREATE TYPE package_item_type AS ENUM ('service', 'digital_product');
CREATE TYPE calendar_provider AS ENUM ('google', 'outlook', 'icloud');
CREATE TYPE sync_status AS ENUM ('connected', 'error', 'disconnected');
CREATE TYPE booking_format AS ENUM ('one_on_one', 'webinar', 'cohort', 'package', 'paid_dm');
CREATE TYPE booking_status AS ENUM ('pending', 'confirmed', 'cancelled', 'completed');
CREATE TYPE payment_status AS ENUM ('unpaid', 'paid', 'refunded');
CREATE TYPE dm_thread_status AS ENUM ('awaiting_response', 'responded', 'resolved');
CREATE TYPE meeting_mode AS ENUM ('one_to_one', 'webinar');
CREATE TYPE meeting_status AS ENUM ('scheduled', 'active', 'ended');
CREATE TYPE product_status AS ENUM ('draft', 'published', 'archived');
CREATE TYPE order_status AS ENUM ('pending', 'completed', 'refunded');
CREATE TYPE payment_provider AS ENUM ('stripe', 'razorpay', 'upi');
CREATE TYPE payment_txn_status AS ENUM ('pending', 'success', 'failed', 'refunded');
CREATE TYPE payout_method AS ENUM ('bank_transfer', 'upi', 'stripe_connect');
CREATE TYPE payout_status AS ENUM ('queued', 'processing', 'completed', 'failed');
CREATE TYPE commission_scope AS ENUM ('global', 'trainer_override');
CREATE TYPE notification_type AS ENUM ('booking', 'payment', 'reminder', 'product', 'paid_dm', 'admin');
CREATE TYPE notification_channel AS ENUM ('in_app', 'email', 'whatsapp');

-- 1. users
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  role user_role NOT NULL DEFAULT 'client',
  full_name TEXT NOT NULL,
  avatar_url TEXT,
  whatsapp_number TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. trainer_profiles
CREATE TABLE trainer_profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  profile_slug TEXT UNIQUE NOT NULL,
  headline TEXT,
  bio TEXT,
  expertise TEXT[],
  experience_years INTEGER DEFAULT 0,
  linkedin_url TEXT,
  website_url TEXT,
  instagram_handle TEXT,
  hourly_rate NUMERIC DEFAULT 0,
  rating NUMERIC DEFAULT 5.0,
  payout_method payout_method DEFAULT 'stripe_connect',
  payout_destination TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. services
CREATE TABLE services (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  trainer_id UUID NOT NULL REFERENCES trainer_profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  format service_format NOT NULL DEFAULT 'one_on_one',
  duration_minutes INTEGER,
  price NUMERIC NOT NULL DEFAULT 0,
  capacity INTEGER,
  category TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. packages
CREATE TABLE packages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  trainer_id UUID NOT NULL REFERENCES trainer_profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  price NUMERIC NOT NULL DEFAULT 0,
  status package_status DEFAULT 'published',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. package_items
CREATE TABLE package_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  package_id UUID NOT NULL REFERENCES packages(id) ON DELETE CASCADE,
  item_type package_item_type NOT NULL,
  item_id UUID NOT NULL,
  quantity INTEGER DEFAULT 1
);

-- 6. availability_slots
CREATE TABLE availability_slots (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  trainer_id UUID NOT NULL REFERENCES trainer_profiles(id) ON DELETE CASCADE,
  service_id UUID REFERENCES services(id) ON DELETE CASCADE,
  start_time TIMESTAMP WITH TIME ZONE NOT NULL,
  end_time TIMESTAMP WITH TIME ZONE NOT NULL,
  timezone TEXT NOT NULL DEFAULT 'UTC',
  capacity INTEGER DEFAULT 1,
  seats_booked INTEGER DEFAULT 0,
  is_booked BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 7. calendar_connections
CREATE TABLE calendar_connections (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  trainer_id UUID NOT NULL REFERENCES trainer_profiles(id) ON DELETE CASCADE,
  provider calendar_provider NOT NULL,
  access_token TEXT NOT NULL,
  refresh_token TEXT,
  external_calendar_id TEXT,
  sync_status sync_status DEFAULT 'connected',
  last_synced_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 8. paid_dm_threads
CREATE TABLE paid_dm_threads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  trainer_id UUID NOT NULL REFERENCES trainer_profiles(id) ON DELETE CASCADE,
  client_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  question TEXT NOT NULL,
  response TEXT,
  status dm_thread_status DEFAULT 'awaiting_response',
  opened_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  responded_at TIMESTAMP WITH TIME ZONE,
  resolved_at TIMESTAMP WITH TIME ZONE
);

-- 9. meetings
CREATE TABLE meetings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  room_id TEXT UNIQUE NOT NULL,
  zoom_meeting_id TEXT,
  mode meeting_mode DEFAULT 'one_to_one',
  start_time TIMESTAMP WITH TIME ZONE NOT NULL,
  end_time TIMESTAMP WITH TIME ZONE NOT NULL,
  status meeting_status DEFAULT 'scheduled',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 10. payouts
CREATE TABLE payouts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  trainer_id UUID NOT NULL REFERENCES trainer_profiles(id) ON DELETE CASCADE,
  amount NUMERIC NOT NULL,
  currency TEXT DEFAULT 'USD',
  method payout_method DEFAULT 'stripe_connect',
  status payout_status DEFAULT 'queued',
  provider_reference TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  completed_at TIMESTAMP WITH TIME ZONE
);

-- 11. payments
CREATE TABLE payments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  amount NUMERIC NOT NULL,
  currency TEXT DEFAULT 'USD',
  provider payment_provider DEFAULT 'stripe',
  transaction_id TEXT,
  status payment_txn_status DEFAULT 'pending',
  commission_amount NUMERIC DEFAULT 0,
  payout_id UUID REFERENCES payouts(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 12. bookings
CREATE TABLE bookings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  trainer_id UUID NOT NULL REFERENCES trainer_profiles(id) ON DELETE CASCADE,
  client_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  service_id UUID REFERENCES services(id),
  package_id UUID REFERENCES packages(id),
  slot_id UUID REFERENCES availability_slots(id),
  dm_thread_id UUID REFERENCES paid_dm_threads(id),
  format booking_format NOT NULL DEFAULT 'one_on_one',
  status booking_status DEFAULT 'confirmed',
  payment_status payment_status DEFAULT 'paid',
  meeting_id UUID REFERENCES meetings(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 13. digital_products
CREATE TABLE digital_products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  trainer_id UUID NOT NULL REFERENCES trainer_profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  thumbnail TEXT,
  file_url TEXT NOT NULL,
  price NUMERIC NOT NULL DEFAULT 0,
  status product_status DEFAULT 'published',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 14. orders
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  buyer_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  product_id UUID REFERENCES digital_products(id),
  package_id UUID REFERENCES packages(id),
  payment_id UUID REFERENCES payments(id),
  status order_status DEFAULT 'completed',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 15. commission_settings
CREATE TABLE commission_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  scope commission_scope DEFAULT 'global',
  trainer_id UUID REFERENCES trainer_profiles(id),
  commission_percent NUMERIC DEFAULT 10.00,
  effective_from TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 16. reviews
CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  booking_id UUID NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 17. testimonials
CREATE TABLE testimonials (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  review_id UUID NOT NULL REFERENCES reviews(id) ON DELETE CASCADE,
  trainer_id UUID NOT NULL REFERENCES trainer_profiles(id) ON DELETE CASCADE,
  is_pinned BOOLEAN DEFAULT false,
  pinned_at TIMESTAMP WITH TIME ZONE
);

-- 18. social_dm_automations
CREATE TABLE social_dm_automations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  trainer_id UUID NOT NULL REFERENCES trainer_profiles(id) ON DELETE CASCADE,
  platform TEXT DEFAULT 'instagram',
  trigger_keyword TEXT NOT NULL,
  reply_template TEXT NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 19. notifications
CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type notification_type DEFAULT 'booking',
  channel notification_channel DEFAULT 'in_app',
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 20. admin_logs
CREATE TABLE admin_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  admin_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  action TEXT NOT NULL,
  entity_type TEXT NOT NULL,
  entity_id UUID,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- RLS Policies
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE trainer_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE packages ENABLE ROW LEVEL SECURITY;
ALTER TABLE availability_slots ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE paid_dm_threads ENABLE ROW LEVEL SECURITY;
ALTER TABLE digital_products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- Public READ for active services, public profiles, products
CREATE POLICY "Public profiles are readable by everyone" ON trainer_profiles FOR SELECT USING (true);
CREATE POLICY "Public services are readable by everyone" ON services FOR SELECT USING (is_active = true);
CREATE POLICY "Public products are readable by everyone" ON digital_products FOR SELECT USING (status = 'published');
CREATE POLICY "Public slots are readable by everyone" ON availability_slots FOR SELECT USING (true);

-- User specific write policies
CREATE POLICY "Users can manage their own profile" ON users FOR ALL USING (auth.uid() = id);
CREATE POLICY "Trainers can manage their own services" ON services FOR ALL USING (
  trainer_id IN (SELECT id FROM trainer_profiles WHERE user_id = auth.uid())
);
CREATE POLICY "Bookings readable by involved client or trainer" ON bookings FOR SELECT USING (
  client_id = auth.uid() OR trainer_id IN (SELECT id FROM trainer_profiles WHERE user_id = auth.uid())
);
