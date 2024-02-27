'use client'
import React, { Suspense } from 'react'
import Menu from './components/Menu'
import LoadingComponents from '../components/loadingComponents'
import Chat from './components/Chat'
import Context from '@/app/context/ChatContext'

const page = () => {
    return (
        <Context>
            <section className='w-full mx-16 min-h-max gap-3 bg-white relative flex'>
                <div className='2xl:w-[30%] w-[40%]'>
                    <Suspense fallback={<LoadingComponents />}>
                        <Menu />
                    </Suspense>
                </div>
                <div className='w-full'>
                    <Chat />
                </div>
            </section>
        </Context>
    )
}
export const revalidate = 0

export default page
