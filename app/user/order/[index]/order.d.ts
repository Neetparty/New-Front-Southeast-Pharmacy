
export type OrderState = {
    index:number;
}

type Product = {
    product_name: string;
    product_name_en: string;
    product_name_cn: string;
    image: string;
    price: number;
    promotion_status: boolean;
    promotion_price: number;
    total_product: number
}

export type OrderType = {
    order_id: string; 
    order_product:{
        product:Product;
    }[];
    created_at: string;
    status: "success" | "sending" | "waiting" | "cancel"
}
export type FavouriteProduct = {
    product:{
        product_name:string;
        product_name_en:string;
        product_name_cn:string;
        image:string;
        promotion_status:bolean;
        promotion_price:number;
        price:number;
        created_at:string;
    }
    product_id:string;
    created_at:string;
}

type OrderProduct = {
    product: Product;
    quantity: number;
};

  
export type FirstFormState = {
    order: OrderType[];
    sort: string;
    showDetail: boolean;
    detailOrder: DetailOrder | null
}

export type AddressData = {
    main_address: boolean;
    address_id: string;
    address_desc: string;
    location_name: string;
    first_name: string;
    last_name: string;
    province: string;
    district: string;
    sub_district: string;
    postal_code: string;
    telephone: string;
    latitude: number;
    longitude: number;
  };

export type DetailOrder = {
    order_product: OrderProduct[];
    created_at: string;
    order_id: string;
    status: string;
    addressData: string | AddressData;
    payment_method: string;
    note: string;
    total_price: number;
    tracking_number: string | null;
    tracking_url: string | null;
    shipping_price: number;
    vendor: string;
    weight: number;
    distance: number;
}

export type SecondFormState = {
    fav:FavouriteProduct[];
}

export type OrderHistory = {
    order:{
        addressData:string | AddressData;
        order_id: string;
        order_product: OrderProduct[];
        total_price: number;
        shipping_price: number;
        status: string;
        vendor: string;
        note:string;
        tracking_number:string,
        tracking_url:string,
        distance:number,
        weight:number,
        payment_method:string,
    };
    total_price: number;
    shipping_price: number;
    status: string;
    vendor: string;
    created_at: string;
}

export type ThirdFormState = {
    history:OrderHistory[];
    showDetail: boolean;
    addr: string | AddressData;
    selectHistory:OrderHistory | null;
}