'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/routing';

export default function CTASection() {
  const t = useTranslations('ContactCTA');

  return (
    <section className="cta-section">
      <div className="container">
        <div className="cta-content">
          <h2>{t('title')}</h2>
          <p>{t('description')}</p>
          <div className="cta-buttons">
            <Link href="/signup" className="btn btn-primary btn-large">
              {t('primary')}
            </Link>
            <Link href="/contact" className="btn btn-secondary btn-large">
              {t('secondary')}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

