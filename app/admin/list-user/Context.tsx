"use client"
import React, { useState, createContext, useContext, useEffect } from 'react';
import { ListUserState, User } from './list-user';
import { DeleteUser, GetUser, SearchUser } from './user-api';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { Circular } from '@/app/component/Loading/Circular';
const AdminUserContext = createContext<AdminUserContextType | null>(null);

export interface AdminUserContextType {
  state: ListUserState;
  setState: React.Dispatch<React.SetStateAction<ListUserState>>;
  rowsPerPage: number;
  handleChangePage:(currentPage:number) => void;
  handleSearch:(e:React.MouseEvent<HTMLButtonElement>) => Promise<void>;
}
  

export function useAdminUser(): AdminUserContextType | null {
  const context = useContext(AdminUserContext);
  return context;
}
const rowsPerPage = 5; 

export const AdminUserProvider = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter()
    const [state, setState] = useState<ListUserState>({
        loading:false,
        search:"",
        user: [],
        select: "",
        index: -1,
        currentPage: 1,
        countUser: 0,
    })

    const handleChangePage = (currentPage:number) => {
      setState(prev => ({...prev, currentPage:currentPage}));
    }

    useEffect(() => {
      if (state.index !== -1 && state.select === "delete") {
        HandleDelete()
      }
      else if (state.index !== -1 && state.select === "update") {
        HandleUpdate()
      }
    }, [state.select])

    useEffect(() => {
      if(!state.search){
        LoadData()
      }
    }, [state.currentPage])
    
  return (
    
    <AdminUserContext.Provider 
    value={{
      state,
      setState,
      rowsPerPage,
      handleChangePage,
      handleSearch,
    }}>
      <Circular loading={state.loading}/>
      {children}
    </AdminUserContext.Provider>
  );

async function LoadData() {
  if(state.currentPage > state.currentPage-1){
    setState(prev => ({ ...prev, loading: true }));
    const { data, error } = await GetUser(state.currentPage, rowsPerPage, state.countUser);
    if (error || !data) {
      toast.error(error || "error");
      setState(prev => ({ ...prev, loading: false }));
      return;
    }
    else {
      setState(prev => ({ ...prev, user: data.user, loading: false, countUser:data.totalUsers }))
    }
  }
}

async function handleSearch(e:React.MouseEvent<HTMLButtonElement>) {
  e.preventDefault();
  if(state.search){

    setState(prev => ({ ...prev, loading: true }));
    const { data, error } = await SearchUser(state.search);
    if (error || !data) {
      toast.error(error || "error");
      setState(prev => ({ ...prev, loading: false }));
      return;
    }
    else {
      console.log(data.user.length)
      setState(prev => ({ ...prev, user: data.user, loading: false, countUser:data.user.length, currentPage:1 }))
    }
  }

}

async function HandleDelete() {
    setState(prev => ({ ...prev, loading: true }));
    let userId: string = "";
    let tempName: string = "";
    let tempUser: User[] = [];
    const { user, index } = state;

    user.forEach((elem, i) => {
      if (index === i) {
        userId = elem.user_id;
        tempName = elem.user_name
        return;
      }
    });


    if (window.confirm(`คุณต้องการผู้ใช้ ${tempName} ใช่ไหม`)) {
      const { data, error } = await DeleteUser(userId)
      if (error) {
        toast.error(error);
        setState(prev => ({ ...prev, loading: false }));
        return;
      }

      toast.success("ลบผู้ใช้เรียบร้อยแล้ว");
      for (let i = 0; i < user.length; i++) {
        if (user[i].user_id === userId && user[i] !== undefined) {
          continue;
        }
        else {
          tempUser.push(user[i]);
        }
      }
      setState((prev) => ({ ...prev, user: tempUser, loading: false, select: "setting", index: -1 }))
    }
    else {
      setState((prev) => ({ ...prev, loading: false, select: "setting", index: -1 }))
    }
  }

async function HandleUpdate() {
    let tempId: string = "";
    const { user, index } = state;

    user.forEach((elem, i) => {
        if (index === i) {
        tempId = elem.user_id;
        return;
        }
    });

    router.push(`/admin/update-user/${tempId}`, { scroll: false })

}


};
