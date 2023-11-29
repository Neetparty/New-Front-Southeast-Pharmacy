"use client"

import { Icon } from "@iconify/react";
import Link from "next/link";
import { useSelector } from "react-redux";
import React from "react";
import { selectCategoryData, selectLangData } from "@/app/GlobalRedux/Features/selector";
import { useTranslation } from "react-i18next";

  
export default function SubNavbar() {
    const category = useSelector(selectCategoryData);
    
    const { t } = useTranslation('translation');

    const lang = useSelector(selectLangData)


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


    return (
    <>

     <div className="hidden text-slate-500 lg:gap-20 md:gap-8 md:flex justify-around items-center h-[7vh] bg-white w-full z-10 shadow-md mt-[7vh] border-b">
        {/* หมวดหมู่สินค้า */}
        <div className="group relative h-full items-center flex">
            <div className="">
                <button className=" hover:text-blue-500 group-hover:text-blue-500 font-medium py-1 px-12 rounded inline-flex items-center">
                    <span className="mr-1 "> {t("subnavCategory")} </span>
                        <Icon
                        icon={"ep:arrow-down"}
                        />
                </button>
                
                <ul className="hidden border absolute left-0 top-full bottom-0 align-bottom text-gray-700 group-hover:block z-10 w-full">
                    {category.length !== 0 && 
                    category.map((item, i) => (
                        <React.Fragment key={i}>
                        {item.category_name.includes("วัย") && 
                        <li>
                            <Link
                            href={`/user/search?cate=${item.category_id}`}
                            className=" bg-white hover:bg-slate-50 py-2 px-4 block whitespace-no-wrap"
                            >
                                {handleLang(item.category_name, item.category_name_en, item.category_name_ch)}
                            </Link>
                        </li>
                        }
                        </React.Fragment>
                    ))
                    }
                     <li>
                        <div
                        className="group/sub relative  bg-white hover:bg-slate-50 py-2 px-4 block whitespace-no-wrap cursor-pointer"
                        >
                            <h6> {t("subnavEtc")} </h6>
                            {/* Here */}
                            <ul className={`absolute hidden  text-gray-700 group-hover/sub:flex flex-col flex-wrap w-[100%]  -top-[300%] align-top min-h-[400%] max-h-[600%] left-full `}>
                               {category.length !== 0 && category.map((item, i) => (
                                 <li className="group-hover/sub:border-l-2 " key={i}>
                                 <Link 
                                 href={`/user/search?cate=${item.category_id}`}
                                 className=" bg-white hover:bg-slate-50 py-2 px-8 block whitespace-no-wrap" 
                                 >
                                    {handleLang(item.category_name, item.category_name_en, item.category_name_ch)}
                                 </Link>
                             </li>
                               ))}
                              
                                
                            </ul>
                        </div>
                    </li>
                </ul>
            </div>
        </div>


        {/* สินค้าโปรโมชั่น */}
        <div className="">
            <div className="group inline-block">
                <Link href={"/user/promotion"} className="text-[#797979] hover:text-[#0E5797] font-medium py-1 px-4 rounded inline-flex items-center">
                    <span className="mr-1 text-lg" > {t("subnavPromotion")} </span>
                </Link>
            </div>
        </div>
        
        {/* งานบริการลูกค้า */}
        <div className="">
            <div className="group inline-block">
                <Link 
                className="text-[#797979] hover:text-[#0E5797] font-medium py-1 px-4 rounded inline-flex items-center"
                href={"/user/service"}
                >
                    <span className="mr-1 text-lg">  {t("subnavCustomerService")} </span>
                </Link>
            </div>
        </div>

        {/* เกี่ยวกับเรา */}
        <div className="">
            <div className="group inline-block">
                <Link 
                className="text-[#797979] hover:text-[#0E5797] font-medium py-1 px-4 rounded inline-flex items-center"
                href={"/user/aboutUs"}
                >
                    <span className="mr-1 text-lg"> {t("subnavAboutus")} </span>
                </Link>
            </div>
        </div>

    </div>
    {/* <div className="h-[7vh]"></div> */}
    </>
);
}