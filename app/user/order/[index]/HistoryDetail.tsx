"use client"

import { Icon } from "@iconify/react"
import { UserOrderContextType, useUserOrder } from "./Context";
import { useMemo } from "react";
import Image from "next/image";
import Input from "@/app/component/Input/Input";
export default function HistoryDetail({
  

}:{
   
}) {


    const { thirdState, setThirdState, handleLang}:UserOrderContextType = useUserOrder?.()!;

    return (
    <>
     <div className="flex gap-2 cursor-pointer mb-8" onClick={() => setThirdState(prev => ({...prev, showDetail:false}))}>
        <Icon
        icon={"formkit:arrowleft"}
        className="w-6 h-6"
        />
        <h6>ย้อนกลับดูรายการอื่น</h6>
    </div>

    {typeof(thirdState.addr) !== "string" && thirdState.selectHistory && 
    <div className="flex flex-col gap-8">
   
    {/* Address */}

   <div className="flex gap-2 flex-col">
        <div className="flex flex-col md:flex-row items-center py-4 px-1 md:px-8  bg-white border border-gray-200 rounded-lg shadow sm:flex-row gap-4 md:gap-10 ">

            <div className="flex flex-col ">
                <Icon icon="zondicons:location" className='text-red-600 h-20 w-20' />
            </div>

            <div className="flex flex-col justify-between p-4 leading-normal w-full md:items-start">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">{thirdState.addr?.location_name}</h5>

                <div className='flex gap-1'>
                    <Icon icon="ph:user" className='mt-1' />
                    <p className="mb-3 font-normal text-gray-700">{thirdState.addr?.first_name} {thirdState.addr?.last_name}</p>
                </div>
                <div className='flex gap-1'>
                    <Icon icon="mdi:telephone" className='mt-1' />
                    <p className="mb-3 font-normal text-gray-700">{thirdState.addr?.telephone}</p>
                </div>
                <div className='flex gap-1'>
                    <Icon icon="tabler:location" className='mt-1' />
                    <p className="mb-3 font-normal text-gray-700">{`${thirdState.addr?.address_desc} ${thirdState.addr?.sub_district} ${thirdState.addr?.district} ${thirdState.addr?.province} ${thirdState.addr?.postal_code} `}</p>
                </div>

            </div>
        </div>
    </div>

    {/* List Product */}
    
    <div className="flex flex-col gap-4 border p-4 rounded shadow">
        <div className="flex gap-2">
            <Icon
            icon={"fluent-mdl2:product"}
            className="w-8 h-8 text-red-500"
            />
            <h6 className="text-2xl">รายการสินค้า</h6>
        </div>
        <hr className="my-2" />
        <div className="block w-full overflow-x-auto">
        <table className="items-center w-full bg-transparent border-collapse border">
            <thead>
            <tr>
            <th className={"px-6 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center bg-white text-blue-500 border-slate-100 "}>
            รายการสินค้า
                </th>
                <th className={"px-6 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center bg-white text-blue-500 border-slate-100 "}>
                ราคาต่อหน่วย
                </th>
                <th className={"px-6 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center bg-white text-blue-500 border-slate-100 "}>
                จำนวน
                </th>
                
            </tr>
            </thead>

            <tbody className="bg-slate-50">
                {thirdState.selectHistory.order.order_product.length !== 0 &&
                    thirdState.selectHistory.order.order_product.map((item, key) => (
                    <tr
                        key={key}
                        className={`border-b-slate-200 odd:bg-slate-100 hover:bg-slate-200/70`}
                    >
                    <th className="flex items-center gap-2 border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-center ">
                        <div className="w-12 h-scrren">
                        <Image
                            alt={item.product.product_name}
                            width="0"
                            height="0"
                            sizes="100vw"
                            className="w-full h-auto"
                            src={item.product.image}
                            />
                        </div>
                        <span className={"ml-3 font-medium text-slate-600 line-clamp-1"}>
                            {handleLang(item.product.product_name, item.product.product_name_en, item.product.product_name_cn)}
                        </span>
                        </th>
                    
                        <th className=" border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-center">
                            <span className={"ml-3 font-medium text-slate-600 "}>
                                {item.product.price}
                            </span>
                        </th>
                    
                        <th className=" border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-center">
                            <span className={"ml-3 font-medium text-slate-600 "}>
                                {item.quantity}
                            </span>
                        </th>
                    
                    </tr>
                    ))}
                </tbody>

        </table>
        </div>
    </div>

    {/* Note */}
                        
    <div className="flex flex-col gap-4 border p-4 rounded shadow">
        <div className="flex">

            <div className="flex gap-2">
                <Icon
                icon={"ph:info-light"}
                className="w-8 h-8 text-red-500"
                />
                <h6 className="text-2xl">หมายเหตุ</h6>
            </div>

         
        </div>
        <hr className="my-2" />
        <div className="cursor-none">
            <Input
            onChange={(e:React.ChangeEvent<HTMLInputElement>) => {}}
            value={thirdState.selectHistory.order.note}
            type="text"
            placeholder="หมายเหตุของคุณ"
            />
        </div>
    </div>

    {/* Vendor */}
    <div className="flex flex-col gap-4 border p-4 rounded shadow">
    <div className="flex gap-2">
        <Icon
        icon={"la:shipping-fast"}
        className="w-8 h-8 text-red-500"
        />
        <h6 className="text-2xl">ตัวเลือกในการจัดส่ง</h6>
    </div>
    <hr className="my-2" />
        <div className="flex flex-col gap-4">
            
            <div className="grid gap-2">
                <h6>การจัดส่ง</h6>
                <div 
                className="border text-slate-700 text-sm rounded-lg block p-2 outline-none placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
                >
                    <h6>{thirdState.selectHistory.order.vendor}</h6>             
                </div>
            </div>
                    
            <div className="grid gap-2">
                <h6>Tracking Number</h6>
                <div 
                className="border text-slate-700 text-sm rounded-lg block p-2 outline-none placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
                >
                    <h6>{!thirdState.selectHistory.order.tracking_number ? "รอแอดมินมาอัพเดตข้อมูล" : thirdState.selectHistory.order.tracking_number}</h6>             
                </div>
            </div>


            <div className="grid gap-2">
                <h6>ติดตามสินค้า</h6>
                <div 
                className="border text-slate-700 text-sm rounded-lg block p-2 outline-none placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
                >
                    <h6>{!thirdState.selectHistory.order.tracking_url ? "รอแอดมินมาอัพเดตข้อมูล" : thirdState.selectHistory.order.tracking_url}</h6>             
                </div>
            </div>
            
            <div className="grid gap-2">
                <h6>ระยะทาง</h6>
                <div 
                className="border text-slate-700 text-sm rounded-lg block p-2 outline-none placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
                >
                    <h6>{thirdState.selectHistory.order.distance} km</h6>             
                </div>
            </div>

            <div className="grid gap-2">
                <h6>น้ำหนัก</h6>
                <div 
                className="border text-slate-700 text-sm rounded-lg block p-2 outline-none placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
                >
                    <h6>{thirdState.selectHistory.order.weight} kg</h6>             
                </div>
            </div>

        </div>
    </div>
    

    {/* Payment */}
    
    <div className="flex flex-col gap-4 border p-4 rounded shadow">
        <div className="flex justify-between">

            <div className="flex gap-2">
                <Icon
                icon={"tdesign:money"}
                className="w-8 h-8 text-red-500"
                />
                <h6 className="text-2xl">วิธีการชำระเงิน</h6>
            </div>

            <div
                className="border text-slate-700 text-sm rounded-lg block p-2 outline-none placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
            >
                <h6>{thirdState.selectHistory.order.payment_method}</h6>
            </div>
        </div>
    <hr className="my-2" />
    

    <div className="flex flex-col gap-4 text-lg">
        <div className="flex justify-end gap-4">
            <h6>ยอดรวมสินค้า</h6>
            <h6>{thirdState.selectHistory.order.total_price! - thirdState.selectHistory.order.shipping_price!}</h6>
        </div>
        <div className="flex justify-end gap-4">
            <h6>ระยะทางการจัดส่ง (km)</h6>
            <h6>{thirdState.selectHistory.order.distance} </h6>
        </div>
        <div className="flex justify-end gap-4">
            <h6>น้ำหนักสินค้า (kg)</h6>
            <h6>{thirdState.selectHistory.order.weight} </h6>
        </div>
        <div className="flex justify-end gap-4">
            <h6>ค่าจัดส่ง</h6>
            
            <h6>{thirdState.selectHistory.order.shipping_price}</h6>
        </div>
        <div className="flex justify-end gap-4">
            <h6>ยอดรวม</h6>
            <h6 className="text-red-500"> {thirdState.selectHistory.order.total_price}</h6>
        </div>
    </div>

    </div>

</div>

    }
    </>
    
        );
}