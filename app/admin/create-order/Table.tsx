"use client"

import { useEffect, useState } from "react";
import React from "react";
import { Circular } from "@/app/component/Loading/Circular";
import { TableState, cart } from "./create-order";
import picture1 from "./category.png"
import Image from "next/image";
import DialogContent from "./dialog";


export default function Table() {

  const cart1 = [{ cart_id: "001" }, { cart_id: "001" }, { cart_id: "001" }]
  const product1 = [{
    product_id: "101",
    product_th: "AAA",
    index: 1,
    price: 200,
    images: picture1
  },
  {
    product_id: "102",
    product_th: "BBB",
    index: 2,
    price: 300,
    images: picture1
  },
  {
    product_id: "103",
    product_th: "CCC",
    index: 3,
    price: 100,
    images: picture1
  }]

  const quantity1 = 1


  const [state, setState] = useState<TableState>({
    cartProduct: [{ cart: cart1, product: product1, quantity: quantity1 }],
    loading: false,
    select: "",
    index: -1,
    open: false,
    selectedProduct: [],
    search: ""
  });




  useEffect(() => {
    console.log(state);
    // LoadData()

  }, [])

  useEffect(() => {
    if (state.index !== -1 && state.select === "delete") {
      HandleDelete()
    }
    else if (state.index !== -1 && state.select === "update") {
      HandleEdit()
    }
  }, [state.select])



  return (
    <>
      <div>
        <div className="flex mb-4  justify-between items-center w-full">
          <h6 className="py-2 text-xl">รายการสินค้า</h6>
          <button
            className="border border-green-500 py-2 px-4 text-green-600 hover:bg-green-100 rounded-xl"
            onClick={onOpen}
          >
            เพิ่มสินค้า
          </button>
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
                  <th className={"px-6 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center bg-white text-blue-500 border-slate-100 "}>
                    แก้ไข/ลบ
                  </th>

                </tr>
              </thead>

              <tbody className="bg-slate-50">

                {state.cartProduct.length !== 0 &&
                  state.cartProduct.map((item, key) => (
                    item.product.map((item1, key) => (
                      <tr
                        key={key}
                        className={` border-b-slate-200 odd:bg-slate-100 hover:bg-slate-200/70`}
                      >


                        <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap mx-auto flex justify-center ">
                          <div className="w-12 h-12">
                            <Image alt="test" src={item1.images} className="w-full h-full object-contain" />
                          </div>
                        </th>

                        <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap text-center ">
                          <span className={"ml-3 font-medium text-slate-600  whitespace-normal line-clamp-1 md:line-clamp-2"}>
                            {item1.product_th}
                          </span>
                        </th>

                        <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap text-center ">
                          <span className={"ml-3 font-medium text-slate-600 "}>
                            {item1.price}
                          </span>
                        </th>

                        <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap text-center ">
                          <span className={"ml-3 font-medium text-slate-600 "}>
                            {item.quantity}
                          </span>
                        </th>

                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap text-center h-full ">
                          {state.index === key ?
                            <select
                              className="border text-slate-700 text-sm rounded-lg block p-2 outline-none placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 mx-auto"
                              value={state.select}
                              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setState(prev => ({ ...prev, select: e.target.value, index: key }))}
                            >
                              <option value={"setting"}>แก้ไข/ลบ</option>
                              <option value={"update"}>อัพเดต</option>
                              <option value={"delete"}>ลบ</option>
                            </select>
                            :
                            <select
                              className="border text-slate-700 text-sm rounded-lg block p-2 outline-none placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 mx-auto"
                              value={"setting"}
                              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setState(prev => ({ ...prev, select: e.target.value, index: key }))}
                            >
                              <option value={"setting"}>แก้ไข/ลบ</option>
                              <option value={"update"}>อัพเดต</option>
                              <option value={"delete"}>ลบ</option>
                            </select>
                          }
                        </td>
                      </tr>
                    ))
                  ))

                }

              </tbody>
            </table>
          </div>

          <Circular
            loading={state.loading}
          />
        </div>
      </div>
      <DialogContent
        state={state}
        setState={setState}
      />
    </>

  );


  function onOpen() {
    setState(prev => ({ ...prev, open: true }))
  }

  async function LoadData() {
    
  }

  async function HandleDelete() {
    
  }

  async function HandleEdit() {
    
  }

}

