"use client";

import FirstTab from "./FirstTab";
import SecondTab from "./SecondTab";
import ForthTab from "./forthtab/ForthTab";
import { UserAccountContextType, useUserAccount } from "./Context";
import ThirdTab from "./thirdtab/ThirdTab";
import { useRouter } from "next/navigation";
import { useTranslation } from 'react-i18next';
import { useSelector } from "react-redux";
import { selectUserData } from "@/app/GlobalRedux/Features/selector";

const tabClassName = "font-bold relative border-b-4 border-red-500 px-4 hover:border-red-400 hover:text-slate-800/75"

export default function Tab() {

    const {state, setState}:UserAccountContextType = useUserAccount?.()!;
    const { t } = useTranslation('translation')
    const router = useRouter();
    const user = useSelector(selectUserData)

    function handleTab(index:number){
        router.push(`/user/account/${index}`)
        setState(prev => ({...prev, index:index}))
    }


    return (
    <>


      <div className="flex items-center mt-8">
                <div className="flex flex-wrap gap-4 sm:gap-8 md:gap-16 text-xl text-slate-800">
                    
                    <button 
                    onClick={() => handleTab(0)}
                    className={state.index === 0 ? tabClassName : "hover:text-red-300 hover:border-red-300"}
                    >
                        <h6 className="md:block hidden"> {t("accountInfo1")} </h6>
                        <h6 className="block md:hidden"> {t("accountInfo2")} </h6>
                    </button>
                    <button 
                    onClick={() => handleTab(1)}
                    className={state.index === 1 ? tabClassName : "hover:text-red-300 hover:border-red-300"}
                    >
                        <h6 className="md:block hidden"> {t("accountUser1")}  </h6>
                        <h6 className="block md:hidden"> {t("accountUser2")} </h6>
                    </button>
                    <button 
                    onClick={() => handleTab(2)}
                    className={state.index === 2 ? tabClassName : "hover:text-red-300 hover:border-red-300"}
                    >
                        <h6> {t("accountAddress")} </h6>
                    </button>
                   
                    <button 
                    onClick={() => handleTab(3)}
                    className={state.index === 3 ? tabClassName : "hover:text-red-300 hover:border-red-300"}
                    >
                        <h6 className="md:block hidden"> {t("accountNoti1")} </h6>
                        <h6 className="block md:hidden"> {t("accountNoti2")}  </h6>
                    </button>
                </div>
        </div>

        <hr className="my-8"/>
        {/* {SelectTab()} */}
        <div className={`${state.index === 0 ? "block" : "hidden max-h-0"}`}>
            <FirstTab/>
        </div>
        <div className={`${state.index === 1 ? "block" : "hidden max-h-0"}`}>
            <SecondTab/>
        </div>
        <div className={`${state.index === 2 ? "block" : "hidden max-h-0"}`}>
            <ThirdTab/>
        </div>
        <div className={`${state.index === 3 ? "block" : "hidden max-h-0"}`}>
            <ForthTab/>
        </div>
      
    </>
);
}