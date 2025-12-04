'use client';

import { useTranslations } from 'next-intl';

export default function AboutPage() {
  const t = useTranslations('AboutPage');

  const strengths = [
    {
      key: 'twoDecades',
      icon: '📅'
    },
    {
      key: 'latestTech',
      icon: '🚀'
    },
    {
      key: 'ambitious',
      icon: '🎯'
    },
    {
      key: 'ai',
      icon: '🤖'
    }
  ];

  const values = [
    {
      key: 'quality',
      icon: '⭐'
    },
    {
      key: 'innovation',
      icon: '💡'
    },
    {
      key: 'customerFocus',
      icon: '❤️'
    },
    {
      key: 'webDesign',
      icon: '💻'
    }
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="about-hero">
        <div className="container">
          <div className="breadcrumb">
            {t('breadcrumb')}
          </div>
          <h1 className="about-hero-title">{t('title')}</h1>
        </div>
      </section>

      {/* Intro Section */}
      <section className="about-intro">
        <div className="container">
          <div className="about-intro-content">
            <h2 className="section-title">{t('intro.title')}</h2>
            <div className="intro-text">
              <p>{t('intro.paragraph1')}</p>
              <p>{t('intro.paragraph2')}</p>
              <p>{t('intro.paragraph3')}</p>
              <p>{t('intro.paragraph4')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Strengths Section */}
      <section className="about-strengths">
        <div className="container">
          <h2 className="section-title">{t('strengths.title')}</h2>
          <div className="strengths-grid">
            {strengths.map((strength) => (
              <div key={strength.key} className="strength-card">
                <div className="strength-icon">{strength.icon}</div>
                <h3>{t(`strengths.${strength.key}.title`)}</h3>
                <p>{t(`strengths.${strength.key}.description`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="about-values">
        <div className="container">
          <h2 className="section-title">{t('values.title')}</h2>
          <div className="values-grid">
            {values.map((value) => (
              <div key={value.key} className="value-card">
                <div className="value-icon">{value.icon}</div>
                <h3>{t(`values.${value.key}.title`)}</h3>
                <p>{t(`values.${value.key}.description`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
