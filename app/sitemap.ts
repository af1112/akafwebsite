import { MetadataRoute } from 'next';
import { routing } from '@/routing';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://yourdomain.com';

  const routes = ['', '/about', '/services', '/contact'];

  const sitemapEntries: MetadataRoute.Sitemap = [];

  routing.locales.forEach((locale) => {
    routes.forEach((route) => {
      sitemapEntries.push({
        url: `${baseUrl}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: route === '' ? 1 : 0.8,
        alternates: {
          languages: {
            en: `${baseUrl}/en${route}`,
            fa: `${baseUrl}/fa${route}`,
            ar: `${baseUrl}/ar${route}`
          }
        }
      });
    });
  });

  return sitemapEntries;
}

