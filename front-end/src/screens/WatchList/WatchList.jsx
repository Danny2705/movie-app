import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import Navbar from "../../components/Navbar/Navbar";
import { Link } from "react-router-dom";
import Card from "../../components/Card";

const WatchList = () => {
  const user = useSelector((state) => state.auth.user);
  const darkMode = useSelector((state) => state.theme.darkMode);
  console.log(user);
  const [scroll, setScroll] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    window.addEventListener("scroll", () => {
      setScroll(window.scrollY);
    });
    return () => {
      window.removeEventListener("scroll", () => {
        setScroll(window.scrollY);
      });
    };
  }, []);

  useEffect(() => {
    if (!user) navigate("/");
  });
  return (
    <div
      className={`${
        darkMode ? "dark-mode" : "light-mode"
      } px-[100px] pt-[20px] min-h-[100vh]`}
    >
      <Navbar scroll={scroll} />
      <div className='mt-[80px] flex flex-col gap-4'>
        <div>
          <h4 className='text-[13px] cursor-pointer w-fit'>
            <Link to='/' className='hover:text-[grey] duration-500'>
              Home
            </Link>{" "}
            /{" "}
            <span className='hover:text-[grey] duration-500'>
              {user?.name}'s Watch List
            </span>{" "}
          </h4>
          <h1 className='heading uppercase text-2xl relative font-medium tracking-[1px] mb-[30px]'>
            {user?.name}'s Watch list
          </h1>
        </div>
      </div>
      <div className='flex flex-wrap w-full max-h-[1000px] no-scroll relative overflow-y-hidden justify-between gap-4 gap-y-8'>
        {user?.watchlist.length === 0 ? (
          <div>No movie data recorded</div>
        ) : (
          user?.watchlist.map(
            (movie, i) =>
              movie.popularity > 0 && (
                <div className='border max-w-[300px]' key={i}>
                  {<Card movie={movie} />}
                </div>
              )
          )
        )}
      </div>
    </div>
  );
};

export default WatchList;
