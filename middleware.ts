import createMiddleware from 'next-intl/middleware';
import { routing } from './routing';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export default function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  console.log(`[Middleware Debug] Incoming request: ${pathname}`);

  // Force skip for pc_software to prevent ANY next-intl processing
  // Forced Update for Vercel Deploy: 2026-02-08T08:58:35.115Z
  if (pathname.startsWith('/pc_software')) {
    console.log(`[Middleware Debug] Skipping next-intl for: ${pathname}`);
    const response = NextResponse.next();
    response.headers.set('X-Debug-Middleware', 'Skipped-Explicitly');
    return response;
  }

  // Use next-intl middleware for other routes
  console.log(`[Middleware Debug] Applying next-intl for: ${pathname}`);
  const handleI18nRouting = createMiddleware(routing);
  return handleI18nRouting(request);
}

export const config = {
  // Match everything except static assets and API
  matcher: ['/((?!api|_next|_vercel|static|media|.*\\..*).*)']
};
