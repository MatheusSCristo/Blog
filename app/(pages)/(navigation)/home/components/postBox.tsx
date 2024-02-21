'use client'
import React, { useState } from 'react'
import action from '@/utils/revalidateData';

const PostBox = ({ userId }: { userId: string | null | undefined; }) => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [category, setCategory] = useState('')

  const handleOnClickPublishButton =  (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
      if(title && content && category){

         fetch('/api/newPost', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
      body: JSON.stringify({
        title,
        content,
        authorId: userId,
        category
      })
    })
    .then(()=>{
      action()
    })  
  }
  }

  return (
    <div className='bg-white  rounded-lg'>
      <form className='w-full h-full flex flex-col items-end gap-5' onSubmit={handleOnClickPublishButton}>
        <input className='w-full h-[50px] p-5 text-left rounded-lg' placeholder='Titulo' value={title} onChange={(e) => setTitle(e.target.value)} />
        <input className='w-full h-[200px] p-5 text-left rounded-lg' placeholder='Está pensando no que? Compartilhe com seus amigos.'
          value={content} onChange={(e) => setContent(e.target.value)} />
        <div className='flex gap-3'>
          <label htmlFor='category'>Categoria:</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)} name='category'>
            <option>Filmes</option>
            <option>Opinião</option>
            <option>Outro</option>
          </select>
        </div>
        <button type='submit' className='bg-lightBlue text-white rounded-lg w-[15%] h-[50px] m-2'>Publicar post</button>
      </form>
    </div>

  )
}

export default PostBox