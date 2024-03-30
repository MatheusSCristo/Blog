import { Message } from '@/types/types'
import { Messages } from '@prisma/client'
import React, { createContext, useState } from 'react'

export type currentChat={
    id: string,
    username: string,
    displayName: string | null,
    profileImg: string | null,
}

type ContextType={
    currentChat: currentChat ,
    setCurrentChat:React.Dispatch<React.SetStateAction<currentChat>>

}

export const ChatContext = createContext<ContextType>({} as ContextType)

const ContextChat = ({ children }: { children: React.ReactNode }) => {
    const [currentChat, setCurrentChat] = useState<currentChat>({} as currentChat)

    return (
        <ChatContext.Provider value={{ currentChat, setCurrentChat }}>
            {children}
        </ChatContext.Provider>
    )

}
export default ContextChat