"use client"
import Facebook from "./facebook.png"
import LineOA from "./lineoa.png"
import Ig from "./ig.png"
import Gmail from "./gmail.png"
import Dhl from "./dhl.png"
import Kerry from "./kerry.png"
import { Icon } from '@iconify/react';
import Image from "next/image";
import Link from "next/link"
import { useSelector } from "react-redux"
import React from "react"
import { selectCategoryData, selectLangData } from "@/app/GlobalRedux/Features/selector"
import { useTranslation } from 'react-i18next';

export default function Footer() {

    const category = useSelector(selectCategoryData);
    const lang = useSelector(selectLangData);

    const { t } = useTranslation('translation')
   
    function handleLang(thai:string, english:string, china:string){

        if(lang.lang === "th"){
          return thai;
        }
        else if(lang.lang === "en"){
          return english;
        }
        else if(lang.lang === "cn"){
          return china;
        }
        else {
          return thai;
        }
    }
    return (
        <footer className="flex flex-wrap mx-auto justify-evenly text-white p-4 md:px-16 gap-16 bg-blue-900 w-full ">
            <div className="flex flex-col  gap-2">
                <div className="flex flex-row justify-center items-center gap-2">
                    <Icon icon="iconoir:pharmacy-cross-square" className="h-8 w-8" />
                    <h2 className="text-base text-center font-semibold uppercase">SOUTHEAST PHARMACY</h2>
                </div>
                <p className="text-center text-sm mt-4">
                    {t("footerDesc1")}
                </p>
                <p className="text-center text-sm mt-4">
                    {t("footerDesc2")}
                </p>
                <p className="text-center text-sm mt-4">
                    {t("footerDesc3")}
                </p>
                <p className="text-center text-sm mt-4">
                    {t("footerDesc4")}
                </p>
                <div className="flex flex-col gap-10">
                    <div className="flex flex-row justify-center mt-2 gap-2">
                        <Image
                            src={Facebook}
                            alt="product-alt"
                            className="w-6"
                        />
                        <Image
                            src={LineOA}
                            alt="product-alt"
                            className="w-6"
                        />
                        <Image
                            src={Ig}
                            alt="product-alt"
                            className="w-6"
                        />
                        <Image
                            src={Gmail}
                            alt="product-alt"
                            className="w-6"
                        />
                    </div>
                    <div className="flex flex-col justify-center mt-2 gap-0">
                        <h2 className="text-base text-center font-semibold uppercase"> {t("footerDelivery")} </h2>
                        <div className="flex flex-row justify-center gap-2">
                            <Image
                                src={Kerry}
                                alt="product-alt"
                                className="w-24"
                            />
                            <Image
                                src={Dhl}
                                alt="product-alt"
                                className="w-24"
                            />
                        </div>

                    </div>
                </div>
            </div>
            
            <div>
                <h2 className="mb-6 text-sm font-semibold uppercase"> {t("footerProduct")} </h2>
                <ul className=" font-medium"> 
                    <li className="mb-4">
                        <Link href={`/user/promotion`} className="text-sm hover:underline"> {t("footerPromotion")} </Link>
                    </li>
                    <li className="mb-4">
                        <Link href={`/user/search`} className="text-sm hover:underline">  {t("footerEtc")} </Link>
                    </li>
                </ul>
            </div>
          
                {/* สินค้าตามกลุ่มผู้ใช้ */}
                <div>
                    <h2 className="mb-6 text-sm font-semibold uppercase">{t("footerProductbyusergroup")} </h2>
                    <ul className=" font-medium">
                        
                        {category.length !== 0 && 
                         category.map((item, i) => (
                        <React.Fragment key={i}>
                        {item.category_name.includes("วัย") && 
                        <li className="mb-4">
                            <Link
                            href={`/user/search?cate=${item.category_id}`}
                            className="text-sm hover:underline"
                            >
                            {handleLang(item.category_name, item.category_name_en, item.category_name_ch)}
                            </Link>
                        </li>
                        }
                        </React.Fragment>
                    ))
                    }

                    </ul>
                </div>
                {/*งานบริการลูกค้า */}
                <div>
                    <h2 className="mb-6 text-sm font-semibold uppercase">{t("footerEtc")}</h2>
                    <ul className=" font-medium">
                        <li className="mb-4">
                            <Link href={`/user/service`} className="text-sm hover:underline">{t("footerCustomersvc")}</Link>
                        </li>
                        <li className="mb-4">
                            <Link href={`/user/aboutUs`} className="text-sm hover:underline">{t("footerAboutus")}</Link>
                        </li>
                    </ul>
                </div>
            </footer>
        
    );
}