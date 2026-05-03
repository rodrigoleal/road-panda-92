'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { useTranslations } from './TranslationContext';

const locales = ['pt-PT', 'en-US', 'es-ES', 'it-IT'];

const FlagIcon = ({ locale }) => {
  switch (locale) {
    case 'pt-PT':
      return (
        <svg viewBox="0 0 600 400" className="w-full h-full">
          <rect width="600" height="400" fill="#E21837" />
          <rect width="240" height="400" fill="#006600" />
          <circle cx="240" cy="200" r="80" fill="#FCE300" />
          <circle cx="240" cy="200" r="50" fill="#E21837" stroke="#000" strokeWidth="2" />
        </svg>
      );
    case 'en-US':
      return (
        <svg viewBox="0 0 60 30" className="w-full h-full">
          <rect width="60" height="30" fill="#012169" />
          <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6" />
          <path d="M0,0 L60,30 M60,0 L0,30" stroke="#C8102E" strokeWidth="4" />
          <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10" />
          <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6" />
        </svg>
      );
    case 'es-ES':
      return (
        <svg viewBox="0 20 750 460" className="w-full h-full">
          <rect width="750" height="500" fill="#C60B1E" />
          <rect width="750" height="250" y="125" fill="#FFC400" />
        </svg>
      );
    case 'it-IT':
      return (
        <svg viewBox="0 0 3 2" className="w-full h-full">
          <rect width="1" height="2" fill="#009246" />
          <rect width="1" height="2" x="1" fill="#fff" />
          <rect width="1" height="2" x="2" fill="#ce2b37" />
        </svg>
      );
    default:
      return null;
  }
};

const languages = {
  'pt-PT': { label: 'Português', code: 'PT' },
  'en-US': { label: 'English', code: 'EN' },
  'es-ES': { label: 'Español', code: 'ES' },
  'it-IT': { label: 'Italiano', code: 'IT' }
};

export default function LanguageSwitcher() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const { translations } = useTranslations();

  const redirectedPathname = (locale) => {
    if (!pathname) return '/';
    if (locale === activeLocale) return pathname;
    
    // Check if we have article translations available
    if (translations) {
      const wpCode = locale.split('-')[0].toUpperCase();
      // WPGraphQL translations usually return an array of objects
      const translationArray = Array.isArray(translations) ? translations : (translations?.nodes || []);
      const translation = translationArray.find(t => {
        const tCode = t.language?.code?.toUpperCase();
        return tCode === wpCode || tCode === locale.toUpperCase();
      });
      
      if (translation && translation.slug) {
        const segments = pathname.split('/');
        segments[1] = locale;
        segments[segments.length - 1] = translation.slug;
        return segments.join('/');
      }
      
      // If we are on a single post but it has NO translation for the target language, redirect to category or home
      // Safest is to redirect to home of that language
      return `/${locale}`; 
    }

    const segments = pathname.split('/');
    if (locales.includes(segments[1])) {
        segments[1] = locale;
        return segments.join('/');
    }
    return `/${locale}${pathname}`;
  };

  const activeLocale = locales.find(l => pathname.startsWith(`/${l}/`) || pathname === `/${l}`) || 'pt-PT';
  const currentLang = languages[activeLocale];

  return (
    <div className="relative" ref={dropdownRef} translate="no">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2.5 hover:text-[var(--color-accent)] transition-colors py-2 opacity-90 hover:opacity-100 group px-2"
        aria-label="Mudar idioma"
      >
        <div className="flex items-center gap-1.5 bg-neutral-100 dark:bg-white/5 px-2 py-1.5 rounded-lg border border-neutral-200 dark:border-white/10 group-hover:border-[var(--color-accent)]/30 transition-all">
          <div className="w-5 h-3.5 rounded-[2px] overflow-hidden shadow-sm border border-black/5">
            <FlagIcon locale={activeLocale} />
          </div>
          <span className="text-xs font-bold uppercase tracking-widest leading-none translate-y-px">{currentLang.code}</span>
          <svg 
            className={`w-3 h-3 text-neutral-400 group-hover:text-[var(--color-accent)] transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>

      {/* Dropdown Menu */}
      <div 
        className={`absolute right-2 mt-2 w-[220px] bg-white dark:bg-[#1C2120] border border-neutral-200 dark:border-white/10 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden transform transition-all duration-300 origin-top-right z-[1000]
          ${isOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 -translate-y-4 pointer-events-none'}`}
      >
        <div className="p-2 space-y-1">
          {locales.map((locale) => {
            const isActive = activeLocale === locale;
            const lang = languages[locale];
            return (
              <Link
                key={locale}
                href={redirectedPathname(locale)}
                onClick={() => setIsOpen(false)}
                className={`flex items-center justify-between px-3 py-2.5 rounded-xl transition-all duration-300 text-sm font-bold tracking-wide group
                  ${isActive ? 'bg-[var(--color-accent)]/10 text-[var(--color-accent)]' : 'text-neutral-800 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-white/5 opacity-85 hover:opacity-100'}`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-6 h-4 rounded-[3px] overflow-hidden shadow-sm border border-black/5">
                    <FlagIcon locale={locale} />
                  </div>
                  <span translate="no">{lang.label}</span>
                </div>
                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)] shadow-[0_0_8px_var(--color-accent)]"></span>
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
