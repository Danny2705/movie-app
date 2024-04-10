import React from "react";
import { IoCloseCircleOutline } from "react-icons/io5";

export default function VideoPlayer({ videoSrc, isVisible, onClose }) {
  return (
    <>
      {isVisible && (
        <div className='fixed inset-0 flex justify-center items-center bg-black bg-opacity-75 z-20'>
          <div className='relative'>
            <iframe
              width='760'
              height='515'
              src={videoSrc}
              title='YouTube video player'
              allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
              className='z-10'
            ></iframe>
            <button
              onClick={onClose}
              className='absolute top-0 right-0 text-[#DC143C] text-2xl hover:text-[#da3354] transition-all duration-200'
            >
              <IoCloseCircleOutline />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
