import { makeRequest } from "@/app/hook/makeRequest";
import { UserReponse } from "./update-user";


export async function UpdateUser(user_id:string, user_name: string, email: string, first_name: string, last_name: string, role: string) {

    return await makeRequest(`/admin-update-user/${user_id}`, {
        method: "PUT",
        data: {
            user_name:user_name,
            email:email,
            first_name:first_name,
            last_name:last_name,
            role:role
        }
    })

}

export async function LoadUserData(userId:string) {
    return await makeRequest<{user:UserReponse, msg:string}>(`/single-user/${userId}`, {
        method:"GET"
    })
}