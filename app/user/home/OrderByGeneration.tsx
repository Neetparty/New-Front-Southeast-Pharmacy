"use client"
import Image from "next/image";
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/grid';
import 'swiper/css/pagination';
import './home.css';
import { Pagination } from 'swiper/modules';
import { ProductByCategory } from "@/app/home";
import Link from "next/link";
import { useTranslation } from 'react-i18next';
import CardDetail from "../search/CardDetail";

const breakpoints = {
  0: {
    slidesPerView: 1,
    spaceBetween: 10,
  },
  640: {
    slidesPerView: 2,
    spaceBetween: 20,
  },
  768: {
    slidesPerView: 3,
    spaceBetween: 30,
  },
  1024: {
    slidesPerView: 4,
    spaceBetween: 40,
  },
  1280: {
    slidesPerView: 5,
    spaceBetween: 50,
  },

};

export default function OrderByGeneration({
  productByCategory,
  handleLang,
}: {
  productByCategory: ProductByCategory[]
  handleLang: (thai: string, english: string, china: string) => string;
}) {

  const { t } = useTranslation('translation')

  const groupedData: Record<string, ProductByCategory[]> = productByCategory.reduce((result, product) => {
    const { category_name } = product.category;
    if (!result[category_name]) {
      result[category_name] = [] as ProductByCategory[];
    }
    result[category_name].push(product);
    return result;
  }, {} as Record<string, ProductByCategory[]>);
  return (
    <>
      <h6 className="text-center cursor-pointer mt-8 text-slate-600 text-4xl font-semibold"> {t("homepageProductbyusergroup")}</h6>
      {Object.keys(groupedData).map((categoryId, index) => (
        <div key={index}>
          <h6 className="text-xl text-slate-500">{handleLang(groupedData[categoryId][0].category.category_name, groupedData[categoryId][0].category.category_name_en, groupedData[categoryId][0].category.category_name_ch)}</h6>

          <div className="grid grid-cols-1 gap-4" key={index}>
            <Swiper
              slidesPerView={2}
              breakpoints={breakpoints}
              spaceBetween={60}
              pagination={{
                clickable: true,
              }}
              modules={[Pagination]}
              className=""
              id={`order-generation-${index}`}
            >
              
              {productByCategory.length !== 0 && groupedData[categoryId].map((item, i) => (
                <SwiperSlide id={`slide-${i}`} key={i}>
                  <div className=" justify-items-center flex gap-2 flex-wrap mb-8">
                   <CardDetail
                   handleLang={handleLang}
                   image={item.image}
                   price={item.price}
                   productName={item.product_name}
                   productNameCn={item.product_name_cn}
                   productNameEn={item.product_name_en}
                   product_id={item.product_id}
                   promotion_price={item.promotion_price}
                   promotion_status={item.promotion_status}
                   sell_total={item.sell_total}
                   description={item.description}
                   descriptionEn={item.description_en}
                   descriptionCn={item.description_cn}
                   />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      ))}



      {/*  <div className="grid grid-cols-1 gap-4">
           <h6 className="text-xl text-slate-500">วัยเด็ก</h6> 
           <Swiper
                slidesPerView={2}
                breakpoints={breakpoints}
                spaceBetween={60}
                pagination={{
                    clickable: true,
                }}
                modules={[Pagination]}
                className=""
                id="order-generation"
            >
              {arr.map((item, i) => (
                  <SwiperSlide id="">
                    <div className="flex flex-col md:flex-row gap-4 w-full h-full items-center mb-4" key={i}>
                           <div className="relative w-1/2 h-32 md:h-48">
                            <Image
                            alt=""
                            fill
                            src={"http://res.cloudinary.com/dzz6rgxkl/image/upload/v1694937393/pharmacy/product/kqsldypdakfw4eavkzew.jpg"}
                            className="w-full h-full object-contain"
                            />
                           </div>
                            <div className="flex flex-col gap-2 justify-start w-1/2">
                                <h6 className="text-slate-600 text-start text-base line-clamp-4">Mega Evening Primrose Oil น้ำมันอีฟนิ่งพริมโรส 1000 mg. 100 แคปซูล</h6>
                                <hr className="border-slate-300 w-full h-0.5"/>
                                <span className="text-gray-500 text-sm text-start">฿ 1000.00</span>
                        </div>
                    </div>
              </SwiperSlide>
              ))}
                
            </Swiper>
            
        </div> */}
    </>
  );
}