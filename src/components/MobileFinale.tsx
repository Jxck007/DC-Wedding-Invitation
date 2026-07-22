import { type FC, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../hooks/useLanguage';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { WEDDING_CONFIG } from '../wedding/config';
import { finaleFrames } from '../wedding/finaleFrames';

gsap.registerPlugin(ScrollTrigger);

const preloadFrame = async (src: string): Promise<boolean> => {
  const image = new Image();
  image.src = src;
  try {
    await image.decode();
  } catch {
    await new Promise<void>((resolve) => {
      if (image.complete) return resolve();
      image.addEventListener('load', () => resolve(), { once: true });
      image.addEventListener('error', () => resolve(), { once: true });
    });
  }
  return image.naturalWidth > 0;
};

export const MobileFinale: FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { t, language } = useLanguage();
  const reduced = useReducedMotion();
  const isTamil = language === 'ta';

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || reduced) return;

    let cancelled = false;
    const mm = gsap.matchMedia();
    let ctx: gsap.Context | undefined;

    void Promise.all(finaleFrames.map((frame) => preloadFrame(frame.src))).then((ready) => {
      if (cancelled) return;

      ctx = gsap.context(() => mm.add('(max-width: 1023px)', () => {
        const allFrames = gsap.utils.toArray<HTMLImageElement>(section.querySelectorAll('.mobile-finale__frame'));
        const validFrames = allFrames.filter((frame) => ready[Number(frame.dataset.frame)]);
        const arch = section.querySelector('.mobile-finale__arch');
        const petals = section.querySelector('.mobile-finale__petals');
        const copy = section.querySelector('.mobile-finale__copy');
        if (!validFrames.length || !arch || !petals || !copy) return;

        allFrames.forEach((frame, index) => {
          frame.hidden = !ready[index];
          gsap.set(frame, {
            clearProps: 'transform,opacity,visibility,width,height,top,left,right,bottom',
          });
          if (!ready[index]) return;
          const config = finaleFrames[index].mobile;
          gsap.set(frame, {
            xPercent: config.xPercent,
            y: config.yPx,
            scale: config.scale,
            autoAlpha: frame === validFrames[0] ? 1 : 0,
            transformOrigin: '50% 100%',
          });
        });

        gsap.set(arch, { opacity: .12 });
        gsap.set(petals, { opacity: .16, y: 0 });
        const timeline = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: 'bottom bottom',
            scrub: .55,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        const firstIndex = Number(validFrames[0].dataset.frame);
        const firstConfig = finaleFrames[firstIndex].mobile;
        timeline.fromTo(validFrames[0], {
          scale: firstConfig.scale - .015,
        }, {
          scale: firstConfig.scale,
          duration: .18,
        }, 0).to(petals, { y: 8, duration: .18 }, 0);

        const transitionStarts = [.18, .41, .64];
        validFrames.slice(1).forEach((frame, position) => {
          const previous = validFrames[position];
          const at = transitionStarts[position] ?? .64;
          timeline.to(previous, { autoAlpha: 0, duration: .06 }, at)
            .to(frame, { autoAlpha: 1, duration: .06 }, at + .06);
        });

        timeline.to(arch, { opacity: .17, duration: .18 }, .82)
          .to(copy, { opacity: 1, duration: .18 }, .82)
          .to({}, { duration: 1 }, 0);

        requestAnimationFrame(() => ScrollTrigger.refresh());
        return () => {
          timeline.scrollTrigger?.kill();
          timeline.kill();
        };
      }), section);
    });

    return () => {
      cancelled = true;
      ctx?.revert();
      mm.revert();
    };
  }, [reduced]);

  return <section ref={sectionRef} className={`mobile-finale ${reduced ? 'mobile-finale--reduced' : ''}`} aria-label={t('finale', 'message')}>
    <div className="mobile-finale__stage">
      <img src={WEDDING_CONFIG.assets.backgrounds.paperTexture} alt="" className="mobile-finale__texture" aria-hidden="true" />
      <div className="mobile-finale__copy">
        <h2 className={isTamil ? 'mobile-finale__title mobile-finale__title--ta' : 'mobile-finale__title'}>{t('finale', 'message')}</h2>
        <p className={isTamil ? 'mobile-finale__body mobile-finale__body--ta' : 'mobile-finale__body'}>{t('finale', 'wish')}</p>
      </div>
      <div className="mobile-finale__artwork">
        <img src={WEDDING_CONFIG.assets.icons.floralArch} alt="" className="mobile-finale__arch" aria-hidden="true" />
        {finaleFrames.map((frame, index) => <img
          key={frame.id}
          src={frame.src}
          alt={t('imageAlt', frame.altKey)}
          className="mobile-finale__frame"
          data-frame={index}
          loading={index === 0 ? 'eager' : 'lazy'}
          onError={(event) => { event.currentTarget.hidden = true; }}
        />)}
        <img src={WEDDING_CONFIG.assets.icons.petalDivider} alt="" className="mobile-finale__petals" aria-hidden="true" />
      </div>
    </div>
  </section>;
};
