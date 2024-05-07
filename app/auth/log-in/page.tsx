"use client"

// first name -
//last name   |______=>  credentials
//username    |
//password    -


import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { signIn } from "next-auth/react"

export default function Page(){
    const [showPassword,setShowPassword] = useState(false)
    const [hide,setHide] = useState('password')
    const handleInput = (formData: FormData)=>{
        const username = formData.get('username')
        const password = formData.get('password')

        signIn("credentials",{
            username: username,
            password: password,
            callbackUrl: '/patients',
        },) 
    }

    const togglePassowrd = ()=>{
       setShowPassword((prev)=>!prev) 
       if(showPassword == false){
            setHide((prev)=>prev = "password")
       }
       else{
        setHide((prev)=>prev = "text")
       }
    }

    return(
        <div className="flex min-w-full flex-col mx-4 items-center justify-center bg-gradient-to-tr from-blue-200 to-purple-50 min-h-screen">
            <div className="flex bg-white mx-4 p-1 rounded-2xl shadow-xl flex-col bg-transparent backdrop-blur-md items-center">
                <div className="formbg bg-cover shadow-md rounded-2xl p-4 min-w-80 mb-4 flex gap-2 flex-col items-center">
                    <div className="px-3 flex items-center justify-center py-[8px] rounded-lg border-[1.5px] bg-purple-100 shadow-md border-indigo-200">
                    <Image className="shadow-inner-2xl" src={'/globe.png'} alt="globe" height={20} width={20} />
                    </div>
                    <h1 className="font-bold text-3xl">Welcome back</h1>
                    <p className="text-sm text-gray-500">Please enter your details to sign in</p>
                </div>
                <div onClick={()=>signIn("google",{callbackUrl:'/doctor'})} className="py-2 px-32 rounded-xl shadow-xl bg-slate-50 hover:bg-slate-200 mb-2">
                    <button  className="flex items-center">
                    <Image src={'/google.png'} alt="google" height={20} width={20} />
                    </button>
                </div>
                <div className="flex flex-row min-w-32 items-center justify-center gap-2 ">
                    <div className="min-w-full min-h-[0.5px] bg-gray-300"></div>
                    <p className="px-1 text-gray-500">or</p>
                    <div className="min-w-full min-h-[1px] bg-gray-300"></div>
                </div>
                <div className="flex flex-col">
                     <form action={handleInput}>
                        <p className="text-xs mr-auto ml-1 mb-1 text-gray-500">Username</p>
                        <input
                          className="placeholder:text-white pl-8 placeholder:font-light placeholder:text-xs rounded-lg text-gray-500 min-w-72 shadow-lg p-2 bg-transparent border-[1px]  border-slate-300 text-left text-sm font-medium default:outline-none focus:outline-indigo-300 focus:outline-0  "
                          type="text"
                          placeholder="username"
                          id="username"
                          name="username"
                        />
                          <p className="text-xs mr-auto mt-4 ml-1 mb-1 text-gray-500">Password</p>
                        <input
                          className="placeholder:text-white relative mb-4 pl-4 placeholder:font-light placeholder:text-xs rounded-lg min-w-72 shadow-lg p-2 bg-transparent border-[1px] text-gray-500 border-slate-300 text-left text-sm font-medium default:outline-none focus:default:outline-0 focus:outline-indigo-300 "
                          type={hide}
                          placeholder="password"
                          id="password"
                          name="password"
                        />
                         <div onClick={togglePassowrd} className="absolute cursor-pointer transform translate-x-64 rounded-full hover:bg-slate-100 -translate-y-11 shadow-md">
                             <Image src={'/hide.png'} alt="hide" width={20} height={20} />
                         </div>
                    <div className="min-w-full min-h-[1px] bg-gray-300"></div>
                    <button type="submit" className="px-28 mr-auto ml-2 mb-2 shadow-md py-2 bg-gradient-to-br from-purple-400 to-blue-600 text-white mt-2 rounded-xl font-semibold hover:bg-gradient-to-br hover:from-purple-500 hover:to-blue-700">Sign in</button>
                    </form>
                    <div className="flex flex-row gap-2 mr-auto ml-auto mb-2 mt-2">
                        <p className="text-slate-500 text-xs font-semibold">Don&#39;t have an account?</p>
                        <Link href={'/auth/sign-up'}>
                        <div className="cursor-pointer hover:text-purple-700 text-purple-600 text-xs font-semibold">Create account</div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
