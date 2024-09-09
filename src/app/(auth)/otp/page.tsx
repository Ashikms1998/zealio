"use client";
import Link from 'next/link'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation';
import { verifyOTP } from '../../../../types';
import axios from 'axios';
import { toast, Toaster } from 'sonner';
import { useRouter } from 'next/navigation';
const url = process.env.NEXT_PUBLIC_API_URL as string;
const page = () => {
    const router = useRouter()
    const [data, setData] = useState<verifyOTP>({
        verify_token:""
      });
      
      const [email, setEmail] = useState('');
      const [cooldownSeconds,setCooldownSeconds] = useState(60);
      const searchParams = useSearchParams();

      useEffect(() => {
        setEmail(searchParams.get('email') || '');

        const storedStartTime = localStorage.getItem("otpResendExpiration");
        const storedDuration = localStorage.getItem("otpResendDuration");
        if(storedStartTime && storedDuration){
          const startTime = parseInt(storedStartTime);
          const duration = parseInt(storedDuration);
          const currentTime = new Date().getTime();
          const elapsedTime = Math.floor((currentTime - startTime) / 1000);
          const remainingTime = duration - elapsedTime;
      
          if (remainingTime > 0) {
            setCooldownSeconds(remainingTime);
          } else {
            localStorage.removeItem('otpResendStartTime');
            localStorage.removeItem('otpResendDuration');
            setCooldownSeconds(0);
          }
      } else {
        
        setCooldownSeconds(60);
      }
        const interval = setInterval(()=>{
          setCooldownSeconds(prev=>{
            if(prev<=0){
              clearInterval(interval);
              localStorage.removeItem('otpResendStartTime');
              localStorage.removeItem('otpResendDuration');
              return 0;
            }
            localStorage.setItem('otpResendDuration', prev.toString());
            return prev - 1;
          });
        },1000);

        return ()=>clearInterval(interval)

      }, [searchParams]);


      const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { currentTarget: input } = e;
        setData({ ...data, [input.name]: input.value });
      };

      const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
           let  response = await axios.post(`${url}/auth/otp`, {
                ...data,
                email,
              }, {
                withCredentials: true,
              });

              console.log(response,"this is the response dude")

            if (response.status >= 400) {
                throw new Error(response.data.message);
            }    

          if (response.data.success) {
            toast.success(response.data.message, {
                position: "top-center",
            });
            router.push(`/resetpassword?email=${email}`);
        } else {
            toast.error(response.data.message, {
                position: "top-center",
            });
        }
    } catch (error) {
        console.error("An unexpected error occurred:", error);
        if ((error as any).response && (error as any).response.data) {
            toast.error((error as any).response.data.message, {
                position: "top-center",
            });
        } else {
            toast.error("An error occurred during OTP verification", {
                position: "top-center",
            });
        }
    }
};

      const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if(cooldownSeconds>0) return;
          try {
            let  response = await axios.post(`${url}/auth/resendOtp`, {
                 ...data,
                 email,
               }, {
                 withCredentials: true,
               });
               if (response.status === 200) {
                toast.success("OTP successfully resent", {
                  position: "top-center",
                });

                const startTime = new Date().getTime();
                localStorage.setItem('otpResendStartTime', startTime.toString());
                localStorage.setItem('otpResendDuration', '60');
                setCooldownSeconds(60);

              }
        } catch (error) {
            console.log("An unexpected error occurred:", error)  
        }
      }

    return (
        <div>
            <div className="bg-white flex items-center justify-center min-h-screen relative overflow-hidden">
                <div className="hidden md:block absolute top-[-4rem] left-[45rem] w-[20rem] h-[20rem] bg-gradient-to-br from-purple-600 to-black rounded-full opacity-50"></div>
                <div className="hidden md:block absolute bottom-[-4rem] right-[4rem] w-[15rem] h-[15rem] bg-gradient-to-br from-purple-600 to-black rounded-full opacity-50"></div>
                <div className="relative z-10  flex flex-col md:flex-row  items-center w-full max-w-screen-lg ml-14 md:px-0">
                   
                    <div className="md:w-1/3 bg-black text-black p-6 md:p-10 rounded-lg shadow-lg max-w-md h-[30rem] relative backdrop-blur-md bg-transparent border border-purple-600">
                        <h2 className="text-2xl font-bold mb-4"> OTP Verification</h2>
                        <p className="mb-4">Please enter your OTP </p>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <input
                                    className="w-full px-3 py-2 border border-y-fuchsia-50 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                                    value={data.verify_token} name="verify_token" onChange={handleChange} type="text"
                                    placeholder="*****"
                                />
                            </div>
                            <button
                                className={`w-full py-2 bg-gradient-to-r from-slate-900 to-black hover:from-purple-700 hover:to-purple-800 rounded-lg text-white font-medium
                                 ${cooldownSeconds <= 0 ? 'opacity-50 cursor-not-allowed': '' }`} type="submit" disabled = {cooldownSeconds <= 0}>
                                Submit
                            </button>
                        </form>
                    
                      <div className='flex justify-center '>
                        <button className={`shadow-[inset_0_0_0_2px_#000000] text-black px-4 py-1 mt-4 rounded-full font-bold bg-transparent hover:bg-[#000000] hover:text-white dark:text-neutral-200 transition duration-200 ${cooldownSeconds > 0 ? 'opacity-50 cursor-not-allowed': ''}`}
                          onClick = {handleClick}
                          disabled = {cooldownSeconds > 0}
                          >
                        {cooldownSeconds > 0 ? `${cooldownSeconds}sec` : 'Resend OTP'}
                        </button>
                      </div>

                        <div className="mt-4 text-center absolute bottom-6 left-6 right-6 ">
                            <Link href='/signin' className="text-sm text-purple-600 hover:underline">
                                Dont have an account? Signup
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            );
            <Toaster/> 
        </div>
    )
}

export default page