import React, { useEffect, useRef, useState } from "react";
import { BsPersonCircle } from "react-icons/bs";
import { IoMdLogIn } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/authSlice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

export default function Personal() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const [select, setSelect] = useState(false);
  let menuRef = useRef();

  useEffect(() => {
    let handler = (e) => {
      if (!menuRef.current.contains(e.target)) {
        setSelect(false);
      }
    };
    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  const logOut = () => {
    dispatch(logout());
    toast.success("Logout successfully");
    navigate("/");
  };
  return (
    <div ref={menuRef}>
      <button
        className=' px-2 py-1 flex items-center gap-4 cursor-pointer'
        onClick={() => setSelect(!select)}
      >
        <span className='text-left underline underline-offset-4 decoration-main-red'>
          {user.name}
        </span>
        {/* <BsPersonCircle  /> */}
        <img
          src={user?.profilePicture}
          alt='user avatar'
          className='text-2xl text-main-red duration-500 hover:text-[#da3354] w-7 h-7 rounded-full'
        />
      </button>
      {select && (
        <div className='relative'>
          <div className='absolute top-2 w-[150px] h-[200px] right-3 flex flex-col items-center justify-center bg-opacity-80 bg-black px-4 py-2 gap-6 border-main-red border rounded-tl-xl rounded-bl-xl rounded-br-xl'>
            <Link to={`/profile/user/${user._id}`}>
              <button>Profile</button>
            </Link>
            <button>Watch List</button>
            <div className=' flex items-center bg-[#DC143C] hover:bg-[#da3354] cursor-pointer px-2 gap-2 duration-500'>
              <span className='font-josefin' onClick={logOut}>
                Log Out
              </span>
              <IoMdLogIn />
            </div>
          </div>
          <div className='triangle absolute top-0 right-3'></div>
        </div>
      )}
    </div>
  );
}
