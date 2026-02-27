'use client';

import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import { Link, usePathname } from '@/routing';
import LanguageSwitcher from './LanguageSwitcher';
import { useEffect, useState } from 'react';

export default function Navigation() {
  const t = useTranslations('Navigation');
  const locale = useLocale();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Ensure menu is closed on mount
  useEffect(() => {
    setMobileMenuOpen(false);
    document.body.style.overflow = 'unset';
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when window is resized to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1100) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  // Close mobile menu when locale changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [locale]);

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const isActivePath = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <nav className={scrolled ? 'scrolled' : ''}>
      <div className="container nav-shell">
        <Link href="/" className="logo">
          <Image
            src="/logo.png"
            alt="AKAF"
            width={160}
            height={48}
            priority
          />
        </Link>

        <div className="nav-center">
          {/* Navigation Links */}
          <ul className={`nav-links ${mobileMenuOpen ? 'mobile-open' : ''}`}>
            <li>
              <Link href="/" className={isActivePath('/') ? 'active' : ''} onClick={closeMobileMenu}>{t('home')}</Link>
            </li>
            <li>
              <Link href="/about" className={isActivePath('/about') ? 'active' : ''} onClick={closeMobileMenu}>{t('about')}</Link>
            </li>
            <li>
              <Link href="/services" className={isActivePath('/services') ? 'active' : ''} onClick={closeMobileMenu}>{t('services')}</Link>
            </li>
            <li>
              <Link href="/projects" className={isActivePath('/projects') ? 'active' : ''} onClick={closeMobileMenu}>{t('projects')}</Link>
            </li>
            <li>
              <Link href="/partnerships" className={isActivePath('/partnerships') ? 'active' : ''} onClick={closeMobileMenu}>{t('partnerships')}</Link>
            </li>
            <li>
              <Link href="/ai-software" className={isActivePath('/ai-software') ? 'active' : ''} onClick={closeMobileMenu}>{t('aiSoftware')}</Link>
            </li>
            <li>
              <Link href="/contact" className={isActivePath('/contact') ? 'active' : ''} onClick={closeMobileMenu}>{t('contact')}</Link>
            </li>
          </ul>
        </div>

        <div className="nav-actions">
          <div className="nav-language">
            <LanguageSwitcher />
          </div>

          {/* Hamburger Menu Button (Mobile Only) */}
          <button
            className={`hamburger-menu ${mobileMenuOpen ? 'open' : ''}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        {mobileMenuOpen && (
          <div 
            className="mobile-menu-overlay" 
            onClick={() => setMobileMenuOpen(false)}
          />
        )}
      </div>
    </nav>
  );
}
