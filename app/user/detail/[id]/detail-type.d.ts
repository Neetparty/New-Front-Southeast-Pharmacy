export type DetailProduct = {
    product_id: string;
        product_name: string;
        product_name_en: string;
        product_name_cn: string;
        description: string;
        description_en: string;
        description_cn: string;
        quantity: number;
        price: string;
        warning: string;
        warning_en: string;
        warning_cn: string;
        warning_status: boolean;
        promotion_status: boolean;
        promotion_price: string;
        image: string;
        sub_image_products: {
            sub_image: string;
        }[];
        category: {
            category_id: string;
            category_name: string;
            category_name_en: string;
            category_name_ch: string;
        }
}

export type Comment = {
    message: string;
    rating: number;
    created_at: string;
    user:{
        user_name: string;
        image: string;
    }
}

export type DetailState = {
    price: string;
    index: number;
    product: DetailProduct | null;
    images: {
        image: string;
        index: number;
        show: boolean;
    }[];
    totalProduct: number;
    loading: boolean;
    fav: boolean;
    rating: number;
    comment: Comment[];
    ratingCount: Record<number,number>;
}