import { type FC, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../hooks/useLanguage';
import { WEDDING_CONFIG } from '../wedding/config';
import { VenueActions } from './VenueActions';
import { useMobileReveal } from '../hooks/useMobileReveal';

gsap.registerPlugin(ScrollTrigger);

export const VenueSection: FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { t, language } = useLanguage();
  const isTamil = language === 'ta';
  useMobileReveal(sectionRef, ['.venue-section__content > .eyebrow', '.venue-section__venue-name', '.venue-section__shared', '.venue-actions', '.venue-section__map']);
  useEffect(() => {
    const section = sectionRef.current;
    if (!section || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const mm = gsap.matchMedia();
    const ctx = gsap.context(() => mm.add('(min-width: 1024px)', () => gsap.from('.venue-section__content, .venue-section__map', {
      y: 18, opacity: 0, duration: 0.75, stagger: 0.1, ease: 'power2.out',
      scrollTrigger: { trigger: section, start: 'top 88%', once: true },
    })), section);
    return () => { ctx.revert(); mm.revert(); };
  }, []);
  return (
    <section ref={sectionRef} id="venue" className="venue-section" aria-label={t('venue', 'title')}>
      <div className="venue-section__container">
        <div className="venue-section__content">
          <p className="eyebrow">{t('venue', 'title')}</p>
          <h2 className={`venue-section__venue-name ${isTamil ? 'venue-section__venue-name--ta' : ''}`}>{WEDDING_CONFIG.venue.name[language]}</h2>
          <p className="venue-section__shared">{t('venue', 'mapNote')}</p>
          <VenueActions directionsUrl={WEDDING_CONFIG.venue.mapUrl} address={WEDDING_CONFIG.venue.name[language] + ', ' + WEDDING_CONFIG.venue.address[language]} />
        </div>
        <div className="venue-section__map">
          <p className="venue-section__route-title">{language === 'ta' ? 'இரு கொண்டாட்டங்கள், ஒரே இடம்' : 'Two Celebrations, One Destination'}</p>
          <div className="venue-section__route-events"><div><strong>{language === 'ta' ? 'வரவேற்பு' : 'Reception'}</strong><span>{language === 'ta' ? '22 ஆகஸ்ட் · மாலை 6:30' : '22 August · 6:30 PM'}</span></div><div><strong>{language === 'ta' ? 'திருமணம்' : 'Wedding'}</strong><span>{language === 'ta' ? '23 ஆகஸ்ட் · காலை 9:00' : '23 August · 9:00 AM'}</span></div></div>
          <div className="venue-section__map-art"><span className="venue-section__route" /><span className="venue-section__destination venue-section__destination--one" /><span className="venue-section__destination venue-section__destination--two" /><img src={WEDDING_CONFIG.assets.icons.venue} alt="" className="venue-section__building-emblem" aria-hidden="true" /><img src={WEDDING_CONFIG.assets.icons.location} alt="" className="venue-section__location-emblem" aria-hidden="true" /><img src={WEDDING_CONFIG.assets.icons.directions} alt="" className="venue-section__directions-emblem" aria-hidden="true" /><img src={WEDDING_CONFIG.assets.icons.maps} alt="" className="venue-section__maps-emblem" aria-hidden="true" /></div>
          <address className={`venue-section__address ${isTamil ? 'venue-section__address--ta' : ''}`}>{WEDDING_CONFIG.venue.address[language]}</address>
        </div>
      </div>
    </section>
  );
};
