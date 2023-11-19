import { makeRequest } from "@/app/hook/makeRequest";
import { DetailProduct, Comment } from "./detail-type";




export async function GetProductDetail(productId:string) {
   return await makeRequest<{product: DetailProduct, msg:string, fav:boolean, comment:Comment[]}>(`/get-single-product/${productId}`, {
        method:"GET",
    }) 
}

export async function AddToUserCart(productId:string){
    return await makeRequest("/add-to-cart", {
        method:"POST",
        data:{
            productId:productId
        }
    })
}

export async function AddToFav(productId:string){
    return await makeRequest<{msg:string, fav:boolean}>("/add-to-fav", {
        method:"POST",
        data:{
            productId:productId
        }
    })
}

export async function CreateComment(productId:string, message:string, rating:number) {
    return await makeRequest<{msg:string, comment:Comment}>("/create-comment", {
        method:"POST",
        data:{
            productId: productId,
            message: message,
            rating: rating,
        }
    })
}

/* 
GET -> !req.body
POST -> req.body
PUT -> req.body
PATCH -> req.body
DELETE -> !req.body

*/
    