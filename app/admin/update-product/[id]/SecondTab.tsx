import Input from "@/app/component/Input/Input";
import { UpdateProductContext, useUpdateProduct } from "./Context";

export default function SecondTab() {

    const {state, setState}:UpdateProductContext = useUpdateProduct?.()!;



    return (
    <div  className="flex flex-col gap-8">
            <div className="flex gap-2 flex-col">
                <h6>ชื่อสินค้าภาษาอังกฤษ</h6>
                <Input
                value={state.product_en}
                onChange={(e:React.ChangeEvent<HTMLInputElement>) => setState(prev => ({...prev, product_en:e.target.value}))}
                placeholder="ชื่อสินค้า(EN)"
                type="text"
                />
            </div>
            <div className="flex gap-2 flex-col">
                <h6>คำอธิบายเพิ่มเติมภาษาอังกฤษ</h6>
                <textarea
                className="h-32 border-0 px-3 py-3 placeholder-slate-400 text-slate-600 relative bg-slate-100 rounded text-sm shadow outline-none focus:outline-none focus:ring w-full"
                value={state.desc_en}
                onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => setState(prev => ({...prev, desc_en:event.target.value}))}
                placeholder="คำอธิบายเพิ่มเติม(EN)"
                />
            </div>
            {state.warning_status && 
            <div className="flex gap-2 flex-col">
                <h6>คำเตือนภาษาอังกฤษ</h6>
                <Input
                value={state.warning_en}
                onChange={(e:React.ChangeEvent<HTMLInputElement>) => setState(prev => ({...prev, warning_en:e.target.value}))}
                placeholder="คำเตือน(EM)"
                type="text"
                />
            </div>
            }
        <div className="flex justify-end">
            <button
            onClick={() => setState(prev => ({...prev, index:2}))}
            className="px-2 p-3 text-white bg-red-500 rounded-md w-fit hover:bg-red-400 disabled:bg-slate-500 disabled:text-slate-200 disabled:disabled:cursor-not-allowed"
            disabled={!state.product_en}
            >
            <h6 className="font-semibold">ต่อไป</h6>
            </button>
        </div>
    </div>
);
}