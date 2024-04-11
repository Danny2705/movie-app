import React, { useState } from "react";
import movieData from "../../data/movieData.json";
import Card from "../Card";

export default function Popular() {
  const [selectedBtn, setSelectedBtn] = useState("All");
  const [showCategory, setShowCategory] = useState(Object.values(movieData));
  const btnName = [
    "All",
    "Day Top View",
    "Week Top View",
    "Month Top View",
    "Year Top View",
  ];

  const handleBtnClick = (category) => {
    setSelectedBtn(category);
    if (category === "All") {
      setShowCategory(Object.values(movieData));
    } else if (category === "Day Top View") {
      const dayTopViewMovies = movieData.filter(
        (movie) => movie.title === "Jujutsu Kaisen"
      );
      setShowCategory(dayTopViewMovies);
    }
  };

  return (
    <main>
      <div className='px-[100px] pt-[120px]'>
        <h1 className='heading uppercase text-2xl relative font-medium tracking-[1px] mb-[30px]'>
          The Top Most Popular
        </h1>

        {/* Sorting Some Category of The Top Most Popular Anime */}
        <div className='flex items-center gap-4 mb-[20px] mt-[40px]'>
          {btnName.map((btn, i) => {
            return (
              <button
                key={i}
                className={`${
                  selectedBtn === btn ? "bg-[#dc143c]" : "bg-slate-900"
                } py-1 px-3 bg-[#dc143c]`}
                onClick={() => handleBtnClick(btn)}
              >
                {btn}
              </button>
            );
          })}
        </div>

        {/* A list of Movie Shows Here */}
        <div className='flex flex-wrap w-full justify-between gap-4'>
          {showCategory.length === 0 ? (
            <div>No movie data recorded</div>
          ) : (
            showCategory.map((movie, i) => (
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
