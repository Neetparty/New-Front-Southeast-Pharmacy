"use client";
import { Dialog } from "@/app/component/Dialog/Dialog";
import Image from "next/image";
import { DialogContent, Product, UpdatePromotionState } from "../promotion";
import Input from "@/app/component/Input/Input";
import { Icon } from "@iconify/react";
import { toast } from "react-toastify";
import { AddProductToPromotion, GetProduct, SearchProduct } from "../promotion-api";
import { useRouter } from "next/navigation";


export default function DialogContent({
    state,
    setState,
    promotion_id
}: DialogContent,) {


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
                            {state.selectedProduct.map((item, i) => (
                                <div
                                    key={i}
                                    className="flex gap-4 items-center justify-between my-4"
                                >

                                    <div className="flex gap-8 items-center w-5/6">

                                        <div className="h-24 w-1/4">
                                            <Image
                                                width={240}
                                                height={240}
                                                alt={item.product_name}
                                                src={item.image}
                                                className="w-full h-full object-contain"
                                            />
                                        </div>

                                        <div className="w-3/4 flex flex-col gap-1 text-sm">
                                        <span className="text-slate-700 text-lg line-clamp-1">({item.product_id}) {item.product_name}</span>
                                        <hr className="border-slate-300 w-full h-0.5" />
                                        <h6 className="">คงเหลือ: {item.quantity} ชิ้น</h6>
                                            {item.promotion_status ? 
                                                <div className={"flex gap-2 font-medium text-slate-600 justify-start "}>
                                                    <h6 className=" text-slate-600">ราคา ฿ </h6>
                                                    <h6 className=" line-through text-red-400  ">{item.price}</h6>
                                                    <h6 className=" text-slate-600">{item.promotion_price}</h6>
                                                </div>
                                                :
                                                <span className={"font-medium  text-slate-600 "}>
                                                    ราคา : {item.price}
                                                </span>
                                                }
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

                            <hr className="my-4" />

                            <div className="flex justify-end mt-8">
                                <button
                                    type="submit"
                                    onClick={handleSubmit}
                                    className="px-2 p-3 text-white bg-green-500 rounded-md w-fit hover:bg-green-400 disabled:bg-slate-500 disabled:text-slate-200 disabled:cursor-not-allowed"
                                    disabled={state.selectedProduct.length === 0}
                                >
                                    <h6 className="font-semibold">ยืนยันสินค้า</h6>
                                </button>
                            </div>

                        </form>
                    </details>

                </div>

                <hr className="my-4" />
                <div className="flex flex-col gap-4 py-2 px-4 max-h-[40vh] overflow-y-auto">
                    <div className="flex flex-col gap-2 mb-4">
                        <h6>ค้นหา</h6>

                        <div className="flex gap-2">
                            <Input
                                value={state.search}
                                onChange={handleSearch}
                                placeholder="ค้นหาสินค้า"
                                icon='carbon:search'
                                iconClassName="w-6 h-6"
                            />
                            <div className="flex justify-end mt-2">
                                <button
                                    type="button"
                                    onClick={Search}
                                    className=" text-white bg-red-500 rounded-md w-max hover:bg-red-400 px-4 py-2"
                                    >
                                    ค้นหา</button>
                            </div>
                        </div>
                    </div>
                    {state.dialogProduct.length !== 0 &&
                        state.dialogProduct.map((item, i) => (
                            <div
                                key={i}
                                className="flex gap-4 items-center justify-between"
                            >
                                <div className="flex gap-8 items-center w-5/6">

                                    <div className="relative w-28 h-28">
                                        <Image
                                            fill
                                            alt={item.product_name}
                                            src={item.image}
                                            className="w-full h-full object-contain"
                                        />
                                    </div>

                                    <div className="w-3/4 flex flex-col gap-1 text-sm">
                                        <span className="text-slate-700 text-lg line-clamp-1">({item.product_id}) {item.product_name}</span>
                                        <hr className="border-slate-300 w-full h-0.5" />
                                        <h6 className="">คงเหลือ: {item.quantity} ชิ้น</h6>
                                            {item.promotion_status ? 
                                                <div className={"flex gap-2 font-medium text-slate-600 justify-start "}>
                                                    <h6 className=" text-slate-600">ราคา ฿ </h6>
                                                    <h6 className=" line-through text-red-400  ">{item.price}</h6>
                                                    <h6 className=" text-slate-600">{item.promotion_price}</h6>
                                                </div>
                                                :
                                                <span className={"font-medium  text-slate-600 "}>
                                                    ราคา : {item.price}
                                                </span>
                                                }
                                    </div>
                                </div>

                                <div className="ml-4">
                                    <button
                                        type="submit"
                                        className="w-full px-2 p-3 text-white bg-red-500 rounded-md hover:bg-red-400 disabled:bg-slate-500 disabled:text-slate-200 disabled:cursor-not-allowed"
                                        onClick={() => CheckAdd(item)}
                                    >
                                        <Icon
                                            icon={"material-symbols:add"}
                                            className="w-6 h-6"
                                        />
                                    </button>
                                </div>
                            </div>
                        ))}

                </div>
            </Dialog>

        </>
    );

async function handleSubmit(e: React.FormEvent<HTMLFormElement | HTMLButtonElement>) {
    e.preventDefault();
    const temp: {
        promotion_id:string,
        product_id:string,
    }[] = [] 

    const { selectedProduct } = state;
    selectedProduct.map(item =>{
        temp.push({
            promotion_id: promotion_id,
            product_id: item.product_id,
        })
    })

    const { data, error } = await AddProductToPromotion(promotion_id, temp);
    if (error || !data ) {
        toast.error(error || "error");
        setState((prev:UpdatePromotionState) => ({ ...prev, loading: false }));
        return;
    }
    else {
        toast.success("เพิ่มสินค้าเข้าโปรโมชั่นนี้เรียบร้อย")
        setState((prev:UpdatePromotionState) => ({...prev, product:[...prev.product, ...prev.selectedProduct],  open: false}))
    }

}

function CheckAdd(data: Product) {
    let tempProduct = 0
    let tempSelect = 0
    const { product, selectedProduct } = state
    product.forEach(item => {
        if(data.product_id == item.product_id){
            tempProduct += 1
        }
    })
    selectedProduct.forEach(item => {
        if(data.product_id == item.product_id){
            tempSelect += 1
        }
    })
    if(tempProduct !== 0){
        toast.error("คุณมีสินค้าชิ้นนี้แล้วในโปรโมชั่นนี้")
        return
    }else if(tempSelect !== 0){
        toast.error("คุณเพิ่มสินค้านี้แล้ว")
        return
    }else{
        addProductToSelect(data)
    }

}

async function Search() {
    const { search, dialogProduct } = state
    if(dialogProduct.length !== 0){
        setState((prev: UpdatePromotionState) => ({ ...prev, dialogProduct: [] }))
    }
    const { data, error } = await SearchProduct(search);
    if (error || !data?.products) {
        toast.error("ไม่พบสินค้า");
        setState((prev: UpdatePromotionState) => ({ ...prev, loading: false }));
        return;
    }
    else {
        setState((prev: UpdatePromotionState) => ({ ...prev, dialogProduct: [...prev.dialogProduct, ...data.products] }))
    }
}

function removeSelectedProduct(product_id: string) {
    setState((prev: UpdatePromotionState) => ({
        ...prev,
        selectedProduct: prev.selectedProduct.filter(
            (product) => product.product_id !== product_id
        ),
    }));
}

function addProductToSelect(product: Product) {
    setState((prev: UpdatePromotionState) => ({ ...prev, selectedProduct: [...prev.selectedProduct, product] }))
}

function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    setState((prev: UpdatePromotionState) => ({ ...prev, search: e.target.value }))
}
function onClose() {
    setState((prev: UpdatePromotionState) => ({ ...prev, open: false }))
}
}