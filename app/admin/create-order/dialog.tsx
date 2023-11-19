"use client";
import { Dialog } from "@/app/component/Dialog/Dialog";
import Image from "next/image";
import Input from "@/app/component/Input/Input";
import { Icon } from "@iconify/react";
import { DialogContent, TableState, product } from "./create-order";

export default function DialogContent({

    state,
    setState

}: DialogContent) {

    const product = {}
    return (
        <>
            <Dialog
                onClose={onClose}
                open={state.open}
                header="ค้นหาสินค้า"
                className="w-11/12 lg:w-3/6"
            >
            <div className="p-4">
                
            <details className="p-4 shadow-lg rounded-md bg-slate-100">
                <summary className="text-slate-700 font-semibold cursor-pointer">
                    สินค้าที่ถูกเลือกแล้ว {state.selectedProduct.length} ชิ้น
                </summary>

                <form onSubmit={handleSubmit} className="mt-8 mb-4 ">
                {state.selectedProduct.map((item,i) => (
                    <div 
                    key={i}
                    className="flex gap-4 items-center justify-between my-4"
                    >
                        
                        <div className="flex gap-8 items-center w-5/6">
                            
                            <div className="h-24 w-1/4">
                                <Image
                                alt={item.product_th}
                                src={item.images}
                                className="w-full h-full object-contain"
                                />
                            </div>

                            <div className="w-3/4 flex flex-col gap-1">
                                <span className="text-gray-500 text-base line-clamp-1">Lorem ipsum dolor sit amet consectetur adipisicing elit. Et quia minus nam libero pariatur non minima quae dolores a recusandae! </span>
                                <hr className="border-slate-300 w-full h-0.5"/>
                                <div className="w-full">
                                    <span className="text-red-400 text-xs text-left">฿ 800.00</span>
                                    <div className="flex gap-2 items-center">
                                        <span className="text-gray-500 text-xs  mr-2 line-through">฿ 1000.00</span>
                                        <span className="text-gray-500 text-xs">-20%</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="ml-4 ">
                        <button
                            type="submit"
                            className="w-full px-2 p-3 text-white bg-red-500 rounded-md hover:bg-red-400 disabled:bg-slate-500 disabled:text-slate-200 disabled:cursor-not-allowed"
                            onClick={() => removeSelectedProduct(item.product_id)}
                            >
                            <Icon
                            icon={"mdi:bin"}
                            className="w-6 h-6"
                            />
                        </button>
                        </div>
                    </div>
                ))}
                
                <hr className="my-4"/>

                <div className="flex justify-end mt-8">
                    <button
                    type="submit"
                    className="px-2 p-3 text-white bg-green-500 rounded-md w-fit hover:bg-green-400 disabled:bg-slate-500 disabled:text-slate-200 disabled:cursor-not-allowed"
                    disabled={state.selectedProduct.length === 0}
                    >
                    <h6 className="font-semibold">ยืนยันสินค้า</h6>
                    </button>
                </div>

                    </form>
                </details>

        </div>

        <hr className="my-4"/>
        <div className="flex flex-col gap-4 py-2 px-4 max-h-[40vh]">
            
            <div className="flex flex-col gap-2 mb-4">
                <h6>ค้นหา</h6>
                <Input
                value={state.search}
                onChange={handleSearch}
                placeholder="ค้นหาสินค้า"
                icon='carbon:search'
                iconClassName="w-5 h-5"
                />
            </div>
            {state.cartProduct.map((item, key)=>(
                item.product.length !== 0 && item.product.map((item, i) => (
                <div 
                key={i}
                className="flex gap-4 items-center justify-between"
                >
                    
                    <div className="flex gap-8 items-center w-5/6">
                        
                        <div className="h-28 w-1/4">
                            <Image
                            alt={item.product_th}
                            src={item.images}
                            className="w-full h-full object-contain"
                            />
                        </div>

                        <div className="w-3/4 flex flex-col gap-1">
                            <span className="text-gray-500 text-base line-clamp-1">Lorem ipsum dolor sit amet consectetur adipisicing elit. Et quia minus nam libero pariatur non minima quae dolores a recusandae! </span>
                            <hr className="border-slate-300 w-full h-0.5"/>
                            <div className="w-full">
                                <span className="text-red-400 text-xs text-left">฿ 800.00</span>
                                <div className="flex gap-2 items-center">
                                    <span className="text-gray-500 text-xs  mr-2 line-through">฿ 1000.00</span>
                                    <span className="text-gray-500 text-xs">-20%</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="ml-4">
                    <button
                        type="submit"
                        className="w-full px-2 p-3 text-white bg-red-500 rounded-md hover:bg-red-400 disabled:bg-slate-500 disabled:text-slate-200 disabled:cursor-not-allowed"
                        onClick={() => addProductToSelect(item)}
                        >
                        <Icon
                        icon={"material-symbols:add"}
                        className="w-6 h-6"
                        />
                    </button>
                    </div>
                </div>
                ))
            ))}
            
            </div>
            </Dialog>

        </>
    );

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        // setState((prev:UpdatePromotionState) => ({...prev, loading:true}))
        // const {selectedProduct} = state;
        // setState((prev:UpdatePromotionState) => ({...prev, loading:false}))

    }

    function removeSelectedProduct(product_id: string) {

    }

    function addProductToSelect(product:product){
        setState((prev:TableState) => ({...prev, selectedProduct: [...prev.selectedProduct, product]}))
    }

    function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
        setState((prev:TableState) => ({...prev, search:e.target.value}))
    }
    function onClose() {
        setState((prev: TableState) => ({ ...prev, open: false }))
    }
}