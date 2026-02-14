import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
  // For static export, requestLocale might be null
  // We'll handle it gracefully
  let locale: string;
  
  try {
    locale = (await requestLocale) || routing.defaultLocale;
  } catch {
    locale = routing.defaultLocale;
  }

  // Validate locale
  if (!locale || !routing.locales.includes(locale as any)) {
    locale = routing.defaultLocale;
  }

  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default
  };
});

