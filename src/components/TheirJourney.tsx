import { type FC, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../hooks/useLanguage';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { WEDDING_CONFIG } from '../wedding/config';

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
      const left = section.querySelector('.journey-stage__art--left');
      const right = section.querySelector('.journey-stage__art--right');
      const copy = section.querySelector('.journey-stage__copy');
      const knot = section.querySelector('.journey-stage__knot');
      const stage = section.querySelector('.journey-stage');
      const lines = section.querySelectorAll('.journey-stage__line');
      if (!left || !right || !copy || !knot || !stage) return;

      mm.add('(min-width: 1024px)', () => {
        gsap.set(left, { opacity: 1 });
        gsap.set(right, { opacity: .22, x: 22 });
        gsap.set(copy, { opacity: 1 });
        gsap.set(knot, { opacity: .72, scale: .92 });
        gsap.set(lines, { scaleX: 0, transformOrigin: 'center center' });
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
          .fromTo('.journey-stage__art--left .journey-stage__image', { scale: 1.16, y: 14 }, { scale: 1.26, y: 14, duration: .2 }, 0)
          .to(right, { opacity: 1, x: 0, duration: .28 }, .2)
          .to(lines, { scaleX: 1, duration: .24 }, .48)
          .to(knot, { opacity: 1, scale: 1, duration: .24 }, .48)
          .to([left, right], { y: -8, duration: .28 }, .72);
      });

      mm.add('(max-width: 1023px)', () => {
        gsap.timeline({
          defaults: { duration: .75, ease: 'power2.out' },
          scrollTrigger: { trigger: section, start: 'top 84%', once: true },
        }).from(copy, { opacity: 0, y: 20 })
          .from(left, { opacity: 0, y: 20 }, .08)
          .from(knot, { opacity: 0, scale: .92 }, .16)
          .from(right, { opacity: 0, y: 20 }, .24);
      });
    }, section);
    return () => { ctx.revert(); mm.revert(); };
  }, [reduced]);

  return (
    <section ref={sectionRef} className="journey-section" aria-label={t('journey', 'title')}>
      <div className="journey-section__container">
        <div className="journey-stage">
          <div className="journey-stage__art journey-stage__art--left">
            <img src={WEDDING_CONFIG.assets.couple.armLinked} alt={`${WEDDING_CONFIG.couple.groom.name.en} and ${WEDDING_CONFIG.couple.bride.name.en} arm in arm`} className="journey-stage__image" width={480} height={600} loading="lazy" />
          </div>
          <div className="journey-stage__copy">
            <img src={WEDDING_CONFIG.assets.icons.petalDivider} alt="" className="journey-stage__petal" aria-hidden="true" />
            <h2 className={isTamil ? 'journey-stage__title journey-stage__title--ta' : 'journey-stage__title'}>{t('journey', 'title')}</h2>
            <p className={isTamil ? 'journey-stage__subtitle journey-stage__subtitle--ta' : 'journey-stage__subtitle'}>{t('journey', 'subtitle')}</p>
            <p className={isTamil ? 'journey-stage__description journey-stage__description--ta' : 'journey-stage__description'}>{t('journey', 'description')}</p>
          </div>
          <div className="journey-stage__ornament" aria-hidden="true">
            <span className="journey-stage__line journey-stage__line--left" />
            <img src={WEDDING_CONFIG.assets.icons.finalBlessing} alt="" className="journey-stage__knot" />
            <span className="journey-stage__line journey-stage__line--right" />
          </div>
          <div className="journey-stage__art journey-stage__art--right">
            <img src={WEDDING_CONFIG.assets.couple.handholding} alt={`${WEDDING_CONFIG.couple.groom.name.en} and ${WEDDING_CONFIG.couple.bride.name.en} holding hands`} className="journey-stage__image" width={480} height={600} loading="lazy" />
          </div>
        </div>
      </div>
    </section>
  );
};
