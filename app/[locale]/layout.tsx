import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/routing';
import { ReactNode } from 'react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import AnnouncementBar from '@/components/AnnouncementBar';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import './fonts.css';
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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        {/* Preload fonts based on locale */}
        {locale === 'fa' && (
          <>
            <link rel="preload" href="/fonts/IranYekan/IRANYekanWebRegular.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
            <link rel="preload" href="/fonts/IranYekan/IRANYekanWebBold.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
          </>
        )}
        {locale === 'ar' && (
          <>
            <link rel="preload" href="/fonts/NotoSansArabic/NotoSansArabic-Regular.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
            <link rel="preload" href="/fonts/NotoSansArabic/NotoSansArabic-Bold.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
          </>
        )}
      </head>
      <body>
        <NextIntlClientProvider messages={messages}>
          <AnnouncementBar />
          <Navigation />
          <main>{children}</main>
          <Footer />
          <SpeedInsights />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
