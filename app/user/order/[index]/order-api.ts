import { makeRequest } from "@/app/hook/makeRequest";
import { DetailOrder, FavouriteProduct, OrderHistory, OrderProduct, OrderType } from "./order";

export async function GetOrderOnWaiting() {
    return await makeRequest<{msg:string, order:OrderType[]}>("/user-list-order", {
        method:"GET"
    })
}

export async function GetFav() {
    return await makeRequest<{msg:string, fav:FavouriteProduct[]}>("/user-fav", {
        method:"GET"
    })
}

export async function GetHis() {
    return await makeRequest<{msg:string, 
    history:OrderHistory[]}>("/user-his", {
        method:"GET"
    })
}

export async function DeleteFav(productId:string) {
    return await makeRequest<{msg:string, fav:FavouriteProduct[]}>(`/user-del-fav/${productId}`, {
        method:"DELETE"
    })
}

export async function GetOrderDetail(orderId:string) {
    return await makeRequest<{msg:string, order:DetailOrder}>(`/user-order/${orderId}`, {
        method:"GET"
    })
    
}