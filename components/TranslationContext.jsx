'use client';

import React, { createContext, useContext, useState } from 'react';

const TranslationContext = createContext({
  translations: null,
  setTranslations: () => {}
});

export const TranslationProvider = ({ children }) => {
  const [translations, setTranslations] = useState(null);
  
  return (
    <TranslationContext.Provider value={{ translations, setTranslations }}>
      {children}
    </TranslationContext.Provider>
  );
};

export const useTranslations = () => useContext(TranslationContext);
