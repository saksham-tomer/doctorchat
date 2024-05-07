"use client";
import axios from 'axios'
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
    .toLowerCase(),
  email: z
    .string()
    .min(1, { message: "this field has to be filled" }).optional(),

    password: z.string().max(20,{message: "Password is too long"}).optional(),
});

export function Signup() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
      email: ","
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
        <Button type="submit">Login</Button>
      </form>
    </Form>
  );
}

async function onSubmit(values: z.infer<typeof formSchema>) {
  fetch('/api/createUser',{
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  })
}
