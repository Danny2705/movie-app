import React from "react";
import bgImg from "../../assets/jjk.jpg";
import Navbar from "../../components/Navbar/Navbar";

export default function Home() {
  return (
    <div className='home'>
      <Navbar />
      <div className='movie'>
        <img src={bgImg} alt='Background Img' className='bgImg active' />
        <h1 className='relative z-99 text-white'>hello</h1>
      </div>
    </div>
  );
}
