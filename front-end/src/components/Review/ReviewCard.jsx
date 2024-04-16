import { Rating } from "@mui/material";
import React from "react";

const formatDate = (date) => {
  const fromDate = new Date(date);
  return `${
    fromDate.getHours() >= 0 ? fromDate.getHours() : 12 + fromDate.getHours()
  }:${fromDate.getMinutes().toString().padStart(2, "0")} ${
    fromDate.getHours() >= 0 && fromDate.getHours() < 12 ? "AM" : "PM"
  }`;
};

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
  const formattedDate = formatDate(com.createdAt);
  const elapsedTime = getElapsedTime(com.createdAt);

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
          <h1 className='font-bold font-josefin text-[#1569D6] h-fit'>
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
        <p className='text-main-banana mb-2'>{com.comment}</p>
        <div className='flex items-center gap-4 justify-between'>
          <div className='flex items-center gap-4'>
            <button className='text-main-red'>Like</button>
            <button className='text-main-red'>Reply</button>
          </div>
          <span className='text-sm italic'>{elapsedTime}</span>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
