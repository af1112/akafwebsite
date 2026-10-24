import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';
import { localizedMetadata } from '@/lib/seo';
import AboutPage from '@/components/AboutPage';

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'CorporateAboutPage' });

  return localizedMetadata(locale, '/about', t('title'), t('description'));
}

export default async function AboutPageWrapper({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  return <AboutPage />;
}

