import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';
import ContactPage from '@/components/ContactPage';

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'ContactPage' });

  return {
    title: t('title'),
    description: t('description')
  };
}

export default async function ContactPageWrapper({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  return <ContactPage />;
}

