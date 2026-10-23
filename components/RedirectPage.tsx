'use client';

import { useEffect } from 'react';
import { Link, useRouter } from '@/routing';
import { useTranslations } from 'next-intl';

export default function RedirectPage({ to }: { to: string }) {
  const t = useTranslations('RedirectPage');
  const router = useRouter();

  useEffect(() => {
    router.replace(to);
  }, [router, to]);

  return (
    <section className="akaf-section">
      <div className="container" style={{ textAlign: 'center', padding: '6rem 1rem' }}>
        <h1>{t('title')}</h1>
        <p className="section-subtitle" style={{ margin: '0.75rem auto 1.5rem' }}>
          {t('message')}
        </p>
        <Link href={to} className="btn btn-primary">
          {t('cta')}
        </Link>
      </div>
    </section>
  );
}
