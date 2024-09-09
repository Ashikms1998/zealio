"use client"
import Image from "next/image"
import { Inter } from 'next/font/google'
import Globe from '../public/reshot-icon-earth-5CZANT74JX.svg'
import CustomCard from "./CustomCard"
import CustomVideoCard from "./CustomVideoCard"
// import { fetchData } from "../api/index"
import { useEffect, useState } from "react"
const inter = Inter({
    weight: '900',
    subsets: ['latin']
})


const Hero = () => {
    

    return (
        <>
            <div className="flex flex-col justify-center items-center h-screen background-container">

                <p className={`${inter.className} text-[48px] text-center`}>
                    Hard Work Beats Talent <br />
                    When Talent Doesn't<br />
                    Work Hard
                </p>

                <p className={`${inter.className} font-medium text-center mt-4 flex gap-1 `}>
                    <span >Get work done with others from around the </span>
                    <span className=" globe-container">
                        <Image src="/reshot-icon-earth-5CZANT74JX.svg" alt="Globe" width={50} height={50} className="globe" />
                    </span>
                </p>

                {/* <CustomVideoCard videoUrls={["StudyStream - Study With Strangers - Study Together.webm",
                "/StudyStream - Study With Strangers - Study Together.webm","/StudyStream - Study With Strangers - Study Together.webm","/StudyStream - Study With Strangers - Study Together.webm","/StudyStream - Study With Strangers - Study Together.webm","/StudyStream - Study With Strangers - Study Together.webm","/StudyStream - Study With Strangers - Study Together.webm"]}/> */}

            </div>

            <div className="text-center font-bold text-[48px] gap-5 m-5 ">
                Discover Zealio.
            </div>

            <div className="flex gap-5 m-20">

                <CustomCard
                    title="Own Study Universe"
                    description="Create your very own study room with atmospheric backgrounds, personal timers, and goals."
                    imageUrl="/27a6218c26773577c2791a7216f0185b.gif"

                />
                <CustomCard
                    title="Group Study Rooms"
                    description="Join motivated students from all over the world to boost your productivity and find your study flow"
                    imageUrl="/4032818b7cf440741f35a9b290e3970c.jpg"

                />
                <CustomCard
                    title="Study Stats"
                    description="See your progress every day in your Stats and on the community leaderboard."
                    imageUrl="/349ffdac815e56b56476ac92b42e075d.jpg"

                />
            </div>
        </>
    )
}

export default Hero