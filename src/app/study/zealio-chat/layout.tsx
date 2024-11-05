'use client'
import { userDetailsStore } from '@/zustand/userAuth';
import Head from 'next/head';
import Link from 'next/link';
import React, { useEffect } from 'react';
import { Socket } from 'socket.io-client';
import { User } from '../../../../types/User';
import { Participants } from '../../../../types/SocketTypes';
import { create } from 'zustand';
import { useSocketStore } from '@/zustand/socketStore';



const Layout = ({ children }: { children: React.ReactNode }) => {

    const { socket } = userDetailsStore()
    const {handleIncomingCall} = useSocketStore()
    useEffect(() => {
        socket?.on("incomingcall", (callData) => {
            console.log("Incoming call received👍:", callData);
            handleIncomingCall(callData)
        });
        return () => {
            socket?.off("incomingcall");
        };
    }, [socket])

    return (
        <>
        { children }
        
        </>


    );
};

export default Layout;
