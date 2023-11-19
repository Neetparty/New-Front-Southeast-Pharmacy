"use client";

import { Icon } from "@iconify/react";
import Link from "next/link";
import React, { useState } from "react";

export type DropSidebarType = {
    link:string;
    text:string;
    icon:string
}

export default function DropSidebar({link="", icon="", text="", arr=[]}:{link:string, icon:string, text:string, arr:DropSidebarType[]}) {

    const [open, setOpen] = useState(false)    

    return (
    <>
      <div className={`group/drop flex flex-col h-fit `} >
        <div className="grid gap-8">
            <div onClick={() => setOpen((prev) => !prev)} className={`px-2 flex justify-between gap-2 items-center  hover:text-blue-400  cursor-pointer ${open ? "text-blue-400" : "text-slate-200"}`}>
                <div className="flex gap-2 items-center group-hover/drop:text-blue-400">
                    <Icon icon={icon} className="h-6 w-6 " />
                    <h6 className="text-sm ">{text}</h6>
                </div>
                <div className="group-hover/drop:hidden block">
                    <Icon icon="iconamoon:arrow-up-2" className="h-6 w-6 group-hover/drop:text-blue-400" />
                </div>
                <div className="group-hover/drop:block hidden">
                    <Icon icon="iconamoon:arrow-down-2" className="h-6 w-6 group-hover/drop:text-blue-400" />
                </div>
            </div>
        </div>
    
        <div className={`${open ? "block" : "hidden"}  bg-slate-700 mt-2`}>
           {arr.map((item,i) => (
            <div className="border-l-2" key={i}>
                <Link href={item.link} className="pl-2 flex gap-2 py-3 items-center text-slate-200 hover:text-blue-400  cursor-pointer">
                <Icon icon={item.icon} className="h-6 w-6 " />
                <h6 className="text-sm">{item.text}</h6>
            </Link>
            {/* <hr className="border-slate-500"/> */}
            </div>
           ))}
        </div>
    </div>
    </>
);
}