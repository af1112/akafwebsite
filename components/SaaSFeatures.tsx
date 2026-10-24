'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';

export default function SaaSFeatures({ headingAs: Heading = 'h2' }: { headingAs?: 'h1' | 'h2' }) {
  const t = useTranslations('HomePage.features');
  const CardHeading = Heading === 'h1' ? 'h2' : 'h3';

  const features = [
    {
      key: 'easySetup',
      icon: 'icon-easy-setup.png'
    },
    {
      key: 'multilingual',
      icon: 'icon-multilingual.png'
    },
    {
      key: 'qrCode',
      icon: 'icon-qr-code.png'
    },
    {
      key: 'realTime',
      icon: 'icon-real-time.png'
    },
    {
      key: 'analytics',
      icon: 'icon-analytics.png'
    },
    {
      key: 'mobileFriendly',
      icon: 'icon-mobile.png'
    }
  ];

  return (
    <section className="saas-features">
      <div className="container">
        <div className="section-header">
          <Heading>{t('title')}</Heading>
          <p className="section-subtitle">{t('subtitle')}</p>
        </div>
        <div className="features-grid">
          {features.map((feature) => (
            <div key={feature.key} className="feature-card">
              <div className="feature-icon-wrapper">
                <Image
                  src={`/icons/${feature.icon}`}
                  alt={t(`${feature.key}.title`)}
                  width={64}
                  height={64}
                  className="feature-icon"
                />
              </div>
              <CardHeading>{t(`${feature.key}.title`)}</CardHeading>
              <p>{t(`${feature.key}.description`)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}








