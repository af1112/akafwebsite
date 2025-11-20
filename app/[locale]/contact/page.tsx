import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'ContactPage' });

  return {
    title: t('title'),
    description: t('description')
  };
}

export default async function ContactPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations('ContactPage');

  return (
    <section style={{ padding: '4rem 0', minHeight: '60vh' }}>
      <div className="container">
        <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>{t('title')}</h1>
          <p style={{ fontSize: '1.125rem', lineHeight: '1.8', color: 'var(--text-light)', marginBottom: '2rem' }}>
            {t('description')}
          </p>
          <div style={{ background: 'var(--bg-light)', padding: '2rem', borderRadius: '0.5rem' }}>
            <p><strong>{t('email')}:</strong> contact@example.com</p>
            <p><strong>{t('phone')}:</strong> +1 234 567 890</p>
          </div>
        </div>
      </div>
    </section>
  );
}

