'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { Link, useRouter } from '@/routing';
import { useAuth } from '@/contexts/AuthContext';
import { useSearchParams } from 'next/navigation';

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuth();
  
  const redirectTo = searchParams.get('redirect') || '/';
  const plan = searchParams.get('plan');
  const billing = searchParams.get('billing');
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    try {
      const success = await login(formData.email, formData.password);
      
      if (success) {
        // Redirect based on context
        if (plan) {
          // Coming from pricing page, go to payment
          const billingParam = billing ? `&billing=${billing}` : '';
          router.push(`/payment?plan=${plan}${billingParam}`);
        } else {
          // Regular login, go to redirect destination
          router.push(redirectTo);
        }
      } else {
        setErrors({ general: 'Invalid email or password' });
      }
    } catch (error) {
      setErrors({ general: 'An error occurred. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">
      {errors.general && (
        <div className="error-message mb-4">
          {errors.general}
        </div>
      )}
      
      <div className="form-group">
        <label htmlFor="email">Email Address</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          placeholder="your@email.com"
          disabled={loading}
        />
      </div>

      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
          placeholder="Enter your password"
          disabled={loading}
        />
      </div>

      <div className="form-options">
        <label className="checkbox-group">
          <input type="checkbox" />
          <span>Remember me</span>
        </label>
        <Link href="/forgot-password" className="forgot-link">
          Forgot password?
        </Link>
      </div>

      <button 
        type="submit" 
        className="btn btn-primary btn-block"
        disabled={loading}
      >
        {loading ? 'Signing in...' : 'Sign In'}
      </button>

      <p className="form-footer">
        Don&apos;t have an account? <Link href={`/signup${plan ? `?plan=${plan}${billing ? `&billing=${billing}` : ''}` : ''}`}>Sign up here</Link>
      </p>
    </form>
  );
}
