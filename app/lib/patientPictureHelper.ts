"use server";

import prisma from "./prisma";

export default async function getPatientPicture(email: string | undefined) {
  console.log(email);
  const patientImage = await prisma.patient.findUnique({
    where: {
      email: "sakshamtomar2014@gmail.com",
    },
    select: {
      image: true,
    },
  });

  return patientImage;
}
