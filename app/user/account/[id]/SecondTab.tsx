"use client"
import { useRef } from "react";
import { ChangeUserPassword } from "./account-api";
import { toast } from "react-toastify";
import InputRef from "@/app/component/Input/InputRef";
import { useTranslation } from 'react-i18next';

export default function SecondTab() {

    const { t } = useTranslation('translation');

    const emailRef = useRef<HTMLInputElement | null>(null);
    // emailRef.current!.value = user.email;

    const currentPasswordRef = useRef<HTMLInputElement | null>(null);
    const newPasswordRef = useRef<HTMLInputElement | null>(null);
    const confirmNewPasswordRef = useRef<HTMLInputElement | null>(null);
    
    return (
        <form onSubmit={onSubmit} className="flex flex-col gap-8">

            <div className="flex gap-2 flex-col">
                <h6> {t("accountemail1")} </h6>
                <InputRef
                    ref={emailRef}
                    placeholder={t("accountemail2")}
                    type="email"
                />
            </div>
            <div className="flex gap-2 flex-col">
                <h6> {t("accountCurrentpsw1")} </h6>
                <InputRef
                    ref={currentPasswordRef}
                    placeholder={t("accountCurrentpsw2")}
                    type="text"
                />
            </div>
            <div className="flex gap-2 flex-col">
                <h6 className="text-lg mt-4 font-bold"> {t("accountNewpsw1")} </h6>
                <div className="grid gap-4 md:grid-cols-2 grid-cols-1">
                    <div className="flex gap-2 flex-col">
                        <h6> {t("accountNewpsw2")} </h6>
                        <InputRef
                            ref={newPasswordRef}
                            placeholder={t("accountNewpsw3")}
                            type="password"
                        />
                    </div>
                    <div className="flex gap-2 flex-col">
                        <h6> {t("accountNewpsw4")} </h6>
                        <InputRef
                            ref={confirmNewPasswordRef}
                            placeholder= {t("accountNewpsw4")}
                            type="password"
                        />
                    </div>
                </div>

            </div>
            <div className="flex justify-end">
                <button
                className="px-2 p-3 text-white bg-red-500 rounded-md w-fit hover:bg-red-400 disabled:bg-slate-500 disabled:text-slate-200 disabled:disabled:cursor-not-allowed"
                onSubmit={onSubmit}
                type="submit"
                >
                    <h6 className="font-semibold"> {t("accountConfirmpsw")} </h6>
                </button>
            </div>
        </form>
    );


async function onSubmit(e: React.FormEvent<HTMLFormElement | HTMLButtonElement>) {
    e.preventDefault();

    const email = emailRef.current?.value || "";
    const currentPassword = currentPasswordRef.current?.value || "";
    const newPassword = newPasswordRef.current?.value || "";
    const confirmNewPassword = confirmNewPasswordRef.current?.value || "";

    if (!email || !currentPassword || !newPassword || !confirmNewPassword) {
        toast.error("กรุณากรอกข้อมูลให้ครบ");
        return;
    }

    if (newPassword !== confirmNewPassword) {
        toast.error("รหัสผ่านใหม่และการยืนยันรหัสผ่านไม่ตรงกัน");
        return;
    }

    try {
        const { data, error } = await ChangeUserPassword(email, currentPassword, newPassword);

        if (!data || !data.msg) {
        toast.error("เปลี่ยนรหัสผ่านไม่สำเร็จ");
        } else {
        toast.success("เปลี่ยนรหัสผ่านสำเร็จ");
        }
    } catch (error) {
        console.error("เกิดข้อผิดพลาด:", error);
        toast.error("เกิดข้อผิดพลาดในระหว่างการเปลี่ยนรหัสผ่าน");
    }
}
}