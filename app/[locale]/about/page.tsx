import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'AboutPage' });

  return {
    title: t('title'),
    description: t('description')
  };
}

export default async function AboutPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations('AboutPage');

  return (
    <section className="about" style={{ padding: '4rem 0', minHeight: '60vh' }}>
      <div className="container">
        <div className="about-content">
          <h1 style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>{t('title')}</h1>
          <p style={{ fontSize: '1.125rem', lineHeight: '1.8', color: 'var(--text-light)' }}>
            {t('description')}
          </p>
        </div>
      </div>
    </section>
  );
}

