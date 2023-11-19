"use client"
import React, { useState, createContext, useContext, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useParams } from 'next/navigation'
import { AddressData, FormState, SecondFormState, TableState } from './update-order';
import { GetOrder, UpdateOrder } from './update-order-api';

const UpdateOrderContext = createContext<UpdateOrderContext | null>(null);

export interface UpdateOrderContext {
    formState: FormState;
    SecondFormState: SecondFormState;
    tableState: TableState;
    setFormState: React.Dispatch<React.SetStateAction<FormState>>;
    setSecondFormState: React.Dispatch<React.SetStateAction<SecondFormState>>;
    setTableState: React.Dispatch<React.SetStateAction<TableState>>;
    onSubmit: (e: React.FormEvent<HTMLFormElement | HTMLButtonElement>) => Promise<void>;
}


export function useUpdateOrder(): UpdateOrderContext | null {
    const context = useContext(UpdateOrderContext);
    return context;
}

export const UpdateOrderProvider = ({ children }: { children: React.ReactNode }) => {
    const { id } = useParams();

    const [formState, setFormState] = useState<FormState>({
        note: "",
        order_id: "",
        status: "",
        tracking_number: "",
        tracking_url: "",
    })

    const [SecondFormState, setSecondFormState] = useState<SecondFormState>({
        order_id: "",
        payment_method: "",
        address: null
    })

    const [tableState, setTableState] = useState<TableState>({
        loading: false,
        select: "",
        index: -1,
        distance: 0,
        order_product: [],
        shipping_price: 0,
        total_price: 0,
        vendor: "",
        weight: 0,
    })



    useEffect(() => {
        LoadData()
    }, [])


    return (

        <UpdateOrderContext.Provider
            value={{
                formState,
                SecondFormState,
                tableState,
                setFormState,
                setSecondFormState,
                setTableState,
                onSubmit
            }}
        >
            {children}
        </UpdateOrderContext.Provider>
    );

async function onSubmit(e: React.FormEvent<HTMLFormElement | HTMLButtonElement>) {
    e.preventDefault();
    const { note, order_id, status, tracking_number, tracking_url } = formState
    const {order_product} = tableState;
    let productId:string[] = []
    order_product.map((item) => {
        productId.push(item.product.product_id);
    })
    setTableState(prev => ({ ...prev, loading: true }));
    const { data, error } = await UpdateOrder(order_id, JSON.stringify(SecondFormState.address), note, status, tracking_number, tracking_url, productId)

    if (error) {
        toast.error(error);
        setTableState(prev => ({ ...prev, loading: false }));
        return;
    }
    else {
        toast.success("ออเดอร์ถูกแก้ไขแล้วเรียบร้อย")
        setTableState(prev => ({ ...prev, loading: false}));
        // router.push("/admin/confirm-order", {scroll:false})
    }

}

async function LoadData() {
    setTableState(prev => ({ ...prev, loading: true }));
    const { data, error } = await GetOrder(id as string);
    if (error || !data) {
        toast.error(error || "error");
        setTableState(prev => ({ ...prev, loading: false }));
        return;
    }
    else {
        
        let tempAddr:AddressData = JSON.parse(data.order.addressData as string)
    
        const { note, order_id, status, tracking_number, payment_method,tracking_url, distance, order_product, shipping_price, total_price, vendor, weight,  } = data.order
        setSecondFormState(prev => ({
            ...prev,
            payment_method: payment_method,
            address:tempAddr
        }));
        setFormState(prev => ({
            ...prev,
            note: note,
            order_id: order_id,
            status: status,
            tracking_number: tracking_number || "",
            tracking_url: tracking_url || "",
        }));
        setTableState(prev => ({ ...prev, 
            loading: false,
            distance: distance,
            order_product: order_product,
            shipping_price: shipping_price,
            total_price: total_price,
            vendor: vendor,
            weight: weight
        }));
    }
}



}