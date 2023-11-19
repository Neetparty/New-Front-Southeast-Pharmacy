export type ConfirmState = {
    order: Order[];
    loading: boolean;
    select: string;
    index: number;
    search: string;
    selectSearch: "waiting" | "sending" | "success" | "cancel" ;
    currentPage:number;
    countOrder:number;
} 

type Order = {
    order_id: string;
    created_at: string;
    payment_method: string;
    total_price: number;
    status: string;
    vendor: string;
    user: {
        user_name: string;
    };
    order_product: {
        product: {
            product_name: string;
        };
    }[];
    transaction: {
            payment_method: string;
            transaction_id: string;
            gbp_reference_no: string;
    }[]
    
};