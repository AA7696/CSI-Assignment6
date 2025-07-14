import React, { useContext } from 'react';
import { PlayerContext } from '../context/PlayerContext';
import SongItem from './SongItem';

const DisplayHome = () => {
  const { songs } = useContext(PlayerContext);

  return (
    <div className="p-6 overflow-auto">
      <h1 className="text-2xl font-bold mb-4">🎧 Today's Biggest Hits</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {songs.map((track, index) => (
          <SongItem key={track.id} track={track} index={index} />
        ))}
      </div>
    </div>
  );
};

export default DisplayHome;
