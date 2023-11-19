"use client"
import moment from "moment";
import "moment/locale/th"
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import React from "react";
import { Circular } from "@/app/component/Loading/Circular";
import { useRouter } from 'next/navigation'
import Input from "@/app/component/Input/Input";
import { ConfirmState, Order } from "./ConfirmOrder";
import { ListOrder, ListOrderBySearch } from "./ConfirmOrder-api";
import { Pagination } from "@/app/component/Pagination/Pagination";

const rowsPerPage = 10; 

export default function Table() {
  const router = useRouter()
  const [state, setState] = useState<ConfirmState>({
    order: [],
    loading: false,
    select: "",
    index: -1,
    search: "",
    selectSearch: "waiting",
    currentPage: 1,
    countOrder: 0,
  });

  const handleChangePage = (currentPage:number) => {
    setState(prev => ({...prev, currentPage:currentPage}));
  }

  useEffect(() => {

    if(!state.select){
      LoadData()
    }

  }, [state.currentPage, state.selectSearch])


  useEffect(() => {
    // if (state.index !== -1 && state.select === "delete") {
    //   HandleDelete()
    // }
    if (state.index !== -1 && state.select === "update") {
      HandleUpdate()
    }
  }, [state.select])


  const statusArr: {key:string, value:string}[] = [
    {
        key:"รอยืนยัน",
        value:"waiting"
    },
    {
        key:"กำลังส่ง",
        value:"sending"
    },
    {
        key:"ส่งสำเร็จ",
        value:"success"
    },
    {
        key:"ยกเลิก",
        value:"cancel"
    },
  ]

  console.log(state)

  return (
    <>
      <div className="p-8 flex flex-col gap-8">
        <h6 className="text-3xl font-bold">ยืนยันออเดอร์</h6>

        <div className="flex flex-col gap-4">
          <h6 className="text-xl">ค้นหาจากชื่อยูสเซอร์</h6>
        </div>
        <div className="">

        <div className="flex flex-col sm:flex-row gap-2">
          <Input
            value={state.search}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setState(prev => ({ ...prev, search: e.target.value }))}
            placeholder="ค้นหาจากชื่อยูสเซอร์"
            icon="material-symbols:search"
            iconClassName="w-6 h-6"
          />
          <button 
          onClick={handleSearch}
          className="w-max text-white px-4 py-2 rounded-lg bg-red-500 hover:bg-red-400">
            <h6>ค้นหา</h6>
          </button>
        </div>

          <h6 className="mt-2 text-xs">ถ้าต้องการดูค่าที่ถูกค้นหาอย่าลบคำค้นหาออกจากช่องกรอกคำค้นหา</h6>
        </div>

        <div className="flex gap-2 flex-col">
            <h6>ตามสถานะออเดอร์</h6>
            <select
                className="border text-slate-700 text-sm rounded-lg block p-2 outline-none placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
                value={state.selectSearch}
                onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
                  //@ts-ignore
                  setState(prev => ({ ...prev, selectSearch: event.target.value }))
                }}
            >
                {statusArr.map((item, i) => (
                    <option value={item.value} key={i}>{item.key}</option>
                ))}
            </select>
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
              ยืนยันออเดอร์
            </h3>
          </div>
        </div>
      </div>
      <div className="block w-full overflow-x-auto">
        <table className="items-center w-full bg-transparent border-collapse border">
          <thead>
            <tr>
              <th className={"px-6 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center bg-white text-blue-500 border-slate-100 "}>
                ชื่อผู้สั่ง
              </th>
              <th className={"px-6 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center bg-white text-blue-500 border-slate-100 "}>
                ออเดอร์
              </th>
              <th className={"px-6 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center bg-white text-blue-500 border-slate-100 "}>
                สถานะขนส่ง
              </th>
              <th className={"px-6 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center bg-white text-blue-500 border-slate-100 "}>
                 ราคา
              </th>
              <th className={"px-6 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center bg-white text-blue-500 border-slate-100 "}>
                 ช่องทาง
              </th>
              <th className={"px-6 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center bg-white text-blue-500 border-slate-100 "}>
                 Reference
              </th>
              
              <th className={"px-6 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center bg-white text-blue-500 border-slate-100 "}>
                 GB Reference
              </th>
              <th className={"px-6 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center bg-white text-blue-500 border-slate-100 "}>
                 เวลาสร้าง
              </th>
              <th className={"px-6 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center bg-white text-blue-500 border-slate-100 "}>
                ยืนยัน/ยกเลิก
              </th>

                </tr>
              </thead>

              <tbody className="bg-slate-50">

                {state.order.length !== 0 &&
                  state.search ? 
                  state.order.slice((state.currentPage-1) * rowsPerPage, (state.currentPage * rowsPerPage)).map((item, key) => (
                    renderTable(item, key)
                  ))
                    :
                  state.order.map((item, key) => (
                    renderTable(item, key)
                  ))
                }

              </tbody>
            </table>
          </div>
          <Circular
          loading={state.loading}
          />
        </div>

          <Pagination
          count={state.countOrder}
          currentPage={state.currentPage}
          rowsPerPage={rowsPerPage}
          setCurrentPage={handleChangePage}
          filteredData={state.order}
          />

      </div>
    </>

  );

function renderTable(item:Order, key:number){
  return (
    <tr
    key={key}
    className={` border-b-slate-200 odd:bg-slate-100 hover:bg-slate-200/70`}
  >
    <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-center ">
      <span className={"ml-3 font-medium text-slate-600 "}>
        {item.user.user_name}
      </span>
    </th>

    <th className="border-t-0 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-center ">
      <span className={"ml-3 font-medium text-slate-600 flex justify-center "}>
        {item.order_product.map((subItem, i) => (
          <h6 key={i}>{subItem.product.product_name},</h6>
        ))}
      </span>
    </th>


    <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-center ">
      {CheckStatus(item.status)}
    </th>

    <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-center ">
      <span className={"ml-3 font-medium text-slate-600 "}>
        {item.total_price}
      </span>
    </th>

    <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-center ">
      <span className={"ml-3 font-medium text-slate-600 "}>
        {item.transaction[0].payment_method}
      </span>
    </th>

    <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-center ">
      <span className={"ml-3 font-medium text-slate-600 "}>
        {item.transaction[0].transaction_id}
      </span>
    </th>
   
    <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-center ">
      <span className={"ml-3 font-medium text-slate-600 "}>
        {item.transaction[0].gbp_reference_no}
      </span>
    </th>

    <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-center ">
      <span className={"ml-3 font-medium text-slate-600 "}>
        {moment(item.created_at).locale("th").format("lll")}
      </span>
    </th>

    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-center flex justify-center">
      {state.index === key ?
        <select
          className="border text-slate-700 text-sm rounded-lg block p-2 outline-none placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
          value={state.select}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setState(prev => ({ ...prev, select: e.target.value, index: key }))}
        >
          <option value={"confirm"}>ยืนยัน</option>
          <option value={"update"}>อัพเดต</option>
          {/* <option value={"cancel"}>ยกเลิก</option> */}
        </select>
        :
        <select
          className="border text-slate-700 text-sm rounded-lg block p-2 outline-none placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
          value={"setting"}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setState(prev => ({ ...prev, select: e.target.value, index: key }))}
        >
          <option value={"confirm"}>ยืนยัน</option>
          <option value={"update"}>อัพเดต</option>
          {/* <option value={"cancel"}>ยกเลิก</option> */}
        </select>
      }
    </td>
  </tr>
  )
}


async function handleSearch(e:React.MouseEvent<HTMLButtonElement>) {
  e.preventDefault();

  if(state.search){
    setState(prev => ({...prev, loading:true}));
  const {data, error} = await ListOrderBySearch(state.search);
  if(error || !data?.order){
    toast.error(error || "มีบางอย่างผิดพลาด");
    setState(prev => ({...prev, loading:false}));
    return;
  }
  else {
    setState(prev => ({ ...prev, order: data.order, loading: false, countOrder:data.order.length }))
  }
  }

}

async function LoadData() {
  setState(prev => ({ ...prev, loading: true }));
  const { data, error } = await ListOrder(state.selectSearch, state.currentPage, rowsPerPage, state.countOrder);
  //@ts-ignore
  if (error || !data?.order ) {
    toast.error(error || "error");
    setState(prev => ({ ...prev, loading: false }));
    return;
  }
  else {
    setState(prev => ({ ...prev, order: data.order, loading: false, countOrder:data.totalOrder }))
  }
}


async function HandleUpdate() {
  let tempId: string = "";
  const { order, index } = state;

  order.forEach((elem, i) => {
    if (index === i) {
      tempId = elem.order_id;
      return;
    }
  });

  router.push(`/admin/update-order/${tempId}`, { scroll: false })

}

function CheckStatus(status: string) {
  if (status === "success") {
    return (
      <div className="">
        <span className={"shadow bg-green-500 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"}>
          ส่งสำเร็จ
        </span>
      </div>

    )
  }
  else if (status === "sending") {
    return (
      <span className={"shadow bg-orange-500 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"}>
        กำลังส่ง
      </span>
    )
  }
  else if (status === "waiting") {
    return (
      <span className={"shadow bg-yellow-500 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"}>
        รอยืนยัน
      </span>
    )
  }
  else if (status === "cancel") {
    return (
      <span className={"shadow bg-red-500 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"}>
        ยกเลิก
      </span>
    )
  }
}

}

