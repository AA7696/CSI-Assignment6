import React from 'react'
import Navbar from './Navbar'
import { useParams } from 'react-router-dom'
import { albumsData, assets } from '../assets/assets';
import { songsData } from '../assets/assets';
import { PlayerContext } from '../context/PlayerContext.jsx';

const DisplayAlbum = () => {
    const { id } = useParams();
    const albumData = albumsData[id];
    const {playWithTrack} = React.useContext(PlayerContext);
    return (
        <>
            <Navbar />
            <div className=' mt-10 flex gap-8 flex-col md:flex-row md:items-end '>
                <img className=' w-48 rounded' src={albumData.image} alt="" />
                <div className=' flex flex-col '>
                    <p>Playlist</p>
                    <h2 className=' text-5xl font-bold mb-4 md:text-7xl'>{albumData.name}</h2>
                    <h4>{albumsData.desc}</h4>
                    <p className=' '>
                        <img className=' inline-block w-5' src={assets.spotify_logo} alt="" />
                        <b>Spotify</b>
                         {" "}1,33,247 likes
                        <b>{" "}50 songs</b>
                         {" "},about 2 hr 30 min
                    </p>

                </div>
            </div>
            <div className='grid grid-cols-3 sm:grid-cols-4 mt-10 mb-4 pl-2 text-[#a7a7a7]'>
                <p><b className='mr-4'>#</b>Title</p>
                <p>Album</p>
                <p className=' hidden sm:block'>Date Added</p>
                <img className=' m-auto w-4' src={assets.clock_icon} alt="" />

            </div>
            <hr />
            {
                songsData.map((item, index) => {
                    return (
                        <div onClick={() => playWithTrack(item.id)} key={index} className='grid grid-cols-3 sm:grid-cols-4 mt-4 mb-2 pl-2 hover:bg-[#ffffff26] cursor-pointer text-[#a7a7a7]'>
                            <p className=' text-white'>
                            <b className='mr-4'>{index + 1}</b>
                            <img className=' inline w-10 mr-5' src={item.image} alt="" />
                            {item.name}
                            </p>
                            <p className=' text-[15px] text-[#a7a7a7]'>{albumData.name}</p>
                            <p className=' hidden sm:block text-[#a7a7a7]'>5 days ago</p>
                            <p className=' text-[15px] text-center text-[#a7a7a7]'>{item.duration}</p>

                        </div>
                    )
                })
            }
        </>
    )
}

export default DisplayAlbum