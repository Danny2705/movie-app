import React, { useState } from "react";
import "./Card.css";
//import { IoPlayOutline } from "react-icons/io5";
import { FaPlay } from "react-icons/fa";
//import { getAnimeInfo } from "../service.api.js/cosumet.api";

export default function Card({ movie }) {
  //const [movieData, setMovieData] = useState();
  // console.log(movie)
  // useEffect(() => {
  // 	const fetchData = async () => {
  // 		const data = await getAnimeInfo(movie.id);
  // 		setMovieData(data)
  // 	}
  // 	fetchData()

  // }, [])
  const [toggle, setToggle] = useState(false);
  return (
    <div
      className='movie-card relative'
      onMouseEnter={() => {
        setToggle(true);
      }}
      onMouseLeave={() => {
        setToggle(false);
      }}
    >
      <img
        src={movie.images.webp.large_image_url}
        alt='Movie'
        className='img-fluid'
        style={{
          width: "300px",
          height: "400px",
        }}
      />
      {toggle ? (
        <div className='absolute w-full top-0 h-full bg-black bg-opacity-50 flex justify-center items-center'>
          <div className='w-[70px] h-[70px] rounded-full justify-center items-center pl-2 text-main-red flex bg-transparent border-2 border-white'>
            <FaPlay size={40} />{" "}
          </div>
        </div>
      ) : (
        <div className='absolute w-full top-0 thubnail-header flex'>
          <span className='flex-[4] flex flex-col p-2 text-xl'>
            <div className=' thumbnail-name'>
              {movie.title_english}
              {movie.title &&
                !movie?.title
                  ?.toLowerCase()
                  ?.includes(movie?.title_english?.toLowerCase()) &&
                " - " + movie.title}
            </div>
            <div className='text-sm text-slate-400 max-w-[200px] truncate'>
              {movie.genres.map((genre, i) => {
                return (
                  <span key={i} className={``}>
                    {i !== 0 && ", "}
                    {genre.name}
                  </span>
                );
              })}
            </div>
          </span>
          <span className='flex-1 flex justify-center '>
            <div className='w-[70px] h-[70px] bg-opacity-65 bg-main-red rounded-full m-2 text-white text-xl flex items-center justify-center'>
              {movie.type}
            </div>
          </span>
        </div>
      )}
    </div>
  );
}
