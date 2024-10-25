'use client';
import React from "react";
import useGetConversations from "../../hooks/useGetConversations";
import Conversation from "./Conversation";
import { ConversationType } from '../../../types';
import useConversation from "@/zustand/useConversation";

const Conversations = () => {
  const { loading, conversations } = useGetConversations();

  return (
    <div className=" flex flex-col custom-scrollbar overflow-auto">
        {
                conversations.map((conversation: ConversationType, idx: number) => (
                    <Conversation 
                        key={conversation._id || conversation.id}
                        conversation = {conversation}
                        lastIdx = {idx === conversations.length - 1}
                    />
                ))
            }

            {loading ? <span className="loading loading-spinner mx-auto"></span>:null}
    </div>
)
};

export default Conversations;
