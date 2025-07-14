import React, { useContext } from 'react';
import { PlayerContext } from './context/PlayerContext';
import Sidebar from './components/Sidebar';
import Display from './components/Display';
import Player from './components/Player';
import './App.css';

function App() {
  const { audioRef, currentTrack } = useContext(PlayerContext);

  return (
    <div className="h-screen w-screen bg-black text-white flex flex-col">
      {/* Main layout */}
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <Display />
      </div>

      {/* Bottom Player */}
      <Player />

      {/* Hidden audio element that updates per track */}
      {currentTrack?.preview && (
        <audio
          ref={audioRef}
          src={currentTrack.preview}
          preload="auto"
          controls={false}
          key={currentTrack.id} // Force re-render on track change
        />
      )}
    </div>
  );
}

export default App;
