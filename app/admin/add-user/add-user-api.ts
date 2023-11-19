import { makeRequest } from "@/app/hook/makeRequest";


export async function CreateUser(user_name: string, email: string, first_name: string, last_name: string, password: string, role: string) {

    return await makeRequest("/create-user", {
        method: "POST",
        data: {
            user_name:user_name,
            email:email,
            first_name:first_name,
            last_name:last_name,
            password:  password,
            role:role,
        }
    })

}