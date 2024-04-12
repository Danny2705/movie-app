import React, { useEffect, useState } from "react";
import Card from "../Card";
//import { fetchAnime } from '../../service.api.js/cosumet.api';
import {
  getAnimeByGenres,
  getPopularAnime,
} from "../../service.api.js/jikan.api";

const genres = [
  { title: "All", id: 0 },
  { title: "Action", id: 1 },
  { title: "Adventure", id: 2 },
  { title: "Comedy", id: 4 },
  { title: "Drama", id: 8 },
  { title: "Fantasy", id: 10 },
  { title: "School", id: 23 },
  { title: "Sport", id: 30 },
  { title: "Supernatural", id: 37 },
  { title: "Isekai", id: 62 },
];

export default function Popular() {
  const [selectedBtn, setSelectedBtn] = useState("All");
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchAnimes = async () => {
      const data = await getPopularAnime();
      setMovies(data.data);
    };
    fetchAnimes();
  }, []);

  const handleBtnClick = async (genre) => {
    setSelectedBtn(genre.title);
    if (genre.id > 0) {
      const data = await getAnimeByGenres(genre.id);
      setMovies(data.data);
    } else {
      const data = await getPopularAnime();
      setMovies(data.data);
    }
  };

  return (
    <main>
      <div className='px-[100px] pt-[120px]'>
        <h1 className='heading uppercase text-2xl relative font-medium tracking-[1px] mb-[30px]'>
          The Top Most Popular
        </h1>

        {/* Sorting Some Category of The Top Most Popular Anime */}
        <div className='flex items-center gap-4 mb-[20px] mt-[40px] max-w-full flex-wrap'>
          {genres.map((genre, i) => {
            return (
              <button
                key={i}
                className={`${
                  selectedBtn === genre.title ? "bg-[#dc143c]" : "bg-slate-900"
                } py-1 px-3 bg-[#dc143c]`}
                onClick={() => handleBtnClick(genre)}
              >
                {genre.title}
              </button>
            );
          })}
        </div>

        {/* A list of Movie Shows Here */}
        <div className='flex flex-wrap w-full justify-between gap-4 gap-y-8'>
          {movies.length === 0 ? (
            <div className='text-xl'>No movie data recorded</div>
          ) : (
            movies.map((movie, i) => (
              <div key={i} className='border max-w-[300px]'>
                <Card movie={movie} />
              </div>
            ))
          )}
        </div>
      </div>
    </main>
  );
}
