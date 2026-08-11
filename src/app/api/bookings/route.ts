import { NextResponse } from 'next/server';
import { createClient } from '../../../lib/supabase/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { creatorId, serviceId, date, time, clientName, clientEmail, notes, format, dmQuestion } = body;

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
        format: format || 'one_on_one',
        status: 'confirmed',
        payment_status: 'paid',
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
