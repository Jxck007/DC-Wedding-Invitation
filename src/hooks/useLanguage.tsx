import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import type { Language } from '../wedding/translations';
import { translations } from '../wedding/translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (section: string, key?: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

function detectLanguage(): Language {
  if (typeof window === 'undefined') return 'en';
  const stored = localStorage.getItem('wedding-language') as Language | null;
  if (stored === 'en' || stored === 'ta') return stored;
  const browserLang = navigator.language || '';
  return browserLang.startsWith('ta') ? 'ta' : 'en';
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(detectLanguage);

  useEffect(() => {
    localStorage.setItem('wedding-language', language);
  }, [language]);

  const t = (section: string, key?: string): string => {
    try {
      const langData = (translations as Record<string, Record<string, unknown>>)[language];
      if (!langData) return '';
      const sectionData = langData[section];
      if (!sectionData) return '';
      if (key) {
        const data = sectionData as Record<string, string>;
        return data[key] ?? key;
      }
      return sectionData as string;
    } catch {
      return key || '';
    }
  };

  // Update html lang attribute
  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

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
