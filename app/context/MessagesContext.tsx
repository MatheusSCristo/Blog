import { Message } from '@/types/types'
import React, { createContext, useState } from 'react'

type messages={
    messages:Message[],
    id:string
}

type ContextType={
    messages: messages ,
    setMessages:React.Dispatch<React.SetStateAction<messages>>

}

export const MessageContext = createContext<ContextType | null>(null)

const ContextMessage = ({ children }: { children: React.ReactNode }) => {
    const [messages, setMessages] = useState<any>()

    return (
        <MessageContext.Provider value={{ messages, setMessages }}>
            {children}
        </MessageContext.Provider>
    )

}
export default ContextMessage