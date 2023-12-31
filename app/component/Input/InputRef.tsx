"use client"
import React, { HTMLInputTypeAttribute } from 'react'
import { Icon } from '@iconify/react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
   icon?:string;
   iconClassName?:string;
}

const InputRef = React.forwardRef<HTMLInputElement, InputProps>(
    ({ icon, iconClassName ,className, ...props }, ref) => {
    return (
    <>

     <div className="relative flex w-full flex-wrap ">
        {icon && 
            <span className="z-10 h-full leading-snug font-normal text-center text-slate-300 absolute bg-transparent rounded text-base w-8 pl-3 py-3">
            {/* <CategoryManagement theme="outline" size="24" fill="#4a90e2" className="self-center -z-0"/> */}
            <Icon icon={icon} className={iconClassName} />
             </span>
        }
        <input
            ref={ref}
            className={`${className ? className : "border-0 placeholder-slate-400 text-slate-600 bg-slate-100 focus:ring"} ${icon && "pl-12"} outline-none focus:outline-none  px-3 py-3  relative  rounded text-sm shadow  w-full `}
            {...props}
            />
        </div>
        
    </>
);
});
InputRef.displayName = 'InputRef';

export default InputRef;