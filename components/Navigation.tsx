'use client';

import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import { Link, useRouter } from '@/routing';
import LanguageSwitcher from './LanguageSwitcher';
import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';

export default function Navigation() {
  const t = useTranslations('Navigation');
  const locale = useLocale();
  const router = useRouter();
  const { user, isAuthenticated, logout } = useAuth();
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
      if (window.innerWidth > 768) {
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

  const handleLogout = () => {
    logout();
    setMobileMenuOpen(false);
    router.push('/');
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

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

        {/* Navigation Links */}
        <ul className={`nav-links ${mobileMenuOpen ? 'mobile-open' : ''}`}>
          
          <li>
            <Link href="/" onClick={closeMobileMenu}>{t('home')}</Link>
          </li>
          <li>
            <Link href="/features" onClick={closeMobileMenu}>{t('features')}</Link>
          </li>
          <li>
            <Link href="/pricing" onClick={closeMobileMenu}>{t('pricing')}</Link>
          </li>
          <li>
            <Link href="/about" onClick={closeMobileMenu}>{t('about')}</Link>
          </li>
          <li>
            <Link href="/contact" onClick={closeMobileMenu}>{t('contact')}</Link>
          </li>
          
          {!isAuthenticated ? (
            <li>
              <Link href="/signup" className="nav-link">  {/* ← تغییر: فقط nav-link، بدون btn classes */}
                Sign Up
              </Link>
            </li>
          ) : (
            <>
              <li className="user-info">
                <span className="user-name">👤 {user?.name}</span>
              </li>
              <li>
                <button onClick={handleLogout} className="btn btn-small btn-logout">
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>
        <div className="hidden md:block">
          <LanguageSwitcher />
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
