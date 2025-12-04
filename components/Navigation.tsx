'use client';

import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/routing';
import LanguageSwitcher from './LanguageSwitcher';
import { useEffect, useState } from 'react';

export default function Navigation() {
  const t = useTranslations('Navigation');
  const locale = useLocale();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={scrolled ? 'scrolled' : ''}>
      <div className="container">
        <Link href="/" className="logo">
          <Image
            src="/logo.png"
            alt="AKAF Digital Menu"
            width={160}
            height={48}
            priority
          />
        </Link>
        <ul className="nav-links">
          <li>
            <Link href="/">{t('home')}</Link>
          </li>
          <li>
            <Link href="/features">{t('features')}</Link>
          </li>
          <li>
            <Link href="/pricing">{t('pricing')}</Link>
          </li>
          <li>
            <Link href="/about">{t('about')}</Link>
          </li>
          <li>
            <Link href="/contact">{t('contact')}</Link>
          </li>
          <li>
            <Link href="/login" className="nav-login">{t('login')}</Link>
          </li>
          <li>
            <Link href="/signup" className="btn btn-small btn-primary">{t('signup')}</Link>
          </li>
          <li>
            <LanguageSwitcher />
          </li>
        </ul>
      </div>
    </nav>
  );
}
