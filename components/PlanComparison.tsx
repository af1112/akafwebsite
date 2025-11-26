'use client';

import { useTranslations } from 'next-intl';

const plans = ['starter', 'professional', 'enterprise'] as const;
const rows = ['menuItems', 'languages', 'qrNfc', 'analytics', 'support', 'branding'] as const;

export default function PlanComparison() {
  const t = useTranslations('Comparison');
  const planT = useTranslations('PricingPage.plans');

  return (
    <section className="comparison-section">
      <div className="container">
        <div className="section-header">
          <p className="eyebrow">{t('subtitle')}</p>
          <h2>{t('title')}</h2>
        </div>
        <div className="comparison-table">
          <div className="comparison-header">
            <div className="comparison-cell" />
            {plans.map((plan) => (
              <div key={plan} className="comparison-cell comparison-plan">
                {planT(`${plan}.name`)}
              </div>
            ))}
          </div>
          {rows.map((row) => (
            <div key={row} className="comparison-row">
              <div className="comparison-cell comparison-label">
                {t(`rows.${row}.label`)}
              </div>
              {plans.map((plan) => (
                <div key={`${row}-${plan}`} className="comparison-cell">
                  {t(`rows.${row}.${plan}`)}
                </div>
              ))}
            </div>
          ))}
        </div>
        <p className="comparison-note">{t('disclaimer')}</p>
      </div>
    </section>
  );
}

