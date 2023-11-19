"use client"

import { Icon } from "@iconify/react";
import { PaymentState } from "./Payment";
import Input from "@/app/component/Input/Input";
import { useTranslation } from 'react-i18next';

export default function Note({
    state,setState
}:{
    state:PaymentState,
    setState:React.Dispatch<React.SetStateAction<PaymentState>>,
}) {
    const { t, i18n } = useTranslation('translation');

    return (
    <>
    <div className="flex flex-col gap-4 border p-4 rounded shadow">
            <div className="flex">

                <div className="flex gap-2">
                    <Icon
                    icon={"ph:info-light"}
                    className="w-8 h-8 text-red-500"
                    />
                    <h6 className="text-2xl"> {t("paymentNoteTopic")} </h6>
                </div>

             
            </div>
        <hr className="my-2" />
        <div className="">
            <Input
            onChange={(e:React.ChangeEvent<HTMLInputElement>) => setState(prev => ({...prev, note:e.target.value}))}
            value={state.note}
            type="text"
            placeholder= {t("paymentNote")}
            />
        </div>
        </div>
    </>
);
}