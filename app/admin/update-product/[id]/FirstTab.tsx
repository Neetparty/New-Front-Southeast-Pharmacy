"use client";
import Input from "@/app/component/Input/Input";
import { Icon } from "@iconify/react";
import { UpdateProductContext, useUpdateProduct } from "./Context";
import DropImage from "@/app/component/DropImage/DropImage";



export default function FirstTab() {

    const { handleRemoveSubImage, handleImageChange, handleRemoveImage, setState, state, thHandler, handleSubImageChange }: UpdateProductContext = useUpdateProduct?.()!;


    return (
        <>


            <div className="flex flex-col gap-8">
                <div className="flex gap-2 flex-col">
                    <h6>รหัสสินค้า</h6>
                    <Input
                        value={state.product_id}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setState(prev => ({ ...prev, product_id: e.target.value }))}
                        placeholder="รหัสสินค้า"
                        type="text"
                    />
                </div>
                <div className="flex gap-2 flex-col">
                    <h6>ชื่อสินค้าภาษาไทย</h6>
                    <Input
                        value={state.product_th}
                        onChange={thHandler}
                        placeholder="ชื่อสินค้า(TH)"
                        type="text"
                    />
                </div>
                <div className="flex gap-2 flex-col">
                <h6>สำหรับผู้ใช้พิเศษหรือไม่</h6>
                <div className="flex gap-2">
                    <div className="flex items-center mb-4">
                        <input 
                        id="promotion-1" 
                        type="radio" 
                        value={"ไม่ใช่"}
                        checked={state.is_special ? false : true}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setState(prev => ({...prev, is_special:!prev.is_special}))} 
                        className="w-4 h-4"
                        />
                        <label 
                        htmlFor="promotion-1" 
                        className="ml-2 text-sm font-medium text-slate-600"
                        >
                            ไม่ใช่
                        </label>
                    </div>

                    <div className="flex items-center mb-4">
                        <input 
                        id="promotion-2" 
                        type="radio" 
                        value={"ใช่"}
                        checked={state.is_special ? true : false}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setState(prev => ({...prev, is_special:!prev.is_special}))} 
                        className="w-4 h-4"
                        />
                        <label 
                        htmlFor="promotion-2" 
                        className="ml-2 text-sm font-medium text-slate-600"
                        >
                            ใช่
                        </label>
                    </div>
                   
                </div>
            </div>

                <div className="flex gap-2 flex-col">
                    <h6>หมวดหมู่</h6>
                    <select
                        className="border text-slate-700 text-sm rounded-lg block p-2 outline-none placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
                        value={state.cateId}
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setState(prev => ({ ...prev, cateId: e.target.value }))}
                    >
                        <option value={"none"}>ไม่มีหมวดหมู่</option>
                        {state.category && state.category.map((item, i) => (
                            <option value={item.category_id} key={i}>{item.category_name}</option>
                        ))}
                    </select>
                </div>

                <div className="flex gap-2 flex-col">
                    <h6>ราคาสินค้า</h6>
                    <Input
                        value={state.price}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setState(prev => ({ ...prev, price: Number(e.target.value) }))}
                        placeholder="ราคา"
                        type="number"
                    />
                </div>

                <div className="flex gap-2 flex-col">
                    <h6>จำนวนสินค้าในสต็อก</h6>
                    <Input
                        value={state.quantity}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setState(prev => ({ ...prev, quantity: Number(e.target.value) }))}
                        placeholder="สินค้าในสต็อก"
                        type="number"
                    />
                </div>


                <div className="flex gap-2 flex-col">
                    <h6>น้ำหนักสินค้าต่อชิ้น (kg)</h6>
                    <Input
                        value={state.weight}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setState(prev => ({ ...prev, weight: Number(e.target.value) }))}
                        placeholder="สินค้าในสต็อก"
                        type="number"
                    />
                </div>


                <div className="flex gap-2 flex-col">
                    <h6>โปรโมชั่น</h6>
                    <div className="flex gap-2">
                        <div className="flex items-center mb-4">
                            <input
                                id="promotion-1"
                                type="radio"
                                value={"ไม่มี"}
                                checked={state.promotion_status ? false : true}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    setState(prev => {
                                        if (!prev.promotion_status) {
                                            return { ...prev, promotion_status: !prev.promotion_status, promotion_price: 0 }
                                        }
                                        else {
                                            return { ...prev, promotion_status: !prev.promotion_status }
                                        }
                                    })
                                }}
                                className="w-4 h-4"
                            />
                            <label
                                htmlFor="promotion-1"
                                className="ml-2 text-sm font-medium text-slate-600"
                            >
                                ไม่มี
                            </label>
                        </div>

                        <div className="flex items-center mb-4">
                            <input
                                id="promotion-2"
                                type="radio"
                                value={"ไม่มี"}
                                checked={state.promotion_status ? true : false}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    setState(prev => {
                                        if (!prev.promotion_status) {
                                            return { ...prev, promotion_status: !prev.promotion_status, promotion_price: 0 }
                                        }
                                        else {
                                            return { ...prev, promotion_status: !prev.promotion_status }
                                        }
                                    })
                                }} 
                                className="w-4 h-4"
                            />
                            <label
                                htmlFor="promotion-2"
                                className="ml-2 text-sm font-medium text-slate-600"
                            >
                                มี
                            </label>
                        </div>

                    </div>
                </div>

                {state.promotion_status &&
                    <div className="flex gap-2 flex-col">
                        <h6>ราคาโปรโมชั่น</h6>
                        <Input
                            value={state.promotion_price}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setState(prev => ({ ...prev, promotion_price: Number(e.target.value) }))}
                            placeholder="ราคา"
                            type="number"
                        />
                    </div>
                }

                <div className="flex gap-2 flex-col">
                    <h6>คำอธิบายเพิ่มเติม</h6>
                    <textarea
                        className="h-32 border-0 px-3 py-3 placeholder-slate-400 text-slate-600 relative bg-slate-100 rounded text-sm shadow outline-none focus:outline-none focus:ring w-full"
                        value={state.desc}
                        onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => setState(prev => ({ ...prev, desc: event.target.value }))}
                        placeholder="คำอธิบายเพิ่มเติม"
                    />
                </div>


                <div className="flex gap-2 flex-col">
                    <h6>คำเตือนการใช้สินค้า</h6>
                    <div className="flex gap-2">
                        <div className="flex items-center mb-4">
                            <input
                                id="warning-1"
                                type="radio"
                                value={"ไม่มี"}
                                checked={state.warning_status ? false : true}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setState(prev => ({ ...prev, warning_status: !prev.warning_status }))}
                                className="w-4 h-4"
                            />
                            <label
                                htmlFor="warning-1"
                                className="ml-2 text-sm font-medium text-slate-600"
                            >
                                ไม่มี
                            </label>
                        </div>

                        <div className="flex items-center mb-4">
                            <input
                                id="warning-2"
                                type="radio"
                                value={"ไม่มี"}
                                checked={state.warning_status ? true : false}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setState(prev => ({ ...prev, warning_status: !prev.warning_status }))}
                                className="w-4 h-4"
                            />
                            <label
                                htmlFor="warning-2"
                                className="ml-2 text-sm font-medium text-slate-600"
                            >
                                มี
                            </label>
                        </div>

                    </div>
                </div>


                {state.warning_status &&
                    <div className="flex gap-2 flex-col">
                        <h6>คำเตือน</h6>
                        <Input
                            value={state.warning}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setState(prev => ({ ...prev, warning: e.target.value }))}
                            placeholder="คำเตือน"
                            type="text"
                        />
                    </div>
                }


                <div className="flex flex-col gap-2">
                    <DropImage
                        multiple={false}
                        handleImageChange={handleImageChange}
                        id="upload-product-image"
                        title="อัพโหลดรูปภาพหลัก (1 รูป)"
                    />

                    <div className="flex gap-8 flex-wrap flex-1 ">
                        {state.imageURLs?.map((imageSrc: string, idx: number) => (
                            <div key={idx} className="relative w-[10rem] h-[18rem] max-w-[13rem] max-h-[20rem] mt-4">
                                <img src={imageSrc} className="w-full h-full rounded-lg " />
                                <div className="absolute top-0 right-0 z-50 text-red-500 cursor-pointer" onClick={() => handleRemoveImage(idx)}>
                                    <Icon icon={"material-symbols:close"} className="h-6 w-6 text-red-500" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <hr />


                {/* รูปภาพรอง */}
                <div className="flex flex-col gap-2">
                    <DropImage
                        multiple={true}
                        handleImageChange={handleSubImageChange}
                        id="upload-sub-product-image"
                        title="อัพโหลดรูปภาพรอง"
                    />


                    <div className="flex gap-8 flex-wrap flex-1 ">
                        {state.subImageURLs?.map((imageSrc: string, idx: number) => (
                            <div key={idx} className="relative w-[10rem] h-[18rem] max-w-[13rem] max-h-[20rem] mt-4">
                                <img src={imageSrc} className="w-full h-full rounded-lg " />
                                <div className="absolute top-0 right-0 z-50 text-red-500 cursor-pointer" onClick={() => handleRemoveSubImage(idx)}>
                                    <Icon icon={"material-symbols:close"} className="h-6 w-6 text-red-500" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex justify-end">
                    <button
                        onClick={() => setState(prev => ({ ...prev, index: 1 }))}
                        className="px-2 p-3 text-white bg-red-500 rounded-md w-fit hover:bg-red-400 disabled:bg-slate-500 disabled:text-slate-200 disabled:cursor-not-allowed"
                    // disabled={!state.product_th || !state.price || state.stock === 0 || state.weight === 0}
                    >
                        <h6 className="font-semibold">ต่อไป</h6>
                    </button>
                </div>
            </div>
        </>
    );
}