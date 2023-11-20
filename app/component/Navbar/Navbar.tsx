"use client"
import { Icon } from '@iconify/react';
import Image from 'next/image'
import logo from './logo.png'
import { useEffect, useState } from 'react';
import InsidebarUser from './InsidebarUser';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { NavbarState } from './NavbarType';
import DialogLogin from './DialogLogin';
import DialogRegister from './DialogRegister';
import { GetBannerAndCategory, GetCurrentUser, LogOut } from './Auth-api';
import { addUser, removeUser } from '@/app/GlobalRedux/Features/user/userSlice';
import { useTranslation } from 'react-i18next';
import { addCategory } from '@/app/GlobalRedux/Features/category/categorySlice';
import { addBanner } from '@/app/GlobalRedux/Features/banner/bannerSlice';
import { selectBannerData, selectCategoryData, selectLangData, selectUserData } from '@/app/GlobalRedux/Features/selector';
import { addLang } from '@/app/GlobalRedux/Features/lang/langSlice';


export default function Navbar() {
    const category = useSelector(selectCategoryData);
    const user = useSelector(selectUserData);
    const banner = useSelector(selectBannerData);
    const dispatch = useDispatch();
    const { t, i18n } = useTranslation('translation')

    const dropdownLink = [
        {
            text:t("navUserData"),
            icon:"ei:user",
            link:`/user/account/0`,
            iconClassName:"w-10 h-10",
        },
        {
            text:t("navOrderList"),
            icon:"solar:document-linear",
            link:"/user/order/0",
            iconClassName:"w-8 h-8",
        },
        {
            text:t("navFavPro"),
            icon:"ph:heart",
            link:"/user/order/1",
            iconClassName:"w-8 h-8",
        },
        {
            text:t("navHis"),
            icon:"fluent:history-20-regular",
            link:"/user/order/2",
            iconClassName:"w-8 h-8",
        },
    ]

    const [state, setState] = useState<NavbarState>({
        search: "",
        openNavbar: false,
        openLogin: false,
        openRegister: false,
        lang: "th"
    })

    
    const switchLang = (lang: string) => {
        window.localStorage.setItem('lang', lang)
        setState(prev => ({...prev, lang:lang}))
        dispatch(addLang(lang));
        return i18n.changeLanguage(lang)
    }

    useEffect(() => {
        
        if(typeof window !== 'undefined' && window.localStorage.getItem('lang')){
            setState(prev  => ({...prev, lang:window.localStorage.getItem("lang") || "th"}))
        }
        else {
            window.localStorage.setItem("lang", "th")
        }
        
    }, [])
    

    useEffect(() => {
        const cookieExists = checkCookieExist('accessToken');
        const localUser = localStorage.getItem('user') as string

        if (localUser && !user.user_id){
            loadUser()
        }

        if(!user.user_id && cookieExists){
            loadUser()
        }
        else if(banner.length === 0 || category.length === 0){
            loadBannerAndCategory()
        }
    }, [user])
    
    async function handleLogout() {
        const {data, error} = await LogOut();
        dispatch(removeUser(null));
        window.location.reload();
    }

    function handleClose() {
        setState(prev => ({...prev, openNavbar:!prev.openNavbar}))
    }

    return (
        <>
            {/* จอใหญ่ */}
            <div className="hidden md:flex justify-around items-center text-white gap-16 h-[7vh] bg-blue-800 w-full z-10 fixed top-0">
                <Link href="/" className='flex justify-center '>
                    <Image 
                        className=''
                        src={logo}
                        width={150}
                        height={150}
                        alt="Logo"
                    />
                </Link>
               
                <div className='flex items-center gap-4 h-full'>
                  

                    <Link href={"/user/search"}>
                        <Icon icon="system-uicons:search" className="cursor-pointer w-10 h-10 hover:text-slate-200 font-thin" />
                    </Link>
                    <Link href={"/user/account/3"}>
                        <Icon icon="iconamoon:notification-thin" className="cursor-pointer w-10 h-10 hover:text-slate-200" />
                    </Link>
                    <Link href={"/user/shopping-cart"}>
                        <Icon icon="bi:cart" className="cursor-pointer w-8 h-8 hover:text-slate-200" />
                    </Link>
                    <div className='group flex items-center hover:text-slate-200 relative h-full '>
                        <Icon icon="iconoir:language" className='w-10 h-10' />
                        {state.lang.toUpperCase()}
                        <div
                            className="hidden group-hover:block bottom-0 top-full absolute  left-1/2 transform -translate-x-1/2 "
                        >
                            <div className=" flex flex-col text-slate-500 border-x-2 border-slate-200 shadow-lg">
                                <h6 className="py-2 shadow-lg text-md font-semibold cursor-pointer bg-white hover:bg-slate-100 z-30  px-8" onClick={() => switchLang("th")} >TH</h6>
                                <h6 className="py-2 shadow-lg text-md font-semibold cursor-pointer bg-white hover:bg-slate-100 z-30  px-8" onClick={() => switchLang("en")} >EN</h6>
                                <h6 className="py-2 shadow-lg text-md font-semibold cursor-pointer bg-white hover:bg-slate-100 z-30  px-8" onClick={() => switchLang("cn")} >CN</h6>
                            </div>
                        </div>
                    </div>
                    {user.user_id ? 
                      <>
                      {user.image ? 
                        <div className="group relative w-auto z-50 h-full flex items-center">
                            <Image 
                            width={48}
                            height={48}
                            className='w-12 h-12 rounded-full self-center'
                            src={user.image}
                            alt={`${user.user_name} image`}
                            />  
                            
                            <div className="group-hover:block hidden group-hover:h-full bottom-0 top-full absolute  left-0 transform -translate-x-1/2 shadow-lg  min-h-0">
                                <div className="flex flex-col w-max border text-slate-700">

                                    <div className="bg-white flex items-center gap-1 p-4">
                                        <Image 
                                        width={56}
                                        height={56}
                                        className='w-14 h-14 rounded-full'
                                        src={user.image}
                                        alt={`${user.user_name} image`}
                                        />  
                                        <h6 className="text-xl truncate w-36">{user.user_name}</h6>
                                    </div>

                                    <hr/>

                                    {dropdownLink.map((item, i) =>(
                                    <Link 
                                    key={i}
                                    href={item.link}
                                    className="flex gap-2 items-center p-2 px-4 hover:bg-slate-50 bg-white cursor-pointer z-50"
                                    >
                                        <Icon
                                        icon={item.icon}
                                        className={item.iconClassName}
                                        />
                                        <h6 className="text-lg">{item.text}</h6>
                                    </Link>
                                    ))}
                                    {user.role === "admin" && 
                                    <Link 
                                    href={"/admin/dashboard"}
                                    className="flex gap-2 items-center border-b p-2 px-4 hover:bg-slate-50 bg-white cursor-pointer"
                                    >
                                        <Icon
                                        icon={"ri:admin-line"}
                                        className={"w-8 h-8"}
                                        />
                                        <h6 className="text-lg">Admin Dashboard</h6>
                                    </Link>
                                    }

                                    <div 
                                    className="flex gap-2 items-center border-b p-2 px-4 hover:bg-slate-50 bg-white cursor-pointer"
                                    onClick={handleLogout}
                                    >
                                        <Icon
                                        icon={"carbon:logout"}
                                        className={"w-8 h-8"}
                                        />
                                        <h6 className="text-lg">{t("navSignout")}</h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                          :
                          <Icon icon="ei:user" className="cursor-pointer w-12 h-12" />
                    }
                    
                      </>
                        :
                        <Icon
                        onClick={() => setState(prev => ({...prev, openLogin: !prev.openLogin}))} 
                        icon="carbon:login" 
                        className="cursor-pointer w-8 h-8 hover:text-slate-200"
                        />
                    }

                     
                </div>

            </div>


                {/* จอเล็ก */}
            <div className="flex md:hidden justify-around items-center text-white gap-16 h-[7vh] bg-blue-800 w-full z-10 fixed top-0 ">
                <Link href={"/"} className='flex justify-center cursor-pointer '>
                    <Image className=''
                        src={logo}
                        width={150}
                        height={150}
                        alt="Logo"
                    />
                </Link>

                <div 
                className='flex items-center gap-4'                     
                >
                    <Icon 
                    icon="charm:menu-hamburger" 
                    className="w-6 h-6 cursor-pointer"
                    onClick={() => setState(prev => ({...prev, openNavbar: !prev.openNavbar}))}
                    />
                </div>

            </div>

            <div className={`flex flex-col font-semibold bg-white  overflow-y-auto py-2 px-4 text-slate-700 min-h-screen h-full fixed transition-all ${state.openNavbar ? "top-0 left-0" : " top-0 -left-full"} w-full z-50`}>
                <div className="flex justify-between py-4 text-center">
                    <h6 className="text-slate-900 truncate">Southeast Pharmacy</h6>
                    <Icon 
                    icon="material-symbols:close"
                    className="h-6 w-6 text-slate-800 cursor-pointer hover:text-gray-500"
                    onClick={() => setState(prev => ({...prev, openNavbar: !prev.openNavbar}))}
                    />
                </div>
               <InsidebarUser
               switchLang={switchLang}
               lang={state.lang}
               handleLogout={handleLogout}
               t={t}
               handleClose={handleClose}
               />
            </div>


            <DialogLogin
            state={state}
            setState={setState}
            />

            <DialogRegister
            state={state}
            setState={setState}
            />
            
          
        </>
    );



function checkCookieExist(cookieName:string) {
    const cookies = document.cookie.split(';');

    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        
        // Check if the cookie starts with the desired name
        if (cookie.startsWith(`${cookieName}=`)) {
        return true; // Cookie found
        }
    }
    
    return false; // Cookie not found
    }
    


async function loadUser() {
    const {data, error} = await GetCurrentUser(category, banner);
    if(data?.user){
        dispatch(addUser(data.user));
    }
    if(data?.category){
        dispatch(addCategory(data.category));
    }
    if(data?.banner){
        dispatch(addBanner(data.banner));
    }
    
}

async function loadBannerAndCategory() {
    const {data, error} = await GetBannerAndCategory(category, banner);
    if(data?.category){
        dispatch(addCategory(data.category));
    }
    if(data?.banner){
        dispatch(addBanner(data.banner));
    }
    
}
}