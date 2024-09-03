import prisma from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { email } = body;

  if (!email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }

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
