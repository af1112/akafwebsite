const fs = require('fs');

const content = `import createMiddleware from 'next-intl/middleware';
import { routing } from './routing';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export default function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  console.log(\`[Middleware Debug] Incoming request: \${pathname}\`);

  // Force skip for pc_software to prevent ANY next-intl processing
  if (pathname.startsWith('/pc_software')) {
    console.log(\`[Middleware Debug] Skipping next-intl for: \${pathname}\`);
    const response = NextResponse.next();
    response.headers.set('X-Debug-Middleware', 'Skipped-Explicitly');
    return response;
  }

  // Use next-intl middleware for other routes
  console.log(\`[Middleware Debug] Applying next-intl for: \${pathname}\`);
  const handleI18nRouting = createMiddleware(routing);
  return handleI18nRouting(request);
}

export const config = {
  // Match everything except static assets and API
  matcher: ['/((?!api|_next|_vercel|static|media|.*\\\\..*).*)']
};
`;

const filePath = String.raw`D:\AKAFMenu\akafwebsite_temp\middleware.ts`;

try {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Successfully updated ${filePath} with logging`);
} catch (err) {
    console.error(`Error writing file: ${err}`);
    process.exit(1);
}
