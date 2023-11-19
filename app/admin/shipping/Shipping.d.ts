export type FormState = {
    name: string;
    search: string;
    shippingF: any[];
    loading: boolean;
}

export type TableState = {
    search: string;
    loading: boolean;
    shippingT: ShippingTable[];
    index: Number
}

type ShippingTable = {
    shipping_id: string;
    name: string;
    created_at: string;
    updated_at: string;
}
