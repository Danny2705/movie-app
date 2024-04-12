import React, { useState } from "react";
import "./Card.css";
import { FaPlay } from "react-icons/fa";

export default function Card({ movie }) {
  // console.log(movie);
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
        src={movie.image}
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
          <span className='flex-[4] p-2 text-xl thumbnail-name'>
            {movie.title}
            {movie.japaneseTitle &&
              movie.japaneseTitle !== movie.title &&
              " - " + movie.japaneseTitle}
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
