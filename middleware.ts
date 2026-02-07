import createMiddleware from 'next-intl/middleware';
import { routing } from './routing';

export default createMiddleware(routing);

export const config = {
  matcher: [
    '/',
    '/(fa|ar|en)/:path*',
    '/((?!api|_next|_vercel|card|pc_software|.*\..*).*)'
  ]
};
