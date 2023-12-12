import medicine from './medicine.png'
import pharmacy from './pharmacy.png'
import staffs from './staffs.png'
import time from './clock.png'
import activity from './society.png'
import city from './city.png'
import React from 'react'
import ImageRight from "./ImageRight";
import ImageLeft from "./ImageLeft";

const arr = [
    {
        image:medicine,
        title:"Comprehensive Medication Services",
        text:"Southeast Pharmacy offers a wide range of prescription and over-the-counter medications, ensuring that customers can find the medicines they need to address their health concerns. Knowledgeable and licensed pharmacists are available to provide expert advice and guidance on medication usage and potential interactions."
    },
    {
        image:pharmacy,
        title:"Health and Wellness Products",
        text:"Beyond medications, the pharmacy also stocks an array of health and wellness products, including vitamins, supplements, and personal care items. Customers can find everything they need to support a healthy and balanced lifestyle."
    },
    {
        image:staffs,
        title:"Friendly and Caring Staff",
        text:"The pharmacy's staff is known for their friendly and caring approach towards customers. They take the time to understand individual needs and are always ready to provide personalized recommendations and support."
    },
    {
        image:time,
        title:"Timely Services",
        text:"Southeast Pharmacy prides itself on efficiency and promptness. Prescription refills are processed swiftly, and customers can trust that their medications will be ready for pickup when promised."
    },
    {
        image:activity,
        title:"Health-related Resources",
        text:"As part of its commitment to community health, Southeast Pharmacy often hosts health-related workshops, seminars, and events. These initiatives aim to raise awareness about various health topics and encourage proactive health management."
    },
    {
        image:city,
        title:"Accessibility and Convenience",
        text:"Situated in the middle of Sukhumvit, the pharmacy enjoys a prime location that is easily accessible to residents and visitors alike. Its central position makes it a convenient stop for those seeking pharmacy services."
    },
]

export default function page() {
    return (
        <div className="mt-8 w-full py-4 md:py-8  px-4 md:px-16 flex flex-col gap-32">
            <h6 className="text-5xl text-center font-semibold text-[#303f59] mb-8">Services</h6>

        {arr.map((item, i) => (
            <div key={i}>
                {i % 2 === 0 ?
                <ImageRight
                image={item.image}
                title={item.title}
                text={item.text}
                />
                :
                <ImageLeft
                image={item.image}
                title={item.title}
                text={item.text}
                />
                }
            </div>
        ))}

        </div>
    );
}