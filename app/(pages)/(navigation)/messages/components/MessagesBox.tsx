import { ChatContext } from '@/app/context/ChatContext'
import { UserContext } from '@/app/context/userSession'
import { Follow } from '@/types/types'
import { CircularProgress } from '@mui/material'
import { Messages } from '@prisma/client'
import Image from 'next/image'
import React, { useContext } from 'react'
import { IoPersonOutline } from 'react-icons/io5'
import useSWR from 'swr'


const MessagesBox = ({ item }: { item: Follow }) => {
    const { data, isLoading }: { data: Messages[] | null, isLoading: boolean } = useSWR('/api/getMessage', getMessages, { refreshInterval: 1 })
    const chatUser = useContext(ChatContext)
    const user = useContext(UserContext)
    const { following: receiver } = item
    async function getMessages() {
        if (user?.currentUser) {

            const data = await fetch('/api/getMessage',
                {
                    method: 'PUT',
                    body: JSON.stringify({
                        messageFromId: user?.currentUser.id,
                        messageToId: receiver.id,
                    })
                })
            const res = await data.json()
            const messagesSortedByLast = res.data.sort((a: { createdAt: string }, b: { createdAt: string }) => Date.parse(a.createdAt) - Date.parse(b.createdAt))
            return messagesSortedByLast
        }
    }


    const Handle = () => {
        chatUser?.setCurrentChat({
            displayName: receiver.displayName,
            id: receiver.id,
            profileImg: receiver.profileImg,
            username: receiver.username
        })
    }


    return (
        <div className='flex py-2 pl-1 gap-3 border-b-2 border-gray-300 rounded items-center cursor-pointer hover:scale-[1.01]' onClick={Handle}>
            {receiver.profileImg ? <Image src={receiver.profileImg} alt='Imagem de perfil' />
                :
                <div className="rounded-full p-2 flex items-center bg-lightBlue h-fit">
                    <IoPersonOutline size={20} />
                </div>
            }
            <div className='flex flex-col max-h-[70px] overflow-hidden'>
                <h1 className='text-md font-bold'>{receiver.displayName}</h1>
                {isLoading ? <div className='h-1/2'><CircularProgress /></div> :
                    data && data?.length > 0 &&
                    <p className='text-sm text-lightGray  text-wrap truncate'>{data[data.length - 1].content}</p>
                }
            </div>
        </div>
    )
}

export default MessagesBox