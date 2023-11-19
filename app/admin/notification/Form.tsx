"use client";

import DropImage from "@/app/component/DropImage/DropImage";
import { Icon } from "@iconify/react";
import { useEffect, useRef, useState } from "react";
import { NotiState } from "./noti";
import InputRef from "@/app/component/Input/InputRef";
import { toast } from "react-toastify";
import { Circular } from "@/app/component/Loading/Circular";
import { makeRequest } from "@/app/hook/makeRequest";

export default function Form() {

    const [state, setState] = useState<NotiState>({
        images: [],
        imageURLs: [],
        loading: false,
    });
    
    const header_th = useRef<HTMLInputElement | null>(null);
    const header_en = useRef<HTMLInputElement | null>(null);
    const header_cn = useRef<HTMLInputElement | null>(null);
    const desc_th = useRef<HTMLTextAreaElement | null>(null);
    const desc_en = useRef<HTMLTextAreaElement | null>(null);
    const desc_cn = useRef<HTMLTextAreaElement | null>(null);

    useEffect(() => {
        if (state.images.length < 1) return;
        //@ts-ignore
        const newImageUrls = [];
        //@ts-ignore
        state.images.forEach((image) => newImageUrls.push(URL.createObjectURL(image)));
        //@ts-ignore
        setState(prev => ({ ...prev, imageURLs: [newImageUrls[0]] }))
    }, [state.images]);

   
    return (
    <>
      <div className="p-8 flex flex-col gap-8">
                <div>
                    <h6 className="text-3xl font-bold">การแจ้งเตือน</h6>
                </div>
                    <form onSubmit={onSubmit} className="flex flex-col gap-12">
                        <div className="flex gap-2 flex-col">
                            <h6>หัวข้อการแจ้งเตือน(TH)</h6>
                            <InputRef
                            ref={header_th}
                            placeholder="หัวข้อการแจ้งเตือนภาษาไทย"
                            type="text"
                            />
                        </div>
                        <div className="flex gap-2 flex-col">
                            <h6>รายละเอียดการแจ้งเตือน(TH)</h6>
                            <textarea
                            className="h-32 border-0 px-3 py-3 placeholder-slate-400 text-slate-600 relative bg-slate-100 rounded text-sm shadow outline-none focus:outline-none focus:ring w-full"
                            ref={desc_th}
                            placeholder="รายระเอียดการแจ้งเตือนภาษาไทย"
                            />
                        </div>
                        <hr/>

                        <div className="flex gap-2 flex-col">
                            <h6>หัวข้อการแจ้งเตือน(EN)</h6>
                            <InputRef
                            ref={header_en}
                            placeholder="หัวข้อการแจ้งเตือนภาษาอังกฤษ"
                            type="text"
                            />
                        </div>
                        <div className="flex gap-2 flex-col">
                            <h6>รายละเอียดการแจ้งเตือน(EN)</h6>
                            <textarea
                            className="h-32 border-0 px-3 py-3 placeholder-slate-400 text-slate-600 relative bg-slate-100 rounded text-sm shadow outline-none focus:outline-none focus:ring w-full"
                            ref={desc_en}
                            placeholder="รายระเอียดการแจ้งเตือนภาษาอังกฤษ"
                            />
                        </div>
                        <hr/>

                        <div className="flex gap-2 flex-col">
                            <h6>หัวข้อการแจ้งเตือน(CN)</h6>
                            <InputRef
                            ref={header_cn}
                            placeholder="หัวข้อการแจ้งเตือนภาษาจีน"
                            type="text"
                            />
                        </div>
                        <div className="flex gap-2 flex-col">
                            <h6>รายละเอียดการแจ้งเตือน(CN)</h6>
                            <textarea
                            className="h-32 border-0 px-3 py-3 placeholder-slate-400 text-slate-600 relative bg-slate-100 rounded text-sm shadow outline-none focus:outline-none focus:ring w-full"
                            ref={desc_cn}
                            placeholder="รายระเอียดการแจ้งเตือนภาษาจีน"
                            />
                        </div>
                        <hr/>

                    <div>

                        <DropImage
                            multiple={false}
                            handleImageChange={handleImageChange}
                            id="add-user-image"
                            title="อัพโหลดรูปภาพแจ้งเตือน"
                        />

                        <div className="flex gap-8 flex-wrap flex-1 ">
                            {state.imageURLs?.map((imageSrc: string, idx: number) => (
                                <div key={idx} className="relative w-[10rem] h-[18rem] max-w-[13rem] max-h-[20rem] mt-4">
                                    <img src={imageSrc} className="w-full h-full rounded-lg " />
                                    <div className="absolute top-0 right-0 z-50 text-red-500 cursor-pointer" onClick={() => handleRemoveImage(idx)}>
                                        <Icon icon={"material-symbols:close"} className="h-6 w-6 text-red-500" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex justify-end">
                    <button
                        type="submit"
                        onSubmit={onSubmit}
                        className="px-2 p-3 text-white bg-red-500 rounded-md w-fit hover:bg-red-400 disabled:bg-slate-500 disabled:text-slate-200 disabled:cursor-not-allowed"
                    >
                        <h6 className="font-semibold">สร้าง</h6>
                    </button>
                    </div>

                    </form>

        </div>
        <Circular
        loading={state.loading}
        />
    </> 
);
async function onSubmit(e: React.FormEvent<HTMLFormElement | HTMLButtonElement>) {
    e.preventDefault();

    const { err, data: validationData } = Validation();
    if (err || !validationData) {
        return;
    }
    else {
        setState(prev => ({...prev, loading:true}));
        
        const {images} = state;
        
        const formData = new FormData();
        
        formData.append("file", images[0] || "");
        formData.append("header_th", validationData.header_th);
        formData.append("header_en", validationData.header_en);
        formData.append("header_cn", validationData.header_cn);
        formData.append("desc_th", validationData.desc_th);
        formData.append("desc_en", validationData.desc_en);
        formData.append("desc_cn", validationData.desc_cn);

        const {data, error} = await makeRequest("/insert-noti", {
            method:"POST",
            data:formData
        })
        if(error){
            toast.error(error || "ดูเหมือนมีบางอย่างผิดพลาด");
            setState(prev => ({...prev, loading:false}));
            return;
        }
        else {
            toast.success("ส่งการแจ้งเตือนให้ User แล้วเรียบร้อย")
            setState(prev => ({...prev, loading:false}));
            return;
        }        
    }

}


interface ValidatedData {
    header_th: string;
    header_en: string;
    header_cn: string;
    desc_th: string;
    desc_en:string;
    desc_cn:string;
}

function Validation():{ err: boolean; data: ValidatedData  | null }{
    const stringParams = [
        { ref: header_th, field: 'หัวเรื่องภาษาไทย' },
        { ref: header_en, field: 'หัวเรื่องภาษาอังกฤษ' },
        { ref: header_cn, field: 'หัวเรื่องภาษาจีน' },
        { ref: desc_th, field: 'คำอธิบายภาษาไทย' },
        { ref: desc_en, field: 'คำอธิบายภาษาอังกฤษ' },
        { ref: desc_cn, field: 'คำอธิบายภาษาจีน' },
    ];

    const errors: Record<string, string> = {};
  
    for (const param of stringParams) {
        if (!param.ref || !param.ref.current || !param.ref.current.value || param.ref.current.value.trim() === '') {
            errors[param.field] = `ดูเหมือนคุณยังไม่ได้กรอก ${param.field}`;
            toast.error(`ดูเหมือนคุณยังไม่ได้กรอก ${param.field}`);
        }
    }

    if (Object.keys(errors).length > 0) {
        //   toast.error('กรุณากรอกข้อมูลให้ถูกต้อง');
        return { err: true, data: null };
    }

    return {
        err: false,
        data: {
          header_th: header_th.current!.value,
          header_en: header_en.current!.value,
          header_cn: header_cn.current!.value,
          desc_th: desc_th.current!.value,
          desc_en: desc_en.current!.value,
          desc_cn: desc_cn.current!.value,
        },
      };
}

function handleRemoveImage(index: number) {
    const temp1 = state.images;
    const temp2 = state.imageURLs;
    temp1.splice(index, 1);
    temp2.splice(index, 1);
    setState(prev => ({ ...prev, images: temp1, imageURLs: temp2 }));
}


function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    //@ts-ignore  
    setState(prev => ({ ...prev, images: [...e.target.files] }))
}

function headerTHHandler(e:React.ChangeEvent<HTMLInputElement>) {
    setState(prev => ({...prev, header_th:e.target.value}))
}
function headerENHandler(e:React.ChangeEvent<HTMLInputElement>) {
    setState(prev => ({...prev, header_en:e.target.value}))
}
function headerCNHandler(e:React.ChangeEvent<HTMLInputElement>) {
    setState(prev => ({...prev, header_cn:e.target.value}))
}
function descTHHandler(e:React.ChangeEvent<HTMLTextAreaElement>) {
    setState(prev => ({...prev, desc_th:e.target.value}))
}
function descENHandler(e:React.ChangeEvent<HTMLTextAreaElement>) {
    setState(prev => ({...prev, desc_en:e.target.value}))
}
function descCNHandler(e:React.ChangeEvent<HTMLTextAreaElement>) {
    setState(prev => ({...prev, desc_cn:e.target.value}))
}


}