"use client"
import { useEffect } from "react";
import { Circular } from "@/app/component/Loading/Circular";
import { Icon } from "@iconify/react";
import Image from "next/image";
import InputRef from "@/app/component/Input/InputRef";
import { UserAccountContextType, useUserAccount } from "./Context";
import { useTranslation } from 'react-i18next';
export default function FirstTab() {

    const { t } = useTranslation('translation')
    const {firstTab, setFirstTab, user_name, last_name, first_name, onSubmitFirstTab, handleImageChange, state}:UserAccountContextType = useUserAccount?.()!;
  
    useEffect(() => {
        if (firstTab.images.length < 1) return;
        //@ts-ignore
        const newImageUrls = [];
        //@ts-ignore
        firstTab.images.forEach((image) => newImageUrls.push(URL.createObjectURL(image)));
        //@ts-ignore
        setFirstTab(prev=>({...prev,imageURLs:[newImageUrls[0]]}))
    }, [firstTab.images]);


    return (
       <>
        <form className="flex flex-col gap-8" onSubmit={onSubmitFirstTab}>
            
            <div className="relative w-fit mx-auto">
                <div className="">
                    <Image
                    alt="avatar"
                    src={firstTab.imageURLs[0]}
                    width={128}
                    height={128}
                    className="rounded-full h-[128px] w-[128px] max-h-[128px] max-w-[128px] object-contain"
                    />
                </div>
                <label 
                className="absolute top-0 right-0 cursor-pointer" 
                htmlFor="avatar-image">
                    <div 
                    className="w-fit bg-red-500 hover:bg-red-400 p-1 rounded-full text-white"
                    
                    >
                        <Icon
                        icon={"ic:baseline-plus"}
                        className="w-6 h-6 "
                        />
                    </div>
                </label>
                <input
                accept="image/*"
                onChange={handleImageChange} 
                className="hidden"
                id="avatar-image" 
                type="file"

                />
            </div>
            
            <div className="flex gap-2 flex-col">
                <h6> {t("accountUsername")}</h6>
                <InputRef
                    ref={user_name}
                    placeholder= {t("accountUsername")}
                    type="text"
                />
            </div>
            <div className="flex gap-2 flex-col">
                <h6> {t("accountFirstname")} </h6>
                <InputRef
                    ref={first_name}
                    placeholder= {t("accountFirstname")}
                    type="text"
                />
            </div>
            <div className="flex gap-2 flex-col">
                <h6> {t("accountLastname")} </h6>
                <InputRef
                    ref={last_name}
                    placeholder= {t("accountLastname")}
                    type="text"
                />
            </div>
            <div className="flex justify-end">
                <button
                    type="submit"
                    className="px-2 p-3 text-white bg-red-500 rounded-md w-fit hover:bg-red-400 disabled:bg-slate-500 disabled:text-slate-200 disabled:disabled:cursor-not-allowed"
                    disabled={!first_name.current?.value || !last_name.current?.value || !user_name.current?.value}
                >
                    <h6 className="font-semibold"> {t("accountConfirm")} </h6>
                </button>
            </div>
        </form>

        <Circular
        loading={state.loading}
        />
       </>
);


}