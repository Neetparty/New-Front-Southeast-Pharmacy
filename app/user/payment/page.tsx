"use client";
import Form from "./Form";
import { useTranslation } from 'react-i18next';

export default function Page() {
    const { t } = useTranslation('translation');
    return (
     <div className="md:p-8 p-2">
        <h6 className="text-2xl font-bold mb-8"> {t("paymentMethod")} </h6>
        <Form/>
    </div>

);
}