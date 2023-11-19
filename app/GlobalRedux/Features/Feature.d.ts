export type UserRedux = {
    user_id:string;
    first_name:string;
    last_name:string;
    user_name:string;
    role:string;
    email:string;
    image:string;
}

export type CategoryRedux = {
    category_id:string;
    category_name:string;
    category_name_en:string;
    category_name_ch:string;
}[]

export type OrderRedux = {
    totalPrice:number; 
    totalProduct:number;
    product: ProductRedux[];
}

export type ProductRedux = {
    product_id: string;
    image: string;
    product_name: string;
    product_name_en: string;
    product_name_cn: string;
    quantity: number;
    price: number;
    totalProduct:number;
    weight: number;
    promotion_price:number;
    promotion_status:boolean;
}

export type BannerRedux = {
    image:string;
}[]