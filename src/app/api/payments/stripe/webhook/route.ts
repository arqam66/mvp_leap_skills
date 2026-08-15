import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '../../../../../lib/supabase/server';

function getStripe() {
  const stripeSecret = process.env.STRIPE_SECRET_KEY;
  if (!stripeSecret) return null;

  return new Stripe(stripeSecret, {
    apiVersion: '2025-02-24.acacia',
  });
}

export async function POST(request: Request) {
  const stripe = getStripe();
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!stripe || !webhookSecret) {
    return NextResponse.json({ error: 'Stripe is not configured' }, { status: 500 });
  }

  const body = await request.text();
  const sig = request.headers.get('stripe-signature') || '';

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error('Webhook signature verification failed:', message);
    return NextResponse.json({ error: `Webhook Error: ${message}` }, { status: 400 });
  }

  const supabase = await createClient();

  switch (event.type) {
    case 'payment_intent.succeeded': {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      const bookingId = paymentIntent.metadata?.booking_id;

      if (bookingId) {
        // Update booking payment status to paid
        const { error: bookingErr } = await supabase
          .from('bookings')
          .update({
            payment_status: 'paid',
            status: 'confirmed',
            stripe_payment_intent_id: paymentIntent.id,
          })
          .eq('id', bookingId);

        if (bookingErr) {
          console.error('Failed to update booking:', bookingErr);
        }

        // Get booking details for payout calculation
        const { data: booking } = await supabase
          .from('bookings')
          .select('*, services(price, trainer_id)')
          .eq('id', bookingId)
          .single();

        if (booking) {
          const grossAmount = paymentIntent.amount / 100; // Convert from cents
          const platformFeeRate = 0.1; // 10% platform commission
          const platformFee = grossAmount * platformFeeRate;
          const trainerPayout = grossAmount - platformFee;

          // Record transaction
          await supabase.from('transactions').insert({
            booking_id: bookingId,
            trainer_id: booking.trainer_id,
            gross_amount: grossAmount,
            platform_fee: platformFee,
            trainer_payout: trainerPayout,
            stripe_payment_intent_id: paymentIntent.id,
            status: 'completed',
          });
        }
      }
      break;
    }

    case 'payment_intent.payment_failed': {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      const bookingId = paymentIntent.metadata?.booking_id;

      if (bookingId) {
        await supabase
          .from('bookings')
          .update({ payment_status: 'unpaid', status: 'cancelled' })
          .eq('id', bookingId);
      }
      break;
    }

    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  return NextResponse.json({ received: true });
}
