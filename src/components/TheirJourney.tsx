import { type FC, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../hooks/useLanguage';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { WEDDING_CONFIG } from '../wedding/config';
import { useMobileReveal } from '../hooks/useMobileReveal';
import { Heart } from '@phosphor-icons/react';

gsap.registerPlugin(ScrollTrigger);

export const TheirJourney: FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { t, language } = useLanguage();
  const reduced = useReducedMotion();
  const isTamil = language === 'ta';

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || reduced) return;
    const mm = gsap.matchMedia();
    const ctx = gsap.context(() => {
      const artwork = section.querySelector('.journey-stage__art');
      const copy = section.querySelector('.journey-stage__copy');
      const knot = section.querySelector('.journey-stage__knot');
      const stage = section.querySelector('.journey-stage');
      if (!artwork || !copy || !knot || !stage) return;

      mm.add('(min-width: 1024px)', () => {
        gsap.set(artwork, { opacity: .35, x: 22 });
        gsap.set(copy, { opacity: 1 });
        gsap.set(knot, { opacity: .72, scale: .92 });
        const timeline = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: '+=82%',
            pin: stage,
            pinSpacing: true,
            scrub: .65,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });
        timeline
          .to(artwork, { opacity: 1, x: 0, duration: .48 }, .12)
          .to(knot, { opacity: 1, scale: 1, duration: .24 }, .48)
          .to(artwork, { y: -8, duration: .28 }, .72);
      });

      mm.add('(max-width: 1023px)', () => {
        gsap.set([stage, artwork, copy, knot], {
          clearProps: 'transform,opacity,visibility,position,top,right,bottom,left,width,height',
        });
      });

    }, section);
    return () => { ctx.revert(); mm.revert(); };
  }, [reduced]);

  useMobileReveal(sectionRef, ['.journey-stage__copy > *', '.journey-stage__art'], false, 'top 90%', true);

  return (
    <section ref={sectionRef} className="journey-section" aria-label={t('journey', 'title')}>
      <div className="journey-section__container">
        <div className="journey-stage">
          <div className="journey-stage__copy">
            <h2 className={isTamil ? 'journey-stage__title journey-stage__title--ta' : 'journey-stage__title'}>{t('journey', 'title')}</h2>
            <p className={isTamil ? 'journey-stage__subtitle journey-stage__subtitle--ta' : 'journey-stage__subtitle'}>{t('journey', 'subtitle')}</p>
            <p className={isTamil ? 'journey-stage__description journey-stage__description--ta' : 'journey-stage__description'}>{t('journey', 'description')}</p>
            <div className="journey-stage__ornament" aria-hidden="true">
              <img src={WEDDING_CONFIG.assets.icons.garland} alt="" className="journey-stage__knot" aria-hidden="true" />
              <Heart className="journey-stage__heart" weight="fill" aria-hidden="true" />
            </div>
          </div>
          <div className="journey-stage__art">
            <img src={WEDDING_CONFIG.assets.couple.handholding} alt={t('imageAlt', 'journey')} className="journey-stage__image" width={800} height={1417} loading="lazy" />
          </div>
        </div>
      </div>
    </section>
  );
};
