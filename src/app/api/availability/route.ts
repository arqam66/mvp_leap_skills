import { NextResponse } from 'next/server';
import { createClient } from '../../../lib/supabase/server';
import { withRateLimit } from '../../../lib/api-guard';

export async function GET(request: Request) {
  const rateLimitError = withRateLimit(request, { limit: 60 });
  if (rateLimitError) return rateLimitError;

  const { searchParams } = new URL(request.url);
  const trainerId = searchParams.get('trainer_id');
  const serviceId = searchParams.get('service_id');
  const date = searchParams.get('date'); // YYYY-MM-DD

  if (!trainerId || !date) {
    return NextResponse.json({ error: 'trainer_id and date are required' }, { status: 400 });
  }

  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return NextResponse.json({ error: 'date must be in YYYY-MM-DD format' }, { status: 400 });
  }

  const supabase = await createClient();

  // Get service duration (default 60 min)
  let durationMinutes = 60;
  if (serviceId) {
    const { data: service } = await supabase
      .from('services')
      .select('duration_minutes')
      .eq('id', serviceId)
      .single();
    if (service?.duration_minutes) durationMinutes = service.duration_minutes;
  }

  // Get trainer's availability schedule for the day of week
  const dayOfWeek = new Date(date).getDay(); // 0=Sun, 6=Sat
  const { data: availability } = await supabase
    .from('availability_schedules')
    .select('*')
    .eq('trainer_id', trainerId)
    .eq('day_of_week', dayOfWeek)
    .eq('is_available', true);

  if (!availability || availability.length === 0) {
    return NextResponse.json({ slots: [] });
  }

  // Get existing bookings for this trainer on this date
  const dateStart = `${date}T00:00:00`;
  const dateEnd = `${date}T23:59:59`;
  const { data: existingBookings } = await supabase
    .from('bookings')
    .select('scheduled_at, services(duration_minutes)')
    .eq('trainer_id', trainerId)
    .gte('scheduled_at', dateStart)
    .lte('scheduled_at', dateEnd)
    .in('status', ['confirmed', 'pending']);

  // Generate available slots from availability windows
  const bookedTimes = new Set(
    (existingBookings || []).map((b) => b.scheduled_at?.slice(11, 16)) // HH:MM
  );

  const slots: string[] = [];
  for (const window of availability) {
    const [startH, startM] = window.start_time.split(':').map(Number);
    const [endH, endM] = window.end_time.split(':').map(Number);
    const startMins = startH * 60 + startM;
    const endMins = endH * 60 + endM;

    for (let t = startMins; t + durationMinutes <= endMins; t += durationMinutes) {
      const h = String(Math.floor(t / 60)).padStart(2, '0');
      const m = String(t % 60).padStart(2, '0');
      const slot = `${h}:${m}`;
      if (!bookedTimes.has(slot)) {
        slots.push(slot);
      }
    }
  }

  return NextResponse.json({ slots, date, trainerId });
}
