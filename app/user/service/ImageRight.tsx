import Image, { StaticImageData } from "next/image";

export default function ImageRight({
    image,
    title,
    text,
}:{
    image:StaticImageData;
    title:string;
    text:string;
}) {


    return (
    <>
       <div className="flex lg:flex-row flex-col-reverse mb-8 items-center text-start gap-16">
                <div className="w-2/3">
                    <div className="text-2xl text-blue-800">
                        {title}
                    </div>
                    <div className="my-4 text-lg font-light transition-opacity ease-in duration-700 opacity-70">
                        {text}
                    </div>
                </div>
                <div className="relative w-48 h-48">
                <Image
                    src={image}
                    alt={`${title} logo`}
                    fill
                    />
                </div>
            </div>
    </>
);
}