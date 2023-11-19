"use client"
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "react-i18next";

export default function CardSpecial({item, handleLang}:{
    item: {
        product_id: string;
        product_name: string;
        product_name_en: string;
        product_name_cn: string;
        image: string;
        sell_total: number;
        promotion_price: number;
        promotion_status: boolean;
        price: number;
        is_special: boolean;
    },
    handleLang:(th:string, en:string, ch:string) => string;
}) {
    const { t } = useTranslation('translation')


    return (
        <>
            <div className="w-full h-full border rounded-lg hover:shadow-md">
                <div className="flex flex-col gap-2  text-start p-2 overflow-hidden">
                    <div className="relative w-32 h-44 md:w-[8.5rem] lg:w-36 md:h-52 mx-auto">
                        <Image
                            src={item.image}
                            alt="product-alt"
                            layout="fill"
                            objectFit="fill"
                        />
                    </div>

                    <div className="text-sm">
                        {item.promotion_status ?
                            <>
                                <span className="text-red-400">฿ {item.promotion_price}</span>
                                <div className="flex gap-2 items-center">
                                    <span className="text-gray-500 text-sm  mr-2 line-through">฿ {item.price}</span>
                                    <span className="text-gray-500 text-base">- {(((Number(item?.price) - Number(item?.promotion_price)) / Number(item?.price)) * 100).toFixed(0)}% </span>
                                </div>
                            </>
                            :
                            <span className={"text-slate-500 "}>
                                ฿{item.price}
                            </span>
                        }
                        <span className="text-gray-600 text-xl line-clamp-2">
                            {handleLang(item.product_name, item.product_name_en, item.product_name_cn)}
                        </span>
                    </div>
                    <div className="border border-red-500 text-slate-700 p-1 text-center rounded-lg cursor-pointer hover:border-red-400 hover:shadow-md">
                        <span className="text-sm line-clamp-1">{t("PromotionSold1")} {item.sell_total} {t("PromotionSold2")}</span>
                    </div>
                    <div className="bg-red-500 text-white p-1 text-center rounded-lg cursor-pointer hover:bg-red-400">
                        <Link 
                        className="text-base flex gap-1 items-center justify-center"
                        href={`/user/detail/${item.product_id}`}
                        > {t("userMoreInfo")}</Link>
                    </div>
                </div>
            </div>
        </>
);
}