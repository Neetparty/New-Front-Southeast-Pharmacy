import { BannerRedux, CategoryRedux } from "@/app/GlobalRedux/Features/Feature";
import { makeRequest } from "@/app/hook/makeRequest";

export async function RegisterWithGoogle(email:string, first_name: string, last_name:string, imageUrl:string, googleId:string) {
    return await makeRequest<{
        msg:string, 
        user:{
            email: string;
            first_name: string;
            last_name: string;
            user_name: string;
            role: string;
            image: string;
            user_id: string;
    }}>("/register-email", {
        method:"POST",
        data:{
            email,
            first_name,
            last_name,
            imageUrl,
            googleId
        }
    })
}

export async function RegisterWithPWD(email:string, first_name: string, last_name:string, password:string) {
    return await makeRequest<{
        msg:string, 
        user:{
            email: string;
            first_name: string;
            last_name: string;
            user_name: string;
            role: string;
            image: string;
            user_id: string;
    }}>("/register", {
        method:"POST",
        data:{
            email,
            first_name,
            last_name,
            password,
        }
    })
}

export async function Login(email:string, password: string) {
    return await makeRequest<{
        msg:string, 
        user:{
            email: string;
            first_name: string;
            last_name: string;
            user_name: string;
            role: string;
            image: string;
            user_id: string;
    }, token:string}>("/login", {
        method:"POST",
        data:{
            email,
            password,
        }
    })
}

export async function GetCurrentUser(category:CategoryRedux, banner:BannerRedux) {
    return await makeRequest<{
        msg:string, 
        user:{
            email: string;
            first_name: string;
            last_name: string;
            user_name: string;
            role: string;
            image: string;
            user_id: string;
        },
        category:CategoryRedux,
        banner:BannerRedux,
}>(`/current-user?cate=${category.length}&banner=${banner.length || 0}`, {
        method:"GET",
    })
}
export async function GetBannerAndCategory(category:CategoryRedux, banner:BannerRedux) {
    return await makeRequest<{
        msg:string, 
        category:CategoryRedux,
        banner:BannerRedux,
}>(`/banner-category`, {
        method:"GET",
    })
}


export async function LogOut() {
    return await makeRequest("/sign-out", {
        method:"GET"
    })
}