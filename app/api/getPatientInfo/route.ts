import prisma from "@/app/lib/prisma";
import { NextResponse } from "next/server";
import { v4 as uuidV4 } from "uuid";

interface Req {
  body: {
    email: string;
  };
}

interface PatientRequest {
  body: {
    name: string;
    email: string;
    sex: string;
    age: string;
    about: string;
    illness: string[];
  };
}

export async function GET(request: Req) {
  const { email } = request.body;
  try {
    const patientInfo = await prisma.patient.findUnique({
      where: {
        email: email,
      },
    });
    return NextResponse.json(patientInfo);
  } catch (error) {
    console.error("Error fetching patient info:", error);
    return NextResponse.json(
      { error: "Failed to fetch patient info" },
      { status: 500 }
    );
  }
}

export async function POST(request: PatientRequest) {
  const { name, age, about, illness, sex } = request.body;
  const email = "sakshamtomar2ail.com";
  const patientid = parseInt(uuidV4());
  try {
    const patientInfo = await prisma.patient.create({
      data: {
        name: name,
        username: name,
        email: email,
        age: age,
        about: about,
        illness: illness,
        patientid: patientid,
        sex: sex,
      },
    });
    if (patientInfo) {
      return NextResponse.json({ success: true }, { status: 200 });
    }
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to fetch patient info" },
      { status: 500 }
    );
  }
}
