import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';
import Image from 'next/image';
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
  const t = await getTranslations('PricingPage');

  return (
    <>
      <section className="akaf-page-hero akaf-section-light">
        <div className="container akaf-page-hero-grid">
          <div>
            <h1>{t('title')}</h1>
            <p className="section-subtitle">{t('subtitle')}</p>
          </div>
          <div className="akaf-page-hero-image">
            <Image
              src="/images/hero/pricing-hero.png"
              alt={t('title')}
              fill
              sizes="(max-width: 900px) 100vw, 40vw"
              priority
            />
          </div>
        </div>
      </section>
      <section style={{ padding: '2rem 0', minHeight: '80vh' }}>
        <div className="container">
          <PricingSection />
        </div>
      </section>
    </>
  );
}


