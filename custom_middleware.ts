import createMiddleware from 'next-intl/middleware';
import { routing } from './routing';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export default function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  
  // Explicitly skip middleware for pc_software
  if (pathname.startsWith('/pc_software')) {
    return NextResponse.next();
  }

  // Use next-intl middleware for other routes
  const handleI18nRouting = createMiddleware(routing);
  return handleI18nRouting(request);
}

export const config = {
  matcher: [
    '/',
    '/(fa|ar|en)/:path*',
    '/((?!api|_next|_vercel|card|pc_software|static|media|.*\\..*).*)'
  ]
};
