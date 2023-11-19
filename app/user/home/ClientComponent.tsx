"use client";
import Carousel from "@/app/component/Carousel/Carousel";
import { useSelector } from "react-redux";
import { selectBannerData, selectLangData } from "@/app/GlobalRedux/Features/selector";
import { useState } from "react";
import { Product, ProductByCategory, Promotion } from "@/app/home";
import SubNavbar from "@/app/component/SubNavbar/SubNavbar";
import Navbar from "@/app/component/Navbar/Navbar";
import Card from "./Card";
import OrderByGeneration from "./OrderByGeneration";
import Footer from "@/app/component/Footer/Footer";
import { useTranslation } from "react-i18next";
import CardDetail from "../search/CardDetail";
export default function ClientComponent({ data }: {
  data: {
    msg: string
    promotion: Promotion
    productByCategory: ProductByCategory[]
    randomProduct: Product[]
  }
}) {

  const banner = useSelector(selectBannerData)
  const lang = useSelector(selectLangData);

  const [state, setState] = useState<{
    promotion: Promotion | null
    productByCategory: ProductByCategory[]
    loading: boolean;
  }>({
    promotion: data.promotion || [],
    productByCategory: data.productByCategory || [],
    loading: false,
  })
  const { t } = useTranslation('translation')

  function handleLang(thai: string, english: string, china: string) {

    if (lang.lang === "th") {
      return thai;
    }
    else if (lang.lang === "en") {
      return english;
    }
    else if (lang.lang === "cn") {
      return china;
    }
    else {
      return thai;
    }
  }

 

  return (
    <>
      <Navbar />
      <SubNavbar />
      <div className="w-full mx-auto md:max-w-[75vw] bg-white flex flex-col gap-8 min-h-[50vh]">
        <div>
          <div className="w-auto text-center">
            <Carousel
              banner={banner}
            />
          </div>

          <div className="mt-12 w-full md:max-w-[75vw] mx-auto flex flex-col gap-8">
            <div className="bg-white p-4 flex flex-col gap-8">

              {state.promotion?.Promotion_product &&
                <Card
                  promotion={state.promotion!}
                  handleLang={handleLang}
                  t={t}
                />
              }
            </div>

            <div className="bg-white p-4 flex flex-col gap-8">
              <OrderByGeneration
                productByCategory={state.productByCategory}
                handleLang={handleLang}
              />
            </div>

          </div>

          {data.randomProduct.length !== 0 &&
            <div className="p-4 flex flex-col gap-8">
              <h6 className="text-xl text-slate-500">คุณอาจจะชอบสินค้านี้</h6>
              <div className="sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 md:gap-8 justify-items-center flex gap-2 flex-wrap" >
                {data.randomProduct.map((item, i) => (
                  <div className="w-full" key={i}>
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
                ))}
              </div>
            </div>
          }

        </div>
      </div>
      <Footer />
    </>
  );

}


/* 

 let temp = [
    {
      "product_name": "ซาร่าห์",
      "product_name_en": "ซาร่าห์อิ้ง",
      "product_name_cn": "ซาร่าห์จีน",
      "product_id": "p-101",
      "image": "http://res.cloudinary.com/dzz6rgxkl/image/upload/v1694937393/pharmacy/product/kqsldypdakfw4eavkzew.jpg",
      "sell_total": 0,
      "promotion_price": 0,
      "promotion_status": false,
      "price": 50
    },
    {
      "product_name": "พาราเซตาม่อลกินแล้วแก้ปวดหัว",
      "product_name_en": "ซาร่าห์อิ้ง",
      "product_name_cn": "ซาร่าห์จีน",
      "product_id": "p-101",
      "image": "http://res.cloudinary.com/dzz6rgxkl/image/upload/v1694937393/pharmacy/product/kqsldypdakfw4eavkzew.jpg",
      "sell_total": 0,
      "promotion_price": 40,
      "promotion_status": true,
      "price": 50
    },
    {
      "product_name": "ซาร่าห์",
      "product_name_en": "ซาร่าห์อิ้ง",
      "product_name_cn": "ซาร่าห์จีน",
      "product_id": "p-101",
      "image": "http://res.cloudinary.com/dzz6rgxkl/image/upload/v1694937393/pharmacy/product/kqsldypdakfw4eavkzew.jpg",
      "sell_total": 0,
      "promotion_price": 0,
      "promotion_status": false,
      "price": 50
    },
    {
      "product_name": "พาราเซตาม่อลกินแล้วแก้ปวดหัว",
      "product_name_en": "ซาร่าห์อิ้ง",
      "product_name_cn": "ซาร่าห์จีน",
      "product_id": "p-101",
      "image": "http://res.cloudinary.com/dzz6rgxkl/image/upload/v1694937393/pharmacy/product/kqsldypdakfw4eavkzew.jpg",
      "sell_total": 0,
      "promotion_price": 40,
      "promotion_status": true,
      "price": 50
    },
    {
      "product_name": "ซาร่าห์",
      "product_name_en": "ซาร่าห์อิ้ง",
      "product_name_cn": "ซาร่าห์จีน",
      "product_id": "p-101",
      "image": "http://res.cloudinary.com/dzz6rgxkl/image/upload/v1694937393/pharmacy/product/kqsldypdakfw4eavkzew.jpg",
      "sell_total": 0,
      "promotion_price": 0,
      "promotion_status": false,
      "price": 50
    },
    {
      "product_name": "พาราเซตาม่อลกินแล้วแก้ปวดหัว",
      "product_name_en": "ซาร่าห์อิ้ง",
      "product_name_cn": "ซาร่าห์จีน",
      "product_id": "p-101",
      "image": "http://res.cloudinary.com/dzz6rgxkl/image/upload/v1694937393/pharmacy/product/kqsldypdakfw4eavkzew.jpg",
      "sell_total": 0,
      "promotion_price": 40,
      "promotion_status": true,
      "price": 50
    },
  ]
*/