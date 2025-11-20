import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/routing';
import { ReactNode } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import './globals.css';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages({ locale });
  
  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://yourdomain.com'),
    alternates: {
      canonical: `/${locale}`,
      languages: {
        'en': '/en',
        'fa': '/fa',
        'ar': '/ar'
      }
    }
  };
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages({ locale });

  return (
    <html lang={locale} dir={locale === 'ar' ? 'rtl' : locale === 'fa' ? 'rtl' : 'ltr'}>
      <head>
        <link rel="canonical" href={`${process.env.NEXT_PUBLIC_BASE_URL || 'https://yourdomain.com'}/${locale}`} />
      </head>
      <body>
        <NextIntlClientProvider messages={messages}>
          <Navigation />
          <main>{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
