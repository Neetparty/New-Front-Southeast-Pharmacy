
"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation } from 'swiper/modules';
import { Promotion } from "@/app/home";
import { TFunction } from "i18next";
import CardDetail from "../search/CardDetail";
const breakpoints = {
    0: {
      slidesPerView: 1,
      spaceBetween: 20,
      modules:[Pagination]

    },
    460: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    640: {
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


export default function Card({
    promotion,
    handleLang,
    t
}:{
    promotion:Promotion;
    handleLang:(th:string, en:string, cn:string) => string;
    t:TFunction<"translation", undefined>
}) {

    
   
    return (
        
        <>
            <h6 className="text-center cursor-pointer mt-8 text-slate-600 text-4xl font-semibold"> {t("homepagePromotionProduct")} </h6>
            <hr className="border-slate-200" />
            <div className="">
                <Swiper
                    breakpoints={breakpoints}
                    spaceBetween={50}
                    slidesPerView={4}
                    pagination={{
                        clickable: true,
                    }}
                    navigation={true}
                    modules={[Pagination, Navigation]}
                    className=""
                >
                    {promotion.Promotion_product.length !== 0 && promotion.Promotion_product.map((item, i) => (
                        <SwiperSlide key={i} className="flex items-stretch mb-8">
                            <div className=" justify-items-center flex gap-2 flex-wrap mb-8">
                                <CardDetail
                                handleLang={handleLang}
                                image={item.product.image}
                                price={item.product.price}
                                productName={item.product.product_name}
                                productNameCn={item.product.product_name_cn}
                                productNameEn={item.product.product_name_en}
                                product_id={item.product.product_id}
                                promotion_price={item.product.promotion_price}
                                promotion_status={item.product.promotion_status}
                                sell_total={item.product.sell_total}
                                description={item.product.description}
                                descriptionEn={item.product.description_en}
                                descriptionCn={item.product.description_cn}
                                />
                            </div>
                        </SwiperSlide>

                    ))}
                </Swiper>

            </div>
        </>
);

}
/* 
const temp = {
    "promotion_name": "test thai",
    "promotion_name_en": "test eng",
    "promotion_name_cn": "test cn",
    "Promotion_product": [
        {
            "product": {
                "product_name": "ซาร่าห์",
                "product_name_en": "ซาร่าห์อิ้ง",
                "product_name_cn": "ซาร่าห์จีน",
                "product_id": "p-101",
                "image": "http://res.cloudinary.com/dzz6rgxkl/image/upload/v1694937393/pharmacy/product/kqsldypdakfw4eavkzew.jpg",
                "sell_total": 2,
                "promotion_price": 0,
                "promotion_status": false,
                "price": 50
            }
        },
        {
            "product": {
                "product_name": "พาราเซตาม่อลกินแล้วแก้ปวดหัว",
                "product_name_en": "ซาร่าห์อิ้ง",
                "product_name_cn": "ซาร่าห์จีน",
                "product_id": "p-101",
                "image": "http://res.cloudinary.com/dzz6rgxkl/image/upload/v1694937393/pharmacy/product/kqsldypdakfw4eavkzew.jpg",
                "sell_total": 2,
                "promotion_price": 0,
                "promotion_status": false,
                "price": 50
            }
        },
        {
            "product": {
                "product_name": "ซาร่าห์",
                "product_name_en": "ซาร่าห์อิ้ง",
                "product_name_cn": "ซาร่าห์จีน",
                "product_id": "p-101",
                "image": "http://res.cloudinary.com/dzz6rgxkl/image/upload/v1694937393/pharmacy/product/kqsldypdakfw4eavkzew.jpg",
                "sell_total": 2,
                "promotion_price": 0,
                "promotion_status": false,
                "price": 50
            }
        },
        {
            "product": {
                "product_name": "ซาร่าห์",
                "product_name_en": "ซาร่าห์อิ้ง",
                "product_name_cn": "ซาร่าห์จีน",
                "product_id": "p-101",
                "image": "http://res.cloudinary.com/dzz6rgxkl/image/upload/v1694937393/pharmacy/product/kqsldypdakfw4eavkzew.jpg",
                "sell_total": 2,
                "promotion_price": 0,
                "promotion_status": false,
                "price": 50
            }
        },
        {
            "product": {
                "product_name": "ซาร่าห์",
                "product_name_en": "ซาร่าห์อิ้ง",
                "product_name_cn": "ซาร่าห์จีน",
                "product_id": "p-101",
                "image": "http://res.cloudinary.com/dzz6rgxkl/image/upload/v1694937393/pharmacy/product/kqsldypdakfw4eavkzew.jpg",
                "sell_total": 2,
                "promotion_price": 0,
                "promotion_status": false,
                "price": 50
            }
        },
        {
            "product": {
                "product_name": "ซาร่าห์",
                "product_name_en": "ซาร่าห์อิ้ง",
                "product_name_cn": "ซาร่าห์จีน",
                "product_id": "p-101",
                "image": "http://res.cloudinary.com/dzz6rgxkl/image/upload/v1694937393/pharmacy/product/kqsldypdakfw4eavkzew.jpg",
                "sell_total": 2,
                "promotion_price": 0,
                "promotion_status": false,
                "price": 50
            }
        },
        {
            "product": {
                "product_name": "ซาร่าห์",
                "product_name_en": "ซาร่าห์อิ้ง",
                "product_name_cn": "ซาร่าห์จีน",
                "product_id": "p-101",
                "image": "http://res.cloudinary.com/dzz6rgxkl/image/upload/v1694937393/pharmacy/product/kqsldypdakfw4eavkzew.jpg",
                "sell_total": 2,
                "promotion_price": 0,
                "promotion_status": false,
                "price": 50
            }
        },
    ]
}
*/
/* 
  <span className="text-[#797979] text-base text-left">Mega Evening Primrose Oil น้ำมันอีฟนิ่งพริมโรส 1000 mg. 100 แคปซูล</span><br/><hr className="border-1 m-1"/>
             <span className="text-[#FF4F4F] text-lg text-left">฿ 800.00</span><br/>
             <span className="text-[#797979] text-sm text-left mr-2 line-through">฿ 1000.00</span>
             <span className="text-[#797979] text-base">-20%</span>
*/

