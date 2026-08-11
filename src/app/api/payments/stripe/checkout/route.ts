import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripeSecret = process.env.STRIPE_SECRET_KEY;
const stripe = stripeSecret ? new Stripe(stripeSecret, { apiVersion: '2025-02-24.acacia' as any }) : null;

export async function POST(request: Request) {
  try {
    const { amount, currency = 'usd', serviceTitle, clientEmail } = await request.json();

    if (!amount || amount <= 0) {
      return NextResponse.json({ error: 'Invalid amount' }, { status: 400 });
    }

    if (stripe) {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(amount * 100), // convert dollars to cents
        currency: currency.toLowerCase(),
        receipt_email: clientEmail,
        metadata: {
          serviceTitle,
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
