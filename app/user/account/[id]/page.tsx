"use client"
import Tab from "./Tab";
import { useTranslation } from 'react-i18next';
export default function Page() {
    const { t } = useTranslation('translation')

    return (
    <div className="md:p-8 p-2">
        <h6 className="text-2xl font-bold"> {t("accountUser1")} </h6>

        <Tab/>

    </div>
);
}