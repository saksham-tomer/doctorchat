"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const createPatientProfile = async (
  formData: FormData,
  email: string,
  tags: string[]
) => {
  const name = formData.get("name");
  const sex = formData.get("sex");
  const age = formData.get("age");
  const about = formData.get("about");

  const response = await fetch("http://localhost:3000/api/getPatientInfo", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      email: email,
      sex: sex,
      age: age,
      about: about,
      illness: tags,
    }),
  });

  if (response) {
    redirect("/");
  }
};
