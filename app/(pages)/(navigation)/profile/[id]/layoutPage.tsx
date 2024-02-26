'use client'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import PostsCard from '../../home/components/postsCard';
import { getSession } from 'next-auth/react';
import { profileUserType } from '@/types/types';
import { Post } from '@prisma/client';
import { IoPersonCircle } from 'react-icons/io5';
import ReactLoading from 'react-loading';
import { useRouter } from 'next/navigation';

const LayoutPage = ({ params }: { params: { id: string } }) => {
    const [userId, setUserId] = useState('')
    const [isLoading, setIsLoading] = useState(true)
    const [user, setUser] = useState<profileUserType>()
    const [following, setFollowing] = useState(0)
    const [isFollowed, setIsFollowed] = useState(false)
    const [followedBy, setFollowedBy] = useState(0)
    const router = useRouter()


    const getUserId = async () => {
        const session: any = await getSession()
        if (session.user.id === params.id) {
            router.push('/profile')
        }
        setUserId(session.user.id)
    }

    const userIsFollowed = (async (data: {
        followedById: String,
        followingId: String
    }[]) => {
        const session: any = await getSession()
        const found = data.find((item) => item.followedById === session.user.id)
        if (found) {
            setIsFollowed(true)
        }
    })
    const getUser = async (id: string) => {
        const data = await fetch('/api/getUser', {
            method: 'POST',
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify({ id }),
            next: { tags: ['profilePosts'] }
        })
        const res = await data.json()
        setUser(res.data)
        userIsFollowed(res.data.followedBy)
        setFollowedBy(res.data.followedBy.length)
        setFollowing(res.data.following.length)
        setIsLoading(false)
    }

    useEffect(() => {
        getUserId()
        getUser(params.id)
    }, [])


    const handleOnClickFollow = async () => {
        setIsFollowed((prevState)=>!prevState)
        if(isFollowed){
            setFollowedBy((prevState)=>prevState-1)
        }else{
            setFollowedBy((prevState)=>prevState+1)
        }
         await fetch('/api/follow', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                    userId,
                    profileId: params.id
                })
        })
    }


    return (
        isLoading ?
            <section className='w-full mx-16 min-h-max flex items-center justify-center'>
                <ReactLoading color='black' type="spin" height={40} width={40} />
            </section>
            :
            <section className='w-full mx-16 min-h-max bg-white relative'>

                <div className='h-[200px]  w-full relative'>
                    <Image src='/bgProfile.png' fill={true} alt='Imagem de fundo' className='z-0' />
                </div>
                <div className='flex justify-between w-full items-center'>
                    <div className=' bg-white m-10 p-1 border border-gray-200 w-fit rounded'>
                        {user?.profileImg ?
                            <Image src={user.profileImg} width={120} height={120} alt='Foto de perfil' />
                            :
                            <IoPersonCircle size={100} />
                        }
                    </div>
                    
                        <button className='text-white bg-lightBlue h-fit px-6 py-2 m-5 rounded-xl hover:scale-[1.15]' onClick={handleOnClickFollow}>{isFollowed?'Deixar de seguir':'Seguir +'} </button>
            
                </div>
                <div className='m-10 flex flex-col'>
                    <div className='flex justify-between'>
                        <div className='flex gap-10 items-center '>
                            <h1 className='text-2xl font-bold '>{user?.displayName}</h1>
                            <h3 className='text-lightGray'>@{user?.username}</h3>
                        </div>
                        <div className='flex gap-5'>
                            <h2>Seguindo: {following}</h2>
                            <h2>Seguidores: {followedBy}</h2>
                        </div>
                    </div>
                    <div className='flex flex-col mt-10'>
                        <h1 className='text-xl font-bold'>Bio</h1>
                        <p className='text-lightGray'>{user?.bio}</p>
                    </div>
                </div>
                {user?.posts?.reverse().map((post: Post) =>
                    <PostsCard post={post} key={post.id} userId={userId} />
                )}
            </section>

    )
}

export default LayoutPage