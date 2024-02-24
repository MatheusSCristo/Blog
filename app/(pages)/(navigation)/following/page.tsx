import { authOptions } from '@/lib/auth'
import prisma from '@/lib/prisma'
import { sessionsType } from '@/types/types'
import { getServerSession } from 'next-auth'

import React from 'react'
import UserCard from './components/userCard'

const getFollowing = async () => {
    const session: sessionsType | null = await getServerSession(authOptions)
    if (session?.user.id) {
        const data = await prisma.follows.findMany({
            where: {
                followedById: session?.user.id
            }
        })
        return data

    }
}
export const dynamic = 'force-dynamic'

const page = async () => {
    const following = await getFollowing()
    return (
        <section className='min-h-[100vh] bg-white w-full mx-16 rounded-lg flex items-center p-12 flex-col'>
            <h1 className='text-3xl font-bold'>Quem você segue:</h1>
            <div className='grid grid-cols-4 gap-10 auto-rows-min m-5'>
                {following?.map((item) =>
                <UserCard userId={item.followingId} key={item.followingId}/>
                )}
            </div>

        </section>
    )
}

export default page