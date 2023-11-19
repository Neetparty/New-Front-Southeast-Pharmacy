"use client"
import { Icon } from "@iconify/react";

export default function loadng() {


    return (
        <div className="animate-pulse">
            <div className="h-[7vh] bg-gray-300 w-full z-10 fixed top-0 ">
            </div>
            <div className="h-[7vh] bg-gray-300 w-full z-10 mt-[7vh] ">
            </div>

            <div className="w-full flex justify-center items-center mx-auto md:max-w-[75vw] bg-gray-400  min-h-[50vh]">
                <Icon
                    icon={"material-symbols:image-outline"}
                    className="text-white w-16 h-16"
                />
            </div>

            <div className="mt-12 w-full md:max-w-[75vw] mx-auto bg-gray-300 h-[50vh]">

            </div>
        </div>
);
}