'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';

export default function ServicesHighlights() {
  const t = useTranslations('ServicesHighlights');
  const services = t.raw('items') as {
    key: string;
    icon: string;
  }[];

  const iconMap: Record<string, string> = {
    photoVideo: 'icon-photo-video.png',
    translation: 'icon-translation.png',
    consulting: 'icon-consulting.png',
    hardware: 'icon-hardware.png'
  };

  return (
    <section className="services-highlights">
      <div className="container">
        <div className="section-header">
          <h2>{t('title')}</h2>
          <p className="section-subtitle">{t('subtitle')}</p>
        </div>
        <div className="services-grid">
          {services.map((service) => (
            <div key={service.key} className="service-card">
              <div className="service-icon-wrapper">
                <Image
                  src={`/icons/${iconMap[service.key]}`}
                  alt={t(`itemsText.${service.key}.title`)}
                  width={56}
                  height={56}
                  className="service-icon"
                />
              </div>
              <h3>{t(`itemsText.${service.key}.title`)}</h3>
              <p>{t(`itemsText.${service.key}.description`)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
