"use client"

import Input from "@/app/component/Input/Input";
import { CreateCategoryContextType, useCreateCategory } from "./Context";



export default function Form() {

    const { setFormState, formState, onSubmit }:CreateCategoryContextType = useCreateCategory?.()!;


    return (
        <div className="p-8 flex flex-col gap-8">
            <h6 className="text-3xl font-bold">สร้างหมวดหมู่</h6>

            <div className="flex flex-col gap-4">
                <h6 className="text-xl">ชื่อหมวดหมู่</h6>
            </div>

            <form onSubmit={onSubmit} className="flex flex-col gap-4">
                <div className="flex gap-2 flex-col">
                    <h6>สร้างหมวดหมู่ภาษาไทย</h6>
                    <Input
                        value={formState.category_th}
                        onChange={thHandler}
                        placeholder="สร้างหมวดหมู่(TH)"
                        type="text"
                    />
                </div>

                <div className="flex gap-2 flex-col">
                    <h6>สร้างหมวดหมู่ภาษาอังกฤษ</h6>
                    <Input
                        value={formState.category_en}
                        onChange={enHandler}
                        placeholder="สร้างหมวดหมู่(EN)"
                        type="text"
                    />
                </div>

                <div className="flex gap-2 flex-col">

                    <h6>สร้างหมวดหมู่ภาษาจีน</h6>
                    <Input
                        value={formState.category_cn}
                        onChange={cnHandler}
                        placeholder="สร้างหมวดหมู่(CN)"
                        type="text"
                    />
                </div>

                <div className="flex justify-end">
                    <button
                        type="submit"
                        className="px-2 p-3 text-white bg-red-500 rounded-md w-fit hover:bg-red-400 disabled:bg-slate-500 disabled:text-slate-200 disabled:cursor-not-allowed"
                        disabled={!formState.category_cn || !formState.category_en || !formState.category_th}
                    >
                        <h6 className="font-semibold">สร้างหมวดหมู่</h6>
                    </button>
                </div>

            </form>
        </div>
    );

  

    function thHandler(e: React.ChangeEvent<HTMLInputElement>) {
        setFormState(prev => ({ ...prev, category_th: e.target.value }))
    }
    function cnHandler(e: React.ChangeEvent<HTMLInputElement>) {
        setFormState(prev => ({ ...prev, category_cn: e.target.value }))
    }
    function enHandler(e: React.ChangeEvent<HTMLInputElement>) {
        setFormState(prev => ({ ...prev, category_en: e.target.value }))
    }
}