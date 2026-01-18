'use client';

import { useTranslations } from 'next-intl';

export default function CTASection() {
  const t = useTranslations('ContactCTA');

  return (
    <section className="cta-section">
      <div className="container">
        <div className="cta-content">
          <h2>{t('title')}</h2>
          <p>{t('description')}</p>
          <div className="cta-buttons">
            <a
              href="https://wa.me/989124433347"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary btn-large"
            >
              {t('primary')}
            </a>
            <a href="tel:+96894063021" className="btn btn-secondary btn-large">
              {t('secondary')}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
