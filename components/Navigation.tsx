'use client';

import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import { Link, usePathname } from '@/routing';
import LanguageSwitcher from './LanguageSwitcher';
import { useEffect, useRef, useState } from 'react';

interface MenuChild {
  href: string;
  label: string;
  desc?: string;
}

interface MenuItem {
  type: 'link' | 'dropdown';
  href?: string;
  label: string;
  children?: MenuChild[];
}

export default function Navigation() {
  const t = useTranslations('Navigation');
  const locale = useLocale();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [openMobileGroup, setOpenMobileGroup] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);
  const isRtl = locale === 'fa' || locale === 'ar';

  const items: MenuItem[] = [
    { type: 'link', href: '/', label: t('home') },
    {
      type: 'dropdown',
      label: t('solutions'),
      children: [
        { href: '/digital', label: t('digital'), desc: 'Software, AI & Digital Products' },
        { href: '/industrial', label: t('industrial'), desc: 'Industrial Engineering & Factory Solutions' },
        { href: '/smart-industry', label: t('smartIndustry'), desc: 'Manufacturing digitalization' }
      ]
    },
    {
      type: 'dropdown',
      label: t('products'),
      children: [
        { href: '/products/digital-menu', label: t('digitalMenu'), desc: 'Deployed' },
        { href: '/products/weighbridge', label: t('weighbridge'), desc: 'Deployed — 60+ factories' },
        { href: '/digital', label: t('erp'), desc: 'In development' },
        { href: '/digital', label: t('fnb'), desc: 'In development' },
        { href: '/digital', label: t('cpm'), desc: 'Prototype' }
      ]
    },
    { type: 'link', href: '/projects', label: t('projects') },
    {
      type: 'dropdown',
      label: t('company'),
      children: [
        { href: '/about', label: t('about') },
        { href: '/about', label: t('leadership') },
        { href: '/about', label: t('presence') },
        { href: '/partnerships', label: t('partnerships') }
      ]
    },
    { type: 'link', href: '/contact', label: t('contact') }
  ];

  useEffect(() => {
    setMobileMenuOpen(false);
    setOpenDropdown(null);
    setOpenMobileGroup(null);
    document.body.style.overflow = 'unset';
  }, [pathname, locale]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1100) setMobileMenuOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [mobileMenuOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpenDropdown(null);
        setMobileMenuOpen(false);
      }
    };
    const onClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onClickOutside);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('mousedown', onClickOutside);
    };
  }, []);

  const isActivePath = (href: string) =>
    href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`);

  const isGroupActive = (children?: MenuChild[]) =>
    children?.some((c) => isActivePath(c.href)) ?? false;

  return (
    <nav ref={navRef} className={scrolled ? 'scrolled' : ''} aria-label="Main navigation">
      <div className="container nav-shell">
        <Link href="/" className="logo">
          <Image src="/logo.png" alt="AKAF" width={160} height={48} priority />
        </Link>

        <div className="nav-center">
          <ul className={`nav-links ${mobileMenuOpen ? 'mobile-open' : ''}`}>
            {items.map((item) =>
              item.type === 'link' ? (
                <li key={item.label}>
                  <Link
                    href={item.href!}
                    className={isActivePath(item.href!) ? 'active' : ''}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              ) : (
                <li key={item.label} className="nav-dropdown">
                  <button
                    type="button"
                    className={`nav-dropdown-trigger ${isGroupActive(item.children) ? 'active' : ''}`}
                    aria-expanded={openDropdown === item.label}
                    aria-haspopup="true"
                    onClick={() =>
                      setOpenDropdown(openDropdown === item.label ? null : item.label)
                    }
                  >
                    {item.label}
                    <svg className="nav-caret" width="10" height="6" viewBox="0 0 10 6" fill="none" aria-hidden="true">
                      <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </button>
                  <div
                    className={`nav-dropdown-panel ${openDropdown === item.label ? 'open' : ''}`}
                    role="menu"
                  >
                    {item.children!.map((child) => (
                      <Link
                        key={child.label}
                        href={child.href}
                        role="menuitem"
                        className={`nav-dropdown-item ${isActivePath(child.href) ? 'active' : ''}`}
                        onClick={() => {
                          setOpenDropdown(null);
                          setMobileMenuOpen(false);
                        }}
                      >
                        <span className="nav-dropdown-item-label">{child.label}</span>
                        {child.desc && <span className="nav-dropdown-item-desc">{child.desc}</span>}
                      </Link>
                    ))}
                  </div>
                </li>
              )
            )}
          </ul>
        </div>

        <div className="nav-actions">
          <div className="nav-language">
            <LanguageSwitcher />
          </div>
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

        {mobileMenuOpen && (
          <div className="mobile-menu-overlay" onClick={() => setMobileMenuOpen(false)} />
        )}

        {/* Mobile panel */}
        <div className={`mobile-nav-panel ${mobileMenuOpen ? 'open' : ''}`} dir={isRtl ? 'rtl' : 'ltr'}>
          <ul className="mobile-nav-list">
            {items.map((item) =>
              item.type === 'link' ? (
                <li key={item.label}>
                  <Link
                    href={item.href!}
                    className={`mobile-nav-link ${isActivePath(item.href!) ? 'active' : ''}`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              ) : (
                <li key={item.label} className="mobile-nav-group">
                  <button
                    type="button"
                    className="mobile-nav-link mobile-nav-group-btn"
                    aria-expanded={openMobileGroup === item.label}
                    onClick={() =>
                      setOpenMobileGroup(openMobileGroup === item.label ? null : item.label)
                    }
                  >
                    {item.label}
                    <svg className="nav-caret" width="12" height="8" viewBox="0 0 10 6" fill="none" aria-hidden="true">
                      <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </button>
                  <ul className={`mobile-nav-sub ${openMobileGroup === item.label ? 'open' : ''}`}>
                    {item.children!.map((child) => (
                      <li key={child.label}>
                        <Link
                          href={child.href}
                          className="mobile-nav-sublink"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              )
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
