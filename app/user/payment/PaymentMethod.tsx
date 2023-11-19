"use client";
import Image from "next/image";
import { Icon } from "@iconify/react";
import { UserPaymentContextType, useUserPayment } from "./Context";
import CreditCardStep from "./PaymentForm/CreditCard/CreditCardStep";
import Qrcode from "./PaymentForm/Qrcode/Qrcode";
import Wechat from "./PaymentForm/WeChat/Wechat";
import { useTranslation } from 'react-i18next';
export default function PaymentMethod() {

    const {state, subState, setSubState, product }:UserPaymentContextType = useUserPayment?.()!;
    const { t, i18n } = useTranslation('translation');

    function handleType() {
        switch (subState.type) {
            case "promptpay":
                if(subState.qr){
                    return  <div className={`relative mx-auto ${subState.qr && "w-60 h-80"}`}>
                    <Image 
                    fill
                    src={subState.qr}
                    alt="qrcode payment"
                    className="object-contain"
                    />
                </div>
                }
                else return;
            
            case "creditCard":
                return <CreditCardStep/>
            
            case "wechat":
                if(subState.qrWeChat){
                    return  <div className={`relative mx-auto ${subState.qrWeChat && "w-60 h-80"}`}>
                    <Image 
                    fill
                    src={subState.qrWeChat}
                    alt="qrcode payment"
                    className="object-contain"
                    />
                </div>
                }    
                else return
            default:
                break;
        }
    }

    return (
    <>
        <div className="flex flex-col gap-4 border p-4 rounded shadow">
            <div className="flex justify-between">

                <div className="flex gap-2">
                    <Icon
                    icon={"tdesign:money"}
                    className="w-8 h-8 text-red-500"
                    />
                    <h6 className="text-2xl"> {t("paymentMethodHowto")} </h6>
                </div>
            </div>
        <hr className="my-2" />
        

        <div className="flex flex-col gap-4 text-lg">
            <div className="flex justify-end gap-4">
                <h6> {t("paymentMethodDistance")}  </h6>
                <h6>{state.distance} </h6>
            </div>
            <div className="flex justify-end gap-4">
                <h6> {t("paymentMethodWeight")} </h6>
                <h6>{state.weight} </h6>
            </div>
            <div className="flex justify-end gap-4">
                <h6> {t("paymentMethodTotalPriceProduct")} </h6>
                <h6>{product.totalPrice}</h6>
            </div>
            <div className="flex justify-end gap-4">
                <h6> {t("paymentMethodPriceShipping")}  </h6>
                <h6>{state.shippingCostDistance} + {state.shippingCostWeight} = {state.shippingCost} </h6>
            </div>
            <div className="flex justify-end gap-4">
                <h6> {t( "paymentMethodTotalPriceAll")} </h6>
                <h6 className="text-red-500"> {product.totalPrice + state.shippingCost}</h6>
            </div>
        </div>

        <h6> {t("paymentMethodPaymentOption")} </h6>
        <select
            className="border text-slate-700 text-sm rounded-lg block p-2 outline-none placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
            value={subState.type}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSubState(prev => ({ ...prev, type:e.target.value }))}
        >
            {subState.option.map((item, i) => (
                <option 
                value={item}
                key={i}
                >
                {item}
                </option>
            ))}
        
        </select>

        {handleType()}

        </div>
    </>
);


}