"use client"

import type{
    GetServerSidePropsContext,
    InferGetServerSidePropsType,
} from 'next'
import { getProviders,signIn } from 'next-auth/react'
import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]/route'

export default function SignIn({
    providers,
}:InferGetServerSidePropsType<typeof getServerSideProps>){
    return(
        <>
        {Object.values(providers).map((provider)=>(
            <div key={provider.name}>
                <button onClick={()=>signIn(provider.id)}>
                    Sign in with {provider.name}
                </button>
            </div>
        ))}
        </>
    )
}

export async function getServerSideProps(context: GetServerSidePropsContext){
    const session = await getServerSession(context.req,context.res,authOptions)

    if(session){
        if(session.user.role === "admin"){
            return {redirect: {destination: '/doctor'}}
        }
        else if(session.user.role ==="patient"){return {redirect: {destination: '/patients'
        }}}
    }

    const providers = await getProviders()
    return {
        props: {providers: providers ?? []},
    }
}

