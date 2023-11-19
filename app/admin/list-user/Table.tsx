"use client"

import React from "react";
import { AdminUserContextType, useAdminUser } from "./Context";
import { Pagination } from "@/app/component/Pagination/Pagination";
import moment from "moment";
import "moment/locale/th"
import { User } from "./list-user";

export default function Table() {



  const { state, setState, rowsPerPage, handleChangePage }:AdminUserContextType = useAdminUser?.()!;

  // const filteredData = useMemo(() => state.user.filter(searched(state.search)), [branchData, state.search]);


  return (
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
              ยูสเซอร์ทั้งหมด
            </h3>
          </div>
        </div>
      </div>
      <div className="block w-full overflow-x-auto">
        <table className="items-center w-full bg-transparent border-collapse border">
          <thead>
            <tr>
              <th className={"px-6 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center bg-white text-blue-500 border-slate-100 "}>
                ชื่อผู้ใช้
              </th>
              <th className={"px-6 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center bg-white text-blue-500 border-slate-100 "}>
                อีเมล์
              </th>
              <th className={"px-6 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center bg-white text-blue-500 border-slate-100 "}>
                สมาชิกเมื่อ
              </th>
              <th className={"px-6 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center bg-white text-blue-500 border-slate-100 "}>
                ตำแหน่ง
              </th>
              <th className={"px-6 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center bg-white text-blue-500 border-slate-100 "}>
                แก้ไข/ลบ
              </th>

            </tr>
          </thead>

          <tbody className="bg-slate-50">

            {state.user.length !== 0 &&
              state.search ? 
              state.user.slice((state.currentPage-1) * rowsPerPage, (state.currentPage * rowsPerPage)).map((item, key) => (
                  renderTableData(item, key)
                  ))
                  :
                  state.user.map((item, key) => (
                  renderTableData(item, key)
                ))
            }


          </tbody>
        </table>
        <Pagination
        count={state.countUser}
        currentPage={state.currentPage}
        rowsPerPage={rowsPerPage}
        setCurrentPage={handleChangePage}
        filteredData={state.user}
        />
      </div>
      {/* <Circular
          loading={state.loading}
          /> */}
    </div>

  );
function renderTableData(item:User, key:number) {
  return (
    <tr
    key={key}
    className={` border-b-slate-200 odd:bg-slate-100 hover:bg-slate-200/70`}
  >
    <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-center ">
      <span className={"ml-3 font-medium text-slate-600 "}>
        {item.user_name}
      </span>
    </th>

    <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-center ">
      <span className={"ml-3 font-medium text-slate-600 "}>
        {item.email}
      </span>
    </th>


    <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-center ">
      <span className={"ml-3 font-medium text-slate-600 "}>
        {moment(item.created_at).locale("th").format("lll")}
      </span>
    </th>

    <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-center ">
      <span className={"ml-3 font-medium text-slate-600 "}>
        {item.role}
      </span>
    </th>

    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-center flex justify-center">
      {state.index === key ?
        <select
          className="border text-slate-700 text-sm rounded-lg block p-2 outline-none placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
          value={state.select}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setState(prev => ({ ...prev, select: e.target.value, index: key }))}
        >
          <option value={"setting"}>แก้ไข</option>
          <option value={"update"}>อัพเดต</option>
          {/* <option value={"delete"}>ลบ</option> */}
        </select>
        :
        <select
          className="border text-slate-700 text-sm rounded-lg block p-2 outline-none placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
          value={"setting"}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setState(prev => ({ ...prev, select: e.target.value, index: key }))}
        >
          <option value={"setting"}>แก้ไข</option>
          <option value={"update"}>อัพเดต</option>
          {/* <option value={"delete"}>ลบ</option> */}
        </select>
      }

    </td>
  </tr>
  )
}
 
}

