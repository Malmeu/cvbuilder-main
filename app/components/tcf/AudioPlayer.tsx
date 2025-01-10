import { useState, useRef, useEffect } from 'react';
import { Play, Pause, RotateCcw, Volume2, VolumeX } from 'lucide-react';

interface AudioPlayerProps {
  audioUrl: string;
  onComplete?: () => void;
  fallbackText?: string; // Texte à lire si l'audio n'est pas disponible
}

export default function AudioPlayer({ audioUrl, onComplete, fallbackText }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.addEventListener('loadedmetadata', () => {
        setDuration(audioRef.current?.duration || 0);
      });

      audioRef.current.addEventListener('timeupdate', () => {
        const progress = (audioRef.current?.currentTime || 0) / (audioRef.current?.duration || 1) * 100;
        setProgress(progress);
        
        if (progress >= 100 && onComplete) {
          onComplete();
        }
      });

      audioRef.current.addEventListener('ended', () => {
        setIsPlaying(false);
        setProgress(0);
      });

      audioRef.current.addEventListener('error', () => {
        setError("L'audio n'est pas disponible pour le moment");
      });
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, [onComplete]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        // Si nous avons une erreur et un texte de secours, utiliser la synthèse vocale
        if (error && fallbackText && 'speechSynthesis' in window) {
          const utterance = new SpeechSynthesisUtterance(fallbackText);
          utterance.lang = 'fr-FR';
          utterance.onend = () => {
            setIsPlaying(false);
            if (onComplete) onComplete();
          };
          window.speechSynthesis.speak(utterance);
        } else {
          audioRef.current.play();
        }
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const restart = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      setProgress(0);
      if (isPlaying) {
        audioRef.current.play();
      }
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="w-full max-w-md mx-auto bg-base-200 rounded-xl p-4 shadow-lg">
      <audio ref={audioRef} src={audioUrl} preload="metadata" />
      
      {error && (
        <div className="text-sm text-warning mb-2">
          {error}
          {fallbackText && (
            <span className="ml-1">
              (utilisation de la synthèse vocale du navigateur)
            </span>
          )}
        </div>
      )}

      {/* Barre de progression */}
      <div className="w-full bg-base-300 rounded-full h-2 mb-4">
        <div
          className="bg-primary h-2 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Contrôles */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={togglePlay}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-primary text-primary-content hover:bg-primary/90 transition-colors"
          >
            {isPlaying ? (
              <Pause className="w-5 h-5" />
            ) : (
              <Play className="w-5 h-5" />
            )}
          </button>
          <button
            onClick={restart}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-base-300 text-base-content hover:bg-base-300/80 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          <button
            onClick={toggleMute}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-base-300 text-base-content hover:bg-base-300/80 transition-colors"
          >
            {isMuted ? (
              <VolumeX className="w-4 h-4" />
            ) : (
              <Volume2 className="w-4 h-4" />
            )}
          </button>
        </div>

        {/* Temps */}
        <div className="text-sm font-mono">
          {formatTime((audioRef.current?.currentTime || 0))} / {formatTime(duration)}
        </div>
      </div>
    </div>
  );
}
