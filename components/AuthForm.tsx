"use client"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import CustomFormField from './FormField'; 
import { Input } from "@/components/ui/input"
import React from 'react'
import Image from "next/image"
import Link from "next/link"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

type AuthType = 'sign-in' | 'sign-up';
// Form schema definition
const getAuthFormSchema = (type: AuthType) => {
  return z.object({
    ...(type === 'sign-up' && { 
      name: z.string().min(2) 
    }),
    email: z.string().email(),
    password: z.string().min(8)
  });
};

function AuthForm({ type }: { type: AuthType }) {
  const router = useRouter(); // Moved useRouter hook call here
  const isSignIn = type === 'sign-in';
  const formSchema = getAuthFormSchema(type);
  
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name:'',
      email: '',
      password: '',
    },
  });
 
  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      if(type === 'sign-up'){
        toast.success('Account created successfully. Please Sign in.')
        router.push('/sign-in')
      }else{
        toast.success('successfull sign in ')
        router.push('/interview')
      }
    } catch (error) {
      toast.error(`There was an error : ${error}`)
    }
  }

  return (

    <div className="card-border lg:min-w-[566px]">
      <div className="flex flex-col gap-6 card py-14 px-10">
        <div className="flex flex-row gap-2 justify-center">
          <Image src='logo.svg' alt="logo" height={32} width={38} />
          <h2  className="text-primary-100">PrepWise</h2>
        </div>
        <h3 className="text-center">Practice job interiew with AI </h3>
       <Form {...form}>
      {/* shadcn form */}
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
    {type === 'sign-up' && 
          <CustomFormField 
            control={form.control}
            name="name"
            label="Name" // Added label prop
            placeholder="Enter your name"
            type="text"
          />
        }
        <CustomFormField 
        control={form.control}
        name="email"
        label="Email" // Added label prop
        placeholder="Enter email address"
        type="email" />

        <CustomFormField 
        control={form.control}
        name="password"
        label="Password" // Added label prop
        placeholder="Enter your password"
        type="password" />  

      <Button className="!w-full !bg-primary-200 !text-dark-100 hover:!bg-primary-200/80 !rounded-full !min-h-10 !font-bold !px-5 cursor-pointer" type="submit" >{isSignIn ? 'Sign-in' : 'Create an Account '}</Button>
    </form>
  </Form>
  <p className="text-center">{isSignIn ? 'No account yet?' : 'Have an account already? '}
    <Link href={!isSignIn ? '/sign-in' : '/sign-up'} className="font-bold text-user-primary ml-1" >
    {!isSignIn ? 'Sign-in' : 'Create an Account '}
    </Link>
  </p>
  </div>
  </div>

  )
}

export default AuthForm