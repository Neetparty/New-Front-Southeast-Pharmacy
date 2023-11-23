"use client"
import axios, { AxiosRequestConfig, CancelTokenSource } from "axios"
import { session } from "./session";

const source:CancelTokenSource = axios.CancelToken.source();


type MakeRequest<T> = {
  error: any;
  data: T | null;
}

export async function makeRequest<T>(url:string, options:AxiosRequestConfig): Promise<MakeRequest<T>> {
  
  const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_APP_BACKEND_URL,
    withCredentials: true,
    cancelToken: source.token,
  })


  api.interceptors.request.use((config) => {
    const token: string = localStorage.getItem('token') as string

    config.headers["authorization"] = `${token}`
    config.headers["Content-Type"] = "application/json"
    config.headers["Accept"] = "application/json"
    return config
  })

  // api.interceptors.response.use((res) => {
  //   return res
  // }, async (error) => {
  //   const originalRequest = error.config
  //   if (error.response.status === 403 && !originalRequest._retry) {
  //     const refresher: string = localStorage.getItem('refresher') as string
  //     originalRequest._retry = true
  //     const result = await session(refresher)
  //     originalRequest.headers["authorization"] = `Bearer ${result?.accessToken}`
  //     return api(originalRequest)
  //   }
  //   return Promise.reject(error)
  // })

  try {
    const res = await api<T>(url, options);
    return { error: null, data: res.data };
  } catch (err:any) {
    return { error:  err.response?.data?.msg || "Something Went Wronge Try Again Later", data: err.response?.data?.data };
  }
}
