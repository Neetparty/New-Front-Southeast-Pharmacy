

export interface ListUserState {
    user:User[];
    loading:boolean;
    select : "setting" | "update" | "delete" | string;
    index:number;
    search: string;
    currentPage: number;
    countUser:number
}

export type User = {
    user_id: string;
    user_name: string;
    email:string;
    role: string;
    image: string;
    created_at:string;
}
