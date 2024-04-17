import { Rating } from "@mui/material";
import React, { useEffect, useState } from "react";
import { AiFillLike } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import {
  likeComment,
  unlikeComment,
  resetComment,
} from "../../redux/likeSlice";
import { postLikeComment } from "../../service.api.js/api.service";
import { updateUser } from "../../redux/authSlice";
import toast from "react-hot-toast";

const getElapsedTime = (date) => {
  const elapsedMilliseconds = Date.now() - new Date(date).getTime();
  const elapsedSeconds = elapsedMilliseconds / 1000;
  const elapsedMinutes = elapsedSeconds / 60;
  const elapsedHours = elapsedMinutes / 60;
  const elapsedDays = elapsedHours / 24;
  const elapsedMonths = elapsedDays / 30;
  const elapsedYears = elapsedMonths / 12;

  if (elapsedYears >= 1) {
    return `${Math.floor(elapsedYears)} year${
      Math.floor(elapsedYears) === 1 ? "" : "s"
    }`;
  } else if (elapsedMonths >= 1) {
    return `${Math.floor(elapsedMonths)} month${
      Math.floor(elapsedMonths) === 1 ? "" : "s"
    }`;
  } else if (elapsedDays >= 1) {
    return `${Math.floor(elapsedDays)} day${
      Math.floor(elapsedDays) === 1 ? "" : "s"
    }`;
  } else if (elapsedHours >= 1) {
    return `${Math.floor(elapsedHours)} hour${
      Math.floor(elapsedHours) === 1 ? "" : "s"
    }`;
  } else if (elapsedMinutes >= 1) {
    return `${Math.floor(elapsedMinutes)} minute${
      Math.floor(elapsedMinutes) === 1 ? "" : "s"
    }`;
  } else {
    return `sent`;
  }
};

const ReviewCard = ({ com }) => {
  const dispatch = useDispatch();
  const elapsedTime = getElapsedTime(com.createdAt);
  const [isLike, setIsLike] = useState(false);
  const [replyComment, setReplyComment] = useState("");
  const user = useSelector((state) => state.auth.user);

  const handleLike = async () => {
    if (user) {
      if (!isLike) {
        const data = await postLikeComment(com._id, user._id);
        dispatch(updateUser(data.data.user));
        setIsLike(true);
      }
    } else {
      toast.error("You should login to like a comment");
    }
  };

  const handleUnlike = async () => {
    if (isLike) {
      const data = await postLikeComment(com._id, user._id);
      dispatch(updateUser(data.data.user));
      setIsLike(false);
    }
  };

  useEffect(() => {
    if (!user) return;
    setIsLike(user.likedComment?.find((l) => l === com._id));
  }, [user, com._id]);

  return (
    <div className='flex w-full mt-8 items-start justify-start'>
      <div className='w-[100px]'>
        <img
          src='/assets/profile.png'
          alt='User Profile'
          className='w-[70px] h-[70px] border rounded-full'
        />
      </div>
      <div className='w-full flex flex-col'>
        <div className='flex justify-between w-full'>
          <h1 className='font-josefin text-[#FF4500] text-[17px] h-fit'>
            {com.user[0].name}
          </h1>
          <div>
            <Rating
              precision={0.5}
              size='medium'
              sx={{
                "& .MuiRating-iconFilled": { color: "yellow" },
                "& .MuiRating-iconEmpty": { color: "#6e6b6b" },
                "& .MuiRating-iconDecimal": { color: "white" },
              }}
              value={Number(com.rating)}
              readOnly={true}
            />
          </div>
        </div>
        <p className='mb-2 text-sm'>{com.comment}</p>
        <div className='flex items-center gap-4 justify-between'>
          <div className='flex items-center gap-4'>
            {!isLike ? (
              <button
                onClick={handleLike}
                className={`flex items-center gap-1 text-[12px]`}
              >
                <AiFillLike
                  className={`${isLike ? "text-blue-600" : "text-[#0CAFFF]"} `}
                />
                <span
                  className={`${isLike ? "text-blue-600" : "text-[#0CAFFF]"} `}
                >
                  Like
                </span>
              </button>
            ) : (
              <button
                onClick={handleUnlike}
                className={`flex items-center gap-1 text-[12px]`}
              >
                <AiFillLike
                  className={`${isLike ? "text-blue-600" : "text-[#0CAFFF]"} `}
                />
                <span
                  className={`${isLike ? "text-blue-600" : "text-[#0CAFFF]"} `}
                >
                  Unlike
                </span>
              </button>
            )}

            <button className='text-main-red text-[12px]'>Reply</button>

            <span className='text-[12px]'>
              {com.likeAmount > 0 ? (
                <div className='flex items-center gap-1'>
                  <div className='rounded-full text-[10px] bg-blue-600'>
                    <AiFillLike />
                  </div>
                  {com.likeAmount}
                </div>
              ) : (
                ""
              )}
            </span>
          </div>
          <span className='text-[12px] italic'>{elapsedTime}</span>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
