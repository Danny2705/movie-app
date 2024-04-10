import React, { useState } from "react";
// import bgImg from "../../../public/assets/jjk.jpg";
import Navbar from "../../components/Navbar/Navbar";
import movieData from "../../data/movieData.json";
import VideoPlayer from "../../components/VideoPlayer/VideoPlayer";
import { FaPlay } from "react-icons/fa";
import SwiperImage from "../../components/SwiperImage";

export default function Home() {
  const [isVideoVisible, setIsVideoVisible] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);

  const openVideo = (videoSrc) => {
    setSelectedVideo(videoSrc);
    setIsVideoVisible(true);
  };

  const closeVideo = () => {
    setSelectedVideo(null);
    setIsVideoVisible(false);
  };

  const movie = movieData[1];
  const embeddedUrl = movie.video.replace("watch?v=", "embed/");

  return (
    <div className='home'>
      <Navbar />
      <div className='movie'>
        <img
          src='/assets/jjk.jpg'
          alt='Background Img'
          className='bgImg active'
        />
        <div className='relative z-10 flex flex-col gap-3'>
          <h1 className='text-5xl font-josefin'>{movie.title}</h1>
          <div className='flex items-center gap-2'>
            <span className='border px-1'>{movie.year} </span>
            <span className='border px-1 bg-[#DC143C]'>{movie.ageLimit} </span>
            <span className='border px-1'>{movie.length} </span>
            <span className='border px-1'>{movie.category}</span>
          </div>

          <p className='max-w-[500px] text-[grey] font-medium'>
            {movie.description}
          </p>

          <button className='w-fit bg-[#DC143C] hover:bg-[#da3354] duration-150 py-1 px-2'>
            Add to List
          </button>
        </div>

        <div className='relative z-10 flex flex-col justify-center items-center gap-3 h-full'>
          <h1 className='shadow-txt text-6xl uppercase font-extrabold opacity-70 max-w-[300px] text-center tracking-wider'>
            On {movie.date}
          </h1>

          <div className='flex items-center gap-4'>
            <button
              onClick={() => openVideo(embeddedUrl)}
              className='border rounded-full text-2xl p-4 flex items-center justify-center text-[#DC143C] shadow-[#DC143C] shadow-xl'
            >
              <FaPlay />
            </button>
            <span>Watch Trailer</span>
          </div>
        </div>
      </div>
      <SwiperImage />
      {isVideoVisible && (
        <VideoPlayer
          videoSrc={selectedVideo}
          isVisible={isVideoVisible}
          onClose={closeVideo}
        />
      )}
    </div>
  );
}
