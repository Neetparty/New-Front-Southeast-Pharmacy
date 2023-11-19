"use client";

import { Icon } from "@iconify/react";
import { toast } from "react-toastify";
import { DetailState } from "./detail-type";

export default function CountNumber({state, setState, quantity}: {
    state: DetailState;
    setState: React.Dispatch<React.SetStateAction<DetailState>>;
    quantity: number;
}) {


    return (

        <div className="flex text-white md:justify-start justify-center">
            <button 
            onClick={onAdd}
            className="bg-red-400 p-1 px-2"
            type="button"
            >
                <Icon
                icon={"material-symbols:add"}
                />
            </button>

            <input 
            type="number"
            value={state.totalProduct}
            onChange={onChangeInput}
            className="text-slate-800 border-b border-t  border-red-400 p-1 px-2 w-fit max-w-[2.5rem] text-center outline-none focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"/>
            
            <button 
            className="bg-red-400 p-1 px-2"
            type="button"
            onClick={onDelete}
            >
                <Icon
                icon={"ic:baseline-minus"}
                />
            </button>
        </div>
);

function onChangeInput(e:React.ChangeEvent<HTMLInputElement>){
    setState(prev => {

        let input = Number(e.target.value)
        if(input > quantity-1){
            toast.error("ดูเหมือนว่าสินค้าของเราจะมีไม่เพียงพอความต้องการของคุณ");
            return {...prev, totalProduct:quantity}
        }
        else if(input < 1){
            toast.error("สินค้าไม่สามารถติดลบได้");
            return {...prev}
        }
        else {
            return {...prev, totalProduct:input}
        }
    })
}

function onAdd(){
    setState(prev => {
        if(prev.totalProduct > quantity-1){
            toast.error("ดูเหมือนว่าสินค้าของเราจะมีไม่เพียงพอความต้องการของคุณ");
            return {...prev}
        }
        else {
            return {...prev, totalProduct:prev.totalProduct+1}
        }
    })
}

function onDelete(){
    setState(prev => {
        if(prev.totalProduct < 1){
            toast.error("สินค้าไม่สามารถติดลบได้");
            return {...prev}
        }
        else {
            return {...prev, totalProduct:prev.totalProduct-1}
        }
    })
}

}

