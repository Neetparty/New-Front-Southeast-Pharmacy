"use client"

import { PromotionState } from "./page";
import { TFunction } from "i18next";
import CardSpecial from "./CardSpecial";
export default function SpecialProduct({
    lang, handleLang, state, t
}:{
    lang:{lang:string},
    handleLang: (thai: string, english: string, china: string) => string
    state: PromotionState;
    t: TFunction<"translation", undefined>
}) {


    return (
    <>
      <div className="sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 md:gap-8 justify-items-center flex gap-2 flex-wrap px-4 py-2">
        
        {state.specialProduct.length !== 0 && lang.lang && state.specialProduct.map((item, key) => (

            <CardSpecial
            key={key}
            item={item}
            handleLang={handleLang}
            /> 

        ))}

    </div>
    </>
);
}