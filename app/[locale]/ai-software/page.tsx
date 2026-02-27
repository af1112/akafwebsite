import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';
import Image from 'next/image';
import SaaSHero from '@/components/SaaSHero';
import SaaSFeatures from '@/components/SaaSFeatures';
import WorkflowSection from '@/components/WorkflowSection';
import ServicesHighlights from '@/components/ServicesHighlights';
import DemoSection from '@/components/DemoSection';
import UseCasesSection from '@/components/UseCasesSection';
import Testimonials from '@/components/Testimonials';
import FAQSection from '@/components/FAQSection';
import BlogSection from '@/components/BlogSection';
import SupportSection from '@/components/SupportSection';
import SecuritySection from '@/components/SecuritySection';
import ClientLogos from '@/components/ClientLogos';
import CTASection from '@/components/CTASection';

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'AISoftwarePage' });

  return {
    title: t('title'),
    description: t('description')
  };
}

export default async function AISoftwarePage() {
  const t = await getTranslations('AISoftwarePage');

  return (
    <>
      <section className="akaf-section ai-header-section">
        <div className="container akaf-page-hero-grid">
          <div className="section-header">
            <h1>{t('headline')}</h1>
          </div>
          <div className="akaf-page-hero-image">
            <Image
              src="/images/hero/ai-software-hero.webp"
              alt={t('headline')}
              fill
              sizes="(max-width: 900px) 100vw, 40vw"
              priority
            />
          </div>
        </div>
      </section>
      <SaaSHero />
      <SaaSFeatures />
      <WorkflowSection />
      <ServicesHighlights />
      <DemoSection />
      <UseCasesSection />
      <Testimonials />
      <FAQSection />
      <BlogSection />
      <SupportSection />
      <SecuritySection />
      <ClientLogos />
      <CTASection />
    </>
  );
}
