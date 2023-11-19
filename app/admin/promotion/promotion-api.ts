import { makeRequest } from "@/app/hook/makeRequest";
import { Product, Promotion } from "./promotion";


export async function ListPromotion() {
    return await makeRequest<{promotion: Promotion[], msg: string}>(`/list-promotion`, {
        method:"GET"
    })
}

export async function GetPromotion(Promotion_ID: string) {
    return await makeRequest<{promotion: Promotion, products: Product[], msg: string}>(`/get-promotion/${Promotion_ID}`, {
        method:"GET"
    })
}

export async function SearchProduct(search: string) {
    return await makeRequest<{products: Product[], msg: string}>(`/search-promotion-product?search=${search}`, {
        method:"GET"
    })
}

export async function CreatePromotion( promotion_th: string, promotion_en: string, promotion_cn: string ) {
    return await makeRequest<{promotion: Promotion, msg: string}>("/create-promotion", {
        method:"POST",
        data: {
            promotion_th, promotion_en, promotion_cn
        }

    })
}

export async function AddProductToPromotion( Promotion_ID: string, Data: any[] ) {
    return await makeRequest<{promotion_product: Product, msg: string}>(`/add-promotion-product/${Promotion_ID}`, {
        method:"POST",
        data: {
            Data
        }

    })
}

export async function DeletePromotionProduct( Promotion_ID: string, Product_ID:string) {
    return await makeRequest(`/delete-promotion-product/${Promotion_ID}`, {
        method:"DELETE",
        data: {
            Product_ID
        }

    })
}

export async function UpdatePromotionName(Promotion_ID: string, promotion_th: string, promotion_en: string, promotion_cn: string, isSpecial:boolean ) {
    return await makeRequest(`/update-promotion-name/${Promotion_ID}`, {
        method:"PUT",
        data: {
            promotion_th, 
            promotion_en, 
            promotion_cn,
            is_special:isSpecial
        }
    })
}


export async function DeletePromotiom(Promotion_ID: string ) {
    return await makeRequest(`/delete-promotion/${Promotion_ID}`, {
        method:"DELETE"
    })
}

export async function GetProduct(productName:string) {
    return await makeRequest<{msg:string, product:Product}>("/get-product?" + productName, {
        method:"GET",
    })
}


