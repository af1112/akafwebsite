'use client';

import { useTranslations } from 'next-intl';

export default function Features() {
  const t = useTranslations('HomePage.features');

  const features = [
    { key: 'fast', icon: '⚡' },
    { key: 'seo', icon: '🔍' },
    { key: 'responsive', icon: '📱' },
    { key: 'multilingual', icon: '🌐' }
  ];

  return (
    <section className="features">
      <div className="container">
        <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>
          {t('title')}
        </h2>
        <div className="features-grid">
          {features.map((feature) => (
            <div key={feature.key} className="feature-card">
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>
                {feature.icon}
              </div>
              <h3>{t(feature.key)}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

