'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { Link } from '@/routing';

export default function LoginForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would integrate with your authentication system
    alert('Login integration will be implemented here. This is a demo.');
    // In production, you would:
    // 1. Validate credentials
    // 2. Create session
    // 3. Redirect to dashboard
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">
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

      <button type="submit" className="btn btn-primary btn-block">
        Sign In
      </button>

      <p className="form-footer">
        Don't have an account? <Link href="/signup">Sign up here</Link>
      </p>
    </form>
  );
}


