export type FormState = {
    product_id:string;
    product_th:string;
    product_en:string;
    product_cn:string;
    index:number;
    promotion_status:boolean;
    category: Category[];
    loading:boolean;
    cateId:string;
    price: number;
    isSpecial:boolean;
    quantity: number;
    promotion_price: number;
    desc: string;
    warning_status:boolean;
    warning: string;
    weight: number;
    images:any[];
    imageURLs:string[];
    subImages: any[];
    subImageURLs: string[];
    desc_en:string;
    desc_ch:string;
    warning_en:string;
    warning_cn:string;
    submit: boolean;
}



export type Category = {
    category_id:string;
    category_name:string;
    category_name_en:string;
    category_name_ch:string;
    updated_at:string;
    created_at:string;
}


