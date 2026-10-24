import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';
import { localizedMetadata } from '@/lib/seo';
import ContactPage from '@/components/ContactPage';

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'ContactPage' });

  return localizedMetadata(locale, '/contact', t('title'), t('description'));
}

export default async function ContactPageWrapper({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  return <ContactPage />;
}

