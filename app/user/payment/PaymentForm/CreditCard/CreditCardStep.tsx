"use client"

import { UserPaymentContextType, useUserPayment } from "../../Context";
import { Icon } from "@iconify/react";
import FirstStepCreditForm from "./FirstStepCreditForm";
import SecondStepCreditForm from "./SecondStepCreditForm";
import { useTranslation } from 'react-i18next';


export default function CreditCardStep() {
    const { t, i18n } = useTranslation('translation');
    const { subState }:UserPaymentContextType = useUserPayment?.()!;

    
    function handleIndex() {
        switch (subState.index) {
            case 0:
                return <FirstStepCreditForm/> 
        
            case 1:
                return <SecondStepCreditForm/>

            default:
                <FirstStepCreditForm/>
                break;
        }
    }

    return (
    <>
        <ol className="flex items-center w-full p-3 space-x-2 text-sm font-medium text-center text-gray-500 bg-white border border-gray-200 rounded-lg shadow-sm sm:text-base sm:p-4 sm:space-x-4">
            <li className={`flex items-center ${subState.index >= 0 && "text-blue-600"}`}>
                <span className={`flex items-center justify-center w-5 h-5 mr-2 text-xs border ${subState.index >= 0 && "border-blue-500"} rounded-full shrink-0`}>
                    1
                </span>
                {t("paymentCreditcardMainInfo2")}<span className="hidden sm:inline-flex">{t("paymentCreditcardMainInfo1")}</span>
              <Icon
              icon={"ep:d-arrow-right"}
              className="w-5 h-5"
              />
            </li>
            <li className={`flex items-center ${subState.index >= 1 && "text-blue-600"}`}>
                <span className={`flex items-center justify-center w-5 h-5 mr-2 text-xs border ${subState.index >= 1 && "border-blue-500"} rounded-full shrink-0`}>
                    2
                </span>
                {t("paymentCreditcardMainConfirmOrder1")}<span className="hidden sm:inline-flex"> {t("paymentCreditcardMainConfirmOrder2")} </span>
           
            </li>
        </ol>
        
        {handleIndex()}
     
    </>
);


}