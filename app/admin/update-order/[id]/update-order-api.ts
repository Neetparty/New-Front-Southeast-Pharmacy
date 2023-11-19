import { makeRequest } from "@/app/hook/makeRequest";
import { Address, Order } from "./update-order";


export async function GetOrder(Order_id: string) {
    return await makeRequest<{order: Order, msg:string}>(`/get-order/${Order_id}`, {
        method:"GET"
    })
}

export async function GetAddress(Address_id: string) {
    return await makeRequest<{address: Address, msg:string}>(`/get-address/${Address_id}`, {
        method:"GET"
    })
}

export async function UpdateOrder(orderId:string, addr:string, note:string, status:string, tracking_number:string, tracking_url:string, productId:string[]) {
    return await makeRequest<{ order: Order, msg: string }>(`/update-order/${orderId}`, {
        method:"PUT",
        data:{
            address:addr,
            note:note,
            status:status,
            tracking_number,
            tracking_url,
            productId: productId,
        }
    })
}