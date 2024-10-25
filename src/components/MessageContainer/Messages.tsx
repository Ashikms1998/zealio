import React from 'react'
import Message from './Message'

const Messages = () => {
    return (
        <div className='px-4 flex-1 bg-slate-100 rounded-lg overflow-y-auto max-h-[300px] custom-scrollbar '>
            <Message />
            <Message />
            <Message />
            <Message />

        </div>
    )
}

export default Messages