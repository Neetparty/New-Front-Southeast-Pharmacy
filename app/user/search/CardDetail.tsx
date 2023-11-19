"use client"
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "react-i18next";

export default function CardDetail({  
    handleLang,
    productName,
    productNameEn,
    productNameCn,
    promotion_price,
    image,
    price,
    sell_total,
    product_id,
    promotion_status,
    description,
    descriptionEn,
    descriptionCn,
    
}: {
    // item: TypeProduct | Product,
    handleLang: (th: string, en: string, ch: string) => string;
    productName: string;
    productNameEn: string;
    productNameCn: string;
    promotion_price: number;
    image: string;
    price: number;
    sell_total: number;
    product_id: string;
    promotion_status: boolean;
    description: string,
    descriptionEn: string,
    descriptionCn: string,
    
}) {
    const { t } = useTranslation('translation')


    return (
        <div className="max-h-[31rem]  w-full border border-slate-200 rounded-xl flex flex-col bg-white text-slate-800">

            <div className="relative w-full h-[21rem] max-h-[21rem]">
                <Image
                    alt={productName}
                    src={image}
                    fill
                    style={{objectFit:"contain"}}
                />
            </div>

            <div className="flex flex-col h-fit relative">

                <div className="p-3 ">
                    <h6 className="text-xl font-medium line-clamp-1 text-start"> {handleLang(productName, productNameEn, productNameCn)}</h6>
                    <h6 className="text-base line-clamp-1 text-slate-500">{handleLang(description, descriptionEn, descriptionCn)}</h6>
                </div>

                <div className="flex justify-between px-3 py-1">
                    <div className="flex flex-wrap gap-2 items-center">
                        {promotion_status ?
                            <>
                                <h6 className="text-xl font-medium">฿ {promotion_price}</h6>
                                <h6 className="text-base font-medium text-slate-500 line-through">฿ {price}</h6>
                                <h6 className="text-base font-medium text-red-500">- {(((Number(price) - Number(promotion_price)) / Number(price)) * 100).toFixed(0)}% </h6>
                            </>
                            :
                            <span className={"text-xl font-medium "}>
                                ฿{price}
                            </span>
                        }
                    </div>
                </div>

                <div className="flex flex-col gap-2 p-3 flex-1 ">
                    <div className="border border-red-500 text-slate-700 p-1 text-center rounded-lg cursor-pointer hover:border-red-400 hover:shadow-md">
                        <span className="text-sm line-clamp-1">{t("PromotionSold1")} {sell_total} {t("PromotionSold2")}</span>
                    </div>
                    <div className="bg-red-500 text-white p-1 text-center rounded-lg cursor-pointer hover:bg-red-400">
                        <Link
                            className="text-base flex gap-1 items-center justify-center"
                            href={`/user/detail/${product_id}`}
                        > {t("userMoreInfo")}</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}