import React, { useContext, useEffect, useRef, useState } from "react";
import { PlayerContext } from "../context/PlayerContext";
import {
  SkipBack,
  SkipForward,
  Pause,
  Play,
  MonitorSpeaker,
  Search,
  ListMusic,
  Volume2,
  Maximize
} from "lucide-react";

const Player = () => {
  const {
    currentTrack,
    playStatus,
    play,
    pause,
    prev,
    next,
    audioRef,
  } = useContext(PlayerContext);

  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const formatTime = (time) => {
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const handleSeek = (e) => {
    const seekWidth = e.target.clientWidth;
    const offsetX = e.nativeEvent.offsetX;
    const seekTo = (offsetX / seekWidth) * duration;
    if (audioRef.current) {
      audioRef.current.currentTime = seekTo;
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateDuration);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateDuration);
    };
  }, [audioRef, currentTrack]);

  return (
    <div className="w-full h-[90px] bg-black text-white flex items-center justify-between px-4 border-t border-gray-800">
      {/* Left: Track Info */}
      <div className="flex items-center gap-4 w-[30%]">
        <img
          src={currentTrack?.album?.cover_small}
          alt="cover"
          className="w-14 h-14 rounded"
        />
        <div className="flex flex-col">
          <p className="text-sm font-semibold">{currentTrack?.title}</p>
          <p className="text-xs text-gray-400">{currentTrack?.artist?.name}</p>
        </div>
      </div>

      {/* Center: Controls */}
      <div className="flex flex-col items-center w-[40%]">
        <div className="flex items-center gap-5 mb-2 text-white">
          <button onClick={prev}><SkipBack size={20} /></button>
          {playStatus ? (
            <button onClick={pause} className="bg-white text-black rounded-full p-2"><Pause size={24} /></button>
          ) : (
            <button onClick={play} className="bg-white text-black rounded-full p-2"><Play size={24} /></button>
          )}
          <button onClick={next}><SkipForward size={20} /></button>
        </div>

        {/* Seek Bar */}
        <div className="flex items-center gap-2 w-full">
          <span className="text-xs text-gray-400">{formatTime(currentTime)}</span>
          <div
            className="flex-1 bg-gray-700 h-1 rounded cursor-pointer"
            onClick={handleSeek}
          >
            <div
              className="bg-white h-1 rounded"
              style={{ width: `${(currentTime / duration) * 100 || 0}%` }}
            />
          </div>
          <span className="text-xs text-gray-400">{formatTime(duration)}</span>
        </div>
      </div>

      {/* Right: Icons */}
      <div className="flex items-center gap-4 w-[30%] justify-end pr-2 text-gray-400">
        <MonitorSpeaker className="hover:text-white" />
        <Search className="hover:text-white" />
        <ListMusic className="hover:text-white" />
        <Volume2 className="hover:text-white" />
        <div className="w-24 h-1 bg-gray-600 rounded">
          <div className="h-1 bg-white w-[60%]" />
        </div>
        <Maximize className="hover:text-white" />
      </div>
    </div>
  );
};

export default Player;
