import { Follow } from '@/types/types'
import { getSession } from 'next-auth/react'
import React, { Suspense, useEffect, useState } from 'react'
import { IoSearchOutline } from 'react-icons/io5'
import Messages from './Messages'
import { CircularProgress } from '@mui/material'

export const revalidate = 5
const Menu = () => {
    const [following, setFollowing] = useState<null | Follow[]>(null)
    const getFollowing = async () => {
        const session: any = await getSession()
        const data = await fetch('/api/getFollowing',
            {

                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ followedById: session.user.id })
            })
        const res = await data.json()
        setFollowing(res.data)
    }
    useEffect(() => {
        getFollowing()
    }, [])
    return (
        <div className='bg-white  h-[80%] flex flex-col p-5 gap-5'>
            <h1 className='text-xl font-semibold'>Mensagens</h1>
            <div className='flex items-center w-full'>
                <IoSearchOutline className='absolute ml-2 text-gray-500' size={30} />
                <input className='border rounded-xl border-gray-300 pl-10 p-3 w-full' type='text' placeholder='Procure suas conversas...' />
            </div>
            {following?.map((item: Follow) =>
                <Suspense fallback={<CircularProgress />} key={item.followingId} >
                    <Messages item={item} />
                </Suspense>
            )}
        </div>
    )
}

export default Menu