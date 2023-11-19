"use client"
import React from 'react'
import NormalLink from './NormalLink';
import DropSidebar from './DropSidebar';
interface InSidebarProps {
}
const product = [
        {
            link:"/admin/create-product",
            text:"สร้างสินค้า",
            icon:"gridicons:create"
        },
        {
            link:"/admin/list-product",
            text:"ดูสินค้าทั้งหมด",
            icon:"icon-park-outline:shopping"
        },
]

const user = [
        {
            link:"/admin/list-user",
            text:"ดูยูสเซอร์ทั้งหมด",
            icon:"ph:user"
        },
        {
            link:"/admin/add-user",
            text:"เพิ่มยูสเซอร์",
            icon:"la:user-lock"
        },
]

const delivery = [
    {
        link:"/admin/confirm-order",
        text:"ยืนยันออเดอร์",
        icon:"icon-park-outline:correct"
    },
]

export const InSidebar: React.FC<InSidebarProps> = ({}) => {

    return (
    <div className="">
                
                <div className="flex flex-col gap-4 group">
                    
                    <div className="grid gap-8">
                        <hr className="border-slate-500"/>

                    <NormalLink
                    link='/admin/dashboard'
                    icon='mdi:graph-line'
                    text='หน้าแรก'
                    />

                    <NormalLink
                    link='/admin/create-category'
                    icon='material-symbols:category'
                    text='หมวดหมู่'
                    />

                    <DropSidebar
                    arr={product}
                    link='/admin'
                    icon='fluent-mdl2:product'
                    text='สินค้า'
                    />
                    
                    
                    <DropSidebar
                    arr={user}
                    link='/admin'
                    icon='ph:user'
                    text='ยูสเซอร์'
                    />
                    
                    <DropSidebar
                    arr={delivery}
                    link='/admin'
                    icon='carbon:delivery-truck'
                    text='สถานะขนส่ง'
                    />
                
                    <NormalLink
                    link='/admin/promotion'
                    icon='fluent-mdl2:product-variant'
                    text='สินค้าโปรโมชั่น'
                    />
                  
                    <NormalLink
                    link='/admin/banner'
                    icon='material-symbols:planner-banner-ad-pt-outline'
                    text='ภาพ Banner'
                    />
                    
                    <NormalLink
                    link='/admin/notification'
                    icon='solar:bell-line-duotone'
                    text='การแจ้งเตือน'
                    />

                    <NormalLink
                    link='/admin/shipping'
                    icon='solar:delivery-linear'
                    text='ราคาขนส่ง'
                    />

                    <NormalLink
                    link='/admin/transaction'
                    icon='solar:document-line-duotone'
                    text='Transaction'
                    />

                    </div>
                  
                </div>
              
                

             
    </div>
);
}