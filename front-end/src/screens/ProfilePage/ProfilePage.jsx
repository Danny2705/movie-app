import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { LuUpload } from "react-icons/lu";
import { logout } from "../../redux/authSlice";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

export default function ProfilePage() {
  const [scroll, setScroll] = useState(0);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logOut = () => {
    dispatch(logout());
    toast.success("Logout successfully");
    navigate("/");
  };

  console.log(user);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      setScroll(window.scrollY);
    });
    return () => {
      window.removeEventListener("scroll", () => {
        setScroll(window.scrollY);
      });
    };
  }, [scroll]);
  return (
    <div className='home px-[100px]'>
      <img
        src='/assets/aot.jpg'
        alt='Background Img'
        className='bgImg active'
      />
      <div className='w-full min-h-[100vh] py-20 flex justify-center items-center'>
        <Navbar scroll={scroll} />

        <div className='flex justify-center items-center relative z-10 w-full bg-opacity-80 bg-black h-full'>
          <div className='flex flex-col gap-4 py-4 w-[500px]'>
            <h1 className='text-[#DC143C] text-4xl text-center font-josefin'>
              Profile
            </h1>
            <div className='relative'>
              <img
                src='/assets/profile.png'
                alt='User Profile'
                className='w-[250px] h-[250px] mx-auto border rounded-full '
              />
              <button className='text-xl bg-main-red w-fit rounded-full p-2 absolute bottom-0 right-0 hover:bg-black hover:text-main-red duration-200'>
                <LuUpload />
              </button>
            </div>
            <form className='flex flex-col gap-4'>
              <div className='flex items-center justify-between'>
                <label
                  htmlFor='name'
                  className='text-[#3a3e55] text-sm font-bold'
                >
                  UserName:
                </label>
                <input
                  type='text'
                  placeholder={`${user.name}`}
                  className='outline-none py-2 px-2 bg-[#070A16] border border-[#262938]'
                />
              </div>

              <div className='flex items-center justify-between'>
                <label
                  htmlFor='email'
                  className='text-[#3a3e55] text-sm font-bold'
                >
                  Email:
                </label>
                <input
                  type='text'
                  placeholder={`${user.email}`}
                  className='outline-none py-2 px-2 bg-[#070A16] border border-[#262938]'
                />
              </div>

              <div className='flex items-center justify-between'>
                <label
                  htmlFor='password'
                  className='text-[#3a3e55] text-sm font-bold'
                >
                  Password:
                </label>
                <input
                  type='text'
                  placeholder={`Password`}
                  className='outline-none py-2 px-2 bg-[#070A16] border border-[#262938]'
                />
              </div>
              <button
                type='submit'
                className='bg-[#DC143C] hover:bg-[#da3354] duration-500 px-2 py-2 flex items-center gap-1 cursor-pointer justify-center'
              >
                <span className='font-josefin'>Update</span>
              </button>
            </form>

            <span
              className='text-sm font-josefin text-end w-full cursor-pointer'
              onClick={logOut}
            >
              Log Out
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
