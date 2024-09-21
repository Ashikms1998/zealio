import React, { useCallback, useEffect, useState } from 'react'
import Create from './Create';
import axios from 'axios';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { DecodedToken } from '../../../types';
import { BsCircleFill, BsFillCheckCircleFill, BsFillTrashFill } from 'react-icons/bs';


const url = process.env.NEXT_PUBLIC_API_URL as string;

const Todo = () => {

    const todoContainer = {
        position: "fixed" as "fixed",
        top: "50%",
        left: "13%",
        transform: "translate(-50%, -50%)",
        width: "350px",
        padding: "35px 40px",
        display: "flex",
        flexDirection: "column" as "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center" as "center",
        borderRadius: "15px",
        boxShadow: "0 0 20px rgba(26, 26, 26, 0.1), 0 0 40px rgba(26, 26, 26, 0.1), 0 0 80px rgba(26, 26, 26, 0.1)",
        backdropFilter: "blur(15px)",
        fontWeight: "600",
        zIndex: 2,
    };

    const task = {
        display: "flex",
        alignItems: "center",
        width: "330px",
        justifyContent: "space-between",
        backgroundColor: "rgba(26, 26, 26, 0.4)",
        color: "white",
        height: "35px",
        padding: "2px 5px 2px 5px",
        marginTop: "2px",
        borderRadius: "10px"
    };

    const checkbox = {
        display: "flex",
        alignItems: "center"
    };

    const checkboxIcons = {
        marginRight: "5px",
        fontSize: "15px",
        cursor: "pointer"
    };



    const [todos, setTodos] = useState<any[]>([]);
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
                /* Handle the error, e.g., redirect to login or clear invalid token*/
                Cookies.remove('accessToken');
                setAccessToken(null);
                setUserId(null);
            }
        } else {

            /* Handle case where token is not present have to redirect to the refresh token setup if found refresh token create an access token else login*/
            console.log('No access token found');
        }
    }, []);

    useEffect(() => {
        decodeToken();
    }, [decodeToken]);

    useEffect(() => {
        if (userId) {
            console.log(userId, "userId updated");
        }
    }, [userId]);

    useEffect(() => {
        if (!accessToken || !userId) {
            console.error('No access token or userId available. Please login again.');
            return;
        }
        axios.get(`${url}/auth/fetchTodo?userId=${userId}`,)
            .then(result => setTodos(result.data))
            .catch(error => console.log(error))
    }, [accessToken, userId]);

    const handleDone = async (taskId: string, userId: string) => {
        try {

            setTodos(prevTodos =>
                prevTodos.map(todo =>
                    todo._id === taskId ? { ...todo, completed: !todo.completed } : todo
                )
            );

            const response = await axios.put(`${url}/auth/updateTaskCompleation?_id=${taskId}&userId=${userId}`)
            if (response.status !=200) {
                setTodos(prevTodos =>
                    prevTodos.map(todo =>
                        todo._id === taskId ? { ...todo, completed: !todo.completed } : todo
                    )
                );
                alert('Something went wrong while striking the task. Please try again.');
            } 
        } catch (error) {
            setTodos(prevTodos =>
                prevTodos.map(todo =>
                    todo._id === taskId ? { ...todo, completed: !todo.completed } : todo
                )
            );
            console.error('Unexpected error during marking task done:', error);
            alert('An unexpected error occurred during striking task. Please try again.');
        }
    }

    const handleDelete = async (taskId: string, userId: string) => {
        try {
            console.log(taskId, userId, "this is product id dude")
            const response = await axios.delete(`${url}/auth/deleteTask?_id=${taskId}&userId=${userId}`)
            if (response.status === 200) {
                const deletedTask = response.data;
                setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== taskId));
            } else {

                console.error('Unexpected response from the server:', response);
                alert('Something went wrong while deleting the task. Please try again.');
            }
        } catch (error) {
            console.error('Unexpected error:', error);
            alert('An unexpected error occurred. Please try again.');
        }
    }


    return (
        <div style={todoContainer}>
            <h2>Todo Lists</h2>
            <Create updatedTask={(newTask) => setTodos((prev) => [...prev, newTask])} />
            <br />
            <div className='todo-scrollbar max-h-56 overflow-hidden overflow-y-scroll' >
                {
                    todos.length === 0 ? (
                        <p>No Record</p>
                    ) : (
                        todos.map((todo) => (
                            <div key={todo._id}>
                                <div style={task}>
                                    <div style={checkbox} onClick={() => handleDone(todo._id, todo.userId)}>
                                        {todo.completed ?
                                            <BsFillCheckCircleFill style={checkboxIcons} />
                                            : 
                                        <BsCircleFill style={checkboxIcons} />
                                    }
                                        <p className={todo.completed ? "line-through text-slate-400" : "" }>{todo.task}</p>
                                    </div>
                                    <span><BsFillTrashFill style={checkboxIcons} onClick={() => handleDelete(todo._id, todo.userId)} /></span>
                                </div>

                            </div>
                        ))
                    )}
            </div>
        </div>
    )
}

export default Todo