"use client"
import { useEffect } from "react";
import Tab from "./Tab";
import { useTranslation } from 'react-i18next';
import { useRouter } from "next/navigation";
export default function Page() {
    const { t } = useTranslation('translation')
    const router = useRouter();

    useEffect(() => {
        const user = localStorage.getItem("user");
        if(!user){
            router.push("/");
        }
    }, [])

    return (
    <div className="md:p-8 p-2">
        <h6 className="text-2xl font-bold"> {t("accountUser1")} </h6>

        <Tab/>

    </div>
);
}