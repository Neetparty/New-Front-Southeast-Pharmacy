"use client"

import { makeRequest } from "@/app/hook/makeRequest";
import { useEffect, useId, useState } from "react";
import io from "socket.io-client";
import Image from "next/image";
import Input from "@/app/component/Input/Input";
import { PaymentMethodState } from "../../Payment";
import { toast } from "react-toastify";
import { UserPaymentContextType, useUserPayment } from "../../Context";

export const socket = io(process.env.NEXT_PUBLIC_APP_BACKEND_URL as string);

interface ResponseQrcode {
    resultCode: string,
    amount: number,
    referenceNo: string,
    gbpReferenceNo: string,
    detail: string;
}

interface State {
    token:string,
    referenceNo: string,
    backgroundUrl: string,
    amount: string,
    qr: string,
    response: ResponseQrcode | null;
}

export default function Qrcode(){

    const {handleCreateOrder}:UserPaymentContextType = useUserPayment?.()!;


    const [subState, setSubState] = useState<State>({
        token:"",
        referenceNo: useId(),
        backgroundUrl: "",
        amount: '1.00',
        qr: "",
        response: null
    })


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const {data, error} = await makeRequest<{data: string}>("/qr-code", {
            method:"POST",
            data: {
                amount: subState.amount,
                referenceNo: subState.referenceNo
            }
        })

        if(error){
            toast.error(error || "ดูเหมือนมีบาผิดพลาดกรุณาลองใหม่ภายหลัง")
            return;
        }
        setSubState(prev => ({...prev, qr:`${data?.data}`}))
    };

    useEffect(() => {
        socket.on(`qrResponse${subState.referenceNo}`, receiveMessage)
        setSubState(prev => ({...prev, referenceNo:subState.referenceNo}))
        return () => {
          socket.off(`qrResponse${subState.referenceNo}`, receiveMessage);
        };
      }, []);

    const receiveMessage = (res:ResponseQrcode) => {
        if(!res.amount || !res.detail || !res.gbpReferenceNo || !res.referenceNo || !res.resultCode){
            console.error("Missing Information")
            return;
        }
        else {
            setSubState(prev => ({...prev, response:res}))
            handleCreateOrder(res.amount, res.referenceNo)
        }
    }

    return (
    <>  

        <form
            onSubmit={handleSubmit}
            className="p-4 flex flex-col gap-4"
        >
        
            {subState.qr && 
            <div className={`relative mx-auto ${subState.qr && "w-60 h-80"}`}>
                <Image 
                fill
                src={subState.qr}
                alt="qrcode payment"
                className="object-contain"
                />
            </div>
            }
        </form>
       {/* {subState.response && 
        <div className="flex flex-col gap-4 px-2">
        <h6> amount: {subState.response.amount}</h6>
        <h6> detail: {subState.response.detail}</h6>
        <h6> gbpReferenceNo: {subState.response.gbpReferenceNo}</h6>
        <h6> referenceNo: {subState.response.referenceNo}</h6>
        <h6> resultCode: {subState.response.resultCode}</h6>
    </div>
       } */}
    </>
);
}