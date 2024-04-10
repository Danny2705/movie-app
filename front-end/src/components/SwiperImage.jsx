import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import { EffectCoverflow, Navigation, Autoplay } from "swiper/modules";
import movieData from "../data/movieData.json";

export default function SwiperImage() {
  return (
    <div className='absolute bottom-0 z-10 bg-transparent h-[250px] max-w-[800px] left-1/2 -translate-x-1/2'>
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        loop={true}
        slidesPerView={"auto"}
        autoplay={{
          delay: 1500,
          disableOnInteraction: false,
        }}
        modules={[EffectCoverflow, Navigation, Autoplay]}
        coverflowEffect={{ rotate: 0, stretch: 0, depth: 100, modifier: 2.5 }}
      >
        {movieData.map((movie) => {
          return (
            <SwiperSlide key={movie.id} className='max-w-[200px]'>
              <img
                src={movie.bgImg}
                alt={movie.title}
                className='w-[200px] h-[250px] object-cover opacity-80'
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
