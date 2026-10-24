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
  const t = await getTranslations({ locale, namespace: 'DigitalPage' });

  return localizedMetadata(locale, '/digital', t('title'), t('description'));
}

const STATUS_CLASS: Record<string, string> = {
  deployed: 'akaf-status-deployed',
  inDevelopment: 'akaf-status-dev',
  prototype: 'akaf-status-prototype'
};

export default async function DigitalPage() {
  const t = await getTranslations('DigitalPage');
  const audience = t.raw('audience') as string[];
  const products = t.raw('products') as Array<{
    name: string;
    displayTitle?: string;
    status: string;
    tagline: string;
    description: string;
    cta: string;
    href: string;
  }>;
  const services = t.raw('servicesGroups') as Array<{ title: string; description: string }>;
  const statusLabels = t.raw('statusLabels') as Record<string, string>;

  return (
    <>
      <section className="akaf-page-hero akaf-division-hero akaf-division-hero-digital">
        <div className="container akaf-page-hero-grid">
          <div>
            <p className="akaf-division-kicker">AKAF</p>
            <h1>{t('headline')}</h1>
            <p className="akaf-division-tagline">{t('tagline')}</p>
            <p className="section-subtitle">{t('intro')}</p>
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

      <section className="akaf-section">
        <div className="container">
          <div className="section-header">
            <h2>{t('productsTitle')}</h2>
            <p className="section-subtitle">{t('productsSubtitle')}</p>
          </div>
          <div className="akaf-products-grid">
            {products.map((product) => (
              <article key={product.name} className="akaf-product-card">
                <div className="akaf-product-head">
                  <h3>{product.displayTitle ?? product.name}</h3>
                  <span className={`akaf-status-badge ${STATUS_CLASS[product.status] ?? ''}`}>
                    {statusLabels[product.status] ?? product.status}
                  </span>
                </div>
                <p className="akaf-product-tagline">{product.tagline}</p>
                <p>{product.description}</p>
                <Link href={product.href} className="btn btn-outline btn-small">
                  {product.cta}
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="akaf-section akaf-section-light">
        <div className="container">
          <div className="section-header">
            <h2>{t('servicesTitle')}</h2>
            <p className="section-subtitle">{t('servicesSubtitle')}</p>
          </div>
          <div className="akaf-services-grid">
            {services.map((service) => (
              <article key={service.title} className="akaf-service-card akaf-service-card-detailed">
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="akaf-section">
        <div className="container akaf-two-col">
          <article className="akaf-info-card">
            <h2>{t('audienceTitle')}</h2>
            <ul className="akaf-inline-list">
              {audience.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
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
