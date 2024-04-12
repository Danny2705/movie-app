import React, { useEffect, useState } from "react";
import { FaPlay } from "react-icons/fa";
import { getAnimeRelations } from "../service.api.js/jikan.api";

export default function RightMovie({ id }) {
  const [animeRelations, setAnimeRelations] = useState([]);

  useEffect(() => {
    const fetchAnimeId = async () => {
      const data = await getAnimeRelations(id);
      console.log(data.data);
      setAnimeRelations(data.data);
    };
    fetchAnimeId();
  }, [id]);
  return (
    <div className='min-h-[100vh] w-[420px] p-4 flex flex-col gap-3'>
      <h1 className='border-b border-[#b5e745] pb-1'>
        Don't know what <span className='font-josefin'>Anime</span> to watch?
      </h1>

      <button className='py-1 px-2 bg-main-red flex items-center gap-2 w-fit duration-500 hover:bg-[#da3354]'>
        <FaPlay />
        Watch Randomly
      </button>

      <div className='mt-[30px]'>
        <h2 className='uppercase font-josefin border-b border-[#b5e745]'>
          Anime Relations
        </h2>

        <div>
          {animeRelations.map((anime) => (
            <div key={anime.mal_id} className=''>
              <h1 className='text-white'>{anime.entry.title}</h1>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
