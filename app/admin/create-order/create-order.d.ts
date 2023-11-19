export type FormState = {
    order_id: string;
    payment_method: string;
    first_name: string;
    last_name: string;
    address_no: string;
    sub_distric: string;
    distric: string;
    province: string;
    postcode: string;
    tel: string;
}


type User = {
    user_id: string;
    user_name: string;
    email:string;
    role: string;
    images: any[];
    imageURLs: string[];
    created_at:string;
}

export type TableState = {
    cartProduct:cartProduct[];
    loading:boolean;
    select : "setting" | "update" | "delete" | string;
    index:number;
    open: boolean;
    selectedProduct: product[];
    search:string;
}

type cartProduct = {
    cart:cart[];
    product:product[];
    quantity:number;
}

type cart = {
    cart_id:string;
    // user:user[];
}

type product = {
    product_id:string;
    product_th:string;
    index:number;
    price: number;
    images:any;
}


export type DialogContent = {
    
    state: TableState;
    setState: Dispatch<SetStateAction<TableState>>;
    
}