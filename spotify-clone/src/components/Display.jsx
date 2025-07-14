import React, { useEffect, useRef } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import DisplayHome from './DisplayHome';
import DisplayAlbum from './DisplayAlbum';
import GenreAlbumsPage from './GenreAlbumsPage'; // ✅ Import the new component
import { albumsData } from '../assets/assets';

const Display = () => {
  const displayRef = useRef();
  const location = useLocation();
  const isAlbumPage = location.pathname.includes('album');
  const albumId = isAlbumPage ? location.pathname.slice(-1) : "";
  const bgColor = albumsData[Number(albumId)]?.bgColor;

  useEffect(() => {
    if (isAlbumPage && bgColor) {
      displayRef.current.style.background = `linear-gradient(${bgColor}, #121212)`;
    } else {
      displayRef.current.style.background = '#121212';
    }
  }, [location]);

  return (
    <div
      ref={displayRef}
      className='w-[100%] m-2 px-6 rounded bg-[#121212] text-white overflow-auto lg:w-[75%] lg:ml-0'
    >
      <Routes>
        <Route path='/' element={<DisplayHome />} />
        <Route path='/album/:id' element={<DisplayAlbum />} />
        <Route path='/' element={<GenreAlbumsPage />} /> {/* ✅ New Route */}
      </Routes>
    </div>
  );
};

export default Display;
