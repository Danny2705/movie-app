import React, { useEffect, useState } from "react";
import Card from "../Card";
import { getUpcomingAnime } from "../../service.api.js/jikan.api";

export default function Upcoming() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchAnimes = async () => {
      const data = await getUpcomingAnime();
      setMovies(data.data);
    };
    fetchAnimes();
  }, []);

  return (
    <div className='px-[100px] min-h-full pb-[120px] w-full'>
      <h1 className='heading uppercase text-2xl relative font-medium tracking-[1px] mb-[30px]'>
        Upcoming Movies
      </h1>
      <div className='flex flex-wrap w-full max-h-[1000px] no-scroll relative overflow-y-hidden justify-between gap-4 gap-y-8'>
        {movies.length === 0 ? (
          <div>No movie data recorded</div>
        ) : (
          movies.map(
            (movie, i) =>
              i < 15 && (
                <div key={i} className='border max-w-[300px]'>
                  <Card movie={movie} type='upcoming' />
                </div>
              )
          )
        )}
        <div className='absolute w-full h-[140px] fadeToBlack bottom-0 flex justify-center items-center '>
          <div className='w-fit h-fit uppercase px-10 py-2 bg-main-red hover:bg-main-activate rounded-full mt-10 flex font-bold justify-center cursor-pointer items-center'>
            Show all
          </div>
        </div>
      </div>
    </div>
  );
}
