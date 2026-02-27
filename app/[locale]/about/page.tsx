import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';
import AboutPage from '@/components/AboutPage';

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'CorporateAboutPage' });

  return {
    title: t('title'),
    description: t('description')
  };
}

export default async function AboutPageWrapper({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  return <AboutPage />;
}

