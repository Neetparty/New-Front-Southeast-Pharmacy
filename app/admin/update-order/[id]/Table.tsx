"use client"

import React from "react";
import { Circular } from "@/app/component/Loading/Circular";
import Image from "next/image";
import { UpdateOrderContext, useUpdateOrder } from "./Context";



export default function Table() {

  const { tableState }:UpdateOrderContext = useUpdateOrder?.()!;


  return (
    <>
      <div>
        <div className="flex mb-4  justify-between items-center w-full">
          <h6 className="py-2 text-xl">รายการสินค้า</h6>
        </div>
        <div
          className={
            "relative flex flex-col min-w-0 break-words w-full mb-6 border rounded bg-slate-200"}
        >

          <div className="rounded-t mb-0 px-4 py-3 border-0 shadow-lg">
            <div className="flex flex-wrap items-center ">
              <div className="relative w-full px-4 max-w-full flex-grow flex-1 ">
                <h3
                  className={
                    "font-semibold text-lg text-slate-700"
                  }
                >
                  สินค้าทั้งหมด
                </h3>
              </div>
            </div>
          </div>
          <div className="block w-full overflow-x-auto">
            <table className="items-center w-full bg-transparent border-collapse">
              <thead>
                <tr>
                  <th className={"px-6 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center bg-white text-blue-500 border-slate-100 "}>
                    รูปภาพ
                  </th>
                  <th className={"px-6 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center bg-white text-blue-500 border-slate-100 "}>
                    ชื่อสินค้า
                  </th>
                  <th className={"px-6 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center bg-white text-blue-500 border-slate-100 "}>
                    ราคา
                  </th>
                  <th className={"px-6 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center bg-white text-blue-500 border-slate-100 "}>
                    จำนวน
                  </th>
                 
                </tr>
              </thead>

              <tbody className="bg-slate-50">

                {tableState.order_product.length !== 0 &&
                  tableState.order_product.map((item, key) => (
                    <tr
                      key={key}
                      className={` border-b-slate-200 odd:bg-slate-100 hover:bg-slate-200/70`}
                    >


                      <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap mx-auto flex justify-center ">
                        <div className="w-12 h-12">
                          <Image 
                          alt={item.product.product_name} 
                          src={item.product.image} 
                          className="w-full h-full object-contain"
                          width={60}
                          height={20}
                          />
                        </div>
                      </th>

                      <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap text-center ">
                        <span className={"ml-3 font-medium text-slate-600  whitespace-normal line-clamp-1 md:line-clamp-2"}>
                          {item.product.product_name}
                        </span>
                      </th>

                      <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap text-center ">
                        <span className={"ml-3 font-medium text-slate-600 "}>
                          {item.product.price}
                        </span>
                      </th>

                      <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap text-center ">
                        <span className={"ml-3 font-medium text-slate-600 "}>
                          {item.product.total_product}
                        </span>
                      </th>

                     
                    </tr>
                  ))
                }

              </tbody>
            </table>

          </div>

          {/* <Circular
            loading={tableState.loading}
          /> */}
        </div>
        <div className="flex justify-end py-10">
          <div className="">
            
            <div className="gap-20 py-2 flex justify-between">
              <div className="">
                <h6>ระยะทางการจัดส่ง (km)</h6>
              </div>
              <div className="">
                <h6>{tableState.distance}</h6>
              </div>
            </div>
           
            <div className="gap-20 py-2 flex justify-between">
              <div className="">
                <h6>น้ำหนักสินค้า (kg)</h6>
              </div>
              <div className="">
                <h6>{tableState.weight}</h6>
              </div>
            </div>
           
            <div className="gap-20 py-2 flex justify-between">
              <div className="">
                <h6>ยอดรวมสินค้า</h6>
              </div>
              <div className="">
                <h6>฿{tableState.total_price - tableState.shipping_price}</h6>
              </div>
            </div>

            <div className="gap-20 py-2 flex justify-between">
              <div className="">
                <h6>ค่าจัดส่ง</h6>
              </div>
              <div className="">
                <h6>฿{tableState.shipping_price}</h6>
              </div>
            </div>

            <div className="gap-20 py-2 flex justify-between">
              <div className="">
                <h6>การชำระเงินทั้งหมด</h6>
              </div>
              <div className="">
                <h6>฿{tableState.total_price}</h6>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>

  );




}

