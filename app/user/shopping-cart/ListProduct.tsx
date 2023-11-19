"use client"
import CheckBox from "@/app/component/Input/CheckBox";
import { useEffect, useState } from "react";
import { ListProductState, Product } from "./Shopping-cart";
import Image from "next/image";
import { Icon } from "@iconify/react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { addOrder } from "@/app/GlobalRedux/Features/order/orderSlice";
import { OrderRedux } from "@/app/GlobalRedux/Features/Feature";
import { useRouter } from "next/navigation";
import { DeleteCartProduct, GetCart } from "./Shopping-api";
import { Circular } from "@/app/component/Loading/Circular";
import { useTranslation } from 'react-i18next';
import { selectLangData } from "@/app/GlobalRedux/Features/selector";

export default function ListProduct() {
    const { t, i18n } = useTranslation('translation');
    const dispatch = useDispatch();
    const router = useRouter();
    const [state, setState] = useState<ListProductState>({
        checkAll: false,
        product: [],
        totalPrice: 0,
        totalProduct: 0,
        loading: false
    })    
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

    useEffect(() => {
        CheckTotalProduct()
    }, [state.product, state.checkAll])
    
    useEffect(() => {
      loadCart();
    }, [])

    
    return (
    <>
     <form onSubmit={handleSubmit} className="grid grid-cols-3 gap-16 mt-8 " >
            <div className="col-span-3 lg:col-span-2 flex flex-col  gap-8">
                <div className="border shadow-lg rounded-lg p-4">
                    <div className="flex gap-4 items-center">
                    <CheckBox
                    onChange={onChangeCheckAll}
                    checked={state.checkAll}
                    />
                    <h6> {t("shopingcartChooseAll")} </h6>
                    </div>
                </div>
               {state.product.length !== 0 && state.product.map((item, i) => (
                 <div 
                 key={i}
                 className="flex items-center flex-col md:flex-row gap-4 border shadow-lg rounded-lg p-4 text-slate-800 relative">

                    <div className="absolute top-4 right-4">
                        <Icon
                        className="w-6 h-6 text-red-500 hover:text-red-500/80 cursor-pointer"
                        icon={"mdi:bin"}
                        onClick={() => handleDeleteItem(item.product_id)}
                        />
                    </div>

                    <div className="flex gap-2 items-center flex-col md:flex-row">
                        <CheckBox
                        checked={item.check}
                        onChange={() => handleChangeCheckBoxItem(item.product_id)}
                        />
                        <div className="relative w-[8rem] h-[8rem]">
                            <Image
                            alt={item.product_name}
                            className="object-contain"
                            src={item.image}
                            fill
                            />
                        </div>
                    </div>
                    
                    <div className="flex flex-col gap-2  md:max-w-[80%]">
                        <h6 className="text-lg font-semibold">{handleLang(item.product_name, item.product_name_en, item.product_name_cn)}</h6>
                        <h6 className="text-base line-clamp-2 w-full">{handleLang(item.description, item.description_en, item.description_cn)}</h6>
                        <hr/>
                        <h6 className="text-base"> {t("shopingcartRemaining1")}: {item.quantity} {t("shopingcartPiece1")}</h6>
                        {item.promotion_status ? 
                            <div className={"flex gap-2 font-medium text-slate-600 justify-start "}>
                                <h6 className=" text-slate-600"> {t( "shopingcartPrice1")} </h6>
                                <h6 className=" line-through text-red-400  ">{item.price}</h6>
                                <h6 className=" text-slate-600">{item.promotion_price}</h6>
                            </div>
                            :
                            <span className={" font-medium  text-slate-600 "}>
                                {t( "shopingcartPrice2")} : {item.price}
                            </span>
                            }
                        <div className="flex text-white md:justify-start justify-center">
                            <button 
                            onClick={() => plusTotalProduct(item.product_id)}
                            className="bg-red-400 p-1 px-2"
                            type="button"
                            >
                                <Icon
                                icon={"material-symbols:add"}
                                />
                            </button>

                            <input 
                            type="number"
                            value={item.totalProduct}
                            onChange={(e:React.ChangeEvent<HTMLInputElement>) => handleInputProduct(e, item.product_id)}
                            className="text-slate-800 border-b border-t  shadow-lg p-1 px-2 w-fit max-w-[2.5rem] text-center outline-none focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"/>
                            
                            <button 
                            className="bg-red-400 p-1 px-2"
                            type="button"
                            onClick={() => minusTotalProduct(item.product_id)}
                            >
                                <Icon
                                icon={"ic:baseline-minus"}
                                />
                            </button>
                        </div>
                    </div>
                 </div>
               ))}
            </div>

            <div className="col-span-3 lg:col-span-1 h-fit border shadow-lg rounded-lg p-4 ">
                <div className="flex flex-col gap-4 text-slate-700">
                    <h6 className="text-xl font-semibold"> {t( "shopingcartSummary")} </h6>
                    <div className="flex justify-between">
                        <h6 className="text-md"> {t("shopingcartQuantity")} </h6>
                        <h6 className="text-md">{state.totalProduct} {t( "shopingcartPiece2")} </h6>
                    </div>
                   
                    <hr/>
                    <div className="flex justify-between font-semibold">
                        <h6 className="text-md ">  {t("shopingcartTotal")} </h6>
                        <h6 className="text-md">฿ {state.totalPrice}</h6>
                    </div>
                    <button
                        type="submit"
                        className="px-2 p-3 text-white bg-red-500 rounded-md hover:bg-red-400 disabled:bg-slate-500 disabled:text-slate-200 disabled:disabled:cursor-not-allowed w-full"
                        disabled={!state.totalPrice || !state.totalProduct}
                        >
                        <h6 className="font-semibold">{t("shopingcartContinue")} </h6>
                        </button>
                </div>
            </div>
        </form>
        <Circular
        loading={state.loading}
        />
    </>
);

async function handleDeleteItem(productId:string){
    setState(prev => ({...prev, loading:true}));
    const {data, error} = await DeleteCartProduct(productId);
    if(error){
        toast.error("มีบางอย่างผิดพลาดกับการนำสินค้าออกจากตะกร้า");
        setState(prev => ({...prev, loading:false}));
        return;
    }
    else {
        toast.success("นำสินค้าออกจากตะกร้าเรียบร้อยแล้ว");
        setState(prev => ({...prev, loading:false, product:prev.product.filter((item) => (item.product_id !== productId))}));
    }
}

async function loadCart(){
    setState(prev => ({...prev, loading:true}));
    const {data, error} = await GetCart();
    if(error || typeof(data?.cart.product) === "undefined"){
        toast.error(error);
        setState(prev => ({...prev, loading:false}));
        return;
    }
    else {
        
        setState(prev => ({...prev, loading: false, product:data?.cart.product}))
    }
}

function handleSubmit(e:React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const {product, totalPrice, totalProduct} = state;
    let tempProduct = product
    let orderRedux:OrderRedux = {
            product:[],
            totalPrice: totalPrice,
            totalProduct: totalProduct
        };

    for (let i = 0; i < tempProduct.length; i++) {
        if(tempProduct[i].check){
            orderRedux.product.push(tempProduct[i])
        }
    }

    dispatch(addOrder(orderRedux))
    // router.push(`/user/payment`, { scroll: false })
    router.replace('/user/payment', undefined)

}

function CheckTotalProduct() {
    const {product} = state;
    let totalProduct = 0;
    let totalPrice = 0;
    for (let i = 0; i < product.length; i++) {
        if(product[i].check){
            totalProduct += product[i].totalProduct;
            if(product[i].promotion_status){
                totalPrice += product[i].totalProduct * product[i].promotion_price
            }
            else {
                totalPrice += product[i].totalProduct * product[i].price
            }
        }
    }
    setState(prev => ({...prev, totalPrice: totalPrice, totalProduct: totalProduct}))
}
function handleInputProduct(e:React.ChangeEvent<HTMLInputElement>, productId:string){
    setState(prev => {
        let tempProduct = [...prev.product];

        for (let i = 0; i < tempProduct.length; i++) {
            if(tempProduct[i].product_id === productId){
                if(Number(e.target.value) > tempProduct[i].quantity){
                    toast.error("ดูเหมือนว่าสินค้าของเราจะมีไม่เพียงพอความต้องการของคุณ");
                    return {...prev}
                }
                else if(Number(e.target.value) < 1){
                    toast.error("ดูเหมือนคุณกำลังพยายามทำให้สินค้าน้อยกว่า 0 ซึ่งเป็นไปไม่ได้");
                    return {...prev}
                }
                else {
                    tempProduct[i].totalProduct = Number(e.target.value)
                }
            }            
        }
        return {...prev, product:tempProduct}
    })
}

function plusTotalProduct(productId:string){
    setState(prev => {
        let temp: number = 0;
        let tempProduct = [...prev.product]
        for (let i = 0; i < tempProduct.length; i++) {
            if(tempProduct[i].product_id === productId){
                temp = tempProduct[i].totalProduct + 1;
                if(temp > tempProduct[i].quantity-1){
                    toast.error("ดูเหมือนว่าสินค้าของเราจะมีไม่เพียงพอความต้องการของคุณ");
                }
                else {
                    tempProduct[i].totalProduct += 1;
                    break;
                }
            }            
        }
        return {...prev, product:tempProduct}
    })    
}
function minusTotalProduct(productId:string){
    setState(prev => {
        let temp: number = 0;
        let tempProduct = [...prev.product]

        for (let i = 0; i < tempProduct.length; i++) {
            if(tempProduct[i].product_id === productId){
                temp = tempProduct[i].totalProduct - 1;
                if(temp < 1){
                    toast.error("ดูเหมือนคุณกำลังพยายามทำให้สินค้าน้อยกว่า 0 ซึ่งเป็นไปไม่ได้");
                    return {...prev}
                }
                else {
                    tempProduct[i].totalProduct -= 1;
                    break;
                }
            }            
        }
        return {...prev, product:tempProduct}
    })    
}

function handleChangeCheckBoxItem(productId: string) {
    setState(prev => {
        let tempProduct = [...prev.product]
        for (let i = 0; i < tempProduct.length; i++) {
            if(tempProduct[i].product_id === productId){
                tempProduct[i].check = !tempProduct[i].check
                break;
            }            
        }
        
        return {...prev, product:tempProduct}
        
    })    
}

function onChangeCheckAll() {
    setState(prev => {
        let tempProduct = [...prev.product];
        tempProduct.forEach(elem => {
            elem.check = !prev.checkAll
        });
        return {...prev, checkAll:!prev.checkAll, product:tempProduct}
    })
}
}