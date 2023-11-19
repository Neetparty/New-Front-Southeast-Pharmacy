"use client"

import Address from "./Address";
import ListProduct from "./ListProduct";
import Vendor from "./Vendor";
import PaymentMethod from "./PaymentMethod";
import { Circular } from "@/app/component/Loading/Circular";
import Note from "./Note";
import { UserPaymentContextType, useUserPayment } from "./Context";
import { Icon } from "@iconify/react";
import { Dialog } from "@/app/component/Dialog/Dialog";
import { useTranslation } from "react-i18next";


export default function Form() {

    const {state, setState, product, handleReloadAddress, handleSelectedAddress}:UserPaymentContextType = useUserPayment?.()!;
    const { t } = useTranslation('translation');

    function onCloseDialog() {
        setState(prev => ({...prev, open:!prev.open}))
    }

    return (
    <div className="flex flex-col gap-8">
        {state.selectAddress?.latitude ? 
        <Address
        state={state}
        setState={setState}
        />
        :

        <div className="flex flex-col gap-4 border p-4 rounded shadow">
            <div className="flex gap-2 justify-between">
                <div className="flex gap-2">
                    <Icon
                    icon={"tabler:location"}
                    className="w-8 h-8 text-red-500"
                    />
                    <h6 className="text-2xl">{t("accountAddress")}</h6>
                </div>
                <div className="float-right">
                    <Icon
                    icon={"mdi:reload"}
                    className="w-8 h-8 float-right cursor-pointer hover:text-slate-500"
                    onClick={handleReloadAddress}
                    />
                </div>
            </div>
            <hr className="my-2" />
            <h6>{t("paymentNotSelectedAddress")}</h6>
            <div className="flex gap-2">
                <button
                onClick={() => setState(prev => ({...prev, open:true}))}
                    className="px-4 py-2 rounded-md w-max bg-red-500 hover:bg-red-400 text-white"
                    >
                    {t("selectAddress")}
                </button>
                <button
                    className="px-4 py-2 rounded-md w-max border border-red-500 text-red-500 hover:border-red-400 hover:text-red-400 "
                    >
                    <a 
                        className=""
                        href={`/user/account/2`}
                        target="_blank" 
                        rel="noopener noreferrer"
                        >
                        {t("addAddress")}
                    </a>
                </button>
            </div>
        </div>
        }




        <ListProduct
        product={product}
        />
        <Note
        state={state}
        setState={setState}
        />
        
        {state.selectAddress?.latitude && 
        <Vendor
        state={state}
        setState={setState}
        />
        }

        <PaymentMethod
        />

        <Circular
        loading={state.loading}
        />
        
        {/* Dialog Address Here */}
        <Dialog
            open={state.open}
            onClose={onCloseDialog}
            header={t("paymentChooseAddress")}
            className="w-11/12 lg:w-3/6"
            >
                {state.address.length === 0 ? 
                <h6 className="text-slate-700 text-lg font-semibold">{t("paymentNoSelectedAddress")}</h6>
                :
                <div className="flex flex-col gap-4 max-h-[50vh] overflow-y-scroll">
                    <div className="float-right">
                        <Icon
                        icon={"mdi:reload"}
                        className="w-8 h-8 float-right cursor-pointer hover:text-slate-500"
                        onClick={handleReloadAddress}
                        />
                    </div>
                    {state.address.map((item, i) => (
                        <div 
                        onClick={() => handleSelectedAddress(i)}
                        className={`${state.selectAddress!.address_id === item.address_id && "border-red-500"} flex flex-col md:flex-row items-center cursor-pointer hover:bg-slate-50 hover:shadow-md  bg-white border border-gray-200 rounded-lg shadow sm:flex-row gap-4 md:gap-10 `} key={i}>

                        <div className="flex flex-col justify-between p-4 leading-normal w-full items-start">
                            <h5 className="mb-2 text-lg font-bold tracking-tight text-gray-900">{item.location_name}</h5>

                            <div className='flex gap-1'>
                                <Icon icon="ph:user" className='mt-1' />
                                <p className="mb-3 font-normal text-gray-700">{item.first_name} {item.last_name}</p>
                            </div>
                            <div className='flex gap-1'>
                                <Icon icon="mdi:telephone" className='mt-1' />
                                <p className="mb-3 font-normal text-gray-700">{item.telephone}</p>
                            </div>
                            <div className='flex gap-1'>
                                <Icon icon="tabler:location" className='mt-1' />
                                <p className="mb-3 font-normal text-gray-700">{`${item.address_desc} ${item.sub_district} ${item.district} ${item.province} ${item.postal_code} `}</p>
                            </div>

                        </div>
                    
                    </div>
                    ))}
                 </div>
                }
                 <div className="flex gap-4 mt-4">
                    <a 
                        className="font-semibold px-2 p-3 text-white bg-red-500 rounded-md w-fit hover:bg-red-400 disabled:bg-slate-500 disabled:text-slate-200 disabled:cursor-not-allowed"
                        href={`/user/account/2`}
                        target="_blank" 
                        rel="noopener noreferrer"
                        >
                        {t("addAddress")}
                    </a>
                 </div>
            </Dialog>
    </div>
);



}