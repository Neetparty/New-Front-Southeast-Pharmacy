"use client"
import axios, { AxiosRequestConfig, CancelTokenSource } from "axios"

const source:CancelTokenSource = axios.CancelToken.source();

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_APP_BACKEND_URL,
  withCredentials: true,
  cancelToken : source.token,
})

type MakeRequest<T> = {
  error: any;
  data: T | null;
}

export async function makeRequest<T>(url:string, options:AxiosRequestConfig): Promise<MakeRequest<T>> {
  try {
    const res = await api<T>(url, options);
    return { error: null, data: res.data };
  } catch (err:any) {
    return { error:  err.response?.data?.msg || "Something Went Wronge Try Again Later", data: err.response?.data?.data };
  }
}
