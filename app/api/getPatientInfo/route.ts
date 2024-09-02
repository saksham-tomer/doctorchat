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
    password: string;
    about: string;
    illness: string[];
  };
}

export async function GET(request: Request) {
  const body = await request.json();
  const { email } = body;

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

export async function POST(request: Request) {
  const body = await request.json();
  const { password, name, age, email, about, illness, sex } = body;
  const patientId = parseInt(uuidV4());

  const exist = await prisma.patient.findFirst({
    where: { email: email },
  });

  if (exist) {
    try {
      const patient = await prisma.patient.update({
        where: {
          email: email,
        },
        data: {
          name: name,
          username: name,
          email: email,
          age: age,
          about: about,
          password: password,
          illness: illness,
          patientid: patientId,
          sex: sex,
        },
      });
      if (patient) {
        return NextResponse.json({ success: true }, { status: 200 });
      }
    } catch (error) {
      console.error(error);
      return NextResponse.json(
        { error: "Cannot update patient info" },
        { status: 500 }
      );
    }
  }

  if (!email) {
    console.error("Email is not defined in the request body");
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }

  try {
    const patientInfo = await prisma.patient.create({
      data: {
        name: name,
        username: name,
        email: email,
        age: age,
        about: about,
        password: password,
        illness: illness,
        patientid: patientId,
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
