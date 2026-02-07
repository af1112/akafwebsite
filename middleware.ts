import createMiddleware from 'next-intl/middleware';
import { routing } from './routing';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export default function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  
  // Force skip for pc_software to prevent ANY next-intl processing
  // This logic is explicit and independent of matcher
  if (pathname.startsWith('/pc_software')) {
    return NextResponse.next();
  }

  // Use next-intl middleware for other routes
  const handleI18nRouting = createMiddleware(routing);
  return handleI18nRouting(request);
}

export const config = {
  // Match everything except static assets and API
  // We handle pc_software exclusion explicitly in the function above
  matcher: ['/((?!api|_next|_vercel|static|media|.*\\..*).*)']
};
