import Input from "@/app/component/Input/Input";
import { UpdateProductContext, useUpdateProduct } from "./Context";

export default function ThirdTab() {

    const {state, setState}:UpdateProductContext = useUpdateProduct?.()!;


    return (
    <div  className="flex flex-col gap-8">
            <div className="flex gap-2 flex-col">
                <h6>ชื่อสินค้าภาษาจีน</h6>
                <Input
                value={state.product_cn}
                onChange={(e:React.ChangeEvent<HTMLInputElement>) => setState(prev => ({...prev, product_cn:e.target.value}))}
                placeholder="ชื่อสินค้า(CN)"
                type="text"
                />
            </div>
            <div className="flex gap-2 flex-col">
                <h6>คำอธิบายเพิ่มเติมภาษาจีน</h6>
                <textarea
                className="h-32 border-0 px-3 py-3 placeholder-slate-400 text-slate-600 relative bg-slate-100 rounded text-sm shadow outline-none focus:outline-none focus:ring w-full"
                value={state.desc_en}
                onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => setState(prev => ({...prev, desc_en:event.target.value}))}
                placeholder="คำอธิบายเพิ่มเติม(CN)"
                />
            </div>
            {state.warning_status && 
            <div className="flex gap-2 flex-col">
                <h6>คำเตือนภาษาจีน</h6>
                <Input
                value={state.warning_en}
                onChange={(e:React.ChangeEvent<HTMLInputElement>) => setState(prev => ({...prev, warning_en:e.target.value}))}
                placeholder="คำเตือน(CN)"
                type="text"
                />
            </div>
            }
        <div className="flex justify-end">
            <button
            type="submit"
            className="px-2 p-3 text-white bg-red-500 rounded-md w-fit hover:bg-red-400 disabled:bg-slate-500 disabled:text-slate-200 disabled:disabled:cursor-not-allowed"
            disabled={!state.product_cn}
            >
            <h6 className="font-semibold">ต่อไป</h6>
            </button>
        </div>
    </div>
);
}