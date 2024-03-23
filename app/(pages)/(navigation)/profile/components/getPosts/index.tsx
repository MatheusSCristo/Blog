import { authOptions } from '@/lib/auth'
import prisma from '@/lib/prisma'
import { sessionsType } from '@/types/types'
import { getServerSession } from 'next-auth'
import React from 'react'
import PostsCard from '../../../feed/components/postsCard'

const getPost = async () => {
    const session: sessionsType | null = await getServerSession(authOptions)
    if (session?.user?.id) {
        const data = await prisma.post.findMany({
            where: {
                authorId: session.user.id
            },
            include: {
                category: true,
                comments: {
                    include: {
                        author: true
                    }
                },
                likes: true,
                author: true
            }
        })
        return data
    }
}

const getPosts = async () => {
    const session: any = await getServerSession(authOptions)
    const posts = await getPost()

    return (
        <div className='my-10'>
            {posts && posts?.length > 0 ?
                posts?.reverse().map((post: any) =>
                    <PostsCard post={post} key={post.id} userId={session?.user.id} isAuthor={true} />

                ) :
                <div className='w-full flex justify-center my-5'>
                    <h1 className='font-bold text-3xl'>Voce ainda não tem nenhum post!</h1>
                </div>
            }
        </div>
    )
}

export default getPosts