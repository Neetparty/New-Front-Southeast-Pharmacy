import { makeRequest } from "@/app/hook/makeRequest";

export async function CreateProduct(
    product_id: string, cateId: string, desc: string, desc_ch: string, 
      desc_en: string, images: any, subImages:any[], price: number, product_cn: string, 
      product_en: string, product_th: string, promotion_price: number, 
      promotion_status: boolean, quantity: number, warning: string, warning_cn: string, 
      warning_en: string, warning_status: boolean, weight: number, isSpecial:boolean
) {
    

    const form = new FormData();

    form.append("product_id", product_id);
    form.append("cate_id", cateId);
    form.append("desc_th", desc);
    form.append("desc_cn", desc_ch);
    form.append("desc_en", desc_en);
    form.append("price", String(price));
    form.append("product_cn", product_cn);
    form.append("product_en", product_en);
    form.append("product_th", product_th);
    form.append("promotion_price", String(promotion_price));
    form.append("promotion_status", String(promotion_status));
    form.append("quantity", String(quantity));
    form.append("warning_th", String(warning));
    form.append("warning_cn", warning_cn);
    form.append("warning_en", warning_en);
    form.append("warning_status", String(warning_status));
    form.append("weight", String(weight));
    form.append("isSpecial", String(isSpecial));

    form.append("files", images[0]);

    subImages.forEach((elem) => (
        form.append("files", elem)
    ))
    
    // form.append("files", images)

    return await makeRequest("/create-product", {
        method:"POST",
        data: form
    })


}