'use client';

import { useTranslations } from 'next-intl';
import { useSearchParams, useRouter } from 'next/navigation';
import { useState, Suspense } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import PayPalButton from '@/components/PayPalButton';

const PLAN_PRICING: Record<string, { monthly: number; yearly: number }> = {
  starter: { monthly: 19, yearly: 182 },
  professional: { monthly: 39, yearly: 374 },
  enterprise: { monthly: 89, yearly: 854 }
};

function PaymentContent() {
  const t = useTranslations('SignupPage.payment');
  const pricingT = useTranslations('PricingPage.plans');
  const signupT = useTranslations('SignupPage.form');
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, isAuthenticated } = useAuth();
  
  const plan = searchParams.get('plan') || 'starter';
  const billing = searchParams.get('billing') || 'monthly';
  
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<'trial' | 'thawani' | 'paypal' | null>(null);

  // Redirect if not authenticated
  if (!isAuthenticated) {
    router.push(`/signup?plan=${plan}&billing=${billing}`);
    return (
      <div className="container">
        <p>{signupT('redirecting') || 'Redirecting to signup...'}</p>
      </div>
    );
  }

  const amount = PLAN_PRICING[plan as keyof typeof PLAN_PRICING]?.[billing as 'monthly' | 'yearly'] ?? PLAN_PRICING.starter.monthly;

  const handleThawaniPayment = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('/api/payments/thawani', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          customerName: user?.name || '',
          customerEmail: user?.email || '',
          customerId: user?.email || '',
          plan,
          billing,
          amount
        })
      });

      const data = await response.json();
      
      if (!response.ok) {
        const errorMsg = data.message || data.debug || 'Unable to create payment session';
        console.error('Payment error:', {
          status: response.status,
          data: data
        });
        throw new Error(errorMsg);
      }

      if (!data.paymentUrl) {
        throw new Error('Payment URL not received from server');
      }

      window.location.href = data.paymentUrl;
    } catch (err: any) {
      console.error('Payment handler error:', err);
      setError(err.message || 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleFreeTrial = async () => {
    try {
      setLoading(true);
      setError(null);

      // ارسال نوتیفیکیشن Trial
      const notificationResponse = await fetch('/api/notifications/payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userName: user?.name || '',
          userEmail: user?.email || '',
        //  userPhone: user?.phone || '',
          restaurantName: user?.restaurantName || '',
          plan: plan,
          billingCycle: '14-Day Free Trial',
          amount: 0,
          paymentMethod: 'Free Trial',
          transactionId: `TRIAL-${Date.now()}`,
          isTrial: true
        }),
      });

      if (notificationResponse.ok) {
        console.log('✅ Trial notification sent');
      } else {
        console.warn('⚠️ Email notification failed, but continuing...');
      }

      // Redirect to success page
      router.push(`/success?type=trial&plan=${plan}`);
    } catch (err: any) {
      console.error('Trial activation error:', err);
      setError(err.message || 'Failed to start trial. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="payment-page">
      <div className="container">
        <div className="payment-container">
          <div className="payment-header">
            <h1>{t('title')}</h1>
            <p>{t('subtitle')}</p>
          </div>

          <div className="payment-form">
            <div className="payment-summary">
              <h3>Order Summary</h3>
              <div className="summary-item">
                <span className="summary-label">Plan:</span>
                <span className="summary-value">{pricingT(`${plan}.name`)}</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Billing:</span>
                <span className="summary-value">{billing === 'monthly' ? 'Monthly' : 'Yearly'}</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Customer:</span>
                <span className="summary-value">{user?.name}</span>
              </div>
              <div className="summary-item summary-total">
                <span className="summary-label">Total:</span>
                <span className="summary-value">${amount} {billing === 'monthly' ? '/mo' : '/yr'}</span>
              </div>
            </div>

            <div className="payment-options">
              <div 
                className={`payment-card payment-card-trial ${selectedPayment === 'trial' ? 'selected' : ''}`}
                onClick={() => setSelectedPayment('trial')}
              >
                <div className="trial-badge">🎁 FREE</div>
                <h4>🚀 Start 14-Day Free Trial</h4>
                <p className="payment-note">No credit card required. Full access to all {pricingT(`${plan}.name`)} features.</p>
                <ul className="trial-features">
                  <li>✓ Cancel anytime</li>
                  <li>✓ No payment required now</li>
                  <li>✓ Full feature access</li>
                </ul>
                <div className="payment-card-button">
                  <button
                    type="button"
                    className="btn btn-success btn-block"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleFreeTrial();
                    }}
                    disabled={loading}
                  >
                    {loading ? t('activating') : 'Start Free Trial'}
                  </button>
                </div>
              </div>

              <div 
                className={`payment-card ${selectedPayment === 'thawani' ? 'selected' : ''}`}
                onClick={() => setSelectedPayment('thawani')}
              >
                <h4>💳 Thawani (Visa/Mastercard)</h4>
                <p className="payment-note">Pay securely using your Thawani business account.</p>
                <div className="payment-card-button">
                  <button
                    type="button"
                    className="btn btn-primary-dark btn-block"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleThawaniPayment();
                    }}
                    disabled={loading}
                  >
                    {loading ? t('redirecting') : 'Pay with Thawani'}
                  </button>
                </div>
              </div>

              <div 
                className={`payment-card ${selectedPayment === 'paypal' ? 'selected' : ''}`}
                onClick={() => setSelectedPayment('paypal')}
              >
                <h4>💰 PayPal</h4>
                <p className="payment-note">Accepts PayPal balance and international cards.</p>
                <div className="payment-card-button paypal-button-wrapper">
                  <button
                    type="button"
                    className="btn btn-primary-dark btn-block"
                    onClick={(e) => {
                      e.stopPropagation();
                      // Trigger PayPal payment
                      const paypalButton = document.querySelector('.paypal-wrapper button');
                      if (paypalButton) {
                        (paypalButton as HTMLButtonElement).click();
                      }
                    }}
                    disabled={loading}
                  >
                    {loading ? t('processing') : 'Pay with PayPal'}
                  </button>
                  <div style={{ display: 'none' }}>
                    <PayPalButton
                      amount={amount.toString()}
                      description={`${plan} plan - ${billing}`}
                      onSuccess={async () => {
                        // Send payment notification
                        try {
                          await fetch('/api/notifications/payment', {
                            method: 'POST',
                            headers: {
                              'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                              userName: user?.name || '',
                              userEmail: user?.email || '',
                              userPhone: user?.phone || '',
                              restaurantName: user?.restaurantName || '',
                              plan: plan,
                              billingCycle: billing,
                              amount: amount,
                              paymentMethod: 'PayPal',
                              transactionId: `PAYPAL-${Date.now()}`,
                              isTrial: false
                            }),
                          });
                        } catch (error) {
                          console.error('Failed to send payment notification:', error);
                        }
                        router.push(`/success?type=payment&plan=${plan}`);
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="payment-security">
              <span className="security-icon">🔒</span>
              <span>{t('secure')}</span>
            </div>

            {error && (
              <div className="error-message">
                <p>{error}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function PaymentPage() {
  return (
    <Suspense fallback={<div className="container"><p>Loading payment...</p></div>}>
      <PaymentContent />
    </Suspense>
  );
}




