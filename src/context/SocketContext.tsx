'use client'
import { userDetailsStore } from "@/zustand/userAuth";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
const url = process.env.NEXT_PUBLIC_API_URL;
import { io, Socket } from "socket.io-client"
import { OnGoingCall } from "../../types/SocketTypes";
import useConversation from "@/zustand/useConversation";


const SocketContext = createContext<Socket | null>(null);

export const useSocketContext = () => {
    return useContext(SocketContext);
}

export const SocketContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [isSocket, setIsSetSocket] = useState<Socket | null>(null);
    // const [onlineUsers, setOnlineUsers] = useState([]);
    const user = userDetailsStore((state) => state.user?.id)
    const { socket, setSocket } = userDetailsStore()
    const [ongoingCall, setOngoingCall] = useState<OnGoingCall | null>(null)
    const receiverId = useConversation((state)=>state.selectedConversation?.id);
    // const socket = userDetailsStore((state) => state.socket);
    useEffect(() => {
        if (user) {
            const socket = io(process.env.NEXT_PUBLIC_API_URL, {
                query: {
                    userId: user
                }
            });
            console.log("This is socket👌", socket, "This is userId😊", user);
            setSocket(socket);
            return () => socket.close();
        } else {
            if (socket)
                return () => {
                    socket.close();
                    setSocket(null)

                };
        }

    }, [user])

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    )
}