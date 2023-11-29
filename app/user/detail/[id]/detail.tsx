"use client"
import { Icon } from '@iconify/react';
import { useEffect, useMemo, useState } from 'react';
import Image from "next/image";
import React from 'react';
import { DetailState } from './detail-type';
import { AddToFav, AddToUserCart, GetProductDetail } from './detail-api';
import { Circular } from '@/app/component/Loading/Circular';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next'; import { useRouter } from "next/navigation";
import { useSelector } from 'react-redux';
import { selectLangData } from '@/app/GlobalRedux/Features/selector';
import Comment from './Comment';

export default function Detail({ id }: { id: string }) {
    const router = useRouter();
    const lang = useSelector(selectLangData);
    const { t, i18n } = useTranslation('translation');

    const user = localStorage.getItem("user") as string

    const [state, setState] = useState<DetailState>({
        price: "",
        index: 0,
        product: null,
        images: [],
        totalProduct: 0,
        loading: false,
        fav: false,
        rating: 0,
        comment: [],
        ratingCount: {
            1: 0,
            2: 0,
            3: 0,
            4: 0,
            5: 0
        }
    })

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

    useEffect(() => {

        if (typeof window !== 'undefined') {
            window.scrollTo({
                top: 0,
                left: 0,
                behavior: "smooth"
            });
        }

        GetProductData(id);

    }, [])



    const averageRating = useMemo(() => {
        let avg = 0;
        state.comment.forEach((item) => {
            avg += item.rating;
        })
        return state.comment.length === 0 ? "0.00" : (avg / state.comment.length).toFixed(2);
    }, [state.comment])



    return (
        <>
            {state.product &&
                <div className='flex flex-col ml-2 mr-2 gap-6'>
                    <div className="flex justify-between">

                        <div className="flex items-center md:text-lg sm:text-sm gap-2">
                            <Icon
                                icon="carbon:home"
                                className="w-8 h-8"
                            />
                            /
                            <h6 className="line-clamp-1">{handleLang(state.product.product_name, state.product.description_en, state.product.product_name_cn)}</h6>
                        </div>

                        {
                            user ? 
                            <Icon
                            icon="ph:heart"
                            className={`w-8 h-8 cursor-pointer hover:text-red-400 ${state.fav ? "text-red-500" : "text-slate-800"}`}
                            onClick={() => handleFav(id)}
                        /> : <></>
                        }

                    </div>
                    <hr className="border-slate-300 w-full h-0.5" />
                    <div className='grid grid-cols-1 md:grid-cols-2 justify-items-center gap-16'>
                        <div className="flex flex-col gap-4">

                            {state.images.map((item, key) => (
                                <React.Fragment key={key}>
                                    {state.index === item.index && item.show &&
                                        <Image
                                            src={item.image}
                                            alt="product-alt"
                                            width={224}
                                            height={224}
                                            key={key}
                                            className="w-56 h-56 object-contain mx-auto"
                                        />
                                    }
                                </React.Fragment>
                            ))}
                            <div
                                className='flex justify-start flex-wrap flex-row gap-8'>
                                {state.images.map((item, key) => (
                                    <Image
                                        key={key}
                                        width={64}
                                        height={64}
                                        src={item.image}
                                        alt="product-alt"
                                        onClick={() => onChangeImage(key)}
                                        className="w-16 h-16 object-contain border cursor-pointer hover:border-red-500"
                                    />
                                ))}
                            </div>
                        </div>

                        <div className='flex flex-col justify-center gap-4 w-full'>
                            <div className="w-full md:w-3/4 text-2xl ">
                                <h6>{handleLang(state.product.product_name, state.product.description_en, state.product.product_name_cn)}</h6>
                            </div>

                            <div className='flex justify-start flex-row flex-wrap gap-3'>
                                <div className='flex items-center flex-row gap-1'>
                                    <Icon icon="material-symbols:category-outline" className='text-gray-600' />
                                    <h6 className='text-lg text-gray-600'>{handleLang(state.product.category.category_name, state.product.category.category_name_en, state.product.category.category_name_ch)}</h6>
                                </div>
                                <div className='flex  flex-row gap-1 items-center'>
                                    <Icon icon="bi:cart" className='text-gray-600' />
                                    <h6 className='text-base text-gray-600'>{state.product.quantity} {t("detailPiece")} </h6>
                                </div>
                                <div className='flex items-center flex-row gap-1'>
                                    <Icon icon="material-symbols:star-outline" className='text-yellow-400' />
                                    <h6 className='text-base text-gray-600'>{averageRating}</h6>
                                </div>
                            </div>

                            <div className='flex flex-row items-center text-lg text-gray-600 gap-3'>
                                <h6>{t("searchPrice")}</h6>
                                <div
                                    className="flex flex-col items-center bg-white rounded  md:flex-row "
                                >
                                    <div className="flex justify-between items-center p-2 px-4 leading-normal gap-2 ">
                                        {state.product.promotion_status ?
                                            <>
                                                <span className="text-red-400 text-base text-left">฿ {state.product.promotion_price}</span>
                                                <div className="flex gap-2 items-center">
                                                    <span className=" text-xs text-gray-700  mr-2 line-through">฿ {state.product.price}</span>
                                                    <span className=" text-xs text-gray-700">-{(((Number(state.product?.price) - Number(state.product?.promotion_price)) / Number(state.product?.price)) * 100).toFixed(0)}%</span>
                                                </div>
                                            </>
                                            :
                                            <h1 className=" font-normal text-gray-700">฿ {state.product.price}</h1>
                                        }
                                    </div>
                                </div>
                            </div>

                            {
                                user ?
                                    <div className='flex flex-row flex-wrap gap-4'>
                                        <button
                                            type="button"
                                            onClick={AddToCart}
                                            className="flex flex-row justify-center w-max px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-400 disabled:bg-slate-500 disabled:text-slate-200 disabled:disabled:cursor-not-allowed"
                                        >
                                            <Icon icon="bi:cart" className='mt-1' />
                                            <h6>{t("detailAddtocart")} </h6>
                                        </button>
                                        <button
                                            type="button"
                                            className="text-red-500 rounded-md w-max border-red-500 hover:border-red-400 hover:text-red-400 border px-4 py-2"
                                            onClick={handleBuyProduct}
                                        >
                                            <h6>  {t("detailBuy")} </h6>
                                        </button>
                                    </div>
                    
                        :
                        <></>
                        }
                        </div>
                    </div>

                    <hr className="border-slate-300 w-full h-0.5" />

                    <div className="flex flex-col gap-5 ml-5">
                        <h6 className='text-xl'>{t("detailDesc")}</h6>
                        <p className='text-gray-600'>{handleLang(state.product.description, state.product.description_en, state.product.description_cn)}</p>
                    </div>
                    <hr className="border-slate-300 w-full h-0.5" />

                    {state.product.warning_status &&
                        <>
                            <div className="flex flex-col gap-5 ml-5">
                                <h6 className='text-xl'>{t("detailWarning")} </h6>
                                <p className='text-gray-600'>{handleLang(state.product.warning, state.product.warning_en, state.product.warning_cn)}</p>
                            </div>
                            <hr className="border-slate-300 w-full h-0.5" />

                        </>
                    }
                </div>
            }


            <Comment
                state={state}
                setState={setState}
                averageRating={averageRating}
            />





            <Circular
                loading={state.loading}
            />
        </>
    );


    async function handleFav(productId: string) {
        setState(prev => ({ ...prev, loading: true }));
        const { data, error } = await AddToFav(productId);
        if (error || !data || typeof (data?.fav) !== "boolean") {
            toast.error(error)
            setState(prev => ({ ...prev, loading: false }));
            return;
        }
        else {
            toast.success(data.msg || "สำเร็จแล้ว");
            setState(prev => ({ ...prev, loading: false, fav: data.fav }));
        }
    }

    function onChangeImage(index: number) {
        setState(prev => {
            let temp = prev.images;
            temp.forEach((elem) => {
                if (elem.index === index) {
                    elem.show = true;
                }
                else {
                    elem.show = false;
                }
            })
            return { ...prev, images: temp, index: index }
        })
    }


    async function GetProductData(productId: string) {
        setState(prev => ({ ...prev, loading: true }))
        const { data, error } = await GetProductDetail(productId);

        if (error || !data?.product) {
            setState(prev => ({ ...prev, loading: false }));
            toast.error(error)
            return;
        }
        else {
            setState(prev => {
                let temp: {
                    image: string;
                    index: number;
                    show: boolean;
                }[] = [];
                temp.push({
                    image: data.product.image,
                    index: 0,
                    show: true
                })
                data.product.sub_image_products.forEach((element, i) => {
                    temp.push({
                        image: element.sub_image,
                        index: i + 1,
                        show: false
                    })
                });
                let tempRatingCount = prev.ratingCount;
                data.comment.forEach(comment => {
                    tempRatingCount[comment.rating]++;
                })
                return ({ ...prev, loading: false, product: data.product, images: temp, fav: data.fav || false, comment: data.comment, ratingCount: tempRatingCount })

            });

        }
    }



    async function AddToCart() {
        setState(prev => ({ ...prev, loading: true }));
        const { data, error } = await AddToUserCart(id)
        if (error) {
            toast.error(error)
            setState(prev => ({ ...prev, loading: false }));
            return;
        }
        else {
            toast.success("เพิ่มเข้ารถเข็นสำเร็จแล้ว");
            setState(prev => ({ ...prev, loading: false }));

        }
    }
    async function handleBuyProduct() {
        setState(prev => ({ ...prev, loading: true }));
        const { data, error } = await AddToUserCart(id)
        if (error) {
            toast.error(error)
            setState(prev => ({ ...prev, loading: false }));
            return;
        }
        else {
            router.push("/user/shopping-cart", { scroll: false })
            setState(prev => ({ ...prev, loading: false }));
        }
    }


}
