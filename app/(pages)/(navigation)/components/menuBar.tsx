'use client'
import Image from 'next/image'
import React, { useState } from 'react'
import { FaRegBell } from "react-icons/fa";
import { CiBookmark } from "react-icons/ci"
import { IoPeopleOutline, IoPersonOutline, IoHomeOutline } from "react-icons/io5";;
import { AiOutlinePoweroff, AiOutlineMessage } from "react-icons/ai";
import { IoIosArrowDropright, IoIosArrowDropleft } from "react-icons/io";
import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';

const MenuBar = () => {
  const router = useRouter()
  const [menuOpen, setMenuOpen] = useState(false)

  const handleOnClickSignOut=async()=>{
    await signOut({callbackUrl:'/auth/login'})
  }

  return (

    !menuOpen ?
      <div className='h-fit bg-lightBlue w-16 md:w-32 rounded-2xl flex flex-col items-center py-8  relative' >
        <div className='rounded-[50%] w-full relative flex items-center justify-center ' >
          <Image src={'/profileImg.png'} alt='Imagem de perfil' width={70} height={70} />
          <IoIosArrowDropright size={30} className='absolute right-0 text-white hover:scale-110 hidden md:block' onClick={() => setMenuOpen(true)} />
        </div>
        <div className='flex flex-col gap-4 md:gap-10 my-10'>
          <div className=' p-3 rounded-xl hover:scale-105 hover:border hover:border-white cursor-pointer' onClick={() => router.push('/home')} >
            <IoHomeOutline size={30} className='text-white' />
          </div>
          <div className=' p-3 rounded-xl hover:scale-105 hover:border hover:border-white cursor-pointer'>
            <AiOutlineMessage size={30} className='text-white' />
          </div>
          <div className=' p-3 rounded-xl hover:scale-105 hover:border hover:border-white cursor-pointer'>

            <CiBookmark size={30} className='text-white ' />
          </div>
          <div className=' p-3 rounded-xl hover:scale-105 hover:border hover:border-white cursor-pointer'>
            <IoPeopleOutline size={30} className='text-white' />
          </div>
          <div className=' p-3 rounded-xl hover:scale-105 hover:border hover:border-white cursor-pointer' onClick={() => router.push('/profile')}>
            <IoPersonOutline size={30} className='text-white ' />
          </div>
        </div>
        <div className='bottom-0 my-5  hover:border hover:border-white p-3 rounded-xl hover:scale-110 cursor-pointer' onClick={handleOnClickSignOut}>
          <AiOutlinePoweroff size={30} className='text-white' />
        </div>
      </div>

      :

      <div className='h-fit bg-white w-[300px] md:w-1/5 rounded-2xl flex flex-col items-center py-8 relative' >
        <div className='rounded-[50%] w-full flex flex-col items-center justify-center'>
          <div className='relative flex  items-center justify-center w-full'>
            <Image src={'/profileImg.png'} alt='Imagem de perfil' width={70} height={70} className='border border-black rounded-full' />
            <IoIosArrowDropleft size={30} className='absolute right-0 text-black hover:scale-110' onClick={() => setMenuOpen(false)} />
          </div>
          <h1 className='my-2'>Mtx</h1>
        </div>
        <div className='flex flex-col gap-4 md:gap-8 my-10 w-full items-center text-sm md:text-lg '>
          <div onClick={() => router.push('/home')} className=' p-3 rounded-xl hover:scale-105 hover:border w-full md:w-4/5 hover:bg-lightBlue hover:text-white ease-in duration-200 cursor-pointer flex items-center gap-2 text-black' >
            <IoHomeOutline size={30} className='' />
            <span>Home</span>
          </div>
          <div className=' p-3 rounded-xl hover:scale-105 hover:border w-full md:w-4/5 hover:bg-lightBlue hover:text-white ease-in duration-200 cursor-pointer flex items-center gap-2 text-black'>
            <AiOutlineMessage size={30} />
            <span>Mensagens</span>
          </div>
          <div className=' p-3 rounded-xl hover:scale-105 hover:border w-full md:w-4/5 hover:bg-lightBlue hover:text-white ease-in duration-200 cursor-pointer flex items-center gap-2 text-black'>
            <CiBookmark size={30} />
            <span>Salvos</span>
          </div>
          <div className=' p-3 rounded-xl hover:scale-105 hover:border w-full md:w-4/5 hover:bg-lightBlue hover:text-white ease-in duration-200 cursor-pointer flex items-center gap-2 text-black'>
            <IoPeopleOutline size={30} />
            <span>Seguindo</span>
          </div>
          <div onClick={() => router.push('/profile')} className=' p-3 rounded-xl hover:scale-105 hover:border w-full md:w-4/5 hover:bg-lightBlue hover:text-white ease-in duration-200 cursor-pointer flex items-center gap-2 text-black'>
            <IoPersonOutline size={30} />
            <span>Perfil</span>
          </div>
        </div>
        <div className='bottom-0 my-5  hover:border hover:border-white p-3 rounded-xl hover:scale-110 cursor-pointer ' onClick={handleOnClickSignOut}>
          <AiOutlinePoweroff size={30} />
        </div>
      </div >
  )



}

export default MenuBar