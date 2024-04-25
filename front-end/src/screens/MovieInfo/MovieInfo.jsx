import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { getAnimeById } from "../../service.api.js/jikan.api";
import View from "../../components/View";
import RightMovie from "../../components/RightMovie";
import MovieDetail from "../../components/MovieDetail/MovieDetail";
import BackToTopBtn from "../../components/Navbar/BackToTopBtn";
import { useSelector } from "react-redux";

export default function MovieInfo() {
  const params = useParams();
  const [scroll, setScroll] = useState(0);
  const [animeInfo, setAnimeInfo] = useState([]);
  const [selected, setSelected] = useState("Movie Detail");
  const darkMode = useSelector((state) => state.theme.darkMode);

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
    <div
      className={`${
        darkMode ? "dark-mode" : "light-mode"
      } px-[100px] max-w-[100vw] min-h-[100vh] py-20`}
    >
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
          <div className='flex items-start justify-between flex-wrap w-full gap-10'>
            <div className='flex-[3]'>
              <div className='flex gap-4 min-w-[620px] max-w-full'>
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
                    <h1 className='text-2xl text-main-red font-josefin max-w-full'>
                      {animeInfo.title} / {animeInfo.title_english} /{" "}
                      {animeInfo.title_japanese}
                    </h1>
                    <h2>{animeInfo.type}</h2>
                    <div
                      className='description-container max-w-ful border-b-[0.5px] border-[grey] pr-2 pb-2'
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
                <MovieDetail
                  info={animeInfo}
                  selected={selected}
                  setSelected={setSelected}
                />
              </div>
            </div>
            <div className='flex-1'>
              <div
                className={`flex items-start ${
                  darkMode ? "bg-[#0f1416]" : "bg-[#ccc]"
                } justify-center`}
              >
                <RightMovie id={params.id} setSelected={setSelected} />
              </div>
            </div>
          </div>
        )}
      </div>
      <BackToTopBtn scroll={scroll} />
    </div>
  );
}
