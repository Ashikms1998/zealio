"use client";
import React, { useEffect } from 'react'
import Image from 'next/image'
import { SparklesCore } from "@/components/ui/sparkles";
import { Footer, Navbar } from '@/components';
import { ThreeDCardDemo } from '@/components/3d-card';
import { px } from 'framer-motion';
import { cookies } from 'next/headers';
import { useRouter, useSearchParams } from 'next/navigation';
import Cookies from 'js-cookie';
import { userDetailsStore } from '@/zustand/userAuth';

const Page = () => {
  const { login } = userDetailsStore();
  const router = useRouter();
  const searchParams = useSearchParams()

  useEffect(() => {   
    const accessToken = searchParams.get('accessToken')
    console.log("triggerd")
    if (accessToken) {
      login(accessToken)
      router.replace('/home');
    }
  }, [searchParams]);

useEffect(()=>{
  
})

  return (
    <>
      <Navbar />
      <div className="h-[40rem] w-full bg-white flex flex-col items-center justify-center overflow-hidden">

        <h1 className="md:text-7xl text-3xl lg:text-5xl font-bold text-center text-black relative z-20">
          Join a Focus Room <br />
          The <span className='text-blue-700'>#1 Platform </span>to Get Work Done<br />
          Join below, all rooms are open 24/7!
        </h1>
        <div className="w-[40rem] h-40 relative">
          {/* Gradients */}
          <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
          <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
          <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm" />
          <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" />

          {/* Core component */}
          <SparklesCore
            background="transparent"
            minSize={0.4}
            maxSize={1}
            particleDensity={1200}
            className="w-full h-full"
            particleColor="#000000"
          />

          {/* Radial Gradient to prevent sharp edges */}
          <div className="absolute inset-0 w-full h-full bg-white [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
        </div>
      </div>

      <div className="flex justify-between">
        <ThreeDCardDemo imageUrl='/89ef5d6451847480bf38a6ab147148c8.jpg' title='Study Solo' description='Create your very own study room with atmospheric backgrounds, personal timers, and goals.' onClick={() => router.push('/study/solo-study')} />
        <ThreeDCardDemo imageUrl='/4032818b7cf440741f35a9b290e3970c.jpg' title='Group Study Rooms' description='Join motivated students from all over the world to boost your productivity and find your study flow' onClick={() => router.push('/study/chat-room')} />
        <ThreeDCardDemo imageUrl='/ac58471d76bba639b4a21280ecfd88a9.jpg' title='One on One room' description='If you have a friend you want to study with then create your on space here.' onClick={() => router.push('/study/zealio-chat')} />
      </div>

      <div className='flex justify-center items-center text-center text-4xl'>
        Why join a Focus Room?<br />
      </div>
      <div className='flex justify-center items-center text-center pt-10'>
        <span>Looking for a place to focus and study with <span className='font-bold'>strangers</span>? Try <span className='font-bold'>Zealio’s focus rooms.</span> Open 24 hours a day — no matter what <br />
          timezone or country you live in, there will always be a study room for you to work alongside other students.<br />
          <br />
          The perfect place to boost productivity, make new friends and be more accountable for your studies. Join and study with the <br />
          <span className='font-bold'>Zealio’s</span> community today and get one step closer to achieving your goals: get better grades, study abroad, work abroad,<br />
          and land a dream job.</span>
      </div>

      <Footer />
    </>
  );
}

export default Page
