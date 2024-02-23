'use client'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import PostsCard from '../../home/components/postsCard';
import { getSession } from 'next-auth/react';

const profile = ({ params }: { params: { id: string } }) => {
    const [userId,setUserId]=useState('')
    const getUserId=async()=>{
        const session:any=await getSession()
        setUserId(session.user.id)
    }
    const [user, setUser] = useState<any>()
    const getUser = async (id: string) => {
        const data = await fetch('/api/getUser', {
            method: 'POST',
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify({ id }),
            next:{tags:['profilePosts']}
        })
        const res = await data.json()
        console.log(res)
        setUser(res.data)
    }
    useEffect(() => {
        getUser(params.id)
        getUserId()
    }, [])

    return (
        <section className='w-full mx-16 min-h-max bg-white relative'>
            <div className='h-[200px]  w-full relative'>
                <Image src='/bgProfile.png' fill={true} alt='Imagem de fundo' className='z-0' />
            </div>
            <div className='flex justify-between w-full items-center'>
                <div className=' bg-white m-10 p-1 border border-black w-fit rounded'>
                    <Image src='/ImgBigProfile.png' width={120} height={120} alt='Foto de perfil' />
                </div>
                <button className='text-white bg-lightBlue h-fit px-6 py-2 m-5 rounded-xl' onClick={() => { }}>Seguir + </button>
            </div>
            <div className='m-10 flex flex-col'>
                <div className='flex justify-between'>
                    <div className='flex gap-10 items-center '>
                        <h1 className='text-2xl font-bold '>{user?.displayName}</h1>
                        <h3 className='text-lightGray'>@{user?.username}</h3>
                    </div>
                    <div className='flex gap-5'>
                        <h2>Seguindo: {user?.following.length}</h2>
                        <h2>Seguidores: {user?.followedBy.length}</h2>
                    </div>
                </div>
                <div className='flex flex-col mt-10'>
                    <h1 className='text-xl font-bold'>Bio</h1>
                    <p className='text-lightGray'>{user?.bio}</p>
                </div>
            </div>
            {user?.posts?.reverse().map((post: any) =>
                <PostsCard post={post} key={post.id} userId={userId} />
            )}
        </section>
    )
}

export default profile