import { type FC, useState } from 'react';
import { Copy, NavigationArrow } from '@phosphor-icons/react';
import { useTranslation } from '../hooks/useLanguage';

interface VenueActionsProps { directionsUrl: string; address: string }

export const VenueActions: FC<VenueActionsProps> = ({ directionsUrl, address }) => {
  const { t } = useTranslation('venue');
  const [copied, setCopied] = useState(false);
  const copyAddress = async () => {
    try { await navigator.clipboard.writeText(address); }
    catch { const textarea = document.createElement('textarea'); textarea.value = address; document.body.appendChild(textarea); textarea.select(); document.execCommand('copy'); textarea.remove(); }
    setCopied(true); window.setTimeout(() => setCopied(false), 2000);
  };
  return <div className="venue-actions">
    <a href={directionsUrl} target="_blank" rel="noopener noreferrer" className="venue-actions__btn venue-actions__btn--primary" aria-label={t('getDirections')}><NavigationArrow size={19} aria-hidden="true" />{t('getDirections')}</a>
    <button type="button" onClick={copyAddress} className="venue-actions__btn venue-actions__btn--secondary" aria-label={copied ? t('copied') : t('copyAddress')}><Copy size={18} aria-hidden="true" />{copied ? t('copied') : t('copyAddress')}</button>
  </div>;
};
