"use client";
import Image from "next/image";
import { UserOrderContextType, useUserOrder } from "./Context";
import moment from "moment";
import "moment/locale/th"
import { Icon } from "@iconify/react";
export default function FavItems() {


    const { secondState, handleRemoveFav, AddToCart, lang, handleLang, t }:UserOrderContextType = useUserOrder?.()!;

    return (
    <>
        <div className="flex flex-col gap-8">

        
               {secondState.fav.length !== 0 ? secondState.fav.map((item, i) => (
                    <div className="flex flex-wrap md:flex-nowrap justify-between gap-4 border-b pb-2  w-full items-center" key={i}>
                        <div className="flex gap-2 items-center">
                            <div className=" relative w-[6rem] h-[6rem]">
                                <Image
                                    src={item.product.image}
                                    alt={item.product.product_name}
                                    fill
                                    className="object-contain"
                                />
                            </div>
                         <div className="flex flex-col gap-2">
                             <h6 className="text-slate-600 text-base md:line-clamp-2 line-clamp-4">
                                 {handleLang(item.product.product_name, item.product.product_name_en, item.product.product_name_cn)}
                             </h6>
                             {item.product.promotion_status ? 
                                <>
                                <span className="text-gray-600 text-sm text-left">{moment(item.created_at).locale(lang.lang).format("lll")}</span>
                                 <div className="flex gap-2 items-start">
                                <span className="text-red-400 text-sm text-left">฿ {item.product.promotion_price}</span>
                                     <span className="text-gray-500 text-sm mr-2 line-through">฿ {item.product.price}</span>
                                     <span className="text-gray-500 text-sm">-{(((Number(item.product.price) - Number(item.product.promotion_price)) / Number(item.product.price)) * 100).toFixed(0)}%</span>
                                </div>
                                </> 
                                :
                                <h1 className="text-gray-700  text-sm">{t("searchPrice")} ฿ {item.product.price}</h1>
                            }
                         </div>
                     </div>
                       <div className="flex flex-col md:flex-row md:justify-between gap-4 items-center">
                            <div className="flex md:flex-col gap-2 text-white">

                                <div 
                                className="flex justify-center cursor-pointer border text-red-500 hover:text-red-400 border-red-500 hover:border-red-400 rounded-lg px-4 py-1 "
                                onClick={() => handleRemoveFav(item.product_id)}
                                >
                                    <Icon
                                    icon={"mdi:bin"}
                                    className=" cursor-pointer w-6 h-6"
                                    />
                                    <h6>{t("userFavDelete")}</h6>
                                </div>
                                <div 
                                onClick={() => AddToCart(item.product_id)}
                                className="cursor-pointer text-center px-6 py-2 rounded-lg bg-red-500 hover:bg-red-400 w-max flex gap-1 items-center">
                                    <Icon
                                    icon={"bi:cart"}
                                    className="w-4 h-4"
                                    />
                                    <h6>{t("userFavAddToCard")}</h6>
                                </div>
                            </div>
                       </div>
                    </div>
                )):
                <h6 className="text-xl text-center font-bold text-slate-700 mt-6">{t("userNoFavProduct")}</h6>
                }
            </div>
    </>
);
}