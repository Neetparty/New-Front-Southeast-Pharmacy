"use client"

import Input from "@/app/component/Input/Input";
import { AdminUserContextType, useAdminUser } from "./Context";

export default function Form() {

    const { state, setState, handleSearch }:AdminUserContextType = useAdminUser?.()!;

    return (
        <>
            <div className="p-8 flex flex-col gap-8">
                <div>
                    <h6 className="text-3xl font-bold">ยูสเซอร์ทั้งหมด</h6>
                </div>
                <div>
                    
                    <h6>ค้นหา</h6>
                    
                    <form onSubmit={onSubmit} className="flex flex-col gap-4">
                        <div className="flex gap-2">
                            <Input
                                value={state.search}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setState(prev => ({ ...prev, search: e.target.value }))}
                                placeholder="ค้นหาจากชื่อ"
                                type="text"
                            />
                        <button
                        className="bg-red-500 hover:bg-red-400 text-white px-4 py-2 rounded-lg w-max"
                        onClick={handleSearch}
                        >
                            <h6>ค้นหา</h6>
                        </button>
                        </div>
                            <h6 className="text-xs">ถ้าต้องการดูค่าที่ถูกค้นหาอย่าลบคำค้นหาออกจากช่องกรอกคำค้นหา</h6>
                    </form>
                
                </div>

            </div>
        </>
    );

    async function onSubmit(e: React.FormEvent<HTMLFormElement | HTMLButtonElement>) {
        e.preventDefault();
    }
}