import { makeRequest } from "@/app/hook/makeRequest"
import { ListProduct } from "./list-product";

export async function GetProductData (page:number, perPage:number, count:number) {
    return await makeRequest<{
        product:ListProduct[],
        msg:string,
        totalProduct:number
    }>(`/list-product?page=${page}&perPage=${perPage}&count=${count}`, {
        method:"GET"
    })
}

export async function DeleteProduct(productId: string) {
    return await makeRequest(`/delete-product/${productId}`, {
        method:"DELETE"
    })
}

export async function SearchProduct(search:string) {
    return await makeRequest<{product: ListProduct[], msg: string}>(`/search-product?search=${search}`, {
        method:"GET"
    })
}
