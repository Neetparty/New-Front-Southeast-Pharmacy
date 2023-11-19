export interface Product {
    product_name: string;
    product_name_en: string;
    product_name_cn: string;
    product_id: string;
    image: string;
    sell_total: number;
    promotion_price: number;
    promotion_status: boolean;
    price: number;
    description: string;
    description_cn: string;
    description_en: string;
}

export interface Promotion {
    promotion_name: string;
    promotion_name_en: string;
    promotion_name_cn: string;
    Promotion_product: { product: Product }[];
}
  
export interface Category {
    category_id: string;
    category_name: string;
    category_name_en: string;
    category_name_ch: string;
}

 

export interface ProductByCategory extends Product {
    category: Category;
}
  