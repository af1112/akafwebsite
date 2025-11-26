import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';
import PricingSection from '@/components/PricingSection';

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'PricingPage' });

  return {
    title: t('title'),
    description: t('subtitle')
  };
}

export default async function PricingPage() {
  return (
    <section style={{ padding: '2rem 0', minHeight: '80vh' }}>
      <div className="container">
        <PricingSection />
      </div>
    </section>
  );
}


