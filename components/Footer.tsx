'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/routing';

export default function Footer() {
  const t = useTranslations('Footer');
  const year = new Date().getFullYear();

  return (
    <footer className="akaf-footer">
      <div className="container akaf-footer-inner">
        <div className="akaf-footer-grid">
          <div className="akaf-footer-brand">
            <strong>{t('company.title')}</strong>
            <p>{t('tagline')}</p>
            <p className="akaf-footer-legal">{t('company.legalName')}</p>
            <p className="akaf-footer-legal">{t('company.location')}</p>
            <p className="akaf-footer-legal">{t('company.cr')}</p>
          </div>

          <div className="akaf-footer-col">
            <strong>{t('divisions.title')}</strong>
            <Link href="/digital">{t('divisions.digital')}</Link>
            <Link href="/industrial">{t('divisions.industrial')}</Link>
            <Link href="/smart-industry">{t('divisions.smartIndustry')}</Link>
          </div>

          <div className="akaf-footer-col">
            <strong>{t('products.title')}</strong>
            <Link href="/products/digital-menu">{t('products.digitalMenu')}</Link>
            <Link href="/products/weighbridge">{t('products.weighbridge')}</Link>
            <Link href="/pricing">{t('products.pricing')}</Link>
            <Link href="/signup">{t('products.signup')}</Link>
          </div>

          <div className="akaf-footer-col">
            <strong>{t('corporate.title')}</strong>
            <Link href="/about">{t('corporate.about')}</Link>
            <Link href="/projects">{t('corporate.projects')}</Link>
            <Link href="/partnerships">{t('corporate.partnerships')}</Link>
            <Link href="/contact">{t('corporate.contact')}</Link>
          </div>
        </div>

        <div className="akaf-footer-bottom">
          <a href={`mailto:${t('email')}`}>{t('email')}</a>
          <a href="tel:+96894063021">{t('phone')}</a>
          <p>© {year} - {t('rights')}</p>
        </div>
      </div>
    </footer>
  );
}
