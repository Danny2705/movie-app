import React from "react";
import Search from "../Search/Search";
import { Link, useLocation } from "react-router-dom";
import { IoMdLogIn } from "react-icons/io";
import { useSelector } from "react-redux";
import Personal from "../Personal/Personal";

export default function Navbar({ scroll }) {
  const user = useSelector((state) => state.auth.user);
  const location = useLocation();
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
          to='/library'
          className='nav-link font-josefin transition-all duration-500 relative'
        >
          Library
        </Link>
        <Link
          to='/trend'
          className='nav-link font-josefin transition-all duration-500 relative'
        >
          Trend
        </Link>
        <Link
          to='/schedule'
          className='nav-link font-josefin transition-all duration-500 relative'
        >
          Schedule
        </Link>
      </div>

      {/* Search bar */}
      {location.pathname !== "/search" ? <Search /> : <div />}

      {/* Log In Button */}
      {!user ? (
        <Link to='/login'>
          <div className='bg-[#DC143C] hover:bg-[#da3354] px-2 py-1 flex items-center gap-1 cursor-pointer'>
            <IoMdLogIn />
            <span className='font-josefin'>Log In</span>
          </div>
        </Link>
      ) : location.pathname === `/profile/user/${user._id}` ? (
        <div />
      ) : (
        <Personal />
      )}
    </div>
  );
}
