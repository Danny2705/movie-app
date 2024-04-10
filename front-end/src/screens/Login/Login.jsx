import React from "react";
import { IoMdLogIn } from "react-icons/io";

export default function Login() {
  return (
    <div className='bg-[#DC143C] px-2 py-1 flex items-center gap-1 cursor-pointer'>
      <IoMdLogIn />
      <span className='font-josefin'>Log In</span>
    </div>
  );
}
