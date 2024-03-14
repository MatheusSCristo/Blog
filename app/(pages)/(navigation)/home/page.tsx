import React, { Suspense } from 'react'
import PostBox from './components/postBox'
import GetPosts from './components/getPosts'
import LoadingComponents from '../components/loadingComponents'
import Following from './components/Following'

const Home =  () => {
  return (
    <section className='w-full mx-16 h-full grid grid-cols-3 gap-5'>
      <h1 className='text-2xl my-5 font-bold'>Feed</h1>
      <PostBox />
      <Following/>
      <Suspense fallback={<LoadingComponents />}>
        <GetPosts isAuthor={false} />
      </Suspense>
    </section>
  )
}

export default Home