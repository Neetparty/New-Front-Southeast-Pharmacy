"use client"

import { Icon } from "@iconify/react";
import { useRouter } from 'next/navigation'
import { Product } from "../promotion";
import Image from "next/image";
import { Circular } from "@/app/component/Loading/Circular";
import DialogContent from "./DialogContent";
import { toast } from "react-toastify";
import { DeletePromotionProduct } from "../promotion-api";
import { UpdatePromotionContextType, useUpdatePromotion } from "./Context";


export default function Table({ promotion_id = "" }: { promotion_id: string }) {

  const router = useRouter()

  const { UpdatePromotionState, setUpdatePromotionState }: UpdatePromotionContextType = useUpdatePromotion?.()!;

  return (
    <>

      <div className="flex justify-between">
        <h6 className="text-slate-500 text-2xl font-semibold">สินค้าทั้งหมดในโปรโมชั่น</h6>
        <button
          className="border border-green-500 py-2 px-4 text-green-600 hover:bg-green-100 rounded-xl"
          onClick={onOpen}
        >
          เพิ่มสินค้า
        </button>
      </div>
      <div
        className={
          "relative flex flex-col min-w-0 break-words w-full mb-6 border rounded bg-slate-200"}
      >
        <div className="rounded-t mb-0 px-4 py-3 border-0 shadow-lg">
          <div className="flex flex-wrap items-center ">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1 ">
              <h3
                className={
                  "font-semibold text-lg text-slate-700"
                }
              >
                สินค้าทั้งหมด
              </h3>
            </div>
          </div>
        </div>
        <div className="block w-full overflow-x-auto">
          <table className="items-center w-full bg-transparent border-collapse border">
            <thead>
              <tr>
                <th className={"px-6 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center bg-white text-blue-500 border-slate-100 "}>
                  ชื่อสินค้า
                </th>
                <th className={"px-6 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center bg-white text-blue-500 border-slate-100 "}>
                  ราคา
                </th>
                <th className={"px-6 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center bg-white text-blue-500 border-slate-100 "}>
                  ราคาโปรโมชั่น
                </th>
                <th className={"px-6 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center bg-white text-blue-500 border-slate-100 "}>
                  สต็อก
                </th>
                <th className={"px-6 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center bg-white text-blue-500 border-slate-100 "}>
                  แก้ไข
                </th>
                <th className={"px-6 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center bg-white text-blue-500 border-slate-100 "}>
                  ลบ
                </th>
              </tr>
            </thead>

            <tbody className="bg-slate-50">
              {UpdatePromotionState.product.length !== 0 &&
                UpdatePromotionState.product.map((item, key) => (
                  <tr
                    key={key}
                    className={`border-b-slate-200 odd:bg-slate-100 hover:bg-slate-200/70`}
                  >
                    <th className="flex items-center gap-2 border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-center ">
                      <div className="w-12 h-scrren">
                        <Image
                          alt="test"
                          width={240}
                          height={240}
                          src={item.image}
                          className="w-full f-full"
                        />
                      </div>
                      <span className={"ml-3 font-medium text-slate-600 line-clamp-1"}>
                        {item.product_name}
                      </span>
                    </th>
                    <th className=" border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-center">
                      <span className={"ml-3 font-medium text-slate-600 "}>
                        {item.price}
                      </span>
                    </th>
                    <th className=" border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-center">
                      <span className={"ml-3 font-medium text-slate-600 "}>
                        {item.promotion_price}
                      </span>
                    </th>
                    <th className=" border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-center">
                      <span className={"ml-3 font-medium text-slate-600 "}>
                        {item.quantity}
                      </span>
                    </th>

                    <th className="w-1/6 border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-center">
                      <button
                        onClick={() => HandleEdit(item.product_id)}
                        className="bg-blue-600 hover:bg-blue-600/70 p-2 px-4 text-white rounded-md"
                      >
                        <Icon
                          icon="mdi:pencil"
                          className="w-4 h-4"
                        />
                      </button>
                    </th>

                    <th className="w-1/6 border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-center">
                      <button
                        onClick={() => HandleDelete(item)}
                        className="bg-red-500 hover:bg-red-500/70 p-2 px-4 text-white rounded-md"
                      >
                        <Icon
                          icon="mdi:bin"
                          className="w-4 h-4"
                        />
                      </button>
                    </th>
                  </tr>
                ))}
            </tbody>

          </table>
        </div>
        <Circular
          loading={UpdatePromotionState.loading}
        />
      </div>

      <DialogContent
        state={UpdatePromotionState}
        setState={setUpdatePromotionState}
        promotion_id={promotion_id}
      />

    </>
  );


function onOpen() {
  setUpdatePromotionState(prev => ({ ...prev, open: true }))
}

function HandleEdit(product_id: string) {
  router.push(`/admin/update-product/${product_id}`, { scroll: false })
}

async function HandleDelete(Product: Product) {
  setUpdatePromotionState(prev => ({ ...prev, loading: true }));

  let tempProduct: Product[] = []
  const { product } = UpdatePromotionState;

  if (window.confirm(`คุณต้องการลบ ${Product.product_name} ในโปรโมชั่นนี้ใช่ไหม`)) {
    const { data, error } = await DeletePromotionProduct(promotion_id, Product.product_id);
    if (error) {
      toast.error(error);
      setUpdatePromotionState(prev => ({ ...prev, loading: false }));
      return;
    }

    toast.success(`ลบ ${Product.product_name} ออกจากโปรโมชั่นนี้แล้วเรียบร้อย`);
    for (let i = 0; i < product.length; i++) {
      if (product[i].product_id === Product.product_id && product[i] !== undefined) {
        continue;
      }
      else {
        tempProduct.push(product[i]);
      }
    }
    setUpdatePromotionState((prev) => ({ ...prev, product: tempProduct, loading: false }))
  }
  else {
    setUpdatePromotionState((prev) => ({ ...prev, loading: false }))
  }

}



}