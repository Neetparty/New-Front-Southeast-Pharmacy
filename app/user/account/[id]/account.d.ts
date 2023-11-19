
export type AccountState = {
    index:number;
}

export type User = {
    user_name:string;
    first_name:string;
    last_name:string;
    image:string;
}

export type FirstTabState = {
    loading:boolean;
    images:any[];
    imageURLs:string[];
}

export type SecondTabState = {
    email:string;
    currentPassword:string;
    newPassword:string;
    confirmNewPassword:string;
}

export type ThirdTab = {
    open: boolean;
    index: number;
}

export type ThirdTabAddAddressState = {
    addresName:string;
    addressDes:string;
    subDistrict:string;
    district:string;
    province:string;
    postalCode:string;
    telephone:string;
    position: {
        lat:number | null;
        lng:number | null;
    }
    firstName:string;
    lastName:string;
    loading:boolean;
}

export interface ThirdTabUpdateAddressState extends ThirdTabAddAddressState {
    address_id:string;
}


export type Address = {
    address_id: string;
    main_address: string;
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
    created_at: string;
    updated_at: string;
    user_id: string;    
}
export type ForthState = {
    countNoti:number;
    currentPage:number;
    notiData:NotiData[]
}

export type NotiData = {
    noti_id    :  string;
    title      :  string;
    title_en   :  string;
    title_cn   :  string;
    message    :  string;
    message_en :  string;
    created_at  :  string;
    image      :  string;
    read       :  boolean;
}