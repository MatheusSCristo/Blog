import { getSession } from 'next-auth/react'
import React, { createContext, useEffect, useState } from 'react'

type ContextType = {
    currentUser: {
        id: string
    } 
}
export const UserContext = createContext<ContextType | null>(null)

const ContextUser = ({ children }: { children: React.ReactNode }) => {
    const [currentUser,setCurrentUser]=useState<ContextType | null >(null)
    const getUser = async () => {
        const session: any = await getSession()
        setCurrentUser({
            currentUser:{
                id:session.user.id
            }
        })
    }
    useEffect(()=>{
        getUser()
    },[])
    

    return (
        <UserContext.Provider value={currentUser}>
            {children}
        </UserContext.Provider>
    )

}
export default ContextUser