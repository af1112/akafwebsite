import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';
import Image from 'next/image';

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'CorporateServicesPage' });

  return {
    title: t('title'),
    description: t('description')
  };
}

export default async function ServicesPage() {
  const t = await getTranslations('CorporateServicesPage');
  const services = t.raw('items') as Array<{
    title: string;
    summary: string;
    scope: string;
    deliverables: string;
  }>;

  return (
    <>
      <section className="akaf-page-hero akaf-section-light">
        <div className="container akaf-page-hero-grid">
          <div>
            <h1>{t('title')}</h1>
            <p className="section-subtitle">{t('description')}</p>
            <div className="akaf-page-chip-row">
              {services.slice(0, 3).map((service) => (
                <span key={service.title} className="akaf-page-chip">{service.title}</span>
              ))}
            </div>
          </div>
          <div className="akaf-page-hero-image">
            <Image
              src="/images/hero/services-hero.png"
              alt={t('title')}
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
            <h2>{t('title')}</h2>
            <p className="section-subtitle">{t('description')}</p>
          </div>

          <div className="akaf-services-grid">
            {services.map((service, index) => (
              <article key={service.title} className="akaf-service-card akaf-service-card-detailed">
                <span className="akaf-service-index">{String(index + 1).padStart(2, '0')}</span>
                <h3>{service.title}</h3>
                <p>{service.summary}</p>
                <p><strong>{t('scopeLabel')}:</strong> {service.scope}</p>
                <p><strong>{t('deliverablesLabel')}:</strong> {service.deliverables}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

