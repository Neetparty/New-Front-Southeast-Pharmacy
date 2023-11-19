"use client"
import { Circular } from '@/app/component/Loading/Circular';
import { makeRequest } from '@/app/hook/makeRequest';
import moment from 'moment';
import React, { useState, createContext, useContext, useEffect } from 'react';
// import { FormState  } from './order';
// import { toast } from 'react-toastify';
// import { useRouter } from 'next/navigation';
const AdminDasboardContext = createContext<AdminDasboardContextType | null>(null);

export interface AdminDasboardContextType {
    state: DashboardState;
    setState: React.Dispatch<React.SetStateAction<DashboardState>>;
}
  

export function useAdminDasboard(): AdminDasboardContextType | null {
  const context = useContext(AdminDasboardContext);
  return context;
}
export interface DashboardState {
    orderYear:number[];
    transactionYear: number[],
    totalProduct: number;
    totalUser: number;
    totalPrice: number;
    totalTransaction: number;
    year: string;
    loading: boolean;
  }
  
  interface ResponseDashboard {
    orderYear:number[][]
    transactionYear: number[][],
    msg: string;
    totalProduct: number;
    totalTransaction: number;
    totalUser: number;
    totalPrice: number;
  }

export const AdminDasboardProvider = ({ children }: { children: React.ReactNode }) => {
   

    const [state, setState] = useState<DashboardState>({
        orderYear: [],
        transactionYear: [],
        totalProduct: 0,
        totalPrice: 0,
        totalTransaction: 0,
        totalUser: 0,
        year: String(moment().year()),
        loading: false,
    })

    async function LoadData() {
      setState(prev => ({...prev, loading:true}));  
      const { data, error } = await makeRequest<ResponseDashboard>("/admin-dashboard-data?search="+moment().year(), {
        method: "GET"
      })

      if (data?.orderYear || data?.transactionYear) {
        setState((prev) => ({
          ...prev,
          loading:false,
          orderYear: data.orderYear.map((count, index) => (count !== null ? count : 0)) as number[],
          transactionYear: data.transactionYear.map((count, index) => (count !== null ? count : 0)) as number[],
                totalPrice: data.totalPrice,
                totalProduct: data.totalProduct,
                totalTransaction: data.totalTransaction,
                totalUser: data.totalUser
              }));
        }
        else {
          setState(prev => ({...prev, loading:false}));  
        }
    }
  
    async function HandleChangeYear() {
      setState(prev => ({...prev, loading:true}));  
        const {data, error} = await makeRequest<{  
            orderYear:number[][]
            transactionYear: number[][],
        }>("/admin-dashboard-year?search="+state.year, {
            method:"GET"
        })

        if (data?.orderYear || data?.transactionYear) {
            setState((prev) => ({
                ...prev,
                loading: false,
                orderYear: data.orderYear.map((count, index) => (count !== null ? count : 0)) as number[],
                transactionYear: data.transactionYear.map((count, index) => (count !== null ? count : 0)) as number[],
            }));
        }
        else {
          setState(prev => ({...prev, loading:false}));  
        }
    }

    useEffect(() => {
        LoadData()
    }, [])

    useEffect(() => {
      HandleChangeYear()
    }, [state.year])
    

    return (
    
    <AdminDasboardContext.Provider 
    value={{
      state,
      setState,
    }}>
      <Circular
      loading={state.loading}
      />
      {children}
    </AdminDasboardContext.Provider>
  );



};
