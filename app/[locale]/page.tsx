import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';
import SaaSHero from '@/components/SaaSHero';
import ClientLogos from '@/components/ClientLogos';
import SaaSFeatures from '@/components/SaaSFeatures';
import WorkflowSection from '@/components/WorkflowSection';
import DemoSection from '@/components/DemoSection';
import ServicesHighlights from '@/components/ServicesHighlights';
import PricingSection from '@/components/PricingSection';
import PlanComparison from '@/components/PlanComparison';
import Testimonials from '@/components/Testimonials';
import FAQSection from '@/components/FAQSection';
import BlogSection from '@/components/BlogSection';
import SupportSection from '@/components/SupportSection';
import SecuritySection from '@/components/SecuritySection';
import CTASection from '@/components/CTASection';
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
      <SaaSHero />
      <SaaSFeatures />
      <WorkflowSection />
      <ServicesHighlights />
      <DemoSection />
      <PricingSection />
      <PlanComparison />
      <Testimonials />
      <FAQSection />
      <BlogSection />
      <SupportSection />
      <SecuritySection />
      <ClientLogos />
      <CTASection />
      <About />
    </>
  );
}





