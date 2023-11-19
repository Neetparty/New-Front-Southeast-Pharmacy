"use client"
import Input from "@/app/component/Input/Input";
import { useState, useEffect } from "react";
import { Rate, RateState } from "./Shipping";
import { Icon } from "@iconify/react";
import { CreateShippingRate, DeleteShippingRate, GetShippingRateWeight, UpdateShippingRate } from "./update-shipping-api";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function Rate({ ShipID = "" }: { ShipID: string }) {

    const router = useRouter();
    const [state, setState] = useState<RateState>({
        price: null,
        rangeStart: null,
        rangeEnd: null,
        editPrice: null,
        editRangeStart: null,
        editRangeEnd: null,
        rate: [],
        index: -1,
        loading: false,
        type: "weight"
    })

    useEffect(() => {
        LoadData()
    }, [])



    return (
        <>
            <div className="">
                <div>
                    <h6 className="text-3xl font-bold mb-6">เรทน้ำหนัก</h6>
                    <h6 className="text-sm text-red-500 mb-6">เช่นถ้าหากใส่ 5 กิโลกรัม 10 บาท และใส่อีกอันเป็น 10 กิโลกรัม 12 บาท แล้วระยะทางผู้ใช้ห่างจากเรา 8 กิโลกรัมจะคิดเรทราคาเป็นช่วง 10 กิโลกรัมก็คือ 12 บาท</h6>
                </div>
                <form onSubmit={onSubmit} className="flex flex-col gap-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex gap-2 flex-col">
                            <h6>เรทน้ำหนักเริ่มต้น (กิโลกรัม)</h6>
                            <Input
                                value={state.rangeStart}
                                onChange={onChangeRangeDistanceStart}
                                placeholder="เเรทน้ำหนักหน่วยกิโลกรัม เช่น 5"
                                type="number"
                            />
                        </div>

                        <div className="flex gap-2 flex-col">
                            <h6>เรทน้ำหนักสิ้นสุด (กิโลกรัม)</h6>
                            <Input
                                value={state.rangeEnd}
                                onChange={onChangeRangeDistanceEnd}
                                placeholder="เเรทน้ำหนักหน่วยกิโลกรัม เช่น 5"
                                type="number"
                            />
                        </div>

                    </div>
                    <div className="flex gap-2 flex-col">
                        <h6>เรทราคาของน้ำหนัก (บาท)</h6>
                        <Input
                            value={state.price}
                            onChange={onChangePriceDistance}
                            placeholder="เรทราคาของน้ำหนัก"
                            type="number"
                        />
                    </div>

                    <div className="flex justify-end my-4">
                        <button
                            type="submit"
                            className="px-2 p-3 text-white bg-red-500 rounded-md w-fit hover:bg-red-400 disabled:bg-slate-500 disabled:text-slate-200 disabled:cursor-not-allowed"
                            disabled={state.rangeEnd === null || state.rangeStart === null}
                        >
                            <h6 className="font-semibold">เพิ่มเรทน้ำหนัก</h6>
                        </button>
                    </div>
                </form>


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
                                    เรทราคาตามน้ำหนัก
                                </h3>
                            </div>
                        </div>
                    </div>

                    <div className="block w-full overflow-x-auto">
                        <table className="items-center w-full bg-transparent border-collapse border">
                            <thead>
                                <tr>
                                    <th className={"px-6 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center bg-white text-blue-500 border-slate-100 "}>
                                        น้ำหนักเริ่มต้น (กิโลกรัม)
                                    </th>
                                    <th className={"px-6 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center bg-white text-blue-500 border-slate-100 "}>
                                        น้ำหนักสิ้นสุด (กิโลกรัม)
                                    </th>
                                    <th className={"px-6 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center bg-white text-blue-500 border-slate-100 "}>
                                        เรทราคา (บาท)
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

                                {state.rate.length !== 0 &&
                                    state.rate.map((item, key) => (
                                        <tr
                                            key={key}
                                            className={` border-b-slate-200 odd:bg-slate-100 hover:bg-slate-200/70`}
                                        >

                                            {state.index === key ?
                                                <>
                                                    <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap text-center ">
                                                        <Input
                                                            value={state.editRangeStart}
                                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setState(prev => ({ ...prev, editRangeStart: Number(e.target.value) }))}
                                                            type="number"
                                                            autoFocus={true}
                                                            className="focus:ring focus:ring-red-500 border-red-300 border"
                                                        />
                                                    </th>

                                                    <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap text-center ">
                                                        <Input
                                                            value={state.editRangeEnd}
                                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setState(prev => ({ ...prev, editRangeEnd: Number(e.target.value) }))}
                                                            type="number"
                                                            className="focus:ring focus:ring-red-500 border-red-300 border"
                                                        />
                                                    </th>

                                                    <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap text-center ">
                                                        <Input
                                                            value={state.editPrice}
                                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setState(prev => ({ ...prev, editPrice: Number(e.target.value) }))}
                                                            type="number"
                                                            className="focus:ring focus:ring-red-500 border-red-300 border"
                                                        />
                                                    </th>
                                                    <th className="flex gap-2 justify-center border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-center">
                                                        <button
                                                            onClick={() => HandleUpdate(item.shipping_rate_id)}
                                                            className="bg-green-600 hover:bg-green-600/70 p-2 px-4 text-white rounded-md"
                                                        >
                                                            <h6 className="font-medium">ยืนยันอัพเดต</h6>
                                                        </button>
                                                        <button
                                                            onClick={() => HandleCancel()}
                                                            className="bg-orange-600 hover:bg-orange-600/70 p-2 px-4 text-white rounded-md"
                                                        >
                                                            <h6 className="font-medium">ยกเลิก</h6>
                                                        </button>
                                                    </th>
                                                </>
                                                :
                                                <>
                                                    <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap text-center ">
                                                        <span className={"ml-3 font-medium text-slate-600  whitespace-normal line-clamp-1 md:line-clamp-2"}>
                                                            {item.shipping_rate_start}
                                                        </span>
                                                    </th>

                                                    <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap text-center ">
                                                        <span className={"ml-3 font-medium text-slate-600  whitespace-normal line-clamp-1 md:line-clamp-2"}>
                                                            {item.shipping_rate_end}
                                                        </span>
                                                    </th>

                                                    <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap text-center ">
                                                        <span className={"ml-3 font-medium text-slate-600 "}>
                                                            {item.rate_price}
                                                        </span>
                                                    </th>
                                                    <th className="w-1/6 border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-center">
                                                        <button
                                                            onClick={() => HandleEdit(item, key)}
                                                            className="bg-blue-600 hover:bg-blue-600/70 p-2 px-4 text-white rounded-md"
                                                        >
                                                            <Icon
                                                                icon="mdi:pencil"
                                                                className="w-4 h-4"
                                                            />
                                                        </button>
                                                    </th>
                                                </>
                                            }

                                            <th className="w-1/6 border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-center">
                                                <button
                                                    onClick={() => HandleDelete(item.shipping_rate_id)}
                                                    className="bg-red-500 hover:bg-red-500/70 p-2 px-4 text-white rounded-md"
                                                >
                                                    <Icon
                                                        icon="mdi:bin"
                                                        className="w-4 h-4"
                                                    />
                                                </button>
                                            </th>

                                        </tr>
                                    ))
                                }

                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </>
    );


async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const { price, rangeStart, rangeEnd, type } = state;

        let err = Validation()
        if (err) {
            return
        }

    const { data, error } = await CreateShippingRate(ShipID, Number(price), Number(rangeStart), Number(rangeEnd), type)

        if (error || !data?.shippingRate) {
            toast.error(error);
            setState(prev => ({ ...prev, loading: false }));
            return;
        }
        else {
            toast.success("เพิ่มเรทน้ำหนักแล้วเรียบร้อย")
            setState(prev => ({ ...prev, submit: true, rate: [...prev.rate, data.shippingRate] }));

        }
    }

    function Validation(): boolean {
        const { price, rangeStart, rangeEnd } = state;

        const numericParams = [
            { value: price, field: 'ราคา' },
            { value: rangeStart, field: 'เรทน้ำหนักเริ่มต้น (กิโลกรัม)' },
            { value: rangeEnd, field: 'เรทน้ำหนักสิ้นสุด (กิโลกรัม)' },
          ];
          
          for (const param of numericParams) {
            if (typeof param.value !== 'number' || isNaN(param.value) || param.value < 0) {
              toast.error(`ดูเหมือนจะมี ${param.field} ที่ยังไม่มีค่า`);
              setState(prev => ({ ...prev, loading: false }));
              return true;
            }
          }

        return false;
    }


function onChangeRangeDistanceStart(e: React.ChangeEvent<HTMLInputElement>) {
    setState(prev => ({ ...prev, rangeStart: Number(e.target.value) }))
}
function onChangeRangeDistanceEnd(e: React.ChangeEvent<HTMLInputElement>) {
    setState(prev => ({ ...prev, rangeEnd: Number(e.target.value) }))
}
function onChangePriceDistance(e: React.ChangeEvent<HTMLInputElement>) {
    setState(prev => ({ ...prev, price: Number(e.target.value) }))
}

function HandleCancel() {
    setState(prev => ({ ...prev, index: -1, editPrice: null, editRangeDistanceEnd: null, editRangeDistanceStart: null }))
}

async function HandleUpdate(id: string) {
    let tempPrice: number = 0
    let tempStart: number = 0
    let tempEnd: number = 0
    const { rate, editPrice, editRangeEnd, editRangeStart } = state;

    const { data, error } = await UpdateShippingRate(
        id, Number(editPrice), Number(editRangeStart), Number(editRangeEnd)
    )

    if (error) {
        toast.error(error);
        return;
    }
    else {
        toast.success("แก้ไขเรทน้ำหนักนี้แล้วเรียบร้อย")
        // router.push("/admin/list-product", {scroll: false})
        setState(prev => ({ ...prev, loading: false, submit: true }));
        //window.location.reload();

        tempPrice = Number(data?.rate.rate_price)
        tempStart = Number(data?.rate.shipping_rate_start)
        tempEnd = Number(data?.rate.shipping_rate_end)

        for (let i = 0; i < rate.length; i++) {
            if (rate[i].shipping_rate_id === id) {
                rate[i].rate_price = tempPrice
                rate[i].shipping_rate_start = tempStart
                rate[i].shipping_rate_end = tempEnd
            }
        }
    }

    setState(prev => ({ ...prev, index: -1, editPrice: null, editRangeEnd: null, editRangeStart: null }))

}


async function HandleDelete(rate_id: string) {
    setState(prev => ({ ...prev, loading: true }));

    let tempRate: Rate[] = [];
    const { rate, index } = state;



    if (window.confirm(`คุณต้องการลบเรทนี้ใช่ไหม`)) {
        const { data, error } = await DeleteShippingRate(rate_id)
        if (error) {
            toast.error(error);
            setState(prev => ({ ...prev, loading: false }));
            return;
        }

        toast.success("ลบเรทน้ำหนักเรียบร้อยแล้ว");
        for (let i = 0; i < rate.length; i++) {
            if (rate[i].shipping_rate_id === rate_id && rate[i] !== undefined) {
                continue;
            }
            else {
                tempRate.push(rate[i]);
            }
        }
        setState((prev) => ({ ...prev, rate: tempRate, loading: false, index: -1 }))
    }
    else {
        setState((prev) => ({ ...prev, loading: false, index: -1 }))
    }
}

function HandleEdit(data: Rate, index: number) {
    setState(prev => ({ ...prev, index: index, editPrice: data.rate_price, editRangeEnd: data.shipping_rate_end, editRangeStart: data.shipping_rate_start }))
}

async function LoadData() {
    const { data, error } = await GetShippingRateWeight(ShipID);
    if (error || !data) {
        toast.error(error || "error");
        setState(prev => ({ ...prev, loading: false }));
        return;
    }
    else {
        setState(prev => ({ ...prev, rate: data.rate, loading: false }))
    }
}

}