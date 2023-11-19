import { makeRequest } from "@/app/hook/makeRequest";
import { ShippingTable } from "./Shipping";

export async function ListShipping() {
    return await makeRequest<{shipping: ShippingTable[], msg:string}>("/list-shipping", {
        method:"GET"
    })
}

export async function CreateShipping(name:string) {

    return await makeRequest<{shipping: ShippingTable[], msg:string}>("/create-shipping", {
         method:"POST",
         data:{
             name
         }
     }) 
 
 }

 export async function DeleteShipping(ShippingID:string) {

    return await makeRequest<{shipping: ShippingTable[], msg:string}>(`/delete-shipping/${ShippingID}`, {
         method:"DELETE",
         data:{
             ShippingID
         }
     }) 
 
 }