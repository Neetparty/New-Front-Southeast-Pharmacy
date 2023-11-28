"use client"
import Carousel from "@/app/component/Carousel/Carousel";
import { useEffect, useState } from "react";
import { makeRequest } from "@/app/hook/makeRequest";
import { toast } from "react-toastify";
import PromotionSlider from "@/app/user/promotion/PromotionSlider";
import { useSelector } from 'react-redux';
import { selectBannerData, selectLangData, selectUserData } from '@/app/GlobalRedux/Features/selector';
import { BannerRedux } from "@/app/GlobalRedux/Features/Feature";
import Link from "next/link";
import Image from "next/image";
import { Icon } from "@iconify/react";
import { useTranslation } from "react-i18next";
import SpecialProduct from "./specialProduct";
export interface PromotionProduct {
    product: Product
}
    
interface Promotion {
    promotion_name: string;
    promotion_name_en: string;
    promotion_name_cn: string;
    Promotion_product: PromotionProduct[];
}
type Product = {
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
};

export interface PromotionState {
    promotion:Promotion[];
    specialProduct: Product[];
}

export default function Page() {
    const user = useSelector(selectUserData);
    const lang = useSelector(selectLangData);
    const { t } = useTranslation("translation");

    const banner = useSelector(selectBannerData)
    const [state, setState] = useState<PromotionState>({
        promotion: [],
        specialProduct: []
    })

    useEffect(() => {
        LoadData();
        // if(user.role === "special" || user.role === "admin"){
        handleSpecialProduct()
        // }
    }, [])

    async function handleSpecialProduct() {
        const { data, error } = await makeRequest<{ product: Product[] }>("/user-get-s-product", {
            method: "GET"
        })
        if (data?.product) {
            setState(prev => ({ ...prev, specialProduct: data?.product }))
        }
    }


    async function LoadData() {
        const { data, error } = await makeRequest<{ promotion: Promotion[], msg: string, banner: any }>("/user-get-promotion", {
            method: "GET",
        })
        if (error || !data?.promotion) {
            toast.error("Something went wrong when try to get data for your");
        }
        else {
            setState(prev => ({ ...prev, promotion: data.promotion }))
        }
    }

    function handleLang(thai: string, english: string, china: string) {

        if (lang.lang === "th") {
            return thai;
        }
        else if (lang.lang === "en") {
            return english;
        }
        else if (lang.lang === "cn") {
            return china;
        }
        else {
            return thai;
        }
    }
    

    return (
        <div className="">
            <div className="w-auto text-center">
                {banner.length !== 0 &&
                    <Carousel
                        banner={banner}
                    />
                }
            </div>
            <div className="px-4 my-2">

                {state.promotion.length !== 0 &&
                    state.promotion.map((item, i) => (
                        <div className="" key={i}>
                            <h1 className="text-center cursor-pointer mt-8 text-slate-600 text-4xl font-semibold">{
                                handleLang(item.promotion_name, item.promotion_name_en, item.promotion_name_cn)
                            }</h1>
                            <hr className="border-slate-200 my-4" />
                            {item.Promotion_product.length !== 0 && 
                             <PromotionSlider
                             t={t}
                             lang={lang}
                             handleLang={handleLang}
                             product={item.Promotion_product}
                         />
                            }
                        </div>
                    ))
                }
            </div>


            {state.specialProduct.length !== 0 && 
            <>
            <h6 className="text-center cursor-pointer mt-8 text-slate-600 text-4xl font-semibold"> {t("specialUser")} </h6>
            <hr className="border-slate-200" />
            <SpecialProduct
                handleLang={handleLang}
                lang={lang}
                state={state}
                t={t}
            />
            </>
            }

        </div>

    );
}