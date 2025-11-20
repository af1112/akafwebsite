import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import About from '@/components/About';

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'HomePage' });

  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: `/${locale}`,
      languages: {
        'en': '/en',
        'fa': '/fa',
        'ar': '/ar'
      }
    },
    openGraph: {
      title: t('title'),
      description: t('description'),
      locale: locale,
      alternateLocale: ['en', 'fa', 'ar']
    }
  };
}

export default async function HomePage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  return (
    <>
      <Hero />
      <Features />
      <About />
    </>
  );
}

