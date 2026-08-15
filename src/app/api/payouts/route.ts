import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '../../../lib/supabase/server';

function getStripe() {
  const stripeSecret = process.env.STRIPE_SECRET_KEY;
  if (!stripeSecret) return null;

  return new Stripe(stripeSecret, {
    apiVersion: '2025-02-24.acacia',
  });
}

export async function POST(request: Request) {
  try {
    const stripe = getStripe();
    if (!stripe) {
      return NextResponse.json({ error: 'Stripe is not configured' }, { status: 500 });
    }

    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get trainer's Stripe Connect account ID
    const { data: trainerProfile } = await supabase
      .from('trainer_profiles')
      .select('stripe_account_id, full_name')
      .eq('user_id', user.id)
      .single();

    if (!trainerProfile?.stripe_account_id) {
      // Create Stripe Connect account if doesn't exist
      const account = await stripe.accounts.create({
        type: 'express',
        email: user.email,
        capabilities: {
          card_payments: { requested: true },
          transfers: { requested: true },
        },
      });

      // Save Stripe account ID
      await supabase
        .from('trainer_profiles')
        .update({ stripe_account_id: account.id })
        .eq('user_id', user.id);

      // Create onboarding link
      const accountLink = await stripe.accountLinks.create({
        account: account.id,
        refresh_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/settings?stripe=refresh`,
        return_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/settings?stripe=success`,
        type: 'account_onboarding',
      });

      return NextResponse.json({ onboarding_url: accountLink.url, new_account: true });
    }

    // Check if account is fully onboarded
    const account = await stripe.accounts.retrieve(trainerProfile.stripe_account_id);
    if (!account.details_submitted) {
      const accountLink = await stripe.accountLinks.create({
        account: trainerProfile.stripe_account_id,
        refresh_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/settings?stripe=refresh`,
        return_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/settings?stripe=success`,
        type: 'account_onboarding',
      });
      return NextResponse.json({ onboarding_url: accountLink.url });
    }

    // Get pending payout balance
    const { data: pendingTransactions } = await supabase
      .from('transactions')
      .select('trainer_payout')
      .eq('trainer_id', user.id)
      .eq('payout_status', 'pending');

    const totalPendingPayout = (pendingTransactions || []).reduce(
      (sum, t) => sum + (t.trainer_payout || 0),
      0
    );

    return NextResponse.json({
      stripe_account_id: trainerProfile.stripe_account_id,
      details_submitted: account.details_submitted,
      charges_enabled: account.charges_enabled,
      pending_payout_amount: totalPendingPayout,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const stripe = getStripe();
    if (!stripe) {
      return NextResponse.json({ error: 'Stripe is not configured' }, { status: 500 });
    }

    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { amount } = await request.json();

    const { data: trainerProfile } = await supabase
      .from('trainer_profiles')
      .select('stripe_account_id')
      .eq('user_id', user.id)
      .single();

    if (!trainerProfile?.stripe_account_id) {
      return NextResponse.json({ error: 'Stripe account not connected' }, { status: 400 });
    }

    // Trigger payout via Stripe Connect transfer
    const amountInCents = Math.round(amount * 100);
    const transfer = await stripe.transfers.create({
      amount: amountInCents,
      currency: 'usd',
      destination: trainerProfile.stripe_account_id,
    });

    // Mark transactions as paid out
    await supabase
      .from('transactions')
      .update({ payout_status: 'paid', stripe_transfer_id: transfer.id })
      .eq('trainer_id', user.id)
      .eq('payout_status', 'pending');

    return NextResponse.json({ success: true, transfer_id: transfer.id });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
