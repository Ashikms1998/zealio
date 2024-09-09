"use client";
import Link from "next/link";
import Image from "next/image";
import React, { ChangeEvent, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
    IconBrandGoogle,
} from "@tabler/icons-react";
import { Toaster, toast } from "sonner"
import axios from "axios";
import { useRouter } from "next/navigation";
import { LoginForm } from "../../../../types";

const url = process.env.NEXT_PUBLIC_API_URL as string;

const page = () => {

    const router = useRouter()

    const [data, setData] = useState<LoginForm>({
        email: "",
        password: "",
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { currentTarget: input } = e;
        setData({ ...data, [input.name]: input.value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${url}/auth/admin-login`, data, {
                withCredentials: true,
            })
            if (response) {
                toast.success("admin login successfull", {
                    position: "top-center",
                })
            }
            router.push("/admin-home")
        } catch (error) {
            console.log("An unexpected error occurred:", error)

        }
        console.log("Form submitted");
    };
    return (
        <>
            <div className="flex justify-start items-start">
                <Link href="/admin-login">
                    <Image src="/Zealio_-blkBg-removebg-preview.png" alt="Zealio logo" width={150} height={50} className="object-contain" priority />
                </Link>
            </div>
            <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">

                <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200 text-center">
                    Welcome back to Zealio Mr Admin.
                </h2>


                <form className="my-8" onSubmit={handleSubmit}>

                    <LabelInputContainer className="mb-4">
                        <Label htmlFor="email">Email Address</Label>
                        <Input id="email" placeholder="adminmail@gamil.com" value={data.email} name="email" onChange={handleChange} type="email" />
                    </LabelInputContainer>
                    <LabelInputContainer className="mb-4">
                        <Label htmlFor="password">Password</Label>
                        <Input id="password" placeholder="••••••••" value={data.password} name="password" onChange={handleChange} type="password" />
                    </LabelInputContainer>


                    <button
                        className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
                        type="submit"
                    >
                        Login &rarr;
                        <BottomGradient />
                    </button>

                    <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
                    <div className="flex flex-col space-y-4">

                    </div>
                </form>
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
}: {
    children: React.ReactNode;
    className?: string;
}) => {
    return (
        <div className={cn("flex flex-col space-y-2 w-full", className)}>
            {children}
        </div>
    );
};

export default page





