import { OrderRedux } from "@/app/GlobalRedux/Features/Feature";

type AddressType = {
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
}

export type PaymentState = {
    selectAddress: AddressType | null;
    address: AddressType[];
    loading: boolean;
    open: boolean;
    vendor: Shipping[];
    selectVendor: string;
    distance: number;
    weight: number;
    shippingCost: number;
    shippingCostWeight:number;
    shippingCostDistance:number;
    note:string;
}

export type Shipping = {
    name: string;
    shipping_id: string;
    shipping_rate:ShippingRate[];
}

export type ShippingRate = {
    rate_price: number;
    shipping_rate_start: number;
    shipping_rate_end: number;
    type: string;
}

export type PaymentMethodState = {
    type: string;
    option: string[];
    referenceNo: string;
    qr:string;
    cardNumber:string;
    MM:string;
    YY:string;
    CVV:string;
    name:string;
    amount:number;
    detail:string;
    token:string;
    res: DataCheckout | null;
    index:number;
    qrWeChat:string;
    resWeChat:DataCheckout | null;
}

export type ApiResponse = {
    msg: string;
    data: {
      rememberCard: boolean;
      resultCode: string;
      resultMessage: string;
      card: {
        name: string | null;
        number: string;
        expirationMonth: string;
        expirationYear: string;
        securityCode: string | null;
        token: string;
        cardLocation: string;
        cardType: string;
      };
      email: string | null;
      mobilePhone: string | null;
      userId: string | null;
      partnerKey: string | null;
    };
};


export interface ResponseQrcode {
    resultCode: string,
    amount: number,
    referenceNo: string,
    gbpReferenceNo: string,
    detail: string;
}

type DataCheckout = {
    gbpReferenceNo: string;
    resultCode: string;
    amount: number,
    referenceNo: string,
    resultMessage: string;
}


export interface ResponseCheckout {
    msg: string,
    data: DataCheckout;
    totalPrice:number
}