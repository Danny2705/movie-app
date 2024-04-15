import React from "react";
import { FaCalendar, FaEye } from "react-icons/fa";
import { FaRankingStar } from "react-icons/fa6";

export default function View({ info }) {
  return (
    <div className='mt-4 flex items-center justify-between flex-wrap'>
      <h1 className='flex items-center gap-2'>
        <div className='border rounded-full h-10 w-10 border-main-red text-center pt-1.5'>
          {info.score ? info.score : <span>?</span>}
        </div>
        / 10
      </h1>

      <h1 className='flex items-center text-lg gap-2'>
        <FaRankingStar className='text-[yellow]' />
        {info.popularity ? info.popularity : <span>?</span>}
      </h1>

      <h1 className='flex items-center gap-2'>
        <FaCalendar className='text-[#b5e745]' />
        {info.year ? info.year : <span>?</span>}
      </h1>

      <h1 className='flex items-center gap-2'>
        <FaEye className='text-[orange]' />
        {info.members ? info.members.toLocaleString() : <span>?</span>}
      </h1>
    </div>
  );
}
