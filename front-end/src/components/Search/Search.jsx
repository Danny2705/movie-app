import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import movieData from "../../data/movieData.json";
import { Link } from "react-router-dom";

export default function Search() {
  const [showMovies, setShowMovies] = useState(false);
  return (
    <div>
      <div className='flex items-center border-2 border-[#e9e7e7] p-1 gap-1 cursor-pointer rounded-sm w-[250px]'>
        <CiSearch onClick={() => setShowMovies(!showMovies)} />
        <input
          type='text'
          placeholder='| Search'
          className='outline-none bg-transparent text-sm text-[#ffffff] placeholder-white::placeholder font-josefin'
        />
      </div>
      {showMovies === true && (
        <div className='flex flex-col absolute z-10'>
          {movieData.map(
            (movie, index) =>
              index < 5 && (
                <div
                  key={movie.id}
                  className='w-[250px] bg-opacity-80 bg-black px-3 flex flex-col pt-2 py-2 justify-center'
                >
                  <Link to='/library'>
                    <div className='flex items-center gap-4'>
                      <img
                        src={movie.bgImg}
                        alt='Movie'
                        width={100}
                        height={50}
                      />
                      <h1 className='w-full h-full text-sm text-center'>
                        {movie.title}
                      </h1>
                    </div>
                  </Link>
                </div>
              )
          )}
        </div>
      )}
    </div>
  );
}
