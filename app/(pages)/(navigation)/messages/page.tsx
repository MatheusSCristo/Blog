'use client'
import React from 'react'
import Menu from './components/Menu'
import Chat from './components/Chat'
import Context from '@/app/context/Context'

const page = () => {
    return (
        <Context>
            <section className='w-full mx-16  gap-3 bg-white relative flex bg-[#EEF1F1]'>
                <div className='2xl:w-[30%] w-[40%] '>
                    <Menu />
                </div>
                <div className='w-full '>
                    <Chat />
                </div>
            </section>
        </Context>
    )
}

export default page
