'use client'
import React, { useEffect, useRef } from 'react'

const postBox = () => {
    
    
    const handleOnClickPublishButton=(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
  }
  return (
    <div className='bg-white  rounded-lg'>
        <form className='w-full h-full flex flex-col items-end gap-5' onSubmit={handleOnClickPublishButton}>
          <input className='w-full h-[200px] p-5 text-left rounded-lg' placeholder='Está pensando no que? Compartilhe com seus amigos.' />
          <button type='submit' className='bg-lightBlue text-white rounded-lg w-[15%] h-[50px] m-2'>Publicar post</button>
        </form>
      </div>
   
  )
}

export default postBox