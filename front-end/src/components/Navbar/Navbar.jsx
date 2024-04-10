import React from "react";
import Search from "../Search/Search";
import { Link } from "react-router-dom";
import Login from "../../screens/Login/Login";

export default function Navbar() {
  return (
    <div className='navbar py-4 flex items-center justify-between'>
      <Link to='/' className='logo text-xl'>
        <span className='font-josefin text-[#DC143C]'>Anime</span>
        <span className='font-josefin'>Cave</span>
      </Link>

      {/* Website Links */}
      <div className='flex items-center justify-around gap-4'>
        <Link to='/popular' className='font-josefin'>
          Popular
        </Link>
        <Link to='/trend' className='font-josefin'>
          Trend
        </Link>
        <Link to='/character' className='font-josefin'>
          Character
        </Link>
      </div>

      {/* Search bar */}

      <Search />

      {/* Log In Button */}

      <Login />
    </div>
  );
}
