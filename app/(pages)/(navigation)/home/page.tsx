import React from 'react'
import PostsCard from './components/postsCard'
import PostBox from './components/postBox'
const Home = () => {

  const posts = [{
    id: 'alksdkakpsdkasd123',
    title: 'Comecei a correr',
    content: "Comecei a correr ontem e foi muito bom",
    published: true,
    author: 'mtx',
    authorId: '123123123',
    likes: 234,
    comments: ['Nossa amiga que legal'],
    category: ['corrida', 'exercicio'],
    createAt: new Date("February 18, 2024 14:47:00"),
    saved: 1203
  }, {
    id: 'alksdkakpsdkasd123',
    title: 'Comecei a correr',
    content: "Comecei a correr ontem e foi muito bom",
    published: true,
    author: 'mtx',
    authorId: '123123123',
    likes: 234,
    comments: ['Nossa amiga que legal'],
    category: ['corrida', 'exercicio'],
    createAt: new Date("February 18, 2024 14:47:00"),
    saved: 1203
  }, {
    id: 'alksdkakpsdkasd123',
    title: 'Comecei a correr',
    content: "Comecei a correr ontem e foi muito bom",
    published: true,
    author: 'mtx',
    authorId: '123123123',
    likes: 234,
    comments: ['Nossa amiga que legal'],
    category: ['corrida', 'exercicio'],
    createAt: new Date("February 18, 2024 14:47:00"),
    saved: 1203
  }, {
    id: 'alksdkakpsdkasd123',
    title: 'Comecei a correr',
    content: "Comecei a correr ontem e foi muito bom",
    published: true,
    author: 'mtx',
    authorId: '123123123',
    likes: 234,
    comments: ['Nossa amiga que legal'],
    category: ['corrida', 'exercicio'],
    createAt: new Date("February 18, 2024 14:47:00"),
    saved: 1203
  },]


  return (
    <section className='w-full mx-16 min-h-max'>
      <PostBox/>
      {posts.map((post) =>
        <PostsCard post={post} />

      )}
    </section>
  )
}

export default Home