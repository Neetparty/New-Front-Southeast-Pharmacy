"use client"
import Image from "next/image";
import category from './category.png';
import { Icon } from "@iconify/react";
export default function CategoryBox() {


    const arr = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]

    return (
    <>  
        <div className="flex justify-between">

            <h6 className="text-center cursor-pointer mt-8 text-slate-600 text-2xl">หมวดหมู่</h6>
            <div className="flex gap-2 items-center hover:text-blue-400 text-center cursor-pointer mt-8 text-blue-500 text-lg">
                ดูทั้งหมด
                <Icon icon="formkit:arrowright" />
            </div>
        </div>
    
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8">
            {arr.map((item, i) => (
                <div 
                key={i}
                className="flex flex-col gap-4 w-full h-full items-center hover:shadow-lg transition-shadow border cursor-pointer"
                >
                <div className="p-8">
                    <h6 className="text-slate-600">ยาสามัญ</h6>
                </div>
            </div>
            ))}
        </div>

    </>
);
}

/* 
 <div className="flex justify-between">

            <h6 className="text-center cursor-pointer mt-8 text-slate-600 text-2xl">หมวดหมู่</h6>
            <div className="flex gap-2 items-center hover:text-blue-400 text-center cursor-pointer mt-8 text-blue-500 text-lg">
                ดูทั้งหมด
                <Icon icon="formkit:arrowright" />
            </div>
        </div>
    
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8">
            {arr.map((item, i) => (
                <div 
                key={i}
                className="flex flex-col gap-4 w-full h-full items-center hover:shadow-lg transition-shadow border cursor-pointer"
                 >
                <Image
                src={category}
                alt="category"
                className="w-full object-contain h-[80%] border-0"
                />
                <div className="h-[20%]">
                    <h6 className="text-slate-600">ยาสามัญ</h6>
                </div>
            </div>
            ))}
        </div>
*/