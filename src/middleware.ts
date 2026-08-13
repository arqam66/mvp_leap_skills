import { clerkMiddleware } from '@clerk/nextjs/server';

export default clerkMiddleware();

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.[\\w]+$|_next/image|favicon.ico).*)',
    '/(api|trpc)(.*)',
  ],
};
