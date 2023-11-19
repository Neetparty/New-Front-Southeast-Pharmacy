import { makeRequest } from "@/app/hook/makeRequest";
import { ShippingTable, Rate } from "./Shipping";

export async function CreateShippingRate(ShipID: string, price: number, rangeStart: number, rangeEnd: number, type: string) {

    return await makeRequest<{shippingRate: Rate, msg: string}>(`/create-shipping-rate/${ShipID}`, {
         method:"POST",
         data:{
             shipping_ID: ShipID,
             price: price,
             rangeStart: rangeStart,
             rangeEnd: rangeEnd,
             type: type
         }
     }) 
 
 }

export async function GetShippingRateWeight(ShipID: string) {
    return await makeRequest<{rate : Rate[], msg: string}>(`/get-shipping-weight/${ShipID}`, {
        method:"GET",
        data:{
            shipping : ShipID
        }
    })
}

export async function GetShippingRateDistance(ShipID: string) {
    return await makeRequest<{rate : Rate[], msg: string}>(`/get-shipping-distance/${ShipID}`, {
        method:"GET",
        data:{
            shipping : ShipID
        }
    })
}

export async function UpdateShippingName(name: string , ShipID: string) {
    return await makeRequest<{shipping : ShippingTable, msg: string}>(`/update-shipping-name/${ShipID}`, {
        method:"PUT",
        data:{
            name: name
        }
    })
}

export async function UpdateShippingRate(rate_id: string, editPrice: number, editRangeStart: number, editRangeEnd: number) {
    return await makeRequest<{rate: Rate, msg: string}>(`/update-shipping-rate/${rate_id}`, {
        method:"PUT",
        data:{
            editPrice: editPrice,
            editRangeStart: editRangeStart,
            editRangeEnd: editRangeEnd
        }
    })
}

export async function GetShipping(ShipID: string) {
    return await makeRequest<{shipping: ShippingTable, msg:string}>(`/get-shipping/${ShipID}`, {
        method:"GET",
        data: {
            shipping : ShipID
        }
    })
}

export async function DeleteShippingRate(rate_id: string) {
    return await makeRequest(`/delete-shipping-rate/${rate_id}`, {
        method:"DELETE"
    })
}