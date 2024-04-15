import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import letters from "../../data/letterData.json";
import { getAllAnime, getAnimeByLetter } from "../../service.api.js/jikan.api";
import Card from "../../components/Card";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Pagination from "../../components/Pagination/Pagination";

export default function LibraryPage() {
  const [scroll, setScroll] = useState(0);
  const [selectBtn, setSelectBtn] = useState("Show All");
  const [moviesLetter, setMoviesLetter] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

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
    const fetchAnimes = async () => {
      const pathname = location.pathname.split("/");
      setSelectBtn(pathname[2] === "ShowAll" ? "Show All" : pathname[2]);
      if (pathname[2] === "ShowAll") {
        const data = await getAllAnime();
        setMoviesLetter(data.data);
      } else {
        const data = await getAnimeByLetter(pathname[2]);
        setMoviesLetter(data.data);
      }
    };
    fetchAnimes();
  }, [location.pathname]);

  const handleBtnClick = async (letter) => {
    setSelectBtn(letter);
    const data = await getAnimeByLetter(letter);
    setMoviesLetter(data.data);

    navigate(`/library/${letter}`);
  };

  const handleShowAll = async () => {
    const data = await getAllAnime();
    setSelectBtn("Show All");
    setMoviesLetter(data.data);
    navigate(`/library/ShowAll`);
  };

  return (
    <div className='px-[100px] min-h-[100vh] py-20'>
      <Navbar scroll={scroll} />
      <div className='mt-[80px] flex flex-col gap-4'>
        <div>
          <h4 className='text-[13px] cursor-pointer w-fit'>
            <Link to='/' className='hover:text-[grey] duration-500'>
              Home
            </Link>{" "}
            / <span className='hover:text-[grey] duration-500'>A - Z list</span>{" "}
            /{" "}
            <span className='hover:text-[grey] duration-500'>{selectBtn}</span>
          </h4>
          <h1 className='bg-main-red w-fit px-2 py-1 text-lg rounded-t-md'>
            Anime Library
          </h1>
        </div>

        <div className='flex items-center w-full justify-between flex-wrap gap-2'>
          <button
            className={`${
              selectBtn === "Show All" ? "bg-main-red" : "bg-slate-900"
            } hover:bg-secondary-hover duration-500 px-3 py-1`}
            onClick={handleShowAll}
          >
            Show All
          </button>
          {letters.map((letter) => (
            <button
              key={letter}
              className={`${
                selectBtn === letter ? "bg-main-red" : "bg-slate-900"
              } hover:bg-secondary-hover duration-500 px-3 py-1 rounded-md`}
              onClick={() => handleBtnClick(letter)}
            >
              <Link to={`/library/${letter}`}>{letter}</Link>
            </button>
          ))}
        </div>

        <div className='flex flex-wrap w-full justify-between gap-4 gap-y-8'>
          {moviesLetter.length === 0 ? (
            <div className='text-xl h-[100vh]'>Loading ...</div>
          ) : (
            <div className='flex flex-wrap w-full justify-between gap-4 gap-y-8'>
              {moviesLetter.map((movie, i) => (
                <Link
                  key={i}
                  to={`/library/title/${movie.title}/${movie.mal_id}`}
                >
                  <div className='border max-w-[300px]'>
                    {<Card movie={movie} />}
                  </div>
                </Link>
              ))}
            </div>
          )}
          <div className='w-full flex justify-center'>
            <Pagination
              setMoviesLetter={setMoviesLetter}
              selectedLetter={selectBtn}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
