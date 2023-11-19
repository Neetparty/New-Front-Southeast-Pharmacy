"use client"
import React, { useState, createContext, useContext, useEffect } from 'react';
import { FormState  } from './create-product';
import { toast } from 'react-toastify';
import { GetCategory } from '../create-category/category-api';
import { CreateProduct } from './create-product-api';
const CreateProductContext = createContext<CreateProductContext | null>(null);

export interface CreateProductContext {
    state: FormState;
    setState: React.Dispatch<React.SetStateAction<FormState>>;
    onSubmit: (e:React.FormEvent<HTMLFormElement>) => Promise<void>;
    handleImageChange: (e:React.ChangeEvent<HTMLInputElement>) => void;
    handleTab:(index:number) => void;
    thHandler:(e:React.ChangeEvent<HTMLInputElement>) => void;
    handleRemoveImage:(index:number) => void;
    handleSubImageChange:(e:React.ChangeEvent<HTMLInputElement>) => void;
    handleRemoveSubImage: (index:number) => void;
}
  

export function useCreateProduct(): CreateProductContext | null {
  const context = useContext(CreateProductContext);
  return context;
}

export const CreateProductProvider = ({ children }: { children: React.ReactNode }) => {
    const [state, setState] = useState<FormState>({
        product_id: "p-100",
        product_th:"พาราเซตาม่อล",
        product_en:"Paracetamol",
        product_cn:"พาราเซตาม่อลจีน",
        isSpecial: false,
        index:0,
        promotion_status:true,
        price: 50,
        quantity: 20,
        promotion_price: 40,
        desc: "คำอธิบายยาพาราภาษาไทย",
        desc_en: "คำอธิบายยาพาราภาษาอังกฤษ",
        desc_ch: "คำอธิบายยาพาราภาษาจีน",
        warning_status:true,
        warning:"คำเตือนยาพาราภาษาไทย",
        warning_en: "คำเตือนยาพาราภาษาอังกฤษ",
        warning_cn: "คำเตือนยาพาราภาษาจีน",
        weight: 0.5,
        category: [],
        loading:false,
        cateId: "none",
        images:[],
        imageURLs:[],
        subImages: [],
        subImageURLs:[],
        submit: false,
    })

    useEffect(() => {
        LoadData()
    }, [])
    useEffect(() => {
        if (state.images.length < 1) return;
        //@ts-ignore
        const newImageUrls = [];
        //@ts-ignore
        state.images.forEach((image) => newImageUrls.push(URL.createObjectURL(image)));
        //@ts-ignore
        setState(prev=>({...prev,imageURLs:[newImageUrls[0]]}))
    }, [state.images]);
 
    useEffect(() => {
        if (state.subImages.length < 1) return;
        //@ts-ignore
        const newImageUrls = [];
        //@ts-ignore
        state.subImages.forEach((image) => newImageUrls.push(URL.createObjectURL(image)));
        //@ts-ignore
        setState(prev=>({...prev,subImageURLs:newImageUrls}))
    }, [state.subImages]);




  return (
    
    <CreateProductContext.Provider
      value={{
        state,
        setState,
        thHandler,
        handleImageChange,
        handleRemoveImage,
        handleTab,
        handleSubImageChange,
        handleRemoveSubImage,
        onSubmit,
      }}
    >
      {children}
    </CreateProductContext.Provider>
  );



async function onSubmit(e:React.FormEvent<HTMLFormElement>){
    e.preventDefault();
    setState(prev => ({...prev, loading: true}));
    const {cateId, desc, desc_ch, 
      desc_en, images, subImages, price, product_cn, 
      product_en, product_th, promotion_price, 
      promotion_status, quantity, warning, warning_cn, 
      product_id, warning_en, warning_status, weight, isSpecial} = state;

    let err = Validation()  
    if(err){
      return
    }
    
    const {data, error} = await CreateProduct(
      product_id, cateId, desc, desc_ch, 
      desc_en, images, subImages, price, product_cn, 
      product_en, product_th, promotion_price, 
      promotion_status, quantity, warning, warning_cn, 
      warning_en, warning_status, weight, isSpecial
    )



    // console.log(data)
    if(error) {
      toast.error(error);
      setState(prev => ({...prev, loading: false}));
      return;
    }
    else {
      toast.success("สินค้านี้ได้ถูกสร้างแล้วเรียบร้อย")
      // router.push("/admin/list-product", {scroll: false})
      setState(prev => ({...prev, loading: false, submit: true}));
    }
    

}
  

function Validation(): boolean {
  const {cateId, desc, desc_ch, 
    desc_en, images, subImages, price, product_cn, 
    product_en, product_th, product_id, promotion_price, 
    quantity, weight} = state;

  if (typeof cateId !== 'string' || cateId.trim() === 'none') {
    toast.error("ดูเหมือนคุณยังไม่ได้เลือกหมวดหมู่");
    setState(prev => ({ ...prev, loading: false }));
    return true;
  }
  
  const stringParams = [
    { value: product_id, field: 'รหัสสินค้า' },
    { value: product_th, field: 'ชื่อสินค้า (ภาษาไทย)' },
    { value: product_en, field: 'ชื่อสินค้า (ภาษาอังกฤษ)' },
    { value: product_cn, field: 'ชื่อสินค้า (ภาษาจีน)' },
    { value: desc, field: 'คำอธิบาย (ภาษาไทย)' },
    { value: desc_ch, field: 'คำอธิบาย (ภาษาจีน)' },
    { value: desc_en, field: 'คำอธิบาย (ภาษาอังกฤษ)' },
  ];
  
  for (const param of stringParams) {
    if (typeof param.value !== 'string' || param.value.trim() === '') {
      toast.error(`ดูเหมือนคุณยังไม่ได้กรอก ${param.field}`);
      setState(prev => ({ ...prev, loading: false }));
      return true;
    }
  }
  
  if (!Array.isArray(images) || !Array.isArray(subImages) || images.length === 0 || subImages.length === 0) {
    toast.error("ดูเหมือนว่าคุณจะยังไม่ได้อัพโหลดรูปภาพ");
    setState(prev => ({ ...prev, loading: false }));
    return true;
  }
  
  const numericParams = [
    { value: price, field: 'ราคา' },
    { value: quantity, field: 'จำนวนสต็อก' },
    { value: weight, field: 'น้ำหนัก' },
  ];
  
  for (const param of numericParams) {
    if (typeof param.value !== 'number' || isNaN(param.value) || param.value <= 0) {
      toast.error(`ดูเหมือนจะมี ${param.field} ที่ยังไม่มีค่า`);
      setState(prev => ({ ...prev, loading: false }));
      return true;
    }
  }
  
  return false;
}
  
  
  async function LoadData() {
      setState(prev => ({...prev, loading:true}));
      const {data,error} = await GetCategory();
      // console.log(data)
      if(error || !data ||data.category.length === 0){
          toast.error(error || "error");
          setState(prev => ({...prev, loading:false}));
          return;
      }
      else {
        //   @ts-ignore
          setState(prev => ({...prev, category:data.category, loading:false}))
        //   toast.success("Get Data successfull")
      }
  }
  
  function handleImageChange(e:React.ChangeEvent<HTMLInputElement>) {
      //@ts-ignore  
    setState(prev=>({...prev,images:[...e.target.files]}))
  }
  
  function handleSubImageChange(e:React.ChangeEvent<HTMLInputElement>) {
      //@ts-ignore  
    setState(prev=>({...prev,subImages:[...e.target.files]}))
  }
  
  function handleTab(index:number) {
      setState(prev => ({...prev, index:index}))
  }
  function thHandler(e:React.ChangeEvent<HTMLInputElement>) {
      setState(prev => ({...prev, product_th:e.target.value}))
  }
  function handleRemoveImage (index:number) {
      const temp1 = state.images;
      const temp2 = state.imageURLs;
      temp1.splice(index,1);
      temp2.splice(index,1);
      setState(prev => ({...prev,images:temp1, imageURLs:temp2}));
  }

  function handleRemoveSubImage (index:number) {
      const temp1 = state.subImages;
      const temp2 = state.subImageURLs;
      temp1.splice(index,1);
      temp2.splice(index,1);
      setState(prev => ({...prev,subImages:temp1, subImageURLs:temp2}));
  }
};