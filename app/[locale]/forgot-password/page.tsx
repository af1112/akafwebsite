import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';
import { localizedMetadata } from '@/lib/seo';
import { Link } from '@/routing';

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'ForgotPasswordPage' });

  return localizedMetadata(locale, '/forgot-password', t('title'), t('description'), false);
}

export default async function ForgotPasswordPage() {
  const t = await getTranslations('ForgotPasswordPage');
  return (
    <section className="login-page">
      <div className="container">
        <div className="login-container">
          <div className="login-header">
            <h1>{t('title')}</h1>
            <p>{t('description')}</p>
          </div>
          <div className="hero-buttons">
            <Link href="/contact" className="btn btn-primary">
              {t('contact')}
            </Link>
            <Link href="/login" className="btn btn-secondary">
              {t('backToLogin')}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
