"use client"
import { Join } from '@/app/components/CreateButton'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function Page(){
    const router = useRouter()
    const testRedir = ()=>{
        router.push('/test')
    }
    return(
        <div className='mt-12 text-4xl text-red-400 flex flex-col items-center justify-center gap-4'>Appointment Details
       <Join />   
       <button onClick={testRedir} className='px-6 py-1 rounded-lg bg-blue-400 text-base font-semibold text-white'>test</button>
        </div>
    )
}

