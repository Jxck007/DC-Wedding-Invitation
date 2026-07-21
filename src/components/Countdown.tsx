import { useEffect, useMemo, useState, type FC } from 'react';
import { useTranslation } from '../hooks/useLanguage';

type EventKey = 'reception' | 'wedding';
type TimeLeft = { days: number; hours: number; minutes: number; seconds: number };
const EVENTS = { reception: new Date('2026-08-22T18:30:00+05:30'), wedding: new Date('2026-08-23T09:00:00+05:30') };
const WEDDING_END = new Date('2026-08-23T10:00:00+05:30');
const empty: TimeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };
const getTimeLeft = (target: Date): TimeLeft => { const diff = target.getTime() - Date.now(); return diff <= 0 ? empty : { days: Math.floor(diff / 86400000), hours: Math.floor(diff / 3600000 % 24), minutes: Math.floor(diff / 60000 % 60), seconds: Math.floor(diff / 1000 % 60) }; };

export const Countdown: FC = () => {
  const { t } = useTranslation('countdown');
  const initial = Date.now() >= EVENTS.reception.getTime() ? 'wedding' : 'reception';
  const [selected, setSelected] = useState<EventKey>(initial);
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => { const timer = window.setInterval(() => setNow(Date.now()), 1000); return () => window.clearInterval(timer); }, []);
  useEffect(() => { if (now >= EVENTS.reception.getTime() && now < WEDDING_END.getTime()) setSelected('wedding'); }, [now]);
  const justMarried = now >= WEDDING_END.getTime();
  const timeLeft = useMemo(() => getTimeLeft(EVENTS[selected]), [selected, now]);
  const receptionComplete = selected === 'reception' && now >= EVENTS.reception.getTime();
  if (justMarried) return <div className="countdown countdown--past"><p className="countdown__celebrated">{t('justMarried')}</p></div>;
  return <div className="countdown">
    <div className="countdown__toggle" role="group" aria-label={t('title')}>
      {(['reception', 'wedding'] as EventKey[]).map((event) => <button type="button" key={event} className={selected === event ? 'is-selected' : ''} onClick={() => setSelected(event)}>{t(event)}</button>)}
    </div>
    {receptionComplete ? <p className="countdown__celebrated">{t('receptionCelebrated')}</p> : <div className="countdown__grid" key={selected}>
      {([{ unit: 'days', value: timeLeft.days }, { unit: 'hours', value: timeLeft.hours }, { unit: 'minutes', value: timeLeft.minutes }, { unit: 'seconds', value: timeLeft.seconds }] as const).map(({ unit, value }) => <div key={unit} className="countdown__item"><span className="countdown__value">{String(value).padStart(2, '0')}</span><span className="countdown__label">{t(unit)}</span></div>)}
    </div>}
  </div>;
};
