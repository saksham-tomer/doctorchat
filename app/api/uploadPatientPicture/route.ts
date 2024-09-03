import prisma from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const param = req.headers.get("PatientImage");
  const { email, picture } = body;

  if (param) {
    try {
      let approval = await prisma.patient.update({
        where: {
          email: email,
        },
        data: {
          image: picture,
        },
      });
      if (approval) {
        return NextResponse.json({ success: true }, { status: 200 });
      }
    } catch (err) {
      console.error(err);
      return NextResponse.json(
        { error: "Cannot upload Image" },
        { status: 500 }
      );
    }
  } else {
    return NextResponse.json({ error: "No Image Found" }, { status: 404 });
  }
}

// export async function GET(req: Request) {
//   const body = await req.json();
//   const { email } = body;
//   try {
//     let patientImage = await prisma.patient.findUnique({
//       where: {
//         email: "sakshamtomar2014@gmail.com",
//       },
//       select: {
//         image: true,
//       },
//     });
//     if (patientImage) {
//       return NextResponse.json(patientImage);
//     } else {
//       return NextResponse.json({ error: "No Image Found" }, { status: 404 });
//     }
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json({ error: "Cannot fetch Image" }, { status: 500 });
//   }
// }
