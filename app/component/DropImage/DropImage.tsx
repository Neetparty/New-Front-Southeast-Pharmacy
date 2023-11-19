"use client"

import { Icon } from "@iconify/react";

type DropImage = {
    handleImageChange:(e: React.ChangeEvent<HTMLInputElement>) => void;
    multiple:boolean;
    title:string;
    id:string;
}

export default function DropImage({handleImageChange, multiple, title, id}: DropImage) {


    return (
    <>  
     <div>
        <h6>{title}</h6>

        <div
        className="flex items-center justify-center w-full"
        >
            <label
                className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50  hover:bg-gray-100 "
                htmlFor={id}
            >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Icon  
                    icon="material-symbols:upload"
                    className="w-10 h-10 mb-3 text-gray-400"
                    />
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-semibold">คลิกเพื่ออัพโหลดรูปภาพ</span>
                    </p>
                </div>
                <input
                    id={id}
                    type="file"
                    className="hidden"
                    multiple={multiple}
                    accept="image/*"
                    onChange={handleImageChange}
                />
            </label>
        </div>
    </div>
    </>
);
}