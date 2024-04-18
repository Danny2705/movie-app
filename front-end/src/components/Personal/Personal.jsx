import React, { useState } from "react";
import { BsPersonCircle } from "react-icons/bs";
import { IoMdLogIn } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/authSlice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

export default function Personal() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const [select, setSelect] = useState(false);

  const logOut = () => {
    dispatch(logout());
    toast.success("Logout successfully");
    navigate("/");
  };
  return (
    <div>
      <button
        className=' px-2 py-1 flex items-center gap-4 cursor-pointer'
        onClick={() => setSelect(!select)}
      >
        <span className='text-left underline underline-offset-4 decoration-main-red'>
          {user.name}
        </span>
        <BsPersonCircle className='text-2xl text-main-red duration-500 hover:text-[#da3354]' />
      </button>
      {select && (
        <div className='absolute flex flex-col items-center bg-opacity-80 bg-black px-4 py-2 gap-2 border'>
          <div className=' flex items-center mt-3 bg-[#DC143C] hover:bg-[#da3354] cursor-pointer px-2 gap-2 py-1'>
            <span className='font-josefin ' onClick={logOut}>
              Log Out
            </span>
            <IoMdLogIn />
          </div>
          <button>Profile</button>
          <button>Watch List</button>
        </div>
      )}
    </div>
  );
}
