import { create } from "zustand";
import { ConversationType } from "../../types";
export interface Imessages    {
  _id:string;
  senderId: string;
  receiverId: string;
  message: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

interface ConversationState {
  selectedConversation: ConversationType | null;
  messages: Imessages[];

  setSelectedConversation: (
    selectedConversation: ConversationType | null
  ) => void;
  setMessages: (messages: Imessages[]) => void;
}

const useConversation = create<ConversationState>((set) => ({
  selectedConversation: null,
  setSelectedConversation: (selectedConversation) => {
    console.log(
      "Setting selected conversation:",
      selectedConversation?.id || selectedConversation?._id
    );
    set({ selectedConversation });
  },
  messages: [],
  setMessages: (messages) => set({ messages }),
}));

export default useConversation;
