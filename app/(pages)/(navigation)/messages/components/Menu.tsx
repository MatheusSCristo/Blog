import { Follow } from '@/types/types'
import React, { Suspense, useContext, useEffect, useState } from 'react'
import { IoSearchOutline } from 'react-icons/io5'
import MessagesBox from './MessagesBox'
import { UserContext } from '@/app/context/userSession'
import LoadingComponents from '../../components/loadingComponents'
import { CircularProgress } from '@mui/material'

const Menu = () => {
    const [following, setFollowing] = useState<Follow[] | null>(null)
    const [isLoading, setIsloading] = useState(true)
    const user = useContext(UserContext)
    const getFollowing = async () => {
        if (user) {
            const data = await fetch('/api/getFollowing',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ followedById: user?.currentUser.id })
                })
            const res = await data.json()
            setFollowing(res.data)
            setIsloading(false)
        }
    }

    useEffect(() => {
        getFollowing()
    }, [user])


    return (
        <div className='bg-white h-full flex flex-col p-5 gap-5'>
            <h1 className='text-xl font-semibold'>Mensagens</h1>
            <div className='flex items-center w-full'>
                <IoSearchOutline className='absolute ml-2 text-gray-500' size={30} />
                <input className='border rounded-xl border-gray-300 pl-10 p-3 w-full' type='text' placeholder='Procure suas conversas...' />
            </div>
            <div className='flex-1 '>
                <Suspense fallback={<CircularProgress />} >
                    {following?.map((item: Follow) =>
                        <MessagesBox item={item} key={item.followingId} />
                    )}
                </Suspense>
            </div>
        </div>
    )
}

export default Menu