'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';

export default function ClientLogos() {
  const t = useTranslations('Clients');
  const brands = t.raw('brands') as string[];

  const logos = [
    '/images/clients/brand-1.png',
    '/images/clients/brand-2.png',
    '/images/clients/brand-3.png',
    '/images/clients/brand-4.png',
    '/images/clients/brand-5.png'
  ];

  return (
    <section className="clients-section">
      <div className="container">
        <p className="eyebrow">{t('subtitle')}</p>
        <h2>{t('title')}</h2>
        <div className="clients-logos">
          {logos.map((logo, index) => (
            <div key={logo} className="client-logo">
              <div className="client-logo-frame">
                <Image
                  src={logo}
                  alt={brands[index] || `Client ${index + 1}`}
                  fill
                  className="client-logo-image"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
