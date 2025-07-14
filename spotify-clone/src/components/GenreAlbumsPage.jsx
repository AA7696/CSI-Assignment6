// src/components/GenreAlbumsPage.jsx
import React, { useState } from 'react';
import Navbar from './Navbar';
import GenreSection from './GenreSection';
import AlbumSection from './AlbumSection';

const GenreAlbumsPage = () => {
  const [selectedGenreId, setSelectedGenreId] = useState(null);

  return (
    <div>
      <Navbar />
      <GenreSection onSelectGenre={setSelectedGenreId} />
      {selectedGenreId && <AlbumSection genreId={selectedGenreId} />}
    </div>
  );
};

export default GenreAlbumsPage;
