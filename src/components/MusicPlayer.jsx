import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { weddingConfig } from '../config';
import './MusicPlayer.css';

const MusicPlayer = ({ autoPlay }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    if (autoPlay && audioRef.current) {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(err => {
        console.log("Autoplay blocked, waiting for interaction", err);
      });
    }
  }, [autoPlay]);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="music-player">
      <audio 
        ref={audioRef}
        src={weddingConfig.musicUrl} 
        loop
      />
      <button className="music-toggle" onClick={togglePlay} aria-label="Toggle Music">
        {isPlaying ? <Volume2 /> : <VolumeX />}
      </button>
    </div>
  );
};

export default MusicPlayer;
