"use client"
import { Dispatch, SetStateAction, useState } from "react";
import { Dialog } from "../Dialog/Dialog";
import Input from "../Input/Input";
import { NavbarState, ResponseRequestGoogle } from "./NavbarType";
import { Icon } from "@iconify/react";
// import { GoogleLogin, GoogleLoginResponse } from 'react-google-login';
import { toast } from "react-toastify";
import { RegisterWithGoogle, RegisterWithPWD } from "./Auth-api";
import { useDispatch } from "react-redux";
import { addUser } from "@/app/GlobalRedux/Features/user/userSlice";
import { UserRedux } from "@/app/GlobalRedux/Features/Feature";
import { Circular } from "../Loading/Circular";
// import Google from "../Login/Google";
import { TokenResponse, useGoogleLogin } from "@react-oauth/google";
import axios from "axios";

export default function DialogRegister({state,setState, ...props}:{
    state:NavbarState,
    setState:Dispatch<SetStateAction<NavbarState>>
}) {

    const dispatch = useDispatch();
    // const register = useGoogleLogin({
    //     onSuccess:(async(credentialResponse : Omit<TokenResponse, "error" | "error_description" | "error_uri">)  => {
    //         const {data} = await axios.get<ResponseRequestGoogle>("https://www.googleapis.com/oauth2/v3/userinfo",{
    //             headers:{
    //                 Authorization: `Bearer ${credentialResponse.access_token}`
    //             }
    //         })
    //         if(data.sub){
    //             await onSuccess(data);
    //         }
    //         else toast.error("Something Went Wrong Try Again Later")
    //     }),
    //     onError:() => {
    //         toast.error("Something Went Wrong Try Again Later")
    //     }
    // })
    
    const [subState, setSubState] = useState({
        email: "",
        first_name: "",
        last_name: "",
        password: "",
        visible: false,
        confirmPassword: "",
        loading:false
    })

   
    // const onSuccess = async(res: ResponseRequestGoogle) => {
    //     const user: {
    //         googleId: string;
    //         imageUrl: string;
    //         email: string;
    //         name: string;
    //         givenName: string;
    //         familyName: string;
    //     } = {
    //         email: res.email,
    //         imageUrl: res.picture,
    //         googleId: res.sub,
    //         familyName: res.family_name,
    //         givenName: res.given_name,
    //         name: res.name,
            
    //     }

    //     setState(prev => ({...prev, loading:true}))
    //     const {data, error} = await RegisterWithGoogle(user.email, user.givenName, user.familyName, user.imageUrl, user.googleId);
    //     if(error || !data?.user){
    //         setState(prev => ({...prev, loading:false}))
    //         toast.error(error);
    //         return;
    //     }
    //     else {
    //         toast.success("ลงทะเบียนสำเร็จแล้ว")
    //         let user:UserRedux = {
    //             email:data.user.email,
    //             first_name: data.user.first_name,
    //             last_name: data.user.last_name,
    //             image: data.user.image,
    //             role: data.user.role,
    //             user_id:data.user.user_id,
    //             user_name: data.user.user_name
    //         }
    //         dispatch(addUser({user}))
    //         setState(prev => ({...prev, loading:false, openRegister:false, openLogin: false}))
    //     }
    // }


    return (
    <>
      
      <Dialog
            open={state.openRegister}
            header='สมัครสมาชิก'
            onClose={() => setState(prev => ({...prev, openRegister:!prev.openRegister}))}
            className="w-11/12 md:w-3/6 lg:w-2/6"
            >
                <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-2">
                    <div className="flex flex-col gap-2">
                        <h6>อีเมล์</h6>
                        <Input
                        value={subState.email}
                        placeholder='อีเมล์'
                        type="email"
                        onChange={(e:React.ChangeEvent<HTMLInputElement>) => setSubState(prev => ({...prev, email:e.target.value})) }
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <h6>ชื่อจริง</h6>
                        <Input
                        value={subState.first_name}
                        placeholder='ชื่อจริง'
                        type="text"
                        onChange={(e:React.ChangeEvent<HTMLInputElement>) => setSubState(prev => ({...prev, first_name:e.target.value})) }
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <h6>นามสกุล</h6>
                        <Input
                        value={subState.last_name}
                        placeholder='นามสกุล'
                        type="text"
                        onChange={(e:React.ChangeEvent<HTMLInputElement>) => setSubState(prev => ({...prev, last_name:e.target.value})) }
                        />
                    </div>
                    <div className="flex flex-col gap-2 relative">
                        <h6>รหัสผ่าน</h6>
                        <Input
                        value={subState.password}
                        placeholder='รหัสผ่าน'
                        type={subState.visible ? "text" : "password"}
                        onChange={(e:React.ChangeEvent<HTMLInputElement>) => setSubState(prev => ({...prev, password:e.target.value})) }
                        />
                        <div className="absolute bottom-2 right-2">
                            <Icon
                            icon={"mdi:eye"}
                            onClick={() => setSubState(prev => ({...prev, visible:!prev.visible}))}
                            className="text-slate-500 w-6 h-6 cursor-pointer hover:text-slate-400"
                            />
                        </div>
                    </div>
                       
                    <div className="flex flex-col gap-2">
                        <h6>รหัสผ่าน</h6>
                        <Input
                        value={subState.confirmPassword}
                        placeholder='ยืนยันรหัสผ่าน'
                        onChange={(e:React.ChangeEvent<HTMLInputElement>) => setSubState(prev => ({...prev, confirmPassword:e.target.value})) }
                        />
                    </div>

                    <button 
                    type="submit"
                    onClick={handleSubmit}
                    className="text-center px-4 p-2  rounded text-white bg-red-600 hover:bg-red-400/80 "
                    >
                        <h6>สมัครสมาชิก</h6>
                    </button>
                    <button 
                    type="button"
                    onClick={() => setState(prev => ({...prev, openLogin: true, openRegister: false}))}
                    className="text-center px-4 p-2  rounded text-white bg-blue-600 hover:bg-blue-600/80 ">
                        <h6>เข้าสู่ระบบ</h6>
                    </button>
                    {/* <div id="signInButton" className="flex flex-col">
                    <button 
                        onClick={() => register()}
                        type="button"
                        className="flex gap-2 justify-center p-2 items-center w-full border-2 hover:bg-slate-50 bg-white">
                            <Icon
                            icon={"devicon:google"}
                            className="w-6 h-6"
                            />
                            <h6 className="text-base text-slate-600">Register With Google</h6>
                        </button>
                    </div> */}
                </form>
            </Dialog>
        <Circular
        loading={subState.loading}
        />
    </>
);
async function handleSubmit(e:React.FormEvent<HTMLFormElement | HTMLButtonElement>) {
    e.preventDefault();
    const {email, first_name, last_name, password, confirmPassword} = subState;
    if(password !== confirmPassword){
        toast.error("รหัสผ่านกับการยืนยันรหัสผ่านไม่ตรงกัน");
        return;
    }
    else if(!email.includes("@") || !first_name || !last_name){
        toast.error("คุณกรอกข้อมูลไห้ครบหรืออีเมล์ไม่ถูกหลัก");
        return;
    }
    else {
        setState(prev => ({...prev, loading:true}))
        const {data, error} = await RegisterWithPWD(email, first_name, last_name, password);
        if(error || !data?.user){
            setState(prev => ({...prev, loading:false}))
            toast.error(error);
            return;
        }
        else {
            toast.success("ลงทะเบียนสำเร็จแล้ว")
            let user:UserRedux = {
                email:data.user.email,
                first_name: data.user.first_name,
                last_name: data.user.last_name,
                image: data.user.image,
                role: data.user.role,
                user_id:data.user.user_id,
                user_name: data.user.user_name
            }
            dispatch(addUser({user}))
            setState(prev => ({...prev, loading:false, openRegister:false, openLogin: false}))
        }
    }
}

}