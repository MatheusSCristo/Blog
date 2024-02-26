import { authOptions } from '@/lib/auth'
import prisma from '@/lib/prisma'
import { sessionsType } from '@/types/types'
import { getServerSession } from 'next-auth'
import React from 'react'
import UserCard from './userCard'

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
const GetFollowingComp = async () => {
    const following = await getFollowing()
    return (
        <div className='grid grid-cols-4 gap-10 auto-rows-min m-5'>
            {following?.map((item) =>
                <UserCard userId={item.followingId} key={item.followingId} />
            )}
        </div>
    )
}

export default GetFollowingComp