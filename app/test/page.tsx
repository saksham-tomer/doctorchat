"use client"

export default function Page(){

    
    return(
        <div className="mt-12 text-4xl text-red-400">
            test
            <div className="flex flex-col relative gap-8 items-center justify-center">
                <video className="rounded-xl"  src="/ninja.mp4" autoPlay loop width={350} height={350} />
                <video className="rounded-full transform translate-x-20 translate-y-12 absolute" src="/ninja2.mp4" autoPlay loop width={150} height={150}/>
            </div>
        </div>
    )
}