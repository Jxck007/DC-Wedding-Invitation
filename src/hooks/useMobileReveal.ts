import { type RefObject, useEffect } from 'react';
import { gsap } from 'gsap';
import { useReducedMotion } from './useReducedMotion';

const DESKTOP_INLINE_PROPS = 'transform,opacity,visibility,position,top,left,right,bottom,width,height';

export function useMobileReveal(
  rootRef: RefObject<HTMLElement | null>,
  selectors: readonly string[],
  immediate = false,
  start = 'top 90%',
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
        if (reduced) return;

        const reveal = {
          autoAlpha: 1,
          y: 0,
          duration: immediate ? 0.55 : 0.62,
          stagger: 0.08,
          ease: 'power2.out',
          clearProps: 'transform,opacity,visibility',
        } as const;

        if (immediate) {
          gsap.fromTo(elements, { autoAlpha: 0, y: 12 }, reveal);
          return;
        }

        const startPercent = Number.parseFloat(start.match(/(\d+)%/)?.[1] ?? '90');
        const bottomMargin = Math.min(18, Math.max(4, 100 - startPercent));
        const observers = groups.map((group) => {
          gsap.set(group, { autoAlpha: 0, y: 14 });
          const observer = new IntersectionObserver(([entry]) => {
            if (!entry.isIntersecting) return;
            gsap.to(group, reveal);
            observer.disconnect();
          }, { rootMargin: `0px 0px -${bottomMargin}% 0px`, threshold: .04 });
          observer.observe(group[0]);
          return observer;
        });

        return () => observers.forEach((observer) => observer.disconnect());
      });
    }, root);

    return () => {
      ctx.revert();
      mm.revert();
    };
  }, [rootRef, selectorKey, immediate, start, reduced]);
}
