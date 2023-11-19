"use client"
import Image from "next/image";
import StoreImage from "./SouthEashPharmacy.jpg"
import StoreImage2 from "./SouthEastPharmacy2.jpg"
import React from 'react'
import { useTranslation } from "react-i18next";

export default function Page() {

    const { t } = useTranslation("translation");

    return (
        <>
            <div className="w-[100%] p-8 flex flex-col  gap-8 lg:gap-32 text-slate-600">
                <div className="w-full flex flex-col lg:flex-row justify-between items-center ">
                    {/* div เกี่ยวกับเรา */}
                    <div className="px-30 px-8 py-8 pb-20">
                        <div className="mt-12 text-4xl text-slate-700 font-semibold">
                            {t("aboutUs")}
                        </div>
                        <div className="my-4 font-light">
                            Southeast Pharmacy has been proudly serving our community since 1973.  We are providing exceptional healthcare solutions and services to our valued customers. Our experienced team of pharmacists and staff is dedicated to delivering personalized care and expert advice, ensuring you receive the highest standard of service.
                        </div>
                    </div>
                    <Image
                        src={StoreImage}
                        alt="banner"
                        width={522}
                        height={348}
                        className="aspect-[3/2] rounded-lg"
                    />
                </div>
                <div className="w-full flex flex-col-reverse lg:flex-row justify-between items-center">
                    <Image
                        src={StoreImage2}
                        alt="banner"
                        width={522}
                        height={348}
                        className="aspect-[3/2] rounded-lg"
                    />
                    {/* div ความเป็นมา */}
                    <div className="px-8 py-8 ml-auto ">
                        <div className="mt-4 text-4xl text-slate-700 font-semibold">
                            {t("background")}
                        </div>
                        <div className="my-4 font-light">
                            {`Southeast Pharmacy is a well-established pharmaceutical establishment that has proudly served the community since 1973. Strategically located in the heart of Sukhumvit, one of the bustling districts of the city, it has become a trusted and reliable destination for all healthcare needs.
                            Since its inception, Southeast Pharmacy has been dedicated to providing top-quality pharmaceutical services and products to its valued customers. The pharmacy's longevity is a testament to its commitment to excellence, customer satisfaction, and unwavering dedication to the well-being of the community.`}
                        </div>
                    </div>
                </div>
                <div className="w-full">
                    <hr className="my-4" />
                    <p className="text-center mt-8 pt-6 font-normal italic text-xl text-slate-500">
                        {`" Over the years, Southeast Pharmacy has built a loyal customer base, with generations of families relying on its services for their healthcare needs. Its enduring presence in the community speaks to its reliability, trustworthiness, and contributions to the well-being of the people it serves. Whether it's a routine prescription refill or health-related advice, Southeast Pharmacy continues to be a beacon of pharmaceutical care and support in the heart of Sukhumvit. "`}
                    </p>
                </div>
            </div>
        </>
    );
}


