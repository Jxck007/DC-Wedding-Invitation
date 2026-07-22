import { type FC, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../hooks/useLanguage';
import { WEDDING_CONFIG } from '../wedding/config';
import { useMobileReveal } from '../hooks/useMobileReveal';

gsap.registerPlugin(ScrollTrigger);

export const BlessingMessage: FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const { t, language } = useLanguage();
  const isTamil = language === 'ta';
  useMobileReveal(sectionRef, ['.blessing-section__content > *', '.blessing-section__image-wrapper']);

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    const image = section?.querySelector('.blessing-section__image-wrapper');
    if (!section || !content || !image || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const mm = gsap.matchMedia();
    const ctx = gsap.context(() => {
      mm.add('(min-width: 1024px)', () => gsap.from([image, content], {
        y: 18,
        opacity: 0,
        duration: 0.75,
        stagger: 0.08,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 84%',
          once: true,
        },
      }));
    }, section);

    return () => { ctx.revert(); mm.revert(); };
  }, []);

  return (
    <section ref={sectionRef} id="blessings" className="blessing-section" aria-label={t('blessing', 'title')}>
      <div className="blessing-section__container">
        <div className="blessing-section__image-wrapper">
          <img
            src={WEDDING_CONFIG.assets.couple.togetherForever}
            alt={t('imageAlt', 'blessing')}
            className="blessing-section__image"
            width={500}
            height={600}
            loading="lazy"
          />
          <div className="blessing-section__overlay" aria-hidden="true" />
        </div>

        <div ref={contentRef} className="blessing-section__content">
          <img src={WEDDING_CONFIG.assets.icons.finalBlessing} alt="" className="blessing-section__emblem" aria-hidden="true" />
          <h2 className={`blessing-section__title ${isTamil ? 'blessing-section__title--ta' : ''}`}>
            {t('blessing', 'title')}
          </h2>

          <p className={`blessing-section__message ${isTamil ? 'blessing-section__message--ta' : ''}`}>
            {t('blessing', 'message')}
          </p>

          <div className="blessing-section__divider" aria-hidden="true">
            <svg width="60" height="2" viewBox="0 0 60 2" fill="none">
              <line x1="0" y1="1" x2="60" y2="1" stroke="var(--gold)" strokeWidth="1" opacity="0.5" />
            </svg>
          </div>

          <p className={`blessing-section__closing ${isTamil ? 'blessing-section__closing--ta' : ''}`}>
            {t('blessing', 'closing')}
          </p>

          <p className={`blessing-section__names ${isTamil ? 'blessing-section__names--ta' : ''}`}>
            {WEDDING_CONFIG.couple.groom.name[language]} & {WEDDING_CONFIG.couple.bride.name[language]}
          </p>
        </div>
      </div>
    </section>
  );
};
