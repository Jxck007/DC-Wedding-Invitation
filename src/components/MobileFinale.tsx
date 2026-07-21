import { type FC } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { WEDDING_CONFIG } from '../wedding/config';

export const MobileFinale: FC = () => {
  const { t, language } = useLanguage();
  const isTamil = language === 'ta';
  const coupleName = `${WEDDING_CONFIG.couple.groom.name[language]} ${isTamil ? 'மற்றும்' : 'and'} ${WEDDING_CONFIG.couple.bride.name[language]}`;
  return <section className="mobile-finale" aria-label={t('finale', 'message')}><div className="mobile-finale__stage">
    <img src={WEDDING_CONFIG.assets.backgrounds.paperTexture} alt="" className="mobile-finale__texture" aria-hidden="true" />
    <img src={WEDDING_CONFIG.assets.icons.floralArch} alt="" className="mobile-finale__arch" aria-hidden="true" />
    <div className="mobile-finale__artwork"><img src={WEDDING_CONFIG.assets.couple.finalClose} alt={coupleName} className="mobile-finale__frame mobile-finale__frame--final" loading="lazy" /></div>
    <div className="mobile-finale__message"><h2 className={isTamil ? 'mobile-finale__title mobile-finale__title--ta' : 'mobile-finale__title'}>{t('finale', 'message')}</h2><p className={isTamil ? 'mobile-finale__copy mobile-finale__copy--ta' : 'mobile-finale__copy'}>{t('finale', 'wish')}</p></div>
  </div></section>;
};
