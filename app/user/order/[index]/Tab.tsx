"use client";
import { UserOrderContextType, useUserOrder } from "./Context";

const tabClassName = "font-bold relative border-b-4 border-red-500 px-4 hover:border-red-400 hover:text-slate-800/75"

export default function Tab() {
    const { state, handleTab, SelectTab, t}:UserOrderContextType = useUserOrder?.()!;


    return (
    <>
        {CheckTab(state.index)}
        <div className="flex items-center mt-8">
                <ul className="flex flex-wrap gap-4 sm:gap-8 md:gap-16 text-xl text-slate-800">
                    
                    <button 
                    onClick={() => handleTab(0)}
                    className={state.index === 0 ? tabClassName : "hover:text-red-300 hover:border-red-300"}
                    >
                        <h6 className="md:block hidden">{t("userOrderList")}</h6>
                        <h6 className="block md:hidden">{t("userOrderListShort")}</h6>
                    </button>
                    <button 
                    onClick={() => handleTab(1)}
                    className={state.index === 1 ? tabClassName : "hover:text-red-300 hover:border-red-300"}
                    >
                        <h6 className="md:block hidden">{t("userFavProduct")}</h6>
                        <h6 className="block md:hidden">{t("userFavProductShort")}</h6>
                    </button>
                    <button 
                    onClick={() => handleTab(2)}
                    className={state.index === 2 ? tabClassName : "hover:text-red-300 hover:border-red-300"}
                    >
                        <h6 className="md:block hidden">{t("userHistoryOrder")}</h6>
                        <h6 className="block md:hidden">{t("userHistoryOrderShort")}</h6>
                    </button>
                </ul>
        </div>
        <hr className="my-8"/>

       <div className="md:w-[100%] w-full mx-auto">
       {SelectTab()}
       </div>
    </>
);

    function CheckTab(index : number){
        if (index === 0) {
            return(
                <h6 className="text-2xl font-bold">{t("userOrderList")}</h6>
            )
        }
        else if (index === 1) {
            return(
                <h6 className="text-2xl font-bold">{t("userFavProduct")}</h6>
            )
        }
        else if (index === 2) {
            return(
                <h6 className="text-2xl font-bold">{t("userHistoryOrder")}</h6>
            )
        }
    }

}