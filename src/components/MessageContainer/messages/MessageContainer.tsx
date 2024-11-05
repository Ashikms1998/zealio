'use client'
import useConversation from "@/zustand/useConversation";
import MessageInput from "./MessageInput"
import Messages from "./Messages"
import { TiMessages } from "react-icons/ti";
import { useEffect } from "react";
import { FaVideo } from "react-icons/fa6";
import { userDetailsStore } from "@/zustand/userAuth";
import { useSocketStore } from "@/zustand/socketStore";

const MessageContainer = () => {
	const { selectedConversation, setSelectedConversation } = useConversation();
	const { handleCall } = useSocketStore()
	const initiateVideoCall = async () => {
		if (selectedConversation != null) {
			handleCall(selectedConversation)
		}
	}

	useEffect(() => {
		return () => setSelectedConversation(null);
	}, [setSelectedConversation])

	return (
		<div className='md:min-w-[450px] flex flex-col'>
			{!selectedConversation ? (
				<NoChatSelected />
			) : (
				<>

					<div className='bg-slate-500 px-4 py-2 mb-2 flex justify-between items-center'>
						<div>
							<span className='label-text'>To:</span>{" "}
							<span className='text-gray-900 font-bold'>{selectedConversation.firstName + " " + selectedConversation.lastName}</span>
						</div>
						<FaVideo onClick={initiateVideoCall} />

					</div>

					<Messages />
					<MessageInput />
				</>
			)}
		</div>
	);
}
export default MessageContainer

const NoChatSelected = () => {
	const userDetails = userDetailsStore();

	return (
		<div className='flex items-center justify-center w-full h-full'>
			<div className='px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2'>
				<p>Welcome 👋 {userDetails.user?.firstName + " " + userDetails.user?.lastName} ❄</p>
				<p>Select a chat to start messaging</p>
				<TiMessages className='text-3xl md:text-6xl text-center' />
			</div>
		</div>
	);
};