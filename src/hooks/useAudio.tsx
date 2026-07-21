import { createContext, useContext } from 'react';

export interface AudioContextType {
  isPlaying: boolean;
  isLoading: boolean;
  error: boolean;
  rememberedEnabled: boolean;
  togglePlay: () => Promise<void>;
}

export const AudioContext = createContext<AudioContextType | undefined>(undefined);

export function useAudio() {
  const context = useContext(AudioContext);
  if (!context) throw new Error('useAudio must be used within an AudioProvider');
  return context;
}
