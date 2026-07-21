import { createContext, useContext } from 'react';
import type { Language } from '../wedding/translations';

export interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (section: string, key?: string) => string;
}

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within a LanguageProvider');
  return context;
}

export function useTranslation(section: string) {
  const { language, t } = useLanguage();
  return {
    language,
    t: (key: string) => t(section, key),
    tRaw: t,
  };
}
