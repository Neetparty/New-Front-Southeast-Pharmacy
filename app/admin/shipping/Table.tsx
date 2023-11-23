"use client"

import { useState, useEffect } from "react";
import Input from "@/app/component/Input/Input";
import { Icon } from "@iconify/react";
import { useRouter } from 'next/navigation'
import { ShippingTable, TableState } from "./Shipping";
import { toast } from "react-toastify";
import { DeleteShipping, ListShipping } from "./shipping-api";
import { Circular } from "@/app/component/Loading/Circular";
import moment from "moment";
import "moment/locale/th"

export default function Table() {

  const router = useRouter()


  const [state, setState] = useState<TableState>({
    loading: false,
    search: "",
    shippingT: [{
      shipping_id: "456",
      name: "test",
      created_at: "123",
      updated_at: "123"
    }],
    index: 0
  })

  const [cache, setCache] = useState<ShippingTable[]>([])

  const onSearch = (search: string) => {

    const data = cache.filter((elem) => elem.name.includes(search))

    return setState(prev => ({ ...prev, shippingT: data, search }))
  }

  useEffect(() => {

    LoadData()

  }, [])

  return (
    <>
      <div className="my-2">
        <div className="flex flex-col gap-2">
          <h6 className="">ค้นหาขนส่ง</h6>
          <Input
            value={state.search}
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
                ขนส่งทั้งหมด
              </h3>
            </div>
          </div>
        </div>
        <div className="block w-full overflow-x-auto">
          <table className="items-center w-full bg-transparent border-collapse border">
            <thead>
              <tr>
                <th className={"px-6 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center bg-white text-blue-500 border-slate-100 "}>
                  ชื่อขนส่ง
                </th>
                <th className={"px-6 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center bg-white text-blue-500 border-slate-100 "}>
                  สร้างเมื่อ
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
              {state.shippingT.length !== 0 &&
                state.shippingT.map((item, key) => (
                  <tr
                    key={key}
                    className={`border-b-slate-200 odd:bg-slate-100 hover:bg-slate-200/70`}
                  >
                    <th className=" border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-center">
                      <span className={"ml-3 font-medium text-slate-600 "}>
                        {item.name}
                      </span>
                    </th>
                    <th className=" border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-center">
                      <span className={"ml-3 font-medium text-slate-600 "}>
                        {moment(item.created_at).locale("th").format("lll")}
                      </span>
                    </th>

                    <th className=" border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-center">
                      <button
                        onClick={() => HandleEdit(item.shipping_id)}
                        className="bg-blue-600 hover:bg-blue-600/70 p-2 px-4 text-white rounded-md"
                      >
                        <Icon
                          icon="mdi:pencil"
                          className="w-4 h-4"
                        />
                      </button>
                    </th>

                    <th className=" border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-center">
                      <button
                        onClick={() => HandleDelete(key)}
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
        <Circular
          loading={state.loading}
        />
      </div>

    </>
  );

  function HandleEdit(id: string) {
    router.push(`/admin/update-shipping/${id}`, { scroll: false })
  }

  async function HandleDelete(index: number) {
    setState(prev => ({ ...prev, loading: true }));
    let shipId: string = "";
    let tempName: string = "";
    let tempShip: ShippingTable[] = [];
    const { shippingT } = state;

    shippingT.forEach((elem, i) => {
      if (index === i) {
        shipId = elem.shipping_id;
        tempName = elem.name
        return;
      }
    });

    if (window.confirm(`คุณต้องการขนส่ง ${tempName} ใช่ไหม`)) {
      const { data, error } = await DeleteShipping(shipId)
      if (error) {
        toast.error(error);
        setState(prev => ({ ...prev, loading: false }));
        return;
      }

      toast.success("ลบขนส่งเรียบร้อยแล้ว");
      for (let i = 0; i < shippingT.length; i++) {
        if (shippingT[i].shipping_id === shipId && shippingT[i] !== undefined) {
          continue;
        }
        else {
          tempShip.push(shippingT[i]);
        }
      }
      setState((prev) => ({ ...prev, shippingT: tempShip, loading: false }))
    }
    else {
      setState((prev) => ({ ...prev, loading: false, select: "setting", index: -1 }))
    }
  }



  async function LoadData() {
    setState(prev => ({ ...prev, loading: true }));
    const { data, error } = await ListShipping();
    if (error || !data) {
      toast.error(error || "error");
      setState(prev => ({ ...prev, loading: false }));
      return;
    }
    else {
      setState((prev) => ({ ...prev, shippingT: data.shipping, loading: false }))
      setCache(data.shipping)
    }
  }



}