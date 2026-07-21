import { type FC } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { WEDDING_CONFIG } from '../wedding/config';

export const LanguageSwitcher: FC = () => {
  const { language, setLanguage, t } = useLanguage();

  return (
    <div
      className="language-switcher"
      aria-label={language === 'en' ? t('accessibility', 'switchToTamil') : t('accessibility', 'switchToEnglish')}
    >
      <img src={WEDDING_CONFIG.assets.icons.language} alt="" aria-hidden="true" />
      <button type="button" onClick={() => setLanguage('en')} className={`lang-option ${language === 'en' ? 'active' : ''}`}>EN</button>
      <span className="lang-divider">|</span>
      <button type="button" onClick={() => setLanguage('ta')} className={`lang-option ${language === 'ta' ? 'active' : ''}`}>தமிழ்</button>
    </div>
  );
};
