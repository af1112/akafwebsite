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
  const t = await getTranslations({ locale, namespace: 'CorporateHome' });

  return localizedMetadata(locale, '', t('title'), t('description'));
}

export default async function HomePage() {
  const t = await getTranslations('CorporateHome');
  const products = t.raw('products.items') as Array<{
    name: string;
    sector: string;
    location: string;
    scope: string;
  }>;
  const proof = t.raw('proof') as Array<{ value: string; label: string }>;
  const leaders = [
    { name: t('leadership.ali.name'), role: t('leadership.ali.role'), summary: t('leadership.ali.summary') },
    { name: t('leadership.nawaz.name'), role: t('leadership.nawaz.role'), summary: t('leadership.nawaz.summary') }
  ];

  return (
    <>
      <section className="akaf-hero">
        <div className="container akaf-hero-grid">
          <div className="akaf-hero-content">
            <p className="akaf-eyebrow">{t('heroEyebrow')}</p>
            <h1>{t('title')}</h1>
            <p className="akaf-subtitle">{t('subtitle')}</p>
            <p className="akaf-description">{t('description')}</p>
            <div className="hero-buttons">
              <Link href="/digital" className="btn btn-primary">
                {t('divisions.digital.cta')}
              </Link>
              <Link href="/industrial" className="btn btn-secondary">
                {t('divisions.industrial.cta')}
              </Link>
            </div>
          </div>
          <div className="akaf-hero-visual-wrap">
            <div className="akaf-hero-image-frame">
              <Image
                src="/images/hero/industrial-hero.webp"
                alt={t('heroImageAlt')}
                fill
                className="akaf-hero-image"
                priority
              />
            </div>
          </div>
        </div>
        <div className="container akaf-trust-row">
          <span className="akaf-trust-item">{t('trust.item1')}</span>
          <span className="akaf-trust-item">{t('trust.item2')}</span>
          <span className="akaf-trust-item">{t('trust.item3')}</span>
        </div>
      </section>

      <section className="akaf-section" style={{ paddingTop: '1.5rem', paddingBottom: '1.5rem' }}>
        <div className="container">
          <div className="akaf-proof-bar">
            {proof.map((item) => (
              <div key={item.label} className="akaf-proof-item">
                <span className="akaf-proof-value">{item.value}</span>
                <span className="akaf-proof-label">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="akaf-section">
        <div className="container">
          <div className="section-header">
            <h2>{t('divisions.title')}</h2>
            <p className="section-subtitle">{t('divisions.subtitle')}</p>
          </div>
          <div className="akaf-divisions-grid">
            <Link href="/digital" className="akaf-division-card akaf-division-digital">
              <span className="akaf-division-badge">AKAF Digital</span>
              <h3>{t('divisions.digital.tagline')}</h3>
              <p>{t('divisions.digital.description')}</p>
              <span className="akaf-division-cta">{t('divisions.digital.cta')} →</span>
            </Link>
            <Link href="/industrial" className="akaf-division-card akaf-division-industrial">
              <span className="akaf-division-badge">AKAF Industrial</span>
              <h3>{t('divisions.industrial.tagline')}</h3>
              <p>{t('divisions.industrial.description')}</p>
              <span className="akaf-division-cta">{t('divisions.industrial.cta')} →</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="akaf-section akaf-section-light">
        <div className="container">
          <article className="akaf-connect-card">
            <div>
              <h2>{t('connect.title')}</h2>
              <p className="section-subtitle">{t('connect.subtitle')}</p>
              <p>{t('connect.description')}</p>
            </div>
            <Link href="/smart-industry" className="btn btn-primary">
              {t('connect.cta')}
            </Link>
          </article>
        </div>
      </section>

      <section className="akaf-section">
        <div className="container">
          <div className="section-header">
            <h2 className="akaf-home-projects-title">{t('products.title')}</h2>
            <p className="section-subtitle">{t('products.subtitle')}</p>
          </div>
          <div className="akaf-projects-grid">
            {products.map((project) => (
              <article key={project.name} className="akaf-project-card akaf-home-project-card">
                <h3>{project.name}</h3>
                <p>{project.scope}</p>
                <div className="akaf-project-meta">
                  <span>{project.sector}</span>
                  <span>{project.location}</span>
                </div>
              </article>
            ))}
          </div>
          <div className="akaf-center-cta">
            <Link href="/projects" className="btn btn-outline">
              {t('products.cta')}
            </Link>
          </div>
        </div>
      </section>

      <section className="akaf-section akaf-section-light">
        <div className="container">
          <div className="section-header">
            <h2>{t('leadership.title')}</h2>
            <p className="section-subtitle">{t('leadership.subtitle')}</p>
          </div>
          <div className="akaf-two-col">
            {leaders.map((leader) => (
              <article key={leader.name} className="akaf-info-card akaf-leader-card">
                <div className="akaf-leader-avatar" aria-hidden="true">
                  {leader.name.split(' ').map((n) => n[0]).slice(0, 2).join('')}
                </div>
                <h3>{leader.name}</h3>
                <p className="akaf-leader-role">{leader.role}</p>
                <p>{leader.summary}</p>
              </article>
            ))}
          </div>
          <div className="akaf-center-cta">
            <Link href="/about" className="btn btn-outline">
              {t('leadership.cta')}
            </Link>
          </div>
        </div>
      </section>

      <section className="akaf-section">
        <div className="container akaf-two-col">
          <article className="akaf-info-card">
            <h2>{t('partnerships.title')}</h2>
            <p>{t('partnerships.description')}</p>
            <Link href="/partnerships" className="btn btn-outline">
              {t('partnerships.cta')}
            </Link>
          </article>
          <article className="akaf-info-card akaf-contact-card">
            <h2>{t('contact.title')}</h2>
            <p>{t('contact.description')}</p>
            <Link href="/contact" className="btn btn-primary">
              {t('contact.cta')}
            </Link>
          </article>
        </div>
      </section>
    </>
  );
}
