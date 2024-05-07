"use client"

import { useRouter } from "next/navigation"

export default function Page(){
    const router = useRouter()
   const redir = ()=>{
    router.push('/feedback')
   }
    return(
        <div className="mt-12 text-4xl text-red-400">
            feedback
            <button onClick={redir}>Home</button>
        </div>
    )
}