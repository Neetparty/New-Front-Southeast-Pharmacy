import { Category } from "../../create-category/create-category";
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
    quantity: number;
    promotion_price: number;
    desc: string;
    desc_en:string;
    desc_ch:string;
    warning_status:boolean;
    warning: string;
    warning_en:string;
    warning_cn:string;
    weight: number;
    images:any[];
    imageURLs:string[];
    subImages: any[];
    subImageURLs: string[];
    submit: boolean;
    product: GetSingleProduct | null;
    is_special: boolean;
}

export type Product = {
    product_th:string;
    product_en:string;
    product_cn:string;
    category_id:string;
    price: number;
    quantity: number;
    promotion_price: number;
    desc: string;
    desc_en:string;
    desc_ch:string;
    warning_status:boolean;
    warning: string;
    warning_en:string;
    warning_cn:string;
    weight: number;
    image: string;
}

export type GetSingleProduct = {
    product_id:string;
    product_name:string;
    product_name_en:string;
    product_name_cn:string;
    category_id:string;
    price: number;
    quantity: number;
    promotion_price: number;
    promotion_status: boolean;
    description: string;
    description_en:string;
    description_cn:string;
    warning_status:boolean;
    warning: string;
    warning_en:string;
    warning_cn:string;
    weight: number;
    image: string;
    sub_image_products: {
        sub_image: string;
    }[];
    is_special:boolean;
}


