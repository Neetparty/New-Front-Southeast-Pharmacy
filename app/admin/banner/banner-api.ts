import { makeRequest } from "@/app/hook/makeRequest";
import { BannerItem } from "./bannertype";

export async function CreateBanner(
    images:any[]
) {

    const form = new FormData();

    images.forEach((elem) => (
        form.append("files", elem)
    ))    

    return await makeRequest<{msg:string, banner:BannerItem[]}>("/upload-banner", {
        method:"POST",
        data: form
    })
}

export async function GetBanner() {
    return await makeRequest<{banner:BannerItem[], msg:string}>("/get-banner", {
        method:"GET"
    })
}

export async function DeleteExistBanner(publicId:string, banner:BannerItem){
    
    return await makeRequest<{banner:BannerItem[], msg:string}>(`/delete-banner`, {
        method:"PUT",
        data:{
            created_at: banner.created_at,
            image: banner.image,
            public_id: banner.public_id
        }
    })
}