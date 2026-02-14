'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/routing';

export default function Hero() {
  const t = useTranslations('HomePage');

  return (
    <section className="hero">
      <div className="container">
        <h1>{t('title')}</h1>
        <p>{t('description')}</p>
        <Link href="/contact" className="cta-button">
          {t('cta')}
        </Link>
      </div>
    </section>
  );
}


