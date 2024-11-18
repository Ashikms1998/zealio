"use client";
import useConversation from "@/zustand/useConversation";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { DecodedToken } from "../../types";
const url = process.env.NEXT_PUBLIC_API_URL as string;

const useGetMessages = () => {
  
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  const decodeToken = useCallback(() => {
   
    const token = Cookies.get('accessToken');
    if (token) {
      setAccessToken(token);
      try {
        const decoded = jwtDecode<DecodedToken>(token);
        setUserId(decoded.userId);
      } catch (error) {
        console.error('Error decoding token:', error);
        // Handle the error, e.g., clear invalid token
        Cookies.remove('accessToken');
        setAccessToken(null);
        setUserId(null);
      }
    } else {
      // Handle case where token is not present
      console.log('No access token found');
    }
  }, []);

  useEffect(()=>{
    const tokeninLocalStorage = localStorage.getItem("accessToken")
    console.log(tokeninLocalStorage,"This is localstorage item")
  },[])


  // Run the decodeToken function on component mount
  useEffect(() => {
    
    decodeToken();
  }, [decodeToken]);

  useEffect(() => {
    if(!userId){
      return decodeToken
    }
    const getMessages = async () => {
      setLoading(true);
      try {
        console.log(selectedConversation?.id,"B",userId,"A");
        const res = await axios.get(
          `${url}/chat/${selectedConversation?.id}`,
        {
          params: {
            withCredentials: true,
            userId: userId,
          },
        }
        );
    
        const data = res.data.messages;
        console.log(data,"This is the response for message",res.data.message);
        if (data.error) {
          throw new Error(data.error);
        }
        setMessages(data);
      } catch (error: any) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    if (selectedConversation?.id) {
      getMessages();
    }
  }, [userId,selectedConversation?.id, setMessages]);
  return { messages, loading };
};

export default useGetMessages;
