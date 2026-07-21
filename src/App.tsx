import { type FC, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { LanguageProvider, useLanguage } from './hooks/useLanguage';
import { AudioProvider } from './hooks/useAudio';
import { SiteHeader } from './components/SiteHeader';
import { IntroCover } from './components/IntroCover';
import { HeroSection } from './components/HeroSection';
import { BrideSection } from './components/BrideSection';
import { GroomSection } from './components/GroomSection';
import { TheirJourney } from './components/TheirJourney';
import { FloralDivider } from './components/FloralDivider';
import { ReceptionDetails } from './components/ReceptionDetails';
import { Countdown } from './components/Countdown';
import { VenueSection } from './components/VenueSection';
import { BlessingMessage } from './components/BlessingMessage';
import { DesktopFinale } from './components/DesktopFinale';
import { MobileFinale } from './components/MobileFinale';
import { Footer } from './components/Footer';
import { WEDDING_CONFIG } from './wedding/config';

gsap.registerPlugin(ScrollTrigger);

const AppContent: FC = () => {
  const { language, t } = useLanguage();

  useEffect(() => {
    let active = true;
    const refresh = () => { if (active) ScrollTrigger.refresh(); };
    const pendingImages = Array.from(document.images).filter((image) => !image.complete);
    pendingImages.forEach((image) => {
      image.addEventListener('load', refresh, { once: true });
      image.addEventListener('error', refresh, { once: true });
    });
    void document.fonts?.ready.then(refresh);
    window.addEventListener('load', refresh, { once: true });
    requestAnimationFrame(refresh);

    return () => {
      active = false;
      pendingImages.forEach((image) => {
        image.removeEventListener('load', refresh);
        image.removeEventListener('error', refresh);
      });
      window.removeEventListener('load', refresh);
    };
  }, []);

  useEffect(() => {
    const frame = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(frame);
  }, [language]);

  useEffect(() => () => {
    ScrollTrigger.getAll().forEach((st) => st.kill());
  }, []);

  return (
    <div className="app" data-language={language}>
      <SiteHeader />

      <main className="app-main">
        <IntroCover />
        <section className="countdown-section countdown-section--early" aria-label={t('countdown', 'title')}>
          <div className="countdown-section__bg"><img src={WEDDING_CONFIG.assets.backgrounds.paperTexture} alt="" className="countdown-section__texture" aria-hidden="true" /></div>
          <div className="countdown-section__container"><p className="eyebrow countdown-section__eyebrow"><img src={WEDDING_CONFIG.assets.icons.countdown} alt="" aria-hidden="true" />{t('countdown', 'title')}</p><Countdown /></div>
        </section>
        <HeroSection />
        <BrideSection />
        <FloralDivider variant="simple" />
        <GroomSection />
        <TheirJourney />
        <ReceptionDetails />
        <VenueSection />
        <BlessingMessage />

        {/* Desktop Finale - hidden on mobile/tablet */}
        <div className="finale-desktop-only">
          <DesktopFinale />
        </div>

        {/* Mobile Finale - hidden on desktop */}
        <div className="finale-mobile-only">
          <MobileFinale />
        </div>

        <Footer />
      </main>
    </div>
  );
};

const App: FC = () => {
  return (
    <LanguageProvider>
      <AudioProvider>
        <AppContent />
      </AudioProvider>
    </LanguageProvider>
  );
};

export default App;
