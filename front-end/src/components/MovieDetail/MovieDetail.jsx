import React, { useState } from "react";
import {
  getAnimeCharacters,
  getAnimePictures,
  getAnimeStaff,
} from "../../service.api.js/jikan.api";
import { renderMovie } from "./renderMovie";

const lists = ["Movie Detail", "Character", "Trailer", "Image", "Staff"];

export default function MovieDetail({ info }) {
  const [detail, setDetail] = useState([]);
  const [selected, setSelected] = useState("Movie Detail");

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
    <div className='mt-4'>
      <div className='flex items-center gap-4 w-full'>
        {lists.map((list) => (
          <button
            key={list}
            className={`${
              selected === list ? "bg-main-red" : "bg-slate-900"
            } py-1 px-4`}
            onClick={() => handleBtnClick(list)}
          >
            {list}
          </button>
        ))}
      </div>
      {renderMovie(selected, info, detail)}
    </div>
  );
}
