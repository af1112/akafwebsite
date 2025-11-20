'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/routing';
import LanguageSwitcher from './LanguageSwitcher';

export default function Navigation() {
  const t = useTranslations('Navigation');
  const locale = useLocale();

  return (
    <nav>
      <div className="container">
        <Link href="/" className="logo">
          <strong>Logo</strong>
        </Link>
        <ul className="nav-links">
          <li>
            <Link href="/">{t('home')}</Link>
          </li>
          <li>
            <Link href="/about">{t('about')}</Link>
          </li>
          <li>
            <Link href="/services">{t('services')}</Link>
          </li>
          <li>
            <Link href="/contact">{t('contact')}</Link>
          </li>
          <li>
            <LanguageSwitcher />
          </li>
        </ul>
      </div>
    </nav>
  );
}

