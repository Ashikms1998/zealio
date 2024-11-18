// "use client";

// import { useSocketStore } from "@/zustand/socketStore";
// import { userDetailsStore } from "@/zustand/userAuth";
// import { useEffect, useState } from "react";

// export default function SocketInitializer() {
//   // const socket = userDetailsStore((state) => state.socket);
//   // console.log(socket, "🤫")
//   // const initializeSocket = useSocketStore((state) => state.initializeSocket);
//   // console.log("🥳🥸", initializeSocket)
//   // const [isInitialized, setIsInitialized] = useState(false);

//   const {initializeSocket, socket} = useSocketStore()

//   useEffect(() => {
//     if (!socket ) {
//       initializeSocket();
//     }

//     return () => {
//       if (socket) {
//         socket?.disconnect();
//       }
//     };
//   }, [socket, initializeSocket]);

//   return null;
// }



