import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import { AudioContext } from '../hooks/useAudio';
import { WEDDING_CONFIG } from '../wedding/config';

const MUSIC_PREFERENCE_KEY = 'wedding-music-enabled';

export function AudioProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const userEnabledRef = useRef(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [rememberedEnabled] = useState(() => sessionStorage.getItem(MUSIC_PREFERENCE_KEY) === 'true');

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.loop = true;
    audio.volume = 0.28;
    const debug = () => {
      if (import.meta.env.DEV) console.debug({ musicSrc: audio.currentSrc || WEDDING_CONFIG.assets.audio, readyState: audio.readyState, networkState: audio.networkState, error: audio.error });
    };
    const onCanPlay = () => { setIsLoading(false); debug(); };
    const onPlaying = () => { setIsPlaying(true); setIsLoading(false); setError(false); };
    const onPause = () => setIsPlaying(false);
    const onWaiting = () => { if (userEnabledRef.current && !audio.paused) setIsLoading(true); };
    const onStalled = () => { if (userEnabledRef.current) setIsLoading(true); };
    const onError = () => {
      setIsPlaying(false);
      setIsLoading(false);
      setError(true);
      debug();
      if (import.meta.env.DEV) console.error({ code: audio.error?.code, message: audio.error?.message, src: audio.currentSrc || WEDDING_CONFIG.assets.audio, networkState: audio.networkState, readyState: audio.readyState });
    };
    const onEnded = () => {
      if (!userEnabledRef.current) return;
      audio.currentTime = 0;
      void audio.play().catch(() => undefined);
    };
    audio.addEventListener('canplay', onCanPlay);
    audio.addEventListener('playing', onPlaying);
    audio.addEventListener('pause', onPause);
    audio.addEventListener('waiting', onWaiting);
    audio.addEventListener('stalled', onStalled);
    audio.addEventListener('error', onError);
    audio.addEventListener('ended', onEnded);
    audio.load();
    return () => {
      audio.pause();
      audio.removeEventListener('canplay', onCanPlay);
      audio.removeEventListener('playing', onPlaying);
      audio.removeEventListener('pause', onPause);
      audio.removeEventListener('waiting', onWaiting);
      audio.removeEventListener('stalled', onStalled);
      audio.removeEventListener('error', onError);
      audio.removeEventListener('ended', onEnded);
    };
  }, []);

  const togglePlay = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio || error) return;
    if (!audio.paused) {
      userEnabledRef.current = false;
      sessionStorage.setItem(MUSIC_PREFERENCE_KEY, 'false');
      audio.pause();
      return;
    }
    userEnabledRef.current = true;
    setIsLoading(true);
    try {
      await audio.play();
      sessionStorage.setItem(MUSIC_PREFERENCE_KEY, 'true');
    } catch (reason) {
      userEnabledRef.current = false;
      setIsLoading(false);
      if (import.meta.env.DEV) console.warn('Wedding music playback was blocked:', reason);
    }
  }, [error]);

  return <AudioContext.Provider value={{ isPlaying, isLoading, error, rememberedEnabled, togglePlay }}><audio ref={audioRef} src={WEDDING_CONFIG.assets.audio} preload="auto" playsInline loop />{children}</AudioContext.Provider>;
}
