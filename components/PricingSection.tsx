'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/routing';
import { useState } from 'react';

export default function PricingSection() {
  const t = useTranslations('PricingPage');
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  const plans = ['starter', 'professional', 'enterprise'] as const;

  return (
    <section className="pricing-section">
      <div className="container">
        <div className="section-header">
          <h2>{t('title')}</h2>
          <p className="section-subtitle">{t('subtitle')}</p>
        </div>

        <div className="billing-toggle">
          <button
            className={billingCycle === 'monthly' ? 'active' : ''}
            onClick={() => setBillingCycle('monthly')}
          >
            {t('monthly')}
          </button>
          <button
            className={billingCycle === 'yearly' ? 'active' : ''}
            onClick={() => setBillingCycle('yearly')}
          >
            {t('yearly')}
            <span className="save-badge">{t('save')} 20%</span>
          </button>
        </div>

        <div className="pricing-grid">
          {plans.map((planKey) => {
            const plan = t.raw(`plans.${planKey}`);
            const isPopular = planKey === 'professional';
            // Convert Persian/Arabic numbers to English
            const priceStr = plan.price.toString().replace(/[۰-۹]/g, (d: string) => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d).toString());
            const monthlyPrice = parseInt(priceStr) || parseInt(plan.price.toString().replace(/[^\d]/g, ''));
            const yearlyPrice = Math.round(monthlyPrice * 12 * 0.8);
            const price = billingCycle === 'monthly' ? monthlyPrice : yearlyPrice;
            const period = billingCycle === 'monthly' ? '/mo' : '/yr';

            return (
              <div key={planKey} className={`pricing-card ${isPopular ? 'popular' : ''}`}>
                {isPopular && <div className="popular-badge">{t('popular')}</div>}
                <div className="plan-header">
                  <h3>{plan.name}</h3>
                  <p className="plan-description">{plan.description}</p>
                  <div className="plan-price">
                    <span className="currency">$</span>
                    <span className="amount">{price}</span>
                    <span className="period">{period}</span>
                  </div>
                </div>
                <ul className="plan-features">
                  {plan.features.map((feature: string, index: number) => (
                    <li key={index}>
                      <span className="check-icon">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link
                  href={`/pricing?plan=${planKey}`}
                  className={`btn ${isPopular ? 'btn-primary' : 'btn-outline'}`}
                >
                  {t('getStarted')}
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}


