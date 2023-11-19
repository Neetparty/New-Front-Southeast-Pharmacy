import { makeRequest } from "@/app/hook/makeRequest";
import { User } from "./list-user";


export async function GetUser(page:number, perPage:number, count:number) {
    
    return await makeRequest<{user: User[], msg: string, totalUsers:number}>(`/list-user?page=${page}&perPage=${perPage}&count=${count}`, {
        method:"GET"
    })
}


export async function SearchUser(search:string) {
    return await makeRequest<{user: User[], msg: string}>(`/search-user?search=${search}`, {
        method:"GET"
    })
}



export async function DeleteUser(user_id:string) {
    return await makeRequest<{msg: string}>(`/delete-user/${user_id}`, {
        method:"DELETE"
    })
}