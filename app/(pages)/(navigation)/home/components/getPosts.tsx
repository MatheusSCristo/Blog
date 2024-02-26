import prisma from '@/lib/prisma'
import { sessionsType } from '@/types/types'
import React from 'react'
import PostsCard from './postsCard'
import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'

const getPosts = async () => {
    const posts = await prisma.post.findMany({
        select: {
            author: true,
            authorId: true,
            likes: true,
            published: true,
            category: true,
            comments: true,
            content: true,
            createAt: true,
            id: true,
            title: true
        }
    })
    return posts.reverse()
}
export const fetchCache = 'force-no-store'
export const revalidate = 60


const GetPosts = async () => {
    const posts = await getPosts()
    return (
        posts?.map((post: any) =>
            <PostsCard post={post} key={post.id} />
        )

    )
}

export default GetPosts