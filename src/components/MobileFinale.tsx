import { type FC, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../hooks/useLanguage';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { WEDDING_CONFIG } from '../wedding/config';

gsap.registerPlugin(ScrollTrigger);

export const MobileFinale: FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { t, language } = useLanguage();
  const reduced = useReducedMotion();
  const isTamil = language === 'ta';
  useEffect(() => {
    const section = sectionRef.current;
    if (!section || reduced) return;
    const first = section.querySelector('.mobile-finale__frame--first');
    const final = section.querySelector('.mobile-finale__frame--final');
    if (!first || !final) return;
    const ctx = gsap.context(() => {
      gsap.set(final, { opacity: 0 });
      gsap.timeline({ scrollTrigger: { trigger: section, start: 'top 82%', once: true } })
        .to(first, { opacity: 0, duration: .7, ease: 'power2.out' })
        .to(final, { opacity: 1, duration: .7, ease: 'power2.out' }, '<');
    }, section);
    return () => ctx.revert();
  }, [reduced]);
  return <section ref={sectionRef} className="mobile-finale" aria-label={t('finale', 'message')}><div className="mobile-finale__stage">
    <img src={WEDDING_CONFIG.assets.backgrounds.paperTexture} alt="" className="mobile-finale__texture" aria-hidden="true" />
    <img src={WEDDING_CONFIG.assets.icons.floralArch} alt="" className="mobile-finale__arch" aria-hidden="true" />
    <div className="mobile-finale__artwork"><img src={WEDDING_CONFIG.assets.couple.handholding} alt="Dinesh and Charumithraa holding hands" className="mobile-finale__frame mobile-finale__frame--first" loading="lazy" /><img src={WEDDING_CONFIG.assets.couple.finalClose} alt="Dinesh and Charumithraa together" className="mobile-finale__frame mobile-finale__frame--final" loading="lazy" /></div>
    <div className="mobile-finale__message"><h2 className={isTamil ? 'mobile-finale__title mobile-finale__title--ta' : 'mobile-finale__title'}>{t('finale', 'message')}</h2><p className={isTamil ? 'mobile-finale__copy mobile-finale__copy--ta' : 'mobile-finale__copy'}>{t('finale', 'wish')}</p></div>
  </div></section>;
};
