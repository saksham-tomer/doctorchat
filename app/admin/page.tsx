"use client"

import { useSession } from "next-auth/react"

export default function Page(){
    const {data:session,status} = useSession()
    if(session){
        console.log(session?.user?.role);
    }

    return(
        <div className="mt-20 text-red-600 text-4xl">
            admin page
        </div>
    )
}