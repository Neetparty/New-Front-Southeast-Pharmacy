"use client";

import { selectUserData } from "@/app/GlobalRedux/Features/selector";
import { Icon } from "@iconify/react";
import { TFunction } from "i18next";
import Link from "next/link";
import { useSelector } from "react-redux";
import { NavbarState } from "./NavbarType";
import { Dispatch, SetStateAction } from "react";

export default function InsidebarUser({
    switchLang,
    lang,
    handleLogout,
    t,
    handleClose,
    state,
    setState
}: {
    switchLang: (lang: string) => void;
    handleClose: () => void;
    lang: string;
    handleLogout: () => Promise<void>;
    t: TFunction<"translation">
    state: NavbarState,
    setState: Dispatch<SetStateAction<NavbarState>>
}) {

    const user = useSelector(selectUserData)

    const header = [
        {
            text: t("accountNoti2"),
            icon: "mi:notification",
            className: "w-6 h-6",
            link: "/user/account/3"
        },
        {
            text: t("userOrderList"),
            icon: "ph:note",
            className: "w-6 h-6",
            link: "/user/order/0"
        },
        {
            text: t("accountInfo1"),
            icon: "ph:user-light",
            className: "w-6 h-6",
            link: "/user/account/0"
        },
        {
            text: t("accountBookmark"),
            icon: "material-symbols:bookmark-outline",
            className: "w-6 h-6",
            link: "/user/order/1"
        },
        {
            text: t("accountShopping"),
            icon: "bi:cart",
            className: "w-6 h-6",
            link: "/user/shopping-cart"
        },
    ]


    return (
        <>
            <div className="flex flex-col gap-2">
                <div className="grid grid-cols-3 gap-4 justify-items-center">
                    {header.map((item, i) => (
                        <Link
                            href={item.link}
                            key={i}
                            onClick={handleClose}
                            className="flex flex-col gap-2 items-center w-fit"
                        >
                            <Icon
                                icon={item.icon}
                                className={item.className}
                            />
                            <h6 className="text-xs font-extralight">{item.text}</h6>
                        </Link>
                    ))}
                    {
                        user.user_id ?
                            <div
                                className="flex flex-col gap-2 items-center w-fit cursor-pointer"
                                onClick={handleLogout}
                            >
                                <Icon
                                    icon={"carbon:logout"}
                                    className={"w-6 h-6"}
                                />
                                <h6 className="text-xs font-extralight">{t("navSignout")}</h6>
                            </div>
                            :
                            <div
                                className="flex flex-col gap-2 items-center w-fit cursor-pointer"
                                onClick={() => setState({ ...state, openLogin: true })}
                            >
                                <Icon
                                    icon={"carbon:logout"}
                                    className={"w-6 h-6"}
                                />
                                <h6 className="text-xs font-extralight">{t("navSignin")}</h6>
                            </div>
                    }
                </div>
                <hr />
                <div className="flex justify-between mt-4">
                    <div className="">
                        <h6>{t("changeLanguage")}</h6>
                    </div>
                    <div className="flex gap-2">
                        <h6 className={`${lang === "th" ? "text-blue-500 hover:text-blue-600 " : "text-slate-500 hover:text-blue-500/80"}  cursor-pointer`} onClick={() => switchLang("th")}>TH</h6>
                        |
                        <h6 className={`${lang === "en" ? "text-blue-500 hover:text-blue-600 " : "text-slate-500 hover:text-blue-500/80"} cursor-pointer`} onClick={() => switchLang("en")}>EN</h6>
                        |
                        <h6 className={`${lang === "cn" ? "text-blue-500 hover:text-blue-600 " : "text-slate-500 hover:text-blue-500/80"} cursor-pointer`} onClick={() => switchLang("cn")}>CN</h6>
                    </div>
                </div>
            </div>
        </>
    );
}