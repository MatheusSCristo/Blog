import prisma from '@/lib/prisma'
import Image from 'next/image'
import React from 'react'
import { IoPersonCircle } from 'react-icons/io5'


const getUserInfo = async (id: string) => {
    const data = await prisma.user.findUnique({
        where: {
            id
        }
    })
    return data

}

const UserCard = async ({ userId }: { userId: string }) => {
    const user = await getUserInfo(userId)
    return (
        <div className='p-5 shadow rounded-xl flex w-[200px] h-[150px] justify-center gap-5'>
            {user?.profileImg ?
                <Image src={user.profileImg} alt='Imagem de perfil'  width={100} height={100} className='rounded-full'/>
                :
                <IoPersonCircle size={30} />
            }
            <div className='flex flex-col'>
            <h1 className='text-xl'>{user?.displayName}</h1>
                <h2 className='text-lightGray text-sm'>@{user?.username}</h2>
            </div>
        </div>
    )
}

export default UserCard