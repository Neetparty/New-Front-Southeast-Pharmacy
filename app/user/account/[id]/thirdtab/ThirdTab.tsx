"use client"
import { Icon } from '@iconify/react';
import { useEffect, useRef, useState } from 'react';
import ThirdTabAddAddress from './ThirdTab-add-address';
import type { Address, ThirdTab } from '../account';
import { DeleteAddress, GetAddress } from '../account-api';
import { toast } from 'react-toastify';
import { Circular } from '@/app/component/Loading/Circular';
import ThirdTabUpdateAddress from './ThirdTabUpdateAddress';
import { UserAccountContextType, useUserAccount } from '../Context';
import { useTranslation } from 'react-i18next';


export default function ThirdTab() {

    const { state: mainState, setState: setMainState, user }: UserAccountContextType = useUserAccount?.()!;
    const { t } = useTranslation();

    const [state, setState] = useState<ThirdTab>({
        open: false,
        index: -1,
    })

    useEffect(() => {
        if (user.user_id.length > 2 && mainState.index === 2) {
            LoadAddress()
        }
    }, [])

    const addressRef = useRef<Address[]>(new Array());


    return (
        <>

            {!state.open ?
                <div className="flex flex-col  gap-10">
                    <div className="flex gap-2 flex-col">
                        {addressRef.current && addressRef.current.map((item, i) => (
                            <div
                                key={i}
                                className="flex flex-col items-center py-4 px-1 md:px-8  bg-white border border-gray-200 rounded-lg shadow sm:flex-row gap-4 md:gap-10 ">

                                <div className="flex flex-col">
                                    <Icon icon="zondicons:location" className='text-red-600 h-20 w-20' />
                                </div>

                                <div className="flex flex-col justify-between p-4 leading-normal w-full items-center md:items-start">
                                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">{item.location_name}</h5>

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
                                        <p className="mb-3 font-normal text-gray-700">{item.sub_district} {item.district} {item.province} {item.postal_code}</p>
                                    </div>

                                </div>
                                <div className='flex justify-end items-center'>
                                    <div className="flex items-start  w-full">
                                        <Icon
                                            icon="material-symbols:delete-outline"
                                            className='text-red-600 justify-end mr-2 w-5 h-5 cursor-pointer '
                                            onClick={() => handleDeleteAddress(item.address_id)}
                                        />
                                        <Icon
                                            icon="material-symbols:edit"
                                            className='text-blue-600 justify-end mr-2 w-5 h-5 cursor-pointer '
                                            onClick={() => handleUpdateAddress(i)}
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}

                    </div>

                    {/* card ที่เพิ่มที่อยู่ */}
                    <div className="flex gap-2 flex-col" >
                        <button
                            onClick={() => setState(prev => ({ ...prev, open: true }))}
                            className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row  hover:bg-gray-100  h-14"
                        >
                            <div className="flex justify-between items-center p-4 leading-normal gap-2">
                                <Icon icon="mingcute:add-fill" className='text-green-300' />
                                <h1 className="font-normal text-gray-700 "> {t("addressAddaddress")} </h1>
                            </div>
                        </button>
                    </div >
                </div >
                :

                <>
                    {state.index === -1 ?
                        <ThirdTabAddAddress
                            setState={setState}
                            addressRef={addressRef}
                        />
                        :
                        <ThirdTabUpdateAddress
                            setState={setState}
                            state={state}
                            addressRef={addressRef}
                        />
                    }
                </>
            }

        </>
    );

    async function handleUpdateAddress(index: number) {
        setState(prev => ({ ...prev, index: index, open: true }))


    }

    async function handleDeleteAddress(addressId: string) {
        setMainState(prev => ({ ...prev, loading: true }));

        const { data, error } = await DeleteAddress(addressId);
        if (error) {
            toast.error(error);
            setMainState(prev => ({ ...prev, loading: false }));
        }
        else {
            toast.success("ลบที่อยู่สำเร็จแล้ว")
            addressRef.current = addressRef.current.filter((item) => item.address_id !== addressId)
            setMainState(prev => ({ ...prev, loading: false }));
        }
    }

    async function LoadAddress() {
        setMainState(prev => ({ ...prev, loading: true }));

        const { data, error } = await GetAddress();
        if (error || !data?.address) {
            toast.error(error);
            setMainState(prev => ({ ...prev, loading: false }));
        }
        else {
            //@ts-ignore
            addressRef.current = data?.address
            setMainState(prev => ({ ...prev, loading: false }));
            setState(prev => ({ ...prev, address: data?.address ? data?.address : [] }));

        }

    }

}