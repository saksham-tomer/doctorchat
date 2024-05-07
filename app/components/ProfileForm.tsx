"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import prisma from "../lib/prisma";

import { Input } from "@/components/ui/input";


async function checkIfEmailValid(e:any):Promise<any>{
    const email = await prisma.user.findFirst({
        where: {
            email: e
        }
    })
    if(email){
        return email
    }
}


const formSchema = z.object({
  username: z
    .string()
    .min(2, {
      message: "FirstName must be atleast 2 character",
    })
    .max(12, {
      message: "UserName must be shorter than 12 characters",
    })
    .toLowerCase().optional(),
  email: z
    .string()
    .min(1, { message: "this field has to be filled" })
    .includes("@gmail.com",{message: "Enter valid gmail address"})
    .refine(async (e) => {
      return await checkIfEmailValid(e);
    }, "This email is not in our DB").optional(),

    password: z.string().min(8,{message:"Password is too short"}).max(20,{message: "Password is too long"})
});

export function ProfileForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="firstName lastName" {...field} />
              </FormControl>
              <FormDescription>Enter your first and last name</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={(field) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="email" {...field} />
              </FormControl>
              <FormDescription>Your email</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={(field) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="password" {...field} />
              </FormControl>
              <FormDescription>Your Unique Password</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />  
        <button className="px-4 py-1 rounded-2xl hover:bg-gradient-to-tr hover:from-teal-400 hover:to-blue-400 bg-gradient-to-tr from-teal-200 to-blue-200 ring-1 ring-emerald-400 hover:shadow-lg shadow-sm" type="submit">Login</button>
      </form>
    </Form>
  );
}

function onSubmit(values: z.infer<typeof formSchema>) {
  //todo
}
