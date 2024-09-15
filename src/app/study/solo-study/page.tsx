"use client";
import React, { useEffect, useRef, useState } from "react";
import { Navbar } from "@/components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBackward, faPauseCircle, faForward, faCirclePlay } from '@fortawesome/free-solid-svg-icons';
import MusicPlayer from "@/components/MusicPlayer";
const url = process.env.NEXT_PUBLIC_API_URL;



const ShootingStarsAndStarsBackgroundDemo = () => {

  return (
    <>
      <Navbar />
      <MusicPlayer />
    </>
  );
};

export default ShootingStarsAndStarsBackgroundDemo;
