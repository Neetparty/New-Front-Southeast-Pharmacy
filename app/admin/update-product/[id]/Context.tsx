"use client"
import React, { useState, createContext, useContext, useEffect } from 'react';
import { FormState  } from './update-product';
import { toast } from 'react-toastify';
import { GetCategory, GetProduct, UpdateProduct } from './update-product-api';
import { useParams } from 'next/navigation'
import { Circular } from '@/app/component/Loading/Circular';

const UpdateProductContext = createContext<UpdateProductContext | null>(null);

export interface UpdateProductContext {
    state: FormState;
    setState: React.Dispatch<React.SetStateAction<FormState>>;
    onSubmit: (e:React.FormEvent<HTMLFormElement | HTMLButtonElement>) => Promise<void>;
    handleImageChange: (e:React.ChangeEvent<HTMLInputElement>) => void;
    handleTab:(index:number) => void;
    thHandler:(e:React.ChangeEvent<HTMLInputElement>) => void;
    handleRemoveImage:(index:number) => void;
    handleSubImageChange:(e:React.ChangeEvent<HTMLInputElement>) => void;
    handleRemoveSubImage: (index:number) => void;
}
  

export function useUpdateProduct(): UpdateProductContext | null {
  const context = useContext(UpdateProductContext);
  return context;
}
export const UpdateProductProvider = ({ children }: { children: React.ReactNode }) => {
    const {id} = useParams();
    
    const [state, setState] = useState<FormState>({
        product_id: "",
        product_th:"",
        product_en:"",
        product_cn:"",
        index:0,
        promotion_status:false,
        price: 0,
        quantity: 0,
        promotion_price: 0,
        desc: "",
        desc_en: "",
        desc_ch: "",
        warning_status:false,
        warning:"",
        warning_en: "",
        warning_cn: "",
        weight: 0,
        category: [],
        loading:false,
        cateId: "none",
        images:[],
        imageURLs:[],
        subImages: [],
        subImageURLs:[],
        submit: false,
        product: null,
        is_special: false,
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

    console.log(state)

  return (
    
    <UpdateProductContext.Provider
      value={{
        state,
        setState,
        thHandler,
        handleImageChange,
        handleRemoveImage,
        handleTab,
        handleSubImageChange,
        handleRemoveSubImage,
        onSubmit
      }}
    >
      <Circular
      loading={state.loading}
      />
      {children}
    </UpdateProductContext.Provider>
  );



  async function onSubmit(e:React.FormEvent<HTMLFormElement | HTMLButtonElement>){
      e.preventDefault();
      setState(prev => ({...prev, loading: true}));
      const {cateId, desc, desc_ch, 
        desc_en, images, subImages, price, product_cn, 
        product_en, product_th, promotion_price, 
        promotion_status, quantity, warning, warning_cn, 
        product_id, warning_en, warning_status, weight, product, is_special} = state;

      let err = Validation()  
      if(err){
        return
      }
      let removeImage:string[] = []
      if(images.length !== 0){
        removeImage.push(product?.image as string)
      }
      if(subImages.length !== 0){
        product?.sub_image_products.forEach((item) => {
          removeImage.push(item.sub_image)
        })
      }

      let originalSub:string[] = [] 
      product?.sub_image_products.forEach((elem) => {
        originalSub.push(elem.sub_image)
      })

      
      const {data, error} = await UpdateProduct(
        product_id, cateId, desc, desc_ch, 
        desc_en, images, subImages, price, product_cn, 
        product_en, product_th, promotion_price, 
        promotion_status, quantity, warning, warning_cn, 
        warning_en, warning_status, weight,
        removeImage, is_special
      )
  
      if(error) {
        toast.error(error);
        setState(prev => ({...prev, loading: false}));
        return;
      }
      else {
        toast.success("สินค้านี้ได้ถูกอัพเดตแล้วเรียบร้อย")
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
      if(error || !data ||data.category.length === 0){
          toast.error(error || "error");
          setState(prev => ({...prev, loading:false}));
          return;
        }
        else {
            const {data:product, error:errorProduct} = await GetProduct(id as string);
            if(errorProduct || !product){
                toast.error(errorProduct || "error");
                setState(prev => ({...prev, loading:false}));
            }
            else {
                const {category_id, description, description_cn, description_en, image, price, product_name_cn, product_name_en,
                 product_id, product_name, promotion_price, quantity, sub_image_products, warning, warning_cn, warning_en, warning_status, weight, promotion_status, is_special} = product.product

                  let urlSub:string[] = [];
                  sub_image_products.forEach((item) => {
                    urlSub.push(item.sub_image)
                  })
                setState(prev => ({...prev, 
                  product:product.product,
                  category:data.category,
                   loading:false,
                   cateId:category_id,
                   desc:description,
                   desc_ch:description_cn,
                   desc_en:description_en,
                   imageURLs:[...prev.imageURLs,image],
                   price:price,
                   product_cn: product_name_cn,
                   product_en:product_name_en,
                   product_id:product_id,
                   product_th:product_name,
                    promotion_price:promotion_price,
                   subImageURLs:[...prev.subImageURLs,
                     ...urlSub],
                   quantity:quantity,
                   promotion_status:promotion_status,
                   warning_status:warning_status,
                   warning:warning,
                   warning_cn:warning_cn,
                   warning_en:warning_en,
                   weight:weight,
                   is_special:is_special
                   }))
            }
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
