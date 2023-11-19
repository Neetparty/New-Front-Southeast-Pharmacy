"use client"
import { useState } from "react";
import Input from "@/app/component/Input/Input";
import { UpdateOrderContext, useUpdateOrder } from "./Context";

export default function Form() {

    const { formState, setFormState, onSubmit }:UpdateOrderContext = useUpdateOrder?.()!;

    const statusArr: {key:string, value:string}[] = [
        {
            key:"รอยืนยัน",
            value:"waiting"
        },
        {
            key:"กำลังส่ง",
            value:"sending"
        },
        {
            key:"ส่งสำเร็จ",
            value:"success"
        },
        {
            key:"ยกเลิก",
            value:"cancel"
        },
    ]


    return (
        <>
            <div>
                <div className="p-8 flex flex-col gap-8">
                    <div>
                        <h6 className="text-3xl font-bold">อัพเดตออเดอร์</h6>
                    </div>
                    <div>
                        <form onSubmit={onSubmit} className="flex flex-col gap-4">
                            <div className="flex gap-2 flex-col">
                                <h6>หมายเหตุ</h6>
                                <Input
                                    value={formState.note}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormState(prev => ({ ...prev, note: e.target.value }))}
                                    placeholder="หมายเหตุ"
                                    type="text"
                                />
                            </div>
                            <div className="flex gap-2 flex-col">
                                <h6>ออเดอร์ไอดี</h6>
                                <Input
                                    value={formState.order_id}
                                    onChange={handle}
                                    placeholder="ออเดอร์ไอดี"
                                    type="text"

                                />
                            </div>

                            <div className="grid gap-10 mt-5 grid-cols-2">
                                <div className="flex gap-2 flex-col">
                                    <h6>สถานะขนส่ง</h6>
                                    <select
                                        className="border text-slate-700 text-sm rounded-lg block p-2 outline-none placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
                                        value={formState.status}
                                        onChange={(event: React.ChangeEvent<HTMLSelectElement>) => setFormState(prev => ({ ...prev, status: event.target.value }))}
                                        >
                                        {statusArr.map((item, i) => (
                                            <option value={item.value} key={i}>{item.key}</option>
                                        ))}
                                    </select>
                                    <h6 className="text-xs text-red-500">ถ้าเปลี่ยนเป็นส่งสำเร็จจำนวนสินค้าจะถูกอัพเดตตาม cw และระบบจะเพิ่ม History สินค้าที่ซื้อเข้าไปด้วย</h6>
                                </div>
                                <div className="flex gap-2 flex-col">
                                    <h6>Tracking number</h6>
                                    <Input
                                        value={formState.tracking_number}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormState(prev => ({ ...prev, tracking_number: e.target.value }))}
                                        placeholder="Tracking number"
                                        type="text"
                                    />
                                </div>
                            </div>

                            <div className="flex gap-2 flex-col">
                                <h6>Tracking URL</h6>
                                <Input
                                    value={formState.tracking_url}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormState(prev => ({ ...prev, tracking_url: e.target.value }))}
                                    placeholder="Tracking URL"
                                    type="text"
                                />
                            </div>
                        </form>
                    </div>

                </div>
            </div>
        </>
    );

async function handle(e: React.ChangeEvent<HTMLInputElement>) {
}
}