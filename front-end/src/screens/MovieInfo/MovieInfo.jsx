import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { getAnimeById } from "../../service.api.js/jikan.api";
import View from "../../components/View";
import RightMovie from "../../components/RightMovie";
import MovieDetail from "../../components/MovieDetail/MovieDetail";

export default function MovieInfo() {
  const params = useParams();
  const [scroll, setScroll] = useState(0);
  const [animeInfo, setAnimeInfo] = useState([]);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      setScroll(window.scrollY);
    });
    return () => {
      window.removeEventListener("scroll", () => {
        setScroll(window.scrollY);
      });
    };
  }, [scroll]);

  useEffect(() => {
    const fetchAnimeId = async () => {
      const data = await getAnimeById(params.id);
      setAnimeInfo(data.data);
    };
    fetchAnimeId();
  }, [params.id]);

  return (
    <div className='px-[100px] min-h-[100vh] py-20'>
      <Navbar scroll={scroll} />
      <div className='mt-[80px] flex flex-col gap-4'>
        <h4 className='text-[13px] cursor-pointer w-fit'>
          <Link to='/' className='hover:text-[grey] duration-500'>
            Home
          </Link>{" "}
          /{" "}
          <span className='hover:text-[grey] duration-500'>
            {params.title} / Info
          </span>
        </h4>
        <h1 className='bg-main-red w-fit px-2 py-1 text-lg rounded-t-md'>
          Anime Information
        </h1>

        {animeInfo.length === 0 ? (
          <div>Loading...</div>
        ) : (
          <div className='flex items-start flex-wrap w-full gap-10'>
            <div>
              <div className='flex gap-4'>
                <img
                  src={animeInfo.images?.webp.large_image_url}
                  alt={animeInfo.title}
                  style={{
                    width: "300px",
                    height: "400px",
                  }}
                />
                <div className='flex flex-col justify-start gap-2'>
                  <div>
                    <h1 className='text-2xl text-main-red font-josefin max-w-[550px]'>
                      {animeInfo.title} / {animeInfo.title_english} /{" "}
                      {animeInfo.title_japanese}
                    </h1>
                    <h2>{animeInfo.type}</h2>
                    <div
                      className='description-container max-w-[550px] border-b-[0.5px] border-[grey] pr-2 pb-2'
                      style={{ maxHeight: "200px", overflowY: "auto" }}
                    >
                      <p className='text-[grey] text-sm'>
                        {animeInfo.synopsis}
                      </p>
                    </div>
                    <div>
                      <View info={animeInfo} />
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <MovieDetail info={animeInfo} />
              </div>
            </div>

            <div className='flex items-start bg-[#0f1416] justify-end'>
              <RightMovie id={params.id} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
