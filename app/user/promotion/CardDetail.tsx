"use client"
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { PromotionProduct } from '@/app/user/promotion/page';

export default function CardDetail({ item, handleLang }: {
    item: PromotionProduct,
    handleLang: (th: string, en: string, ch: string) => string;
}) {
    const { t } = useTranslation('translation')


    return (
        <div className="w-full h-full">
            <div className="h-full w-full border rounded-lg hover:shadow-md mb-8 flex flex-col justify-between gap-2  text-start overflow-hidden">
                <div className="relative w-full h-[18rem] ">
                    <Image
                        src={item.product.image}
                        alt="product-alt"
                        layout="fill"
                        objectFit="fill"
                    />
                </div>

                <div className="text-sm p-2">
                    {item.product.promotion_status ?
                        <div className="flex gap-2 items-center">
                            <span className="text-red-400 text-base">฿ {item.product.promotion_price}</span>
                            <span className="text-gray-500 text-xs  mr-2 line-through">฿ {item.product.price}</span>
                            <span className="text-gray-500 text-xs">- {(((Number(item.product?.price) - Number(item.product?.promotion_price)) / Number(item.product?.price)) * 100).toFixed(0)}% </span>
                        </div>
                        :
                        <span className={"text-slate-500 text-base "}>
                            ฿{item.product.price}
                        </span>
                    }
                    <span className="text-gray-600 text-xl line-clamp-2">
                        {handleLang(item.product.product_name, item.product.product_name_en, item.product.product_name_cn)}dads
                    </span>
                </div>

                <div className="flex flex-col gap-2">
                    <div className="border border-red-500 text-slate-700 p-1 text-center rounded-lg cursor-pointer hover:border-red-400 hover:shadow-md">
                        <span className="text-sm line-clamp-1">{t("PromotionSold1")} {item.product.sell_total} {t("PromotionSold2")}</span>
                    </div>
                    <div className="bg-red-500 text-white p-1 text-center rounded-lg cursor-pointer hover:bg-red-400">
                        <Link
                            className="text-base flex gap-1 items-center justify-center"
                            href={`/user/detail/${item.product.product_id}`}
                        > {t("userMoreInfo")}</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}