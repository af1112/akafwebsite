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
  const t = await getTranslations({ locale, namespace: 'IndustrialPage' });

  return localizedMetadata(locale, '/industrial', t('title'), t('description'));
}

export default async function IndustrialPage() {
  const t = await getTranslations('IndustrialPage');
  const capabilities = t.raw('capabilities') as Array<{
    title: string;
    description: string;
  }>;
  const sectors = t.raw('sectors') as string[];
  const process = t.raw('process') as string[];

  return (
    <>
      <section className="akaf-page-hero akaf-division-hero akaf-division-hero-industrial">
        <div className="container akaf-page-hero-grid">
          <div>
            <p className="akaf-division-kicker">AKAF</p>
            <h1>{t('headline')}</h1>
            <p className="akaf-division-tagline">{t('tagline')}</p>
            <p className="section-subtitle">{t('intro')}</p>
          </div>
          <div className="akaf-page-hero-image">
            <Image
              src="/images/hero/industrial-hero.webp"
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
          <div className="akaf-services-grid">
            {capabilities.map((capability, index) => (
              <article key={capability.title} className="akaf-service-card akaf-service-card-detailed">
                <span className="akaf-service-index">{String(index + 1).padStart(2, '0')}</span>
                <h3>{capability.title}</h3>
                <p>{capability.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="akaf-section akaf-section-light">
        <div className="container">
          <div className="section-header">
            <h2>{t('processTitle')}</h2>
            <p className="section-subtitle">{t('processSubtitle')}</p>
          </div>
          <div className="akaf-process-row">
            {process.map((step) => (
              <div key={step} className="akaf-process-step">{step}</div>
            ))}
          </div>
        </div>
      </section>

      <section className="akaf-section">
        <div className="container">
          <div className="section-header">
            <h2>{t('sectorsTitle')}</h2>
            <p className="section-subtitle">{t('sectorsSubtitle')}</p>
          </div>
          <div className="akaf-page-chip-row">
            {sectors.map((sector) => (
              <span key={sector} className="akaf-page-chip">{sector}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="akaf-section">
        <div className="container">
          <article className="akaf-info-card akaf-smart-cta">
            <h2>{t('smartCta.title')}</h2>
            <p>{t('smartCta.description')}</p>
            <Link href="/smart-industry" className="btn btn-outline">
              {t('smartCta.cta')}
            </Link>
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
