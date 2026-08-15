import { NextResponse } from 'next/server';
import { AccessToken } from 'livekit-server-sdk';
import { withRateLimit } from '../../../../lib/api-guard';

const ROOM_REGEX = /^[a-zA-Z0-9_-]{1,64}$/;

export async function GET(request: Request) {
  const rateLimitError = withRateLimit(request, { limit: 60 });
  if (rateLimitError) return rateLimitError;

  try {
    const { searchParams } = new URL(request.url);
    const room = searchParams.get('room') || 'default-room';
    const username = searchParams.get('username') || `user_${Math.random().toString(36).substring(2, 7)}`;
    const isHost = searchParams.get('isHost') === 'true';

    if (!ROOM_REGEX.test(room)) {
      return NextResponse.json({ error: 'Invalid room name' }, { status: 400 });
    }

    if (username.length > 64 || !/^[a-zA-Z0-9_-]+$/.test(username)) {
      return NextResponse.json({ error: 'Invalid username' }, { status: 400 });
    }

    const apiKey = process.env.LIVEKIT_API_KEY || 'devkey';
    const apiSecret = process.env.LIVEKIT_API_SECRET || 'secretsecretsecretsecretsecretsecret';

    const at = new AccessToken(apiKey, apiSecret, {
      identity: username,
      ttl: '2h',
    });

    at.addGrant({
      room,
      roomJoin: true,
      canPublish: true,
      canSubscribe: true,
    });

    const token = await at.toJwt();

    return NextResponse.json({ token, wsUrl: process.env.NEXT_PUBLIC_LIVEKIT_URL || 'wss://demo.livekit.cloud' });
  } catch (error: any) {
    console.error('LiveKit token error:', error);
    return NextResponse.json({ error: error.message || 'Token generation failed' }, { status: 500 });
  }
}
