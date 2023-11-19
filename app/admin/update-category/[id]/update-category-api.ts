import { makeRequest } from "@/app/hook/makeRequest";
import { Category } from "../../create-category/create-category";

export async function UpdateCategory(cateId:string, category_th: string, category_en: string, category_cn: string) {
    return await makeRequest<Category[]>(`/update-category/${cateId}`, {
        method:"PUT",
        data:{
            category_th: category_th,
            category_en: category_en,
            category_cn: category_cn
        }
    })
}

export async function GetCategory(cateId: string) {
    return await makeRequest<{category: Category, msg:string}>(`/get-category/${cateId}`, {
        method:"GET",
        data: {
            cateId : cateId
        }
    })
}

