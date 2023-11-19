"use client"

import Input from "@/app/component/Input/Input";
import { UserPaymentContextType, useUserPayment } from "../../Context";
import { useTranslation } from 'react-i18next';

export default function SecondStepCreditForm() {
    const { t, i18n } = useTranslation('translation');
    const {subState, setSubState, handleSubmitCheckout, state, product }:UserPaymentContextType = useUserPayment?.()!;

    return (
    <>
        <form
        onSubmit={handleSubmitCheckout}
        className="p-4 flex flex-col gap-4"
        >
        <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-2">
                <h6 className="text-lg"> {t("paymentCreditcardSecondRefNo")} </h6>
                <Input
                    type="text"
                    placeholder= {t("paymentCreditcardSecondRefNo")} 
                    value={subState.referenceNo}
                    onChange={(e:React.ChangeEvent<HTMLInputElement>) => {}}
                />
            </div>
        
            <div className="flex flex-col gap-2">
                <h6 className="text-lg">  {t("paymentCreditcardSecondAmount")}  </h6>
                <Input
                    type="number"
                    placeholder= {t("paymentCreditcardSecondAmount")} 
                    value={product.totalPrice + state.shippingCost}
                    onChange={(e:React.ChangeEvent<HTMLInputElement>) => {}}
                />
            </div>
            
            <div className="flex flex-col gap-2">
                <h6 className="text-lg"> {t("paymentCreditcardSecondDetail1")}  </h6>
                <Input
                    type="text"
                    placeholder= {t("paymentCreditcardSecondDetial2")} 
                    value={subState.detail}
                    onChange={(e:React.ChangeEvent<HTMLInputElement>) => {}}
                />
            </div>

        
            <button 
            type="submit"
            onSubmit={handleSubmitCheckout}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-400 rounded-xl text-white" 
            >
                {t("paymentCreditcardSecondConfirm")} 
            </button>
            <button 
            type="button"
            onClick={() => setSubState(prev => ({...prev, index:0}))}
            className="px-4 py-2 bg-red-500 hover:bg-red-400 rounded-xl text-white" 
            >
                {t("paymentCreditcardSecondCancel")} 
            </button>
        </div>
        </form>
    </>
);
}