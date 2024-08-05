import React, { useEffect, useState } from "react";
import ReviewCard from "./ReviewCard";
import {
  getCommentsByMovieId,
  postComment,
} from "../../service.api.js/api.service";
import { useSelector } from "react-redux";
import { Rating } from "@mui/material";
import { useParams } from "react-router";
import FormReview from "./FormReview";

export default function Review() {
  const [comment, setComment] = useState("");
  const [commentData, setCommentData] = useState([]);
  const [rating, setRating] = useState(0);
  const [visibleComments, setVisibleComments] = useState(10);
  const [childrenComment, setChildrenComment] = useState([]);
  const [rootComments, setRootComments] = useState([]);
  const user = useSelector((state) => state.auth.user);
  const darkMode = useSelector((state) => state.theme.darkMode);
  const params = useParams();
  /*
  userId = user in redux
  rating 
  isAnoy user?.
  parentReview replyButton?.
  */

  const handlePost = async (e) => {
    e.preventDefault();

    const postData = {
      userId: user?._id,
      rating: rating,
      anonymous: !user,
      comment: comment,
      movieId: params.id,
      parentReview: null,
    };
    await postComment(postData);

    setComment("");
    fetchComments();
  };
  const getReplies = (commentId) => {
    return childrenComment.filter(
      (comment) => comment.parentReview === commentId
    );
  };

  const fetchComments = async () => {
    const data = await getCommentsByMovieId(params.id);
    setCommentData(data);
  };

  useEffect(() => {
    const sortData = () => {
      setRootComments(
        commentData?.filter((comment) => comment.parentReview === null)
      );

      setChildrenComment(
        commentData?.filter((cmt) => cmt.parentReview !== null)
          .sort((a, b) => {
            const nameA = a.createdAt;
            const nameB = b.createdAt;
            if (nameA < nameB) {
              return -1;
            }
            if (nameA > nameB) {
              return 1;
            }
            return 0;
          })
      );
    };
    sortData();
  }, [commentData]);

  useEffect(() => {
    fetchComments();
  }, [params, user]);

  const handleShowMore = () => {
    setVisibleComments(visibleComments + 10);
  };

  return (
    <div
      className={`mt-8 ${
        darkMode ? "bg-main-black" : "bg-[#ccc]"
      } w-full min-h-[100vh] px-10 py-4 flex flex-col gap-6`}
    >
      <div className='flex items-center w-full justify-between border-b border-[grey] pb-4'>
        <h1 className='font-bold text-main-red text-lg'>
          {commentData?.length} Reviews
        </h1>
        <button>Sort by</button>
      </div>

      <div className='flex items-start w-full'>
        <div className='w-[70px]'>
          <img
            src={
              user?.profilePicture
                ? user?.profilePicture
                : "/assets/profile.jpg"
            }
            alt='User Profile'
            className='w-[50px] h-[50px] rounded-full'
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
          <FormReview
            comment={comment}
            setComment={setComment}
            handlePost={handlePost}
          />
        </div>
      </div>

      <div>
        {rootComments?.length > 0 &&
          rootComments
            .slice(0, visibleComments)
            .map((com) => (
              <ReviewCard
                key={com._id}
                com={com}
                fetchComments={fetchComments}
                replies={getReplies(com._id)}
              />
            ))}

        {rootComments?.length > visibleComments && (
          <button
            onClick={handleShowMore}
            className='w-full bg-main-red py-2 mt-4 hover:bg-main-redHover'
          >
            Show More
          </button>
        )}
      </div>
    </div>
  );
}
