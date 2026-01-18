'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';

const stepKeys = ['createMenu', 'generateQR', 'customerOrder', 'trackGrowth'] as const;

export default function WorkflowSection() {
  const t = useTranslations('Workflow');

  return (
    <section className="workflow-section">
      <div className="container">
        <div className="section-header">
          <p className="eyebrow">{t('subtitle')}</p>
          <h2>{t('title')}</h2>
        </div>
        <div className="workflow-illustration">
          <Image
            src="/images/homepage/scroll.png"
            alt={t('scrollImageAlt')}
            width={640}
            height={400}
            className="workflow-image"
          />
        </div>
        <div className="workflow-grid">
          {stepKeys.map((step, index) => (
            <div key={step} className="workflow-card">
              <div className="workflow-number">{index + 1}</div>
              <h3>{t(`steps.${step}.title`)}</h3>
              <p>{t(`steps.${step}.description`)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


