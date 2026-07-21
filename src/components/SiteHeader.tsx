import { type FC, useEffect, useRef, useState } from 'react';
import { List, X } from '@phosphor-icons/react';
import { useLanguage } from '../hooks/useLanguage';
import { WEDDING_CONFIG } from '../wedding/config';
import { LanguageSwitcher } from './LanguageSwitcher';
import { MusicControl } from './MusicControl';

export const SiteHeader: FC = () => {
  const { t, language } = useLanguage();
  const [open, setOpen] = useState(false);
  const [navVisible, setNavVisible] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const lastScrollY = useRef(0);
  const links = [
    ['home', '#home'], ['story', '#story'], ['events', '#events'], ['venue', '#venue'], ['blessings', '#blessings'],
  ] as const;
  useEffect(() => {
    const onScroll = () => {
      const currentY = window.scrollY;
      setScrolled(currentY > 12);
      setNavVisible(currentY < 120 || currentY < lastScrollY.current);
      lastScrollY.current = currentY;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <header className={`site-header ${scrolled ? 'site-header--scrolled' : ''}`} onPointerEnter={() => setNavVisible(true)} onFocusCapture={() => setNavVisible(true)}>
      <a className="site-header__monogram" href="#home" aria-label={t('navigation', 'home')}>{WEDDING_CONFIG.monogram[language]}</a>
      <div className="site-header__actions site-header__actions--visible">
      <nav className={`site-header__nav ${open ? 'site-header__nav--open' : ''} ${!navVisible && !open ? 'site-header__nav--hidden' : ''}`} aria-label={t('accessibility', 'primaryNavigation')}>
        {links.map(([key, href]) => <a key={href} href={href} onClick={() => setOpen(false)}>{t('navigation', key)}</a>)}
      </nav>
      <div className="site-header__controls"><LanguageSwitcher /><MusicControl /><button className="site-header__menu" type="button" onClick={() => setOpen((value) => !value)} aria-label={open ? t('accessibility', 'closeMenu') : t('accessibility', 'openMenu')}>{open ? <X size={19} /> : <List size={19} />}</button></div>
      </div>
    </header>
  );
};
