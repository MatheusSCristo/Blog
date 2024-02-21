import Image from 'next/image'
import Link from 'next/link';
import React from 'react'
import { RiPencilFill } from "react-icons/ri";
const profile = () => {

    const user = {
        displayName: 'Matheus Senas',
        username: 'mtx',
        bio: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged."
        , following: ['a', 'b', 'c'],
        followedBy: ['a', 'b', 'd', 'f', 'g']
    }


    return (
        <section className='w-full mx-16 min-h-max bg-white relative'>
            <div className='h-1/5  w-full relative'>
                <Image src='/bgProfile.png' fill={true} alt='Imagem de fundo' />
            </div>
            <div className=' bg-white p-0 absolute z-10 top-32 left-10 flex flex-col items-center justify-center rounded'>
                <Image src='/ImgBigProfile.png' width={120} height={120} alt='Foto de perfil' />
            </div>
            <div className='m-10 flex flex-col'>
                <div className='flex justify-between'>
                    <div className='flex gap-10 items-center '>
                        <h1 className='text-2xl font-bold '>{user.displayName}</h1>
                        <h3 className='text-lightGray'>@{user.username}</h3>
                        <Link href={'/profile/edit'} className='border border-black rounded-lg flex p-2 gap-3 items-center hover:bg-lightBlue duration-300'>
                            <span>Editar perfil</span>
                            <RiPencilFill size={20} className='cursor-pointer' />
                        </Link>
                    </div>
                    <div className='flex gap-5'>
                        <h2>Seguindo: {user.following.length}</h2>
                        <h2>Seguidores: {user.followedBy.length}</h2>
                    </div>
                </div>
                <div className='flex flex-col mt-10'>
                    <h1 className='text-xl font-bold'>Bio</h1>
                    <p className='text-lightGray'>{user.bio}</p>
                </div>
            </div>


        </section>
    )
}

export default profile