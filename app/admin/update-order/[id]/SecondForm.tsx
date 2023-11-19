"use client"
import { useState } from "react";
import Input from "@/app/component/Input/Input";
import { UpdateOrderContext, useUpdateOrder } from "./Context";

export default function SecondForm() {

    const { SecondFormState, setSecondFormState, onSubmit }:UpdateOrderContext = useUpdateOrder?.()!;

    function DummyOnChange(e:React.ChangeEvent<HTMLInputElement>) {

    }

    return (
        <>
               {SecondFormState.address && 
                <div className="p-8 flex flex-col gap-8">
                <div>
                    <form onSubmit={onSubmit} className="flex flex-col gap-4">
                        <div className="flex gap-2 flex-col">
                            <h6>วิธีชำระเงิน</h6>
                            <Input
                                value={SecondFormState.payment_method}
                                onChange={DummyOnChange}
                                placeholder="วิธีชำระเงิน"
                                type="text"
                            />
                        </div>
                        <div className="flex gap-2 flex-col">
                            <h6>ชื่อที่อยู่</h6>
                            <Input
                                value={SecondFormState.address!.location_name}
                                onChange={DummyOnChange}
                                placeholder="ชื่อที่อยู่"
                                type="text"
                            />
                        </div>
                        <div className="grid gap-10 mt-5 grid-cols-2">
                            <div className="flex gap-2 flex-col">
                                <h6>ชื่อจริงผู้สั่ง</h6>
                                <Input
                                    value={SecondFormState.address!.first_name}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSecondFormState(prev => ({ ...prev, first_name: e.target.value }))}
                                    placeholder="ชื่อจริง"
                                    type="text"
                                />
                            </div>
                            <div className="flex gap-2 flex-col">
                                <h6>นามสกุลผู้สั่ง</h6>
                                <Input
                                    value={SecondFormState.address!.last_name}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSecondFormState(prev => ({ ...prev, last_name: e.target.value }))}
                                    placeholder="นามสกุล"
                                    type="text"
                                />
                            </div>
                        </div>

                        <div className="grid gap-10 mt-5 grid-cols-2">
                            <div className="flex gap-2 flex-col">
                                <h6>เลขที่อยู่</h6>
                                <Input
                                    value={SecondFormState.address!.location_name}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSecondFormState(prev => ({ ...prev, location_name: e.target.value }))}
                                    placeholder="เลขที่อยู่"
                                    type="text"
                                />
                            </div>
                            <div className="flex gap-2 flex-col">
                                <h6>แขวง/ตำบล</h6>
                                <Input
                                    value={SecondFormState.address!.sub_district}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSecondFormState(prev => ({ ...prev, sub_distric: e.target.value }))}
                                    placeholder="แขวง/ตำบล"
                                    type="text"
                                />
                            </div>
                        </div>

                        <div className="grid gap-10 mt-5 grid-cols-2">
                            <div className="flex gap-2 flex-col">
                                <h6>เขต/อำเภอ</h6>
                                <Input
                                    value={SecondFormState.address!.district}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSecondFormState(prev => ({ ...prev, distric: e.target.value }))}
                                    placeholder="เขต/อำเภอ"
                                    type="text"
                                />
                            </div>
                            <div className="flex gap-2 flex-col">
                                <h6>จังหวัด</h6>
                                <Input
                                    value={SecondFormState.address!.province}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSecondFormState(prev => ({ ...prev, province: e.target.value }))}
                                    placeholder="จังหวัด"
                                    type="text"
                                />
                            </div>
                        </div>
                        <div className="grid gap-10 mt-5 grid-cols-2">
                            <div className="flex gap-2 flex-col">
                                <h6>รหัสไปรษณีย์</h6>
                                <Input
                                    value={SecondFormState.address!.postal_code}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSecondFormState(prev => ({ ...prev, postal_code: e.target.value }))}
                                    placeholder="รหัสไปรษณีย์"
                                    type="text"
                                />
                            </div>
                            <div className="flex gap-2 flex-col">
                                <h6>เบอร์โทรศัพท์</h6>
                                <Input
                                    value={SecondFormState.address!.telephone}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSecondFormState(prev => ({ ...prev, telephone: e.target.value }))}
                                    placeholder="เบอร์โทรศัพท์"
                                    type="text"
                                />
                            </div>
                        </div>

                        <div className="flex justify-end">
                            <button
                                type="submit"
                                className="px-2 p-3 mt-4 text-white bg-red-500 rounded-md w-20 hover:bg-red-400 disabled:bg-slate-500 disabled:text-slate-200 disabled:cursor-not-allowed"
                            >
                                <h6 className="font-semibold">อัพเดต</h6>
                            </button>
                        </div>

                    </form>
                </div>

            </div>
               }
        </>
    );
}