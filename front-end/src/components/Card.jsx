import React from "react";

export default function Card() {
  return (
    <div className='movie-card'>
      <img
        src='/assets/obanai.jpg'
        alt='Movie'
        className='img-fluid'
        style={{
          maxWidth: "300px",
          maxHeight: "400px",
          width: "auto",
          height: "auto",
        }}
      />
    </div>
  );
}
