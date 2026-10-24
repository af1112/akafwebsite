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
  const t = await getTranslations({ locale, namespace: 'WeighbridgePage' });

  return localizedMetadata(locale, '/products/weighbridge', t('title'), t('description'));
}

export default async function WeighbridgePage() {
  const t = await getTranslations('WeighbridgePage');
  const modules = t.raw('modules') as string[];
  const useCases = t.raw('useCases') as string[];

  return (
    <>
      <section className="akaf-page-hero akaf-division-hero akaf-division-hero-digital">
        <div className="container akaf-page-hero-grid">
          <div>
            <p className="akaf-division-kicker">{t('kicker')}</p>
            <h1>{t('headline')}</h1>
            <p className="akaf-division-tagline">{t('deployedStat')}</p>
            <p className="section-subtitle">{t('subheadline')}</p>
            <div className="hero-buttons akaf-hero-btn-row">
              <span className="akaf-status-badge akaf-status-deployed">{t('status')}</span>
              <Link href="/contact" className="btn btn-primary">{t('cta')}</Link>
            </div>
          </div>
          <div className="akaf-page-hero-image">
            <Image
              src="/images/products/weighbridge-ui.webp"
              alt={t('imageAlt')}
              fill
              sizes="(max-width: 900px) 100vw, 40vw"
              priority
            />
          </div>
        </div>
      </section>

      <section className="akaf-section">
        <div className="container akaf-two-col">
          <article>
            <div className="section-header akaf-align-start">
              <h2>{t('overviewTitle')}</h2>
            </div>
            <p className="akaf-body-text">{t('overview')}</p>
          </article>
          <figure className="akaf-screenshot-frame">
            <div className="akaf-screenshot-media">
              <Image
                src="/images/products/weighbridge-ui.webp"
                alt={t('imageAlt')}
                fill
                sizes="(max-width: 900px) 100vw, 50vw"
                className="akaf-screenshot-image"
              />
            </div>
            <figcaption>{t('imageCaption')}</figcaption>
          </figure>
        </div>
      </section>

      <section className="akaf-section akaf-section-light">
        <div className="container akaf-two-col">
          <article className="akaf-info-card">
            <h2>{t('modulesTitle')}</h2>
            <ul className="akaf-capability-list">
              {modules.map((mod) => <li key={mod}>{mod}</li>)}
            </ul>
          </article>
          <article className="akaf-info-card">
            <h2>{t('useCasesTitle')}</h2>
            <ul className="akaf-capability-list">
              {useCases.map((u) => <li key={u}>{u}</li>)}
            </ul>
          </article>
        </div>
      </section>

      <section className="akaf-section">
        <div className="container akaf-two-col">
          <article className="akaf-info-card">
            <h2>{t('deploymentTitle')}</h2>
            <p>{t('deployment')}</p>
          </article>
          <article className="akaf-info-card">
            <h2>{t('techTitle')}</h2>
            <p>{t('tech')}</p>
          </article>
        </div>
      </section>

      <section className="akaf-section akaf-section-light">
        <div className="container">
          <article className="akaf-connect-card">
            <div>
              <h2>{t('ctaTitle')}</h2>
              <p>{t('ctaDescription')}</p>
            </div>
            <Link href="/contact" className="btn btn-primary">{t('cta')}</Link>
          </article>
        </div>
      </section>
    </>
  );
}
