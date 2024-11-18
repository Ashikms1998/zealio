import React, { useEffect } from 'react'
import useConversation from '@/zustand/useConversation';
import { ConversationType } from '../../../types';
import Image from 'next/image';




interface ConversationProps {
    conversation: ConversationType;
    lastIdx: boolean;
}
const Conversation: React.FC<ConversationProps> = ({ conversation, lastIdx }) => {
    const { selectedConversation, setSelectedConversation } = useConversation();
    const isSelected = selectedConversation?.id === conversation.id;
    // const {onlineUsers} = useSocketContext();
    // const isOnline = onlineUsers.includes(conversation._id)



    const handleClick = () => {
        console.log('Selecting conversation:', conversation.id || conversation._id);
        setSelectedConversation(conversation);
    };
    return (
        <>
            <div
                className={`flex items-center hover:bg-sky-500 rounded p-2 py-4 cursor-pointer
          ${isSelected ? "bg-sky-500" : ""}`}
                onClick={handleClick}
            >
                {/* ${isOnline ? "online":""} */}
                <div className={`avatar  mr-3`}> 
                    <div className='w-11 rounded-full '>
                        <Image src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5060z9pN1BKdLvRKExuWHhtc1xvw4VgyioA&s' alt="user avatar" className="w-full rounded-full" />
                    </div>
                </div>

                <p className='font-medium text-gray-200'>{conversation.firstName + " " + conversation.lastName}</p>

                {!lastIdx && <div className='divider my-0 py-0 h-1' />}
            </div>
        </>
    )
}

export default Conversation