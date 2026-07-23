import { type FC, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../hooks/useLanguage';
import { WEDDING_CONFIG } from '../wedding/config';
import { useMobileReveal } from '../hooks/useMobileReveal';

gsap.registerPlugin(ScrollTrigger);

export const HeroSection: FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const floralRef = useRef<HTMLDivElement>(null);
  const { t, language } = useLanguage();
  const isTamil = language === 'ta';
  useMobileReveal(sectionRef, ['.hero-section__content > *', '.hero-section__image-wrapper']);

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    const image = imageRef.current;
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
    <section ref={sectionRef} className="hero-section" aria-label={t('hero', 'greeting')}>
      <div className="hero-section__bg">
        <img
          src={WEDDING_CONFIG.assets.backgrounds.paperTexture}
          alt=""
          className="hero-section__texture"
          aria-hidden="true"
        />
      </div>

      <div className="hero-section__container">
        {/* Floral decorations */}
        <div ref={floralRef} className="hero-section__floral" aria-hidden="true">
          <svg width="60" height="120" viewBox="0 0 60 120" fill="none">
            <path d="M30 0 Q45 30 30 60 Q15 30 30 0" fill="var(--gold)" opacity="0.15" />
            <path d="M30 60 Q45 90 30 120 Q15 90 30 60" fill="var(--gold)" opacity="0.15" />
          </svg>
        </div>

        {/* Image */}
        <div ref={imageRef} className="hero-section__image-wrapper">
          <div className="hero-section__image-frame">
            <img
              src={WEDDING_CONFIG.assets.couple.heroNamaste}
              alt={t('imageAlt', 'hero')}
              className="hero-section__image"
              width={1086}
              height={1448}
              fetchPriority="high"
              decoding="async"
            />
          </div>
          {/* Gold halo */}
          <img
            src={WEDDING_CONFIG.assets.backgrounds.goldHalo}
            alt=""
            className="hero-section__halo"
            aria-hidden="true"
          />
        </div>

        {/* Content */}
        <div ref={contentRef} className="hero-section__content">
          <p className={`hero-section__greeting ${isTamil ? 'hero-section__greeting--ta' : ''}`}>
            {t('hero', 'greeting')}
          </p>

          <h2 className={`hero-section__names ${isTamil ? 'hero-section__names--ta' : ''}`}>
            {WEDDING_CONFIG.couple.groom.name[language]}
            <span className="hero-section__and">&</span>
            {WEDDING_CONFIG.couple.bride.name[language]}
          </h2>

          <p className={`hero-section__invite ${isTamil ? 'hero-section__invite--ta' : ''}`}>
            {t('hero', 'invite')}
          </p>

          <div className="hero-section__details">
            <span className={`hero-section__date ${isTamil ? 'hero-section__date--ta' : ''}`}>
              {t('hero', 'date')}
            </span>
            <span className="hero-section__dot" aria-hidden="true">·</span>
            <span className={`hero-section__place ${isTamil ? 'hero-section__place--ta' : ''}`}>
              {t('hero', 'place')}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
