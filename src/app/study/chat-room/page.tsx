'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const RoomCodeForm = () => {
    const router = useRouter();
    const [roomCode, setRoomCode] = useState('');

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        router.push(`/study/chat-room/${roomCode}`);
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <form onSubmit={handleFormSubmit} className="bg-gray-100 p-6 rounded-lg shadow-md">
                <div className="flex flex-col mb-4">
                    <label className="mb-2 font-bold text-lg">Enter Room Code</label>
                    <input
                        type="text"
                        value={roomCode}
                        onChange={(e) => setRoomCode(e.target.value)}
                        required
                        placeholder="Enter Room Code"
                        className="p-2 border border-gray-300 rounded"
                    />
                </div>
                <button
                    className="bg-black text-white py-2 px-4 rounded hover:bg-gray-800 transition duration-200"
                    type="submit"
                >
                    Enter Room
                </button>
            </form>
        </div>
    );
};

export default RoomCodeForm;
