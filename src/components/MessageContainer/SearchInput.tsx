'use client'
import { useState } from 'react'
import { IoSearchSharp } from "react-icons/io5"
import { toast } from 'sonner'
import useGetConversations from '@/hooks/useGetConversations'
import useConversation from '@/zustand/useConversation'
import { ConversationType } from '../../../types'


const SearchInput = () => {
  const [search, setSearch] = useState("")
  const { setSelectedConversation } = useConversation()
  const { conversations } = useGetConversations()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    if (!search) return

    if (search.length < 3) {
      toast.error("Search term must be at least 3 characters long")
      return
    }

    
    const searchTerm = search.toLowerCase()
    
    const conversation = conversations.find((c: ConversationType) => 
      c.firstName.toLowerCase().includes(searchTerm) ||
      c.lastName?.toLowerCase().includes(searchTerm)
    )

    if (conversation) {
      setSelectedConversation(conversation)
      setSearch('')
      toast.success('Conversation found!')
    } else {
      toast.error('No user found')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2">
      <input 
        type="text" 
        placeholder="Search…" 
        className="input input-bordered text-black rounded-full w-full max-w-xs"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        minLength={3}
      />
      <button 
        type="submit" 
        className="btn btn-circle bg-sky-500 text-white hover:bg-sky-600 transition-colors"
        disabled={search.length < 3}
      >
        <IoSearchSharp className="w-6 h-6" />
      </button>
    </form>
  )
}

export default SearchInput