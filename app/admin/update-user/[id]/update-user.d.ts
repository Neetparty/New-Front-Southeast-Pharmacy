export type FormState = {
    role: "admin" | "user" | "special";
    loading:boolean;
}

export type UserReponse = {
    email:string;
    first_name:string;
    image:string;
    role: "admin" | "user" | "special";
    user_name:string;
    user_id:string
    last_name:string;
}
