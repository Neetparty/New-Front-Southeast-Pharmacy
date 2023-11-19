"use client"
import { Icon } from "@iconify/react";
import { PaymentState } from "./Payment";
import { Dispatch, SetStateAction } from "react";
import { useTranslation } from 'react-i18next';
export default function Address({state, setState}: {
    state:PaymentState,
    setState:Dispatch<SetStateAction<PaymentState>>,
}) {


    // const {handleSelectedAddress, handleReloadAddress}:UserPaymentContextType = useUserPayment?.()!;


    function onCloseDialog() {
        setState(prev => ({...prev, open:!prev.open}))
    }

    const { t } = useTranslation('translation');


    return (
    <>
             <div className="flex gap-2 flex-col bg-white border border-gray-200 rounded-lg shadow p-4 ">
                
                <div className="flex gap-2">
                    <Icon
                    icon={"tabler:location"}
                    className="w-8 h-8 text-red-500"
                    />
                    <h6 className="text-2xl">{t("accountAddress")}</h6>
                </div>
                    <hr className="my-2" />

                     <div className="flex flex-col md:flex-row items-center  sm:flex-row gap-4 md:gap-10 ">
                    
                     <div className="flex flex-col ">
                         <Icon icon="zondicons:location" className='text-red-600 h-20 w-20' />
                     </div>

                     <div className="flex flex-col justify-between p-4 leading-normal w-full md:items-start">
                         <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">{state.selectAddress!.location_name}</h5>

                         <div className='flex gap-1'>
                             <Icon icon="ph:user" className='mt-1' />
                             <p className="mb-3 font-normal text-gray-700">{state.selectAddress!.first_name} {state.selectAddress!.last_name}</p>
                         </div>
                         <div className='flex gap-1'>
                             <Icon icon="mdi:telephone" className='mt-1' />
                             <p className="mb-3 font-normal text-gray-700">{state.selectAddress!.telephone}</p>
                         </div>
                         <div className='flex gap-1'>
                             <Icon icon="tabler:location" className='mt-1' />
                             <p className="mb-3 font-normal text-gray-700">{`${state.selectAddress!.address_desc} ${state.selectAddress!.sub_district} ${state.selectAddress!.district} ${state.selectAddress!.province} ${state.selectAddress!.postal_code} `}</p>
                         </div>

                     </div>

                     <div className='flex justify-end items-center w-max'>
                     <button
                        onClick={onCloseDialog}
                        className="px-2 p-3 text-white bg-red-500 rounded-md w-max hover:bg-red-400 disabled:bg-slate-500 disabled:text-slate-200 disabled:cursor-not-allowed"
                        >
                        <h6 className="font-semibold"> {t("paymentChangeAddress")} </h6>
                    </button>
                     </div>
                 </div>
            
          

             </div>
    </>
);

}