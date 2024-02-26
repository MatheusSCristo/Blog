import prisma from '@/lib/prisma'
import { Post, sessionsType } from '@/types/types'
import React from 'react'
import PostsCard from './postsCard'
import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'

const getPosts = async () => {
    const posts = await prisma.post.findMany({
        include: {
            author: true,
            likes: true,
            category: true,
            comments: {
                include:{
                    author:{
                        select:{
                            displayName:true,
                            username:true,
                            profileImg:true
                        }
                    }
                }
            },

        }
    })
    return posts.reverse()
}
export const fetchCache = 'force-no-store'
export const revalidate = 60


const GetPosts = async () => {
    const session: any = await getServerSession(authOptions)
    const posts = await getPosts()
    return (
        posts?.map((post: any) =>
            <PostsCard post={post} key={post.id} userId={session.user.id} />
        )

    )
}

export default GetPosts