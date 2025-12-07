'use client';

import { useTranslations } from 'next-intl';
import { useSearchParams, useRouter } from 'next/navigation';
import { Suspense } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Link } from '@/routing';

function SuccessContent() {
  const t = useTranslations('SuccessPage');
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, isAuthenticated } = useAuth();
  
  const plan = searchParams.get('plan') || 'starter';
  const type = searchParams.get('type') || 'trial'; // trial, payment, thawani, paypal
  
  // Redirect if not authenticated
  if (!isAuthenticated) {
    router.push('/');
    return null;
  }

  const getMessage = () => {
    switch (type) {
      case 'trial':
        return {
          icon: '🎉',
          title: t('trial.title'),
          subtitle: t('trial.subtitle'),
          message: t('trial.message', { plan: plan.toUpperCase() }),
          details: t.raw('trial.details') as string[]
        };
      case 'payment':
      case 'thawani':
      case 'paypal':
        return {
          icon: '✅',
          title: t('payment.title'),
          subtitle: t('payment.subtitle', { plan: plan.toUpperCase() }),
          message: t('payment.message'),
          details: t.raw('payment.details') as string[]
        };
      default:
        return {
          icon: '✅',
          title: t('default.title'),
          subtitle: '',
          message: t('default.message'),
          details: []
        };
    }
  };

  const content = getMessage();

  return (
    <section className="success-page">
      <div className="container">
        <div className="success-container">
          <div className="success-icon">{content.icon}</div>
          
          <h1 className="success-title">
            {content.title}
          </h1>
          
          {content.subtitle && (
            <p className="success-subtitle">
              {content.subtitle}
            </p>
          )}

          <div className="success-user-info">
            <p>👤 {user?.name}</p>
            <p>📧 {user?.email}</p>
          </div>

          <div className="success-message">
            <p>{content.message}</p>
          </div>

          {content.details.length > 0 && (
            <ul className="success-details">
              {content.details.map((detail, index) => (
                <li key={index}>{detail}</li>
              ))}
            </ul>
          )}

          <div className="success-contact">
            <h3>{t('needHelp')}</h3>
            <div className="contact-methods">
              <a href="mailto:info@akafco.com">
                📧 info@akafco.com
              </a>
              <a href="https://wa.me/989124433347" target="_blank" rel="noopener noreferrer">
                💬 WhatsApp: +989124433347
              </a>
              <a href="tel:+981732204298">
                ☎️ +981732204298
              </a>
            </div>
          </div>

          <div className="success-actions">
            <Link href="/" className="btn btn-primary">
              {t('backToHome')}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<div className="container"><p>Loading...</p></div>}>
      <SuccessContent />
    </Suspense>
  );
}


