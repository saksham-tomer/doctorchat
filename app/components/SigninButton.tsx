"use client"

import Image from 'next/image'
import { signIn, signOut, useSession } from "next-auth/react"
import { useState,useEffect } from 'react'
import { Skeleton } from '@/components/ui/skeleton'
import { Badge } from '@/components/ui/badge'
import { SeparatorHorizontal } from 'lucide-react'
import Link from 'next/link'

export const SigninButton = ()=>{
    const {data: session,status} = useSession()
    const[display,setDisplay] = useState(false)

    if(status === 'loading'){
        return (
            <div className='flex items-center gap-4 justify-center'>
                <Skeleton  className='h-8 rounded-lg bg-gray-200 w-20'/>
            </div>
        )
        
    }

    if(session && session.user){
        console.log(session.user)
        return(
            <div className="flex felx-row shadow-lg rounded-full border-[1.5px] border-gray-400 items-center ml-4">
                <Image src={session ? session.user.image: "/14.png"}
                alt="logo"
                className="rounded-full shadow-xl relative"
                onClick={()=>setDisplay((prev)=>!prev)}
                // onMouseEnter={setDisplay(true)}
                // onMouseLeave={setDisplay(false)}
                width={38}
                height={38}
                />
                {display && <div className='ring-1 border-b-4 border-b-gray-300 ring-slate-300 shadow-2xl absolute min-w-60 z-30 min-h-8 bg-white flex flex-col items-center p-2 transform -translate-x-48 mt-1 rounded-lg translate-y-28'>
                    <div className=' p-2 flex min-w-full items-center flex-row gap-2 mr-auto'>
                       <Image className="rounded-full min-w-10 ring-1 ring-slate-500 shadow-md mr-2" src={session.user.image} alt='user' width={25} height={25} />
                       <div className='flex flex-col items-center'>
                       <p className='text-gray-400 font-bold'>{session.user.name}</p>
                       <div className='mr-auto ml-2 font-semibold shadow-2xl px-2 py-[1px] text-xs rounded-2xl bg-gray-600 text-gray-200'>{session.user.role}</div>
                       </div>
                        </div> 
                        <div className='min-h-[1px] min-w-full mt-2 mb-1 bg-gray-300'></div>
                        <Link className='mr-auto ml-4' href={`/account/${session.user.name}`}>
                        <div className='flex flex-row items-center mt-2 gap-4'>
                            <Image src={'/set.png'} alt='setting' width={16} height={16} />
                            <p className='hover:bg-gray-600 hover:rounded-xl hover:text-gray-300 hover:px-[8px] text-sm text-gray-500 font-semibold'>Manage account</p>
                        </div>
                        </Link>
                         <div className='min-h-[1px] min-w-full mt-4 mb-1 bg-gray-300 shadow-lg '></div>
                          <div className='flex relative mr-auto ml-4 flex-row items-center mb-2 mt-2 gap-4'>
                            <Image src={'/exit.png'} alt='setting' width={16} height={16} />
                            <p onClick={()=>signOut()} className='hover:bg-gray-600 cursor-pointer hover:rounded-xl hover:text-gray-300 hover:px-[8px] text-sm text-gray-500 font-semibold'>Sign out</p>
                        </div> 
                        <div className='absolute min-w-full min-h-8 bg-gray-200 ring-1 ring-gray-300 rounded-b-xl transform translate-y-[166px]  p-2 shadow-md text-xs text-gray-400 flex items-center justify-center font-bold'>Powered by Trust</div>
                    </div>}
            </div>
        )
    }
    return(
        <button onClick={()=>signIn(undefined,{callbackUrl:'/patients'})} className='px-4 py-1 rounded-xl bg-yellow-400 text-white font-medium shadow-lg hover:bg-yellow-500'>Sign In</button>
    )
}

