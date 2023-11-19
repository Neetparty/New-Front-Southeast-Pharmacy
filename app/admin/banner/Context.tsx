"use client"
import React, { useState, createContext, useContext, useEffect } from 'react';
import { CreateBanner, DeleteExistBanner, GetBanner } from './banner-api';
import { toast } from 'react-toastify';
import { BannerItem } from './bannertype';
import { Circular } from '@/app/component/Loading/Circular';
const BannerContext = createContext<BannerContextType | null>(null);

export interface BannerContextType {
    state: BannerState;
    setState: React.Dispatch<React.SetStateAction<BannerState>>;
    handleImageChange:(e:React.ChangeEvent<HTMLInputElement>) => void;
    handleRemoveImage:(index:number) => void;
    handleSubmit:(e:React.FormEvent<HTMLFormElement | HTMLButtonElement>) => Promise<void>;
    handleRemoveExistBanner:(banner:BannerItem) => Promise<void>;
}
  

export function useBanner(): BannerContextType | null {
  const context = useContext(BannerContext);
  return context;
}

interface BannerState {
    loading:boolean;
    images: any[];
    imageURLs: any[];
    currentImage: BannerItem[];
}

export const BannerProvider = ({ children }: { children: React.ReactNode }) => {
    // const router = useRouter()
    const [state, setState] = useState<BannerState>({
      loading:false,
      images:[],
      imageURLs: [],
      currentImage: [],
    })

    useEffect(() => {
        if (state.images.length < 1) return;
        //@ts-ignore
        const newImageUrls = [];
        //@ts-ignore
        state.images.forEach((image) => newImageUrls.push(URL.createObjectURL(image)));
        //@ts-ignore
        setState(prev => ({ ...prev, imageURLs: newImageUrls }))
    }, [state.images]);


    useEffect(() => {
      
      LoadData();

    }, [])
    
    async function LoadData() {
      setState(prev => ({...prev, loading:true}));
      const {data, error} = await GetBanner();
      if(error || !data?.banner){
        toast.error(error || "Something went wrong try again later")
        setState(prev => ({...prev, loading:false}));
      }
      else {
        setState(prev => ({...prev, currentImage:data.banner, loading:false}))

      }
    }

    function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
        //@ts-ignore  
        setState(prev => ({ ...prev, images: [...e.target.files] }))
    }

    function handleRemoveImage(index: number) {
        const temp1 = state.images;
        const temp2 = state.imageURLs;
        temp1.splice(index, 1);
        temp2.splice(index, 1);
        setState(prev => ({ ...prev, images: temp1, imageURLs: temp2 }));
    }


    async function handleSubmit(e:React.FormEvent<HTMLFormElement | HTMLButtonElement>) {
        e.preventDefault();
        setState(prev => ({...prev, loading:true}));
        
        const {data, error} = await CreateBanner(state.images);
        
        if(error || !data?.banner){
          toast.error(error || "มีบางอย่างผิดพลาดกับการอัพโหลด Banner");
          setState(prev => ({...prev, loading:false}));
        }
        else {
          setState(prev => ({...prev, loading:false, currentImage:[...data?.banner, ...prev.currentImage]}));
        }
        
      }

    async function handleRemoveExistBanner(banner:BannerItem) {
      if(window.confirm("คุณต้องการลบภาพ Banner นี้ใช่ไหม")){
        let publicId = banner.public_id.split("/")[2]
        const {data, error} = await DeleteExistBanner(publicId, banner);
        if(error){
          toast.error(error || "มีบางอย่างผิดพลาดกับการลบBanner");
          setState(prev => ({...prev, loading:false}));
        }
        else {
          toast.success("ลบรูปภาพสำเร็จแล้ว")
          setState(prev => ({...prev, loading:false, currentImage:prev.currentImage.filter((item) => item.public_id !== banner.public_id)}));
        }
      }

    }



  return (
    
    <BannerContext.Provider 
    value={{
      state,
      setState,
      handleImageChange,
      handleRemoveImage,
      handleSubmit,
      handleRemoveExistBanner
    }}>
      <Circular loading={state.loading} />
      {children}
    </BannerContext.Provider>
  );



};
