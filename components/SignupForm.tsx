'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import PayPalButton from './PayPalButton';

const PLAN_PRICING: Record<string, number> = {
  starter: 29,
  professional: 79,
  enterprise: 199
};

const defaultFormState = {
  name: '',
  email: '',
  phone: '',
  restaurantName: '',
  plan: 'starter',
  password: '',
  confirmPassword: '',
  agree: false
};

type SignupFormValues = typeof defaultFormState;

export default function SignupForm() {
  const t = useTranslations('SignupPage.form');
  const router = useRouter();
  const searchParams = useSearchParams();
  const { signup } = useAuth();
  const selectedPlan = searchParams.get('plan') || 'starter';
  const billing = searchParams.get('billing') || 'monthly';

  const [formData, setFormData] = useState<SignupFormValues>({
    ...defaultFormState,
    plan: selectedPlan
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [step, setStep] = useState<'signup' | 'payment'>('signup');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    if (!formData.restaurantName.trim()) newErrors.restaurantName = 'Restaurant name is required';
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    if (!formData.agree) newErrors.agree = 'You must agree to the terms';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // Register user
      const success = await signup(formData);
      if (success) {
        // Redirect to payment page with plan info
        const billingParam = billing ? `&billing=${billing}` : '';
        router.push(`/payment?plan=${formData.plan}${billingParam}`);
      } else {
        setErrors({ general: 'Failed to create account. Please try again.' });
      }
    }
  };

  if (step === 'payment') {
    return <PaymentForm formData={formData} />;
  }

  return (
    <form onSubmit={handleSubmit} className="signup-form">
      <div className="form-group">
        <label htmlFor="name">{t('name')}</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={errors.name ? 'error' : ''}
          required
        />
        {errors.name && <span className="error-message">{errors.name}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="email">{t('email')}</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={errors.email ? 'error' : ''}
          required
        />
        {errors.email && <span className="error-message">{errors.email}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="phone">{t('phone')}</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className={errors.phone ? 'error' : ''}
          required
        />
        {errors.phone && <span className="error-message">{errors.phone}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="restaurantName">{t('restaurantName')}</label>
        <input
          type="text"
          id="restaurantName"
          name="restaurantName"
          value={formData.restaurantName}
          onChange={handleChange}
          className={errors.restaurantName ? 'error' : ''}
          required
        />
        {errors.restaurantName && <span className="error-message">{errors.restaurantName}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="plan">{t('plan')}</label>
        <select
          id="plan"
          name="plan"
          value={formData.plan}
          onChange={handleChange}
          required
        >
          <option value="starter">Starter - $29/mo</option>
          <option value="professional">Professional - $79/mo</option>
          <option value="enterprise">Enterprise - $199/mo</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="password">{t('password')}</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className={errors.password ? 'error' : ''}
          required
        />
        {errors.password && <span className="error-message">{errors.password}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="confirmPassword">{t('confirmPassword')}</label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          className={errors.confirmPassword ? 'error' : ''}
          required
        />
        {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
      </div>

      <div className="form-group checkbox-group">
        <label>
          <input
            type="checkbox"
            name="agree"
            checked={formData.agree}
            onChange={handleChange}
            required
          />
          <span>{t('agree')}</span>
        </label>
        {errors.agree && <span className="error-message">{errors.agree}</span>}
      </div>

      <button type="submit" className="btn btn-primary btn-block">
        {t('submit')}
      </button>

      <p className="form-footer">
        {t('alreadyHaveAccount')} <a href="/login">{t('login')}</a>
      </p>
    </form>
  );
}

function PaymentForm({ formData }: { formData: SignupFormValues }) {
  const t = useTranslations('SignupPage.payment');
  const pricingT = useTranslations('PricingPage.plans');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const amount = PLAN_PRICING[formData.plan] ?? PLAN_PRICING.starter;

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
          customerName: formData.name,
          customerEmail: formData.email,
          customerId: formData.email,
          plan: formData.plan,
          amount
        })
      });

      const data = await response.json();
      if (!response.ok) {
        // نمایش پیغام خطای دقیق‌تر
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

  return (
    <div className="payment-form">
      <h3>{t('title')}</h3>
      <p className="payment-subtitle">{t('subtitle')}</p>

      <div className="payment-summary">
        <p className="summary-plan">
          {pricingT(`${formData.plan}.name`)} – ${amount} / mo
        </p>
        <p className="summary-detail">{formData.restaurantName || formData.name}</p>
      </div>

      <div className="payment-options">
        <div className="payment-card">
          <h4>Thawani (Visa/Mastercard)</h4>
          <p className="payment-note">Pay securely using your Thawani business account.</p>
          <button
            type="button"
            className="btn btn-primary btn-block"
            onClick={handleThawaniPayment}
            disabled={loading}
          >
            {loading ? 'Redirecting…' : 'Pay with Thawani'}
          </button>
        </div>

        <div className="payment-card">
          <h4>PayPal</h4>
          <p className="payment-note">Accepts PayPal balance and international cards.</p>
          <PayPalButton
            amount={amount.toString()}
            description={`${formData.plan} plan`}
            onSuccess={() => alert('Payment successful!')}
          />
        </div>
      </div>

      <div className="payment-security">
        <span className="security-icon">🔒</span>
        <span>{t('secure')}</span>
      </div>

      {error && <p className="error-message">{error}</p>}
    </div>
  );
}

