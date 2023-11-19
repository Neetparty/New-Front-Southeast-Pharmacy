"use client"

import { FormState } from "./add-user";
import { useState, useRef } from "react";
import { CreateUser } from "./add-user-api";
import { toast } from "react-toastify";
import { Circular } from "@/app/component/Loading/Circular";
import { useRouter } from "next/navigation";
import InputRef from "@/app/component/Input/InputRef";

export default function Form() {
    const router = useRouter();
    const [state, setState] = useState<FormState>({
        role: "user",
        loading:false,
    });

    const user_name = useRef<HTMLInputElement | null>(null);
    const first_name = useRef<HTMLInputElement | null>(null);
    const last_name = useRef<HTMLInputElement | null>(null);
    const email = useRef<HTMLInputElement | null>(null);
    const password = useRef<HTMLInputElement | null>(null);
    const confirmPassword = useRef<HTMLInputElement | null>(null);

    const roleCombo: string[] = [
        "admin",
        "user",
        "special"
    ];


    return (
        <form className="p-8 flex flex-col gap-8" onSubmit={onSubmit}>
            <h6 className="text-3xl font-bold mt-2 ">เพิ่มยูสเซอร์</h6>
            <div>
                <h6 className="mb-2">ชื่อยูสเซอร์</h6>
                <InputRef
                    ref={user_name}
                    placeholder="ชื่อที่ใช้แสดง"
                    type="text"
                />
            </div>
            <div>
                <h6 className="mb-2">อีเมล์</h6>
                <InputRef
                    ref={email}
                    placeholder="อีเมล์"
                    type="email"
                />
                
            </div>
            <div className="grid gap-4 grid-cols-2">
                <div className="flex gap-2 flex-col">
                    <h6>ชื่อจริง</h6>
                    <InputRef
                    ref={first_name}
                    placeholder="ชื่อจริง"
                    type="text"
                    />
                    
                </div>
                <div className="flex gap-2 flex-col">
                    <h6>นามสกุล</h6>
                    <InputRef
                    ref={last_name}
                    placeholder="นามสกุล"
                        type="text"
                    />
                  
                </div>
            </div>

            <div>
                <h6 className="mb-2">รหัสผ่าน</h6>
                <InputRef
                    ref={password}
                    placeholder="รหัสผ่าน"
                    type="password"
                    />
               
            </div>
            <div>
                <h6 className="mb-2">ยืนยันรหัสผ่าน</h6>
                <InputRef
                    ref={confirmPassword}
                    placeholder="ยืนยันรหัสผ่าน"
                    type="password"
                    />
              
            </div>
            <div>
                <h6>ตำแหน่ง</h6>
                <select
                    className="border w-full text-slate-700 text-sm rounded-lg block p-2 outline-none placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
                    value={state.role}
                    onChange={(event: React.ChangeEvent<HTMLSelectElement>) => setState(prev => ({ ...prev, role: event.target.value as "admin" | "user" | "special" }))}
                >
                    {roleCombo && roleCombo.map((item, i) => (
                        <option value={item} key={i}>{item}</option>
                    ))}
                </select>
            </div>
            <div>

             
            </div>


            <div className="flex justify-end">
                <button
                    type="submit"
                    className="px-2 p-3 text-white bg-red-500 rounded-md w-fit hover:bg-red-400 disabled:bg-slate-500 disabled:text-slate-200 disabled:cursor-not-allowed"
                    disabled={false}
                >
                    <h6 className="font-semibold">เพิ่มผู้ใช้</h6>
                </button>
            </div>
            <Circular loading={state.loading} />
        </form >
    );

async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const { role } = state;
    
    const { err, data: validationData } = Validation();
    if (err || !validationData) {
        return;
    }
    else {
        setState(prev => ({ ...prev, loading: true }));

        const {email, first_name, last_name, password, username} = validationData
        const { data, error } = await CreateUser(
            username,
            email,
            first_name,
            last_name,
            password,
            role,
        );
        
        if (error) {
            toast.error(error);
            setState(prev => ({ ...prev, loading: false }));
            return;
        } else {
            toast.success("ผู้ใช้นี้ได้ถูกสร้างแล้วเรียบร้อย");
            router.push("/admin/list-user", {scroll: false})
            setState(prev => ({ ...prev, loading: false, submit: true }));
        }
    }
}
      
interface ValidatedData {
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    password: string;
    confirmPassword: string;
  }
  

function Validation(): { err: boolean; data: ValidatedData  | null } {
  
    const stringParams = [
      { ref: user_name, field: 'ชื่อที่ใช้แสดง' },
      { ref: email, field: 'อีเมล์' },
      { ref: first_name, field: 'ชื่อจริง' },
      { ref: last_name, field: 'นามสกุล' },
      { ref: password, field: 'รหัสผ่าน' },
      { ref: confirmPassword, field: 'ยืนยันรหัสผ่าน' },
    ];
  
    const errors: Record<string, string> = {};
  
    for (const param of stringParams) {
        if (!param.ref || !param.ref.current || !param.ref.current.value || param.ref.current.value.trim() === '') {
            errors[param.field] = `ดูเหมือนคุณยังไม่ได้กรอก ${param.field}`;
            toast.error(`ดูเหมือนคุณยังไม่ได้กรอก ${param.field}`);
        }
    }

    if (password.current?.value !== confirmPassword.current?.value) {
        errors.confirmPassword = 'รหัสผ่านไม่ตรงกัน';
        toast.error(`รหัสผ่านไม่ตรงกัน`)
    }

    if (Object.keys(errors).length > 0) {
    //   toast.error('กรุณากรอกข้อมูลให้ถูกต้อง');
      return { err: true, data: null };
    }
  
    return {
      err: false,
      data: {
        username: user_name.current!.value,
        email: email.current!.value,
        first_name: first_name.current!.value,
        last_name: last_name.current!.value,
        password: password.current!.value,
        confirmPassword: confirmPassword.current!.value,
      },
    };
  }

}