import createMiddleware from 'next-intl/middleware';
import { routing } from './routing';

export default createMiddleware(routing);

export const config = {
  matcher: [
    '/',
    '/(fa|ar|en)/:path*',
    // Exclude pc_software, api, _next, etc.
    '/((?!api|_next|_vercel|card|pc_software|static|media|.*\\..*).*)'
  ]
};
