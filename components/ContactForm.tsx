'use client';

import { useTranslations } from 'next-intl';
import { useState, FormEvent, useEffect, useRef } from 'react';

declare global {
  interface Window {
    turnstile: {
      render: (element: HTMLElement, options: {
        sitekey: string;
        theme?: 'light' | 'dark' | 'auto';
        callback?: (token: string) => void;
        'error-callback'?: () => void;
      }) => string;
      reset: (widgetId: string) => void;
      remove: (widgetId: string) => void;
    };
  }
}

export default function ContactForm() {
  const t = useTranslations('ContactPage.form');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [turnstileToken, setTurnstileToken] = useState<string>('');
  const turnstileRef = useRef<HTMLDivElement>(null);
  const turnstileWidgetId = useRef<string | null>(null);

  // بارگذاری Cloudflare Turnstile
  useEffect(() => {
    // بارگذاری اسکریپت Turnstile
    if (typeof window !== 'undefined' && !window.turnstile) {
      const script = document.createElement('script');
      script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js';
      script.async = true;
      script.defer = true;
      script.onload = () => {
        const siteKey = process.env.NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY;
        if (siteKey && turnstileRef.current) {
          turnstileWidgetId.current = window.turnstile.render(turnstileRef.current, {
            sitekey: siteKey,
            theme: 'light',
            callback: (token: string) => {
              setTurnstileToken(token);
            },
            'error-callback': () => {
              setTurnstileToken('');
            },
          });
        }
      };
      document.body.appendChild(script);
    } else if (typeof window !== 'undefined' && window.turnstile) {
      // اگر اسکریپت از قبل بارگذاری شده
      const siteKey = process.env.NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY;
      if (siteKey && turnstileRef.current) {
        turnstileWidgetId.current = window.turnstile.render(turnstileRef.current, {
          sitekey: siteKey,
          theme: 'light',
          callback: (token: string) => {
            setTurnstileToken(token);
          },
          'error-callback': () => {
            setTurnstileToken('');
          },
        });
      }
    }
    
    return () => {
      if (turnstileWidgetId.current && typeof window !== 'undefined' && window.turnstile) {
        window.turnstile.remove(turnstileWidgetId.current);
      }
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // بررسی CAPTCHA
    const siteKey = process.env.NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY;
    if (siteKey && !turnstileToken) {
      setSubmitStatus('error');
      alert('Please complete the CAPTCHA verification');
      return;
    }
    
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          turnstileToken: turnstileToken,
        }),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: ''
        });
        setTurnstileToken('');
        // Reset CAPTCHA
        if (turnstileWidgetId.current && typeof window !== 'undefined' && window.turnstile) {
          window.turnstile.reset(turnstileWidgetId.current);
        }
        // Reset success message after 5 seconds
        setTimeout(() => setSubmitStatus('idle'), 5000);
      } else {
        setSubmitStatus('error');
        // Reset CAPTCHA on error
        if (turnstileWidgetId.current && typeof window !== 'undefined' && window.turnstile) {
          window.turnstile.reset(turnstileWidgetId.current);
        }
        setTurnstileToken('');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
      // Reset CAPTCHA on error
      if (turnstileWidgetId.current && typeof window !== 'undefined' && window.turnstile) {
        window.turnstile.reset(turnstileWidgetId.current);
      }
      setTurnstileToken('');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-form-wrapper">
      <div className="form-header">
        <h2 className="form-title">{t('title')}</h2>
        <p className="form-subtitle">{t('subtitle')}</p>
      </div>

      <form onSubmit={handleSubmit} className="contact-form">
        <div className="form-group">
          <label htmlFor="name" className="form-label">
            {t('name')} <span className="required">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder={t('namePlaceholder')}
            className="form-input"
            required
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              {t('email')} <span className="required">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder={t('emailPlaceholder')}
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone" className="form-label">
              {t('phone')}
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder={t('phonePlaceholder')}
              className="form-input"
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="subject" className="form-label">
            {t('subject')} <span className="required">*</span>
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            placeholder={t('subjectPlaceholder')}
            className="form-input"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="message" className="form-label">
            {t('message')} <span className="required">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder={t('messagePlaceholder')}
            className="form-textarea"
            rows={6}
            required
          />
        </div>

        {process.env.NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY && (
          <div className="form-group">
            <div ref={turnstileRef} className="turnstile-widget"></div>
          </div>
        )}

        {submitStatus === 'success' && (
          <div className="form-message form-success">
            <span className="success-icon">✓</span>
            {t('success')}
          </div>
        )}

        {submitStatus === 'error' && (
          <div className="form-message form-error">
            <span className="error-icon">✗</span>
            {t('error')}
          </div>
        )}

        <button
          type="submit"
          className="btn btn-primary form-submit-btn"
          disabled={isSubmitting}
        >
          {isSubmitting ? t('sending') : t('submit')}
        </button>
      </form>
    </div>
  );
}
