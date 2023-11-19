"use client";

import Input from "@/app/component/Input/Input";
import { useState } from "react";
import { FormState } from "./Shipping";
import { toast } from "react-toastify";
import { CreateShipping } from "./shipping-api";
import { Circular } from "@/app/component/Loading/Circular";

export default function Form() {
    const [state, setState] = useState<FormState>({
        name: "",
        search: "",
        shippingF: [],
        loading: false
    });


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
                            <h6 className="font-semibold">เพิ่มขนส่ง</h6>
                        </button>
                    </div>
                </form>

                <Circular
                    loading={state.loading}
                />

            </div>
        </>
    );

    async function onSubmit(e: React.FormEvent<HTMLFormElement | HTMLButtonElement>) {
        e.preventDefault();
        setState(prev => ({ ...prev, loading: true }));
        const { name } = state;

        const { data, error } = await CreateShipping(name)

        if (error || !data?.shipping) {
            toast.error(error);
            setState(prev => ({ ...prev, loading: false }));
            return;
        }
        else {
            toast.success("เพิ่มขนส่งเรียบร้อย")
            setState(prev => ({ ...prev, loading: false }));
        }
    }

    function onChangeName(e: React.ChangeEvent<HTMLInputElement>) {
        setState(prev => ({ ...prev, name: e.target.value }))
    }

}