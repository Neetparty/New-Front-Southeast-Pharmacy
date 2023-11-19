"use client"
import React, { useEffect } from 'react'
import "./Dialog.css";
import { Icon } from '@iconify/react';

interface DialogProps {
    children:React.ReactNode;
    open:boolean;
    onClose:() => void;
    header:string;
    className?:string;
    top?:string;
}

export const Dialog: React.FC<DialogProps> = ({children, open=false, onClose, header="", className="w-3/4 md:w-2/4 lg:w-1/4", top="top-[40%]"}) => {

    useEffect(() => {
        function handleKeyDown(event:KeyboardEvent) {
          if (event.key === 'Escape') {
            onClose();
          }
        }
    
        document.addEventListener('keydown', handleKeyDown);
        return () => {
          document.removeEventListener('keydown', handleKeyDown);
        };
      }, [onClose]);

    return (
    <div id="myModal" >
        <div 
        className={` ${open ? "block" : "hidden"} modal-content  text-base leading-relax tracking-[0.02857em] `}
        >
            <div  className={`bg-white flex flex-col gap-4 ${className}  mx-auto p-4 center-dialog `} //w-2/3 md:w-1/3  
               >
                <div className="flex justify-between mx-2">
                    <h6 className="text-2xl font-bold leading-relax tracking-wide">{header}</h6>
                    <button 
                    onClick={() => onClose()}
                    className=""
                    >
                      <Icon icon="material-symbols:close"className="h-6 w-6 text-gray-500" />

                    </button>
                </div>
                <hr/>
                <div className="overflow-y-auto max-h-[70vh]">
                    {children}
                </div>
            </div>
        </div>
    </div>
);
}