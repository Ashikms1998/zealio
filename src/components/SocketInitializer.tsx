"use client";

import { useSocketStore } from "@/zustand/socketStore";
import { userDetailsStore } from "@/zustand/userAuth";
import { useEffect, useState } from "react";

export default function SocketInitializer() {
  const socket = userDetailsStore((state) => state.socket);
  const initializeSocket = useSocketStore((state) => state.initializeSocket);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {

    if (!socket && !isInitialized) {
      initializeSocket();
      setIsInitialized(true);
    }

    return () => {
      socket?.disconnect();
    };
  }, [socket, initializeSocket]);

  return null;
}

