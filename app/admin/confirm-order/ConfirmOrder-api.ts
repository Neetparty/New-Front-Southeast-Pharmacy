import { makeRequest } from "@/app/hook/makeRequest";
import { Order } from "./ConfirmOrder";


export async function ListOrder(status:"waiting" | "sending" | "success" | "cancel", currentPage:number, rowPerPages:number, count:number ) {
    return await makeRequest<{order: Order[], msg:string, totalOrder:number}>(`/list-order?status=${status}&page=${currentPage}&perPage=${rowPerPages}&count=${count}`, {
        method:"GET"
    })
}

export async function ListOrderBySearch(text:string) {
    return await makeRequest<{order: Order[], msg:string}>(`/search-order?search=${text}`, {
        method:"GET"
    })
}

