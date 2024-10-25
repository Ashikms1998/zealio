'use client'

import { useEffect, useRef } from "react"
import useGetMessages from "@/hooks/useGetMessages"
import useListenMessages from "@/hooks/useListenMessages"
import Message from "./Message"
import MessageSkeleton from "../skeletons/MessageSkeleton"

export default function Messages() {
  const { messages, loading } = useGetMessages()
  useListenMessages()
  const messagesContainerRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      const { scrollHeight, clientHeight } = messagesContainerRef.current
      messagesContainerRef.current.scrollTop = scrollHeight - clientHeight
    }
  }
  

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  return (
    <div 
      ref={messagesContainerRef}
      className="h-96 overflow-y-auto px-1 flex-1 custom-scrollbar"
    >
      {!loading && messages.length > 0 && (
        messages.map((message) => (
          <Message key={message._id} message={message} />
        ))
      )}

      {loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}

      {!loading && messages.length === 0 && (
        <p className="text-center">Send a message to start the conversation</p>
      )}
    </div>
  )
}