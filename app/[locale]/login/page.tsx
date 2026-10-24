import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';
import { localizedMetadata } from '@/lib/seo';
import { Suspense } from 'react';
import LoginForm from '@/components/LoginForm';

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'LoginPage' });

  return localizedMetadata(locale, '/login', t('title'), t('subtitle'), false);
}

export default async function LoginPage() {
  const t = await getTranslations('LoginPage');
  return (
    <section className="login-page">
      <div className="container">
        <div className="login-container">
          <div className="login-header">
            <h1>{t('title')}</h1>
            <p>{t('subtitle')}</p>
          </div>
          <Suspense fallback={<div>Loading...</div>}>
            <LoginForm />
          </Suspense>
        </div>
      </div>
    </section>
  );
}
