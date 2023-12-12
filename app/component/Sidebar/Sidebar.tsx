"use client"
// import Logo from "../../../public/phamacy.png"
import { Icon } from "@iconify/react";
import Link from "next/link";
import { useState } from "react";
import { InSidebar } from "./InSideBar";
import Image from "next/image";
import Logo from "@/app/component/Navbar/logo-blue-big-crop.png"
import { InSidebarMobile } from "./InSideBarMobile";

export default function Sidebar() {

    const [openDrawer, setOpenDrawer] = useState<boolean>(false);

    const handleDrawer = () => {
        setOpenDrawer(prev => !prev);
    }
    return (
    <>
    

            {/* Side Bar More than 768 px  */}
            <div className="hidden lg:flex flex-col font-semibold bg-[#303f59] overflow-y-auto text-slate-700 min-h-screen h-full w-56 sticky top-0 z-40">
                <div className="z-50 fixed top-0 w-56">
                    <Link href="/" className="py-4 text-center">
                        <Image
                            src={Logo}
                            alt="pharmacy-logo"
                            className="w-40 h-16 mx-auto object-contain"
                        />
                    </Link>
                    <InSidebar />
                </div>

            </div>


            <div className="dark:text-white text-slate-800 bg-slate-800 w-full h-[6vh] lg:hidden flex items-center justify-between px-4 lg:px-64  z-50">
                <Link href="/admin/dashboard" className="">SouthEast Pharmarcy</Link>
                <div className="flex items-center">
                    <Icon
                        icon="iconamoon:menu-burger-horizontal"
                        className="h-6 w-6 text-white cursor-pointer hover:text-slate-200 "
                        onClick={handleDrawer}
                    />

                </div>
            </div>

            <div className={`flex flex-col font-semibold bg-white dark:bg-slate-700 overflow-y-auto py-2 px-4 text-slate-700 min-h-screen h-full absolute transition-all ${openDrawer ? "top-0 left-0" : " top-0 -left-full"} w-full z-50`}>
                <div className="flex justify-between py-4 text-center">
                    <h6 className="text-slate-50">SouthEast Pharmarcy</h6>
                    <Icon
                        icon="material-symbols:close"
                        className="h-6 w-6  cursor-pointer text-white hover:text-gray-100"
                        onClick={handleDrawer}
                    />

                </div>
                <InSidebarMobile />
            </div>
                
                
   
      
    </>
);
}