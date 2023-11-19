"use client"

import Input from "@/app/component/Input/Input";
import { UserPaymentContextType, useUserPayment } from "../../Context";
import { useTranslation } from 'react-i18next';


export default function FirstStepCreditForm() {
    const { subState, setSubState, handleSubmitCreateToken }: UserPaymentContextType = useUserPayment?.()!;
    const { t, i18n } = useTranslation('translation');

    return (
        <form
            onSubmit={handleSubmitCreateToken}
            className="p-4 flex flex-col gap-4"
        >
            <div className="flex flex-col gap-8">
                <div className="flex flex-col gap-2">
                    <h6 className="text-lg"> {t("paymentCreditcardFirstNameOwner")} </h6>
                    <Input
                        type="text"
                        placeholder={t("paymentCreditcardFirstNameOwner")}
                        value={subState.name}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSubState(prev => ({ ...prev, name: e.target.value }))}
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <h6 className="text-lg"> {t("paymentCreditcardFirstCardNo")} </h6>
                    <Input
                        type="text"
                        placeholder={t("paymentCreditcardFirstCardNo")}
                        value={subState.cardNumber}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSubState(prev => ({ ...prev, cardNumber: e.target.value }))}
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                    <div className="flex flex-col gap-2">
                        <h6 className="text-lg"> MM </h6>
                        <Input
                            type="text"
                            placeholder="MM"
                            value={subState.MM}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSubState(prev => ({ ...prev, MM: e.target.value }))}
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <h6 className="text-lg">YY {t("paymentCreditcardFirstYY")}</h6>
                        <Input
                            type="text"
                            placeholder="YY (Last Two Digits)"
                            value={subState.YY}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSubState(prev => ({ ...prev, YY: e.target.value }))}
                        />
                    </div>

                </div>
                <div className="flex flex-col gap-2">
                    <h6 className="text-lg">CVV</h6>
                    <Input
                        type="text"
                        placeholder="CVV"
                        value={subState.CVV}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSubState(prev => ({ ...prev, CVV: e.target.value }))}
                    />
                </div>
                <button
                    type="submit"
                    onSubmit={handleSubmitCreateToken}
                    className="px-4 py-2 bg-blue-500 rounded-xl text-white"
                >
                    {t("paymentCreditcardFirstConfirm")}
                </button>
            </div>
        </form>
    );
}