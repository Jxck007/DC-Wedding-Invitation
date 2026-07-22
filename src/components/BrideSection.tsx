import { type FC, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../hooks/useLanguage';
import { WEDDING_CONFIG } from '../wedding/config';
import { useMobileReveal } from '../hooks/useMobileReveal';

gsap.registerPlugin(ScrollTrigger);

export const BrideSection: FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const { t, language } = useLanguage();
  const isTamil = language === 'ta';
  useMobileReveal(sectionRef, ['.bride-section__content > *', '.bride-section__image-wrapper']);

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    const image = section?.querySelector('.bride-section__image-wrapper');
    if (!section || !content || !image || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const mm = gsap.matchMedia();
    const ctx = gsap.context(() => {
      mm.add('(min-width: 1024px)', () => gsap.from([image, ...Array.from(content.children)], {
        y: 20,
        opacity: 0,
        stagger: 0.08,
        duration: 0.75,
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
    <section ref={sectionRef} id="story" className="bride-section" aria-label={t('bride', 'title')}>
      <div className="bride-section__container">
        {/* Image */}
        <div className="bride-section__image-wrapper wedding-artwork wedding-artwork--bride">
          <div className="bride-section__image-frame">
            <img
              src={WEDDING_CONFIG.assets.couple.brideSolo}
              alt={t('imageAlt', 'bride')}
              className="bride-section__image"
              width={500}
              height={650}
              loading="lazy"
            />
          </div>
        </div>

        {/* Content */}
        <div ref={contentRef} className="bride-section__content">
          <span className="bride-section__label">{t('bride', 'title')}</span>
          <h2 className={`bride-section__name ${isTamil ? 'bride-section__name--ta' : ''}`}>
            {WEDDING_CONFIG.couple.bride.name[language]}
          </h2>
          <div className="bride-section__divider" aria-hidden="true" />
          <p className={`bride-section__description ${isTamil ? 'bride-section__description--ta' : ''}`}>
            {t('bride', 'description')}
          </p>
          <p className="bride-section__quote">{t('bride', 'quote')}</p>
        </div>
      </div>
    </section>
  );
};
