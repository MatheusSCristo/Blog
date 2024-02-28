import ContextChat from "./ChatContext"
import ContextUser from "./userSession"

const Context = ({ children }: { children: React.ReactNode }) => {

    return (
        <ContextChat>
            <ContextUser>
                {children}
            </ContextUser>
        </ContextChat>
    )

}
export default Context