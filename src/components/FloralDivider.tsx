import { type FC } from 'react';
import { WEDDING_CONFIG } from '../wedding/config';

interface FloralDividerProps {
  variant?: 'full' | 'simple';
}

export const FloralDivider: FC<FloralDividerProps> = ({ variant = 'full' }) => {
  return (
    <div className={`floral-divider floral-divider--${variant}`}>
      <div className="floral-divider__line" />
      <img
        src={WEDDING_CONFIG.assets.backgrounds.floralDivider}
        alt=""
        className="floral-divider__image"
        loading="lazy"
        width={120}
        height={40}
      />
      <div className="floral-divider__line" />
    </div>
  );
};
