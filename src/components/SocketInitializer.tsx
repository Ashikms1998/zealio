"use client";

import { useSocketStore } from "@/zustand/socketStore";
import { userDetailsStore } from "@/zustand/userAuth";
import { useEffect } from "react";
import { io, Socket } from "socket.io-client";

// Ensure to use your environment variable
const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL;

export default function SocketInitializer() {
  const { socket, initializeSocket } = useSocketStore();
  const {user} = userDetailsStore()

  useEffect(() => {
    // Create a socket connection
    const newSocket: Socket = io(`${BACKEND_URL}`, {
      // transports: ['websocket'],  // Default transport method to use, websocket for real-time
      query: { userId:user?.id},  // Passing user ID from your store or authentication state
    });

    console.log("Attempting to connect to socket at:", BACKEND_URL);

    // Handle connection success
    newSocket.on("connect", () => {
      console.log("Socket connected successfully. Socket ID:", newSocket.id);
      initializeSocket(newSocket); // Update zustand store with the socket instance
    });

    // Handle connection error
    newSocket.on("connect_error", (error) => {
      console.error("Socket connection error:", error);
    });

    // Handle any errors during the socket connection
    newSocket.on("error", (error) => {
      console.error("Socket encountered an error:", error);
    });

    // Handle disconnection
    newSocket.on("disconnect", () => {
      console.log("Socket disconnected.");
    });

    // Cleanup socket connection on component unmount
    return () => {
      if (newSocket) {
        console.log("Disconnecting socket...");
        newSocket.disconnect();
      }
    };
  }, []); // Dependency array includes socket to monitor changes

  return null; // No UI is returned by this component
}
