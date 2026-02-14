'use client';

import { useTranslations } from 'next-intl';

export default function SecuritySection() {
  const t = useTranslations('Security');
  const points = t.raw('points') as string[];

  return (
    <section className="security-section">
      <div className="container">
        <div className="security-grid">
          <div>
            <p className="eyebrow">{t('subtitle')}</p>
            <h2>{t('title')}</h2>
          </div>
          <ul>
            {points.map((point) => (
              <li key={point}>
                <span className="check-icon">✓</span>
                {point}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}


