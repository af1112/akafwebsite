'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';

export default function SupportSection() {
  const t = useTranslations('Support');
  const items = t.raw('items') as { title: string; description: string; icon: string }[];

  return (
    <section className="support-section">
      <div className="container">
        <div className="section-header">
          <p className="eyebrow">{t('subtitle')}</p>
          <h2>{t('title')}</h2>
        </div>
        <div className="support-grid">
          {items.map((item, index) => {
            const iconMap = [
              'icon-whatsapp.png',
              'icon-implementation.png',
              'icon-account-manager.png'
            ];
            return (
              <div key={item.title} className="support-card">
                <div className="support-icon-wrapper">
                  <Image
                    src={`/icons/${iconMap[index]}`}
                    alt={item.title}
                    width={48}
                    height={48}
                    className="support-icon"
                  />
                </div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
