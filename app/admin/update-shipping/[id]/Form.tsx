"use client";

import Input from "@/app/component/Input/Input";
import { useState, useEffect } from "react";
import { FormState } from "./Shipping";
import { GetShipping, UpdateShippingName } from "./update-shipping-api";
import { toast } from "react-toastify";

export default function Form({ ShipID = "" }: { ShipID: string }) {

    const [state, setState] = useState<FormState>({
        name: "",
        search: "",
        shipping: [],
    });

    useEffect(() => {
        LoadData()
    }, [])


    return (
        <>
            <div className="">
                <div>
                    <h6 className="text-3xl font-bold mb-6">ราคาขนส่ง</h6>
                </div>
                <form onSubmit={onSubmit} className="flex flex-col gap-8">
                    <div className="flex gap-2 flex-col">
                        <h6>ชื่อขนส่ง</h6>
                        <Input
                            value={state.name}
                            onChange={onChangeName}
                            placeholder="ชื่อขนส่ง"
                            type="text"
                        />
                    </div>

                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="px-2 p-3 text-white bg-red-500 rounded-md w-fit hover:bg-red-400 disabled:bg-slate-500 disabled:text-slate-200 disabled:cursor-not-allowed"
                            disabled={!state.name}
                        >
                            <h6 className="font-semibold">อัพเดตชื่อขนส่ง</h6>
                        </button>
                    </div>
                </form>

            </div>
        </>
    );

    async function onSubmit(e: React.FormEvent<HTMLFormElement | HTMLButtonElement>) {
        e.preventDefault();
        const { name } = state;

        let err = Validation()
        if (err) {
            return
        }

        const { data, error } = await UpdateShippingName(name, ShipID)

        // console.log(data)
        if (error) {
            toast.error(error);
            setState(prev => ({ ...prev, loading: false }));
            return;
        }
        else {
            toast.success("แก้ไขหมวดหมู่สินค้านี้แล้วเรียบร้อย")
            // router.push("/admin/list-product", {scroll: false})
            setState(prev => ({ ...prev, submit: true }));
        }
    }

    function Validation(): boolean {
        const { name } = state;

        const stringParams = [
            { value: name, field: 'ชื่อขนส่ง' },
        ];

        for (const param of stringParams) {
            if (typeof param.value !== 'string' || param.value.trim() === '') {
                toast.error(`ดูเหมือนคุณยังไม่ได้กรอก ${param.field}`);
                setState(prev => ({ ...prev, loading: false }));
                return true;
            }
        }

        return false;
    }

    function onChangeName(e: React.ChangeEvent<HTMLInputElement>) {
        setState(prev => ({ ...prev, name: e.target.value }))
    }

    async function LoadData() {
        const { data, error } = await GetShipping(ShipID);
        if (error || !data) {
            toast.error(error || "error");
            setState(prev => ({ ...prev, loading: false }));
            return;
        }
        else {
            setState(prev => ({ ...prev, name: data.shipping.name, loading: false }))
        }
    }




}

