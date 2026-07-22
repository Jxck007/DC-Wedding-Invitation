import { type RefObject, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from './useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

const DESKTOP_INLINE_PROPS = 'transform,opacity,visibility,position,top,left,right,bottom,width,height';

export function useMobileReveal(
  rootRef: RefObject<HTMLElement | null>,
  selectors: readonly string[],
  immediate = false,
  start = 'top 90%',
  animate = false,
): void {
  const reduced = useReducedMotion();
  const selectorKey = selectors.join('|');

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const mm = gsap.matchMedia();
    const ctx = gsap.context(() => {
      mm.add('(max-width: 1023px)', () => {
        const groups = selectorKey.split('|').flatMap((selector) => {
          const matches = Array.from(root.querySelectorAll<HTMLElement>(selector));
          return selector.includes('> *') ? [matches] : matches.map((element) => [element]);
        }).filter((group) => group.length > 0);
        const elements = groups.flat();
        if (!elements.length) return;

        gsap.set(elements, { clearProps: DESKTOP_INLINE_PROPS });
        if (!animate || reduced) return;

        const tweens = groups.map((group) => gsap.fromTo(group, {
          autoAlpha: 0,
          y: 14,
        }, {
          autoAlpha: 1,
          y: 0,
          duration: 0.55,
          ease: 'power2.out',
          clearProps: 'transform,opacity,visibility',
          scrollTrigger: {
            trigger: group[0],
            start,
            once: true,
          },
        }));

        return () => tweens.forEach((tween) => tween.kill());
      });
    }, root);

    return () => {
      ctx.revert();
      mm.revert();
    };
  }, [rootRef, selectorKey, immediate, start, animate, reduced]);
}
