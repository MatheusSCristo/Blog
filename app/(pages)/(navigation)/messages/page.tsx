'use client'
import React from 'react'
import Menu from './components/Menu'
import Chat from './components/Chat'
import Context from '@/app/context/ChatContext'

const page = () => {
    return (
        <Context>
            <section className='w-full mx-16 h-screen gap-3 bg-white relative flex'>
                <div className='2xl:w-[30%] w-[40%] '>
                    <Menu />
                </div>
                <div className='w-full h-[80%]'>
                    <Chat />
                </div>
            </section>
        </Context>
    )
}
export const revalidate = 0

export default page
