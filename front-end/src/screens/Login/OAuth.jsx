import React from "react";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { app } from "../../firebase";
import { oAuth } from "../../service.api.js/api.service";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { logIn } from "../../redux/authSlice";
import toast from "react-hot-toast";
import { FaGoogle } from "react-icons/fa";

export default function OAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);
      const res = {
        username: result.user.displayName,
        email: result.user.email,
        photo: result.user.photoURL,
      };
      const data = await oAuth(res);
      if (data.data) {
        toast.success("Login successfully");
        dispatch(logIn({ user: data.data, token: data.token }));

        navigate("/");
      } else {
        toast.error(data.response.data.message);
      }
    } catch (error) {
      console.log("Could not log in with Google", error);
    }
  };
  return (
    <button
      onClick={handleGoogleClick}
      className=' bg-black hover:bg-[gray] duration-500 px-2 py-2 flex items-center cursor-pointer justify-center text-white gap-2'
    >
      <FaGoogle className='text-main-red' />
      Continue with Google
    </button>
  );
}
