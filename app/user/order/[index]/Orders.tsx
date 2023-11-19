"use client"

import Image from "next/image";
import { UserOrderContextType, useUserOrder } from "./Context";
import moment from "moment";
import 'moment/locale/th';
import OrderDetail from "./OrderDetail";


export default function Order() {

    const { firstState, setFirstState, handleOrderDetail, lang, handleLang, t}:UserOrderContextType = useUserOrder?.()!;

    
    function handleStatus(status:string) {
        switch (status) {
            case "success":
                return <div className="cursor-pointer text-center px-4 py-2 rounded-lg bg-green-500 hover:bg-green-400">
                    <h6>{t("userSortSuccess")}</h6>
                </div>                 
            case "sending":
                return <div className="cursor-pointer text-center px-4 py-2 rounded-lg bg-orange-500 hover:bg-orange-400">
                <h6>{t("userSortSending")}</h6>
            </div> 
            case "waiting":
                return <div className="cursor-pointer text-center px-4 py-2 rounded-lg bg-yellow-500 hover:bg-yellow-400">
                <h6>{t("userSortWaiting")}</h6>
            </div> 
            case "cancel":
                return <div className="cursor-pointer text-center px-4 py-2 rounded-lg bg-red-600 hover:bg-red-500">
                <h6>{t("userSortCancel")}</h6>
            </div> 
        
            default:
                break;
        }
    }

    

    function SortByType(status:string){
        setFirstState(prev => {
            const matchingStatusOrders = prev.order.filter(item => {
                const itemStatus = item.status.trim();
                const filterStatus = status.trim();
                return itemStatus === filterStatus;
            });
            const otherStatusOrders = prev.order.filter(item => {
                const itemStatus = item.status.trim();
                const filterStatus = status.trim();
                return itemStatus !== filterStatus;
            });
            const sortedOrders = [...matchingStatusOrders, ...otherStatusOrders];
            return {...prev, order:sortedOrders, sort:status}
        })
    }


    return (
        <>
           {firstState.showDetail ? 
           <div className="">
                <OrderDetail
                handleLang={handleLang}
                lang={lang}
                />
           </div>

           :
           
           <div className="flex flex-col gap-6 mx-auto ">

           <div className="flex flex-col gap-2">
               <h6>{t("userSortStatus")}</h6>
               <div className="flex justify-end">
               <select
                   className="border w-full text-slate-700 text-sm rounded-lg block p-2 outline-none placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
                   value={firstState.sort}
                   onChange={(event: React.ChangeEvent<HTMLSelectElement>) => SortByType(event.target.value)}
               >
                       <option value={"none"} >{t("userSortNone")}</option>
                       <option value={"sending"} >{t("userSortSending")}</option>
                       <option value={"waiting"} >{t("userSortWaiting")}</option>
                       <option value={"cancel"} >{t("userSortCancel")}</option>
               </select>
               </div>
           </div>


           {firstState.order.length !== 0 ? firstState.order.map((item, i) => (
               <div className="flex flex-wrap md:flex-nowrap justify-between gap-4 border-b pb-2  w-full" key={i}>
                  <div className="flex flex-col gap-4">

                    {item.order_product.map((subItem, j) => (
                        <div className="flex gap-2 items-center" key={i}>
                            <Image
                                src={subItem.product.image}
                                alt={subItem.product.product_name}
                                width={120}
                                height={24}
                                className="w-fit"
                            />
                            <div className="flex flex-col gap-2">
                                <h6 className="text-slate-600 text-base md:line-clamp-2 line-clamp-4">
                                    {handleLang(subItem.product.product_name, subItem.product.product_name_en, subItem.product.product_name_cn)} ({subItem.product.total_product} {t("userPiece")})
                                </h6>
                                {subItem.product.promotion_status ? 
                                <>
                                <span className="text-gray-600 text-sm text-left">{moment(item.created_at).locale(lang.lang || "en").format("lll")}</span>
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
                  <div className="flex flex-col md:flex-row md:justify-end gap-4 items-center">
                       <div className="flex md:flex-col gap-2 text-white">
                           <div 
                           onClick={() => handleOrderDetail(item.order_id)}
                           className="border border-red-500 hover:border-red-400 cursor-pointer text-center px-6 py-2 rounded-lg text-red-500 w-max hover:text-red-400">
                               <h6>{t("userMoreInfo")}</h6>
                           </div>
                         {handleStatus(item.status)}
                       </div>
                  </div>
               </div>
           )): 
           <h6 className="text-xl text-center font-bold text-slate-700 mt-6">{t("userNoOrderList")}</h6>
           }
       </div>
            }
        </>
    );



}

/* 
 const arr = [1, 2, 3, 4, 5]


    return (
        <>
           
            <div className="flex flex-col gap-6 mx-auto ">
                {arr.map((item, i) => (
                    <div className="flex flex-wrap md:flex-nowrap justify-between gap-4 border-b pb-2  w-full items-center" key={i}>
                        <div className="flex gap-2 items-center">
                            <Image
                                src="https://res.cloudinary.com/dzz6rgxkl/image/upload/f_auto,q_auto/v1/majime/vmtndv0zk5y76qqmd8uw"
                                alt="category"
                                width={120}
                                height={24}
                                className="w-fit"
                            />
                            <div className="flex flex-col gap-2">
                                <h6 className="text-slate-600 text-base md:line-clamp-2 line-clamp-4">
                                    Mega Evening Primrose Oil น้ำมันอีฟนิ่งพริมโรส 1000 mg. 100 แคปซูล
                                </h6>
                                <span className="text-red-400 text-lg text-left">฿ 800.00</span>
                                    <div className="flex gap-2 items-start">
                                        <span className="text-gray-500 text-sm mr-2 line-through">฿ 1000.00</span>
                                        <span className="text-gray-500 text-base">-20%</span>
                                    </div>
                            </div>
                        </div>
                       <div className="flex flex-col md:flex-row md:justify-between gap-4 items-center">
                            <div className="flex md:flex-col gap-2 text-white">
                                <div className="cursor-pointer text-center px-4 py-2 rounded-lg bg-green-500 hover:bg-green-400">
                                    <h6>ส่งสำเร็จ</h6>
                                </div>
                                <div className="cursor-pointer text-center px-6 py-2 rounded-lg bg-red-500 hover:bg-red-400 w-max">
                                    <h6>ดูรายละเอียด</h6>
                                </div>
                            </div>
                       </div>
                    </div>
                ))}
            </div>
        </>
    );
*/