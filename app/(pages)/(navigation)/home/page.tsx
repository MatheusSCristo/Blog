import React from 'react'
import PostsCard from './components/postsCard'
import PostBox from './components/postBox'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { PostsType, sessionsType } from '@/types/types'

  
const getPosts = async () => {
  const data=await fetch(`${process.env.NEXTAUTH_URL}/api/getPosts`,{ next: { tags: ['posts'] } })
  const res=await data.json()
  const results=res.data.reverse()
  return results
}
const Home = async () => {
  const posts=await getPosts() 
  const session:sessionsType | null= await getServerSession(authOptions)
  return (
    <section className='w-full mx-16 min-h-max'>
      <PostBox userId={session?.user.id} />
      {posts?.map((post:PostsType) =>
        <PostsCard post={post} key={post.id} userId={session?.user.id}  />

      )}
    </section>
  )
}

export default Home