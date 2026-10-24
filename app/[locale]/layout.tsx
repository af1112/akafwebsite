import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/routing';
import { ReactNode, Suspense } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import AnnouncementBar from '@/components/AnnouncementBar';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ClientLayout from '@/components/ClientLayout';
import RouteProgressBar from '@/components/RouteProgressBar';
import ChatWidget from '@/components/ChatWidget';
import { siteUrl } from '@/lib/seo';
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
  return { metadataBase: new URL(siteUrl) };
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
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@graph': [{ '@type': 'Organization', '@id': `${siteUrl}/#organization`, name: 'AKAF', legalName: 'AKAF Investment & Integrated Projects LLC', url: siteUrl }, { '@type': 'WebSite', '@id': `${siteUrl}/#website`, url: siteUrl, name: 'AKAF', inLanguage: ['en', 'fa', 'ar'], publisher: { '@id': `${siteUrl}/#organization` } }] }).replace(/</g, '\\u003c') }} />
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
          <ClientLayout>
            <Suspense fallback={null}>
              <RouteProgressBar />
            </Suspense>
            <AnnouncementBar />
            <Navigation />
            <main>{children}</main>
            <Footer />
            <ChatWidget />
            <Analytics />
            <SpeedInsights />
          </ClientLayout>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
