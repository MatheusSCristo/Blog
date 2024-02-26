import React, { Suspense } from 'react'
import PostBox from './components/postBox'
import GetPosts from './components/getPosts'
import LoadingComponents from '../components/loadingComponents'

const Home =  () => {
  return (
    <section className='w-full mx-16 min-h-max'>
      <PostBox />
      <Suspense fallback={<LoadingComponents />}>
        <GetPosts />
      </Suspense>
    </section>
  )
}

export default Home