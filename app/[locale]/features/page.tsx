import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';
import SaaSFeatures from '@/components/SaaSFeatures';

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'FeaturesPage' });

  return {
    title: t('title'),
    description: t('subtitle')
  };
}

export default async function FeaturesPage() {
  return (
    <div>
      <SaaSFeatures />
    </div>
  );
}


