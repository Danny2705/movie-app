import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import {
  getScheduleAnime,
  getScheduleAnimeByDay,
} from "../../service.api.js/jikan.api";
import Card from "../../components/Card";
import { Link } from "react-router-dom";
const days = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
];

export default function SchedulePage() {
  const [scroll, setScroll] = useState(0);
  const [schedules, setSchedules] = useState([]);
  const [selectBtn, setSelectBtn] = useState("Show All");

  const handleBtnClick = async (day) => {
    setSelectBtn(day);
    const data = await getScheduleAnimeByDay(day);
    setSchedules(data.data);
  };

  const handleShowAll = async () => {
    const data = await getScheduleAnime();
    setSelectBtn("Show All");
    setSchedules(data.data);
  };

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
    const fetchAnimes = async () => {
      const data = await getScheduleAnime();
      console.log(data);
      setSchedules(data.data);
    };
    fetchAnimes();
  }, []);
  return (
    <div className='px-[100px] py-20'>
      <Navbar scroll={scroll} />
      <div className='flex flex-col gap-4'>
        <div className='flex items-center w-full flex-wrap gap-2 mt-[80px]'>
          <button
            className={`${
              selectBtn === "Show All" ? "bg-main-red" : "bg-slate-900"
            } hover:bg-secondary-hover duration-500 px-3 py-1`}
            onClick={handleShowAll}
          >
            Show All
          </button>

          {days.map((day) => (
            <button
              key={day}
              className={`${
                selectBtn === day ? "bg-main-red" : "bg-slate-900"
              } hover:bg-secondary-hover duration-500 px-3 py-1 rounded-md`}
              onClick={() => handleBtnClick(day)}
            >
              {day.charAt(0).toUpperCase() + day.slice(1)}
            </button>
          ))}
        </div>

        <div className='flex flex-wrap w-full justify-between gap-4 gap-y-8'>
          {schedules.length === 0 ? (
            <div className='text-xl h-[100vh]'>Loading ...</div>
          ) : (
            schedules.map((schedule, i) => (
              <Link
                key={i}
                to={`/library/title/${schedule.title}/${schedule.mal_id}`}
              >
                <div className='border max-w-[300px]'>
                  {<Card movie={schedule} />}
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
