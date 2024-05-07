"use server"
import prisma from "./prisma";



export default async function  getAllDoctors(){
    const doctors = await prisma.doctor.findMany()
    return doctors
}