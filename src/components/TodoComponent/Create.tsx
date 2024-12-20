import axios from 'axios';
import Cookies from 'js-cookie';
import React, { MouseEvent, useEffect, useState, useCallback, useRef } from 'react'
const url = process.env.NEXT_PUBLIC_API_URL as string;
import { jwtDecode } from 'jwt-decode';
import { DecodedToken } from '../../../types';
import { toast } from 'sonner';
import { userDetailsStore } from '@/zustand/userAuth';

function Create({ updatedTask }: { updatedTask: (task: any) => void }) {

    const [task, setTask] = useState<string>('');
    const [accessToken, setAccessToken] = useState<string | null>(null);
    const [userId, setUserId] = useState<string | null>(null);

    useEffect(() => {
        const user = userDetailsStore.getState().user?.id;
        console.log(user,"this is user in Create")
        if (user) {
            setUserId(user);
            } else {
            setUserId(null);
            }
        console.log(user, "user details for navbar");
      }, []);

    // const decodeToken = useCallback(() => {
    //     const token = Cookies.get('accessToken');
    //     console.log("decoded", token)
    //     if (token) {
    //         setAccessToken(token);
    //         try {
    //             const decoded = jwtDecode<DecodedToken>(token);
    //             console.log("decoded", decoded, token)
    //             setUserId(decoded.userId);
    //         } catch (error) {
    //             console.error('Error decoding token:', error);
    //             /* Handle the error, e.g., redirect to login or clear invalid token*/
    //             Cookies.remove('accessToken');
    //             setAccessToken(null);
    //             setUserId(null);
    //         }
    //     } else {

    //         /* Handle case where token is not present have to redirect to the refresh token setup if found refresh token create an access token else login*/
    //         console.log('No access token found');
    //     }
    // }, []);

    // useEffect(() => {
    //     decodeToken();
    // }, [decodeToken]);

    useEffect(() => {
        if (userId) {
            console.log(userId, "userId updated");
        }
    }, [userId]);


    const handleAdd = async (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        if (!task || !task.trim()) {
            console.error('Task cannot be empty.');
            toast('Please enter a valid task.');
            return;
        }

        if (!userId) {
            console.error('No userId available. Please login again.');
            toast('Please login to add tasks.');
            return;
        }

        try {

            const response = await axios.post(`${url}/auth/addtask`, { task: task, userId: userId }, { withCredentials: true });

            if (response.status === 201) {
                const newTask = response.data;
                updatedTask(newTask)
                setTask('');
            } else if (response.status === 409) {

                toast.error('Task already exists. Please add a different task.');
            } else {

                console.error('Unexpected response from the server:', response);
                alert('Something went wrong while adding the task. Please try again.');
            }

        } catch (error: any) {
            if (error.response && error.response.status === 409) {
                toast.error('Task already exists. Please add a different task.');
            } else {
                console.error('Unexpected error:', error);
                alert('An unexpected error occurred while handleAdd. Please try again.');
            }
        }
    }


    return (
        <div className='flex items-center m-4'>
            <input type="text" value={task} name="" id="" onChange={(e) => setTask(e.target.value)} className='w-52 p-1 m-2 border-b-2 border-solid font-normal rounded-md outline-none' />
            <button type='button' onClick={handleAdd} className='p-2 cursor-pointer bg-white/10 text-black font-medium text-sm rounded-md whitespace-nowrap'>Add Task</button>
        </div>
    )
}

export default Create