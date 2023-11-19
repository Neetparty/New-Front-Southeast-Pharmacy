"use client"

import { Promotion } from "./promotion";
import Input from "@/app/component/Input/Input";
import { Icon } from "@iconify/react";
import { PromotionContextType, usePromotion } from "./Context";
import { useCallback, useMemo } from "react";

export default function Table() {

  const { setTableState, TableState, HandleUpdate, HandleDelete }: PromotionContextType = usePromotion?.()!;
  
  const searched = useCallback(
    (search: string) => (data: Promotion) =>
      data.promotion_name.includes(search),
    []
  );
  const filteredData = useMemo(() => TableState.promotion.filter(searched(TableState.search)), [TableState.search, TableState.promotion]);
  

  return (
    <>
      <div className="my-2">
        <div className="flex flex-col gap-2">
          <h6>ค้นหาโปรโมชั่น</h6>
          <Input
            value={TableState.search}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTableState(prev => ({ ...prev, search: e.target.value }))}
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
                โปรโมชั่นทั้งหมด
              </h3>
            </div>
          </div>
        </div>
        <div className="block w-full overflow-x-auto">
          <table className="items-center w-full bg-transparent border-collapse border">
            <thead>
              <tr>
                <th className={"px-6 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center bg-white text-blue-500 border-slate-100 "}>
                  ชื่อโปรโมชั่น
                </th>
                <th className={"px-6 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center bg-white text-blue-500 border-slate-100 "}>
                  แก้ไข
                </th>
                <th className={"px-6 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center bg-white text-blue-500 border-slate-100 "}>
                  ลบ
                </th>

              </tr>
            </thead>

            <tbody className="bg-slate-50">
              {filteredData.length !== 0 &&
                filteredData.map((item, key) => (
                  <tr
                    key={key}
                    className={`border-b-slate-200 odd:bg-slate-100 hover:bg-slate-200/70`}
                  >
                    <th className="w-4/6 border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-center">
                      <span className={"ml-3 font-medium text-slate-600 "}>
                        {item.promotion_name}
                      </span>
                    </th>

                    <th className="w-1/6 border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-center">
                      <button
                        onClick={() => HandleUpdate(item)}
                        className="bg-blue-600 hover:bg-blue-600/70 p-2 px-4 text-white rounded-md"
                      >
                        <Icon
                          icon="mdi:pencil"
                          className="w-4 h-4"
                        />
                      </button>
                    </th>

                    <th className="w-1/6 border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-center">
                      <button
                        onClick={() => HandleDelete(item.promotion_id)}
                        className="bg-red-500 hover:bg-red-500/70 p-2 px-4 text-white rounded-md"
                      >
                        <Icon
                          icon="mdi:bin"
                          className="w-4 h-4"
                        />
                      </button>
                    </th>
                  </tr>
                ))}
            </tbody>

          </table>
        </div>
        {/* <Circular
          loading={state.loading}
          /> */}
      </div>

    </>
  );



}