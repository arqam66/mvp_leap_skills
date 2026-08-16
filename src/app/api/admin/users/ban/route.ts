import { NextResponse } from 'next/server';
import { z } from 'zod';
import { createClient } from '@/lib/supabase/server';
import { withRateLimit } from '@/lib/api-guard';

const banSchema = z.object({
  userId: z.string().min(1, 'userId is required').max(100),
  banned: z.boolean(),
});

export async function POST(request: Request) {
  const rateLimitError = withRateLimit(request, { limit: 10 });
  if (rateLimitError) return rateLimitError;

  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { data: adminProfile } = await supabase
      .from('users')
      .select('role, banned')
      .eq('id', user.id)
      .single();

    if (adminProfile?.role !== 'admin' || adminProfile?.banned === true) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
    }

    const parsed = banSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { userId, banned } = parsed.data;

    const { error } = await supabase
      .from('users')
      .update({ banned })
      .eq('id', userId);

    if (error) throw error;

    return NextResponse.json({ success: true, userId, banned });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error('Ban user error:', error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
