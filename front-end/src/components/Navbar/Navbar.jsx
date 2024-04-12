import React from "react";
import Search from "../Search/Search";
import { Link } from "react-router-dom";
import { IoMdLogIn } from "react-icons/io";
import { useSelector } from "react-redux";
import Personal from "../Personal/Personal";

export default function Navbar({ scroll }) {
  const user = useSelector((state) => state.auth.user);

  return (
    <div
      className={`${
        scroll > 100 ? "scrolled" : undefined
      } navbar py-4 flex items-center justify-between`}
    >
      <Link to='/' className='logo flex items-center'>
        <span className='font-josefin text-[#DC143C] text-2xl tracking-wider'>
          Anime
        </span>
        <span className='font-josefin text-lg'>Cave</span>
      </Link>

      {/* Website Links */}
      <div className='flex items-center justify-around gap-4'>
        <Link
          to='/popular'
          className='font-josefin transition-all duration-500 hover:underline decoration-[#DC143C] underline-offset-8'
        >
          Popular
        </Link>
        <Link
          to='/trend'
          className='font-josefin transition-all duration-500 hover:underline decoration-[#DC143C] underline-offset-8'
        >
          Trend
        </Link>
        <Link
          to='/character'
          className='font-josefin transition-all duration-500 hover:underline decoration-[#DC143C] underline-offset-8'
        >
          Character
        </Link>
      </div>

      {/* Search bar */}
      <Search />

      {/* Log In Button */}
      {!user ? (
        <Link to='/login'>
          <div className='bg-[#DC143C] hover:bg-[#da3354] px-2 py-1 flex items-center gap-1 cursor-pointer'>
            <IoMdLogIn />
            <span className='font-josefin'>Log In</span>
          </div>
        </Link>
      ) : (
        <Personal />
      )}
    </div>
  );
}
