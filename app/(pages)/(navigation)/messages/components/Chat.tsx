'use client'
import { ChatContext } from '@/app/context/ChatContext'
import Image from 'next/image'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { IoPersonOutline, IoSendOutline } from 'react-icons/io5'
import { CircularProgress } from '@mui/material'
import useSWR from 'swr'
import { UserContext } from '@/app/context/userSession'
import { Message } from '@/types/types'
import  './styles.css'




const Chat = () => {
  const [content, setContent] = useState('')
  const { data }: { data: Message[] | null } = useSWR('/api/user', getMessages, { refreshInterval: 3 })
  const chatUser = useContext(ChatContext)
  const user = useContext(UserContext)
  const [isLoading, setIsLoading] = useState(true)
  const containerRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [data])

  async function getMessages() {
    if (chatUser?.currentChat) {
      const data = await fetch('/api/getMessage',
        {
          method: 'PUT',
          body: JSON.stringify({
            messageFromId: user?.currentUser?.id,
            messageToId: chatUser?.currentChat.id,
          })
        })
      const res = await data.json()
      res.data.sort((a: { createdAt: string }, b: { createdAt: string }) => Date.parse(a.createdAt) - Date.parse(b.createdAt))
      setIsLoading(false)
      return res.data
    }
  }

  const handleOnClickSendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setContent('')
    if (content) {
      await fetch('/api/createMessage',
        {
          method: 'POST',
          body: JSON.stringify({
            content,
            messageToId: chatUser?.currentChat.id,
            messageFromId: user?.currentUser.id,
            read: false
          })
        })
      getMessages()
    }
  }

  const showMessageHour = (time: Date) => {
    const date = new Date(time)
    return (`${date.getHours()} :  ${date.getMinutes()}`)
  }


  return (
    chatUser?.currentChat &&
    <div className='flex flex-col h-full  '>
      <div className='flex gap-5 items-center border-b-2 px-5 py-5  bg-white'>
        {chatUser?.currentChat.profileImg ?
          <Image src={chatUser?.currentChat.profileImg} alt='Imagem de perfil' />
          :
          <div className="rounded-full p-2 flex items-center bg-lightBlue h-fit">
            <IoPersonOutline size={30} />
          </div>
        }
        <h1>{chatUser?.currentChat.displayName}</h1>
      </div>
      <div className='flex h-[700px] flex-col gap-10 relative overflow-y-auto snap-y bg-[#EEF1F1] py-2 chat' ref={containerRef}>
        {isLoading ?
          <div className='flex items-center justify-center h-full'>
            <CircularProgress />
          </div> :
          data?.map((item) => {
            showMessageHour(item.createdAt)
            return (
              <div className='w-full flex flex-col' key={item.id} >
                <div className={` ${item.messageFromId === chatUser.currentChat.id ? 'self-start' : 'self-end'} w-1/2`}>
                  <div className={`flex items-end gap-2 ${item.messageFromId === chatUser.currentChat.id ? 'flex-row' : 'flex-row-reverse'}`}>
                    {item.messageFrom.profileImg ? <Image src={item.messageFrom.profileImg} alt='Imagem de perfil' />
                      : <div className='bg-white rounded-full p-1'> <IoPersonOutline size={30} /> </div>}
                    <div className='flex flex-col gap-2'>
                      <div className={`p-5  ${item.messageFromId === chatUser.currentChat.id ? 'rounded-bl-none bg-white' : 'rounded-br-none bg-[#44b9dca6]'}  rounded-2xl `}>
                        <h1>{item.content}</h1>
                      </div>
                      <span className={` ${item.messageFromId === chatUser.currentChat.id ? 'self-start' : 'self-end'}`}>{showMessageHour(item.createdAt)}</span>
                    </div>
                  </div>
                </div>
              </div>
            )
          }
          )}
      </div>
      <form className='w-full flex items-center relative bg-gray-200 p-2' onSubmit={handleOnClickSendMessage}>
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