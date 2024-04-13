import React, { useState } from "react";
import { getAnimeCharacters } from "../../service.api.js/jikan.api";
import { renderMovie } from "./renderMovie";

const lists = ["Movie Detail", "Character", "Trailer", "Image"];

export default function MovieDetail({ info }) {
  const [detail, setDetail] = useState([]);
  const [selected, setSelected] = useState("Movie Detail");

  const handleBtnClick = async (id) => {
    if (id === "Character") {
      const data = await getAnimeCharacters(info.mal_id);
      setDetail(data.data);
    } else {
      setDetail(info);
    }
    setSelected(id);
  };

  return (
    <div className='mt-4'>
      <div className='flex items-center justify-between w-full'>
        {lists.map((list, index) => (
          <button
            key={index}
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
