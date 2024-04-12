import React, { useState } from "react";
import { IoMdLogIn } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import { login } from "../../service.api.js/cosumet.api";
import { logIn } from "../../redux/authSlice";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [input, setInput] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = async (e) => {
    e.preventDefault();
    try {
      let userCredential;
      // Check if the input matches the format of an email address
      if (/^\S+@\S+\.\S+$/.test(input)) {
        userCredential = { email: input, password };
      } else {
        userCredential = { username: input, password };
      }

      const response = await login(userCredential);
      console.log(response);
      if (response.data) {
        toast.success("Login successfully");
        dispatch(logIn({ user: response.data, token: response.token }));

        navigate("/");
      } else {
        toast.error(response.response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='home'>
      <img
        src='/assets/aot.jpg'
        alt='Background Img'
        className='bgImg active'
      />

      <div className='flex justify-center h-[100vh] items-center relative z-10 w-full'>
        <div className='login-container  px-10 py-12 border-2 border-[#262938] flex flex-col w-[400px] max-h-[400px] rounded-lg'>
          <Link to='/' className='logo flex items-center text-center w-full'>
            <div className='w-full text-center'>
              <span className='font-josefin text-[#DC143C] text-3xl tracking-wider'>
                Anime
              </span>
              <span className='font-josefin text-xl'>Cave</span>
            </div>
          </Link>
          <div className='flex flex-col gap-4'>
            <form className='flex flex-col gap-5' onSubmit={loginUser}>
              <div className='flex flex-col gap-1'>
                <label
                  htmlFor='Email'
                  className='text-[#3a3e55] text-sm font-bold'
                >
                  UserName/Email
                </label>
                <input
                  type='text'
                  value={input}
                  placeholder='animeCave / animeCave@gmail.com'
                  className='outline-none py-2 px-2 bg-[#070A16] border border-[#262938]'
                  onChange={(e) => setInput(e.target.value)}
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
                  type='password'
                  value={password}
                  className='outline-none py-2 px-2 bg-[#070A16] border border-[#262938]'
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <button
                type='submit'
                className='bg-[#DC143C] hover:bg-[#da3354] px-2 py-2 flex items-center gap-1 cursor-pointer justify-center'
              >
                <IoMdLogIn />
                <span className='font-josefin'>Log In</span>
              </button>
            </form>
          </div>
          <span className='mt-4 flex items-center justify-center gap-2'>
            <p className='text-sm text-[#3a3e55] font-josefin'>
              Don't have an account?
            </p>
            <Link to='/signup' className='text-sm font-josefin'>
              Sign Up
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
}
