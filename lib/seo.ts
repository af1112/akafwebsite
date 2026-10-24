import type { Metadata } from 'next';
import { routing } from '@/routing';

export const siteUrl = new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://akafco.com').origin;

export function localizedMetadata(locale: string, path: string, title: string, description: string, index = true): Metadata {
  const canonical = `${siteUrl}/${locale}${path}`;
  return {
    title,
    description,
    alternates: {
      canonical,
      languages: {
        ...Object.fromEntries(routing.locales.map(language => [language, `${siteUrl}/${language}${path}`])),
        'x-default': `${siteUrl}/en${path}`
      }
    },
    robots: { index, follow: true },
    openGraph: {
      type: 'website',
      siteName: 'AKAF',
      title,
      description,
      url: canonical,
      locale: { en: 'en_GB', fa: 'fa_IR', ar: 'ar_OM' }[locale],
      alternateLocale: routing.locales.filter(language => language !== locale).map(language => ({ en: 'en_GB', fa: 'fa_IR', ar: 'ar_OM' }[language]))
    },
    twitter: { card: 'summary', title, description }
  };
}
