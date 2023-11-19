import { makeRequest } from "@/app/hook/makeRequest";
import { Product } from "./Shopping-cart";

export async function GetCart() {
    return await makeRequest<{
        msg:string, 
        cart:{
            product:Product[]
        }
    }>("/get-cart", {
        method:"GET"
    })
}

export async function DeleteCartProduct(productId:string) {
    return await makeRequest<{
        msg:string, 
    }>(`/delete-cart-product/${productId}`, {
        method:"DELETE"
    })
}