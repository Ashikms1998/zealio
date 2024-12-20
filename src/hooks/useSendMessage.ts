"use client";
import useConversation from "@/zustand/useConversation";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import React, { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { DecodedToken } from "../../types";
import { userDetailsStore } from "@/zustand/userAuth";
const url = process.env.NEXT_PUBLIC_API_URL;

const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  // const decodeToken = useCallback(() => {
  //   const token = Cookies.get("accessToken");

  //   if (token) {
  //     setAccessToken(token);
  //     try {
  //       const decoded = jwtDecode<DecodedToken>(token);
  //       setUserId(decoded.userId);
  //     } catch (error) {
  //       console.error("Error decoding token:", error);

  //       Cookies.remove("accessToken");
  //       setAccessToken(null);
  //       setUserId(null);
  //     }
  //   } else {
  //     /* Handle case where token is not present */
  //     console.log("No access token found");
  //   }
  // }, []);

  // useEffect(()=>{
  //   const tokeninLocalStorage = localStorage.getItem("accessToken")
  //   console.log(tokeninLocalStorage,"<=This is localstorage item in useSendMessage")
  //   const tokenInZustand = userDetailsStore((state)=>state.accessToken)
  //   console.log(tokenInZustand,"<=This is the token in zustand")
  //   const token = Cookies.get("accessToken");
  //   console.log(tokenInZustand,"<=This is the token in zustand")
  // },[userDetailsStore,localStorage,Cookies])


  // // Run the decodeToken function on component mount
  // useEffect(() => {
  //   decodeToken();
  // }, [decodeToken]);

  useEffect(() => {
    const storedState = localStorage.getItem("auth-storage");
    console.log(storedState, "this is stored state")
    if (storedState) {
      try {
        const parsedState = JSON.parse(storedState);
        const accessToken = parsedState?.state?.accessToken;
        const userId = parsedState?.state?.user?.id
        console.log(userId,"this is the userid in usegetconversation")
        if (accessToken&&userId) {
          setAccessToken(accessToken)
          setUserId(userId)
          console.log("Access Token in useGetConversation:", accessToken);
        }
        else {
          console.error("Access Token or UserId not found in localStorage useGetConversation.");
        }
      } catch (error) {
        console.error("Failed to parse state from localStorage useGetConversation:", error);
      }
    } else {
      console.error("State not found in localStorage useGetConversation.");
    }
  }, []);

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
