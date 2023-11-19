"use client"
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './styles.css';
import { Pagination, Navigation } from 'swiper/modules';
import product from './exampleProductImg.png';
import Image from "next/image";
import { Icon } from '@iconify/react';

const breakpoints = {
    0: {
      slidesPerView: 1,
      spaceBetween: 20,
    },
    520: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    864: {
      slidesPerView: 3,
      spaceBetween: 30,
    },
    1024: {
        slidesPerView: 4,
        spaceBetween: 40,
    },
    1684: {
        slidesPerView: 5,
        spaceBetween: 50,
    }
  };
export default function App() {
    const arr = [1, 2, 3, 4, 5, 6]

    
     
    return (
        <>
            <Swiper
                breakpoints={breakpoints}
                spaceBetween={50}
                slidesPerView={4}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Pagination, Navigation]}
                className="mySwiper"
            >
                {arr.map((item, key) => (
                    <SwiperSlide key={key}>
                        <div className="flex flex-row gap-8 mb-8">
                            <div className="w-full flex items-center flex-col gap-1 p-0.5 overflow-hidden">
                                <div className="w-[13rem] h-[13rem]">
                                    <Image
                                        src={product}
                                        alt="product-alt"
                                        className="w-full h-full object-contain"
                                    />
                                </div>
                                <div className="flex justify-around">
                                    <div className="box-content h-6 w-full border-2 mt-4 mb-2 flex justify-center bg-slate-100">
                                       
                                      <Icon 
                                      icon="mdi:fire"
                                      className="text-red-400 w-6 h-6"
                                      />

                                        <span className="text-[#797979] text-sm mt-1 ml-2 line-clamp-1">ขายแล้ว 176 ชิ้น</span>
                                    </div>
                                </div>

                                <span className="text-gray-500 text-base line-clamp-2">{key}Mega Evening Primrose Oil น้ำมันอีฟนิ่งพริมโรส 1000 mg. 100 แคปซูล</span>

                                <hr className="border-slate-300 w-full h-0.5" />

                                <div className="w-full">
                                    <span className="text-red-400 text-lg text-left">฿ 800.00</span>
                                    <div className="flex gap-2 items-center">
                                        <span className="text-gray-500 text-sm  mr-2 line-through">฿ 1000.00</span>
                                        <span className="text-gray-500 text-base">-20%</span>
                                    </div>
                                </div>

                            </div>
                        </div>



                    </SwiperSlide>
                ))}

            </Swiper >
        </>
    );
}
