"use client";
import useConversation from "@/zustand/useConversation";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import React, { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { DecodedToken } from "../../types";
import { userDetailsStore } from "@/zustand/userAuth";
const url = process.env.NEXT_PUBLIC_API_URL as string;

const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  
  const decodeToken = useCallback(() => {
    const token = userDetailsStore((state)=>state.accessToken)
    // const token = Cookies.get("accessToken");
    if (token) {
      setAccessToken(token);
      try {
        const decoded = jwtDecode<DecodedToken>(token);
        setUserId(decoded.userId);
      } catch (error) {
        console.error("Error decoding token:", error);

        Cookies.remove("accessToken");
        setAccessToken(null);
        setUserId(null);
      }
    } else {
      /* Handle case where token is not present */
      console.log("No access token found");
    }
  }, []);

  // Run the decodeToken function on component mount
  useEffect(() => {
    decodeToken();
  }, [decodeToken]);

  const sendMessage = async (message: string) => {
    if (!selectedConversation?.id) {
      toast.error("No conversation selected.");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post(
        `${url}/chat/send/${selectedConversation.id}`,
        { message, userId },{ withCredentials: true }
      );
      console.log(response, "😊response after sending message");

      if (response.data && response.data.response) {
        setMessages([...messages, response.data.response]);
      } else {
        throw new Error("Invalid response format");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.error || error.message || "An error occurred while sending the message";
        toast.error(errorMessage);
        console.error("Axios error in useSendMessage:", errorMessage);
      } else {
        toast.error("An unexpected error occurred");
        console.error("Unexpected error in useSendMessage:", error);
      }
    } finally {
      setLoading(false);
    }
  };

  return { sendMessage, loading };
};

export default useSendMessage;
