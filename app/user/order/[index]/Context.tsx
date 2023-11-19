"use client"
import React, { useState, createContext, useContext, useEffect } from 'react';
import { AddressData, DetailOrder, FirstFormState, OrderHistory, SecondFormState, ThirdFormState  } from './order';
import { toast } from 'react-toastify';
import { useParams } from 'next/navigation';
import { DeleteFav, GetFav, GetHis, GetOrderDetail, GetOrderOnWaiting } from './order-api';
import FirstTab from './FirstTab';
import SecondTab from './SecondTab';
import ThirdTab from './ThirdTab';
import { Circular } from '@/app/component/Loading/Circular';
import { AddToUserCart } from '../../detail/[id]/detail-api';
import { useSelector } from 'react-redux';
import { selectLangData, selectUserData } from '@/app/GlobalRedux/Features/selector';
import { useTranslation } from 'react-i18next';
import { TFunction } from 'i18next';
const UserOrderContext = createContext<UserOrderContextType | null>(null);


export interface UserOrderContextType {
  firstState: FirstFormState;
  setFirstState: React.Dispatch<React.SetStateAction<FirstFormState>>;
  thirdState: ThirdFormState;
  setThirdState:React.Dispatch<React.SetStateAction<ThirdFormState>>;
  state: any;
  setState: React.Dispatch<React.SetStateAction<any>>;
  handleTab:(index:number) => void;
  SelectTab:() => JSX.Element;
  secondState:SecondFormState;
  setSecondState:React.Dispatch<React.SetStateAction<SecondFormState>>;
  handleRemoveFav:(productId:string) => Promise<void>;
  AddToCart:(productId:string) => Promise<void>;
  handleOrderDetail:(orderId:string) => Promise<void>;
  handleHistoryDetail:(orderId:string) => Promise<void>;
  handleLang:(thai:string, english:string, china:string) => string;
  lang: {lang:string};
  t:  TFunction<"translation", undefined>
}
  

export function useUserOrder(): UserOrderContextType | null {
  const context = useContext(UserOrderContext);
  return context;
}

export const UserOrderProvider = ({ children }: { children: React.ReactNode }) => {
  const {t} = useTranslation();
  const user = useSelector(selectUserData);
  const { index } = useParams();
  const lang = useSelector(selectLangData);
  const [state, setState] = useState({
    loading:false,
    index: Number(index) || 0,
  })

  const [firstState, setFirstState] = useState<FirstFormState>({
    order: [],
    sort: "none",
    showDetail: false,
    detailOrder: null
  })
  
  const [secondState, setSecondState] = useState<SecondFormState>({
    fav:[],
  })
  
  const [thirdState, setThirdState] = useState<ThirdFormState>({
    history:[],
    showDetail: false,
    addr: "",
    selectHistory: null
  })




  useEffect(() => {
    if(!user.user_id){
      toast.info(t("nouser"))
    }
    else if(state.index === 0 && firstState.order.length === 0){
      loadOrder();
    }
    else if(state.index === 1 && secondState.fav.length === 0){
      loadFav();
    }
    else if(state.index === 2 && thirdState.history.length === 0){
      loadHistory();
    }
    
  }, [state.index])



  return (
    
    <UserOrderContext.Provider 
    value={{
      firstState,
      setFirstState,
      handleTab,
      SelectTab,
      setState,
      state,
      secondState,
      setSecondState,
      handleRemoveFav,
      AddToCart,
      handleOrderDetail,
      thirdState,
      setThirdState,
      handleHistoryDetail,
      handleLang,
      lang,
      t,
    }}>
      <Circular loading={state.loading} />
      {children}
    </UserOrderContext.Provider>
  );

function handleLang(thai:string, english:string, china:string){
  
    if(lang.lang === "th"){
      return thai;
    }
    else if(lang.lang === "en"){
      return english;
    }
    else if(lang.lang === "cn"){
      return china;
    }
    else {
      return thai;
    }
}

async function handleOrderDetail(orderId:string) {
    setState((prev:any) => ({...prev, loading:true}))
    const {data,error} = await GetOrderDetail(orderId);
    if(error || !data?.order){
        toast.error(error || "ดูเหมือนมีบางอย่างผิดพลาดกับออเดอร์ของคุณกรุณาลองใหม่ภายหลัง")
        setState((prev:any) => ({...prev, loading:false}))
    }
    else {
        let addr:AddressData = JSON.parse(data?.order.addressData as string);
        let temp:DetailOrder = data.order;
        temp.addressData = addr;

        setFirstState(prev => ({...prev, detailOrder:temp, showDetail:true}))

        setState((prev:any) => ({...prev, loading:false}))
    }
}

async function handleHistoryDetail(orderId:string) {

  
  setThirdState(prev => {
    let selectHistory:OrderHistory | null = null;

      prev.history.forEach((item) => {
        if(item.order.order_id === orderId){
          selectHistory = item;
          return
        }
      })
      if(typeof(selectHistory) !== "undefined"){
        let addr:AddressData = JSON.parse(selectHistory!.order.addressData as string);
        return {...prev, addr:addr, showDetail:true, selectHistory:selectHistory}
      }
      else {
        return {...prev}
      }
    })

}

async function AddToCart(productId:string){
  setState(prev => ({...prev, loading:true}));
  const {data, error} = await AddToUserCart(productId)
  if(error){
      toast.error(error || "มีบางอย่างผิดพลาด")
      setState(prev => ({...prev, loading:false}));
      return;
  }
  else {
      toast.success("เพิ่มเข้ารถเข็นสำเร็จแล้ว");
      setState(prev => ({...prev, loading:false}));
  }
}

async function handleRemoveFav(productId:string) {
  if(window.confirm(`คุณต้องการลบสินค้านี้ออกจากสินที่ชอบใช่หรือไม่?`)){
    setState(prev => ({...prev, loading:true}));
    const {data, error} = await DeleteFav(productId);
    if(error){
      toast.error(error || "มีบางอย่างผิดพลาด");
      setState(prev => ({...prev, loading:false}));
    }
    else {
      toast.success("นำสินค้าออกจากสินค้าที่ชอบแล้ว")
      setState(prev => ({...prev, loading:false, }));
      setSecondState(prev => ({...prev, fav:prev.fav.filter((item) => item.product_id !== productId)}))
    }
  }
  
}

async function loadFav() {
  setState(prev => ({...prev, loading:true}));
  
  const {data, error} = await GetFav();
  if(error || !data?.fav){
    toast.error(error || "มีบางอย่างผิดพลาด");
    setState(prev => ({...prev, loading:false}));
  }
  else {
    setState(prev => ({...prev, loading:false, }));
    setSecondState(prev => ({...prev, fav:data.fav}))
  }

}

async function loadHistory() {
  // setState(prev => ({...prev, loading:true}));
  
  const {data, error} = await GetHis();
  // console.log(data)
  if(error || !data?.history){
    toast.error(error || "มีบางอย่างผิดพลาด");
    setState(prev => ({...prev, loading:false}));
  }
  else {
    setState(prev => ({...prev, loading:false }));
    setThirdState(prev => ({...prev, history:data.history}))
  }

}

async function loadOrder() {
  setState(prev => ({...prev, loading:true}));
  
  const {data, error} = await GetOrderOnWaiting();
  if(error || !data?.order){
    toast.error(error || "มีบางอย่างผิดพลาด");
    setState(prev => ({...prev, loading:false}));
  }
  else {
    setState(prev => ({...prev, loading:false, }));
    setFirstState(prev => ({...prev, order:data.order}))
  }

}


function handleTab(index:number){
  setState(prev => ({...prev, index:index}))
}

function SelectTab () {
  switch (state.index) {
      case 0:
        return <FirstTab/>
        case 1:
          return  <SecondTab/>
      case 2:
          return <ThirdTab/>
      default:
          return <FirstTab/>
  }
}


};
