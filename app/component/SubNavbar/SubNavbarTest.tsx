"use client"

import { Icon } from "@iconify/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import HoverDrop from "./HoverDrop";
import { makeRequest } from "@/app/hook/makeRequest";
import { toast } from "react-toastify";



  
export default function SubNavbar() {

    const [state, setState] = useState({
        category:[
            {
                category_name:"วัยทำงาน",
                category_id:"pdkopwke1-j2j",
            },
            {
                category_name:"วัยเด็ก",
                category_id:"pdkopwke1-j2j",
            },
            {
                category_name:"วัยชรา",
                category_id:"pdkopwke1-j2j",
            },
        ],
        otherCategory:[
            {
                category_name:"วัยทำงาน",
                category_id:"pdkopwke1-j2j",
            },
            {
                category_name:"วัยเด็ก",
                category_id:"pdkopwke1-j2j",
            },
            {
                category_name:"วัยชรา",
                category_id:"pdkopwke1-j2j",
            },
            {
                category_name:"วัยทำงาน",
                category_id:"pdkopwke1-j2j",
            },
            {
                category_name:"วัยเด็ก",
                category_id:"pdkopwke1-j2j",
            },
            {
                category_name:"วัยชรา",
                category_id:"pdkopwke1-j2j",
            },
            
            {
                category_name:"วัยเด็ก",
                category_id:"pdkopwke1-j2j",
            },
            {
                category_name:"วัยชรา",
                category_id:"pdkopwke1-j2j",
            },
            {
                category_name:"วัยทำงาน",
                category_id:"pdkopwke1-j2j",
            },
            {
                category_name:"วัยเด็ก",
                category_id:"pdkopwke1-j2j",
            },
            {
                category_name:"วัยชรา",
                category_id:"pdkopwke1-j2j",
            },
            
        ]
    })



    return (
    <>

     <div className="hidden text-slate-500 lg:gap-20 md:gap-8 md:flex justify-around items-center h-[7vh] bg-white w-full z-10 shadow-md mt-[7vh] border-b">
        {/* หมวดหมู่สินค้า */}
        <div className="group relative h-full items-center flex">
            <div className=" ">
                <button className=" hover:text-blue-500 group-hover:text-blue-500 font-medium py-1 px-12 rounded inline-flex items-center">
                    <span className="mr-1 ">หมวดหมู่สินค้า</span>
                        <Icon
                        icon={"ep:arrow-down"}
                        />
                    </button>
                    {/* Here */}
                <ul className="hidden border absolute left-0 top-full bottom-0 align-bottom text-gray-700 group-hover:block z-10 w-full">
                    {state.category.length !== 0 && 
                    state.category.map((item, i) => (
                        <li key={i}>
                            <Link
                            href={"/"}
                            className=" bg-white hover:bg-slate-50 py-2 px-4 block whitespace-no-wrap"
                            >
                            {item.category_name}
                            </Link>
                        </li>
                    ))
                    }
                     <li>
                        <div
                        className="group/sub relative  bg-white hover:bg-slate-50 py-2 px-4 block whitespace-no-wrap cursor-pointer"
                        >
                            <h6>อื่นๆ</h6>
                            {/* Here */}
                            <ul className={`absolute hidden  text-gray-700 group-hover/sub:grid grid-cols-2 w-[200%] -top-[${String(state.category.length)}00%] align-top h-[${state.otherCategory.length + 1}00%] left-full `}>
                               {state.otherCategory.length !== 0 && state.otherCategory.map((item, i) => (
                                 <li className="group-hover/sub:border-l-2 " key={i}>
                                 <Link 
                                 href="#"
                                 className=" bg-white hover:bg-slate-50 py-2 px-8 block whitespace-no-wrap" 
                                 >
                                    {item.category_name}
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
                    <span className="mr-1">สินค้าโปรโมชั่น</span>
                </Link>
            </div>
        </div>
        
        {/* งานบริการลูกค้า */}
        <div className="">
            <div className="group inline-block">
                <button className="text-[#797979] hover:text-[#0E5797] font-medium py-1 px-4 rounded inline-flex items-center" type="button">
                    <span className="mr-1">งานบริการลูกค้า</span>
                </button>
            </div>
        </div>

        {/* เกี่ยวกับเรา */}
        <div className="">
            <div className="group inline-block">
                <Link 
                className="text-[#797979] hover:text-[#0E5797] font-medium py-1 px-4 rounded inline-flex items-center"
                href={"/user/aboutUs"}
                >
                    <span className="mr-1">เกี่ยวกับเรา</span>
                </Link>
            </div>
        </div>

    </div>
    {/* <div className="h-[7vh]"></div> */}
    </>
);
}