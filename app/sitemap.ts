import { MetadataRoute } from 'next';
import { routing } from '@/routing';
import { siteUrl } from '@/lib/seo';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteUrl;

  const routes = [
    '',
    '/digital',
    '/industrial',
    '/smart-industry',
    '/products/digital-menu',
    '/products/weighbridge',
    '/projects',
    '/about',
    '/partnerships',
    '/contact',
    '/services',
    '/features',
    '/pricing'
  ];

  const sitemapEntries: MetadataRoute.Sitemap = [];

  routing.locales.forEach((locale) => {
    routes.forEach((route) => {
      sitemapEntries.push({
        url: `${baseUrl}/${locale}${route}`,
        changeFrequency: 'monthly',
        priority: route === '' ? 1 : 0.8,
        alternates: {
          languages: {
            en: `${baseUrl}/en${route}`,
            fa: `${baseUrl}/fa${route}`,
            ar: `${baseUrl}/ar${route}`,
            'x-default': `${baseUrl}/en${route}`
          }
        }
      });
    });
  });

  return sitemapEntries;
}


