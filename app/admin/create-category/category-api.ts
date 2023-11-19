import { makeRequest } from "@/app/hook/makeRequest";
import { Category } from "./create-category";

export async function CreateCategory(category_th: string, category_en: string, category_cn: string) {

   return await makeRequest<{category: Category, msg:string}>("/create-category", {
        method:"POST",
        data:{
            category_th: category_th,
            category_en: category_en,
            category_cn: category_cn
        }
    }) 

}

export async function GetCategory() {
    return await makeRequest<{category:Category[], msg:string}>("/list-category", {
        method:"GET"
    })
}

export async function DeleteCategory(cateId:string) {
    return await makeRequest<Category[]>(`/delete-category/${cateId}`, {
        method:"DELETE"
    })
}


/* 
GET -> !req.body
POST -> req.body
PUT -> req.body
PATCH -> req.body
DELETE -> !req.body

*/
    