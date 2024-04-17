import React, { useEffect, useState } from "react";
import { FaPlay, FaStar } from "react-icons/fa";
import { getAnimeRelations } from "../service.api.js/jikan.api";
import { Link } from "react-router-dom";

export default function RightMovie({ id, setSelected }) {
  const [animeRelations, setAnimeRelations] = useState([]);
  const [displayCount, setDisplayCount] = useState(10);

  useEffect(() => {
    const fetchAnimeId = async () => {
      const data = await getAnimeRelations(id);
      setAnimeRelations(data.data);
      setSelected("Movie Detail");
    };
    fetchAnimeId();
  }, [id, setSelected]);

  const handleShowMore = () => {
    setDisplayCount((prevCount) => prevCount + 20);
  };
  return (
    <div className='min-h-[100vh] w-full min-w-[420px] p-4 flex flex-col gap-3'>
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
          {animeRelations.slice(0, displayCount).map((anime, index) => (
            <Link
              to={`/library/title/${anime.entry.title}/${anime.entry.mal_id}`}
              key={index}
            >
              <button className='flex items-start gap-3 mt-4 bg-slate-800 p-2 w-full'>
                <img
                  src={anime.entry.images.webp.large_image_url}
                  alt='Movie'
                  width={50}
                  height={50}
                />
                <div>
                  <h1 className='text-white text-left'>{anime.entry.title}</h1>
                  <h2 className='text-main-banana flex items-center gap-1'>
                    <FaStar /> {anime.votes} Votes
                  </h2>
                </div>
              </button>
            </Link>
          ))}
        </div>

        {animeRelations.length > displayCount && (
          <button
            className='bg-main-red px-4 py-2 text-white mt-4 rounded-md'
            onClick={handleShowMore}
          >
            Show More
          </button>
        )}
      </div>
    </div>
  );
}
