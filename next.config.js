const createNextIntlPlugin = require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin('./i18n.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Only use static export when explicitly building for static export
  // This allows middleware to work in dev mode
  ...(process.env.STATIC_EXPORT === 'true' && { output: 'export' }),
  images: {
    unoptimized: true
  },
  trailingSlash: true,
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
};

module.exports = withNextIntl(nextConfig);
