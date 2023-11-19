"use client";

import { useEffect, useRef, useState } from "react";
import moment from "moment";
import "moment/locale/th";
import { Pagination } from "@/app/component/Pagination/Pagination";
import { makeRequest } from "@/app/hook/makeRequest";
import { toast } from "react-toastify";
import InputRef from "@/app/component/Input/InputRef";

type Transaction = {
    transaction_id: string;
    payment_method: string; 
    amount: number;
    order_id: string;
    name: string;
    user_id: string;
    created_at: Date;
    gbp_reference_no: string;
};

type TransactionState = {
    transaction: Transaction[];
    loading: boolean;
    currentPage: number;
    totalTransaction: number;
};



const rowsPerPage = 5;

export default function Table() {


    const [state, setState] = useState<TransactionState>({
        transaction: [],
        loading: false,
        currentPage: 1,
        totalTransaction: 0,
    })
    const search = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        if(!search.current?.value){
          LoadData()
        }
    }, [state.currentPage])

   
    return (
    <>

      <h6 className="text-2xl font-semibold">ประวัติ Transaction</h6>
      <div>
          <h6>ค้นหา</h6>
          
          <div className="flex flex-col gap-4">
              <div className="flex gap-2">
                  <InputRef
                      ref={search}
                      placeholder="ค้นหาจาก TransactionId หรือ OrderId หรือ Gb Ref"
                      type="text"
                  />
                  <button
                  className="bg-red-500 hover:bg-red-400 text-white px-4 py-2 rounded-lg w-max"
                  onClick={handleSearch}
                  >
                  <h6>ค้นหา</h6>
                </button>
              </div>
                  <h6 className="text-xs">ถ้าต้องการดูค่าที่ถูกค้นหาอย่าลบคำค้นหาออกจากช่องกรอกคำค้นหา</h6>
          </div>
      
      </div>

      <div
        className={
          "relative flex flex-col min-w-0 break-words w-full mb-6 border rounded bg-slate-200" }
      >
        <div className="rounded-t mb-0 px-4 py-3 border-0 shadow-lg">
          <div className="flex flex-wrap items-center ">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1 ">
              <h3
                className={
                  "font-semibold text-lg text-slate-700"
                }
              >
                Transaction
              </h3>
            </div>
          </div>
        </div>
        <div className="block w-full overflow-x-auto">
          <table className="items-center w-full bg-transparent border-collapse border">
            <thead>
              <tr>
               <th className={"px-6 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center bg-white text-blue-500 border-slate-100 "}>
                  Transaction Id
                </th>
                <th className={"px-6 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center bg-white text-blue-500 border-slate-100 "}>
                  Gb Reference
                </th>
                <th className={"px-6 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center bg-white text-blue-500 border-slate-100 "}>
                  วิธีการชำระเงิน
                </th>
                <th className={"px-6 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center bg-white text-blue-500 border-slate-100 "}>
                  จำนวนเงิน
                </th>
                <th className={"px-6 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center bg-white text-blue-500 border-slate-100 "}>
                  ชื่อยูสเซอร์
                </th>
                <th className={"px-6 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center bg-white text-blue-500 border-slate-100 "}>
                  ออเดอร์ไอดี
                </th>
                <th className={"px-6 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center bg-white text-blue-500 border-slate-100 "}>
                  เวลา
                </th>
            
              </tr>
            </thead>

            <tbody className="bg-slate-50">
                {state.transaction.length !== 0 &&
                    state.transaction.map((item, key) => (
                    <tr
                        key={key}
                        className={`border-b-slate-200 odd:bg-slate-100 hover:bg-slate-200/70`}
                    >
                        <th className=" border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-center">
                            <span className={"ml-3 font-medium text-slate-600 "}>
                                {item.transaction_id}
                            </span>
                        </th>
                       
                        <th className=" border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-center">
                            <span className={"ml-3 font-medium text-slate-600 "}>
                                {item.gbp_reference_no}
                            </span>
                        </th>
                     
                        <th className=" border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-center">
                            <span className={"ml-3 font-medium text-slate-600 "}>
                                {item.payment_method}
                            </span>
                        </th>
                     
                        <th className=" border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-center">
                            <span className={"ml-3 font-medium text-slate-600 "}>
                                {item.amount}
                            </span>
                        </th>
                    
                        <th className=" border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-center">
                            <span className={"ml-3 font-medium text-slate-600 "}>
                                {item.name}
                            </span>
                        </th>
                       
                        <th className=" border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-center">
                            <span className={"ml-3 font-medium text-slate-600 "}>
                                {item.order_id}
                            </span>
                        </th>
                        <th className=" border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-center">
                            <span className={"ml-3 font-medium text-slate-600 "}>
                                {moment(item.created_at).locale("th").format("lll")}
                            </span>
                        </th>
                    </tr>
                    ))}
                </tbody>

          </table>
        </div>
        <Pagination
        count={state.totalTransaction}
        rowsPerPage={rowsPerPage}
        currentPage={state.currentPage}
        setCurrentPage={handleChangePage}
        filteredData={state.transaction}
        />
        </div>

    </>
);

function handleChangePage (currentPage:number) {
    setState(prev => ({...prev, currentPage:currentPage}));
}


async function handleSearch() {
  if(search.current?.value){

    setState(prev => ({ ...prev, loading: true }));
    const { data, error } = await makeRequest<{
      transaction: Transaction[]
      msg:string,
      }>(`/search-transaction?search=${search.current.value}`, {
        method:"GET"
      })

    if (error || !data) {
      toast.error(error || "error");
      setState(prev => ({ ...prev, loading: false }));
      return;
    }
    else {
      setState(prev => ({...prev, loading:false, transaction:data.transaction, totalTransaction:data.transaction.length, currentPage:1}));  

    }
  }
}


async function LoadData() {
  setState(prev => ({...prev, loading:true}));  
  const {data, error} = await makeRequest<{
    transaction: Transaction[]
    msg:string,
      totalTransaction:number
    }>(`/list-transaction?page=${state.currentPage}&perPage=${rowsPerPage}&count=${state.totalTransaction}`, {
      method:"GET"
    })
    if(error || !data?.transaction){
      toast.error(error || "ดูเหมือนมีบางอย่างผิดพลาด");
      setState(prev => ({...prev, loading:false}));  
      return;
    }
    else {
      setState(prev => ({...prev, loading:false, transaction:data.transaction, totalTransaction:data.totalTransaction}));  

    }
}

}