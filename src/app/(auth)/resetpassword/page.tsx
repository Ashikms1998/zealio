'use client'
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import { toast } from "sonner";
import Link from "next/link";
import Image from "next/image";
import { rePassword } from "../../../../types";
const url = process.env.NEXT_PUBLIC_API_URL as string;
const page = () => {
    const router = useRouter()
    const [data, setData] = useState<rePassword>({
        password:""
      });

      const [email, setEmail] = useState('');

      const searchParams = useSearchParams();

      useEffect(() => {
        setEmail(searchParams.get('email') || '');
      }, [searchParams]);


    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { currentTarget: input } = e;
        setData({ ...data, [input.name]: input.value });
      };

      const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
           let  response = await axios.post(`${url}/auth/resetpassword`, {
                ...data,
                email,
              }, {
                withCredentials: true,
              });
          if (response) {
            toast.success("Password reset successfull", {
              position: "top-center",
            })
          }
          router.push("/login")
        } catch (error) {
          console.log("An unexpected error occurred:", error)
    
        }
        console.log("Form submitted");
      };



    return (
        <div>
            <div className="bg-white flex items-center justify-center min-h-screen relative overflow-hidden">
                <div className="hidden md:block absolute top-[-4rem] left-[45rem] w-[20rem] h-[20rem] bg-gradient-to-br from-purple-600 to-black rounded-full opacity-50"></div>
                <div className="hidden md:block absolute bottom-[-4rem] right-[4rem] w-[15rem] h-[15rem] bg-gradient-to-br from-purple-600 to-black rounded-full opacity-50"></div>
                <div className="relative z-10  flex flex-col md:flex-row  items-center w-full max-w-screen-lg ml-14 md:px-0">
                   
                    <div className="md:w-1/3 bg-black text-black p-6 md:p-10 rounded-lg shadow-lg max-w-md h-[30rem] relative backdrop-blur-md bg-transparent border border-purple-600">
                        <h2 className="text-2xl font-bold mb-4">  Its okay to forget passwords</h2>
                        <p className="mb-4">Please enter you’re new password </p>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <input
                                    className="w-full px-3 py-2 border border-y-fuchsia-50 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                                     name="password"  type="text" value={data.password} onChange={handleChange}
                                    placeholder="*****"
                                />
                            </div>
                            <button
                                className="w-full py-2 bg-gradient-to-r from-gray-700 to-black hover:from-purple-700 hover:to-purple-800 rounded-lg text-white font-medium"
                                type="submit"
                
                            >
                               Reset Password
                            </button>
                        </form>

                        <span>

                        </span>
                        <div className="mt-4 text-center absolute bottom-6 left-6 right-6 ">
                            <Link href='/signin' className="text-sm text-purple-600 hover:underline">
                                Dont have an account? Signup
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            );
        </div>
    )
}
export default page;