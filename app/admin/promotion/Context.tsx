"use client"
import React, { useState, createContext, useContext, useEffect } from 'react';
import { FormState, Promotion, TableState} from './promotion';
import { CreatePromotion, DeletePromotiom, ListPromotion } from './promotion-api';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

const PromotionContext = createContext<PromotionContextType | null>(null);

export interface PromotionContextType {
    FormState: FormState;
    TableState: TableState;
    setFormState: React.Dispatch<React.SetStateAction<FormState>>;
    setTableState: React.Dispatch<React.SetStateAction<TableState>>;
    LoadData: () => Promise<void>;
    HandleUpdate: (data: Promotion) => Promise<void>;
    HandleDelete: (promotion_id: string) => Promise<void>;
    onSubmit: (e: React.FormEvent<HTMLFormElement | HTMLButtonElement>) => Promise<void>;
}


export function usePromotion(): PromotionContextType | null {
    const context = useContext(PromotionContext);
    return context;
}

export const PromotionProvider = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter()
    const [FormState, setFormState] = useState<FormState>({
        promotion_th: "",
        promotion_en: "",
        promotion_cn: "",
        isSpecial: true
    })

    const [TableState, setTableState] = useState<TableState>({
        search: "",
        promotion: [],
        loading: false
    })

    useEffect(() => {

        LoadData()

    }, [])



    return (

        <PromotionContext.Provider
            value={{
                FormState,
                TableState,
                setFormState,
                setTableState,
                HandleUpdate,
                HandleDelete,
                LoadData,
                onSubmit,
            }}>
            {children}
        </PromotionContext.Provider>
    );

async function LoadData() {
    setTableState(prev => ({ ...prev, loading: true }));
    const { data, error } = await ListPromotion();
    if (error || !data) {
        toast.error(error || "error");
        setTableState(prev => ({ ...prev, loading: false }));
        return;
    }
    else {
        setTableState(prev => ({ ...prev, promotion: data.promotion, loading: false }))
    }
}

async function onSubmit(e: React.FormEvent<HTMLFormElement | HTMLButtonElement>) {
    e.preventDefault();
    setTableState(prev => ({ ...prev, loading: true }));
    const { promotion_th, promotion_en, promotion_cn } = FormState;

    let err = Validation()
    if (err) {
        return
    }

    const { data, error } = await CreatePromotion(promotion_th, promotion_en, promotion_cn);

    // console.log(data)
    if (error || !data?.promotion) {
        toast.error(error);
        setFormState(prev => ({ ...prev, loading: false }));
        return;
    }
    else {
        toast.success("โปรโมชั่นนี้ได้ถูกสร้างแล้วเรียบร้อย")
        setFormState(prev => ({...prev, promotion_th:"" , promotion_en: "", promotion_cn: ""}))
        setTableState(prev => ({ ...prev, promotion: [...prev.promotion, data.promotion], loading: false }))
    }
}

function Validation(): boolean {
    const { promotion_th, promotion_en, promotion_cn } = FormState;

    const stringParams = [
        { value: promotion_th, field: 'ชื่อโปรโมชั่น (ภาษาไทย)' },
        { value: promotion_en, field: 'ชื่อโปรโมชั่น (ภาษาอังกฤษ)' },
        { value: promotion_cn, field: 'ชื่อโปรโมชั่น (ภาษาจีน)' }
    ];

    for (const param of stringParams) {
        if (typeof param.value !== 'string' || param.value.trim() === '') {
            toast.error(`ดูเหมือนคุณยังไม่ได้กรอก ${param.field}`);
            setFormState(prev => ({ ...prev, loading: false }));
            return true;
        }
    }

    return false;
}

async function HandleUpdate(Promotion: Promotion) {
    router.push(`/admin/promotion/${Promotion.promotion_id}`, { scroll: false })
}

async function HandleDelete(promotion_id: string) {
    setTableState(prev => ({ ...prev, loading: true }));

    let tempPromotion: Promotion[] = []
    const { promotion } = TableState;

    if (window.confirm(`คุณต้องการลบโปรโมชั่นนี้ใช่ไหม`)) {
        const { data, error } = await DeletePromotiom(promotion_id);
        if (error) {
            toast.error(error);
            setTableState(prev => ({ ...prev, loading: false }));
            return;
        }

        toast.success("ลบหมวดหมู่เรียบร้อยแล้ว");
        for (let i = 0; i < promotion.length; i++) {
            if (promotion[i].promotion_id === promotion_id && promotion[i] !== undefined) {
                continue;
            }
            else {
                tempPromotion.push(promotion[i]);
            }
        }
        setTableState((prev) => ({ ...prev, promotion: tempPromotion }))
    }
    else {
        setTableState((prev) => ({ ...prev, loading: false }))
    }

}


};
