'use client'
import React, { useEffect } from 'react'
import { createPostSchema } from '@/schemas/createPostSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import revalidatePostsData from '@/utils/revalidatePosts';

const PostBox = ({ userId }: { userId: string | null | undefined; }) => {


  type creatPostType = z.infer<typeof createPostSchema>

  
  const { register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful }
  } = useForm<creatPostType>({
    defaultValues: { title: '', content: '', category: '' },
    resolver: zodResolver(createPostSchema)
  })

  useEffect(() => {
    setTimeout(() => {
      reset()
    }, 3000);
  }, [isSubmitSuccessful,reset])

  const handleOnClickPublishButton = (data: creatPostType) => {
    fetch('/api/newPost', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ...data,
        authorId: userId,
      })
    })
      .then(() => {
        revalidatePostsData()

      })
  }

  return (
    <div className='bg-white  rounded-lg'>
      <form className='w-full h-full flex flex-col items-end gap-5' onSubmit={handleSubmit(handleOnClickPublishButton)}>
        <input className='w-full h-[50px] p-5 text-left rounded-lg' placeholder='Titulo' {...register('title')} />
        {errors.title && <span className='text-red'>{errors.title.message}</span>}
        <input className='w-full h-[200px] p-5 text-left rounded-lg' placeholder='Está pensando no que? Compartilhe com seus amigos.'
          {...register('content')} />
        {errors.content && <span className='text-red'>{errors.content.message}</span>}
        <div className='flex gap-3'>
          <label htmlFor='category'>Categoria:</label>
          <select {...register('category')} >
            <option>Filmes</option>
            <option>Opinião</option>
            <option>Outro</option>
          </select>
          {errors.category && <span className='text-red'>{errors.category.message}</span>}
        </div>
        <button type='submit' className='bg-lightBlue text-white rounded-lg w-[15%] h-[50px] m-2'>Publicar post</button>
      </form>
    </div>

  )
}

export default PostBox