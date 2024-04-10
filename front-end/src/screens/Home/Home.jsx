import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import movieData from "../../data/movieData.json";
import VideoPlayer from "../../components/VideoPlayer/VideoPlayer";
import { FaPlay } from "react-icons/fa";
import SwiperImage from "../../components/SwiperImage";

export default function Home({ scroll }) {
  const [isVideoVisible, setIsVideoVisible] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [backgroundImage, setBackgroundImage] = useState(
    "../../assets/jjk.jpg"
  );
  const [selectedMovie, setSelectedMovie] = useState(movieData[1]);

  const openVideo = (videoSrc) => {
    setSelectedVideo(videoSrc);
    setIsVideoVisible(true);
  };

  const closeVideo = () => {
    setSelectedVideo(null);
    setIsVideoVisible(false);
  };

  const handleImageClick = (imageUrl) => {
    const clickedMovie = movieData.find((movie) => movie.bgImg === imageUrl);
    if (clickedMovie) {
      setBackgroundImage(clickedMovie.bgImg);
      setSelectedMovie(clickedMovie);
    }
  };

  const embeddedUrl = selectedMovie.video.replace("watch?v=", "embed/");

  return (
    <div className='home'>
      <Navbar scroll={scroll} />
      <div className='movie'>
        <img
          src={backgroundImage}
          alt='Background Img'
          className='bgImg active'
        />
        <div className='relative z-10 flex flex-col gap-3'>
          <h1 className='text-5xl font-josefin'>{selectedMovie.title}</h1>
          <div className='flex items-center gap-2'>
            <span className='border px-1'>{selectedMovie.year} </span>
            <span className='border px-1 bg-[#DC143C]'>
              {selectedMovie.ageLimit}{" "}
            </span>
            <span className='border px-1'>{selectedMovie.length} </span>
            <span className='border px-1'>{selectedMovie.category}</span>
          </div>

          <p className='max-w-[500px] text-[grey] font-medium'>
            {selectedMovie.description}
          </p>

          <button className='w-fit bg-[#DC143C] hover:bg-[#da3354] duration-150 py-1 px-2'>
            Add to List
          </button>
        </div>

        <div className='relative z-10 flex flex-col justify-start items-center gap-3'>
          <h1
            key={selectedMovie.title}
            className='shadow-txt text-6xl uppercase font-extrabold opacity-90 max-w-[300px] text-center tracking-wider'
          >
            On {selectedMovie.date}
          </h1>

          <div className='flex items-center gap-4'>
            <button
              onClick={() => openVideo(embeddedUrl)}
              className='vid-player border rounded-full text-2xl p-4 flex items-center justify-center text-[#DC143C] shadow-[#DC143C] shadow-xl'
            >
              <FaPlay />
            </button>
            <span>Watch Trailer</span>
          </div>
        </div>
      </div>
      <SwiperImage onImageClick={handleImageClick} />
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
