export type FormState = {
    name: string;
    search: string;
    shipping: any[];
}

export type TableState = {
    search: string;
    loading: boolean;
    shipping: ShippingTable[];
}

type ShippingTable = {
    name: string;
    created_at: string;
    shipping_id: string;
}

export type RateState = {
    price: number | null;
    rangeStart: number | null;
    rangeEnd: number | null;
    editPrice: number | null;
    editRangeStart: number | null;
    editRangeEnd: number | null;
    rate: Rate[];
    index:number;
    loading: boolean;
    type: string;
}


export type Rate = {
    shipping_rate_id: string;
    rate_price: number;
    shipping_rate_start: number;
    shipping_rate_end: number;
}



// shipping    Shipping @relation(fields: [shipping_id], references: [shipping_id])
// shipping_id String
// rate_price  Int

// Shipping Rate คือเช่น > 5 กิโลเมตร ให้ไปคิดที่ Rate_price นี่
// shipping_rate Int

// type String
// priceDistance: number | null;
// rangeDistance: string;
