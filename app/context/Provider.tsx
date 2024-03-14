'use client'
import ContextChat from "./ChatContext"
import ContextMessage from "./MessagesContext"
import ContextUser from "./userSession"

const Provider = ({ children }: { children: React.ReactNode }) => {

    return (
        <ContextChat>
            <ContextUser>
                <ContextMessage>
                    {children}
                </ContextMessage>
            </ContextUser>
        </ContextChat>
    )

}
export default Provider