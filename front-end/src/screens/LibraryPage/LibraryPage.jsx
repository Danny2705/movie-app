import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import letters from "../../data/letterData.json";

export default function LibraryPage() {
  return (
    <div className='px-[100px]'>
      <Navbar />
      <div className='mt-[80px] flex flex-col gap-4'>
        <h4 className='text-[13px] cursor-pointer hover:text-[grey] duration-200 w-fit'>
          A - Z list / A
        </h4>

        <h1 className='bg-main-red w-fit px-2 py-1 text-lg rounded-t-md'>
          Anime Library
        </h1>

        <div className='flex items-center w-full justify-between flex-wrap gap-2'>
          <button className='bg-slate-900 px-3 py-1'>Show All</button>
          {letters.map((letter) => (
            <button key={letter} className='bg-slate-900 px-3 py-1 rounded-md'>
              {letter}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
