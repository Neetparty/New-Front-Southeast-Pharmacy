"use client"

import Image from "next/image";
import { UserOrderContextType, useUserOrder } from "./Context";
import moment from "moment";
import HistoryDetail from "./HistoryDetail";

export default function HistoryOrder() {

    const { thirdState, handleLang, handleHistoryDetail, lang, t }:UserOrderContextType = useUserOrder?.()!;

    return (
        <>
            

            {thirdState.showDetail ? 
            <HistoryDetail/>
            :
            <div className="flex flex-col gap-8">
            {thirdState.history.length !== 0 ? thirdState.history.map((item, i) => (
                <div className="flex flex-wrap md:flex-nowrap justify-between gap-4 border-b pb-2  w-full" key={i}>
                    <div className="flex flex-col gap-4">
                  {item.order.order_product.map((subItem, j) => (
                     <div className="flex gap-2 items-center" key={j}>
                     <Image
                         src={subItem.product.image}
                         alt={subItem.product.product_name}
                         width={120}
                         height={24}
                         className="w-fit"
                     />
                     <div className="flex flex-col gap-2">
                         <h6 className="text-slate-600 text-base md:line-clamp-2 line-clamp-4">
                             {handleLang(subItem.product.product_name, subItem.product.product_name_en, subItem.product.product_name_cn)} ({subItem.product.total_product} ชิ้น)
                         </h6>
                         {subItem.product.promotion_status ? 
                         <>
                             <div className="flex gap-2 items-start">
                                 <span className="text-red-400 text-sm text-left">฿ {subItem.product.promotion_price}</span>
                                 <span className="text-gray-500 text-sm mr-2 line-through">฿ {subItem.product.price}</span>
                                 <span className="text-gray-500 text-sm">-{(((Number(subItem.product.price) - Number(subItem.product.promotion_price)) / Number(subItem.product.price)) * 100).toFixed(0)}%</span>
                         </div>
                         </> 
                         :
                         <h1 className=" text-gray-700 text-sm">{t("searchPrice")} ฿ {subItem.product.price}</h1>
                        }
                     </div>
                 </div>
                  ))}
                  </div>
                  <div className="flex flex-col md:flex-row md:justify-between gap-4 items-center">
                       <div className="flex items-center md:flex-col gap-2 text-white">
                            <span className="text-gray-600 text-sm text-left">{moment(item.created_at).locale(lang.lang).format("lll")}</span>
                           <div 
                           onClick={() => handleHistoryDetail(item.order.order_id)}
                           className="cursor-pointer text-center px-6 py-2 rounded-lg text-white w-max hover:bg-red-400 bg-red-500">
                               <h6>{t("userMoreInfo")}</h6>
                           </div>
                       </div>
                  </div>
               </div>
           )):
           <h6 className="text-xl text-center font-bold text-slate-700 mt-6">{t("userNoHistoryOrder")}</h6>
           
        }
            </div>
            }
        </>
    );
}