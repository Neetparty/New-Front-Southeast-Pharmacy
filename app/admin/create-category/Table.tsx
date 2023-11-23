"use client"


import React, { useEffect, useState } from "react";
import Input from "@/app/component/Input/Input";
import { CreateCategoryContextType, useCreateCategory } from "./Context";
import moment from "moment";
import "moment/locale/th"
import { Category } from "./create-category";

export default function Table() {
  
  const { setTableState, tableState }:CreateCategoryContextType = useCreateCategory?.()!;

  const [ cache, setCache ] = useState<Category[]>(tableState.category);

  const onSearch = (search: string) => {
    setTableState((prev) => ({ ...prev, search }));
    if (search === "") {
      return setCache(tableState.category)
    }
    else {
      return setCache(tableState.category.filter((elem) => elem.category_name.includes(search)))
    }
  }

  useEffect(() => {
    setCache(tableState.category)
  }, [tableState.category])


  return (
    <>
      <div className="my-2">
        <div className="flex flex-col gap-2">
          <h6>ค้นหาหมวดหมู่</h6>
          <Input
            value={tableState.search}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => onSearch(e.target.value)}
            placeholder="ค้นหา"
          />
        </div>
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
                หมวดหมู่ทั้งหมด
              </h3>
            </div>
          </div>
        </div>

        <div className="block w-full overflow-x-auto">
          <table className="items-center w-full bg-transparent border-collapse border">
            <thead>
              <tr>
                <th className={"px-6 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center bg-white text-blue-500 border-slate-100 "}>
                  ชื่อหมวดหมู่
                </th>
                <th className={"px-6 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center bg-white text-blue-500 border-slate-100 "}>
                  อัพเดตล่าสุด
                </th>
                <th className={"px-6 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center bg-white text-blue-500 border-slate-100 "}>
                  สร้างเมื่อ
                </th>

                <th className={"px-6 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center bg-white text-blue-500 border-slate-100 "}>
                  แก้ไข/ลบ
                </th>

              </tr>
            </thead>

            <tbody className="bg-slate-50">

              {cache.length !== 0 &&
                cache.map((item, key) => (
                  <tr
                    key={key}
                    className={` border-b-slate-200 odd:bg-slate-100 hover:bg-slate-200/70`}
                  >
                    <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-center ">
                      <span className={"ml-3 font-medium text-slate-600 "}>
                        {item.category_name}
                      </span>
                    </th>

                    <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-center ">
                      <span className={"ml-3 font-medium text-slate-600 "}>
                      {moment(item.updated_at).locale("th").format("lll")}
                      </span>
                    </th>


                    <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-center ">
                      <span className={"ml-3 font-medium text-slate-600 "}>
                        {moment(item.created_at).locale("th").format("lll")}
                      </span>
                    </th>

                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-center flex justify-center">
                      {tableState.index === key ?
                        <select
                          className="border text-slate-700 text-sm rounded-lg block p-2 outline-none placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
                          value={tableState.select}
                          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setTableState(prev => ({ ...prev, select: e.target.value, index: key }))}
                        >
                          <option value={"select"}>เลือก</option>
                          <option value={"update"}>อัพเดต</option>
                          <option value={"delete"}>ลบ</option>
                        </select>
                        :
                        <select
                          className="border text-slate-700 text-sm rounded-lg block p-2 outline-none placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
                          value={"select"}
                          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setTableState(prev => ({ ...prev, select: e.target.value, index: key }))}
                        >
                          <option value={"select"}>เลือก</option>
                          <option value={"update"}>อัพเดต</option>
                          <option value={"delete"}>ลบ</option>
                        </select>
                      }

                    </td>
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
    </>

);

}
