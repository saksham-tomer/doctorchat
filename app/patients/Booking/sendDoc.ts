"use server";

import prisma from "@/app/lib/prisma";

export default async function SendDoc({ id, MMe }) {
  console.log(id);
    let Id = JSON.parse(id)
  let me = MMe;
  const res = await prisma.doctor.update({
    where: {
      doctorid: Id,
    },
    data: {
      patient_id: me,
    },
  });

  return res;
}
