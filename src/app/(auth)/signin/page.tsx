"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import React, { ChangeEvent, useState } from "react";
import axios from 'axios';
import { Toaster, toast } from 'sonner';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { FormData } from "../../../../types";
import { z } from 'zod';
import {
  IconBrandGoogle,
} from "@tabler/icons-react";
import { signUpSchema } from "../../../../types/UserSchema";
import SignInWithGoogleButton from "@/components/ui/auth/signIn-google";


const SignUpPage = () => {

  const router = useRouter()

  const [data, setData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { currentTarget: input } = e;
    setData({ ...data, [input.name]: input.value });
  };
  

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const validatedData = signUpSchema.parse(data);
      setErrors({});
      const url = process.env.NEXT_PUBLIC_API_URL as string;
      const res = await axios.post(`${url}/auth/signup`, validatedData);
      console.log(res,"this is response");
      if(res){
        toast.success("Verification Mail Send",{
          position:"bottom-left"
        })
        router.replace("/verify-email")
      }
      

    } catch (error) {
      if (error instanceof z.ZodError) {
        
        const newErrors: Partial<Record<keyof FormData, string>> = {};
      error.errors.forEach((err) => {
        if (err.path[0]) {
          newErrors[err.path[0] as keyof FormData] = err.message;
        }
      });
      setErrors(newErrors);
       
      } else {
      console.log("An unexpected error occurred:", error);
      }
    }
  };
  return (
    <>
      <div className="flex justify-start items-start">
        <Link href="/">
          <Image src="/Zealio_-blkBg-removebg-preview.png" alt="Zealio logo" width={150} height={50} className="object-contain" priority />
        </Link>
      </div>
      <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">

        <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200 text-center">
          Welcome to Zealio.
        </h2>
        <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300 text-center">
          Sign-Up to Zealio and start chasing your Dreams
        </p>

        {Object.keys(errors).length > 0 && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            <strong className="font-bold">Error!</strong>
            <span className="block sm:inline"> Please correct the errors below.</span>
          </div>
        )}


        <form className="my-8" onSubmit={handleSubmit}>
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
            <LabelInputContainer error={errors.firstName}>
              <Label htmlFor="firstname">First name</Label>
              <Input id="firstname" name="firstName" value={data.firstName} onChange={handleChange} placeholder="Cristiano" type="text" />
            </LabelInputContainer>
            <LabelInputContainer error={errors.lastName}>
              <Label htmlFor="lastname">Last name</Label>
              <Input id="lastname" name="lastName" value={data.lastName} onChange={handleChange} placeholder="Ronaldo" type="text" />
            </LabelInputContainer>
          </div>
          <LabelInputContainer className="mb-4" error={errors.email}>
            <Label htmlFor="email">Email Address</Label>
            <Input id="email" name="email" value={data.email} onChange={handleChange} placeholder="yourmail@gamil.com" type="email" />
          </LabelInputContainer>
          <LabelInputContainer className="mb-4" error={errors.password}>
  <Label htmlFor="password">Password</Label>
  <div className="relative">
    <Input 
      id="password" 
      name="password" 
      value={data.password} 
      onChange={handleChange} 
      placeholder="••••••••" 
      type={showPassword ? "text" : "password"} 
      className="pr-10"
    />
    <span
      className="absolute inset-y-2 right-3 cursor-pointer"
      onClick={() => setShowPassword(!showPassword)}
    >
      {showPassword ? (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
          <path d="M15 12c0 1.654-1.346 3-3 3s-3-1.346-3-3 1.346-3 3-3 3 1.346 3 3zm9-.449s-4.252 8.449-11.985 8.449c-7.18 0-12.015-8.449-12.015-8.449s4.446-7.551 12.015-7.551c7.694 0 11.985 7.551 11.985 7.551zm-7 .449c0-2.757-2.243-5-5-5s-5 2.243-5 5 2.243 5 5 5 5-2.243 5-5z" />
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
          <path d="M11.885 14.988l3.104-3.098.011.11c0 1.654-1.346 3-3 3l-.115-.012zm8.048-8.032l-3.274 3.268c.212.554.341 1.149.341 1.776 0 2.757-2.243 5-5 5-.631 0-1.229-.13-1.785-.344l-2.377 2.372c1.276.588 2.671.972 4.177.972 7.733 0 11.985-8.449 11.985-8.449s-1.415-2.478-4.067-4.595zm1.431-3.536l-18.619 18.58-1.382-1.422 3.455-3.447c-3.022-2.45-4.818-5.58-4.818-5.58s4.446-7.551 12.015-7.551c1.825 0 3.456.426 4.886 1.075l3.081-3.075 1.382 1.42zm-13.751 10.922l1.519-1.515c-.077-.264-.132-.538-.132-.827 0-1.654 1.346-3 3-3 .291 0 .567.055.833.134l1.518-1.515c-.704-.382-1.496-.619-2.351-.619-2.757 0-5 2.243-5 5 0 .852.235 1.641.613 2.342z" />
        </svg>
      )}
    </span>
  </div>
</LabelInputContainer>

<LabelInputContainer className="mb-8" error={errors.confirmPassword}>
  <Label htmlFor="confirmPassword">Re-enter Password</Label>
  <div className="relative">
    <Input
      id="confirmPassword"
      name="confirmPassword"
      value={data.confirmPassword}
      onChange={handleChange}
      placeholder="••••••••"
      type={showConfirmPassword ? "text" : "password"}
      className="pr-10"
    />
    <span
      className="absolute inset-y-2 right-3 cursor-pointer"
      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
    >
      {showConfirmPassword ? (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
          <path d="M15 12c0 1.654-1.346 3-3 3s-3-1.346-3-3 1.346-3 3-3 3 1.346 3 3zm9-.449s-4.252 8.449-11.985 8.449c-7.18 0-12.015-8.449-12.015-8.449s4.446-7.551 12.015-7.551c7.694 0 11.985 7.551 11.985 7.551zm-7 .449c0-2.757-2.243-5-5-5s-5 2.243-5 5 2.243 5 5 5 5-2.243 5-5z" />
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
          <path d="M11.885 14.988l3.104-3.098.011.11c0 1.654-1.346 3-3 3l-.115-.012zm8.048-8.032l-3.274 3.268c.212.554.341 1.149.341 1.776 0 2.757-2.243 5-5 5-.631 0-1.229-.13-1.785-.344l-2.377 2.372c1.276.588 2.671.972 4.177.972 7.733 0 11.985-8.449 11.985-8.449s-1.415-2.478-4.067-4.595zm1.431-3.536l-18.619 18.58-1.382-1.422 3.455-3.447c-3.022-2.45-4.818-5.58-4.818-5.58s4.446-7.551 12.015-7.551c1.825 0 3.456.426 4.886 1.075l3.081-3.075 1.382 1.42zm-13.751 10.922l1.519-1.515c-.077-.264-.132-.538-.132-.827 0-1.654 1.346-3 3-3 .291 0 .567.055.833.134l1.518-1.515c-.704-.382-1.496-.619-2.351-.619-2.757 0-5 2.243-5 5 0 .852.235 1.641.613 2.342z" />
        </svg>
      )}
    </span>
  </div>
</LabelInputContainer>

          <button
            className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
            type="submit"
          >
            Sign up &rarr;
            <BottomGradient />
          </button>
       <SignInWithGoogleButton/>
        </form>
        <Toaster/>
      </div>

    </>
  )
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
  error,
}: {
  children: React.ReactNode;
  className?: string;
  error?:string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export default SignUpPage