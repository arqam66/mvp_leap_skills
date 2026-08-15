import { clerkMiddleware } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const ALLOWED_ORIGINS = new Set([
  'https://leapskills.sbs',
  'https://www.leapskills.sbs',
  'http://localhost:3000',
  'http://localhost:3001',
]);

const isApiRoute = (pathname: string) => pathname.startsWith('/api/');

export default clerkMiddleware((_auth, request) => {
  if (!isApiRoute(request.nextUrl.pathname)) {
    return NextResponse.next();
  }

  const origin = request.headers.get('origin') || '';
  const allowedOrigin = ALLOWED_ORIGINS.has(origin) ? origin : '';

  const headers = new Headers();
  if (allowedOrigin) {
    headers.set('Access-Control-Allow-Origin', allowedOrigin);
    headers.set('Vary', 'Origin');
  }
  headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
  headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
  headers.set('Access-Control-Allow-Credentials', 'true');
  headers.set('Access-Control-Max-Age', '86400');

  if (request.method === 'OPTIONS') {
    return new NextResponse(null, { status: 204, headers });
  }

  const response = NextResponse.next();
  headers.forEach((value, key) => response.headers.set(key, value));
  return response;
});

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.[\\w]+$|_next/image|favicon.ico).*)',
    '/(api|trpc)(.*)',
  ],
};
