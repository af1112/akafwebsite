'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/routing';

export default function DemoSection() {
  const t = useTranslations('Demo');

  return (
    <section className="demo-section">
      <div className="container">
        <div className="demo-grid">
          <div className="demo-content">
            <p className="eyebrow">{t('subtitle')}</p>
            <h2>{t('title')}</h2>
            <Link href="/contact" className="btn btn-primary btn-large">
              {t('cta')}
            </Link>
          </div>
          <div className="demo-video">
            <div className="video-wrapper">
              <iframe
                src={t('videoUrl')}
                title="Product demo"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


