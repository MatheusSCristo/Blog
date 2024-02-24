import React from 'react'
import PostsCard from './components/postsCard'
import PostBox from './components/postBox'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { sessionsType } from '@/types/types'
import prisma from '@/lib/prisma'


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

const Home = async () => {
  const posts = await getPosts()
  const session: sessionsType | null = await getServerSession(authOptions)
  return (
    <section className='w-full mx-16 min-h-max'>
      <PostBox userId={session?.user.id} />
      {posts?.map((post: any) =>
        <PostsCard post={post} key={post.id} userId={session?.user.id} />

      )}
    </section>
  )
}

export default Home