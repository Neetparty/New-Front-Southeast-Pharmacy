import { Icon } from "@iconify/react";
import Link from "next/link";

export default function NormalLink({link="", icon="", text=""}:{link:string, icon:string, text:string}) {


    return (
    <>
    <Link href={link} className="pl-2 flex gap-2 items-center text-slate-200 hover:text-blue-400  cursor-pointer">
        <Icon icon={icon} className="h-6 w-6 " />

        <h6 className="text-sm">{text}</h6>
    </Link>
    {/* <hr className="border-slate-500"/> */}
    </>
);
}