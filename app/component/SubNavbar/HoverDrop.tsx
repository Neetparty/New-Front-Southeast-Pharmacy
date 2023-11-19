"use client"
import { Icon } from "@iconify/react";
import Link from "next/link";

export default function HoverDrop() {


    return (
    <>
    <div className="">
            <div className="group inline-block relative">
                <div className="text-slate-500 hover:text-blue-500 cursor-pointer font-medium py-1 px-4 rounded inline-flex items-center">
                    <span className="mr-1">สินค้าตามกลุ่มผู้ใช้</span>
                    <Icon icon="ep:arrow-down" />
                </div>

                <ul className="absolute hidden bg-white shadow-lg border text-gray-700 group-hover:block w-full">
                    <li className="hover:bg-slate-100 border-b-[1px]">
                        <Link 
                        href="#"
                        className="rounded-t py-2 px-4 block whitespace-no-wrap" 
                        >
                            One
                        </Link>
                    </li>
                    <li className="hover:bg-slate-100 border-b-[1px]">
                        <Link 
                        href="#"
                        className="rounded-t py-2 px-4 block whitespace-no-wrap" 
                        >
                            One
                        </Link>
                    </li>
                    <li className="hover:bg-slate-100 border-b-[1px] group/sub relative">
                        <Link 
                        href="#"
                        className="rounded-t py-2 px-4 block whitespace-no-wrap" 
                        >
                            special
                        </Link>
                        <ul className="absolute hidden bg-white shadow-md text-gray-700 group-hover/sub:block w-full top-0 h-full left-full">
                            <li className="hover:bg-slate-100 border-b-[1px]">
                                <Link 
                                href="#"
                                className="rounded-t py-2 px-4 block whitespace-no-wrap" 
                                >
                                    One
                                </Link>
                            </li>
                            <li className="hover:bg-slate-100 bg-white border-b-[1px]">
                                <Link 
                                href="#"
                                className="rounded-t py-2 px-4 block whitespace-no-wrap" 
                                >
                                    One
                                </Link>
                            </li>
                            
                        </ul>
                    </li>
                 
                </ul>
                </div>

        </div>
    </>
);
}