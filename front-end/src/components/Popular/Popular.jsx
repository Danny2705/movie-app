import React from "react";

export default function Popular() {
  return (
    <div className='px-[100px] h-[100vh] mt-6'>
      <h1 className='title uppercase text-2xl relative font-medium tracking-[1px] mb-[30px]'>
        The Top Most Popular
      </h1>

      {/* Sorting Some Category of The Top Most Popular Anime */}
      <div className='flex items-center gap-4'>
        <button className='py-1 px-3 bg-[#dc143c]'>All</button>
        <button className='py-1 px-3 bg-slate-900'>Day Top View</button>
        <button className='py-1 px-3 bg-slate-900'>Week Top View</button>
        <button className='py-1 px-3 bg-slate-900'>Month Top View</button>
        <button className='py-1 px-3 bg-slate-900'>Year Top View</button>
      </div>
    </div>
  );
}
