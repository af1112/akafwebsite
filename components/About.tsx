'use client';

import { useTranslations } from 'next-intl';

export default function About() {
  const t = useTranslations('HomePage.about');

  return (
    <section className="about">
      <div className="container">
        <div className="about-content">
          <h2>{t('title')}</h2>
          <p>{t('description')}</p>
        </div>
      </div>
    </section>
  );
}


