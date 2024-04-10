import React from "react";
import { CiSearch } from "react-icons/ci";

export default function Search() {
  return (
    <div className='flex items-center border-2 border-[#e9e7e7] p-1 gap-1 cursor-pointer rounded-xl'>
      <CiSearch />
      <input
        type='text'
        placeholder='| Search'
        className='outline-none bg-transparent text-sm text-[#ffffff] placeholder-white::placeholder'
      />
    </div>
  );
}
