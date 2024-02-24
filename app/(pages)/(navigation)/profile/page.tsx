
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { sessionsType } from '@/types/types';
import { getServerSession } from 'next-auth';
import Image from 'next/image'
import Link from 'next/link';
import React from 'react'
import { RiPencilFill } from "react-icons/ri";
import PostsCard from '../home/components/postsCard';
import { IoPersonCircle } from 'react-icons/io5';
const getUser = async () => {
    const session: sessionsType | null = await getServerSession(authOptions)
    if (session?.user?.id) {
        const data = await prisma.user.findUnique({
            where: {
                id: session.user.id
            },
            select: {
                id: true,
                bio: true,
                displayName: true,
                username: true,
                followedBy: true,
                following: true,
                profileImg:true,
                bgImg:true,
                posts: {
                    select: {
                        author: true,
                        authorId: true,
                        likes: true,
                        published: true,
                        category: true,
                        comments: true,
                        content: true,
                        createAt: true,
                        id: true,
                        title: true
                    }
                },
            }
        })
        return data
    }
}


const profile = async () => {
    const user = await getUser()
    return (
        <section className='w-full mx-16 min-h-max bg-white relative'>
            <div className='h-[200px]  w-full relative'>
                <Image src='/bgProfile.png' fill={true} alt='Imagem de fundo' className='z-0' />
            </div>
            <div className=' bg-white m-10 p-1 border border-black w-fit rounded'>
                {user?.profileImg ?
                    <Image src={user.profileImg} width={120} height={120} alt='Foto de perfil' />
                    :
                    <IoPersonCircle size={100} />
                }
            </div>
            <div className='m-10 flex flex-col'>
                <div className='flex justify-between'>
                    <div className='flex gap-10 items-center '>
                        <h1 className='text-2xl font-bold '>{user?.displayName}</h1>
                        <h3 className='text-lightGray'>@{user?.username}</h3>
                        <Link href={'/profile/edit'} className='border border-black rounded-lg flex p-2 gap-3 items-center hover:bg-lightBlue duration-300'>
                            <span>Editar perfil</span>
                            <RiPencilFill size={20} className='cursor-pointer' />
                        </Link>
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
                <PostsCard post={post} key={post.id} userId={user.id} />

            )}
        </section>
    )
}

export default profile