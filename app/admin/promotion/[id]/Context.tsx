"use client"
import React, { useState, createContext, useContext, useEffect } from 'react';
import { FormState, UpdatePromotionFormState, UpdatePromotionState } from '../promotion';
import { GetPromotion, UpdatePromotionName } from '../promotion-api';
import { useParams } from 'next/navigation';
import { toast } from 'react-toastify';

const UpdatePromotionContext = createContext<UpdatePromotionContextType | null>(null);

export interface UpdatePromotionContextType {
  UpdatePromotionState: UpdatePromotionState;
  setUpdatePromotionState: React.Dispatch<React.SetStateAction<UpdatePromotionState>>;
  UpdatePromotionFormState: FormState;
  setUpdatePromotionFormState: React.Dispatch<React.SetStateAction<FormState>>;
  onSubmitUpdatePromotion:(e: React.FormEvent<HTMLFormElement | HTMLButtonElement>) => Promise<void>;
}

export function useUpdatePromotion(): UpdatePromotionContextType | null {
  const context = useContext(UpdatePromotionContext);
  return context;
}

export const UpdatePromotionProvider = ({ children }: { children: React.ReactNode }) => {
   
    const {id} = useParams();

    const [UpdatePromotionFormState, setUpdatePromotionFormState] = useState<FormState>({
      promotion_th: "",
      promotion_en: "",
      promotion_cn: "",
      isSpecial: false,
      
  })

  const [UpdatePromotionState, setUpdatePromotionState]= useState<UpdatePromotionState> ({
      product: [],
      loading: false,
      open: false,
      search: "",
      dialogProduct: [],
      selectedProduct: [],
  })

  useEffect(() => {

    LoadData()

  }, [])


  return (
    
    <UpdatePromotionContext.Provider 
    value={{
      setUpdatePromotionFormState,
      setUpdatePromotionState,
      UpdatePromotionFormState,
      UpdatePromotionState,
      onSubmitUpdatePromotion,
    }}>
      {children}
    </UpdatePromotionContext.Provider>
  );


async function LoadData() {
  const { data, error } = await GetPromotion(id as string);

  if (error || !data) {
      toast.error(error || "error");
      return;
  }
  else {
      setUpdatePromotionState(prev => ({ ...prev, product: data.products }))
      setUpdatePromotionFormState(prev => ({ ...prev, promotion_th: data.promotion.promotion_name, promotion_en: data.promotion.promotion_name_en, promotion_cn: data.promotion.promotion_name_cn }))

  }
}


async function onSubmitUpdatePromotion(e: React.FormEvent<HTMLFormElement | HTMLButtonElement>) {
  e.preventDefault();
  const { promotion_th, promotion_en, promotion_cn, isSpecial  } = UpdatePromotionFormState

  const { data, error } = await UpdatePromotionName(id as string, promotion_th, promotion_en, promotion_cn, isSpecial);

  // console.log(data)
  if (error) {
      toast.error(error);
      setUpdatePromotionFormState(prev => ({ ...prev, loading: false }));
      return;
  }
  else {
      toast.success("แก้ไขหมวดชื่อโปรโมชั่นนี้แล้วเรียบร้อย")
      setUpdatePromotionFormState(prev => ({ ...prev, loading: false, submit: true }));
  }
}

};
