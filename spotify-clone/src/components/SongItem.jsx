import React, { useContext } from 'react';
import { PlayerContext } from '../context/PlayerContext';

const SongItem = ({ track, index }) => {
  const { playWithTrack } = useContext(PlayerContext);
  return (
    <div
      onClick={() => playWithTrack(index)}
      className="bg-zinc-800 p-3 rounded hover:bg-zinc-700 cursor-pointer transition"
    >
      <img src={track.album.cover_medium} alt={track.title} className="rounded mb-2" />
      <p className="font-semibold truncate">{track.title}</p>
      <p className="text-sm text-gray-400 truncate">{track.artist.name}</p>
    </div>
  );
};

export default SongItem;
