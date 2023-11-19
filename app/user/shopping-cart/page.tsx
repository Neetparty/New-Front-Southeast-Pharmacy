"use client"
import ListProduct from "./ListProduct";
import { useTranslation } from 'react-i18next';
export default function Page() {
   const { t, i18n } = useTranslation('translation')
    return (
    <>
      <div className="md:p-8 p-2">
        <h6 className="text-2xl font-bold "> {t("shopingcartTopic")} </h6>

        <ListProduct/>
    </div>

       
    </>
);
}