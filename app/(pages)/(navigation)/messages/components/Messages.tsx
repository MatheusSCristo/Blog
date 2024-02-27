import { ChatContext } from '@/app/context/ChatContext'
import { Follow } from '@/types/types'
import { Messages } from '@prisma/client'
import { getSession } from 'next-auth/react'
import Image from 'next/image'
import React, { useContext, useEffect, useState } from 'react'
import { IoPersonOutline } from 'react-icons/io5'


const MessagesComp = ({ item }: { item: Follow }) => {
    const [messages, setMessages] = useState<null | Messages[]>()
    const context=useContext(ChatContext)
    const {following:receiver}=item

    const getMessages = async () => {
        const session: any = await getSession()
        const data = await fetch('/api/getMessage',
            {
                
                next:{revalidate:1},
                method: 'PUT',
                body: JSON.stringify({
                    messageFromId: session.user.id,
                    messageToId: receiver.id,
                })
            })
        const res = await data.json()
        const messagesSortedByLast=res.data.sort((a:{createdAt:string},b:{createdAt:string})=>Date.parse(a.createdAt) - Date.parse(b.createdAt))
        setMessages(messagesSortedByLast)
    }
    useEffect(() => {
        getMessages()
    }, [])
    
    

    const Handle=()=>{
        context?.setCurrentChat({
            displayName:receiver.displayName,
            id:receiver.id,
            profileImg:receiver.profileImg,
            username:receiver.username
        })
    }
    

    return (
        <div className='flex py-2 px-5 gap-3 shadow-xl rounded-lg items-center cursor-pointer hover:scale-[1.01]' onClick={Handle}>
            {receiver.profileImg ? <Image src={receiver.profileImg} alt='Imagem de perfil' />
                :
                <div className="rounded-full p-2 flex items-center bg-lightBlue h-fit">
                    <IoPersonOutline size={20} />
                </div>
            }
            <div className='flex flex-col'>
                <h1 className='text-lg font-bold'>{receiver.displayName}</h1>
                {messages && messages?.length>0 &&
                    <p className='text-sm text-lightGray'>{messages[messages.length - 1].content}</p>
                }
            </div>
        </div>
    )
}

export default MessagesComp