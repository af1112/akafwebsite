'use client';

import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';

export default function AboutPage() {
  const t = useTranslations('CorporateAboutPage');
  const locale = useLocale();
  const capabilities = t.raw('capabilities') as string[];
  const capabilityIcons = [
    'M12 3v4M12 17v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M3 12h4M17 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6',
    'M4 7.5 12 3l8 4.5M4 7.5v9L12 21l8-4.5v-9M12 12l8-4.5M12 12 4 7.5M12 12v9',
    'M3 21h18M5 21V9l7-5 7 5v12M9 21v-5h6v5',
    'M4 19h16M7 15v-5M12 15V8M17 15v-3',
    'M9 18h6M10 22h4M12 2a7 7 0 0 0-4 12.75c.63.58 1 1.39 1 2.25h6c0-.86.37-1.67 1-2.25A7 7 0 0 0 12 2',
    'M9 11V8a3 3 0 0 1 6 0v3M6 11h12v9H6zM12 15v1',
    'M6 20h12M8 20v-5a4 4 0 0 1 8 0v5M12 10V3M12 10c-2 0-4 1.2-4 3s2 3 4 3 4-1.2 4-3-2-3-4-3',
    'M6 4h12v16H6zM9 8h6M9 12h6M9 16h4'
  ];

  return (
    <>
      <section className="about-hero">
        <div className="container">
          <h1 className="about-hero-title">{t('title')}</h1>
          <p className="contact-hero-subtitle">{t('subtitle')}</p>
        </div>
      </section>

      <section className="about-intro">
        <div className="container">
          <div className="section-header">
            <h2>{t('overviewTitle')}</h2>
            <p className="section-subtitle">{t('description')}</p>
          </div>
          <div className="akaf-page-hero-image akaf-page-inline-visual">
            <Image
              src="/images/hero/about-hero.webp"
              alt={t('title')}
              fill
              sizes="(max-width: 900px) 100vw, 70vw"
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
              <article key={capability} className="akaf-service-card">
                <div className="akaf-card-icon-wrap akaf-card-icon-wrap-about" aria-hidden="true">
                  <span className="akaf-card-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d={capabilityIcons[index] ?? 'M12 5v14M5 12h14'} />
                    </svg>
                  </span>
                </div>
                <p>{capability}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="akaf-section akaf-section-light">
        <div className="container">
          <div className="section-header">
            <h2>{t('internationalTitle')}</h2>
            <p className="section-subtitle">{t('internationalDescription')}</p>
          </div>
          <div className="akaf-two-col">
            <article className="akaf-info-card">
              <h3>{t('teamTitle')}</h3>
              <p>{t('teamDescription')}</p>
            </article>
            <article className="akaf-info-card">
              <h3>{t('deliveryTitle')}</h3>
              <p>{t('deliveryDescription')}</p>
            </article>
          </div>
          <p className="akaf-about-projects-note">
            {t('projectsPrompt')}{' '}
            <Link href={`/${locale}/projects`} className="akaf-about-projects-link">
              {t('projectsLinkLabel')}
            </Link>
            .
          </p>
        </div>
      </section>
    </>
  );
}
