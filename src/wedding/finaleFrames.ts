import { WEDDING_CONFIG } from './config';

export type FinaleAltKey = 'approach' | 'journey' | 'lift' | 'final';

type FinaleFramePosition = {
  xPercent: number;
  yPx: number;
  scale: number;
};

export type FinaleFrame = {
  id: 'approach' | 'handholding' | 'lift' | 'final';
  src: string;
  altKey: FinaleAltKey;
  desktop: FinaleFramePosition & { opacityStart: number };
  mobile: FinaleFramePosition;
};

export const finaleFrames: FinaleFrame[] = [
  {
    id: 'approach',
    src: WEDDING_CONFIG.assets.scenes.runTogether,
    altKey: 'approach',
    desktop: { xPercent: -50, yPx: 14, scale: .98, opacityStart: .25 },
    mobile: { xPercent: -50, yPx: 8, scale: .98 },
  },
  {
    id: 'handholding',
    src: WEDDING_CONFIG.assets.couple.handholding,
    altKey: 'journey',
    desktop: { xPercent: -50, yPx: 10, scale: 1, opacityStart: 0 },
    mobile: { xPercent: -50, yPx: 8, scale: 1.01 },
  },
  {
    id: 'lift',
    src: WEDDING_CONFIG.assets.couple.lift,
    altKey: 'lift',
    desktop: { xPercent: -50, yPx: 18, scale: .97, opacityStart: 0 },
    mobile: { xPercent: -50, yPx: 10, scale: .99 },
  },
  {
    id: 'final',
    src: WEDDING_CONFIG.assets.couple.finalClose,
    altKey: 'final',
    desktop: { xPercent: -50, yPx: 16, scale: .99, opacityStart: 0 },
    mobile: { xPercent: -50, yPx: 8, scale: .98 },
  },
];
