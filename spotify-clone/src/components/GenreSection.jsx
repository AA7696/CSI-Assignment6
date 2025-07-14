import React, { useEffect, useState } from 'react';

const GenreSection = ({ onSelectGenre }) => {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/deezer/genres')
      .then(res => res.json())
      .then(data => setGenres(data.data))
      .catch(err => console.error('Failed to fetch genres', err));
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-3">Genres</h2>
      <div className="flex gap-4 flex-wrap">
        {genres.map((genre) => (
          <div
            key={genre.id}
            onClick={() => onSelectGenre(genre.id)}
            className="cursor-pointer p-2 px-4 rounded bg-gray-800 hover:bg-gray-700"
          >
            {genre.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GenreSection;
