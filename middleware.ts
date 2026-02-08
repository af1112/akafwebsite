import createMiddleware from 'next-intl/middleware';
import { routing } from './routing';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export default function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  console.log(`[Middleware Debug] Incoming request: ${pathname}`);

  // Fallback: If matcher misses (shouldn't happen), skip explicitly
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
  // Match everything except static assets, API, and pc_software
  // Added pc_software to exclusion list to prevent next-intl from running
  matcher: ['/((?!api|_next|_vercel|static|media|pc_software|.*\\..*).*)']
};
