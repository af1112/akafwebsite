import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';
import { localizedMetadata } from '@/lib/seo';
import SaaSFeatures from '@/components/SaaSFeatures';

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'FeaturesPage' });

  return localizedMetadata(locale, '/features', t('title'), t('subtitle'));
}

export default async function FeaturesPage() {
  return (
    <div>
      <SaaSFeatures headingAs="h1" />
    </div>
  );
}


