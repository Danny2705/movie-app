import React, { useEffect, useState } from "react";
import ReviewCard from "./ReviewCard";
import {
  getCommentsByMovieId,
  postComment,
} from "../../service.api.js/api.service";
import { useSelector } from "react-redux";
import { Rating } from "@mui/material";
import { toast } from "react-hot-toast";
import { useParams } from "react-router";

export default function Review() {
  const [comment, setComment] = useState("");
  const [commentData, setCommentData] = useState([]);
  const [rating, setRating] = useState(0);
  const user = useSelector((state) => state.auth.user);
  const params = useParams();

  /*
  userId = user in redux
  rating 
  isAnoy user?.
  parentReview replyButton?.
  */

  const handlePost = async (e) => {
    e.preventDefault();
    if (user.name) {
      const postData = {
        userId: user._id,
        rating: rating,
        anonymous: !user,
        comment: comment,
        movieId: params.id,
      };
      await postComment(postData);
    }
    setComment("");
    fetchComments();
  };

  const fetchComments = async () => {
    const data = await getCommentsByMovieId(params.id);
    console.log(data);
    setCommentData(data);
  };

  useEffect(() => {
    fetchComments();
  }, [params]);
  return (
    <div className='mt-8 bg-main-black w-full min-h-[100vh] px-10 py-4 flex flex-col gap-6'>
      <div className='flex items-center w-full justify-between border-b border-[grey] pb-4'>
        <h1 className='font-bold text-main-red text-lg'>1000 Reviews</h1>
        <button>Sort by</button>
      </div>

      <div className='flex items-start w-full'>
        <div className='w-[100px]'>
          <img
            src='/assets/profile.png'
            alt='User Profile'
            className='w-[70px] h-[70px] border'
          />
        </div>
        <div className='w-full'>
          <button className='flex items-center gap-[0.05rem] mb-1'>
            <Rating
              precision={0.5}
              size='medium'
              sx={{
                "& .MuiRating-iconFilled": {
                  color: "yellow",
                },
                "& .MuiRating-iconEmpty": {
                  color: "#6e6b6b",
                },
                "& .MuiRating-iconDecimal": {
                  color: "white",
                },
              }}
              onChange={(e) => setRating(e.target.value)}
            />
          </button>
          <form onSubmit={handlePost}>
            <input
              type='text'
              placeholder='Write comments here ...'
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required
              className='w-full py-4 px-2 outline-none placeholder:text-black text-black bg-white'
            />
            <button
              type='submit'
              className='py-2 w-full bg-main-red flex px-3 justify-center'
            >
              <span>Post</span>
            </button>
          </form>
        </div>
      </div>

      <div>
        {commentData.length > 0 &&
          commentData?.map((com) => (
            <ReviewCard key={com._id} com={com} date={com.createdAt} />
          ))}
      </div>
    </div>
  );
}
