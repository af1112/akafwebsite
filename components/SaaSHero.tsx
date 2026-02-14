'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/routing';

export default function SaaSHero() {
  const t = useTranslations('HomePage');

  return (
    <section className="saas-hero">
      <div className="container">
        <div className="hero-content">
          <h1 className="hero-title">{t('title')}</h1>
          <p className="hero-subtitle">{t('subtitle')}</p>
          <p className="hero-description">{t('description')}</p>
          <div className="hero-buttons">
            <Link href="/pricing" className="btn btn-primary">
              {t('cta')}
            </Link>
            <a
              href="https://youtu.be/gb2ZtU2zKr0"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
            >
              {t('ctaSecondary')}
            </a>
          </div>
        </div>
        <div className="hero-image">
          <div className="hero-image-frame">
            <Image
              src="/images/hero/hero.png"
              alt={t('heroImageAlt')}
              fill
              className="hero-main-image"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
