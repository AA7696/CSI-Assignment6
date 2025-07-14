import React, { createContext, useEffect, useRef, useState } from 'react';

export const PlayerContext = createContext();

const PlayerProvider = ({ children }) => {
  const [songs, setSongs] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [playStatus, setPlayStatus] = useState(false);

  const audioRef = useRef(null);
  const seekBar = useRef(null);
  const seekBg = useRef(null);

  // Fetch songs from backend API
  const fetchSongs = async () => {
    try {
      const res = await fetch('http://localhost:5000/deezer/tracks');
      const data = await res.json();
      setSongs(data.data); // Deezer wraps results inside `data` key
    } catch (err) {
      console.error("Error fetching Deezer songs", err);
    }
  };

  // Basic player controls
  const play = () => {
    audioRef.current?.play();
    setPlayStatus(true);
  };

  const pause = () => {
    audioRef.current?.pause();
    setPlayStatus(false);
  };

  const playWithTrack = (index) => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setCurrentIndex(index);
    setPlayStatus(true);
  };

  const next = () => {
    if (currentIndex < songs.length - 1) {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
      setCurrentIndex(prev => prev + 1);
      setPlayStatus(true);
    }
  };

  const prev = () => {
    if (currentIndex > 0) {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
      setCurrentIndex(prev => prev - 1);
      setPlayStatus(true);
    }
  };

  // Auto-play on index change
  useEffect(() => {
    if (songs.length && playStatus && audioRef.current) {
      audioRef.current.play();
    }
  }, [currentIndex]);

  // Auto play next song on end
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleEnded = () => {
      if (currentIndex < songs.length - 1) {
        setCurrentIndex(prev => prev + 1);
      } else {
        setPlayStatus(false);
      }
    };

    audio.addEventListener('ended', handleEnded);
    return () => audio.removeEventListener('ended', handleEnded);
  }, [currentIndex, songs]);

  // Fetch songs on load
  useEffect(() => {
    fetchSongs();
  }, []);

  const contextValue = {
    songs,
    currentTrack: songs[currentIndex],
    currentIndex,
    setCurrentIndex,
    playStatus,
    setPlayStatus,
    play,
    pause,
    playWithTrack,
    prev,
    next,
    audioRef,
    seekBar,
    seekBg
  };

  return (
    <PlayerContext.Provider value={contextValue}>
      {children}
    </PlayerContext.Provider>
  );
};

export default PlayerProvider;
