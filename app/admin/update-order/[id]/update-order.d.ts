export type FormState = {
    order_id: string;
    note: string;
    status: string;
    tracking_number: string;
    tracking_url: string;
}

interface OrderProduct {
    product: {
      product_id: string;
      product_name: string;
      product_name_en: string;
      product_name_cn: string;
      price: number;
      image: string;
      total_product: number;
    };
  }

export type TableState = {
    loading:boolean;
    select : "setting" | "update" | "delete" | string;
    index:number;
    vendor:string;
    order_product:OrderProduct[];
    shipping_price:number;
    total_price:number;
    distance:number;
    weight:number
}

export type Product = {
    product: {
        product_id: string;
        product_name: string;
        product_name_en: string;
        product_name_cn: string;
        price: number;
        image: string;
      };
    quantity: number;
}

export type SecondFormState = {
    order_id: string;
    payment_method: string;
    address: Address | null
}

export type Order = {
    order_id: string;
    addressData: string | AddressData;
    note: string;
    tracking_number: string | null;
    status: string;
    payment_method: string;
    total_price: number;
    shipping_price: number;
    vendor: string;
    weight: number;
    distance: number;
    tracking_url: string | null;
    order_product: OrderProduct[];
}

export type Address = {
    location_name:string;
    address_desc: string;
    address_id: string;
    district: string;
    first_name: string;
    last_name: string;
    postal_code: string;
    province: string;
    sub_district: string;
    telephone: string;
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