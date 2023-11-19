"use client"
import React from "react";
import CardLineChart from "./chart/CardLineChart";
import { AdminDasboardContextType, useAdminDasboard } from "./Context";
import moment from "moment";
import CardLineTransaction from "./chart/CardLineTransaction";



export default function Dashboard() {
  
  const {state, setState}:AdminDasboardContextType = useAdminDasboard?.()!;

  return (
    <>
      <div className="flex flex-col gap-4 flex-wrap overflow-hidden">
        <div className="flex justify-between w-full ">
          <h6 className="text-slate-700 text-lg font-semibold">จำนวนออเดอร์และยอดการเงิน</h6>
          <select
          className="border text-slate-700 text-sm rounded-lg block p-2 outline-none placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
          value={state.year}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setState(prev => ({ ...prev, year: e.target.value }))}
        >
          <option value={String(moment().year()-2)}>{moment().year()-2}</option>
          <option value={String(moment().year()-1)}>{moment().year()-1}</option>
          <option value={String(moment().year())}>{moment().year()}</option>
        </select>

            {/* <CardBarChart /> */}
        </div>
        <div className="w-full">
          {state.orderYear.length > 0 && <CardLineChart state={state} setState={setState} />}
        </div>
        <div className="w-full">
          {state.transactionYear.length > 0 && <CardLineTransaction state={state} setState={setState} />}
        </div>
      </div>
      
    </>
  );
}

