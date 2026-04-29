'use client';

import { useEffect } from 'react';
import { useTranslations } from './TranslationContext';

export default function ArticleTranslationsSetter({ translations }) {
  const { setTranslations } = useTranslations();

  useEffect(() => {
    setTranslations(translations);
    return () => setTranslations(null);
  }, [translations, setTranslations]);

  return null;
}
