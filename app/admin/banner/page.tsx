"use client"

import DropImage from "@/app/component/DropImage/DropImage";
import { BannerContextType, useBanner } from "./Context";
import { Icon } from "@iconify/react";

export default function Page() {

    const {handleImageChange, handleSubmit, handleRemoveImage, setState, state, handleRemoveExistBanner}:BannerContextType = useBanner?.()!;


    return (
        <div className="p-8">

        <h6 className="text-xl font-semibold mb-8">รูปภาพ Banner</h6>
        
        <form onSubmit={handleSubmit} className=" flex flex-col gap-8 text-slate-700">

            <div className="flex flex-col gap-2">
                <h6>ภาพ Banner ที่มีอยู่แล้ว</h6>

                <div className="flex flex-wrap gap-2">
                {state.currentImage.length !== 0 && state.currentImage.map((item, i) => (
                        <div key={i} className="relative w-[16rem] h-[12rem] max-w-[20rem] max-h-[16rem] mt-4">
                            <img src={item.image} className="w-full h-full rounded-lg " />
                            <div className="absolute top-0 right-0 z-50 text-red-500 cursor-pointer" onClick={() => handleRemoveExistBanner(item)}>
                                <Icon icon={"material-symbols:close"} className="h-6 w-6 text-red-500" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

                <DropImage
                handleImageChange={handleImageChange}
                id="upload image banner"
                title="รูปภาพ Banner โปรโมชั่น"
                multiple={true}
                />
                <div className="flex gap-4 flex-wrap">
                    {state.imageURLs.length !== 0 && state.imageURLs.map((item, i) => (
                        <div key={i} className="relative w-[16rem] h-[12rem] max-w-[20rem] max-h-[16rem] mt-4">
                            <img src={item} className="w-full h-full rounded-lg " />
                            <div className="absolute top-0 right-0 z-50 text-red-500 cursor-pointer" onClick={() => handleRemoveImage(i)}>
                                <Icon icon={"material-symbols:close"} className="h-6 w-6 text-red-500" />
                            </div>
                        </div>
                    ))}
                </div>
            <button
            className="px-4 py-2 text-white rounded-lg bg-red-500 hover:bg-red-400"
            onSubmit={handleSubmit}
            type="submit"
            >
            <h6>ยืนยันการเพิ่ม Banner</h6>
            </button>
        </form>
        </div>
)}
