import React, { useState } from "react";
import { IoMdLogIn } from "react-icons/io";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className='home'>
      <img
        src='/assets/aot.jpg'
        alt='Background Img'
        className='bgImg active'
      />
      <div className='flex justify-center h-[100vh] items-center relative z-10 w-full'>
        <div className='login-container px-10 py-12 border-2 border-[#262938] flex flex-col w-[400px] max-h-[500px] rounded-lg'>
          <Link to='/' className='logo flex items-center text-center w-full'>
            <div className='w-full text-center'>
              <span className='font-josefin text-[#DC143C] text-3xl tracking-wider'>
                Anime
              </span>
              <span className='font-josefin text-xl'>Cave</span>
            </div>
          </Link>
          <div className='flex flex-col gap-4'>
            <form className='flex flex-col gap-5'>
              <div className='flex flex-col gap-1'>
                <label
                  htmlFor='Email'
                  className='text-[#3a3e55] text-sm font-bold'
                >
                  UserName
                </label>
                <input
                  type='text'
                  placeholder='animeCave'
                  value={username}
                  className='outline-none py-2 px-2 bg-[#070A16] border border-[#262938]'
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className='flex flex-col gap-1'>
                <label
                  htmlFor='Email'
                  className='text-[#3a3e55] text-sm font-bold'
                >
                  Email
                </label>
                <input
                  type='text'
                  value={email}
                  placeholder='animeCave@gmail.com'
                  className='outline-none py-2 px-2 bg-[#070A16] border border-[#262938]'
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className='flex flex-col gap-1'>
                <label
                  htmlFor='Password'
                  className='text-[#3a3e55] text-sm font-bold'
                >
                  Password
                </label>
                <input
                  type='text'
                  value={password}
                  className='outline-none py-2 px-2 bg-[#070A16] border border-[#262938]'
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </form>
            <div className='bg-[#DC143C] hover:bg-[#da3354] px-2 py-2 flex items-center gap-1 cursor-pointer justify-center'>
              <IoMdLogIn />
              <span className='font-josefin'>Sign Up</span>
            </div>
          </div>
          <span className='mt-4 flex items-center justify-center gap-2'>
            <p className='text-sm text-[#3a3e55] font-josefin'>
              Already have an account?
            </p>
            <Link to='/login' className='text-sm font-josefin'>
              Log In
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
}
