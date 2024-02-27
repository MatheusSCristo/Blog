'use client'
import { ChatContext } from '@/app/context/ChatContext'
import revalidateMessages from '@/utils/revalidateMessages'
import { Messages } from '@prisma/client'
import { getSession } from 'next-auth/react'
import Image from 'next/image'
import React, { useContext, useEffect, useState } from 'react'
import { IoPersonOutline, IoSendOutline } from 'react-icons/io5'


const Chat = () => {
  const [content, setContent] = useState('')
  const context = useContext(ChatContext)
  const [messages, setMessages] = useState<null | Messages[]>(null)

  const getMessages = async () => {
    if (context?.currentChat) {
      const session: any = await getSession()
      const data = await fetch('/api/getMessage',
        {
          next:{revalidate:5},
          method: 'PUT',
          body: JSON.stringify({
            messageFromId: session.user.id,
            messageToId: context?.currentChat.id,
          })
        })
      const res = await data.json()
      const messagesSortedByLast=res.data.sort((a:{createdAt:string},b:{createdAt:string})=>Date.parse(a.createdAt) - Date.parse(b.createdAt))
      setMessages(messagesSortedByLast)
    }
  }
  useEffect(() => {
    getMessages()
  }, [context])


  const handleOnClickSendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (content) {
      const session: any = await getSession()
      await fetch('/api/createMessage',
        {
          method: 'POST',
          body: JSON.stringify({
            content,
            messageToId: context?.currentChat.id,
            messageFromId: session.user.id,
            read: false
          })
        })
      setTimeout(() => {
        getMessages()
        revalidateMessages()
      }
        , 1500)

    }
    setContent('')
  }

  return (
    context?.currentChat &&
    <div className='flex flex-col border border-gray-300 h-full px-12 py-5 rounded-lg gap-5'>
      <div className='flex gap-5 items-center'>
        {context?.currentChat.profileImg ?
          <Image src={context?.currentChat.profileImg} alt='Imagem de perfil' />
          :
          <div className="rounded-full p-2 flex items-center bg-lightBlue h-fit">
            <IoPersonOutline size={30} />
          </div>
        }
        <h1>{context?.currentChat.displayName}</h1>
      </div>
      <div className='flex flex-col gap-10 relative h-4/5 overflow-y-scroll '>
        {messages?.map((item) => {
          return (
            <div className='w-full flex flex-col'>
              <div className={` bg-[#44b9dca6] p-3 rounded w-1/2  ${item.messageFromId === context.currentChat.id ? 'self-start' : 'self-end'}`}>
                <h1>{item.content}</h1>
              </div>
            </div>
          )
        }

        )}
      </div>
      <form className='w-full flex items-center relative' onSubmit={handleOnClickSendMessage}>
        <input className='border border-gray-300 rounded-full w-full p-4 pr-[50px]' placeholder='Envie sua mensagem'
          value={content}
          onChange={(e) => setContent(e.target.value)} />
        <button className='absolute right-5' type='submit'>
          <IoSendOutline size={30} />
        </button>
      </form>


    </div>

  )
}

export default Chat