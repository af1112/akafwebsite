'use client';

import { useLocale } from 'next-intl';
import { Link, usePathname } from '@/routing';
import { useState, useEffect, useRef } from 'react';

const languages = [
  { code: 'en', name: 'English', dir: 'ltr', font: 'sans-serif' },
  { code: 'fa', name: 'فارسی', dir: 'rtl', font: 'IranYekan' },
  { code: 'ar', name: 'العربية', dir: 'rtl', font: 'NotoSansArabic' }
];

export default function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const currentLang = languages.find(l => l.code === locale) || languages[0];

  return (
    <div className="relative z-50" ref={ref}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300
          ${isOpen 
            ? 'bg-indigo-50 text-indigo-600 shadow-sm ring-2 ring-indigo-100' 
            : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'}
        `}
        aria-label="Change Language"
        title={currentLang.name}
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" />
        </svg>
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div
          className={`
            absolute top-full mt-2 w-40 bg-white/95 backdrop-blur-sm rounded-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] border border-gray-100 overflow-hidden transition-all duration-200 origin-top-right
            animate-in fade-in zoom-in-95 slide-in-from-top-2
            ${locale === 'fa' || locale === 'ar' ? 'left-0' : 'right-0'}
          `}
        >
          <div className="p-1.5">
            {languages.map((lang) => (
              <Link
                key={lang.code}
                href={pathname}
                locale={lang.code}
                className={`
                  flex items-center justify-between px-3 py-2 text-sm rounded-lg transition-colors
                  ${locale === lang.code 
                    ? 'bg-indigo-50 text-indigo-600 font-medium' 
                    : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'}
                `}
                onClick={() => setIsOpen(false)}
                style={{ fontFamily: lang.font }}
                dir={lang.dir}
              >
                <span>{lang.name}</span>
                {locale === lang.code && (
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-600"></div>
                )}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
