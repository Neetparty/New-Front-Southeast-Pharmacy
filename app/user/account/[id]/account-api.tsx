import { makeRequest } from "@/app/hook/makeRequest";
import { Address, FirstTabState, NotiData, User  } from "./account";
import { SecondTabState  } from "./account"; 


export async function GetUser() {
    return await makeRequest<{ user: User, msg: string }>(`/users`, {
        method: "GET"
    });
}

export async function UpdateUserInfo(user_name: string, first_name: string, last_name: string, file:any, change:boolean) {
    
    const form = new FormData();

    form.append("file", file);
    form.append("changeImg", JSON.stringify(change));
    form.append("user_name", user_name);
    form.append("first_name", first_name);
    form.append("last_name", last_name);
    

    return await makeRequest<{user: FirstTabState, msg:string}>(`/users`, {
         method:"PUT",
         data:form
    }) 
}

export async function ChangeUserPassword(email:string,currentPassword:string,newPassword:string) {
    
    return await makeRequest<{msg:string}>("/change-password", {
        method:"PUT",
        data:{
            email: email,
            currentPassword: currentPassword,
            newPassword: newPassword
        }
    }) 
 
}
export async function GetAddress() {
    return await makeRequest<{address:Address[], msg:string}>(`/users/addresses`, {
        method: "GET"
    });
}

export async function DeleteAddress(address_id:string) {
    return await makeRequest<{msg:string}>(`/users/addresses/${address_id}`, {
        method: "DELETE"
    });
}

export async function CreateAddress(
    first_name: string,
    last_name: string,
    locationName: string,
    address_desc: string,
    province: string,
    district: string,
    sub_district: string,
    postal_code: string,
    telephone: string,
    position: {lat:number, lng:number}
) {

    return await makeRequest<{address:Address, msg:string}>(`/users/addresses`, {
        method:"POST",
        data:{
            first_name:first_name ,
            last_name:last_name ,
            location_name:locationName ,
            address_desc:address_desc ,
            province: province,
            district: district,
            sub_district:sub_district ,
            postal_code:postal_code ,
            telephone: telephone,
            latitude: position.lat,
            longitude: position.lng,
        }
   }) 
}
 

export async function UpdateAddress(
    address_id:string,
    first_name: string,
    last_name: string,
    main_address: string,
    address_desc: string,
    province: string,
    district: string,
    sub_district: string,
    postal_code: string,
    telephone: string,
    position: {lat:number, lng:number}
) {

    return await makeRequest<{address:Address, msg:string}>(`/users/addresses/${address_id}`, {
        method:"PUT",
        data:{
            first_name:first_name ,
            last_name:last_name , 
            location_name:main_address,
            address_desc:address_desc ,
            province: province,
            district: district,
            sub_district:sub_district ,
            postal_code:postal_code ,
            telephone: telephone,
            latitude: position.lat,
            longitude: position.lng,
        }
   }) 
}

export async function GetNotiUesr(page:number, perPage:number, count:number) {
    return await makeRequest<{
        noti: NotiData[]
        msg:string,
        totalNoti:number
    }>(`/list-noti-user?page=${page}&perPage=${perPage}&count=${count}`, {
        method:"GET"
    })
}