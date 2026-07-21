import { type FC, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../hooks/useLanguage';
import { WEDDING_CONFIG } from '../wedding/config';
import { VenueActions } from './VenueActions';

gsap.registerPlugin(ScrollTrigger);

export const WeddingDetails: FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const { t, language } = useLanguage();
  const isTamil = language === 'ta';

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    if (!section || !content) return;

    const ctx = gsap.context(() => {
      gsap.from(content.children, {
        y: 30,
        opacity: 0,
        stagger: 0.15,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  const handleAddToCalendar = () => {
    const event = {
      title: WEDDING_CONFIG.calendar.title[language],
      description: WEDDING_CONFIG.calendar.description[language],
      location: WEDDING_CONFIG.venue.name[language] + ', ' + WEDDING_CONFIG.venue.address[language],
      start: WEDDING_CONFIG.events.wedding.start,
      end: WEDDING_CONFIG.events.wedding.end,
    };
    const href = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&details=${encodeURIComponent(event.description)}&location=${encodeURIComponent(event.location)}&dates=${event.start}/${event.end}&ctz=Asia/Kolkata`;
    window.open(href, '_blank', 'noopener');
  };

  return (
    <section ref={sectionRef} className="wedding-details-section" aria-label={t('wedding', 'title')}>
      <div className="wedding-details-section__bg" aria-hidden="true">
        <div className="wedding-details-section__pattern" />
      </div>

      <div ref={contentRef} className="wedding-details-section__container">
        {/* Temple lamp icon */}
        <div className="wedding-details-section__lamp" aria-hidden="true">
          <svg width="40" height="60" viewBox="0 0 40 60" fill="none">
            <path d="M20 0 C25 10 30 20 30 30 C30 40 25 50 20 60 C15 50 10 40 10 30 C10 20 15 10 20 0" fill="var(--gold)" opacity="0.3" />
            <rect x="17" y="5" width="6" height="20" rx="3" fill="var(--gold)" opacity="0.15" />
          </svg>
        </div>

        <h2 className={`wedding-details-section__title ${isTamil ? 'wedding-details-section__title--ta' : ''}`}>
          {t('wedding', 'title')}
        </h2>

        {/* Muhurtham badge */}
        <div className="wedding-details-section__badge">
          <span className={`wedding-details-section__badge-text ${isTamil ? 'wedding-details-section__badge-text--ta' : ''}`}>
            {t('wedding', 'label')}
          </span>
        </div>

        <div className="wedding-details-section__info">
          <div className="wedding-details-section__row">
            <span className="wedding-details-section__row-label">
              {t('wedding', 'dateLabel')}
            </span>
            <span className={`wedding-details-section__row-value ${isTamil ? 'wedding-details-section__row-value--ta' : ''}`}>
              {WEDDING_CONFIG.events.wedding.dateLabel[language]}
            </span>
          </div>

          <div className="wedding-details-section__row">
            <span className="wedding-details-section__row-label">
              {t('wedding', 'timeLabel')}
            </span>
            <span className={`wedding-details-section__row-value ${isTamil ? 'wedding-details-section__row-value--ta' : ''}`}>
              {WEDDING_CONFIG.events.wedding.time[language]}
            </span>
          </div>

          <div className="wedding-details-section__row">
            <span className="wedding-details-section__row-label">
              {t('wedding', 'venueLabel')}
            </span>
            <span className={`wedding-details-section__row-value ${isTamil ? 'wedding-details-section__row-value--ta' : ''}`}>
              {WEDDING_CONFIG.venue.name[language]}
            </span>
          </div>

          <p className={`wedding-details-section__address ${isTamil ? 'wedding-details-section__address--ta' : ''}`}>
            {WEDDING_CONFIG.venue.address[language]}
          </p>
        </div>

        <div className="wedding-details-section__actions">
          <VenueActions
            directionsUrl={WEDDING_CONFIG.venue.mapUrl}
            address={WEDDING_CONFIG.venue.name[language] + ', ' + WEDDING_CONFIG.venue.address[language]}
          />
          <button
            onClick={handleAddToCalendar}
            className={`wedding-details-section__calendar-btn ${isTamil ? 'wedding-details-section__calendar-btn--ta' : ''}`}
            aria-label={t('wedding', 'addToCalendar')}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            {t('wedding', 'addToCalendar')}
          </button>
        </div>
      </div>
    </section>
  );
};
