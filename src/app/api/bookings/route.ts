import { NextResponse } from 'next/server';
import { z } from 'zod';
import { createClient } from '../../../lib/supabase/server';
import { withRateLimit } from '../../../lib/api-guard';

const bookingSchema = z.object({
  creatorId: z.string().min(1, 'creatorId is required'),
  serviceId: z.string().min(1).optional(),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'date must be YYYY-MM-DD').optional(),
  time: z.string().regex(/^\d{2}:\d{2}$/, 'time must be HH:MM').optional(),
  clientName: z.string().min(2, 'Name must be at least 2 characters').max(100),
  clientEmail: z.string().email('Invalid email address').max(200),
  notes: z.string().max(2000).optional(),
  format: z.enum(['one_on_one', 'webinar', 'paid_dm', 'async_review']).optional(),
  dmQuestion: z.string().max(3000).optional(),
});

export async function POST(request: Request) {
  const rateLimitError = withRateLimit(request, { limit: 20 });
  if (rateLimitError) return rateLimitError;

  try {
    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
    }

    const parsed = bookingSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { creatorId, serviceId, date, time, clientName, clientEmail, notes, format, dmQuestion } = parsed.data;

    const supabase = await createClient();

    // 1. Check or create client user record
    let clientId: string | null = null;
    const { data: existingUser } = await supabase
      .from('users')
      .select('id')
      .eq('email', clientEmail)
      .single();

    if (existingUser) {
      clientId = existingUser.id;
    } else {
      const { data: newUser } = await supabase
        .from('users')
        .insert({
          email: clientEmail,
          full_name: clientName,
          role: 'client',
        })
        .select('id')
        .single();
      clientId = newUser?.id || null;
    }

    // 2. Handle Paid DM thread if applicable
    let dmThreadId: string | null = null;
    if (format === 'paid_dm' && dmQuestion) {
      const { data: dmThread } = await supabase
        .from('paid_dm_threads')
        .insert({
          trainer_id: creatorId,
          client_id: clientId,
          question: dmQuestion,
          status: 'awaiting_response',
        })
        .select('id')
        .single();
      dmThreadId = dmThread?.id || null;
    }

    // 3. Create Booking Record
    const { data: booking, error: bookingErr } = await supabase
      .from('bookings')
      .insert({
        trainer_id: creatorId,
        client_id: clientId,
        service_id: serviceId,
        scheduled_at: date && time ? `${date}T${time}:00` : undefined,
        format: format || 'one_on_one',
        status: 'confirmed',
        payment_status: 'paid',
        notes,
        dm_thread_id: dmThreadId,
      })
      .select()
      .single();

    if (bookingErr) throw bookingErr;

    return NextResponse.json({ success: true, booking });
  } catch (error: any) {
    console.error('Booking error:', error);
    return NextResponse.json({ error: error.message || 'Failed to create booking' }, { status: 500 });
  }
}
