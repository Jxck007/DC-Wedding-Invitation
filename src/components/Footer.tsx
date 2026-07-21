import { type FC } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { WEDDING_CONFIG } from '../wedding/config';

export const Footer: FC = () => {
  const { t, language } = useLanguage();
  return <footer id="footer" className="footer" role="contentinfo">
    <div className="footer__bg"><img src={WEDDING_CONFIG.assets.backgrounds.floralFooter} alt="" className="footer__floral" aria-hidden="true" /></div>
    <div className="footer__container">
      <div className="footer__monogram" aria-hidden="true">{WEDDING_CONFIG.monogram[language]}</div>
      <p className="footer__names">{WEDDING_CONFIG.couple.groom.name[language]} &amp; {WEDDING_CONFIG.couple.bride.name[language]}</p>
      <p className="footer__date">{t('footer', 'date')}</p>
      <div className="footer__rule" aria-hidden="true" />
      <p className="footer__gratitude">{t('footer', 'gratitude')}</p>
    </div>
  </footer>;
};
