"use client";
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation } from 'swiper/modules';
import Image from "next/image";
import { Icon } from '@iconify/react';
import { PromotionProduct } from '@/app/user/promotion/page';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { selectUserData } from '@/app/GlobalRedux/Features/selector';
import { TFunction } from 'i18next';
import CardDetail from './CardDetail';

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
    1684:{
        slidesPerView: 5,
        spaceBetween: 50,
    }
  };
export default function PromotionSlider(

    {
        lang,
        product,
        t,
        handleLang,
    }: {
        product: PromotionProduct[]
        lang:{lang:string},
        handleLang: (thai: string, english: string, china: string) => string
        t: TFunction<"translation", undefined>
    }) {


    


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
                {product.map((item, key) => (
                     <SwiperSlide key={key}>
                    <CardDetail
                    item={item}
                    handleLang={handleLang}
                    />
             </SwiperSlide>
                ))}

            </Swiper >
    </>
);
}