"use client"

// first name -
//last name   |______=>  credentials
//username    |
//password    -


import { Signup } from "@/app/components/Signup"
import { FormEvent, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { signIn } from "next-auth/react"
import { createAccount } from "@/app/lib/HandleSubmit"

export default function Page(){

  

    const [showPassword,setShowPassword] = useState(false)
    const [hide,setHide] = useState('password')


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
        <div className="flex min-w-full flex-col mx-4 mt-6 items-center justify-center bg-gradient-to-tr from-blue-200 to-purple-50 min-h-screen">
            <div className="flex bg-white mx-4 p-1 rounded-2xl shadow-xl flex-col bg-transparent backdrop-blur-md items-center">
                <div className="formbg bg-cover shadow-md rounded-2xl p-4 min-w-80 mb-4 flex gap-2 flex-col items-center">
                    <div className="px-3 flex items-center justify-center py-[8px] rounded-lg border-[1.5px] bg-purple-100 shadow-md border-indigo-200">
                    <Image className="shadow-inner-2xl" src={'/globe.png'} alt="globe" height={20} width={20} />
                    </div>
                    <h1 className="font-bold text-3xl">Welcome back</h1>
                    <p className="text-sm text-gray-500">Please enter your details to sign in</p>
                </div>
                <div className="py-2 px-32 rounded-xl shadow-xl bg-slate-50 hover:bg-slate-200 mb-2">
                    <button className="flex items-center">
                    <Image src={'/google.png'} alt="google" height={20} width={20} />
                    </button>
                </div>
                <div className="flex flex-row min-w-32 items-center justify-center gap-2 ">
                    <div className="min-w-full min-h-[0.5px] bg-gray-300"></div>
                    <p className="px-1 text-gray-500">or</p>
                    <div className="min-w-full min-h-[1px] bg-gray-300"></div>
                </div>
                <div className="flex flex-col">
                     <form action={createAccount} method="POST" >
                        <div className="flex flex-row items-center gap-2">
                        <div className="flex flex-col items-center mt-5">
                        <p className="text-xs mr-auto ml-1 pb-1  text-gray-500">First name</p>
                        <input
                          className="placeholder:text-white pl-8 placeholder:font-light placeholder:text-xs rounded-lg text-gray-500 max-w-36 shadow-lg p-2 bg-transparent border-[1px]  border-slate-300 text-left text-sm font-medium default:outline-none focus:outline-indigo-300 focus:outline-0  "
                          type="text"
                          placeholder="firstname"
                          id="firstname"
                          name="firstname"
                          />
                          </div>
                          <div className="flex flex-col items-center gap-1 mt-1">
                          <p className="text-xs mr-auto mt-4 ml-1 text-gray-500">Last name</p>
                        <input
                          className="placeholder:text-white pl-4 placeholder:font-light placeholder:text-xs rounded-lg max-w-36 shadow-lg p-2 bg-transparent border-[1px] text-gray-500 border-slate-300 text-left text-sm font-medium default:outline-none focus:default:outline-0 focus:outline-indigo-300 "
                          type="text"
                          placeholder="lastname"
                          id="lastname"
                          name="lastname"
                          />
                          </div>
                          </div>
                         <p className="text-xs mr-auto mt-4 ml-1 mb-1 text-gray-500">User name</p>
                        <input
                          className="placeholder:text-white pl-4 placeholder:font-light placeholder:text-xs rounded-lg min-w-72 shadow-lg p-2 bg-transparent border-[1px] text-gray-500 border-slate-300 text-left text-sm font-medium default:outline-none focus:default:outline-0 focus:outline-indigo-300 "
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
                    <div className="min-w-full min-h-[1px] bg-gray-300 mb-2"></div>
                    <button type="submit" className="px-28 mr-auto ml-2 mb-2 shadow-md py-2 bg-gradient-to-br from-purple-400 to-blue-600 text-white mt-2 rounded-xl font-semibold hover:bg-gradient-to-br hover:from-purple-500 hover:to-blue-700">Sign up</button>
                     </form>
                    <div className="flex flex-row gap-2 mr-auto ml-auto mb-2 mt-2">
                        <p className="text-slate-500 text-xs font-semibold">Have an account?</p>
                        <Link href={'/auth/log-in'}>
                        <div className="cursor-pointer hover:text-purple-700 text-purple-600 text-xs font-semibold">Log in</div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}


