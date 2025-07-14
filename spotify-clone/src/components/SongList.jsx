import React, { useContext } from "react";
import { PlayerContext } from "../context/PlayerContext.jsx";
import SongItem from "./SongItem.jsx";

const SongList = () => {
  const { songs } = useContext(PlayerContext);

  if (!songs.length) return <p className="text-white p-4">Loading...</p>;

  return (
    <div className="flex flex-wrap justify-start">
      {songs.map((song, index) => (
        <SongItem key={song.id} song={song} index={index} />
      ))}
    </div>
  );
};

export default SongList;
