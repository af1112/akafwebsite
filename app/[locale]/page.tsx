import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';
import Image from 'next/image';
import { Link } from '@/routing';

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'CorporateHome' });

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

export default async function HomePage() {
  const t = await getTranslations('CorporateHome');
  const serviceIcons = [
    '/icons/icon-implementation.png',
    '/icons/icon-hardware.png',
    '/icons/icon-consulting.png',
    '/icons/icon-analytics.png',
    '/icons/icon-real-time.png',
    '/icons/icon-mobile.png',
    '/icons/icon-qr-code.png',
    '/icons/icon-account-manager.png'
  ];
  const projectIcons = [
    '/icons/icon-implementation.png',
    '/icons/icon-analytics.png',
    '/icons/icon-real-time.png'
  ];
  const services = t.raw('services.items') as string[];
  const projects = t.raw('projects.items') as Array<{
    name: string;
    sector: string;
    location: string;
    scope: string;
  }>;

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
              <Link href="/services" className="btn btn-primary">
                {t('ctaServices')}
              </Link>
              <Link href="/projects" className="btn btn-secondary">
                {t('ctaProjects')}
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
            <div className="akaf-highlight-box akaf-highlight-box-floating">
              <h3>{t('highlights.title')}</h3>
              <ul>
                <li>{t('highlights.item1')}</li>
                <li>{t('highlights.item2')}</li>
                <li>{t('highlights.item3')}</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="container akaf-trust-row">
          <span className="akaf-trust-item">{t('trust.item1')}</span>
          <span className="akaf-trust-item">{t('trust.item2')}</span>
          <span className="akaf-trust-item">{t('trust.item3')}</span>
        </div>
      </section>

      <section className="akaf-section">
        <div className="container">
          <div className="section-header">
            <h2>{t('services.title')}</h2>
            <p className="section-subtitle">{t('services.subtitle')}</p>
          </div>
          <div className="akaf-services-grid">
            {services.map((service, index) => (
              <article key={service} className="akaf-service-card akaf-home-service-card">
                <div className="akaf-card-icon-wrap" aria-hidden="true">
                  <Image
                    src={serviceIcons[index] ?? '/images/icons/service1.png'}
                    alt=""
                    width={36}
                    height={36}
                    className="akaf-card-icon"
                  />
                </div>
                <p>{service}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="akaf-section akaf-section-light">
        <div className="container">
          <div className="section-header">
            <h2 className="akaf-home-projects-title">{t('projects.title')}</h2>
            <p className="section-subtitle">{t('projects.subtitle')}</p>
          </div>
          <div className="akaf-projects-grid">
            {projects.map((project, index) => (
              <article key={project.name} className="akaf-project-card akaf-home-project-card">
                <div className="akaf-card-icon-wrap akaf-card-icon-wrap-project">
                  <Image
                    src={projectIcons[index % projectIcons.length]}
                    alt=""
                    width={34}
                    height={34}
                    className="akaf-card-icon"
                  />
                </div>
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
              {t('projects.cta')}
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
          <article className="akaf-info-card">
            <h2>{t('ai.title')}</h2>
            <p>{t('ai.description')}</p>
            <Link href="/ai-software" className="btn btn-outline">
              {t('ai.cta')}
            </Link>
          </article>
        </div>
      </section>

      <section className="akaf-section akaf-team-section">
        <div className="container">
          <div className="section-header">
            <h2>{t('team.title')}</h2>
            <p className="section-subtitle">{t('team.description')}</p>
          </div>
        </div>
      </section>
    </>
  );
}



