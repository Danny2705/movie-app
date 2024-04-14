import React, { useState } from "react";
const pages = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
  23, 24, 25,
];

export default function Pagination() {
  const [previous, setPrevious] = useState(false);
  const [next, setNext] = useState(false);
  const [showAnime, setShowAnime] = useState([]);

  return (
    <div>
      <button className='flex items-center gap-4 text-lg'>
        {pages.slice(0, 5).map((page, i) => (
          <span className='bg-slate-900 py-1 px-3' key={i}>
            {page}
          </span>
        ))}
      </button>
    </div>
  );
}
