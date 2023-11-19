"use client"
import React, { useState, createContext, useContext, useEffect, useId } from 'react';
import { AddressType, ApiResponse, PaymentMethodState, PaymentState, ResponseCheckout, ResponseQrcode } from './Payment';
import { OrderRedux, ProductRedux } from '@/app/GlobalRedux/Features/Feature';
import { useSelector } from 'react-redux';
import { CreateOrder, GetAddressAndShipping, GetReloadAddress } from './payment-api';
import { toast } from 'react-toastify';
import { useRouter } from "next/navigation";
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { io } from 'socket.io-client';
import { makeRequest } from '@/app/hook/makeRequest';
import AES from 'crypto-js/aes';
import { Circular } from '@/app/component/Loading/Circular';
import { selectOrderData } from '@/app/GlobalRedux/Features/selector';
import NodeRSA from 'node-rsa';
const publicKeyString = process.env.NEXT_PUBLIC_APP_RSA_PUBLIC_KEY!.replace(/\\n/g, '\n') as string;
const UserPaymentContext = createContext<UserPaymentContextType | null>(null);

function generateCustomUUID() {
    const uuid = crypto.randomUUID();
    const uuidWithoutHyphens = uuid.replace(/-/g, '');
    const customUUID = uuidWithoutHyphens + (Math.random() * 9);
    return customUUID.slice(0, 15);
}

export const socket = io(process.env.NEXT_PUBLIC_APP_BACKEND_URL as string);

export interface UserPaymentContextType {
    state: PaymentState;
    setState: React.Dispatch<React.SetStateAction<PaymentState>>;
    subState: PaymentMethodState;
    setSubState: React.Dispatch<React.SetStateAction<PaymentMethodState>>;
    product:OrderRedux;
    router: AppRouterInstance;
    handleGetQrCode: () => Promise<void>;
    validation:() => void;
    handleSubmitCreateToken:(e: React.FormEvent<HTMLFormElement | HTMLButtonElement>) => Promise<void>;
    handleSubmitCheckout:(e: React.FormEvent<HTMLFormElement | HTMLButtonElement>) => void;
    handleCreateOrder:(totalPrice:number, gbpReferenceNo:string) => Promise<void>;
    handleSelectedAddress:(index:number) => void;
    handleReloadAddress:() => Promise<void>;
}


export function useUserPayment(): UserPaymentContextType | null {
  const context = useContext(UserPaymentContext);
  return context;
}

export const UserPaymentProvider = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter()
    const product = useSelector(selectOrderData);
    
    const uniqueId = generateCustomUUID(); 
    const [state, setState] = useState<PaymentState>({
        selectAddress:null,
        address: [],
        open: false,
        loading: false,
        vendor: [],
        selectVendor: "",
        distance: 0,
        weight: 0,
        shippingCost: 0,
        shippingCostWeight:0,
        shippingCostDistance:0,
        note: "",
    })

    const [subState, setSubState] = useState<PaymentMethodState>({
        type: "none",
        option: ["promptpay", "wechat", "creditCard", "none"],
        referenceNo: uniqueId,
        qr: "",
        cardNumber: "4535017710535741",
        MM: "05",
        YY: "28",
        CVV: "184",
        name: "mix",
        amount: 1, 
        detail: "", 
        token: "",
        res: null,
        index: -1,
        qrWeChat: "",
        resWeChat: null,
    })


    useEffect(() => {
        // if(product.product.length === 0){
        //     router.back()
        // }
        LoadData()
        socket.on(`qrResponse${uniqueId}`, receiveMessage)
        setSubState(prev => ({...prev, referenceNo:subState.referenceNo}))
        // const script = document.createElement("script");
        // script.src = "../../../public/encrypt/jsencrypt.min.js";
        // script.async = true;
        // document.body.appendChild(script);
        return () => {
            socket.off(`qrResponse${uniqueId}`, receiveMessage);
        };
    }, [product])

    useEffect(() => {
      
        if(subState.type === "promptpay"){
            handleGetQrCode()
        }
        else if(subState.type === "creditCard"){
            setSubState(prev => ({...prev, index:0, type:"creditCard"}))
        }
        else if(subState.type === "wechat"){
            handleGetWeChat()
        }

    }, [subState.type])

    const receiveMessage = async(res:ResponseQrcode) => {
        if(!res.amount || !res.detail || !res.gbpReferenceNo || !res.referenceNo || !res.resultCode){
            console.error("Missing Information")
            return;
        }
        else {
            await handleCreateOrder(res.amount, res.gbpReferenceNo)
            toast.success("คุณชำระเงินสำเร็จแล้วกำลังดำเนินการสร้างออเดอร์");
        }
    }


  return (
    
    <UserPaymentContext.Provider 
    value={{
        state,
        setState,
        subState,
        setSubState,
        product,
        router,
        handleGetQrCode,
        validation,
        handleSubmitCheckout,
        handleSubmitCreateToken,
        handleCreateOrder,
        handleReloadAddress,
        handleSelectedAddress,
    }}>
      {children}
      <Circular
      loading={state.loading}
      />
    </UserPaymentContext.Provider>
  );


function handleSelectedAddress(index:number) {
    setState(prev => {
        let temp = prev.address.filter((_, i) => i === index);
        return {...prev, selectAddress:temp[0], open:false}
    })
}

async function handleReloadAddress(){
    setState(prev => ({...prev, loading:true}));
    
    const {data, error} = await GetReloadAddress();
    if(error || !data?.address){
        toast.error(error || "มีบางอย่างผิดพลาด");
        setState(prev => ({...prev, loading:false}));
    }
    else {
        
        setState(prev => {
            if(!prev.selectAddress?.latitude){
                return {...prev, loading:false, address:data?.address, selectAddress:data.address[0]}
            }
            else {
                return {...prev, loading:false, address:data?.address};
            }
        });
        

    }
}

async function LoadData() {
    setState((prev) => ({...prev, loading:true}));
    const {data, error} = await GetAddressAndShipping();
    if(error || !data?.shipping){
        setState((prev) => ({...prev, loading:false}));
        toast.error(error || "มีบางอย่างผิดพลาดกรุณาลองใหม่ภายหลัง");
        return;
    }
    else {
        setState((prev) => {
            let selected:AddressType | null = null;
            data.address.forEach((item) => {
                if(item.main_address){
                    selected = item;
                    return;
                }
            })
            if(!selected){
                selected = data.address[0]
            }
            console.log(data)
            return {...prev, loading:false, vendor:data.shipping, selectAddress:selected!, address:data.address, selectVendor:data.shipping[0].name}
        });
    }
}


async function handleGetQrCode() {
    setState(prev => ({...prev, loading:true}));
    
    const ciphertext = Encrypt()
    
    const {data, error} = await makeRequest<{data: string, totalPrice:number}>("/qr-code", {
        method:"POST",
        data: {
            // amount: subState.amount,
            referenceNo: subState.referenceNo,
            ciphertext:ciphertext,
        }
    })
    
    if(error || !data?.totalPrice){
        toast.error(error || "ดูเหมือนมีบางผิดพลาดกรุณาลองใหม่ภายหลัง")
        setState(prev => ({...prev, loading:false}));
        return;
    }
    else {
        setState(prev => ({...prev, loading:false}));
        setSubState(prev => ({...prev, qr:`${data?.data}`, amount:data?.totalPrice}))
    }
};

async function handleGetWeChat() {
    setState(prev => ({...prev, loading:true}));
    
    const ciphertext = Encrypt()
    
    const {data, error} = await makeRequest<{data: string, totalPrice:number}>("/wechat", {
        method:"POST",
        data: {
            referenceNo: subState.referenceNo,
            ciphertext:ciphertext,
        }
    })
    
    if(error || !data?.totalPrice){
        toast.error(error || "ดูเหมือนมีบางผิดพลาดกรุณาลองใหม่ภายหลัง")
        setState(prev => ({...prev, loading:false}));
        return;
    }
    else {
        setState(prev => ({...prev, loading:false}));
        setSubState(prev => ({...prev, qrWeChat:`${data?.data}`, amount:data?.totalPrice}))
    }
};

async function handleSubmitCheckout (e: React.FormEvent<HTMLFormElement | HTMLButtonElement>) {
    e.preventDefault();
    setState(prev => ({...prev, loading:true}));
    // product.product
    const {amount, detail, referenceNo, token} = subState;
    const ciphertext = Encrypt()
    
    const {data, error} = await makeRequest<ResponseCheckout>("/checkout", {
        method:"POST",
        data: { 
            amount: amount,
            detail:detail,
            referenceNo:referenceNo,
            token:token,
            ciphertext:ciphertext
        }
    })
    if(data?.data.resultMessage !== "Success" || error || !data.data.gbpReferenceNo){
        toast.error("ดูเหมือนจะมีบางอย่างผิดพลาดเกี่ยวกับบัตรเครดิตของคุณ")
        setState(prev => ({...prev, loading:false}));
    }
    else{
        setSubState(prev => ({...prev,  res:data.data,}))
        setState(prev => ({...prev, loading:false}));
        await handleCreateOrder(data.totalPrice, data.data.gbpReferenceNo)
    }
};


async function handleSubmitCreateToken (e: React.FormEvent<HTMLFormElement | HTMLButtonElement>){
    e.preventDefault();
    const {cardNumber, CVV, MM, YY, name} = subState;

    const {data, error} = await makeRequest<ApiResponse>("/credit", {
        method:"POST",
        data: {
            number: cardNumber,
            expirationMonth: MM,
            expirationYear: YY,
            securityCode: CVV,
            name: name
        }
    })
    if(!data || !data.data){
        toast.error("Service is not avaiable right now try again later");

    }
    else if(data?.data.resultMessage !== "Success" || error){
        toast.error("ดูเหมือนจะมีบางอย่างผิดพลาดเกี่ยวกับบัตรเครดิตของคุณ")
    }
    else {
        toast.success("ยืนยันบัตรเครดิตสำเร็จแล้ว")
        setSubState(prev => ({...prev, index:1, token:data.data.card.token}))
    }
};

function Encrypt():string{
    const secretKey = process.env.NEXT_PUBLIC_APP_SECRET_KEY as string;
    const {shippingCost} = state;
    const productIdsWithQuantity: { totalProduct: number; product_id: string, promotionStatus:boolean }[] = product.product.map((product) => ({
        totalProduct: product.totalProduct,
        product_id: product.product_id,
        promotionStatus: product.promotion_status
    }));
    
    const obj = JSON.stringify({
        product:productIdsWithQuantity,
        shippingCost
    })
    const encrypted = AES.encrypt(obj, secretKey);
    return encrypted.toString();
}

/* 
Function Send Create Order Encryption
*/
// function pemToArrayBuffer(pem: string): ArrayBuffer {
//     const pemHeader = '-----BEGIN RSA PUBLIC KEY-----';
//     const pemFooter = '-----END RSA PUBLIC KEY-----';
//     const pemContents = pem.substring(pemHeader.length, pem.length - pemFooter.length);
//     // console.log(pemContents)
//     const binaryString = atob(pemContents);
//     const byteArray = new Uint8Array(binaryString.length);

//     let i = 0;
//     for (const char of binaryString) {
//         byteArray[i++] = char.charCodeAt(0);
//     }

//     return byteArray.buffer;
// }

async function EncryptCreateOrder(totalPrice: number, gbpReferenceNo:string): Promise<string> {
    try {
        const { type, referenceNo, res } = subState;
        const { distance, selectAddress, selectVendor, shippingCost, weight, note } = state;

        const dataToEncrypt: {
            selectAddress: string;
            note: string;
            type: string;
            selectVendor: string;
            totalPrice: number;
            shippingCost: number;
            distance: number;
            weight: number;
            product: ProductRedux[];
            referenceNo: string;
            gbpReferenceNo: string;
        } = {
            selectAddress: JSON.stringify(selectAddress),
            note: note,
            type: type,
            selectVendor: selectVendor,
            totalPrice: Number(totalPrice),
            shippingCost: shippingCost,
            distance: Number(distance),
            weight: weight,
            product: product.product,
            referenceNo: referenceNo,
            gbpReferenceNo: gbpReferenceNo
        };

        const jsonData = JSON.stringify(dataToEncrypt);
        const cipher = new NodeRSA({ b:1024 });
        cipher.importKey(publicKeyString, 'pkcs1-public');
        const encrypted = cipher.encrypt(jsonData, 'base64');
        return encrypted
       
    } catch (error) {
        console.error('Encryption error:', error);
        // Handle the error, perhaps throw or return an error message
        throw error;
    }
}


async function handleCreateOrder(totalPrice:number, gbpReferenceNo:string) {
    
   
    // const {type, referenceNo, res} = subState;
    
    // const {distance, selectAddress, selectVendor, shippingCost, weight, note } = state;
    

    const encrypt = await EncryptCreateOrder(totalPrice, gbpReferenceNo);
    const err = validation()
    if(!err){
        setState(prev => ({...prev, loading:true}))
        const {data, error} = await CreateOrder(encrypt);
        if(error){
            toast.error(error || "การสร้างออเดอร์ไม่สำเร็จ")
            setState(prev => ({...prev, loading:false}));
        }
        else{
            setState(prev => ({...prev, loading:false}));
            toast.success("สร้างออเดอร์สำเร็จแล้ว");
            router.push("/user/order/0", {scroll:false})
        }
    }
}

function validation(){
    
    const {distance, selectAddress, selectVendor, weight, } = state;
    if(!selectAddress){
        toast.error("ดูเหมือนคุณจะยังไม่ได้เลือกที้อยู่");
        return true;        
    }
    else if(!distance || !weight){
        toast.error("ดูเหมือนมีบางอย่างผิดพลาดกับปลายทางหรือน้ำหนักสินค้า");
        return true;        
    }
    else if(product.product.length === 0){
        toast.error("ดูเหมือนคุณจะยังไม่มีสินค้าในรายการ");
        return true;        
    }
    else if(!selectVendor){
        toast.error("ดูเหมือนคุณจะยังไม่ได้เลือกขนส่ง");
        return true;        
    }
    else if(subState.type === "none"){
        toast.error("ดูเหมือนจะมีปัญหากับระบบการจ่ายเงินของคุณ");
        return true;        
    }
    else {
        return false;
    }
}


};
