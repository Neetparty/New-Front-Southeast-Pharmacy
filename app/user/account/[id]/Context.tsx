"use client"
import React, { useState, createContext, useContext, useEffect, useRef } from 'react';
import { FirstTabState, ForthState } from './account';
import { UserRedux } from '@/app/GlobalRedux/Features/Feature';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { GetNotiUesr, GetUser, UpdateUserInfo } from './account-api';
import { useParams } from 'next/navigation';
import { selectUserData } from '@/app/GlobalRedux/Features/selector';
import { Circular } from '@/app/component/Loading/Circular';
import { useTranslation } from 'react-i18next';
// import { FormState  } from './order';
// import { toast } from 'react-toastify';
// import { useRouter } from 'next/navigation';
const UserAccountContext = createContext<UserAccountContextType | null>(null);

interface UserAccountState {
  loading:boolean;
  index:number
}

export interface UserAccountContextType {
  state: UserAccountState;
  setState: React.Dispatch<React.SetStateAction<UserAccountState>>;
  firstTab: FirstTabState;
  setFirstTab: React.Dispatch<React.SetStateAction<FirstTabState>>;
  forthState: ForthState;
  setForthState: React.Dispatch<React.SetStateAction<ForthState>>;
  user_name: React.MutableRefObject<HTMLInputElement | null>;
  first_name: React.MutableRefObject<HTMLInputElement | null>;
  last_name: React.MutableRefObject<HTMLInputElement | null>;
  onSubmitFirstTab:(e:React.FormEvent<HTMLFormElement>) => Promise<void>;
  handleImageChange:(e:React.ChangeEvent<HTMLInputElement>) => void;
  LoadData:() => void;
  user:UserRedux;
  rowsPerPage:number;
}
  

export function useUserAccount(): UserAccountContextType | null {
  const context = useContext(UserAccountContext);
  return context;
}

export const UserAccountProvider = ({ children }: { children: React.ReactNode }) => {
  const rowsPerPage = 10;
  const user = useSelector(selectUserData);
  const {t} = useTranslation();
  const {id} = useParams();
    const [state, setState] = useState<UserAccountState>({
      loading:false,
      index: Number(id) || 0,
    })

    const [firstTab, setFirstTab] = useState<FirstTabState>({
        loading:false,
        images: [],
        imageURLs: [user.image || "https://res.cloudinary.com/dzz6rgxkl/image/upload/v1694005889/pharmacy/fu6dbal3tfbyvisdvleo.png"],
    })

    const user_name = useRef<HTMLInputElement | null>(null);
    const first_name = useRef<HTMLInputElement | null>(null);
    const last_name = useRef<HTMLInputElement | null>(null);

    const [forthState, setForthState] = useState<ForthState>({
        currentPage: 1,
        countNoti: 0,
        notiData:[]
    })

    
    


    // useEffect(() => {
    //   if(state.index === 0 && firstState.order.length === 0){
    //     loadOrder();
    //   }
    //   else if(state.index === 1 && secondState.fav.length === 0){
    //     loadFav();
    //   }
    //   else if(state.index === 2 && thirdState.history.length === 0){
    //     loadHistory();
    //   }
      
    // }, [state.index])

    useEffect(() => {
      // if(!user.user_id){
      //   toast.info(t("nouser"))
      // }
      // else 
      if((!user_name.current?.value || !first_name.current?.value || !last_name.current?.value) && state.index === 0){
        LoadData()
      }
    }, [state.index])

    
    useEffect(() => {
      if(user.user_id.length > 2 && state.index === 3 && forthState.notiData.length === 0){
          LoadNoti();
      }
    }, [forthState.currentPage])

  return (
    
    <UserAccountContext.Provider 
    value={{
      state,
      setState,
      firstTab,
      setFirstTab,
      first_name,
      last_name,
      user_name,
      handleImageChange,
      LoadData,
      onSubmitFirstTab,
      user,
      setForthState,
      forthState,
      rowsPerPage,
    }}>
      <Circular loading={state.loading} />
      {children}
    </UserAccountContext.Provider>
  );




async function LoadNoti () {
    setState(prev => ({...prev, loading:true}));
    const {data, error} = await GetNotiUesr(forthState.currentPage, rowsPerPage, forthState.countNoti);
    if(error || !data || !data.totalNoti){
        toast.error(error);
        setState(prev => ({...prev, loading:false}));
        return;
    }
    else {
        setForthState(prev => ({...prev, notiData:data.noti, countNoti:data.totalNoti}));
        setState(prev => ({...prev, loading:false}));
      
    }
  
}
function handleImageChange(e:React.ChangeEvent<HTMLInputElement>) {
  //@ts-ignore  
  setFirstTab(prev=>({...prev,images:[...e.target.files]}))
}

async function LoadData() {
    setState(prev => ({ ...prev, loading: true }));
    
    const { data, error } = await GetUser();
    
    if (!data || !data.user || error) {
      toast.error("User data not found");
      setState(prev => ({ ...prev, loading: false }));
    } else  {
      setFirstTab(prev => ({
        ...prev,
        imageURLs: [data.user.image]
      }));
      if(user_name.current){
        user_name.current.value = data.user.user_name;
      }
      if(first_name.current){
        first_name.current.value = data.user.first_name;
      }
      if(last_name.current){
        last_name.current!.value = data.user.last_name;
      }
      setState(prev => ({ ...prev, loading: false }));
    }
}

async function onSubmitFirstTab(e:React.FormEvent<HTMLFormElement>) {
  e.preventDefault();
  
  const { images, imageURLs } = firstTab;
  
  if(!first_name.current?.value || !last_name.current?.value || !user_name.current?.value){
    toast.error("คุณจำเป็นต้องกรอกข้อมูลให้ครบก่อน")
  }

  else {
    
    setState(prev => ({...prev, loading:true}));
    const { data, error } = await UpdateUserInfo(user_name.current.value, first_name.current.value, last_name.current.value, images[0], images.length === 0 ? false : true);
    
    if (!data || error) {
      toast.error("Failed to update user");
      setState(prev => ({...prev, loading:false}));
    } 
    else {
      setState(prev => ({...prev, loading:false}));
      toast.success("User updated successfully");
    }
  }
}

};
