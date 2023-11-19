import { makeRequest } from "@/app/hook/makeRequest";



export async function GetOrderData() {
    return await makeRequest("/list-order", {
        method:"GET"
    })
}



