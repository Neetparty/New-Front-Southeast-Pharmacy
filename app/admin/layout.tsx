"use client"
import { useSelector } from "react-redux";
import AdminNavbar from "../component/Navbar/AdminNavbar";
import Sidebar from "../component/Sidebar/Sidebar";
import 'moment/locale/th';
import { selectUserData } from "../GlobalRedux/Features/selector";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { makeRequest } from "../hook/makeRequest";
import { toast } from "react-toastify";


const Layout = ({
    children,
  }: {
    children: React.ReactNode
  }) => {

    const user = useSelector(selectUserData);
    const router = useRouter();

    useEffect(() => {
        
        if(user.role !== "admin"){
            CheckRole();
        }
    }, [user])
    
    async function CheckRole() {
        const {data, error} = await makeRequest<{
            msg:string, 
            user:{
                user_id: string,
                first_name: string,
                last_name: string,
                user_name: string,
                role: string,
                email: string,
                image: string,
            }
        }>("/user-data",{
            method:"GET",
        })
        if(error){
            toast.error("Something Went Wrong Here");
            router.push("/");
        }
        else if(!data?.user || data?.user.role !== "admin")  {
            toast.error("You Don't have permission for this");
            router.push("/");
        }
        else if(data.user.role === "admin"){
            
        }
        else {
            toast.error("Something Went Wrong Here");
            router.push("/");
        }
        
    }


    return (

    <>
        <div className="flex">
            <div className="flex lg:flex-row flex-col w-full ">
                <div className="relative min-w-56 z-50">
                    <AdminNavbar/>
                    <Sidebar/>
                </div>
                <div className="w-full mx-auto bg-white lg:mt-[7vh] overflow-hidden ">
                    {children}
                </div>
            </div>
            
        </div>
        

    </>
);
}
export default Layout

/* 
import AdminNavbar from "../component/Navbar/AdminNavbar";
import Sidebar from "../component/Sidebar/Sidebar";

const layout = ({
    children,
  }: {
    children: React.ReactNode
  }) => {

    return (
    <>
        <div className="flex">
            <AdminNavbar/>
            <div className="flex md:flex-row flex-col w-full mt-[7vh]">
                <div className="w-full md:w-64 z-50">
                    <Sidebar/>
                </div>
                <div className="w-full md:mx-16 bg-white">
                    {children}
                </div>
            </div>
        </div>

    </>
);
}
export default layout


*/