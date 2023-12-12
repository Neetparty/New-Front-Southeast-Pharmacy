"use client"
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import './styles.css';
import { Pagination, Autoplay } from 'swiper/modules';
import Image from "next/image";


export default function App({banner}:{banner:{image:string}[]}) {


  return (
    <>
    
      <Swiper
        slidesPerView={1}
        spaceBetween={50}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination, Autoplay]}
        className="mySwiper"
        loop={true}
        autoplay={{
          delay:5000,
          disableOnInteraction: false,
        }}
      >

        {banner.map((item, i) => (
          <SwiperSlide className="" key={i}>
            <div className="relative w-full h-[500px]">

              <Image
              // width={300}
              // height={300}
                src={item.image}
                alt="Picture of the flame(selled xx pieces)"
                className=""
                fill
                objectFit='contain'
               />
            </div>
        </SwiperSlide>

        ))}
      

      </Swiper >
     
    </>
  );
}
