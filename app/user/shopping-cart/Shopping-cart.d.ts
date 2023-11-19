export type Product = {
    product_id: string;
    image: string;
    product_name: string;
    product_name_en: string;
    product_name_cn: string;
    description: string;
    description_en: string;
    description_cn: string;
    quantity: number;
    price: number;
    check: boolean;
    totalProduct: number;
    weight: number;
    promotion_price:number;
    promotion_status:boolean;
};

export type ListProductState = {
    product: Product[];
    checkAll: boolean;
    totalProduct: number;
    totalPrice: number;
    loading:boolean;
}