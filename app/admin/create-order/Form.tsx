"use client"
import { useState } from "react";
import Input from "@/app/component/Input/Input";
import { FormState } from "./create-order";

export default function Form() {
    const [state, setState] = useState<FormState>({
        order_id: "",
        payment_method: "",
        first_name: "",
        last_name: "",
        address_no: "",
        sub_distric: "",
        distric: "",
        province: "",
        postcode: "",
        tel: ""
    })

    return (
        <>
            <div>
                <div className="p-8 flex flex-col gap-8">
                    <div>
                        <h6 className="text-3xl font-bold">สร้างออเดอร์</h6>
                    </div>
                    <div>
                        <form onSubmit={onSubmit} className="flex flex-col gap-4">
                            <div className="flex gap-2 flex-col">
                                <h6>วิธีชำระเงิน</h6>
                                <Input
                                    value={state.payment_method}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setState(prev => ({ ...prev, payment_method: e.target.value }))}
                                    placeholder="วิธีชำระเงิน"
                                    type="text"
                                />
                            </div>
                            <div className="grid gap-10 mt-5 grid-cols-2">
                                <div className="flex gap-2 flex-col">
                                    <h6>ชื่อจริงผู้สั่ง</h6>
                                    <Input
                                        value={state.first_name}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setState(prev => ({ ...prev, first_name: e.target.value }))}
                                        placeholder="ชื่อจริง"
                                        type="text"
                                    />
                                </div>
                                <div className="flex gap-2 flex-col">
                                    <h6>นามสกุลผู้สั่ง</h6>
                                    <Input
                                        value={state.last_name}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setState(prev => ({ ...prev, last_name: e.target.value }))}
                                        placeholder="นามสกุล"
                                        type="text"
                                    />
                                </div>
                            </div>

                            <div className="grid gap-10 mt-5 grid-cols-2">
                                <div className="flex gap-2 flex-col">
                                    <h6>เลขที่อยู่</h6>
                                    <Input
                                        value={state.address_no}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setState(prev => ({ ...prev, address_no: e.target.value }))}
                                        placeholder="เลขที่อยู่"
                                        type="text"
                                    />
                                </div>
                                <div className="flex gap-2 flex-col">
                                    <h6>แขวง/ตำบล</h6>
                                    <Input
                                        value={state.sub_distric}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setState(prev => ({ ...prev, sub_distric: e.target.value }))}
                                        placeholder="แขวง/ตำบล"
                                        type="text"
                                    />
                                </div>
                            </div>

                            <div className="grid gap-10 mt-5 grid-cols-2">
                                <div className="flex gap-2 flex-col">
                                    <h6>เขต/อำเภอ</h6>
                                    <Input
                                        value={state.distric}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setState(prev => ({ ...prev, distric: e.target.value }))}
                                        placeholder="เขต/อำเภอ"
                                        type="text"
                                    />
                                </div>
                                <div className="flex gap-2 flex-col">
                                    <h6>จังหวัด</h6>
                                    <Input
                                        value={state.province}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setState(prev => ({ ...prev, province: e.target.value }))}
                                        placeholder="จังหวัด"
                                        type="text"
                                    />
                                </div>
                            </div>
                            <div className="grid gap-10 mt-5 grid-cols-2">
                                <div className="flex gap-2 flex-col">
                                    <h6>รหัสไปรษณีย์</h6>
                                    <Input
                                        value={state.postcode}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setState(prev => ({ ...prev, postcode: e.target.value }))}
                                        placeholder="รหัสไปรษณีย์"
                                        type="text"
                                    />
                                </div>
                                <div className="flex gap-2 flex-col">
                                    <h6>เบอร์โทรศัพท์</h6>
                                    <Input
                                        value={state.tel}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setState(prev => ({ ...prev, tel: e.target.value }))}
                                        placeholder="เบอร์โทรศัพท์"
                                        type="text"
                                    />
                                </div>
                            </div>

                        </form>
                    </div>

                </div>
            </div>
        </>
    );

    async function onSubmit(e: React.FormEvent<HTMLFormElement | HTMLButtonElement>) {
        e.preventDefault();
    }
}