"use client"

import Input from "@/app/component/Input/Input";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { FormState } from "../../create-category/create-category";
import { GetCategory, UpdateCategory } from "./update-category-api";
import { useRouter } from "next/navigation";



export default function Form({ cateId = "" }: { cateId: string }) {

    const router = useRouter();
    const [state, setState] = useState<FormState>({
        category_th: "",
        category_en: "",
        category_cn: "",
    })

    useEffect(() => {

        LoadData()

    }, [])

    return (
        <div className="p-8 flex flex-col gap-8">
            <h6 className="text-3xl font-bold">อัพเดตหมวดหมู่ {state.category_th}</h6>

            <div className="flex flex-col gap-4">
                <h6 className="text-xl">ชื่อหมวดหมู่</h6>
            </div>

            <form onSubmit={onSubmit} className="flex flex-col gap-4">
                <div className="flex gap-2 flex-col">
                    <h6>อัพเดตหมวดหมู่ภาษาไทย</h6>
                    <Input
                        value={state.category_th}
                        onChange={thHandler}
                        placeholder="อัพเดตหมวดหมู่(TH)"
                        type="text"
                    />
                </div>

                <div className="flex gap-2 flex-col">
                    <h6>อัพเดตหมวดหมู่ภาษาอังกฤษ</h6>
                    <Input
                        value={state.category_en}
                        onChange={enHandler}
                        placeholder="อัพเดตหมวดหมู่(EN)"
                        type="text"
                    />
                </div>

                <div className="flex gap-2 flex-col">

                    <h6>อัพเดตหมวดหมู่ภาษาจีน</h6>
                    <Input
                        value={state.category_cn}
                        onChange={cnHandler}
                        placeholder="อัพเดตหมวดหมู่(CN)"
                        type="text"
                    />
                </div>

                <div className="flex justify-end">
                    <button
                        type="submit"
                        className="px-2 p-3 text-white bg-red-500 rounded-md w-fit hover:bg-red-400 disabled:bg-slate-500 disabled:text-slate-200 disabled:cursor-not-allowed"
                        disabled={!state.category_cn || !state.category_en || !state.category_th}
                    >
                        <h6 className="font-semibold">อัพเดตหมวดหมู่</h6>
                    </button>
                </div>

            </form>
        </div>
    );

    async function onSubmit(e: React.FormEvent<HTMLFormElement | HTMLButtonElement>) {
        e.preventDefault();
        setState(prev => ({ ...prev, loading: true }));
        const { category_th, category_en, category_cn } = state;

        let err = Validation()
        if (err) {
            return
        }

        const { data, error } = await UpdateCategory(
            cateId, category_th, category_en, category_cn
        )

        // console.log(data)
        if (error) {
            toast.error(error);
            setState(prev => ({ ...prev, loading: false }));
            return;
        }
        else {
            toast.success("แก้ไขหมวดหมู่สินค้านี้แล้วเรียบร้อย")
            // router.push("/admin/list-product", {scroll: false})
            setState(prev => ({ ...prev, loading: false, submit: true }));
            //window.location.reload();
            router.push(`/admin/create-category/`, { scroll: false })
        }


    }

    async function LoadData() {
        setState(prev => ({ ...prev, loading: true }));
        const { data, error } = await GetCategory(cateId);
        if (error || !data) {
            toast.error(error || "error");
            setState(prev => ({ ...prev, loading: false }));
            return;
        }
        else {
            setState(prev => ({ ...prev, category_th: data.category.category_name, category_en: data.category.category_name_en, category_cn: data.category.category_name_ch, loading: false }))
        }
    }

    function Validation(): boolean {
        const { category_th, category_en, category_cn } = state;

        const stringParams = [
            { value: category_th, field: 'ชื่อหมวดหมู่ (ภาษาไทย)' },
            { value: category_en, field: 'ชื่อหมวดหมู่ (ภาษาอังกฤษ)' },
            { value: category_cn, field: 'ชื่อหมวดหมู่ (ภาษาจีน)' }
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

    function thHandler(e: React.ChangeEvent<HTMLInputElement>) {
        setState(prev => ({ ...prev, category_th: e.target.value }))
    }
    function cnHandler(e: React.ChangeEvent<HTMLInputElement>) {
        setState(prev => ({ ...prev, category_cn: e.target.value }))
    }
    function enHandler(e: React.ChangeEvent<HTMLInputElement>) {
        setState(prev => ({ ...prev, category_en: e.target.value }))
    }
}