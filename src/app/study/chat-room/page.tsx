'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Navbar } from '@/components';

const RoomCodeForm = () => {
    const router = useRouter();
    const [roomCode, setRoomCode] = useState('');

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        router.push(`/study/chat-room/${roomCode}`);
    };

    return (
        <div>

            <Navbar />

            <div className='pt-44'>

                <section className="flex flex-col md:flex-row items-center justify-between py-16 px-4 md:px-16">
                    <div className="md:w-1/2 space-y-4">
                        <h2 className="text-4xl font-bold">Join the Global Room or <br/> Create Your Own Space</h2>
                        <p className="text-gray-700">
                        Connect with everyone in the Global Room using <span className='font-bold'>Room ID 123</span>,<br/> or create a personalized room with a unique ID that you can share with friends for a private experience. </p>
                    </div>

                    <div className="mt-8 md:mt-0 md:w-1/2 flex items-center justify-center relative">
                        {/* Background Card */}
                        <div className="w-full max-w-xs bg-[#D9C8B3] rounded-lg shadow-lg p-8">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex justify-center items-center">
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
                            </div>
                        </div>

                        {/* Overlapping Images */}
                        <div className="absolute -top-8 -right-8 w-32 h-32 bg-white rounded-lg shadow-lg overflow-hidden">
                            <img
                                src="../8f896f86a07693b1668eb43dba3031a4-groupvideocall2.jpg"
                                alt="Product Preview 1"
                                className="object-cover w-full h-full"
                            />
                        </div>
                        <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-white rounded-lg shadow-lg overflow-hidden">
                            <img
                                src="../66bdcb75a3341892120b6528e5f6910a-groupvideocall1.jpg"
                                alt="Product Preview 2"
                                className="object-cover w-full h-full"
                            />
                        </div>
                        <div className="absolute top-64 right-12 w-32 h-32 bg-white rounded-lg shadow-lg overflow-hidden">
                            <img
                                src="../50bc2b059b7b72a120f474d2cc758eea-groupvideocall3.jpg"
                                alt="Product Preview 1"
                                className="object-cover w-full h-full"
                            />
                        </div>

                        <div className="absolute -top-14 -left-20 w-32 h-32 bg-white rounded-lg shadow-lg overflow-hidden">
                            <img
                                src="../58a7783ab0259d2f50094b2b4aaff233-groupvideocall4.jpg"
                                alt="Product Preview 2"
                                className="object-cover w-full h-full"
                            />
                        </div>

                        <div className="absolute top-72 left-52 w-32 h-32 bg-white rounded-lg shadow-lg overflow-hidden">
                            <img
                                src="../64597e9411d2879902f86fe8174a613f-grpvideocall6.jpg"
                                alt="Product Preview 2"
                                className="object-cover w-full h-full"
                            />
                        </div>
                    </div>
                </section>

            </div>
        </div>
    );
};

export default RoomCodeForm;
