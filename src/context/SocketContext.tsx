'use client'
import { userDetailsStore } from "@/zustand/userAuth";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
const url = process.env.NEXT_PUBLIC_API_URL;
import { io, Socket } from "socket.io-client"
import { OnGoingCall } from "../../types/SocketTypes";
import useConversation from "@/zustand/useConversation";
import { useSocketStore } from "@/zustand/socketStore";


const SocketContext = createContext<Socket | null>(null);

export const useSocketContext = () => {
    return useContext(SocketContext);
}

export const SocketContextProvider = ({ children }: { children: React.ReactNode }) => {
    const { socket, initializeSocket } = useSocketStore()

    useEffect(() => {
        if (!socket) {
            initializeSocket()
        }
    }, [socket, initializeSocket]);

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    )
}