import React, { useEffect, useState } from 'react';

const AlbumSection = ({ genreId }) => {
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    if (genreId) {
      fetch(`http://localhost:5000/deezer/genre/${genreId}/albums`)
        .then(res => res.json())
        .then(data => setAlbums(data.data))
        .catch(err => console.error('Failed to fetch albums', err));
    }
  }, [genreId]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-3">Albums</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {albums.map((album) => (
          <div key={album.id} className="bg-gray-900 p-3 rounded hover:bg-gray-800">
            <img src={album.picture_medium || album.cover_medium} alt={album.name} className="rounded" />
            <p className="mt-2 font-semibold">{album.name || album.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AlbumSection;
