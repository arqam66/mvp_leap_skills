import { NextResponse } from 'next/server';
import { AccessToken } from 'livekit-server-sdk';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const room = searchParams.get('room') || 'default-room';
    const username = searchParams.get('username') || `user_${Math.random().toString(36).substring(2, 7)}`;
    const isHost = searchParams.get('isHost') === 'true';

    const apiKey = process.env.LIVEKIT_API_KEY || 'devkey';
    const apiSecret = process.env.LIVEKIT_API_SECRET || 'secretsecretsecretsecretsecretsecret';

    const at = new AccessToken(apiKey, apiSecret, {
      identity: username,
      ttl: '2h',
    });

    at.addGrant({
      room,
      roomJoin: true,
      canPublish: isHost ? true : true,
      canSubscribe: true,
    });

    const token = await at.toJwt();

    return NextResponse.json({ token, wsUrl: process.env.NEXT_PUBLIC_LIVEKIT_URL || 'wss://demo.livekit.cloud' });
  } catch (error: any) {
    console.error('LiveKit token error:', error);
    return NextResponse.json({ error: error.message || 'Token generation failed' }, { status: 500 });
  }
}
