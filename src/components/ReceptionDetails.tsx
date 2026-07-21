import { type FC, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../hooks/useLanguage';
import { WEDDING_CONFIG, type EventKey } from '../wedding/config';

gsap.registerPlugin(ScrollTrigger);

export const ReceptionDetails: FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { t, language } = useLanguage();
  const isTamil = language === 'ta';
  useEffect(() => {
    const section = sectionRef.current;
    if (!section || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => gsap.from('.events-section__card, .events-section__same-venue', {
      y: 20, opacity: 0, stagger: .1, duration: .75, ease: 'power2.out',
      scrollTrigger: { trigger: section, start: 'top 84%', once: true },
    }), section);
    return () => ctx.revert();
  }, []);

  const addToCalendar = (eventKey: EventKey) => {
    const event = WEDDING_CONFIG.events[eventKey];
    const title = eventKey === 'reception' ? t('reception', 'title') : t('wedding', 'title');
    const href = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&details=${encodeURIComponent(WEDDING_CONFIG.calendar.description[language])}&location=${encodeURIComponent(WEDDING_CONFIG.venue.name[language] + ', ' + WEDDING_CONFIG.venue.address[language])}&dates=${event.start}/${event.end}&ctz=Asia/Kolkata`;
    window.open(href, '_blank', 'noopener');
  };

  const events: { key: EventKey; title: string; date: string; time: string; add: string }[] = [
    { key: 'reception', title: t('reception', 'title'), date: WEDDING_CONFIG.events.reception.dateLabel[language], time: WEDDING_CONFIG.events.reception.time[language], add: t('reception', 'addToCalendar') },
    { key: 'wedding', title: t('wedding', 'title'), date: WEDDING_CONFIG.events.wedding.dateLabel[language], time: WEDDING_CONFIG.events.wedding.time[language], add: t('wedding', 'addToCalendar') },
  ];

  return (
    <section ref={sectionRef} id="events" className="events-section" aria-label={t('navigation', 'events')}>
      <div className="events-section__container">
        <div className="events-section__heading"><p className="eyebrow">{t('navigation', 'events')}</p><h2>{t('events', 'heading')}</h2></div>
        <div className="events-section__cards">
          {events.map((event) => (
            <article key={event.key} className="events-section__card">
              <p className="events-section__card-kicker">{event.key === 'reception' ? '01' : '02'}</p>
              <img src={event.key === 'reception' ? WEDDING_CONFIG.assets.icons.reception : WEDDING_CONFIG.assets.icons.mandap} alt="" className="events-section__event-icon" aria-hidden="true" />
              <h3 className={isTamil ? 'events-section__title--ta' : ''}>{event.title}</h3>
              <div className="events-section__row"><img src={WEDDING_CONFIG.assets.icons.celebration} alt="" /><span>{event.date}</span></div>
              <div className="events-section__row"><img src={WEDDING_CONFIG.assets.icons.time} alt="" /><span>{event.time}</span></div>
              <button type="button" className="events-section__calendar" onClick={() => addToCalendar(event.key)}><img src={WEDDING_CONFIG.assets.icons.calendar} alt="" />{event.add}</button>
            </article>
          ))}
        </div>
        <p className="events-section__same-venue">{t('events', 'sameVenue')}</p>
      </div>
    </section>
  );
};
