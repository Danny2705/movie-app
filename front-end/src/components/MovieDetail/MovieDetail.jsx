import React, { useState } from "react";
import {
  getAnimeCharacters,
  getAnimePictures,
  getAnimeStaff,
} from "../../service.api.js/jikan.api";
import RenderMovie from "./renderMovie";
import { useSelector } from "react-redux";

const lists = ["Movie Detail", "Character", "Trailer", "Image", "Staff"];

export default function MovieDetail({ info, selected, setSelected }) {
  const [detail, setDetail] = useState([]);
  const darkMode = useSelector((state) => state.theme.darkMode);

  const handleBtnClick = async (id) => {
    if (id === "Character") {
      const data = await getAnimeCharacters(info.mal_id);
      setDetail(data.data);
    } else if (id === "Image") {
      const data = await getAnimePictures(info.mal_id);
      setDetail(data.data);
    } else if (id === "Staff") {
      const data = await getAnimeStaff(info.mal_id);
      setDetail(data.data);
    } else {
      setDetail(info);
    }
    setSelected(id);
  };

  return (
    <div className={`${darkMode ? "bg-black" : "bg-white"} mt-4`}>
      <div className='flex items-center gap-4 w-full'>
        {lists.map((list) => (
          <button
            key={list}
            className={`${
              selected === list
                ? "bg-main-red"
                : darkMode
                ? "bg-slate-900"
                : "bg-slate-500"
            } py-1 px-4`}
            onClick={() => handleBtnClick(list)}
          >
            {list}
          </button>
        ))}
      </div>
      {RenderMovie(selected, info, detail)}
    </div>
  );
}
