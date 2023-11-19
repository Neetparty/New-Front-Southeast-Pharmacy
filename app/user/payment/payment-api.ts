import { makeRequest } from "@/app/hook/makeRequest";
import { AddressType, Shipping } from "./Payment";
import { ProductRedux } from "@/app/GlobalRedux/Features/Feature";

export async function GetAddressAndShipping() {
    return makeRequest<{ address: AddressType[], msg: string, shipping:Shipping[] }>(`/load-shipping-addr`, {
        method: "GET"
    });
}

export async function GetReloadAddress() {
    return makeRequest<{ address: AddressType[], msg: string }>(`/load-addr`, {
        method: "GET"
    });

}

/* 

    address:string,
    note:string,
    payment_method:string,
    vendor:string,
    total_price:number,
    shipping_price:number,
    distance:number,
    weight:number,
    product:ProductRedux[],
    referenceNo:string,
     
*/

export async function CreateOrder(cipher:string) {

    return makeRequest<{ address: AddressType[], msg: string }>(`/create-order`, {
        method: "POST",
        data:{
            cipher:cipher
        }
    });
}

