import { Messages } from '@prisma/client'
import React, { createContext, useState } from 'react'

type currentChat={
    id: string,
    username: string,
    displayName: string | null,
    profileImg: string | null
}

type ContextType={
    currentChat: currentChat ,
    setCurrentChat:React.Dispatch<React.SetStateAction<currentChat>>

}

export const ChatContext = createContext<ContextType | null>(null)

const ContextChat = ({ children }: { children: React.ReactNode }) => {
    const [currentChat, setCurrentChat] = useState<any>()

    return (
        <ChatContext.Provider value={{ currentChat, setCurrentChat }}>
            {children}
        </ChatContext.Provider>
    )

}
export default ContextChat