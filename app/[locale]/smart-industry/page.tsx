import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';
import { localizedMetadata } from '@/lib/seo';
import Image from 'next/image';
import { Link } from '@/routing';

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'SmartIndustryPage' });

  return localizedMetadata(locale, '/smart-industry', t('title'), t('description'));
}

export default async function SmartIndustryPage() {
  const t = await getTranslations('SmartIndustryPage');
  const capabilities = t.raw('capabilities') as string[];
  const steps = t.raw('steps') as Array<{ title: string; description: string }>;
  const audience = t.raw('audience') as string[];

  return (
    <>
      <section className="akaf-page-hero akaf-division-hero akaf-division-hero-smart">
        <div className="container akaf-page-hero-grid">
          <div>
            <p className="akaf-division-kicker">AKAF</p>
            <h1>{t('headline')}</h1>
            <p className="akaf-division-tagline">{t('tagline')}</p>
            <p className="section-subtitle">{t('intro')}</p>
          </div>
          <div className="akaf-page-hero-image">
            <Image
              src="/images/hero/services-hero.webp"
              alt={t('headline')}
              fill
              sizes="(max-width: 900px) 100vw, 40vw"
              priority
            />
          </div>
        </div>
      </section>

      <section className="akaf-section">
        <div className="container">
          <div className="section-header">
            <h2>{t('capabilitiesTitle')}</h2>
          </div>
          <ul className="akaf-capability-list akaf-capability-grid">
            {capabilities.map((capability) => (
              <li key={capability}>{capability}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="akaf-section akaf-section-light">
        <div className="container">
          <div className="section-header">
            <h2>{t('exampleTitle')}</h2>
            <p className="section-subtitle">{t('exampleSubtitle')}</p>
          </div>
          <ol className="akaf-smart-steps">
            {steps.map((step, index) => (
              <li key={step.title} className="akaf-smart-step">
                <span className="akaf-smart-step-number">{index + 1}</span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="akaf-section">
        <div className="container akaf-two-col">
          <article className="akaf-info-card">
            <h2>{t('scopeTitle')}</h2>
            <p>{t('scopeDescription')}</p>
          </article>
          <article className="akaf-info-card">
            <h2>{t('audienceTitle')}</h2>
            <ul className="akaf-inline-list">
              {audience.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        </div>
        <div className="akaf-center-cta">
          <Link href="/contact" className="btn btn-primary">
            {t('cta')}
          </Link>
        </div>
      </section>
    </>
  );
}
