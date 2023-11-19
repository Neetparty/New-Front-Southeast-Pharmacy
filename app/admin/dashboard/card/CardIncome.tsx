"use client"
import React from "react";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { Icon } from '@iconify/react';
import { AdminDasboardContextType, useAdminDasboard } from "../Context";

export default function CardIncome() {
    
    const {state}:AdminDasboardContextType = useAdminDasboard?.()!;

    return (
        <>
            <div className="relative flex flex-col h-32 w-60 sm:w-72 min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
                <div className="flex-auto p-4">
                    <div className="flex flex-wrap">
                        <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                            <h5 className="">
                                รายรับทั้งเว็บไซด์
                            </h5>
                            <span className="font-semibold text-xl text-blueGray-700">
                                {state.totalPrice} 
                            </span>
                        </div>
                        <div className="relative w-auto pl-4 flex-initial">
                            <div
                                className={
                                    "text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full " +
                                    "bg-red-500"
                                }
                            >

                                <Icon icon="iconoir:home-sale" className="w-8 h-8" />
                            </div>
                        </div>
                    </div>
                 
                 
                </div>
            </div>
        </>
    );
}


