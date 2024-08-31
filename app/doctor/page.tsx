"use client"

import * as React from "react"

import { useRouter } from "next/navigation"

export default function Page() {

  const router = useRouter()

  const doctorForm = ()=>{
    router.replace('/doctor/doctorform')
  }

  return (
    <div className="w-full mt-12">
      <button onClick={doctorForm} className="px-8 py-1 rounded-xl shadow-lg bg-green-300 text-white font-semibold">Form</button>
    </div>
  )
}

