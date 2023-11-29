"use client"
import { useEffect } from "react";
import ListProduct from "./ListProduct";
import { useTranslation } from 'react-i18next';
import { useRouter } from "next/navigation";
export default function Page() {
   const { t, i18n } = useTranslation('translation')

  const router = useRouter();

    useEffect(() => {
        const user = localStorage.getItem("user");
        if(!user){
            router.push("/");
        }
    }, [])

    return (
    <>
      <div className="md:p-8 p-2">
        <h6 className="text-2xl font-bold "> {t("shopingcartTopic")} </h6>

        <ListProduct/>
    </div>

       
    </>
);
}