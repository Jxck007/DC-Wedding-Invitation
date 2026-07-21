import { type FC, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../hooks/useLanguage';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { WEDDING_CONFIG } from '../wedding/config';

gsap.registerPlugin(ScrollTrigger);

type FinaleFrame = {
  src: string;
  xPercent: number;
  yPx: number;
  scale: number;
  opacityStart: number;
  alt: string;
};

export const DesktopFinale: FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { t, language } = useLanguage();
  const reduced = useReducedMotion();
  const isTamil = language === 'ta';
  const frames: FinaleFrame[] = [
    { src: WEDDING_CONFIG.assets.scenes.runTogether, xPercent: -50, yPx: 14, scale: .98, opacityStart: .25, alt: 'Dinesh and Charumithraa coming together' },
    { src: WEDDING_CONFIG.assets.couple.handholding, xPercent: -50, yPx: 10, scale: 1, opacityStart: 0, alt: 'Dinesh and Charumithraa holding hands' },
    { src: WEDDING_CONFIG.assets.couple.lift, xPercent: -50, yPx: 18, scale: .97, opacityStart: 0, alt: 'Dinesh and Charumithraa celebrating together' },
    { src: WEDDING_CONFIG.assets.couple.finalClose, xPercent: -50, yPx: 16, scale: .99, opacityStart: 0, alt: 'Dinesh and Charumithraa together' },
  ];

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || reduced) return;
    const mm = gsap.matchMedia();
    const ctx = gsap.context(() => mm.add('(min-width: 1024px)', () => {
      const stage = section.querySelector('.finale-stage');
      const artwork = section.querySelector('.finale-stage__artwork');
      const framesEls = gsap.utils.toArray<HTMLElement>(section.querySelectorAll('.finale-stage__frame'));
      const message = section.querySelector('.finale-stage__message');
      const arch = section.querySelector('.finale-stage__arch');
      const petals = section.querySelector('.finale-stage__petals');
      if (!stage || !artwork || !message || !arch || !petals) return;
      framesEls.forEach((frame, index) => gsap.set(frame, {
        xPercent: frames[index].xPercent,
        y: frames[index].yPx,
        scale: frames[index].scale,
        opacity: frames[index].opacityStart,
        transformOrigin: '50% 100%',
      }));
      gsap.set(message, { opacity: 1 });
      gsap.set(arch, { opacity: .1 });
      gsap.set(petals, { opacity: .18 });
      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=270%',
          pin: stage,
          pinSpacing: true,
          scrub: .7,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
      tl.to(framesEls[0], { opacity: 1, duration: .12 }, 0)
        .to(framesEls[0], { x: 10, duration: .23 }, .12)
        .to(arch, { opacity: .19, duration: .23 }, .12)
        .to(framesEls[0], { opacity: 0, duration: .08 }, .35)
        .to(framesEls[1], { opacity: 1, duration: .08 }, .35)
        .to(framesEls[1], { opacity: 0, duration: .08 }, .55)
        .to(framesEls[2], { opacity: 1, duration: .08 }, .55)
        .to(petals, { y: -24, opacity: .42, duration: .18 }, .55)
        .to(framesEls[2], { opacity: 0, duration: .08 }, .73)
        .to(framesEls[3], { opacity: 1, duration: .08 }, .73)
        .to(arch, { opacity: .24, duration: .17 }, .73)
        .to([artwork, message], { y: -8, duration: .1 }, .9);
    }), section);
    return () => { ctx.revert(); mm.revert(); };
  }, [reduced]);

  return <section ref={sectionRef} className={`finale-section ${reduced ? 'finale-section--reduced' : ''}`} aria-label={t('finale', 'message')}>
    <div className="finale-stage">
      <img src={WEDDING_CONFIG.assets.backgrounds.paperTexture} alt="" className="finale-stage__texture" aria-hidden="true" />
      <img src={WEDDING_CONFIG.assets.icons.floralArch} alt="" className="finale-stage__arch" aria-hidden="true" />
      <img src={WEDDING_CONFIG.assets.icons.petalDivider} alt="" className="finale-stage__petals" aria-hidden="true" />
      <div className="finale-stage__artwork">
        {frames.map((frame, index) => <div key={frame.src} className={`finale-stage__frame finale-stage__frame--${index}`}>
          <img src={frame.src} alt={frame.alt} className="finale-stage__image" loading={index === 0 ? 'eager' : 'lazy'} />
        </div>)}
      </div>
      <div className="finale-stage__message"><div className="finale-stage__monogram">{WEDDING_CONFIG.monogram[language]}</div><h2 className={isTamil ? 'finale-stage__title finale-stage__title--ta' : 'finale-stage__title'}>{t('finale', 'message')}</h2><p className={isTamil ? 'finale-stage__copy finale-stage__copy--ta' : 'finale-stage__copy'}>{t('finale', 'wish')}</p></div>
    </div>
  </section>;
};
