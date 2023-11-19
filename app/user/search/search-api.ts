import { makeRequest } from "@/app/hook/makeRequest";
import { TypeProduct } from "./searchType";

export async function SearchProductUser(search:string, categoryId:string, lang:string) {
    return await makeRequest<{product:TypeProduct[], msg:string}>(`/user-search-product?search=${search}&cate=${categoryId}&lang=${lang}`,{
        method:"GET"
    }) 
}