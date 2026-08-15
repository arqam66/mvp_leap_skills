import { NextResponse } from 'next/server';
import { rateLimit } from './rate-limit';

export function withRateLimit(
  request: Request,
  options?: { limit?: number; windowMs?: number }
): NextResponse | null {
  const result = rateLimit(request, options);
  if (!result.ok) {
    const response = NextResponse.json(
      { error: 'Too many requests. Please try again later.' },
      { status: 429 }
    );
    response.headers.set('Retry-After', String(result.retryAfterSec ?? 1));
    return response;
  }
  return null;
}
