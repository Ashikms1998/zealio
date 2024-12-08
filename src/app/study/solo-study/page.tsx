"use client";
import React, { useEffect, useRef, useState } from "react";
import { Navbar } from "@/components";
import MusicPlayer from "@/components/MusicPlayer";
import PomodoroTimer from "@/components/TimerComponents/PomodoroTimer";
import ChangingBackground from "@/components/ChangingBackground";
import Todo from "@/components/TodoComponent/Todo";
const url = process.env.NEXT_PUBLIC_API_URL;



const ShootingStarsAndStarsBackgroundDemo = () => {



  return (
    <>
      <Navbar />
      <ChangingBackground />
      <MusicPlayer />
      <PomodoroTimer />
      <Todo />
    </>
  );
};

export default ShootingStarsAndStarsBackgroundDemo;
