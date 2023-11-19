"use client"

import { Icon } from "@iconify/react";
import { useRef } from "react";
import { DetailState } from "./detail-type";
import Image from "next/image";
import { toast } from "react-toastify";
import { CreateComment } from "./detail-api";
import moment from "moment";

export default function Comment({
    state,
    setState,
    averageRating
}:{
    state: DetailState,
    setState:  React.Dispatch<React.SetStateAction<DetailState>>
    averageRating:string;
}) {

    const createCommentRef = useRef<HTMLTextAreaElement  | null>(null)

    
    async function handleCreateComment(e:React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        const {rating, product} = state;
        if(!createCommentRef.current?.value){
            toast.error("คุณจำเป็นต้องใส่ความคิดเห็นก่อน");
        }
        else if(rating === 0){
            toast.error("คุณจำเป็นต้องให้ดาวก่อน")
        }
        else {
            setState(prev => ({...prev, loading:true}));
            const {data, error} = await CreateComment(product?.product_id as string, createCommentRef.current.value, rating);
            if(error || !data?.comment){
                toast.error(error || "มีบางอย่างผิดพลาดเกี่ยวกับการแสดงความคิดเห็นของคุณ");
                setState(prev => ({...prev, loading:false}));
            }
            else {
                toast.success("ความคิดเห็นของคุรถูกสร้างแล้ว")
                setState(prev => ({...prev, loading:false, comment:[data.comment, ...prev.comment]}));
            }
        }
    }


    return (
    <>
     <div className="flex flex-col gap-4">
                <h6 className='text-xl'>รีวิวและความคิดเห็น</h6>
                <div className="flex gap-2 flex-col" >
                    <div
                        className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row "
                    >
                        <div className="flex flex-row flex-wrap justify-around items-center p-4 leading-normal gap-5 w-full">
                            <div className="flex flex-row  items-center gap-7">
                                <Icon icon="material-symbols:star-outline" className='text-yellow-400 w-20 h-20' />
                                <h1 className="text-xl text-gray-700 my-2 px-2">{averageRating || 0}</h1>
                            </div>
                            <div className="flex flex-wrap justify-start tems-center gap-5">

                                <button
                                    className="flex flex-col items-center bg-white border border-gray-200 rounded-lg  md:flex-row  hover:bg-gray-100 h-10"
                                >
                                    <h1 className="font-normal text-gray-700 my-2 px-2">ทั้งหมด ({state.comment.length})</h1>
                                </button>

                               {Object.entries(state.ratingCount).reverse().map(([rating, count]) => (
                               <button
                                    className="flex flex-col items-center bg-white border border-gray-200 rounded-lg  md:flex-row  hover:bg-gray-100  h-10"
                                    key={count}
                                >
                                    <h1 className="font-normal text-gray-700 my-2 px-2">{rating} ดาว ({count})</h1>
                                </button>
                               ))}
                              
                            </div>

                        </div>
                    </div>
                </div>


            </div>


            <div className="flex flex-col gap-4 mt-8">
                <h6 className="text-xl">แสดงความคิดเห็นของคุณเลย</h6>
                <div className="flex gap-0.5">
                    <Icon
                    icon={"ic:round-star"}
                    className={`w-6 h-6 cursor-pointer hover:text-yellow-300 ${state.rating >= 1 ? "text-yellow-400" : "text-slate-500"} text-slate-500`}
                    onClick={() => setState(prev => ({...prev, rating: 1}))}
                    />
                    <Icon
                    icon={"ic:round-star"}
                    className={`w-6 h-6 cursor-pointer hover:text-yellow-300 ${state.rating >= 2 ? "text-yellow-400" : "text-slate-500"} text-slate-500`}
                    onClick={() => setState(prev => ({...prev, rating: 2}))}
                    />
                    <Icon
                    icon={"ic:round-star"}
                    className={`w-6 h-6 cursor-pointer hover:text-yellow-300 ${state.rating >= 3 ? "text-yellow-400" : "text-slate-600"} text-slate-600`}
                    onClick={() => setState(prev => ({...prev, rating: 3}))}
                    />
                    <Icon
                    icon={"ic:round-star"}
                    className={`w-6 h-6 cursor-pointer hover:text-yellow-300 ${state.rating >= 4 ? "text-yellow-400" : "text-slate-600"} text-slate-600`}
                    onClick={() => setState(prev => ({...prev, rating: 4}))}
                    />
                    <Icon
                    icon={"ic:round-star"}
                    className={`w-6 h-6 cursor-pointer hover:text-yellow-300 ${state.rating >= 5 ? "text-yellow-400" : "text-slate-600"} text-slate-600`}
                    onClick={() => setState(prev => ({...prev, rating: 5}))}
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <div className="">
                        <textarea
                        ref={createCommentRef}
                        placeholder='แสดงความคิดเห็น'
                        className="border-0 h-24 placeholder-slate-400 text-slate-600 bg-slate-100 focus:ring outline-none focus:outline-none  px-3 py-3  relative  rounded text-sm shadow  w-full "
                        />
                    </div>
                    <button
                    onClick={handleCreateComment}
                    className="w-fit bg-red-500 hover:bg-red-400 text-white px-4 py-2 rounded-lg h-fit float-right"
                    >
                    แสดงความคิดเห็น
                    </button>
                    
                    {state.comment.length !== 0 ? state.comment.map((item, i) => (
                        <div className="flex flex-row gap-2 mt-8 w-full" key={i}>
                        <div className="">
                            <Image
                            alt='user avatar'
                            src={item.user.image}
                            width={64}
                            height={64}
                            className="rounded-full"
                            />
                        </div>
                        <div className="flex flex-col gap-2 w-full">
                            <div className="flex gap-2">
                                <h6 className="text-lg leading-relaxed">{item.user.user_name}</h6>
                                <div className="flex gap-0.5">
                                    <Icon
                                    icon={"ic:round-star"}
                                    className={`w-6 h-6 cursor-pointer hover:text-yellow-300 ${item.rating >= 1 ? "text-yellow-400" : "text-slate-500"} text-slate-500`}
                                    />
                                    <Icon
                                    icon={"ic:round-star"}
                                    className={`w-6 h-6 cursor-pointer hover:text-yellow-300 ${item.rating >= 2 ? "text-yellow-400" : "text-slate-500"} text-slate-500`}
                                    />
                                    <Icon
                                    icon={"ic:round-star"}
                                    className={`w-6 h-6 cursor-pointer hover:text-yellow-300 ${item.rating >= 3 ? "text-yellow-400" : "text-slate-600"} text-slate-600`}
                                    />
                                    <Icon
                                    icon={"ic:round-star"}
                                    className={`w-6 h-6 cursor-pointer hover:text-yellow-300 ${item.rating >= 4 ? "text-yellow-400" : "text-slate-600"} text-slate-600`}
                                    />
                                    <Icon
                                    icon={"ic:round-star"}
                                    className={`w-6 h-6 cursor-pointer hover:text-yellow-300 ${item.rating >= 5 ? "text-yellow-400" : "text-slate-600"} text-slate-600`}
                                    />
                                </div>
                            </div>
                        <p className="text-sm">{item.message}</p>
                        <p className="text-xs text-right text-slate-500">{moment(item.created_at).locale("th").format("lll")}</p>
                        </div>
                    </div>
                    ))
                    :
                    <h6 className="text-xl text-center text-slate-700 ">ดูเหมือนจะยังไม่มีใครแสดงความคิดเห็นเลย</h6>
                }
                </div>
           </div>
    </>
)}