'use client'
import axios from "axios";
import { useCallback, useEffect, useState } from "react"
import { toast } from "sonner";
const url = process.env.NEXT_PUBLIC_API_URL as string;
import { ConversationType, DecodedToken } from '../../types';
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";

const useGetConversations = () => {
  const [loading, setLoading] = useState(false);
  const [conversations, setConversations] = useState<ConversationType[]>([]);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  // const decodeToken = useCallback(() => {
  //   const token = Cookies.get('accessToken');
  //   if (token) {
  //     setAccessToken(token);
  //     try {
  //       const decoded = jwtDecode<DecodedToken>(token);
  //       setUserId(decoded.userId);
  //     } catch (error) {
  //       console.error('Error decoding token:', error);
  //       // Handle the error, e.g., clear invalid token
  //       Cookies.remove('accessToken');
  //       setAccessToken(null);
  //       setUserId(null);
  //     }
  //   } else {
  //     // Handle case where token is not present
  //     console.log('No access token found');
  //   }
  // }, []);

  // useEffect(()=>{
  //   const tokeninLocalStorage = localStorage.getItem("accessToken")
  //   console.log(tokeninLocalStorage,"This is localstorage item in useGetConversations")
  // },[userId])

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



  // useEffect(() => {
  //   decodeToken();
  // }, [decodeToken]);

  useEffect(() => {
    const getConversations = async () => {

      if (!userId) {
        return
      }

      setLoading(true);
      try {
        console.log(userId, "ithan sadhnm");
        const response = await axios.post(`${url}/chat/userLog`, { userId }, { withCredentials: true })

        const data = response.data.data
        if (data.error) {
          throw new Error(data.error);
        }
        setConversations(data)
      } catch (error) {
        if (axios.isAxiosError(error)) {
          toast.error(error.response?.data?.message || "An error occurred while fetching conversations");
        } else {
          toast.error("An unexpected error occurred");
        }
        console.error("Error fetching conversations:", error);
      } finally {
        setLoading(false);
      }
    }
    getConversations()
  }, [userId, url])
  return { loading, conversations };
}

export default useGetConversations

