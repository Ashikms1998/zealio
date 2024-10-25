'use client'
import React, { useState } from 'react'
import { VscSend } from "react-icons/vsc";
import Messages from './Messages';
import { SiGooglemessages } from "react-icons/si";

const MessageBox = () => {

    const [inputMessage, SetInputMessage] = useState("")
    const [chatNotSelected, setChatNotSelected] = useState(false);

    return (
        <div className='w-full max-w-sm mx-auto  flex flex-col fixed bottom-2 right-2 bg-white justify-end'>
            <>
                <div>
                </div>
                <div className='flex items-center justify-between p-4 bg-[#f0f0f0] font-medium text-center rounded-lg text-black mb-1'>
                    <h2>Cristiano Ronaldo</h2>
                    <div className='flex ml-auto' onClick={() => setChatNotSelected(prev => !prev)}>
                        <SiGooglemessages className='w-10 h-7 cursor-pointer justify-end text-blue-600' />
                    </div>
                </div>
                {chatNotSelected && (
                    <>
                        <div className='flex-1 overflow-y-auto'>
                            <Messages />
                        </div>
                        <div className='p-4 bg-[#f0f0f0] border-t border-gray-300 rounded-lg mt-1'>
                            <div className='flex space-x-5'>
                                <input type="text" placeholder='Type a message here' value={inputMessage} onChange={(e) => SetInputMessage(e.target.value)} onKeyPress={(e) => {
                                    if (e.key === 'Enter') {
                                        // handleSendMessage()
                                    }
                                }} className='bg-white rounded-full py-2 px-14 focus:outline-none focus:ring-1 focus:ring-[#007AFF]' />
                                <button /*onClick={handleSendMessage}*/ className="rounded-full bg-green-600 hover:bg-green-900 focus:ring-1 focus:ring-[#007AFF] focus:ring-offset-2" ><VscSend className='h-5 font-light text-white w-10' /></button>
                            </div>
                        </div>
                    </>
                )}
            </>
        </div>
    )
}

export default MessageBox