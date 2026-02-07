
import os

file_path = r"D:\AKAFMenu\akafwebsite_temp\middleware.ts"
content = """import createMiddleware from 'next-intl/middleware';
import { routing } from './routing';

export default createMiddleware(routing);

export const config = {
  matcher: [
    '/',
    '/(fa|ar|en)/:path*',
    '/((?!api|_next|_vercel|card|pc_software|.*\\..*).*)'
  ]
};
"""

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("middleware.ts updated successfully")
