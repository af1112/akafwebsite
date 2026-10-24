'use client';

import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/routing';
import { useState, useEffect } from 'react';

const PROMO_ROUTES = ['/products/digital-menu', '/pricing', '/signup', '/features'];

export default function AnnouncementBar() {
  const t = useTranslations('Announcement');
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);

  const onPromoPage = PROMO_ROUTES.some((route) => pathname.startsWith(route));

  useEffect(() => {
    // Check if user has dismissed the announcement
    const dismissed = localStorage.getItem('announcement-dismissed');
    if (dismissed === 'true') {
      setIsVisible(false);
    }
    setIsLoaded(true);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    localStorage.setItem('announcement-dismissed', 'true');
  };

  // Don't render until loaded (prevents flash)
  // Only show the Digital Menu promo on digital-product pages,
  // not on the corporate pages.
  if (!isLoaded || !isVisible || !onPromoPage) {
    return null;
  }

  return (
    <div className="announcement-bar">
      <div className="container announcement-content">
        <span className="announcement-text">{t('message')}</span>
        <Link href="/pricing" className="announcement-link">
          {t('cta')}
        </Link>
        <button 
          className="announcement-close" 
          onClick={handleClose}
          aria-label="Close announcement"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M12 4L4 12M4 4L12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>
      </div>
    </div>
  );
}
