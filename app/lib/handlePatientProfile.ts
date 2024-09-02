"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const createPatientProfile = async (
  formData: FormData,
  email: string | undefined,
  tags: string[]
) => {
  const name = formData.get("name");
  const sex = formData.get("sex");
  const age = formData.get("dob")?.toString();
  const about = formData.get("about");
  const password = formData.get("password");

  console.log("the email ===>", email);
  console.log(
    "the password ===> \n the name \n the about\n",
    password,
    name,
    about,
    sex,
    email,
    tags,
    age
  );

  const response = await fetch("http://localhost:3000/api/getPatientInfo", {
    method: "POST",
    // headers: {
    //   "Content-Type": "application/json",
    // },
    body: JSON.stringify({
      name: name,
      email: email,
      sex: sex,
      age: age,
      about: about,
      password: password,
      illness: tags,
    }),
  });

  if (response) {
    redirect(`/account/${email}`);
  }
};
