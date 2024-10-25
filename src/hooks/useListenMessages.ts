"use client";
import { useEffect } from "react";
import useConversation from "@/zustand/useConversation";
import Notificationding from "../../public/songs/Notificationding.mp3";
import { userDetailsStore } from "@/zustand/userAuth";

const useListenMessages = () => {
  const {socket} = userDetailsStore()
  const { messages, setMessages } = useConversation();

  useEffect(() => {
    if (socket) {

      socket.on("newMessage", (newMessage: any) => {
        
        const notificationSound = new Audio(Notificationding);
        notificationSound.play();

        setMessages([...messages, newMessage]);
      });

      
      return () => {
        socket.off("newMessage");
      };
    }

   
    return () => {};
  }, [socket, setMessages, messages]);
};

export default useListenMessages;
