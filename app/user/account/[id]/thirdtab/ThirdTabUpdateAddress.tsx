"use client"
import { SetStateAction, useState } from "react";
import { Address, ThirdTab, ThirdTabUpdateAddressState } from "../account";
import Input from "@/app/component/Input/Input";
import GoogleMapComponent from '../GoogleMapComponent';
import { toast } from 'react-toastify';
import { UpdateAddress } from '../account-api';
import { Circular } from '@/app/component/Loading/Circular';
import { useTranslation } from 'react-i18next';
export default function ThirdTabUpdateAddress({state,setState, addressRef}:{state:ThirdTab,setState:React.Dispatch<SetStateAction<ThirdTab>>, addressRef:React.MutableRefObject<Address[]>}) {
    const { t, i18n } = useTranslation('translation');
    const {index} = state;
    const data = addressRef.current[index];
    const [subState, setSubState] = useState<ThirdTabUpdateAddressState>({
        addresName: data.location_name,
        firstName: data.first_name,
        lastName: data.last_name,
        addressDes: data.address_desc,
        subDistrict: data.sub_district,
        district: data.district,
        province: data.province,
        postalCode: data.postal_code,
        telephone: data.telephone,
        position: {
            lat: data.latitude,
            lng: data.longitude,
        },
        address_id: data.address_id,
        loading:false,
    })

    return (
        <>
            <form onSubmit={handleSubmit} className="flex flex-col gap-10">
                {/* ชื่อสถานที่จัดส่ง */}
             
                <div className="flex gap-2 flex-col">
                    <h6> {t("addressName1")} </h6>
                    <Input
                        value={subState.addresName}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSubState(prev => ({ ...prev, addresName: e.target.value }))}
                        placeholder={t("addressName2")}
                        type="text"
                    />
                </div>
                {/* ชื่อจริง-นามสกุล */}
                <div className="grid gap-4 md:grid-cols-2 grid-cols-1">
                    <div className="flex gap-2 flex-col">
                        <h6> {t("addressFirstname1")} </h6>
                        <Input
                            value={subState.firstName}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSubState(prev => ({ ...prev, firstName: e.target.value }))}
                            placeholder={t("addressFirstname2")}
                            type="text"
                        />
                    </div>
                    <div className="flex gap-2 flex-col">
                        <h6> {t("addressLastname1")} </h6>
                        <Input
                            value={subState.lastName}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSubState(prev => ({ ...prev, lastName: e.target.value }))}
                            placeholder= {t("addressLastname2")}
                            type="text"
                        />
                    </div>
                </div>
                {/* ที่อยู่-จังหวัด */}
                <div className="grid gap-4 md:grid-cols-2 grid-cols-1">
                    <div className="flex gap-2 flex-col">
                        <h6> {t("addressAddress1")} </h6>
                        <Input
                            value={subState.addressDes}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSubState(prev => ({ ...prev, addressDes: e.target.value }))}
                            placeholder= {t("addressAddress2")}
                            type="text"
                        />
                    </div>
                    <div className="flex gap-2 flex-col">
                        <h6> {t("addressSubdistrict")} </h6>
                        <Input
                            value={subState.subDistrict}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSubState(prev => ({ ...prev, district: e.target.value }))}
                            placeholder= {t("addressSubdistrict")}
                            type="text"
                        />
                    </div>
                </div>
                {/* เขต/อำเภอ - จังหวัด*/}
                <div className="grid gap-4 md:grid-cols-2 grid-cols-1">
                    <div className="flex gap-2 flex-col">
                        <h6> {t("addressDistrict")} </h6>
                        <Input
                            value={subState.district}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSubState(prev => ({ ...prev, subDistrict: e.target.value }))}
                            placeholder={t("addressDistrict")} 
                            type="text"
                        />
                    </div>
                    <div className="flex gap-2 flex-col">
                        <h6> {t("addressProvince")} </h6>
                        <Input
                            value={subState.province}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSubState(prev => ({ ...prev, province: e.target.value }))}
                            placeholder= {t("addressProvince")}
                            type="text"
                        />
                    </div>
                </div>
                {/* รหัสไปรษณีย์ - เบอร์โทรศัพท์ */}
                <div className="grid gap-4 md:grid-cols-2 grid-cols-1">
                    <div className="flex gap-2 flex-col">
                        <h6> {t("addressPostalcode")} </h6>
                        <Input
                            value={subState.postalCode}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSubState(prev => ({ ...prev, postalCode: e.target.value }))}
                            placeholder= {t("addressPostalcode")}
                            type="text"
                        />
                    </div>
                    <div className="flex gap-2 flex-col">
                        <h6> {t("addressTel")} </h6>
                        <Input
                            value={subState.telephone}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSubState(prev => ({ ...prev, telephone: e.target.value }))}
                            placeholder= {t("addressTel")}
                            type="tel"
                        />
                    </div>
                </div>

                <div className="mb-4 grid grid-cols-1">
                    <h6> {t("addressMark")} </h6>
                    <GoogleMapComponent
                    lat={subState.position.lat!}
                    lng={subState.position.lng!}
                    setSubState={setSubState}
                    />
                </div>

                {/* ปุ่ม */}
                <div className="flex justify-start gap-4">
                    <button
                        type='submit'
                        onClick={handleSubmit}
                        className="px-2 p-3 text-white bg-red-500 rounded-md w-fit hover:bg-red-400 disabled:bg-slate-500 disabled:text-slate-200 disabled:disabled:cursor-not-allowed"
                        disabled={
                            !subState.addresName ||
                            !subState.firstName ||
                            !subState.lastName ||
                            !subState.addressDes ||
                            !subState.subDistrict ||
                            !subState.district ||
                            !subState.province ||
                            !subState.postalCode ||
                            !subState.telephone ||
                            !subState.position.lat
                        }
                    >
                        <h6 className="font-semibold"> {t("addressConfirmUpdate")}</h6>
                    </button>
                    <button
                    onClick={() => setState(prev => ({...prev, open:false}))}
                    className="px-2 p-3 text-white bg-amber-500 rounded-md w-fit hover:bg-amber-400"
                    >
                    {t("addressCancelUpdate")}
                    </button>
                </div>

              

            </form>
            <Circular
            loading={subState.loading}
            />
        </>
    );

async function handleSubmit(e:React.FormEvent<HTMLFormElement | HTMLButtonElement>){
    e.preventDefault();
    
    setSubState(prev => ({...prev, loading:true}))
    const err = Validation();
    if(err){
        return;
    }
    
    const {addresName, addressDes, district, firstName, lastName, position, postalCode, province, subDistrict, telephone, address_id } = subState;
    const {data, error} = await UpdateAddress(
        address_id,
        firstName,
        lastName,
        addresName,
        addressDes,
        province,
        district,
        subDistrict,
        postalCode,
        telephone,
        //@ts-ignore
        position,
    )
    if(error || !data?.address){
        console.log("error")
        toast.error(error);
        setSubState(prev => ({...prev, loading:false}))
        return;
    }
    else {
        toast.success("อัพเดตที่อยู่สำเร็จแล้ว");
        setSubState(prev => ({...prev, loading:false}))
        setState(prev => {
            let temp = addressRef.current;
            temp[index].first_name = firstName;
            temp[index].last_name = lastName;
            temp[index].location_name = addresName;
            temp[index].address_desc = addressDes;
            temp[index].province = province;
            temp[index].district = district;
            temp[index].sub_district = subDistrict;
            temp[index].postal_code = postalCode;
            temp[index].telephone = telephone;
            temp[index].latitude = position.lat!;
            temp[index].longitude = position.lng!;

            return {...prev, address:temp, open:false, index:-1};
        })
    }
}
function Validation(): boolean {
    const {addresName, addressDes, district, firstName, lastName, position, postalCode, province, subDistrict, telephone} = subState;
    
    const stringParams = [
      { value: addresName, field: 'ชื่อสถานที่จัดส่ง' },
      { value: addressDes, field: 'ที่อยู่' },
      { value: district, field: 'แขวง/ตำบล' },
      { value: firstName, field: 'ชื่อจริง' },
      { value: lastName, field: 'นามสกุล' },
      { value: postalCode, field: 'รหัสไปรษณีย' },
      { value: province, field: 'จังหวัด' },
      { value: subDistrict, field: 'เขต/อำเภอ' },
      { value: telephone, field: 'เบอร์โทรศัพท์' },
    ];

    for (const param of stringParams) {
      if (typeof param.value !== 'string' || param.value.trim() === '') {
        toast.error(`ดูเหมือนคุณยังไม่ได้กรอก ${param.field}`);
        setSubState(prev => ({ ...prev, loading: false }));
        return true;
      }
    }

    if(!position.lat || !position.lng){
        return true;
    }
    
    
    return false;
  }
    
}