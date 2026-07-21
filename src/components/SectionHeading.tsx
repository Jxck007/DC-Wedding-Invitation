import { type FC, type ReactNode } from 'react';
import { useLanguage } from '../hooks/useLanguage';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  children?: ReactNode;
}

export const SectionHeading: FC<SectionHeadingProps> = ({
  title,
  subtitle,
  align = 'center',
  children,
}) => {
  const { language } = useLanguage();
  const isTamil = language === 'ta';

  return (
    <div className={`section-heading section-heading--${align}`}>
      {children}
      <h2
        className={`section-heading__title ${isTamil ? 'section-heading__title--ta' : ''}`}
      >
        {title}
      </h2>
      {subtitle && (
        <p className={`section-heading__subtitle ${isTamil ? 'section-heading__subtitle--ta' : ''}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
};
