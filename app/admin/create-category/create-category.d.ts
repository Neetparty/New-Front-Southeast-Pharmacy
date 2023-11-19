export type FormState = {
    category_th:string;
    category_en:string;
    category_cn:string;
}

export interface TableState {
    category:Category[];
    loading:boolean;
    select : "setting" | "update" | "delete" | string;
    index:number;
    search: string;
}


type Category = {
    category_id:string;
    category_name:string;
    category_name_en:string;
    category_name_ch:string;
    updated_at:string;
    created_at:string;
}


