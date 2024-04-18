import { Rating } from "@mui/material";
import React, { useEffect, useState } from "react";
import { AiFillLike } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { postComment, postLikeComment } from "../../service.api.js/api.service";
import { updateUser } from "../../redux/authSlice";
import toast from "react-hot-toast";
import FormReview from "./FormReview";
import { FaEdit, FaTrash } from "react-icons/fa";

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

const ReviewCard = ({ com, fetchComments, replies }) => {
  const dispatch = useDispatch();
  const elapsedTime = getElapsedTime(com.createdAt);
  const [isLike, setIsLike] = useState(false);
  const [isReply, setIsReply] = useState(false);
  const [replyComment, setReplyComment] = useState("");
  const user = useSelector((state) => state.auth.user);

  const fiveMinutes = 300000;
  const timePassed = new Date() - new Date(com.createdAt) > fiveMinutes;
  const canReply = Boolean(user?._id);
  const canEdit = (user?._id === com._id) & !timePassed;
  const canDelete = (user?._id === com._id) & !timePassed;

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
    if (user) {
      if (isLike) {
        const data = await postLikeComment(com._id, user._id);
        dispatch(updateUser(data.data.user));
        setIsLike(false);
      }
    } else {
      toast.error("You should login to like a comment");
    }
  };

  const handlePostReply = async (e) => {
    e.preventDefault();
    const postData = {
      userId: user?._id,
      anonymous: !user,
      rating: null,
      comment: replyComment,
      movieId: com.movieId,
      parentReview: com._id,
    };
    await postComment(postData);
    setReplyComment("");
    setIsReply(false);
    fetchComments();
  };

  useEffect(() => {
    if (!user) return;
    setIsLike(user.likedComment?.find((l) => l === com._id));
  }, [user, com._id]);

  return (
    <div className='flex w-full mt-6 items-start justify-start'>
      <div className='w-[70px]'>
        <img
          src='/assets/profile.png'
          alt='User Profile'
          className='w-[50px] h-[50px] border rounded-full'
        />
      </div>
      <div className='w-full flex flex-col'>
        <div className='flex justify-between w-full'>
          <h1 className='font-josefin text-[#FF4500] text-[17px] h-fit'>
            {com.user[0]?.name === undefined ? "Anonymous" : com.user[0]?.name}
          </h1>
          <div>
            {com.rating === null ? (
              ""
            ) : (
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
            )}
          </div>
        </div>
        <p className='mb-2 text-sm'>{com.comment}</p>
        <div className='flex flex-col items-center gap-2 justify-between'>
          <div className='flex justify-between w-full'>
            <div className='flex items-center gap-4'>
              {!isLike ? (
                <button
                  onClick={handleLike}
                  className={`flex items-center gap-1 text-[12px]`}
                >
                  <AiFillLike
                    className={`${
                      isLike ? "text-blue-600" : "text-[#0CAFFF]"
                    } `}
                  />
                  <span
                    className={`${
                      isLike ? "text-blue-600" : "text-[#0CAFFF]"
                    } `}
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
                    className={`${
                      isLike ? "text-blue-600" : "text-[#0CAFFF]"
                    } `}
                  />
                  <span
                    className={`${
                      isLike ? "text-blue-600" : "text-[#0CAFFF]"
                    } `}
                  >
                    Unlike
                  </span>
                </button>
              )}
              {com.rating === null ? (
                ""
              ) : (
                <button
                  onClick={() => setIsReply(!isReply)}
                  className={`text-main-red text-[12px]`}
                >
                  Reply
                </button>
              )}
              <button className='text-[12px] text-[gray]'>
                <FaEdit />
              </button>
              <button className='text-[12px] text-red-500'>
                <FaTrash />
              </button>
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
          <div className='w-full'>
            {replies.length > 0 && (
              <div>
                {replies.map((reply, i) => (
                  <ReviewCard
                    key={i}
                    com={reply}
                    replies={[]}
                    fetchComments={fetchComments}
                  />
                ))}
              </div>
            )}
            {isReply && (
              <div className='flex items-start mt-2 w-full'>
                <div className='w-[70px]'>
                  <img
                    src='/assets/profile.png'
                    alt='User Profile'
                    className='w-[50px] h-[50px] border rounded-full'
                  />
                </div>
                <FormReview
                  text='reply'
                  comment={replyComment}
                  setComment={setReplyComment}
                  handlePost={handlePostReply}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
