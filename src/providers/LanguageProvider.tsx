import { useEffect, useState, type ReactNode } from 'react';
import { LanguageContext } from '../hooks/useLanguage';
import { translations, type Language } from '../wedding/translations';

function detectLanguage(): Language {
  const stored = localStorage.getItem('wedding-language') as Language | null;
  if (stored === 'en' || stored === 'ta') return stored;
  return navigator.language.startsWith('ta') ? 'ta' : 'en';
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(detectLanguage);

  useEffect(() => {
    localStorage.setItem('wedding-language', language);
    document.documentElement.lang = language;
  }, [language]);

  const t = (section: string, key?: string): string => {
    const sectionData = (translations as Record<string, Record<string, unknown>>)[language]?.[section];
    if (!sectionData) return key ?? '';
    if (!key) return sectionData as string;
    return (sectionData as Record<string, string>)[key] ?? key;
  };

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>;
}
