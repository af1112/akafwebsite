import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';
import { localizedMetadata } from '@/lib/seo';
import { Suspense } from 'react';
import SignupForm from '@/components/SignupForm';

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'SignupPage' });

  return localizedMetadata(locale, '/signup', t('title'), t('subtitle'), false);
}

export default async function SignupPage() {
  const t = await getTranslations('SignupPage');
  return (
    <section className="signup-page">
      <div className="container">
        <div className="signup-container">
          <div className="signup-header">
            <h1>{t('title')}</h1>
            <p>{t('subtitle')}</p>
          </div>
          <Suspense fallback={<div>Loading...</div>}>
            <SignupForm />
          </Suspense>
        </div>
      </div>
    </section>
  );
}








