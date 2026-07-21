import { type FC, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../hooks/useLanguage';
import { WEDDING_CONFIG } from '../wedding/config';

gsap.registerPlugin(ScrollTrigger);

export const GroomSection: FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const { t, language } = useLanguage();
  const isTamil = language === 'ta';

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    const image = section?.querySelector('.groom-section__image-wrapper');
    if (!section || !content || !image || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      gsap.from([image, ...Array.from(content.children)], {
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
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="groom-section" aria-label={t('groom', 'title')}>
      <div className="groom-section__container">
        {/* Content */}
        <div ref={contentRef} className="groom-section__content">
          <span className="groom-section__label">{t('groom', 'title')}</span>
          <h2 className={`groom-section__name ${isTamil ? 'groom-section__name--ta' : ''}`}>
            {WEDDING_CONFIG.couple.groom.name[language]}
          </h2>
          <div className="groom-section__divider" aria-hidden="true" />
          <p className={`groom-section__description ${isTamil ? 'groom-section__description--ta' : ''}`}>
            {t('groom', 'description')}
          </p>
          <p className="groom-section__quote">{t('groom', 'quote')}</p>
        </div>

        {/* Image */}
        <div className="groom-section__image-wrapper">
          <div className="groom-section__image-frame">
            <img
              src={WEDDING_CONFIG.assets.couple.groomSolo}
              alt={WEDDING_CONFIG.couple.groom.name.en}
              className="groom-section__image"
              width={500}
              height={650}
              loading="lazy"
            />
          </div>
          {/* Temple leaf decorative element */}
          <div className="groom-section__leaf" aria-hidden="true">
            <svg width="60" height="100" viewBox="0 0 60 100" fill="none">
              <path d="M30 0 Q50 25 30 50 Q10 25 30 0" fill="var(--green)" opacity="0.12" />
              <path d="M30 50 L30 100" stroke="var(--gold)" strokeWidth="0.5" opacity="0.3" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
};
