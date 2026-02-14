'use client';

import { useTranslations } from 'next-intl';

export default function DemoSection() {
  const t = useTranslations('Demo');
  const videoUrl = t('videoUrl');

  let videoId = '';
  if (videoUrl.includes('youtu.be/')) {
    videoId = videoUrl.split('youtu.be/')[1].split(/[?&]/)[0];
  } else if (videoUrl.includes('watch?v=')) {
    videoId = videoUrl.split('watch?v=')[1].split('&')[0];
  } else if (videoUrl.includes('/embed/')) {
    videoId = videoUrl.split('/embed/')[1].split(/[?&]/)[0];
  }

  const embedUrl = videoId
    ? `https://www.youtube.com/embed/${videoId}`
    : videoUrl;
  const externalUrl = videoUrl;

  return (
    <section className="demo-section">
      <div className="container">
        <div className="demo-grid">
          <div className="demo-content">
            <p className="eyebrow">{t('subtitle')}</p>
            <h2>{t('title')}</h2>
            <a
              href={externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary btn-large"
            >
              {t('cta')}
            </a>
          </div>
          <div className="demo-video">
            <div className="video-wrapper">
              <iframe
                src={embedUrl}
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

