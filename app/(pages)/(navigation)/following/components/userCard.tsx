'use client'
import { profileUserType } from '@/types/types'
import { getSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { AiOutlineMessage } from 'react-icons/ai'
import { FaExternalLinkAlt } from 'react-icons/fa'
import { IoPersonCircle } from 'react-icons/io5'
import { RiUserUnfollowFill } from 'react-icons/ri'

const UserCard = ({ userId }: { userId: string }) => {
    const [user, setUser] = useState<profileUserType>()

    const getUserInfo = async (id: string) => {
        const data = await fetch('/api/getUser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id })
        })
        const res = await data.json()
        setUser(res.data)
    }

    const unfollowUser = async ({ profileId }:
        {
            profileId: string 
        }) => {
        const session: any = await getSession()
        await fetch('/api/follow',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ userId:session.user.id, profileId })
            })

    }

    useEffect(() => {
        getUserInfo(userId)
    }, [])
    return (
        <div className='p-5 shadow rounded-xl flex flex-col w-[200px] min-h-[150px] items-center gap-5 shadow-2xl border border-gray-300'>
            <div className='flex'>
                {user?.profileImg ?
                    <Image src={user.profileImg} alt='Imagem de perfil' width={100} height={100} className='rounded-full' />
                    :
                    <IoPersonCircle size={40} />
                }
                <div className='flex flex-col'>
                    <h1 className='text-xl'>{user?.displayName ? user.displayName : 'Indisponível'}</h1>
                    <h2 className='text-lightGray text-sm'>@{user?.username}</h2>
                </div>
            </div>
            <div className='w-full bg-lightGray h-[1px]' />
            <div className='flex text-lightBlue gap-5'>
                <Link href={''}>
                    <AiOutlineMessage size={30} />
                </Link>
                <RiUserUnfollowFill size={30} onClick={() => unfollowUser({ profileId: userId })} className='hover:scale-[1.15] cursor-pointer'/>
                <Link href={`profile/${user?.id}`}>
                    <FaExternalLinkAlt size={30} />
                </Link>
            </div>
        </div>
    )
}

export default UserCard