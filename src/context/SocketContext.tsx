'use client'
import { userDetailsStore } from "@/zustand/userAuth";
import { createContext, useContext, useEffect, useState } from "react";
const url = process.env.NEXT_PUBLIC_API_URL;
import { io, Socket } from "socket.io-client"


const SocketContext = createContext<Socket | null>(null);

export const useSocketContext = () => {
    return useContext(SocketContext);
}

export const SocketContextProvider = ({ children }: { children: React.ReactNode }) => {
    // const [socket, setSocket] = useState<Socket | null>(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const user = userDetailsStore((state) => state.user?.id)
    const {socket,setSocket} = userDetailsStore()

    useEffect(() => {
        if (user) {
            const socket = io(process.env.NEXT_PUBLIC_API_URL, {
                query: {
                    userId: user
                }
            });
            console.log("This is socket👌", socket);
            setSocket(socket);
            // socket.on("getOnlineUsers", (users) => {
            //     setOnlineUsers(users)
            // })

            return () => socket.close();
        } else {
            // if(socket){
            //     socket.close();
            //     setSocket(null)
            // }
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