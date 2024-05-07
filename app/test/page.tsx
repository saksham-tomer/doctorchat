"use client"

import { useRouter } from "next/navigation"
import Confetti from 'react-confetti'

export default function Page(){
    const router = useRouter()
    const leave = ()=>{
        router.push('/')
    }
    return(
        <div className=" flex flex-col items-center justify-center text-4xl text-red-400 bg-gradient-to-bl from-pink-100 via-purple-300 to-cyan-300 min-h-screen">
            <Confetti  width={1000} height={1000} tweenDuration={0.5} />
            <div className="flex shadow-xl shadow-teal-500 flex-col relative gap-8 items-center justify-center">
                <video className="rounded-xl ring-2 ring-blue-300"  src="https://media.istockphoto.com/id/1274771319/video/fit-woman-athlete-maintaining-a-healthy-lifestyle-hiking-in-mountains-over-rocky-trails-and.mp4?b=1&s=mp4-640x640-is&k=20&c=22lXBSwH14mGqyrFGbZRVufbwYs0DSOPeCCLq3v3h7Y=" autoPlay loop width={380} height={380} />
                <video className="rounded-full transform translate-x-28 ring-1 ring-gray-600 shadow-md shadow-purple-700 translate-y-14 absolute" src="https://media.istockphoto.com/id/1278197574/video/family-canoeing-on-a-stunning-mountain-lake.mp4?b=1&s=mp4-640x640-is&k=20&c=Ci42KFy6YA6VOGkaQRzTuji9iBk0G34sECU9-8dkcgA=" autoPlay loop width={150} height={150}/>
            </div>
            <button onClick={leave} className="px-8 text-base py1 text-white font-semibold bg-red-500 rounded-xl shadow-xl mt-8 hover:bg-red-600">Leave</button>
            
        </div>
    )
}