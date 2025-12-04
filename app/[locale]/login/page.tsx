import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';
import { Suspense } from 'react';
import LoginForm from '@/components/LoginForm';

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'LoginPage' });

  return {
    title: t('title'),
    description: t('subtitle')
  };
}

export default async function LoginPage() {
  return (
    <section className="login-page">
      <div className="container">
        <div className="login-container">
          <div className="login-header">
            <h1>Welcome Back</h1>
            <p>Sign in to your account</p>
          </div>
          <Suspense fallback={<div>Loading...</div>}>
            <LoginForm />
          </Suspense>
        </div>
      </div>
    </section>
  );
}
