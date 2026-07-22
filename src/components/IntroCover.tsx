import { type FC, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../hooks/useLanguage';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { useMobileReveal } from '../hooks/useMobileReveal';
import { WEDDING_CONFIG } from '../wedding/config';

export const IntroCover: FC = () => {
  const coverRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const { t, language } = useLanguage();
  const reduced = useReducedMotion();
  const isTamil = language === 'ta';

  useEffect(() => {
    const el = coverRef.current;
    const content = contentRef.current;
    if (!el || !content || reduced) return;

    const mm = gsap.matchMedia();
    const ctx = gsap.context(() => {
      mm.add('(min-width: 1024px)', () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: el,
            start: 'top top',
            end: '+=55%',
            pin: content,
            pinSpacing: true,
            scrub: .7,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        gsap.set('.intro-cover__arch', { opacity: .16, scale: 1.025 });
        gsap.set('.intro-cover__stage', { scale: 1.025 });
        gsap.set('.intro-cover__halo', { opacity: .14 });
        tl.to('.intro-cover__arch, .intro-cover__stage', { scale: 1, duration: .3, ease: 'none' }, 0)
          .to('.intro-cover__halo', { opacity: .04, duration: .3, ease: 'none' }, 0)
          .to('.intro-cover__petals', { y: 14, duration: .3, ease: 'none' }, 0)
          .to('.intro-cover__frame', { opacity: .82, duration: .35, ease: 'none' }, .3)
          .to('.intro-cover__names', { y: -8, duration: .35, ease: 'none' }, .3)
          .to('.intro-cover__invitation', { y: -16, duration: .35, ease: 'none' }, .65);
      });

      mm.add('(max-width: 1023px)', () => {
        const desktopTargets = el.querySelectorAll<HTMLElement>(
          '.intro-cover__content, .intro-cover__arch, .intro-cover__stage, .intro-cover__halo, .intro-cover__petals, .intro-cover__frame, .intro-cover__names',
        );
        gsap.set(desktopTargets, {
          clearProps: 'transform,opacity,visibility,position,top,right,bottom,left,width,height',
        });
      });
    }, el);

    return () => { ctx.revert(); mm.revert(); };
  }, [reduced]);

  useMobileReveal(coverRef, ['.intro-cover__invitation'], true);

  return (
    <section ref={coverRef} id="home" className="intro-cover" aria-label={t('navigation', 'home')}>
      <div ref={contentRef} className="intro-cover__content">
        <img src={WEDDING_CONFIG.assets.backgrounds.paperTexture} alt="" className="intro-cover__texture" aria-hidden="true" />
        <img src={WEDDING_CONFIG.assets.backgrounds.botanicalStage} alt="" className="intro-cover__stage" aria-hidden="true" />
        <img src={WEDDING_CONFIG.assets.backgrounds.goldHalo} alt="" className="intro-cover__halo" aria-hidden="true" />
        <div className="intro-cover__frame" aria-hidden="true" />
        <img src={WEDDING_CONFIG.assets.icons.floralArch} alt="" className="intro-cover__arch" aria-hidden="true" />
        <div className="intro-cover__invitation">
          <img src={WEDDING_CONFIG.assets.icons.invitationEmblem} alt="" className="intro-cover__emblem" aria-hidden="true" />
          <p className={`intro-cover__greeting ${isTamil ? 'intro-cover__greeting--ta' : ''}`}>{t('cover', 'families')}</p>
          <h1 className={`intro-cover__names ${isTamil ? 'intro-cover__names--ta' : ''}`}>
            {WEDDING_CONFIG.couple.groom.name[language]}
            <span className="intro-cover__and">&</span>
            {WEDDING_CONFIG.couple.bride.name[language]}
          </h1>
          <div className={`intro-cover__copy ${isTamil ? 'intro-cover__copy--ta' : ''}`}>
            <p>{t('cover', 'inviteLine1')}</p>
            <p>{t('cover', 'inviteLine2')}</p>
          </div>
          <div className={`intro-cover__date ${isTamil ? 'intro-cover__date--ta' : ''}`}><span>22–23 {isTamil ? 'ஆகஸ்ட் 2026' : 'August 2026'}</span><i aria-hidden="true" /> <span>{isTamil ? 'சென்னை' : 'Chennai'}</span></div>
        </div>
        <img src={WEDDING_CONFIG.assets.backgrounds.fallingPetals} alt="" className="intro-cover__petals" aria-hidden="true" />
      </div>
    </section>
  );
};
gsap.registerPlugin(ScrollTrigger);
