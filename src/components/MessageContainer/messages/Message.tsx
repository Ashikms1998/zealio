import React from 'react'
import { MessagesResponse } from '../../../../types';
import { userDetailsStore } from '@/zustand/userAuth';
import { Imessages } from '@/zustand/useConversation';
const convertToIST = (dateString: string): string => {
    const date = new Date(dateString);
    const offsetIST = 5.5 * 60 * 60 * 1000;
    const istDate = new Date(date.getTime() + offsetIST);
    const hours = istDate.getUTCHours().toString().padStart(2, '0');
    const minutes = istDate.getUTCMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

const Message = ({message}:{message:Imessages}) =>  {
const user = userDetailsStore((state)=>state.user?.id)
const checkingMe = message.senderId != user
const bubbleBgColor = checkingMe ? 'bg-blue-500' : "";
// const shakeClass = message.shouldShake ? "shake" : "";



	return (
		<div className={`chat ${message.senderId === user ? 'chat-start' : 'chat-end'}`}>
			<div className='chat-image avatar'>
				<div className='w-10 rounded-full'>
					<img
						alt='Tailwind CSS chat bubble component'
						src={
							"https://cdn0.iconfinder.com/data/icons/communication-line-10/24/account_profile_user_contact_person_avatar_placeholder-512.png"
						}
					/>
				</div>
			</div>
			<div className={`chat-bubble text-white ${bubbleBgColor}`}>{message.message}</div>
			<div className='chat-footer opacity-50 text-xs flex gap-1 items-center'>{message.createdAt ? convertToIST(message.createdAt) : "Time not available"}</div>
		</div>
	);
}

export default Message;