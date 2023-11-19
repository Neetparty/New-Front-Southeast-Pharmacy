"use client";

import { OrderRedux } from "@/app/GlobalRedux/Features/Feature";
import { selectLangData } from "@/app/GlobalRedux/Features/selector";
import { Icon } from "@iconify/react";
import Image from "next/image";
import { useTranslation } from 'react-i18next';
import { useSelector } from "react-redux";
export default function ListProduct({ product }: {
    product: OrderRedux
}) {
    const lang = useSelector(selectLangData);

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
    const { t } = useTranslation('translation');
    return (
        <div className="flex flex-col gap-4 border p-4 rounded shadow">
            <div className="flex gap-2">
                <Icon
                    icon={"fluent-mdl2:product"}
                    className="w-8 h-8 text-red-500"
                />
                <h6 className="text-2xl"> {t("paymentListProductTopic")} </h6>
            </div>
            <hr className="my-2" />
            <div className="block w-full overflow-x-auto">
                <table className="items-center w-full bg-transparent border-collapse border">
                    <thead>
                        <tr>
                            <th className={"px-6 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center bg-white text-blue-500 border-slate-100 "}>
                                {t("paymentListProduct")}
                            </th>
                            <th className={"px-6 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center bg-white text-blue-500 border-slate-100 "}>
                                {t("paymentPricePerUnit")}
                            </th>
                            <th className={"px-6 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center bg-white text-blue-500 border-slate-100 "}>
                                {t("paymentQuantity")}
                            </th>

                        </tr>
                    </thead>

                    <tbody className="bg-slate-50">
                        {product.product.length !== 0 &&
                            product.product.map((item, key) => (
                                <tr
                                    key={key}
                                    className={`border-b-slate-200 odd:bg-slate-100 hover:bg-slate-200/70`}
                                >
                                    <th className="flex items-center gap-2 border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-center ">
                                        <div className="w-12 h-scrren">
                                            <Image
                                                alt={item.product_name}
                                                width="0"
                                                height="0"
                                                sizes="100vw"
                                                className="w-full h-auto"
                                                src={item.image}
                                            />
                                        </div>
                                        <span className={"ml-3 font-medium text-slate-600 line-clamp-1"}>
                                            {handleLang(item.product_name, item.product_name_en, item.product_name_cn)}
                                        </span>
                                    </th>

                                    <th className=" border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-center">
                                        {item.promotion_status ?
                                            <div className={"flex gap-2 font-medium text-slate-600 justify-center "}>
                                                <h6 className=" line-through text-red-400  ">{item.price}</h6>
                                                <h6 className=" text-slate-600">{item.promotion_price}</h6>
                                            </div>
                                            :
                                            <span className={"ml-3 font-medium  text-slate-600 "}>
                                                {item.price}
                                            </span>
                                        }
                                    </th>

                                    <th className=" border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-center">
                                        <span className={"ml-3 font-medium text-slate-600 "}>
                                            {item.totalProduct}
                                        </span>
                                    </th>

                                </tr>
                            ))}
                    </tbody>

                </table>
            </div>
        </div>
    );
}