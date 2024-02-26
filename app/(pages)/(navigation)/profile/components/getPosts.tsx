import { authOptions } from '@/lib/auth'
import prisma from '@/lib/prisma'
import { sessionsType } from '@/types/types'
import { getServerSession } from 'next-auth'
import React from 'react'
import PostsCard from '../../home/components/postsCard'

const getPost = async () => {
    const session: sessionsType | null = await getServerSession(authOptions)
    if (session?.user?.id) {
        const data = await prisma.post.findMany({
            where: {
                authorId: session.user.id
            },
            include: {
                category:true,
                comments:true,
                likes:true,
            }
        })
        return data
    }
}

const getPosts = async () => {
    const posts= await getPost()
    
  return (
    <div>
        {posts?.reverse().map((post: any) =>
                <PostsCard post={post} key={post.id} />

            )}
    </div>
  )
}

export default getPosts