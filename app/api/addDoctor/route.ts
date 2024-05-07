import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";
import { toDate } from "date-fns";


export async function POST(req:NextRequest) {

   const { name,
        email,
        dob,
        lastname,
        address,
        phone,
        image,
        sex,
        specialization,
        about,
        doctorid,
} = await req.json()

  const date = new Date(dob)
  const isoDate = date.toISOString()
  const phoneno = parseInt(phone)
  const doctorId = parseInt(doctorid)

    const doctor = await prisma.doctor.create({
        data:{
        name: name,
        email: email,
        dob: isoDate,
        lastname: lastname,
        image: image,
        address: address,
        sex: sex,
        specialization: specialization,
        about: about,
        phone: phoneno,
        doctorid: doctorId,
        },
    })

  return NextResponse.json({message:"Good job"})
}