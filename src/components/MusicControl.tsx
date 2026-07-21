import { type FC } from 'react';
import { useAudio } from '../hooks/useAudio';
import { useTranslation } from '../hooks/useLanguage';
import { Play, Pause } from '@phosphor-icons/react';

export const MusicControl: FC = () => {
  const { isPlaying, isLoading, error, rememberedEnabled, togglePlay } = useAudio();
  const { t } = useTranslation('music');

  return (
    <button
      onClick={togglePlay}
      className={`music-control ${isPlaying ? 'music-control--playing' : ''} ${rememberedEnabled && !isPlaying ? 'music-control--remembered' : ''}`}
      disabled={error}
      aria-label={isPlaying ? t('pause') : t('play')}
      title={error ? t('unavailable') : isLoading ? t('loading') : isPlaying ? t('pause') : t('play')}
      aria-pressed={isPlaying}
    >
      {isPlaying ? <Pause size={18} weight="fill" /> : <Play size={18} weight="fill" />}
      <span className="music-label">{error ? t('unavailable') : isLoading ? t('loading') : isPlaying ? t('pause') : t('play')}</span>
    </button>
  );
};
