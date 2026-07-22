import { type FC } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { WEDDING_CONFIG } from '../wedding/config';

export const LanguageSwitcher: FC = () => {
  const { language, setLanguage, t } = useLanguage();

  return (
    <div className="language-switcher" role="group" aria-label={t('accessibility', 'language')}>
      <img src={WEDDING_CONFIG.assets.icons.language} alt="" className="language-switcher__emblem" aria-hidden="true" />
      <button type="button" onClick={() => setLanguage('en')} className={`lang-option ${language === 'en' ? 'active' : ''}`} aria-label={t('accessibility', 'switchToEnglish')}>EN</button>
      <span className="lang-divider">|</span>
      <button type="button" onClick={() => setLanguage('ta')} className={`lang-option ${language === 'ta' ? 'active' : ''}`} aria-label={t('accessibility', 'switchToTamil')}>தமிழ்</button>
    </div>
  );
};
