export type FormState = {
    promotion_th: string;
    promotion_en: string;
    promotion_cn: string;
    isSpecial: boolean

}

export type UpdatePromotionFormState = {
    promotion_th: string;
    promotion_en: string;
    promotion_cn: string;
}

export type TableState = {
    search: string;
    promotion: Promotion[];
    loading: boolean;
}

export interface UpdatePromotionState {
    product: Product[];
    loading: boolean;
    open: boolean;
    search: string;
    dialogProduct: Product[]
    selectedProduct: Product[];
}

type Promotion = {
    promotion_id: string;
    promotion_name: string;
    promotion_name_en: string;
    promotion_name_cn: string;
    create_at: Date;
}


export type Product = {
    product_id: string;
    image: string;
    product_name: string;
    price: number;
    promotion_price: number;
    quantity: number;
    is_special: boolean;
    promotion_status: number;
}

export type DialogContent = {
    
    state: UpdatePromotionState;
    setState: Dispatch<SetStateAction<UpdatePromotionState>>;
    promotion_id:string;
    
}