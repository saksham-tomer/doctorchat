
import prisma from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";


//lol forgot to use await 
export async function POST(request:Request){
    const {firstname,lastname,username,password} = await request.json()
    console.log("hello from server");
    console.log(firstname);
  const user =  await prisma.patient.create({
    data:{
        firstname: firstname,
        lastname: lastname,   
        username: username,
        password: password,
    },
    })
        //return NextResponse.redirect('http://localhost:3000/patients')
    
    return NextResponse.json({message:"Good job"})
}