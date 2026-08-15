import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { z } from 'zod';
import { withRateLimit } from '../../../../../lib/api-guard';

const stripeSecret = process.env.STRIPE_SECRET_KEY;
const stripe = stripeSecret ? new Stripe(stripeSecret, { apiVersion: '2025-02-24.acacia' as any }) : null;

const checkoutSchema = z.object({
  amount: z
    .number()
    .positive('Amount must be greater than zero')
    .max(100_000, 'Amount exceeds the maximum allowed'),
  currency: z.string().min(3).max(3).optional(),
  serviceTitle: z.string().max(200).optional(),
  clientEmail: z.union([z.literal(''), z.string().email('Invalid email address')]).optional(),
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

    const parsed = checkoutSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { amount, currency = 'usd', serviceTitle, clientEmail } = parsed.data;

    if (stripe) {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(amount * 100), // convert dollars to cents
        currency: currency.toLowerCase(),
        receipt_email: clientEmail || undefined,
        metadata: {
          serviceTitle: serviceTitle || '',
        },
      });

      return NextResponse.json({
        clientSecret: paymentIntent.client_secret,
        paymentIntentId: paymentIntent.id,
      });
    }

    // Fallback/Simulated response for test environment without active secret key
    return NextResponse.json({
      clientSecret: `mock_pi_${Math.random().toString(36).substring(2)}_secret_${Math.random().toString(36).substring(2)}`,
      paymentIntentId: `mock_pi_${Math.random().toString(36).substring(2)}`,
      mockMode: true,
    });
  } catch (error: any) {
    console.error('Stripe checkout error:', error);
    return NextResponse.json({ error: error.message || 'Payment initiation failed' }, { status: 500 });
  }
}
