"use client";

import Input from "@/app/component/Input/Input";
import { UpdatePromotionContextType, useUpdatePromotion } from "./Context";

export default function Form({ promotion_id = "" }: { promotion_id: string }) {

    const { UpdatePromotionFormState, setUpdatePromotionFormState, onSubmitUpdatePromotion }: UpdatePromotionContextType = useUpdatePromotion?.()!;

  

    return (
        <>
            <div className="">
                <div>
                    <h6 className="text-3xl font-bold mb-6">สินค้าโปรโมชั่น</h6>
                </div>
                <form onSubmit={onSubmitUpdatePromotion} className="flex flex-col gap-8">
                    <div className="flex gap-2 flex-col">
                        <h6>ชื่อโปรโมชั่น(TH)</h6>
                        <Input
                            value={UpdatePromotionFormState.promotion_th}
                            onChange={headerTHHandler}
                            placeholder="ชื่อโปรโมชั่น"
                            type="text"
                        />
                    </div>

                    <div className="flex gap-2 flex-col">
                        <h6>ชื่อโปรโมชั่น (EN)</h6>
                        <Input
                            value={UpdatePromotionFormState.promotion_en}
                            onChange={headerENHandler}
                            placeholder="ชื่อโปรโมชั่น"
                            type="text"
                        />
                    </div>

                    <div className="flex gap-2 flex-col">
                        <h6>ชื่อโปรโมชั่น (CN)</h6>
                        <Input
                            value={UpdatePromotionFormState.promotion_cn}
                            onChange={headerCNHandler}
                            placeholder="ชื่อโปรโมชั่น"
                            type="text"
                        />
                    </div>
                         
                        <div>
                            <button
                                type="submit"
                                className="px-2 p-3 text-white bg-red-500 rounded-md w-fit hover:bg-red-400 disabled:bg-slate-500 disabled:text-slate-200 disabled:cursor-not-allowed"
                                disabled={!UpdatePromotionFormState.promotion_cn || !UpdatePromotionFormState.promotion_en || !UpdatePromotionFormState.promotion_th}
                            >
                                <h6 className="font-semibold">อัพเดตโปรโมชั่น</h6>
                            </button>
                        </div>

                </form>


            </div>
        </>
    );





function headerTHHandler(e: React.ChangeEvent<HTMLInputElement>) {
    setUpdatePromotionFormState(prev => ({ ...prev, promotion_th: e.target.value }))
}
function headerENHandler(e: React.ChangeEvent<HTMLInputElement>) {
    setUpdatePromotionFormState(prev => ({ ...prev, promotion_en: e.target.value }))
}
function headerCNHandler(e: React.ChangeEvent<HTMLInputElement>) {
    setUpdatePromotionFormState(prev => ({ ...prev, promotion_cn: e.target.value }))
}

}