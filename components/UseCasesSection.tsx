'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';

const useCases = [
  {
    key: 'restaurant',
    image: '/images/use-cases/restaurant.png'
  },
  {
    key: 'cafe',
    image: '/images/use-cases/cafe.png'
  }
] as const;

export default function UseCasesSection() {
  const t = useTranslations('UseCases');

  return (
    <section className="usecases-section">
      <div className="container">
        <div className="section-header">
          <p className="eyebrow">{t('subtitle')}</p>
          <h2>{t('title')}</h2>
        </div>
        <div className="usecases-grid">
          {useCases.map((item) => (
            <div key={item.key} className="usecase-card">
              <div className="usecase-image-wrapper">
                <Image
                  src={item.image}
                  alt={t(`items.${item.key}.title`)}
                  width={480}
                  height={320}
                  className="usecase-image"
                />
              </div>
              <h3 className="usecase-title">{t(`items.${item.key}.title`)}</h3>
              <p className="usecase-description">
                {t(`items.${item.key}.description`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

